"use client";

import LayoutAdmin from "#/app/components/layoutadmin";
import React, { useState } from "react";
import { Button, Modal, Tabs, message, Table, Form, Input, Select } from "antd";
import type { TabsProps } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  CheckCircleTwoTone,
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
import DetailOrder from "#/app/components/detailOrder";
import { mutate } from "swr";
import TransaksiApprove from "#/app/components/tabelTransaksi/seminar/approve";
import TransaksiReject from "#/app/components/tabelTransaksi/seminar/reject";
import TransaksiPending from "#/app/components/tabelTransaksi/seminar/pending";

interface DataType {
  id: string;
  nama: string;
  date: string;
  transaction_amount: number;
  payment_proof: string;
  status: string;
  detailOrder: string;
}

const { TabPane } = Tabs;
const { Option } = Select;

const Pembayaran = () => {
  const { data: dataTransaksiSeminar } = TransaksiRepository.hooks.seminar();
  const { data: dataTransaksiPrivateKonselingPending } =
    TransaksiRepository.hooks.PrivateKonselingPending();
  const { data: dataTransaksiPrivateKonselingApprove } =
    TransaksiRepository.hooks.PrivateKonselingApprove();
  const { data: dataTransaksiPrivateKonselingReject } =
    TransaksiRepository.hooks.PrivateKonselingReject();

  const [selectedOption, setSelectedOption] = useState<DataType | null>(null);
  const [open, setOpen] = useState(false);

  const showModal = (option: DataType) => {
    setSelectedOption(option);
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [selectedOption2, setSelectedOption2] = useState<DataType | null>(null);
  const [open2, setOpen2] = useState(false);

  const showModal2 = (option: DataType) => {
    setSelectedOption2(option);
    setOpen2(true);
  };
  const handleOk2 = () => {
    setOpen2(false);
  };

  const handleCancel2 = () => {
    setOpen2(false);
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
    const hour = inputDate.getHours().toString().padStart(2, "0");
    const minute = inputDate.getMinutes().toString().padStart(2, "0");

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
      setOpen(false);
      mutate;
      window.location.reload();
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
          <DetailOrder id={record.id} />
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
              onClick={() => showModal2(record)}
            >
              <CheckOutlined className="flex pt-[2px]" />
              Setujui
            </Button>
            {selectedOption2 && (
              <Modal
                open={open2}
                onCancel={handleCancel2}
                footer={(_) => (
                  <div className="justify-center flex">
                    <Button
                      onClick={handleCancel2}
                      className="bg-red-600 text-white hover:text-white w-20 cancelButt"
                    >
                      Batal
                    </Button>
                    <Button
                      className="text-white bg-[#525F89] hover:text-white w-20 yaButt"
                      onClick={async () => {
                        (await TransaksiRepository.manipulateData.approve(
                          selectedOption2.id
                        )) && window.location.reload();
                      }}
                    >
                      Ya
                    </Button>
                  </div>
                )}
                className="pt-[130px]"
              >
                <div className="justify-center">
                  <div>
                    <CheckCircleTwoTone
                      twoToneColor={"green"}
                      style={{ fontSize: "90px" }}
                      className="justify-center flex pt-3"
                    />
                  </div>
                  <div className="font-bold text-3xl flex justify-center pt-4">
                    {/* <div>{record.id}</div> */}
                    Setujui Transaksi
                  </div>
                  <div className="flex justify-center text-lg pt-3">
                    Apa Anda Yakin Ingin Menyetujui Transaksi
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#EC5151" }}
              onClick={() => showModal(record)}
            >
              <CloseCircleOutlined className="flex pt-[2px]" />
              Tolak
            </Button>
            {selectedOption && (
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
                      onClick={() => {
                        onFinish(selectedOption.id);
                      }}
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
                    {/* <div>{record.id}</div> */}
                    Tolak Transaksi
                  </div>
                  <div className="flex justify-center text-lg pt-3">
                    Apa Anda Yakin Ingin Menolak Transaksi
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
            )}
          </div>
        </div>
      ),
    },
  ];

  const columns3: ColumnsType<DataType> = [
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
          <DetailOrder id={record.id} />
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
              onClick={() => showModal2(record)}
            >
              <CheckOutlined className="flex pt-[2px]" />
              Setujui
            </Button>
            {selectedOption2 && (
              <Modal
                open={open2}
                onCancel={handleCancel2}
                footer={(_) => (
                  <div className="justify-center flex">
                    <Button
                      onClick={handleCancel2}
                      className="bg-red-600 text-white hover:text-white w-20 cancelButt"
                    >
                      Batal
                    </Button>
                    <Button
                      className="text-white bg-[#525F89] hover:text-white w-20 yaButt"
                      onClick={async () => {
                        (await TransaksiRepository.manipulateData.approvepk(
                          selectedOption2.id
                        )) && window.location.reload();
                      }}
                    >
                      Ya
                    </Button>
                  </div>
                )}
                className="pt-[130px]"
              >
                <div className="justify-center">
                  <div>
                    <CheckCircleTwoTone
                      twoToneColor={"green"}
                      style={{ fontSize: "90px" }}
                      className="justify-center flex pt-3"
                    />
                  </div>
                  <div className="font-bold text-3xl flex justify-center pt-4">
                    {/* <div>{record.id}</div> */}
                    Setujui Transaksi
                  </div>
                  <div className="flex justify-center text-lg pt-3">
                    Apa Anda Yakin Ingin Menyetujui Transaksi
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#EC5151" }}
              onClick={() => showModal(record)}
            >
              <CloseCircleOutlined className="flex pt-[2px]" />
              Tolak
            </Button>
            {selectedOption && (
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
                      onClick={() => {
                        onFinish(selectedOption.id);
                      }}
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
                    {/* <div>{record.id}</div> */}
                    Tolak Transaksi
                  </div>
                  <div className="flex justify-center text-lg pt-3">
                    Apa Anda Yakin Ingin Menolak Transaksi
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
            )}
          </div>
        </div>
      ),
    },
  ];

  const columns2: ColumnsType<DataType> = [
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
          <DetailOrder id={record.id} />
        </div>
      ),
    },
    
  ];

  const scroll = {
    x: "max-content",
    y: 600,
  };

  const [selectedOption3, setSelectedOption3] = useState("seminar");

  const handleOptionChange = (value: any) => {
    setSelectedOption3(value);
  };

  return (
    <LayoutAdmin menu="pembayaran">
      <div className=" flex justify-between">
        <div>
          <Button
            href="pembayaran/psikolog"
            className="hover:bg-green-700"
            style={{ backgroundColor: "#016255" }}
          >
            Kelola Pembayaran Psikolog
          </Button>
        </div>
        <div>
          <Select value={selectedOption3} onChange={handleOptionChange} className="w-[175px] flex items-center" size="middle" >
            <Option value="seminar">Pembayaran Seminar</Option>
            <Option value="privatekonseling">
              Pembayaran Private Konseling
            </Option>
          </Select>
        </div>
      </div>
      <div>
        {selectedOption3 === "seminar" ? (
          <Tabs>
            <TabPane tab="Menunggu Persetujuan" key="Transaksi Pending">
              <TransaksiPending />
            </TabPane>
            <TabPane tab="Disetejui" key="Transaksi Approve">
              <TransaksiApprove />
            </TabPane>
            <TabPane tab="Ditolak" key="Transaksi Reject">
              <TransaksiReject />
            </TabPane>
          </Tabs>
        ) : (
          <Tabs>
            <TabPane tab="Menunggu Persetujuan" key="Transaksi Pending">
              <Table
                columns={columns3}
                dataSource={dataTransaksiPrivateKonselingPending?.data.map(
                  (val: any) => {
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
            <TabPane tab="Disetejui" key="Transaksi Approve">
              <Table
                columns={columns2}
                dataSource={dataTransaksiPrivateKonselingApprove?.data.map(
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
            <TabPane tab="Ditolak" key="Transaksi Reject">
              <Table
                columns={columns2}
                dataSource={dataTransaksiPrivateKonselingReject?.data.map(
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
        )}
      </div>
    </LayoutAdmin>
  );
};

console.log();

export default Pembayaran;
