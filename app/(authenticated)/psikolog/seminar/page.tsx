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
import { Button, Card, Form, Input, Modal, Pagination, Space, Tabs, Typography, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { SeminarRepository } from "#/repository/seminar";
import LayoutPsikolog from "#/app/components/dashboardPsikolog";
import { Alasan } from "#/app/types/typeAlasan";
import { mutate } from "swr";
import SeminarApprove from "#/app/components/tabelseminar/approve";
import SeminarReject from "#/app/components/tabelseminar/reject";
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  poster: string;
  title: string;
  datetime: Date;
}

const Seminar = () => {
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
  
    const [open2, setOpen2] = useState(false);
  
    const showModal2 = () => {
      setOpen2(true);
    };
    const handleOk2 = () => {
      setOpen2(false);
    };
  
    const handleCancel2 = () => {
      setOpen2(false);
    };

  const { data: dataSeminar } = SeminarRepository.hooks.get();
  const { data: dataSeminarApprove } = SeminarRepository.hooks.statusApprove();
  const { data: dataSeminarReject } = SeminarRepository.hooks.statusReject();
  const { data: dataSeminarPending } = SeminarRepository.hooks.statusPending();

  const [dataInput, setUser] = useState<Alasan>({
    alasan: "",
  });

  const onFinish = async (val: any) => {
    try {
      const datas = {
        alasan: dataInput.alasan,
      };
      const create_Transaksi =
        await SeminarRepository.manipulateData.reject(datas, val);
      setOpen(false);
      mutate;
      setTimeout(
        message.success("Anda Telah Berhasil Menolak Seminar"),
        5000
      );
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
          style={{ width: "25%", height: "auto" }}
        />
      ),
      width: 500,
    },
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tanggal",
      dataIndex: "datetime",
      key: "datetime",
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
                href={`psikolog/${record.id}`}
              >
                <ZoomInOutlined className="flex pt-[2px]" />
                Lihat Detail
              </Button>
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
                className="bg-[#525F89] text-white flex items-center w-[125px] justify-center"
                onClick={showModal2}
                type="text"
              >
                <CheckOutlined className="flex pt-[2px]" />
                Terima
              </Button>
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
                            record.id
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
                        onFinish(record.id);
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
            <TabPane tab="List Seminar Pending" key="Seminar Pending">
              <Table
                columns={columns}
                dataSource={dataSeminarPending?.data.map((val: any) => {
                  console.log(val.poster, "isi poster");
                  return {
                    id: val.id,
                    poster: val.poster,
                    title: val.title,
                    datetime: val.datetime,
                  };
                })}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="List Seminar Approve" key="Seminar Approve">
              <SeminarApprove/>
            </TabPane>
            <TabPane tab="List Seminar Reject" key="Seminar Reject">
              <SeminarReject/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </LayoutPsikolog>
  );
};

export default Seminar;
