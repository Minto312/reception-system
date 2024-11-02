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

  const handleConfirmDialog = async (updatedReception: Reception) => {
    try {
      const response = await fetch('/api/reception', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReception),
      });

      if (!response.ok) {
        throw new Error('Failed to update reception');
      }

      const result = await response.json();
      console.log('Updated Reception:', result);
    } catch (error) {
      console.error('Error updating reception:', error);
    } finally {
      handleCloseDialog();
    }
  };

  return {
    selectedReception,
    dialogOpen,
    handleOpenDialog,
    handleCloseDialog,
    handleConfirmDialog,
  };
};