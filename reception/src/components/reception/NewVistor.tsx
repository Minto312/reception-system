'use client';

import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import NewVisitorForm from '@/components/reception/NewVisitorForm';

const NewVisitor: React.FC = () => {
  const [newVisitorOpen, setNewVisitorOpen] = useState(false);

  const handleOpenNewVisitorForm = () => {
    setNewVisitorOpen(true);
  };

  const handleCloseNewVisitorForm = () => {
    setNewVisitorOpen(false);
  };

  const handleConfirmNewVisitor = () => {
    // 新規来場者が登録された後の処理をここに追加
    console.log('New visitor registered');
  };

  return (
    <div className='m-8 mb-4'>
      <Button
        variant="gradient"
        color="blue"
        onClick={handleOpenNewVisitorForm}
        className="text-white bg-blue-500 hover:bg-blue-700 p-4"
      >
        新規来場者登録
      </Button>
      <NewVisitorForm
        open={newVisitorOpen}
        onClose={handleCloseNewVisitorForm}
        onConfirm={handleConfirmNewVisitor}
      />
    </div>
  );
};

export default NewVisitor;