import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from '@material-tailwind/react';
import { Reception } from '@/types';

interface EditReceptionDialogProps {
  open: boolean;
  onClose: () => Reception;
  reception: Reception;
  onSave: (updatedReception: Reception) => Reception & { ok: boolean };
}

export const EditReceptionDialog: React.FC<EditReceptionDialogProps> = ({ open, reception, onClose, onSave }) => {
  const [formData, setFormData] = useState<Reception>(reception);

  useEffect(() => {
    setFormData(reception);
  }, [reception]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    if (formData) {
      const response = await onSave(formData);
      console.dir(response);
      if (!response.ok) {
        console.error('Failed to update reception');
      }
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-full">
        <DialogHeader>編集</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700">企業名</label>
              <Input name="companyName" value={formData.companyName || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">お客様名</label>
              <Input name="customerName" value={formData.customerName || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">ゲストパス</label>
              <Input name="guestPassNumber" value={formData.guestPassNumber || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">来場日時</label>
              <Input name="visitDateTime" value={formData.visitDateTime || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">担当営業所</label>
              <Input name="assignedOffice" value={formData.assignedOffice || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">担当CA名</label>
              <Input name="caName" value={formData.caName || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">対応CA名</label>
              <Input name="attendedCA" value={formData.attendedCA || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">お客様メールアドレス</label>
              <Input name="customerEmail" value={formData.customerEmail || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">お客様住所</label>
              <Input name="customerAddress" value={formData.customerAddress || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">お客様電話番号</label>
              <Input name="customerPhoneNumber" value={formData.customerPhoneNumber || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">オフィス営業リストID</label>
              <Input name="officeSalesListID" value={formData.officeSalesListID || ''} onChange={handleChange} className="indent-4" />
            </div>
            <div>
              <label className="text-gray-700">通番</label>
              <Input name="sequenceNumber" value={formData.sequenceNumber || ''} onChange={handleChange} className="indent-4" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={onClose} className="border-gray-500 text-gray-500 p-2">
            キャンセル
          </Button>
          <Button variant="gradient" onClick={handleSave} className="border-gray-700 text-gray-700 p-2">
            保存
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};
