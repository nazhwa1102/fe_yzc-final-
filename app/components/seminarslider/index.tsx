// CustomPagination.tsx
import React, { useState } from "react";
import { Pagination, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Slide {
  title: string;
  content: string;
}

const SeminarSlider: React.FC = () => {
  const slides: Slide[] = [
    { title: "Slide 1", content: "Content 1" },
    { title: "Slide 2", content: "Content 2" },
    { title: "Slide 3", content: "Content 3" },
    { title: "Slide 4", content: "Content 4" },
    { title: "Slide 5", content: "Content 5" },
    { title: "Slide 5", content: "Content 5" },
    // Add more slides as needed
  ];

  const itemsPerPage = 2; // Number of cards to show per page
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
          <div className="pt-[120px]">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center h-fit"
            >
              <LeftOutlined style={{ fontSize: "35px" }} />
            </Button>
          </div>
          <div className="gap-7 flex">
            {visibleSlides.map((slide, index) => (
              <Card
                key={index}
                style={{ width: 500,height: 300 ,margin: "0 10px" }}
              >
                <p>{slide.content}</p>
              </Card>
            ))}
          </div>
          <div className="pt-[120px]">
            <Button
              disabled={currentPage === Math.ceil(slides.length / itemsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center h-fit"
            >
              <RightOutlined style={{ fontSize: "35px" }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarSlider;
