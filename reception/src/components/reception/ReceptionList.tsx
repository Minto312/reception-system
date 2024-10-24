'use client';

import React from 'react';
import { useFilteredReceptions } from '@/hooks/useFilteredReceptions';
import { Reception } from '@/types';
import { Card, Typography, Input } from '@material-tailwind/react';

const TABLE_HEAD = ['ID', 'Hash', 'Company Name', 'Assigned Office', 'CA Name', 'Customer Name', 'Guest Pass Number', 'Visit DateTime', 'Attended CA', 'Customer Email', 'Customer Address', 'Customer Phone Number', 'Office Sales List ID'];

export const ReceptionList: React.FC = () => {
  const { filteredReceptions, isLoading, error, searchTerm, handleSearchChange } = useFilteredReceptions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Card className="h-full w-full overflow-scroll mt-6">
      <div className="p-4">
        <Input type="text" placeholder="Search by Company Name" value={searchTerm} onChange={handleSearchChange} className="mb-4" />
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredReceptions?.map((reception: Reception, index) => (
            <tr key={reception.id} className={index % 2 === 0 ? 'even:bg-blue-gray-50/50' : ''}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.hash}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.companyName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.assignedOffice}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.caName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.customerName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.guestPassNumber}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {new Date(reception.visitDateTime).toLocaleString()}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.attendedCA}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.customerEmail}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.customerAddress}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.customerPhoneNumber}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {reception.officeSalesListID}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
