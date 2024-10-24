'use client';

import React, { useState } from 'react';

const SettingPage: React.FC = () => {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">設定画面</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          アップロード
        </button>
      </form>
    </div>
  );
};

export default SettingPage;