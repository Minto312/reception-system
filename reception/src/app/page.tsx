'use client';

import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-4">
        <Link href="/reception">
          <Button variant="gradient" color="blue" className="w-64 text-black bg-blue-300 p-3">
            受付
          </Button>
        </Link>
        <Link href="/show">
          <Button variant="gradient" color="green" className="w-64 text-black bg-blue-300 p-3">
            BACK
          </Button>
        </Link>
        <Link href="/setting">
          <Button variant="gradient" color="red" className="w-64 text-black bg-blue-300 p-3">
            設定
          </Button>
        </Link>
      </div>
    </div>
  );
}