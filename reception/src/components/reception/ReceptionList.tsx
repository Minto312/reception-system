'use client';

import React from 'react';
import { useFilteredReceptions } from '@/hooks/useFilteredReceptions';
import { Reception } from '@/types';
import { Card, Typography, Input } from '@material-tailwind/react';
import VisitRecordDialog from './VisitRecordDialog';
import { useVisitRecordDialog } from '@/hooks/useVisitRecordDialog';

const TABLE_HEAD = [
  '企業名', 
  'お客様名', 
  'ゲストパス', 
  '来場日時', 
  'アテンド済',
  '対応済',
  '担当営業所', 
  '担当CA名', 
  '対応CA名', 
  'お客様住所', 
  'お客様メールアドレス', 
  'お客様電話番号', 
  'オフィス営業リストID', 
  '通番'
];

export const ReceptionList: React.FC = () => {
  const { filteredReceptions, isLoading, error, searchTerm, handleSearchChange } = useFilteredReceptions();
  const { selectedReception, dialogOpen, handleOpenDialog, handleCloseDialog, handleConfirmDialog } = useVisitRecordDialog();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Card className="h-full w-full overflow-scroll mt-6">
      <div className="p-4">
        <Input type="text" placeholder="企業名で検索" value={searchTerm} onChange={handleSearchChange} className="mb-4 border-black indent-3 h-10" />
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 bg-blue-50">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredReceptions?.map((reception: Reception, index) => (
            <tr key={reception.id} className={`cursor-pointer even:bg-gray-100 border-b hover:bg-gray-200`} onClick={() => handleOpenDialog(reception)}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.companyName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.customerName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.guestPassNumber}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.visitDateTime ? new Date(reception.visitDateTime).toLocaleString() : ''}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal text-center text-md">
                  {reception.visitDateTime !== null && reception.attendedCA === '未確認' ? '✅' : ''}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal text-center text-md">
                  {reception.visitDateTime !== null && reception.attendedCA !== '未確認' && reception.attendedCA !== null ? '✅' : ''}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.assignedOffice}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.caName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.attendedCA}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.customerAddress}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.customerEmail}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.customerPhoneNumber}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.officeSalesListID}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.sequenceNumber}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <VisitRecordDialog open={dialogOpen} onClose={handleCloseDialog} reception={selectedReception} onConfirm={handleConfirmDialog} />
    </Card>
  );
};