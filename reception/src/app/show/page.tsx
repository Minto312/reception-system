import React from 'react';
import BackVisitorList from '@/components/show/BackVisitorList';
import ReceptionProgress from '@/components/ReceptionProgress';

const BackPage: React.FC = () => {
  return (
    <>
      <ReceptionProgress />
      <BackVisitorList />
    </>
  );
};

export default BackPage;