'use client';

import React from 'react';
import { Card, CardBody, Typography, Button, Input } from '@material-tailwind/react';
import { useSettings } from '@/hooks/useSettings';

const SettingPage: React.FC = () => {
  const { file, handleFileChange, handleSubmit, handleExport, handleDelete } = useSettings();

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
            設定画面
          </Typography>
          <form onSubmit={handleSubmit} className="mb-24">
            <label className="text-blue-gray-500">CSVファイルをアップロード</label>
            <Input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" size="lg" />
            <Button type="submit" variant="gradient" color="blue" className="w-fit flex items-center justify-start text-black bg-gray-300 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
              アップロード
            </Button>
          </form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={handleExport} variant="gradient" color="green" className="w-full flex items-center justify-center text-black bg-green-300 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              エクスポート
            </Button>
            <Button onClick={handleDelete} variant="gradient" color="red" className="w-full flex items-center justify-center text-black bg-red-300 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              データベースを削除
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SettingPage;