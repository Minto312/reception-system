import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.reception.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch receptions' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updatedReception = await prisma.reception.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json(updatedReception);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update reception' }, { status: 500 });
  }
}