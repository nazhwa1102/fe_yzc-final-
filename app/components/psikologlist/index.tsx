import React from "react";
import { Button, Card, Col, Row } from "antd";

const Psikologlist: React.FC = () => (
  <div className="justify-center pt-[100px] flex">
    <Row gutter={20} className="items-center flex justify-center gap-12 pr-8">
      <Col span={7}>
        <Card
          bordered={true}
          style={{ width: "500px", height: "300px", borderRadius: "25px" }}
          className=" justify-center flex shadow-md bg-slate-50"
        >
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1701475200&semt=ais"
              alt=""
              className="rounded-[50%] w-[150px] h-[150px] mt-[-90px]"
            />
          </div>
          <p className="font-bold text-xl pt-5 justify-center flex">Danar Kahfi, M. Psi</p>
          <p className="text-center">Psikolog Klinis</p>
          <div className="flex gap-5 justify-center pt-10">
            <Button type="text" className="rounded-xl bg-[#00b96b]">Konsultasi</Button>
            <Button className="bg-yellow-400 text-green-800 rounded-xl hover:bg-yellow-400 yellowButt">Lihat Profil</Button>
          </div>
        </Card>
      </Col>
      <Col span={7}>
        <Card
          bordered={true}
          style={{ width: "500px", height: "300px", borderRadius: "25px" }}
          className=" justify-center flex shadow-md bg-slate-50"
        >
          <div className="flex justify-center">
            <img
              src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg"
              alt=""
              className="rounded-[50%] w-[150px] h-[150px] mt-[-90px]"
            />
          </div>
          <p className="font-bold text-xl pt-5 justify-center flex">Cecillia Siregar, M.Psi</p>
          <p className="text-center">Psikolog Klinis, Certified EMDR Consultant</p>
          <div className="flex gap-5 justify-center pt-10">
            <Button type="text" className="rounded-xl bg-[#00b96b]">Konsultasi</Button>
            <Button className="bg-yellow-400 text-green-800 rounded-xl hover:bg-yellow-400 yellowButt">Lihat Profil</Button>
          </div>
        </Card>
      </Col>
      <Col span={7}>
        <Card
          bordered={true}
          style={{ width: "500px", height: "300px", borderRadius: "25px" }}
          className=" justify-center flex shadow-md bg-slate-50"
        >
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/free-photo/happy-successful-muslim-businesswoman-posing-outside_74855-2007.jpg"
              alt=""
              className="rounded-[50%] w-[150px] h-[150px] mt-[-90px]"
            />
          </div>
          <p className="font-bold text-xl pt-5 justify-center flex">Nazhwa Nur , M. Psi</p>
          <p className="text-center">Psikolog Klinis</p>
          <div className="flex gap-5 justify-center pt-10">
            <Button type="text" className="rounded-xl bg-[#00b96b]">Konsultasi</Button>
            <Button className="bg-yellow-400 text-green-800 rounded-xl hover:bg-yellow-400 yellowButt">Lihat Profil</Button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Psikologlist;
