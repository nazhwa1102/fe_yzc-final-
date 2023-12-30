"use client";

import React, { useState } from "react";
import { Button, Card, Col, Pagination, Row } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import Layout2 from "#/app/components/layout";
import { SeminarRepository } from "#/repository/seminar";
import PriceFormatter from "#/app/components/priceFormatter";
import { IntlProvider } from "react-intl";


const pageSize = 6; // Number of cards to display per page

const listSeminar= () => {
  const {data: dataSeminar} = SeminarRepository.hooks.statusApprove()
  console.log(dataSeminar);
  

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const renderCards = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedData = dataSeminar?.data.slice(startIndex, endIndex);

    return (
      <div className="flex justify-center">
        <Row gutter={50}>
          {displayedData?.map((val: any) => (
           <Col span={100}>
           <Card key={val.id} style={{marginBottom: '20px'}} className='w-[480px] h-[200px] flex items-center border-[#016255] font-sans shadow-md'>
           <div className="flex">
            <div>
            <img
          src={`http://localhost:3222/seminar/upload/${val.poster}/image`}
          style={{width: 'auto', height: '150px'}}
            />
            </div>
            <div className="pl-3">
              <div className="font-bold text-2xl w-[290px]">{val.title}</div>
              <div className="font-semibold text-lg">{val.datetime}</div>
              <div className="text-base font-medium text-green-700">
                <IntlProvider>
              <PriceFormatter value={val.price}/>
                </IntlProvider>
              </div>
            <div className='flex justify-end gap-5 pt-10 items-end'>
               <Button type='text' className='bg-green-700 text-white hover:bg-green-600 items-center flex' href={`/seminar/${val.id}`}><ZoomInOutlined/>Detail</Button>
               <Button className='yellowButt bg-yellow-500 text-green-700 hover:bg-yellow-400' href={`/seminar/pembayaran/${val.id}`}>Pesan</Button>
            </div>
            </div>
           </div>
           </Card> 
           </Col>
          ))}
        </Row>
      </div>
    )
  };

  return (
    <Layout2 title="Seminar">
      <div>
        {renderCards()}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dataSeminar?.data.length}
          onChange={onPageChange}
          showSizeChanger={false}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>
    </Layout2>
  );
};

export default listSeminar;
