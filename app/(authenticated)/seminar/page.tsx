"use client";

import React, { useState } from 'react';
import { Button, Card, Pagination } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import Layout2 from '#/app/components/layout';


const data = [
  {id: '1', title: 'Seminar Tentang Masalah Mental 1', Poster: 'IMG 1' ,Date: '23 Desember 2023',Price:'100000'},
  {id: '2', title: 'Seminar Tentang Masalah Mental 2', Poster: 'IMG 2' ,Date: '24 Desember 2023',Price:'100000'},
  {id: '3', title: 'Seminar Tentang Masalah Mental 3', Poster: 'IMG 3' ,Date: '25 Desember 2023',Price:'100000'},
  {id: '4',title: 'Seminar Tentang Masalah Mental 4', Poster: 'IMG 4' ,Date: '26 Desember 2023',Price:'100000'},
  {id: '5', title: 'Seminar Tentang Masalah Mental 5', Poster: 'IMG 5' ,Date: '27 Desember 2023',Price:'100000'},
  {id: '6', title: 'Seminar Tentang Masalah Mental 6', Poster: 'IMG 6' ,Date: '28 Desember 2023',Price:'100000'},
  {id: '7', title: 'Seminar Tentang Masalah Mental 7', Poster: 'IMG 7' ,Date: '23 Desember 2023',Price:'100000'},
  {id: '8', title: 'Seminar Tentang Masalah Mental 8', Poster: 'IMG 8' ,Date: '24 Desember 2023',Price:'100000'},
  {id: '9', title: 'Seminar Tentang Masalah Mental 9', Poster: 'IMG 9' ,Date: '25 Desember 2023',Price:'100000'},
  {id: '10', title: 'Seminar Tentang Masalah Mental 10', Poster: 'IMG 10' ,Date: '26 Desember 2023',Price:'100000'},
  {id: '11', title: 'Seminar Tentang Masalah Mental 11', Poster: 'IMG 11' ,Date: '27 Desember 2023',Price:'100000'},
  {id: '12', title: 'Seminar Tentang Masalah Mental 12', Poster: 'IMG 12' ,Date: '28 Desember 2023',Price:'100000'},
  // Add more data as needed
];

const pageSize = 3; // Number of cards to display per page

const listSeminar = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const renderCards = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedData = data.slice(startIndex, endIndex);

    return displayedData.map((item, index) => (
        <div className='flex justify-center'>
        <Card key={index} style={{marginBottom: '20px'}} className='w-[750px] flex items-center border-[#016255] font-sans'>
        <div className='flex justify-between gap-10'>
        <div className='flex justify-center w-[170px] h-[200px] items-center bg-slate-500'>
        {item.Poster}
        </div>
        <div>
        <p className='font-bold text-2xl '>{item.title}</p>
        <p className='text-lg'>{item.Date}</p>
        <p className='text-[#016255] text-xl'>Rp.{item.Price}</p>
        </div>
        <div className='flex justify-end gap-5 items-end'>
        <Button type='text' className='bg-slate-300' href={`/seminar/${item.id}`}><ZoomInOutlined />Detail</Button>
        <Button type='primary' href={`/seminar/pembayaran/${item.id}`}>Pesan</Button>
        </div>
        </div>
        </Card>
        </div>
    ));
  };

  return (
      <Layout2 title="Seminar">
    <div>
      {renderCards()}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={onPageChange}
        showSizeChanger={false}
        style={{ marginTop: '16px', textAlign: 'center' }}
        />
    </div>
    </Layout2>
  );
};

export default listSeminar;





