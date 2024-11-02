import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Checkbox, Typography, Input } from '@material-tailwind/react';
import { Reception } from '@/types';

interface VisitRecordDialogProps {
  open: boolean;
  onClose: () => void;
  reception: Reception | null;
  onConfirm: (updatedReception: Reception) => void;
}

const VisitRecordDialog: React.FC<VisitRecordDialogProps> = ({ open, onClose, reception, onConfirm }) => {
  const [attended, setAttended] = useState(false);
  const [guestPassNumber, setGuestPassNumber] = useState('');

  useEffect(() => {
    if (reception) {
      setGuestPassNumber(reception.guestPassNumber || '');
    }
  }, [reception]);

  const handleConfirm = () => {
    if (reception) {
      const updatedReception: Reception = {
        ...reception,
        visitDateTime: new Date().toISOString(),
        attendedCA: attended ? '未確認' : null,
        guestPassNumber,
      };
      onConfirm(updatedReception);
    }
  };

  return (
    <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
        <DialogHeader className="text-center text-lg font-semibold">来場記録</DialogHeader>
        <DialogBody divider className="space-y-4">
          {reception && (
            <div className="space-y-2">
              <Typography variant="h6" className="text-gray-700">
                企業名: {reception.companyName}
              </Typography>
              <Typography variant="h6" className="text-gray-700">
                お客様氏名: {reception.customerName}
              </Typography>
              <label className="flex items-center mt-4 cursor-pointer">
                <Checkbox label="" checked={attended} onChange={(e) => setAttended(e.target.checked)} className="text-gray-700" />
                <Typography variant="body1" className="ml-2 text-gray-700">
                  同行していますか？
                </Typography>
              </label>
              <div className="mt-4">
                <label className="block text-gray-700">ゲストパス</label>
                <Input value={guestPassNumber} onChange={(e) => setGuestPassNumber(e.target.value)} className="mt-1 border-black indent-3 h-10" />
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex justify-end space-x-2 mt-2 pb-0">
          <Button variant="outlined" color="gray" onClick={onClose} className="border-gray-500 text-gray-500 p-2">
            キャンセル
          </Button>
          <Button variant="outlined" color="gray" onClick={handleConfirm} className="border-gray-700 text-gray-700 p-2 px-4">
            OK
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default VisitRecordDialog;