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
import { CheckCircleOutlined, CloseCircleOutlined, RedoOutlined, UndoOutlined } from "@ant-design/icons";
import LayoutPsikolog from "#/app/components/dashboardPsikolog";

const detailSeminar = () => {

  const pathname = usePathname().split("/");
  const { data } = SeminarRepository.hooks.detailSeminar(
    pathname[pathname.length - 1]
  );

  const Status = () => {
    if (data?.data.status === 'reject') {
      return(
        <div>
          <div className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 bg-red-600 text-white" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
              <CloseCircleOutlined/> Seminar Ditolak Psikolog
          </div>
        </div>
      )
    }if (data?.data.status === 'approve') {
      return(
        <div>
          <div className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 bg-green-500 text-white" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
              <CheckCircleOutlined/> Seminar Telah Disetejui
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <div className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 text-yzc" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
              <RedoOutlined rotate={-90}/> Menunggu Konfirmasi Psikolog
          </div>
        </div>
      )
    }
  }
   
  return (
    <LayoutPsikolog>
      <div className="text-3xl font-bold flex justify-center">
        Lihat Detail Seminar
      </div>
      <div className="flex justify-center pt-5 ">
          <div className="flex justify-between gap-[100px] mt-5">
            <div className="items-center">
              <div className="font-bold text-2xl">
                Poster Seminar
              </div>
              <div>
                <img
                  src={`http://localhost:3222/seminar/upload/${data?.data.poster}/image`}
                  style={{ height: "400px", width: "auto" }} className="rounded-lg"
                />
              </div>
              <div className="pt-10">
                <div className="font-bold text-2xl">
                  Pemateri
                </div>
              <div className="justify-center pt-5 pl-5 border-yzc rounded-xl" style={{border: '1px solid #016255', width: '350px'}}>
                <ul>
                {data?.data.psikologseminar?.map((val: any) => (
                  <div>
                      <li>
                    <p className="font-bold text-xl">{val.psikolog.fullName}</p>
                      </li>
                  </div>
                ))}
                </ul>
              </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-2xl">
              Judul Seminar
              </div>
              <div className="font-semibold text-lg rounded-lg p-2" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
                "{data?.data.title}"
              </div>
              <div className="font-bold text-2xl pt-5 pb-1">
                Tanggal Seminar
              </div>
              <div className="font-semibold text-lg rounded-lg p-2" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
                {data?.data.datetime}
              </div>
              <div className="font-bold text-2xl pt-5 pb-1">
                Harga Seminar
              </div>
              <div className="font-semibold text-lg rounded-lg p-2" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
                <IntlProvider>
                  <PriceFormatter value={data?.data.price} />
                </IntlProvider>
              </div>
              <div className="font-bold text-2xl pt-5 pb-1">
                Tautan Seminar
              </div>
              <div className="font-semibold text-base rounded-lg p-2" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
              {data?.data.link}
              </div>
              <div className="font-bold text-2xl pt-5 pb-1">
                Status Seminar
              </div>
              <div>
               <Status/>
              </div>
            </div>
          </div>
      </div>
    </LayoutPsikolog>
  );
};
export default detailSeminar;
