"use client";

import React, { useState } from "react";
import LayoutAdmin from "#/app/components/layoutadmin";
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  PlusOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { Button, Card, Modal, Pagination, Space, Tabs, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { SeminarRepository } from "#/repository/seminar";
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  poster: string;
  link: string
  title: string;
  datetime: Date;
}

const Seminar = () => {
  const [selectedOption, setSelectedOption] = useState<DataType | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const showModal = (option: DataType) => {
    setSelectedOption(option)
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [selectedOption2, setSelectedOption2] = useState<DataType | null>(
    null
  );
  const [open2, setOpen2] = useState(false);

  const showModal2 = (option: DataType) => {
    setSelectedOption2(option)
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
  const { data: dataSeminarFull } = SeminarRepository.hooks.statusFull();
  const { data: dataSeminarDone } = SeminarRepository.hooks.statusDone();


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
      width: 250,
      className: 'justify-center'
    },
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
      width: 250
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
      width: 150
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
              Detail
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#525F89] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#525F89" }}
              href={`seminar/edit/${record.id}`}
            >
              <EditOutlined className="flex pt-[2px]" />
              Edit
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#EC5151" }}
              onClick={() => showModal(record)}
            >
              <DeleteOutlined className="flex pt-[2px]" />
              Hapus
            </Button>
            {selectedOption && (
              <Modal
              open={open}
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
                    onClick={async () => {
                      (await SeminarRepository.manipulateData.delete(
                        selectedOption.id
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
                  <DeleteTwoTone
                    twoToneColor={"red"}
                    style={{ fontSize: "90px" }}
                    className="justify-center flex pt-3"
                  />
                </div>
                <div className="font-bold text-3xl flex justify-center pt-4">
                  Hapus Seminar
                </div>
                <div className="flex justify-center text-lg pt-3">
                  Apa Anda Yakin Ingin Menghapus Seminar
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
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/seminar/upload/${record.poster}/image`}
          style={{ width: "75%", height: "auto" }}
        />
      ),
      width: 350,
      className: 'justify-center'
    },
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
      width: 250
    },
    {
      title: "Tautan Seminar",
      dataIndex: "link",
      key: "link",
      width: 100,
      ellipsis: {
       showTitle: false
      },
      render: (link) => (
        <Tooltip placement="topLeft" title={link}>
          {link}
        </Tooltip>
      )
    },
    {
      title: "Tanggal",
      dataIndex: "datetime",
      key: "datetime",
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
              href={`seminar/${record.id}`}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Detail
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#525F89] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#525F89" }}
              href={`seminar/edit/${record.id}`}
            >
              <EditOutlined className="flex pt-[2px]" />
              Edit
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#EC5151" }}
              onClick={() => showModal(record)}
            >
              <DeleteOutlined className="flex pt-[2px]" />
              Hapus
            </Button>
            {selectedOption && (
              <Modal
              open={open}
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
                    onClick={async () => {
                      (await SeminarRepository.manipulateData.delete(
                        selectedOption.id
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
                  <DeleteTwoTone
                    twoToneColor={"red"}
                    style={{ fontSize: "90px" }}
                    className="justify-center flex pt-3"
                  />
                </div>
                <div className="font-bold text-3xl flex justify-center pt-4">
                  Hapus Seminar
                </div>
                <div className="flex justify-center text-lg pt-3">
                  Apa Anda Yakin Ingin Menghapus Seminar
                </div>
              </div>
            </Modal>
            )}
          </div>
          <div className="pb-1">
            <Button
              className="bg-yellow-500 text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#EAB308" }}
              onClick={() => showModal2(record)}
            >
              <CheckCircleOutlined className="flex pt-[2px]" />
              Selesaikan
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
                      (await SeminarRepository.manipulateData.done(
                        selectedOption2.id
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
                    twoToneColor={"gold"}
                    style={{ fontSize: "90px" }}
                    className="justify-center flex pt-3"
                  />
                </div>
                <div className="font-bold text-3xl flex justify-center pt-4">
                  Selesaikan Seminar
                </div>
                <div className="flex justify-center text-lg pt-3">
                  Apa Anda Yakin Ingin Menyelesaikan Seminar
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
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/seminar/upload/${record.poster}/image`}
          style={{ width: "75%", height: "auto" }}
        />
      ),
      width: 350,
      className: 'justify-center'
    },
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
      width: 250
    },
    {
      title: "Tautan Seminar",
      dataIndex: "link",
      key: "link",
      width: 100,
      ellipsis: {
       showTitle: false
      },
      render: (link) => (
        <Tooltip placement="topLeft" title={link}>
          {link}
        </Tooltip>
      )
    },
    {
      title: "Tanggal",
      dataIndex: "datetime",
      key: "datetime",
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
              href={`seminar/${record.id}`}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Detail
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#525F89] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#525F89" }}
              href={`seminar/edit/${record.id}`}
            >
              <EditOutlined className="flex pt-[2px]" />
              Edit
            </Button>
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
    <LayoutAdmin menu="/admin/seminar">
      <div>
        <div>
          <Button
            className="flex justify-center gap-2 bg-yzc hover:bg-green-400"
            href="seminar/create-seminar"
            type="text"
            style={{
              height: "35px",
              width: "200px",
              fontSize: "16px",
              color: "white",
            }}
          >
            <div>
              <PlusOutlined />
            </div>
            <div>Tambah Seminar</div>
          </Button>
        </div>
        <div className="pt-5">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Semua Seminar" key="Seminar All">
              <Table
                columns={columns}
                dataSource={dataSeminar?.data.map((val: any) => {
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
            <TabPane tab="Menunggu Persetujuan" key="Seminar Pending">
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
              <Table
                columns={columns}
                dataSource={dataSeminarApprove?.data.map((val: any) => {
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
            <TabPane tab="Ditolak" key="Seminar Reject">
              <Table
                columns={columns}
                dataSource={dataSeminarReject?.data.map((val: any) => {
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
            <TabPane tab="Penuh" key="Seminar Full">
              <Table
                columns={columns2}
                dataSource={dataSeminarFull?.data.map((val: any) => {
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
            <TabPane tab="Selesai" key="Seminar Done">
              <Table
                columns={columns3}
                dataSource={dataSeminarDone?.data.map((val: any) => {
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
          </Tabs>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Seminar;
