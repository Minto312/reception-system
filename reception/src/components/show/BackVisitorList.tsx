'use client';

import React from 'react';
import { useBackReceptions } from '@/hooks/useBackReceptions';
import { Reception } from '@/types';
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import { useAttendDialog } from '@/hooks/useAttendDialog';

const TABLE_HEAD = ['企業名', 'お客様名', '営業所名（所在地）', '営業担当者名', '対応'];

const BackVisitorList: React.FC = () => {
  const { receptions, isLoading, error, refetch } = useBackReceptions();
  const {
    selectedReception,
    attendDialogOpen,
    attendedCA,
    setAttendedCA,
    handleOpenAttendDialog,
    handleCloseAttendDialog,
    handleAttend,
  } = useAttendDialog();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Card className="h-full w-full overflow-scroll mt-6">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {receptions?.map((reception: Reception, index) => (
            <tr key={reception.id} className={`cursor-pointer ${index % 2 === 0 ? 'even:bg-blue-gray-50/50' : ''}`}>
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
                  {reception.assignedOffice || reception.customerAddress}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.caName}
                </Typography>
              </td>
              <td className="p-4">
                <Button variant="gradient" color="blue" onClick={() => handleOpenAttendDialog(reception)} disabled={!!reception.attendedCA} className="text-white text-sm bg-blue-500 hover:bg-blue-700 p-2">
                  アテンド
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={attendDialogOpen} handler={handleCloseAttendDialog} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
          <DialogHeader className="text-center text-lg font-semibold">アテンド登録</DialogHeader>
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
                  <label className="block text-gray-700">営業担当者名</label>
                  <Input value={attendedCA} onChange={(e) => setAttendedCA(e.target.value)} className='border-black indent-3'/>
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