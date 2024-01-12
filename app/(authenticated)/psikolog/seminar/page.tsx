"use client";

import React, { useState } from "react";
import LayoutAdmin from "#/app/components/layoutadmin";
import {
  CheckCircleTwoTone,
  CheckOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  PlusOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Tabs,
  Typography,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { SeminarRepository } from "#/repository/seminar";
import LayoutPsikolog from "#/app/components/dashboardPsikolog";
import { Alasan } from "#/app/types/typeAlasan";
import { mutate } from "swr";
import SeminarApprove from "#/app/components/tabelseminar/approve";
import SeminarReject from "#/app/components/tabelseminar/reject";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/navigation";
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  poster: string;
  title: string;
  datetime: Date;
  link: string;
}

const Seminar = () => {
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

  const token = localStorage.getItem("access_token");
  console.log(token, "yuk bisa");
  let role: string = "";
  let email: string = "";
  let fullNamePsi: string = "";
  let idPsi: string = "";

  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNamePsi = parseJwt(token).fullNamePsi;
    idPsi = parseJwt(token).idPsi;
    console.log(role, "role cocok");
    console.log(fullNamePsi, "nama");
    console.log(idPsi, "id");
  }
  const router = useRouter();

  const { data: dataSeminarPending } =
    SeminarRepository.hooks.statusPendingPsi(idPsi);

  const [dataInput, setUser] = useState<Alasan>({
    alasan: "",
  });

  const onFinish = async (val: any) => {
    try {
      const datas = {
        alasan: dataInput.alasan,
      };
      const create_Transaksi = await SeminarRepository.manipulateData.reject(
        datas,
        idPsi,
        val
      );
      setOpen(false);
      mutate;
      setTimeout(message.success("Anda Telah Berhasil Menolak Seminar"), 5000);
    } catch (error) {
      throw error;
    }
  };

  const { TabPane } = Tabs;
  const columns: ColumnsType<DataType> = [
    {
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/seminar/upload/${record.poster}/image`}
          style={{ width: "75%", height: "auto" }}
        />
      ),
      width:250
    },
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
      width:250

    },
    {
      title: "Tautan Seminar",
      dataIndex: "link",
      key: "link",
      ellipsis: {
        showTitle: false
      }
    },
    {
      title: "Tanggal",
      dataIndex: "datetime",
      key: "datetime",
      width:250
      
    },
    {
      title: "Aksi",
      key: "Aksi",
      render: (_, record) => (
        <div className="list-item justify-center">
        <div className="pb-1">
          <Button
            className="bg-[#455A64] text-white flex items-cente w-[125px] justify-center"
            style={{ backgroundColor: "#455A64" }}
            href={`seminar/${record.id}`}
          >
            <ZoomInOutlined className="flex pt-[2px]" />
            Lihat Detail
          </Button>
        </div>
          <div className="pb-1">
            <Button
              className="bg-[#525F89] text-white flex items-center w-[125px] justify-center"
              onClick={() => showModal2(record)}
              type="text"
            >
              <CheckOutlined className="flex pt-[2px]" />
              Terima
            </Button>
            {selectedOption2 && (
              <Modal
                open={open2}
                onCancel={handleCancel2}
                footer={(_) => (
                  <div className="justify-center flex pt-3">
                    <Button
                      onClick={handleCancel2}
                      className="bg-red-600 text-white hover:text-white w-20 cancelButt"
                    >
                      Batal
                    </Button>
                    <Button
                      className="text-white bg-[#525F89] hover:text-white w-20 yaButt"
                      onClick={async () => {
                        (await SeminarRepository.manipulateData.approve(
                          idPsi,
                          selectedOption2.id
                        ) && await SeminarRepository.manipulateData.approval(selectedOption2.id) && window.location.reload())
                      }}
                    >
                      Ya
                    </Button>
                  </div>
                )}
                className="pt-[130px]"
              >
                {selectedOption2.id}
                <div className="justify-center">
                  <div>
                    <CheckCircleTwoTone
                      twoToneColor={"lightgreen"}
                      style={{ fontSize: "90px" }}
                      className="justify-center flex pt-3"
                    />
                  </div>
                  <div className="font-bold text-3xl flex justify-center pt-4">
                    Setujui Seminar
                  </div>
                  <div className="flex justify-center text-lg pt-3">
                    Apa Anda Yakin Ingin Menyetujui Seminar
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
                  <div className="justify-center flex pt-3">
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
                            placeholder="Masukan Alasan Penolakan Seminar"
                            className="w-[300px]"
                            onChange={(e) => {
                              setUser({
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

  const scroll = {
    x: "max-content",
    y: 600,
  };

  return (
    <LayoutPsikolog menu="seminar">
      <div>
        <div className="pt-5">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Menunggu Konfirmasi" key="Seminar Pending">
              <Table
                columns={columns}
                dataSource={dataSeminarPending?.data.map((val: any) => {
                  console.log(val.poster, "isi poster");
                  return {
                    id: val.id,
                    poster: val.poster,
                    title: val.title,
                    datetime: val.datetime,
                    link: val.link
                  };
                })}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="Disetujui" key="Seminar Approve">
              <SeminarApprove />
            </TabPane>
            <TabPane tab="Ditolak " key="Seminar Reject">
              <SeminarReject />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </LayoutPsikolog>
  );
};

export default Seminar;
