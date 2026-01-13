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
  user_yzc: string
}

const PsikologActive = () => {

  const { data: dataPsikologActive } = PsikologRepository.hooks.active();
  

  const [selectedOption, setSelectedOption] = useState<DataType | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (option: DataType) => {
    setSelectedOption(option);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
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
        await UserYzcRepository.manipulateData.userInActive(val, datas);
        
      setModalVisible(false);
      setTimeout(
        message.success("Anda Telah Berhasil Menolak Psikolog"),
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
          style={{ width: "40%", height: "auto" }} className="rounded-[50%]"
        />
      ),
      width: 250,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      width: 250
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
      width: 250

    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250

    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
          
          <div className="list-item justify-center">
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
            <div className="pb-1">
              <Button
                className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
                style={{ backgroundColor: "#EC5151" }}
                onClick={() => showModal(record)}
              >
                <CloseCircleOutlined className="flex pt-[2px]" />
                Non Aktifkan
              </Button>
              {selectedOption && (
              <Modal
                open={modalVisible}
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
                      onClick={() => onFinish(selectedOption.user_yzc)}
                    >
                      Ya
                    </Button>
                  </div>
                )}
                className="pt-[130px]"
              >
                  <>
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
                        <Form.Item name="alasan">
                          <Input
                            placeholder="Masukan Alasan Penolakan Psikolog"
                            className="w-[300px]"
                            name="alasan"
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
                  </>
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
      <div>
            <Table
          columns={columns}
          dataSource={dataPsikologActive?.data.map((val: any) => {
            return {
                id: val.id,
                foto: val.photo,
                nama: val.fullName,
                jenis_kelamin: val.gender,
                email: val.user_yzc?.email,
                user_yzc: val.user_yzc?.id
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
