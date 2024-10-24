import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync'; // 追加

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const text = await file.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  });

  const receptions = records.map((record: any) => ({
    sequenceNumber: parseInt(record['通番']),
    companyName: record['企業名'],
    assignedOffice: record['担当営業所'],
    caName: record['担当CA名'],
    customerName: record['来場お客様名'],
    visitCheck: record['来場チェック'] || '未チェック',
    guestPassNumber: record['ゲストパスNO'] || '未発行',
    visitDateTime: record['来場日時'] || new Date().toISOString(),
    attendedCheck: record['アテンド済チェック'] || '未アテンド',
    respondedCheck: record['対応済チェック'] || '未対応',
    customerEmail: record['お客様メールアドレス'],
    customerAddress: record['お客様住所'],
    customerPhoneNumber: record['お客様電話番号'],
    officeSalesListID: record['オフィス営業リストID'],
  }));

  try {
    await prisma.reception.createMany({
      data: receptions,
    });
    return NextResponse.json({ message: 'Receptions created successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create receptions' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const receptions = await prisma.reception.findMany();

    const records = receptions.map((reception) => ({
      通番: reception.sequenceNumber,
      企業名: reception.companyName,
      担当営業所: reception.assignedOffice,
      担当CA名: reception.caName,
      来場お客様名: reception.customerName,
      来場チェック: reception.visitDateTime !== null ? 'チェック済み' : '未チェック',
      ゲストパスNO: reception.guestPassNumber || '未発行',
      来場日時: reception.visitDateTime ? new Date(reception.visitDateTime).toLocaleString() : '未定',
      アテンド済チェック: reception.attendedCA ? 'アテンド済み' : '未アテンド',
      対応済チェック: reception.attendedCA !== null ? '対応済み' : '未対応',
      お客様メールアドレス: reception.customerEmail,
      お客様住所: reception.customerAddress,
      お客様電話番号: reception.customerPhoneNumber,
      オフィス営業リストID: reception.officeSalesListID,
    }));

    const csv = stringify(records, {
      header: true,
    });

    // UTF-8 BOMを追加して文字化けを防ぐ
    const bom = '\uFEFF';
    const csvWithBom = bom + csv;

    return new Response(csvWithBom, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="receptions.csv"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to export receptions' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await prisma.reception.deleteMany();
    return NextResponse.json({ message: 'All receptions deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete receptions' }, { status: 500 });
  }
}