import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Typography } from '@material-tailwind/react';

interface NewVisitorFormProps {
  open: boolean;
  onCloseFunction: () => void;
  onConfirm: () => void;
}

const NewVisitorForm: React.FC<NewVisitorFormProps> = ({ open, onCloseFunction, onConfirm }) => {
  const [companyName, setCompanyName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onClose = () => {
    setCompanyName('');
    setCustomerName('');
    setCustomerAddress('');
    setErrorMessage('');
    onCloseFunction();
  }

  const handleSubmit = async () => {
    const newVisitor = {
      companyName,
      customerName,
      customerAddress,
      visitDateTime: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/reception', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVisitor),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create new visitor');
      }

      onConfirm();
      onClose();
    } catch (error: any) {
      console.error('Error creating new visitor:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Dialog open={open} handler={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full h-auto">
        <DialogHeader className="text-center text-lg font-semibold">新規来場者登録</DialogHeader>
        <DialogBody divider className="space-y-4">
          {errorMessage && (
            <Typography className="text-red-600 text-center">
              {errorMessage}
            </Typography>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">企業名</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">お名前</label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">所在地のエリア</label>
              <Input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end space-x-2 mt-2 pb-0">
          <Button variant="outlined" color="gray" onClick={onClose} className="border-gray-500 text-gray-500 p-2">
            キャンセル
          </Button>
          <Button variant="outlined" color="gray" onClick={handleSubmit} className="border-gray-700 text-gray-700 p-2 px-4">
            登録
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default NewVisitorForm;