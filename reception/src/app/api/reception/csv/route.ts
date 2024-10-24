import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';

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