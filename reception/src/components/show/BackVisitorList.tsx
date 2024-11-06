'use client';

import React from 'react';
import { useBackReceptions } from '@/hooks/useBackReceptions';
import { Reception } from '@/types';
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import { useAttendDialog } from '@/hooks/useAttendDialog';

const TABLE_HEAD = ['来場時刻', '企業名', 'お客様名', '営業所名（所在地）', '営業担当者名', 'ゲストパス'];

const BackVisitorList: React.FC = () => {
  const { receptions, isLoading, error, refetch } = useBackReceptions();
  const { selectedReception, attendDialogOpen, attendedCA, setAttendedCA, handleOpenAttendDialog, handleCloseAttendDialog, handleAttend } = useAttendDialog();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-5 bg-red-50">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {receptions?.map((reception: Reception, index) => (
            <tr key={reception.id} onClick={() => handleOpenAttendDialog(reception)} className={`cursor-pointer even:bg-gray-100 border-b hover:bg-gray-200`}>
              <td className="p-5">
                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                  {reception.visitDateTime ? new Date(reception.visitDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </Typography>
              </td>
              <td className="p-5">
                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                  {reception.companyName}
                </Typography>
              </td>
              <td className="p-5">
                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                  {reception.customerName}
                </Typography>
              </td>
              <td className="p-5">
                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                  {reception.assignedOffice || reception.customerAddress}
                </Typography>
              </td>
              <td className="p-5">
                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                  {reception.caName}
                </Typography>
              </td>
              <td className="p-5">
                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                  {reception.guestPassNumber}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={attendDialogOpen} handler={handleCloseAttendDialog} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
          <DialogHeader className="text-center text-lg font-semibold">対応者登録</DialogHeader>
          <DialogBody divider className="space-y-4">
            <div className="space-y-2">
              {selectedReception && (
                <>
                  <Typography variant="h6" className="text-gray-700">
                    企業名: {selectedReception.companyName}
                  </Typography>
                  <Typography variant="h6" className="text-gray-700">
                    お客様氏名: {selectedReception.customerName}
                  </Typography>
                  <label className="block text-gray-700">対応者名</label>
                  <Input value={attendedCA} onChange={(e) => setAttendedCA(e.target.value)} className="border-black indent-3 h-10" />
                </>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="flex justify-end space-x-2 mt-2 pb-0">
            <Button variant="outlined" color="gray" onClick={handleCloseAttendDialog} className="border-gray-500 text-gray-500 p-2">
              キャンセル
            </Button>
            <Button variant="outlined" color="gray" onClick={() => handleAttend(refetch)} className="border-gray-700 text-gray-700 p-2 px-4">
              登録
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </Card>
  );
};

export default BackVisitorList;