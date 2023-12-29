"use client";

import React, { useState } from "react";
import LayoutAdmin from "#/app/components/layoutadmin";
import {
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
import { PsikologRepository } from "#/repository/psikolog";
import { Alasan } from "#/app/types/typeAlasan";
import { UserYzcRepository } from "#/repository/userYzc";
import { mutate } from "swr";
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  foto: string;
  nama: string;
  jenis_kelamin: string;
  email: string;
}

const PsikologActive = () => {

  const { data: dataPsikologActive } = PsikologRepository.hooks.active();

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

  const [dataInput, setUser] = useState<Alasan>({
    alasan: "",
  });

  const onFinish = async (val: any) => {
    try {
      const datas = {
        alasan: dataInput.alasan,
      };
      const create_Transaksi =
        await UserYzcRepository.manipulateData.userInActive(datas, val);
      setOpen(false);
      mutate;
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
      title: "Foto",
      dataIndex: "foto",
      key: "foto",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/psikolog/upload/${record.foto}/image`}
          style={{ width: "25%", height: "auto" }}
        />
      ),
      width: 500,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
                className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
                style={{ backgroundColor: "#EC5151" }}
                onClick={showModal}
              >
                <CloseCircleOutlined className="flex pt-[2px]" />
                Non Aktifkan
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
                    Nonaktifkan Psikolog
                  </div>
                  <div className="flex justify-center text-lg pt-3">
                    Apa Anda Yakin Ingin Menonaktifkan Psikolog
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
      <div>
            <Table
          columns={columns}
          dataSource={dataPsikologActive?.data.map((val: any) => {
            console.log(val.poster, "isi poster");
            return {
                id: val.id,
                foto: val.photo,
                nama: val.fullName,
                jenis_kelamin: val.gender,
                email: val.user_yzc?.email,
            };
          })}
          className="font-semibold"
          scroll={scroll}
          pagination={false}
        />
      </div>
  );
};

export default PsikologActive;
