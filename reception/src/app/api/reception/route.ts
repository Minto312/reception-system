import { Reception } from '@/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const data: Reception[] = [
    {
      id: 1,
      hash: 'abc123',
      companyName: '株式会社A',
      assignedOffice: '東京営業所',
      caName: '田中太郎',
      customerName: '山田花子',
      guestPassNumber: 'GP001',
      visitDateTime: '2024-10-24T10:00:00Z',
      attendedCA: '佐藤次郎',
      customerEmail: 'hanako.yamada@example.com',
      customerAddress: '東京都渋谷区',
      customerPhoneNumber: '090-1234-5678',
      officeSalesListID: 101,
    },
    {
      id: 2,
      hash: 'def456',
      companyName: '株式会社B',
      assignedOffice: '大阪営業所',
      caName: '鈴木一郎',
      customerName: '佐藤花子',
      guestPassNumber: 'GP002',
      visitDateTime: '2024-10-24T11:00:00Z',
      attendedCA: '高橋三郎',
      customerEmail: 'hanako.sato@example.com',
      customerAddress: '大阪府大阪市',
      customerPhoneNumber: '080-2345-6789',
      officeSalesListID: 102,
    },
    {
      id: 3,
      hash: 'ghi789',
      companyName: '株式会社C',
      assignedOffice: '名古屋営業所',
      caName: '高橋二郎',
      customerName: '鈴木花子',
      guestPassNumber: 'GP003',
      visitDateTime: '2024-10-24T12:00:00Z',
      attendedCA: '田中四郎',
      customerEmail: 'hanako.suzuki@example.com',
      customerAddress: '愛知県名古屋市',
      customerPhoneNumber: '070-3456-7890',
      officeSalesListID: 103,
    },
    {
      id: 4,
      hash: 'jkl012',
      companyName: '株式会社D',
      assignedOffice: '福岡営業所',
      caName: '佐藤三郎',
      customerName: '高橋花子',
      guestPassNumber: 'GP004',
      visitDateTime: '2024-10-24T13:00:00Z',
      attendedCA: '鈴木五郎',
      customerEmail: 'hanako.takahashi@example.com',
      customerAddress: '福岡県福岡市',
      customerPhoneNumber: '060-4567-8901',
      officeSalesListID: 104,
    },
    {
      id: 5,
      hash: 'mno345',
      companyName: '株式会社E',
      assignedOffice: '札幌営業所',
      caName: '山田四郎',
      customerName: '佐藤花子',
      guestPassNumber: 'GP005',
      visitDateTime: '2024-10-24T14:00:00Z',
      attendedCA: '高橋六郎',
      customerEmail: 'hanako.sato2@example.com',
      customerAddress: '北海道札幌市',
      customerPhoneNumber: '050-5678-9012',
      officeSalesListID: 105,
    },
  ];
  return NextResponse.json(data);
}
