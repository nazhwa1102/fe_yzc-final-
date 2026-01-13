"use client"

import { TransaksiRepository } from "#/repository/transaksi"
import { CheckCircleOutlined, CloseCircleOutlined, RedoOutlined, ZoomInOutlined } from "@ant-design/icons"
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

  const Status = () => {
    if (dataTransaksi?.data.status === 'reject') {
      return(
        <div>
          <div className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 bg-red-600 text-white" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
              <CloseCircleOutlined/> Pembayaran Ditolak Admin
          </div>
        </div>
      )
    }if (dataTransaksi?.data.status === 'approve') {
      return(
        <div>
          <div className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 bg-green-500 text-white" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
              <CheckCircleOutlined/> Pembayran Telah Disetejui Admin
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <div className="font-semibold text-base rounded-lg p-2 items-center flex gap-1 text-yzc" style={{border: '1px solid #016225', width: '400px', height: 'auto'}}>
              <RedoOutlined rotate={-90}/> Menunggu Konfirmasi Admin
          </div>
        </div>
      )
    }
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
                <div className="pt-5">
                  <img
                    src={`http://localhost:3222/transaksi/upload/${dataTransaksi?.data.payment_proof}/image`}
                    style={{ width: "200px", height: "300px" }}
                  />
                </div>
              </div>
              <div className="pt-10">
              <div className="font-bold text-xl justify-end right-0 pl-[300px] mt-[-35px] top-0">
                <div>
                  Tanggal Transaksi:
                </div>
                {formatDateWithHyphens(dataTransaksi?.data.createdAt)}
              </div>
              <div className="font-semibold text-lg pt-5">
                <div>
                {dataTransaksi?.data.detailOrder[0]?.seminar?.title}
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
                <div className="pt-5">
                  <Status/>
                </div>
              </div>
              </div>
            </div>
          );
    }if (dataTransaksi?.data.detailOrder[0]?.types === 'private_konseling') {
        return (
            <div className="pt-5 justify-stretch gap-10 flex">
              <div>
                <div className="font-semibold text-lg">Bukti Transaksi :</div>
                <div className="pt-5">
                  <img
                    src={`http://localhost:3222/transaksi/upload/${dataTransaksi?.data.payment_proof}/image`}
                    style={{ width: "200px", height: "300px" }}
                  />
                </div>
              </div>
              <div className="pt-10">
              <div className="font-bold text-xl justify-end right-0 pl-[300px] mt-[-35px] top-0">
                <div>
                  Tanggal Transaksi:
                </div>
                {formatDateWithHyphens(dataTransaksi?.data.createdAt)}
              </div>
              <div className="font-semibold text-lg pt-5">
                <div>
                {dataTransaksi?.data.detailOrder[0]?.privateKonseling?.title}
                </div>
                <div>
                  Psikolog: {dataTransaksi?.data.detailOrder[0]?.privateKonseling?.psikolog?.fullName}
                </div>
                <div className="pt-2">
                Tanggal Seminar: 
                <div>
                {dataTransaksi?.data.detailOrder[0]?.privateKonseling?.datetime.map((val: any) => (
                  <div>
                      {formatDateWithHyphens(val)}
                  </div>
                ))}
                </div>
                </div>
                <div className="gap-1 flex pt-5">
                    <div>
                  Total Transaksi:
                    </div>
                    <div>
                <IntlProvider>
                  <PriceFormatter value={dataTransaksi?.data.transaction_amount} />
                </IntlProvider>
                    </div>
                </div>    
                <div className="pt-5">
                  <Status />
                </div>
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