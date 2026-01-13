// CustomPagination.tsx
import React, { useState } from "react";
import { Pagination, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Slide {
  id: string
  image: string
  title: string;
  content: string;
}

const ArtikelSlider: React.FC = () => {
  const slides: Slide[] = [
    {id: '1', image: "https://i.ibb.co/gFXZmYp/dcdcd628-aa7a-4467-834c-0218c6082737.jpg", title: "“Ketika Hidup Terasa Begitu Berat”", content: "Terkadang, hidup dapat terasa begitu berat. Seperti saat rencana yang telah kita susun tidak berjalan dengan....." },
    {id: '2',image: "https://i.ibb.co/N6dC0BW/3c569a03-2ddb-4e00-b774-c0e97ebc4f37.jpg", title: "“Kapan Seseorang Butuh Konseling?”", content: "Konseling bagi sebagian orang sering dianggap sebagai sesi curhat semata. Padahal..." },
    {id: '3',image: "https://i.ibb.co/jvxkqMZ/c8d263-4e499f977bd34f35ba501c0bd8299407-mv2.webp", title: "“Alasan Konseling Nggak Cukup Sekali”", content: "“hah, harus konseling lagi? “berarti konselling aku gagal kah?”..." },
    {id: '4',image: "https://static.vecteezy.com/system/resources/previews/021/153/283/non_2x/psychology-depression-people-elderly-asian-adult-man-men-consulting-with-psychologist-psychiatrist-while-elderly-old-patient-counseling-mental-with-doctor-woman-at-clinic-encouraging-therapy-free-photo.jpg", title: "“Konseling Itu Penting”", content: "“hah, harus konseling lagi? “berarti konselling aku gagal kah?..."  },
    {id: '5',image: "https://static.vecteezy.com/system/resources/previews/033/229/232/non_2x/woman-with-mental-health-problems-is-consulting-psychiatrist-is-recording-the-patient-s-condition-for-treatment-encouragement-love-and-family-problem-bipolar-depression-patient-protect-suicide-free-photo.jpg",title: "“Kecemasan adalah bagian dari pendewasan?”", content: "“Terkadang, hidup dapat terasa begitu berat. Seperti saat rencana yang telah kita susun tidak....." },
    {id: '6',image: "https://static.vecteezy.com/system/resources/previews/019/050/370/non_2x/male-businessmen-support-and-encourage-colleagues-who-are-fired-free-photo.jpg",title: "“5 Cara Efektif Mencegah Parental Burnout”", content: "Konseling bagi sebagian orang sering dianggap sebagai sesi curhat semata. Padahal..." },
    // Add more slides as needed
  ];

  const itemsPerPage = 3; // Number of cards to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleSlides = slides.slice(startIndex, endIndex);

  return (
    <div style={{ alignItems: "center" }}>
      <div style={{ marginTop: "10px", textAlign: "justify" }}>
        <div style={{ display: "flex" }}>
          <div className="pt-[175px] pr-5">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center w-fit h-fit text-black background-white-custom" type="link"
            >
              <LeftOutlined style={{ fontSize: "45px" ,color: "black"}} className="arrow"/>
            </Button>
          </div>
          <div className="gap-10 flex">
            {visibleSlides.map((slide, index) => (
              <Card
                key={index}
                style={{ width: '350px', height: '375px', margin: "0 10px" }}
                className="shadow-md bg-slate-50"
              >
                <div className="justify-center flex">
                  <div>
                 <div className="object-cover flex justify-center">
                  <img src={slide.image} className="rounded-xl w-[270px] h-[150px] flex justify-center shadow-lg"  />
                 </div>
                 <div className="pt-3 font-bold text-[16px] justify-center flex">
                  {slide.title}
                 </div>
                 <div className="flex justify-center">
                 <div className="pt-2 text-justify w-[300px] h-auto flex justify-center text-base">
                  {slide.content}
                 </div>
                 </div>
                  </div>
                </div>
                 <div className="flex justify-end bottom-2 right-3 absolute">
                  <Button type="text" className="rounded-xl">
                    Baca Selengkapnya
                  </Button>
                 </div>
              </Card>
            ))}
          </div>
          <div className="pt-[175px] pl-5">
            <Button
              disabled={currentPage === Math.ceil(slides.length / itemsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center h-fit w-fit text-black background-white-custom" type="link"
            >
              <RightOutlined style={{ fontSize: "45px" ,color:"black"}} className="arrow"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtikelSlider;
