import { useState } from 'react';
import { Reception } from '@/types';

export const useVisitRecordDialog = () => {
  const [selectedReception, setSelectedReception] = useState<Reception | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (reception: Reception) => {
    setSelectedReception(reception);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedReception(null);
  };

  const handleConfirmDialog = (updatedReception: Reception) => {
    // 更新されたReceptionを処理するロジックをここに追加
    console.log('Updated Reception:', updatedReception);
    handleCloseDialog();
  };

  return {
    selectedReception,
    dialogOpen,
    handleOpenDialog,
    handleCloseDialog,
    handleConfirmDialog,
  };
};
