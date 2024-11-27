'use client';

import React from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useReceptionProgress } from '@/hooks/useReceptionProgress';

const ReceptionProgress: React.FC = () => {
  const { respondedReceptionCount, totalReceptionCount, respondedRate } = useReceptionProgress();

  return (
    <Card className="max-w-sm shadow-md w-fit">
      <CardBody>
        <div className="text-center flex gap-6">
          <Typography className='font-bold'>
            {`${respondedReceptionCount} / ${totalReceptionCount}`}
          </Typography>
          <Typography className='font-bold'>
            {`${respondedRate.toFixed(2)}%`}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReceptionProgress;