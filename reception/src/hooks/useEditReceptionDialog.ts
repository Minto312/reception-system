import { useState } from 'react';
import { Reception } from '@/types';

export const useEditReceptionDialog = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingReception, setEditingReception] = useState<Reception>();

  const handleOpenEditDialog = (reception: Reception) => {
    setEditingReception(reception);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEditDialog = async (updatedReception: Reception) => {
    const response = await fetch('/api/reception', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReception),
    });

    console.log('Updated Reception:', updatedReception);
    console.log(response.ok ? 'Reception updated successfully' : 'Failed to update reception');
    return response;
  };

  return {
    editDialogOpen,
    editingReception,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleSaveEditDialog,
  };
};
