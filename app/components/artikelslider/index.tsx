// CustomPagination.tsx
import React, { useState } from "react";
import { Pagination, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Slide {
  title: string;
  content: string;
}

const ArtikelSlider: React.FC = () => {
  const slides: Slide[] = [
    { title: "Slide 1", content: "Content 1" },
    { title: "Slide 2", content: "Content 2" },
    { title: "Slide 3", content: "Content 3" },
    { title: "Slide 4", content: "Content 4" },
    { title: "Slide 5", content: "Content 5" },
    { title: "Slide 5", content: "Content 5" },
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
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <div style={{ display: "flex" }}>
          <div className="pt-[135px] pr-5">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center w-fit h-fit text-black" type="link"
            >
              <LeftOutlined style={{ fontSize: "35px" }} className="arrow"/>
            </Button>
          </div>
          <div className="gap-10 flex">
            {visibleSlides.map((slide, index) => (
              <Card
                key={index}
                style={{ width: 450, height: '300px', margin: "0 10px" }}
                className="shadow-md bg-slate-50"
              >
                <p>{slide.content}</p>
              </Card>
            ))}
          </div>
          <div className="pt-[135px] pl-5">
            <Button
              disabled={currentPage === Math.ceil(slides.length / itemsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center h-fit w-fit text-black" type="link"
            >
              <RightOutlined style={{ fontSize: "35px" }} className="arrow"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtikelSlider;
