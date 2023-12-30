"use client";

import { usePathname } from "next/navigation";
import { Card } from "antd/lib/index";
import { Button } from "antd";
import { SeminarRepository } from "#/repository/seminar";
import { parseJwt } from "#/app/components/helper/convert";
import { IntlProvider } from "react-intl";
import PriceFormatter from "#/app/components/priceFormatter";
import { useEffect } from "react";
import LayoutAdmin from "#/app/components/layoutadmin";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RedoOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { PsikologRepository } from "#/repository/psikolog";

const detailSeminar = () => {
  const pathname = usePathname().split("/");
  const { data } = PsikologRepository.hooks.getById(
    pathname[pathname.length - 1]
  );

  const Status = () => {
    if (data?.data.status === "not active") {
      return (
        <div>
          <div
            className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 bg-red-600 text-white"
            style={{
              border: "1px solid #016225",
              width: "400px",
              height: "auto",
            }}
          >
            <CloseCircleOutlined /> Psikolog Ditolak
          </div>
        </div>
      );
    }
    if (data?.data.status === "active") {
      return (
        <div>
          <div
            className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 bg-green-500 text-white"
            style={{
              border: "1px solid #016225",
              width: "400px",
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
              width: "400px",
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
      <div className="flex justify-center pt-5 ">
        <div className="flex justify-between gap-[100px] mt-5">
          <div className="items-center">
            <div className="font-bold text-2xl">Poster Seminar</div>
            <div className="flex justify-center pt-2">
              <img
                src={`http://localhost:3222/psikolog/upload/${data?.data.photo}/image`}
                style={{ width: "70%", height: "auto" }}
              />
            </div>
            <div className="font-bold text-2xl pb-1">Nama:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            {data?.data.fullName}
          </div>
          <div className="font-bold text-2xl pb-1">Janis Kelamin:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            {data?.data.gender}
          </div>
          <div className="font-bold text-2xl pb-1">Tanggal Lahir:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            {data?.data.birth_date}
          </div>
          </div>
        <div>
          <div className="font-bold text-2xl">Agama:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            {data?.data.religion}
          </div>
          <div className="font-bold text-2xl">Email:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            {data?.data.user_yzc?.email}
          </div>
          <div className="font-bold text-2xl">Nomor Telepon:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            {data?.data.phone}
          </div>
          <div className="font-bold text-2xl">Pendidikan Terakhir:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            {data?.data.lastEducation}
          </div>
          <div className="font-bold text-2xl pt-20 pb-1">Status Psikolog</div>
          <div>
            <Status />
          </div>
            </div>
            <div>
            <div className="font-bold text-2xl">Case Handled:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            Banyak
          </div>
          <div className="font-bold text-2xl">Tantang Saya:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2"
            style={{
                border: "1px solid #016225",
                width: "400px",
                height: "auto",
            }}
          >
            {data?.data.aboutMe}
          </div>
          <div className="font-bold text-2xl">Legalitas:</div>
          <div
            className="font-semibold text-lg rounded-lg p-2">
            <img
                src={`http://localhost:3222/psikolog/upload/legality/${data?.data.legality}/image`}
                style={{ width: "75%", height: "auto" }}
              />
          </div>
            </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default detailSeminar;
