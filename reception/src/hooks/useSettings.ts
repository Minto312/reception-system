import { useState } from 'react';

export const useSettings = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/reception/csv', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      alert('CSVファイルが正常にアップロードされました');
    } else {
      alert(`エラーが発生しました: ${result.error}`);
    }
  };

  const handleExport = async () => {
    const response = await fetch('/api/reception/csv', {
      method: 'GET',
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'receptions.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      const result = await response.json();
      alert(`エラーが発生しました: ${result.error}`);
    }
  };

  const handleDelete = async () => {
    const response = await fetch('/api/reception/csv', {
      method: 'DELETE',
    });

    const result = await response.json();
    if (response.ok) {
      alert('データベースの内容が正常に削除されました');
    } else {
      alert(`エラーが発生しました: ${result.error}`);
    }
  };

  return {
    file,
    handleFileChange,
    handleSubmit,
    handleExport,
    handleDelete,
  };
};