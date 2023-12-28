"use client";

import LayoutAdmin from "#/app/components/layoutadmin";
import React, { useState } from "react";
import { Button, Modal, Tabs, message, Table, Form, Input } from "antd";
import type { TabsProps } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  CheckOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { TransaksiRepository } from "#/repository/transaksi";
import { Alasan } from "#/app/types/typeAlasan";

interface DataType {
  id: string;
  nama: string;
  date: string;
  transaction_amount: number;
  payment_proof: string;
  status: string
  detailOrder: [{
    types: string
  }]
}

const { TabPane } = Tabs;

const Pembayaran = () => {
  const { data: dataTransaksi } = TransaksiRepository.hooks.get();
  const { data: dataTransaksiSeminar } = TransaksiRepository.hooks.seminar();
  const { data: dataTransaksiPrivateKonseling } =
    TransaksiRepository.hooks.privateKonseling();

  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModalDetail = () => {
    setOpenDetail(true);
  };
  const handleOkDetail = () => {
    setOpenDetail(false);
  };

  const handleCancelDetail = () => {
    setOpenDetail(false);
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

    return `${year}-${month}-${day}`;
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
        val.id
      );
      console.log(create_Transaksi);
      setTimeout(
        message.success("Anda Telah Berhasil Menolak Transaksi"),
        5000
      );
    } catch (error) {
      throw error;
    }
  };

  function ModalDetail(val: any) {
    if (val.detailOrder?.types === "seminar") {
      return (
        <div className="pt-5 justify-between">
          <div>
            <div className="font-semibold text-lg">Bukti Transaksi :</div>
            <div className="pl-5">
              <img
                src={`http://localhost:3222/transaksi/upload/${val.payment_proof}/image`}
                style={{ width: "200px", height: "300px" }}
              />
            </div>
          </div>
        </div>
      );
    }
    if (val.detailOrder?.types === "private_konseling") {
      return (
        <div className="pt-5 justify-between">
          <div>
            <div className="font-semibold text-lg">Bukti Transaksi :</div>
            <div className="pl-5">
              <img
                src={`http://localhost:3222/transaksi/upload/${val.payment_proof}/image`}
                style={{ width: "200px", height: "300px" }}
              />
            </div>
          </div>
        </div>
      );
    }else{
      return(
        <div>
         Salah
        </div>
      )
      }
  }

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
      key: "detail",
      render: (_, record) => (
        <div className="justify-center flex">
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
              width={1000}
              title={
                <div className="font-bold text-2xl">
                  Detail Riwayat Transaksi
                </div>
              }
            >
            <ModalDetail val={record.detailOrder}/>
            </Modal>
          </div>
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
                (await TransaksiRepository.manipulateData.approve(record.id)) &&
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
    <LayoutAdmin menu="pembayaran">
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="List Transaksi All" key="Transaksi All">
            <Table
              columns={columns}
              dataSource={dataTransaksi?.data.map((val: any) => {
                console.log(val.poster, "isi poster");
                return {
                  id: val.id,
                  nama: val.customer.fullName,
                  date: val.createdAt,
                  transaction_amount: val.transaction_amount,
                  payment_proof: val.payment_proof,
                  staus: val.status,
                  detailOrder: [{
                    types: val.detailOrder?.types
                  }]
                };
              })}
              className="font-semibold"
              scroll={scroll}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="List Transaksi Seminar" key="Transaksi Seminar">
            <Table
              columns={columns}
              dataSource={dataTransaksiSeminar?.data.map((val: any) => {
                console.log(val.poster, "isi poster");
                return {
                  id: val.id,
                  nama: val.customer.fullName,
                  date: val.createdAt,
                  transaction_amount: val.transaction_amount,
                  payment_proof: val.payment_proof,
                };
              })}
              className="font-semibold"
              scroll={scroll}
              pagination={false}
            />
          </TabPane>
          <TabPane
            tab="List Transaksi Private Konseling"
            key="Transaksi Private Konseling"
          >
            <Table
              columns={columns}
              dataSource={dataTransaksiPrivateKonseling?.data.map(
                (val: any) => {
                  console.log(val.poster, "isi poster");
                  return {
                    id: val.id,
                    nama: val.customer.fullName,
                    date: val.createdAt,
                    transaction_amount: val.transaction_amount,
                    payment_proof: val.payment_proof,
                  };
                }
              )}
              className="font-semibold"
              scroll={scroll}
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </div>
    </LayoutAdmin>
  );
};
export default Pembayaran;
