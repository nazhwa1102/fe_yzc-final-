"use client";

import DetailOrder from "#/app/components/detailOrder";
import { Alasan } from "#/app/types/typeAlasan";
import { TransaksiRepository } from "#/repository/transaksi";
import { parseJwt } from "#/utils/convert";
import { CheckOutlined, CloseCircleOutlined, CloseCircleTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { mutate } from "swr";

interface DataType {
    id: string;
    nama: string;
    date: string;
    transaction_amount: number;
    payment_proof: string;
    status: string
    detailOrder: string
  }

const TransaksiPendingPsi = () => {
    const token = localStorage.getItem("access_token");
    console.log(token, "yuk bisa");
    let role: string = "";
    let email: string = "";
    let fullNamePsi: string = "";
    let idPsi: string = ""
  
    console.log(parseJwt(token));
    
    if (token) {
      role = parseJwt(token).role;
      email = parseJwt(token).email;
      fullNamePsi = parseJwt(token).fullNamePsi;
      idPsi = parseJwt(token).idPsi
      console.log(role, "role cocok");
      console.log(fullNamePsi, "nama");
      console.log(idPsi, 'id');
    }
    const router = useRouter()
const { data: dataTransaksiSeminar } = TransaksiRepository.hooks.transaksiPsikologPending(idPsi);
const [open, setOpen] = useState(false);
const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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

  const [dataInput, setTransaksi] = useState<Alasan>({
    alasan: "",
  });

  const onFinish = async (val: any) => {
    try {
      const datas = {
        alasan: dataInput.alasan,
      };
      const create_Transaksi = await TransaksiRepository.manipulateData.reject(
        datas,
        val
        );
        setOpen(false)
        mutate
        setTimeout(
          message.success("Anda Telah Berhasil Menolak Transaksi"),
          5000
          );
        } catch (error) {
      throw error;
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Tanggal",
      dataIndex: "date",
      key: "date",
      render: (_, record) => <div>{formatDateWithHyphens(record.date)}</div>,
    },
    {
      title: "Nominal",
      dataIndex: "transaction_amount",
      key: "transaction_amount",
    },
    {
      title: "Foto",
      dataIndex: "payment_proof",
      key: "payment_proof",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/transaksi/upload/${record.payment_proof}/image`}
          style={{ width: "100%", height: "auto" }}
        />
      ),
      width: 100,
    },
    {
      title: "Detail",
      dataIndex: "id",
      key: "detail",
      render: (_, record) => (
        <div className="justify-center flex">
           <DetailOrder id={record.id}/>
        </div>
      ),
    },
    {
      title: "Aksi",
      key: "Aksi",
      render: (_, record) => (
        <div className="list-item justify-center">
          <div className="pb-1">
            <Button
              className="bg-green-500 text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#22C55E" }}
              onClick={async () => {
                (await TransaksiRepository.manipulateData.done(record.id)) &&
                  window.location.reload();
              }}
            >
              <CheckOutlined className="flex pt-[2px]" />
              Setujui
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#EC5151" }}
              onClick={showModal}
            >
              <CloseCircleOutlined className="flex pt-[2px]" />
              Tolak
            </Button>
            <Modal
              open={open}
              onCancel={handleCancel}
              footer={(_) => (
                <div className="justify-center flex">
                  <Button
                    onClick={handleCancel}
                    className="bg-red-600 text-white hover:text-white w-20 cancelButt"
                  >
                    Batal
                  </Button>
                  <Button
                    className="text-white bg-[#525F89] hover:text-white w-20 yaButt"
                    onClick={() =>{onFinish(record.id)}}
                  >
                    Ya
                  </Button>
                </div>
              )}
              className="pt-[130px]"
            >
              <div className="justify-center">
                <div>
                  <CloseCircleTwoTone
                    twoToneColor={"red"}
                    style={{ fontSize: "90px" }}
                    className="justify-center flex pt-3"
                  />
                </div>
                <div className="font-bold text-3xl flex justify-center pt-4">
                  Tolak Seminar
                </div>
                <div className="flex justify-center text-lg pt-3">
                  Apa Anda Yakin Ingin Menolak Seminar
                </div>
                <div className="flex justify-center">
                  <div className="justify-center pt-3">
                    <div className="flex justify-center">
                      <div className="font-semibold text-lg justify-center">
                        Alasan
                      </div>
                    </div>
                    <Form size="middle" style={{ maxWidth: "500px" }}>
                      <Form.Item>
                        <Input
                          placeholder="Masukan Alasan Penolakan Transaksi"
                          className="w-[300px]"
                          onChange={(e) => {
                            setTransaksi({
                              ...dataInput,
                              alasan: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        
      ),
    },
  ];

  const scroll = {
    x: "max-content",
    y: 600,
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataTransaksiSeminar?.data.map((val: any) => {
          console.log(val.poster, "isi poster");
          return {
            id: val.id,
            nama: val.psikolog.fullName,
            date: val.createdAt,
            transaction_amount: val.transaction_amount,
            payment_proof: val.payment_proof,
          };
        })}
        className="font-semibold"
        scroll={scroll}
        pagination={false}
      />
    </>
  );
};
export default TransaksiPendingPsi