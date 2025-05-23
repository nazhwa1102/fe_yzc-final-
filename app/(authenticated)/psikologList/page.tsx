"use client"

import React from "react";
  import { Button, Card, Col, Row } from "antd";
import { PsikologRepository } from "#/repository/psikolog";
import Layout2 from "#/app/components/layout";

const Psikologlist = () => {
  const { data: dataPsikolog } = PsikologRepository.hooks.active();
  return (
    <Layout2>
    <div className="justify-center pt-[100px] flex">
      <Row gutter={20} className="items-center flex justify-center gap-12 pr-8">
      {dataPsikolog?.data.map((val: any) => (
        <>
        <Col span={7}>
          <Card
            bordered={true}
            style={{ width: "500px", height: "300px", borderRadius: "25px" }}
            className=" justify-center flex shadow-md bg-slate-50"
            >
            <div className="flex justify-center">
              <img
                src={`http://localhost:3222/psikolog/upload/${val.photo}/image`}
                alt=""
                className="rounded-[50%] w-[170px] h-[170px] mt-[-90px] shadow-lg"
                />
            </div>
            <p className="font-bold text-2xl pt-5 justify-center flex">
              {val.fullName}
            </p>
            <div className="font-semibold text-lg flex justify-center">
              {val.spesialis}
            </div>
            <div className="flex gap-5 justify-center pt-10">
              <Button type="text" className="rounded-xl bg-[#00b96b]">
                Konsultasi
                href={`konsultasi/`}
              </Button>
              <Button className="rounded-xl yellowButt" type="dashed">
                Lihat Profil
              </Button>
            </div>
          </Card>
        </Col>
        </>
      ))}
      </Row>
    </div>
   </Layout2>
  );
};

export default Psikologlist;
