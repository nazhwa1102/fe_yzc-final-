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
import { PsikologRepository } from "#/repository/psikolog";
import { Alasan } from "#/app/types/typeAlasan";
import { UserYzcRepository } from "#/repository/userYzc";
import { mutate } from "swr";
import PsikologActive from "#/app/components/tabelPsikolog/active";
import PsikologInActive from "#/app/components/tabelPsikolog/inactive";
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  foto: string;
  nama: string;
  jenis_kelamin: string;
  email: string;
  user_yzc: string
}

const Psikolog = () => {
  const { data: dataPsikolog } = PsikologRepository.hooks.get();
  const { data: dataPsikologActive } = PsikologRepository.hooks.active();
  const { data: dataPsikologInActive } = PsikologRepository.hooks.inactive();
  const { data: dataPsikologPending } = PsikologRepository.hooks.pending();


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

  const [open2, setOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState<DataType | null>(
    null
  );

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

  

  const { TabPane } = Tabs;

  const [dataInput, setUser] = useState<Alasan>({
    alasan: "",
  });

  const onFinish = async (val: any) => {
    try {
      const datas = {
        alasan: dataInput.alasan,
      };
        await UserYzcRepository.manipulateData.userInActive(datas, val);
        setModalVisible(false);
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
      key: "Aksi",
      render: (_, record) => (
        <div className="list-item justify-center">
          <div className="pb-1">
            <Button
              className="bg-[#455A64] text-white flex items-cente w-[125px] justify-center"
              style={{ backgroundColor: "#455A64" }}
              href={`psikolog/${record.id}`}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Detail
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="text-white flex items-center w-[125px] justify-center bg-green-500 "
              onClick={() => showModal2(record)}
              type="primary"
            >
              <CheckOutlined className="flex pt-[2px]" />
              Terima
            </Button>
            {selectedOption2 && (
            <Modal
              open={open2}
              onCancel={handleCancel2}
              footer={
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
                        (await UserYzcRepository.manipulateData.userActive(
                          selectedOption2.user_yzc
                        )) && window.location.reload();
                      }}
                  >
                    Ya
                  </Button>
                </div>
            }
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
                  Terima Psikolog
                </div>
                <div className="flex justify-center text-lg pt-3">
                  Apa Anda Yakin Ingin Menerima Psikolog
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
              open={modalVisible}
              onCancel={handleCancel}
              footer={
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
                      onFinish(selectedOption.user_yzc);
                    }}
                  >
                    Ya
                  </Button>
                </div>
              }
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
                  Tolak Psikolog
                </div>
                <div className="flex justify-center text-lg pt-3">
                  Apa Anda Yakin Ingin Menolak Psikolog
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
                          placeholder="Masukan Alasan Penolakan Psikolog"
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
    <LayoutAdmin menu="psikolog">
      <div>
        <Tabs>
          <TabPane tab="Menunggu Konfirmasi" key="Psikolog Pending">
            <Table
              columns={columns}
              dataSource={dataPsikologPending?.data.map((val: any) => {
                console.log(val.poster, "isi poster");
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
          </TabPane>
          <TabPane tab="Aktif" key="Psikolog Active">
            <PsikologActive />
          </TabPane>
          <TabPane tab="Tidak Aktif" key="Psikolog InActive">
            <PsikologInActive />
          </TabPane>
        </Tabs>
      </div>
    </LayoutAdmin>
  );
};

export default Psikolog;
