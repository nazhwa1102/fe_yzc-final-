import React from "react";
import { Button, Card, Col, Row } from "antd";
import { TransaksiRepository } from "#/repository/transaksi";
import { PsikologRepository } from "#/repository/psikolog";

const Psikologlist: React.FC = () => {
  const {data: dataRekomen} = TransaksiRepository.hooks.rekomenPsikolog()

  return (
    <div className="justify-center pt-[100px] flex">
    <Row gutter={20} className="items-center justify-center gap-12 pr-8 flex">
      <Col span={7}>
      <Card
        bordered={true}
        style={{ width: "420px", height: "270px", borderRadius: "25px" }}
        className=" justify-center flex shadow-md bg-slate-50"
      >
        <div className="flex justify-center">
          <img
            src={`http://localhost:3222/psikolog/upload/${dataRekomen?.data[0].psikolog_photo}/image`}
            alt=""
            className="rounded-[50%] w-[170px] h-[170px] mt-[-90px] shadow-lg"
          />
        </div>
        <p className="font-bold text-xl pt-5 justify-center flex">{dataRekomen?.data[0].psikolog_nama}</p>
        <div className="font-semibold text-base flex justify-center">{dataRekomen?.data[0].psikolog_spesialis}</div>
        <div className="flex gap-5 justify-center pt-5">
          <Button type="text" className="rounded-xl bg-[#00b96b]" href={`/konsultasi/${dataRekomen?.data[0].psikolog_id}`}>Konsultasi</Button>
          <Button className="rounded-xl yellowButt text-yzc" type="dashed">Lihat Profil</Button>
        </div>
      </Card>
    </Col>
    <Col span={7}>
      <Card
        bordered={true}
        style={{ width: "420px", height: "270px", borderRadius: "25px" }}
        className=" justify-center flex shadow-md bg-slate-50"
      >
        <div className="flex justify-center">
          <img
            src={`http://localhost:3222/psikolog/upload/${dataRekomen?.data[1].psikolog_photo}/image`}
            alt=""
            className="rounded-[50%] w-[170px] h-[170px] mt-[-90px] shadow-lg"
          />
        </div>
        <p className="font-bold text-xl pt-5 justify-center flex">{dataRekomen?.data[1].psikolog_nama}</p>
        <div className="font-semibold text-base flex justify-center">{dataRekomen?.data[1].psikolog_spesialis}</div>
        <div className="flex gap-5 justify-center pt-5">
          <Button type="text" className="rounded-xl bg-[#00b96b]" href={`/konsultasi/${dataRekomen?.data[1].psikolog_id}`}>Konsultasi</Button>
          <Button className="rounded-xl yellowButt" type="dashed">Lihat Profil</Button>
        </div>
      </Card>
    </Col>
    <Col span={7}>
      <Card
        bordered={true}
        style={{ width: "420px", height: "270px", borderRadius: "25px" }}
        className=" justify-center flex shadow-md bg-slate-50"
      >
        <div className="flex justify-center">
          <img
            src={`http://localhost:3222/psikolog/upload/${dataRekomen?.data[2].psikolog_photo}/image`}
            alt=""
            className="rounded-[50%] w-[170px] h-[170px] mt-[-90px] shadow-lg"
          />
        </div>
        <p className="font-bold text-xl pt-5 justify-center flex">{dataRekomen?.data[2].psikolog_nama}</p>
        <div className="font-semibold text-base flex justify-center">{dataRekomen?.data[2].psikolog_spesialis}</div>
        <div className="flex gap-5 justify-center pt-5">
          <Button type="text" className="rounded-xl bg-[#00b96b]" href={`/konsultasi/${dataRekomen?.data[2].psikolog_id}`}>Konsultasi</Button>
          <Button className="yellowButt rounded-xl" type="dashed">Lihat Profil</Button>
        </div>
      </Card>
    </Col>
    </Row>
  </div>
  )
  }

export default Psikologlist;
