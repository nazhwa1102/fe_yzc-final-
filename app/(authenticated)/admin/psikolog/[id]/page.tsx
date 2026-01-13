"use client";

import { usePathname } from "next/navigation";
import { Card } from "antd/lib/index";
import { Button, Image } from "antd";
import { SeminarRepository } from "#/repository/seminar";
import { parseJwt } from "#/app/components/helper/convert";
import { IntlProvider } from "react-intl";
import PriceFormatter from "#/app/components/priceFormatter";
import { useEffect, useState } from "react";
import LayoutAdmin from "#/app/components/layoutadmin";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RedoOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { PsikologRepository } from "#/repository/psikolog";
import TextArea from "antd/lib/input/TextArea";

const detailSeminar = () => {
  const pathname = usePathname().split("/");
  const { data } = PsikologRepository.hooks.getById(
    pathname[pathname.length - 1]
  );

  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  const Status = () => {
    if (data?.data.user_yzc?.status === "not active") {
      return (
        <div>
          <div
            className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 bg-red-600 text-white"
            style={{
              border: "1px solid #016225",
              width: "300px",
              height: "auto",
            }}
          >
            <CloseCircleOutlined /> Psikolog Ditolak
          </div>
        </div>
      );
    }
    if (data?.data.user_yzc?.status === "active") {
      return (
        <div>
          <div
            className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 bg-green-500 text-white"
            style={{
              border: "1px solid #016225",
              width: "300px",
              height: "auto",
            }}
          >
            <CheckCircleOutlined /> Psikolog Disetujui
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 text-yzc"
            style={{
              border: "1px solid #016225",
              width: "300px",
              height: "auto",
            }}
          >
            <RedoOutlined rotate={-90} /> Menunggu Konfirmasi Admin
          </div>
        </div>
      );
    }
  };

  return (
    <LayoutAdmin menu="psikolog">
      <div className="text-3xl font-bold flex justify-center">
        Lihat Detail Psikolog
      </div>
      <div>
        <div className="flex justify-center pt-10">
          <div>
            <div className="flex justify-center pt-2">
              <img
                src={`http://localhost:3222/psikolog/upload/${data?.data.photo}/image`}
                style={{ width: "200px", height: "auto" }}
                className="rounded-[50%]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center text-2xl font-bold pt-5">
          <div>
            <div className="flex justify-center">Profil Psikolog</div>
            <div className="flex justify-center pt-3">
            <Button type="primary" onClick={() => setVisible(true)}>
              Lihat Legalitas
            </Button>
            </div>
            <div className="flex justify-center pt-3">
              <Status />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-7 pt-5">
          <div>
            <div className="font-bold text-2xl pb-1 pt-3">Nama:</div>
            <div
              className="font-semibold text-lg rounded-lg p-2"
              style={{
                border: "1px solid #016225",
                width: "500px",
                height: "auto",
              }}
            >
              {data?.data.fullName}
            </div>
            <div className="font-bold text-2xl pb-1 pt-3">Jenis Kelamin:</div>
            <div
              className="font-semibold text-lg rounded-lg p-2"
              style={{
                border: "1px solid #016225",
                width: "500px",
                height: "auto",
              }}
            >
              {data?.data.gender}
            </div>
            <div className="font-bold text-2xl pb-1 pt-3">Tanggal Lahir:</div>
            <div
              className="font-semibold text-lg rounded-lg p-2"
              style={{
                border: "1px solid #016225",
                width: "500px",
                height: "auto",
              }}
            >
              {data?.data.birth_date}
            </div>
            <div className="font-bold text-2xl pb-1 pt-3">
              Pendidikan Terakhir:
            </div>
            <div
              className="font-semibold text-lg rounded-lg p-2"
              style={{
                border: "1px solid #016225",
                width: "500px",
                height: "auto",
              }}
            >
              {data?.data.lastEducation}
            </div>
          </div>
          <div>
            <div className="font-bold text-2xl pb-1 pt-3">Agama:</div>
            <div
              className="font-semibold text-lg rounded-lg p-2"
              style={{
                border: "1px solid #016225",
                width: "500px",
                height: "auto",
              }}
            >
              {data?.data.religion}
            </div>
            <div className="font-bold text-2xl pb-1 pt-3">Email:</div>
            <div
              className="font-semibold text-lg rounded-lg p-2"
              style={{
                border: "1px solid #016225",
                width: "500px",
                height: "auto",
              }}
            >
              {data?.data.user_yzc?.email}
            </div>
            <div className="font-bold text-2xl pb-1 pt-3">Nomor Telepon:</div>
            <div
              className="font-semibold text-lg rounded-lg p-2"
              style={{
                border: "1px solid #016225",
                width: "500px",
                height: "auto",
              }}
            >
              {data?.data.phone}
            </div>
            <div className="font-bold text-2xl pb-1 pt-3">Spesialisasi:</div>
            <div
              className="font-semibold text-lg rounded-lg p-2"
              style={{
                border: "1px solid #016225",
                width: "500px",
                height: "auto",
              }}
            >
              {data?.data.spesialis}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-7 text-black">
          <div>
            <div className="font-bold text-2xl pb-1 pt-3">Tantang Saya:</div>
            <div>
              <TextArea
                value={data?.data.aboutMe}
                readOnly={true}
                className="font-semibold text-lg rounded-lg p-2"
                style={{
                  border: "1px solid #016225",
                  width: "500px",
                  height: "100px",
                  color: "black",
                }}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-2xl pb-1 pt-3">Kasus Ditangani:</div>
            <div>
              <TextArea
                value={data?.data.caseHandled}
                readOnly={true}
                className="font-semibold text-lg rounded-lg p-2"
                style={{
                  border: "1px solid #016225",
                  width: "500px",
                  height: "100px",
                  color: "black",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-5">
          <div>
            <div className="font-semibold text-lg rounded-lg p-2 flex justify-center">
              <Image
                src={`http://localhost:3222/psikolog/upload/legality/${data?.data.legality}/image`}
                style={{ width: "50%", height: "auto", display: "none" }}
                preview={{
                  visible,
                  scaleStep,
                  src: `http://localhost:3222/psikolog/upload/legality/${data?.data.legality}/image`,
                  onVisibleChange: (value) => {
                    setVisible(value);
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default detailSeminar;
