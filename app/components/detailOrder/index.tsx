"use client"

import { TransaksiRepository } from "#/repository/transaksi"
import { ZoomInOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import React, { useState } from "react"
import { IntlProvider } from "react-intl"
import PriceFormatter from "../priceFormatter"


const DetailOrder = ({id}: any) => {
  const {data: dataTransaksi} = TransaksiRepository.hooks.getById(id)
   
 function formatDateWithHyphens(date: any) {
    const inputDate = new Date(date);

    if (isNaN(inputDate.getTime())) {
      // Handle the case where 'date' is not a valid date
      console.error("Invalid date:", date);
      return "Invalid Date";
    }

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = inputDate.getDate().toString().padStart(2, "0");
    const hour = inputDate.getHours().toString().padStart(2, "0")
    const minute = inputDate.getMinutes().toString().padStart(2, "0")

    return `${year}-${month}-${day}, ${hour}.${minute} WIB`;
  }

  const [openDetail, setOpenDetail] = useState(false);
  const showModalDetail = () => {
    setOpenDetail(true);
  };
  const handleOkDetail = () => {
    setOpenDetail(false);
  };

  const handleCancelDetail = () => {
    setOpenDetail(false);
  };

  function TypeTransaction() {
    if (dataTransaksi?.data.detailOrder[0]?.types === 'seminar') {
        return (
            <div className="pt-5 justify-stretch gap-10 flex">
              <div>
                <div className="font-semibold text-lg">Bukti Transaksi :</div>
                <div className="pl-5">
                  <img
                    src={`http://localhost:3222/transaksi/upload/${dataTransaksi?.data.payment_proof}/image`}
                    style={{ width: "200px", height: "300px" }}
                  />
                </div>
              </div>
              <div className="pt-10">
              <div className="font-bold text-xl">
               {formatDateWithHyphens(dataTransaksi?.data.createdAt)}
              </div>
              <div className="font-semibold text-lg pt-5">
                <div>
                    Judul Seminar: {dataTransaksi?.data.detailOrder[0]?.seminar?.title}
                </div>
                <div>
                    Tanggal Seminar: {dataTransaksi?.data.detailOrder[0]?.seminar?.datetime}
                </div>
                <div className="gap-1 flex">
                    <div>
                  Total Transaksi:
                    </div>
                    <div>
                <IntlProvider>
                  <PriceFormatter value={dataTransaksi?.data.transaction_amount} />
                </IntlProvider>
                    </div>
                </div>
              </div>
              </div>
            </div>
          );
    }if (dataTransaksi?.data.detailOrder[0]?.types === 'private_konseling') {
        return (
            <div className="pt-5 justify-between">
              <div>
                <div className="font-semibold text-lg">Bukti Transaksi :</div>
                <div className="pl-5">
                  <img
                    src={`http://localhost:3222/transaksi/upload/${dataTransaksi?.data.payment_proof}/image`}
                    style={{ width: "200px", height: "300px" }}
                  />
                </div>
              </div>
            </div>
          );
    }
  }

  return(
    <div>
        <div className="pb-1">
            <Button
              className="bg-[#455A64] text-white flex items-cente w-[125px] justify-center"
              style={{ backgroundColor: "#455A64" }}
              onClick={showModalDetail}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Lihat Detail
            </Button>
            <Modal
              open={openDetail}
              onCancel={handleCancelDetail}
              footer={(_) => (
                <div className="justify-center flex pt-3">
                  <Button
                    onClick={handleCancelDetail}
                    className="bg-red-600 text-white hover:text-white w-20 yaButt"
                  >
                    OK
                  </Button>
                </div>
              )}
              className="pt-[130px]"
              width={800}
              title={
                <div className="font-bold text-2xl">
                  Detail Riwayat Transaksi
                </div>
              }
            >
            <TypeTransaction/>
            </Modal>
          </div>
    </div>
    
  )
}

export default DetailOrder