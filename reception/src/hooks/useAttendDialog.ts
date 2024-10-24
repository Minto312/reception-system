import { useState } from 'react';
import { Reception } from '@/types';

export const useAttendDialog = () => {
  const [selectedReception, setSelectedReception] = useState<Reception | null>(null);
  const [attendDialogOpen, setAttendDialogOpen] = useState(false);
  const [attendedCA, setAttendedCA] = useState('');

  const handleOpenAttendDialog = (reception: Reception) => {
    setSelectedReception(reception);
    setAttendDialogOpen(true);
  };

  const handleCloseAttendDialog = () => {
    setAttendDialogOpen(false);
    setSelectedReception(null);
    setAttendedCA('');
  };

  const handleAttend = async (refetch: () => void) => {
    if (!selectedReception) return;

    const updatedReception = {
      ...selectedReception,
      attendedCA,
    };

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

      handleCloseAttendDialog();
      refetch(); // データの再取得を行う
    } catch (error) {
      console.error('Error updating reception:', error);
    }
  };

  return {
    selectedReception,
    attendDialogOpen,
    attendedCA,
    setAttendedCA,
    handleOpenAttendDialog,
    handleCloseAttendDialog,
    handleAttend,
  };
};