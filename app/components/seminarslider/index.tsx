// CustomPagination.tsx
import React, { useState } from "react";
import { Pagination, Card, Button } from "antd";
import { LeftOutlined, RightOutlined, ZoomInOutlined } from "@ant-design/icons";
import { SeminarRepository } from "#/repository/seminar";
import { IntlProvider } from "react-intl";
import PriceFormatter from "../priceFormatter";

interface Slide {
  title: string;
  content: string;
}

const SeminarSlider: React.FC = () => {
  const {data: dataSeminar} = SeminarRepository.hooks.statusApprove()


  const itemsPerPage = 3; // Number of cards to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleSlides = dataSeminar?.data.slice(startIndex, endIndex);

  return (
    <div style={{ alignItems: "center" }}>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <div style={{ display: "flex" }}>
          <div className="pt-[120px]">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center h-fit text-black" type="link"
            >
              <LeftOutlined style={{ fontSize: "35px" }} className="arrow"/>
            </Button>
          </div>
          <div className="gap-7 flex">
            {visibleSlides?.map((val: any) => (
              <Card key={val.id} style={{marginBottom: '20px'}} className='w-[500px] h-[300px] flex items-center border-[#016255] font-sans shadow-md'>
              <div className="flex">
               <div>
               <img
             src={`http://localhost:3222/seminar/upload/${val.poster}/image`}
             style={{width: 'auto', height: '200px'}}
             className="mt-16 flex shadow-lg"
               />
               </div>
               <div className="pl-3 items-center flex pt-12">
                <div>
                 <div className="font-bold text-2xl w-[290px]">{val.title}</div>
                 <div className="font-semibold text-lg">{val.datetime}</div>
                 <div className="text-base font-medium text-green-700">
                   <IntlProvider>
                 <PriceFormatter value={val.price}/>
                   </IntlProvider>
                </div>
                 </div>
               </div>
              </div>
                 <div>
                 <div className='flex justify-end gap-5 items-end pb-5'>
               <Button type='text' className='bg-green-700 text-white hover:bg-green-600 items-center flex' href={`/seminar/${val.id}`}><ZoomInOutlined/>Detail</Button>
               <Button className='yellowButt bg-yellow-500 text-green-700 hover:bg-yellow-400' href={`/seminar/pembayaran/${val.id}`}>Pesan</Button>
               </div>
                 </div>
              </Card> 
            ))}
          </div>
          <div className="pt-[120px]">
            <Button
              disabled={currentPage === Math.ceil(dataSeminar?.data.length / itemsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center h-fit text-black"  type="link"
            >
              <RightOutlined style={{ fontSize: "35px" }} className="arrow"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarSlider;
