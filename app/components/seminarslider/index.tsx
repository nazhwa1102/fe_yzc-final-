// CustomPagination.tsx
import React, { useState } from "react";
import { Pagination, Card, Button } from "antd";
import { LeftOutlined, RightOutlined, ZoomInOutlined } from "@ant-design/icons";
import { SeminarRepository } from "#/repository/seminar";
import { IntlProvider } from "react-intl";
import PriceFormatter from "../priceFormatter";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/navigation";

interface Slide {
  title: string;
  content: string;
}

const SeminarSlider = () => {

  const token = localStorage.getItem('access_token');
  console.log(token, "yuk bisa");
  let role: string = '';
  let email: string = '';
  let fullNameCus: string = ''

  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNameCus = parseJwt(token).fullNameCus
    console.log(role, "role cocok");
    console.log(fullNameCus, 'nama');
    
  }

  const router = useRouter();


  const {data: dataSeminar} = SeminarRepository.hooks.seminarRekomen()


  const itemsPerPage = 3; // Number of cards to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleSlides = dataSeminar?.data.slice(startIndex, endIndex);

  function formatDateWithHyphens(date: any) {
    const inputDate = new Date(date);

    if (isNaN(inputDate.getTime())) {
      // Handle the case where 'date' is not a valid date
      console.error("Invalid date:", date);
      return "Invalid Date";
    }

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = inputDate.getDate().toString().padStart(2, "0");
    const hour = inputDate.getHours().toString().padStart(2, "0")
    const minute = inputDate.getMinutes().toString().padStart(2, "0")

    return `${year}-${month}-${day}`;
  }

  return (
    <div className= "slider" style={{ alignItems: "center" }}>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <div style={{ display: "flex" }}>
          <div className="pt-[100px]">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center h-fit text-black background-white-custom" type="link"
            >
              <LeftOutlined style={{ fontSize: "35px" }} className="arrow"/>
            </Button>
          </div>
          <div className="gap-7 flex">
            {visibleSlides?.map((val: any) => (
              <Card key={val.id} style={{marginBottom: '20px'}} className='w-[425px] h-[225px] flex items-center border-[#016255] font-sans shadow-md'>
              <div className="flex">
               <div>
               <img
             src={`http://localhost:3222/seminar/upload/${val.seminar_poster}/image`}
             style={{width: 'auto', height: '170px'}}
             className="mt-16 flex shadow-lg"
               />
               </div>
               <div className="pl-14 items-center flex pt-10">
                <div>
                 <div className="font-bold text-xl w-[150px]">{val.seminar_title}</div>
                 <div className="font-semibold text-base">{formatDateWithHyphens(val.seminar_datetime)}</div>
                 <div className="text-base font-sm text-green-700">
                   <IntlProvider>
                 <PriceFormatter value={val.seminar_price}/>
                   </IntlProvider>
                </div>
                 </div>
               </div>
              </div>
                 <div className="pl-20 flex justify-end ml-[80px] mb-14">
                 <div className='flex justify-end gap-5 items-end]'> 
               <Button type='text' className='bg-green-700 text-white hover:bg-green-600 items-center flex' href={`/seminar/${val.seminar_id}`}><ZoomInOutlined/>Detail</Button>
               <Button className='text-black yellowButt hover:bg-yzc' type="dashed" onClick={() => {
                if (token) {
                  router.push(`/seminar/pembayaran/${val.seminar_id}`)
                }else{
                  router.push('/login')
                }
               }}>Pesan</Button>
               </div>
                 </div>
              </Card> 
            ))}
          </div>
          <div className="pt-[100px]">
            <Button
              disabled={currentPage === Math.ceil(dataSeminar?.data.length / itemsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center h-fit text-black background-white-custom"  type="link"
            >
              <RightOutlined style={{ fontSize: "35px" }} className="arrow "/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarSlider;
