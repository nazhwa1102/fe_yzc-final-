import React from "react";
import { Button, Card, Col, Row } from "antd";

const Psikologlist: React.FC = () => (
  <div className="justify-center pt-[100px] flex">
    <Row gutter={20} className="items-center flex justify-center gap-12 pr-8">
      <Col span={7}>
        <Card
          bordered={true}
          style={{ width: "400px", height: "270px", borderRadius: "25px" }}
          className=" justify-center flex shadow-md bg-slate-50"
        >
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/premium-photo/young-asian-male-smiling-laughing-with-arms-crossed_264197-33745.jpg?w=826"
              alt=""
              className="rounded-[50%] w-[150px] h-[150px] mt-[-90px] shadow-lg"
            />
          </div>
          <p className="font-bold text-xl pt-5 justify-center flex">
            Danar Kahfi, M. Psi
          </p>
          <p className="text-center">Psikolog Klinis</p>
          <div className="flex gap-5 justify-center pt-10">
            <Button type="text" className="rounded-xl bg-[#00b96b] hover:bg-green-200">
              Konsultasi
            </Button>
            <Button className="rounded-xl !bg-transparent border-green-600 !text-green-600 hover:bg-gray-100 transition-colors duration-200">
              Lihat Profile
            </Button>
          </div>
        </Card>
      </Col>
      <Col span={7}>
        <Card
          bordered={true}
          style={{ width: "400px", height: "270px", borderRadius: "25px" }}
          className=" justify-center flex shadow-md bg-slate-50"
        >
          <div className="flex justify-center">
            <img
              src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg"
              alt=""
              className="rounded-[50%] w-[150px] h-[150px] mt-[-90px] shadow-lg"
            />
          </div>
          <p className="font-bold text-xl pt-5 justify-center flex">
            Cecillia Siregar, M.Psi
          </p>
          <p className="text-center">
            Psikolog Klinis, Certified EMDR Consultant
          </p>
          <div className="flex gap-5 justify-center pt-10">
            <Button type="text" className="rounded-xl bg-[#00b96b] text-white">
              Konsultasi
            </Button>
            <Button className= "rounded-xl !bg-transparent border-green-600 !text-green-600 hover:bg-gray-100 transition-colors duration-200">
              Lihat Profil
            </Button>
          </div>
        </Card>
      </Col>
      <Col span={7}>
        <Card
          bordered={true}
          style={{ width: "400px", height: "270px", borderRadius: "25px" }}
          className=" justify-center flex shadow-md bg-slate-50"
        >
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/premium-photo/female-indonesian-woman-posing-facing-camera_802140-1795.jpg?w=826"
              alt=""
              className="rounded-[50%] w-[150px] h-[150px] mt-[-90px] shadow-lg"
            />
          </div>
          <p className="font-bold text-xl pt-5 justify-center flex">
            Nazhwa Nur , M. Psi
          </p>
          <p className="text-center">Psikolog Klinis</p>
          <div className="flex gap-5 justify-center pt-10">
            <Button type="text" className="rounded-xl bg-[#00b96b]">
              Konsultasi
            </Button>
            <Button className= "rounded-xl !bg-transparent border-green-600 !text-green-600 hover:bg-gray-100 transition-colors duration-200">
              Lihat Profil
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Psikologlist;
