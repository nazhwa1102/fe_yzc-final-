"use client";

import React, { useState } from "react";
import LayoutAdmin from "#/app/components/layoutadmin";
import {
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  PlusOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { Button, Card, Modal, Pagination, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { SeminarRepository } from "#/repository/seminar";
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

  const { data: dataSeminar } = SeminarRepository.hooks.statusPending( );
  const columns: ColumnsType<DataType> = [
    {
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/seminar/upload/${record.poster}/image`}
          style={{width: '25%', height: 'auto'}}
        />
      ),
      width: 500
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
      title: "Aksi",
      key: "Aksi",
      render: (_,record) => (
        <div className="list-item justify-center">
          <div className="pb-1">
            <Button className="bg-[#455A64] text-white flex items-cente w-[125px] justify-center">
              <ZoomInOutlined className="flex pt-[2px]" />
              Lihat Detail
            </Button>
          </div>
          <div className="pb-1">
            <Button className="bg-[#525F89] text-white flex items-center w-[125px] justify-center">
              <EditOutlined className="flex pt-[2px]" />
              Edit
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
              onClick={showModal}
            >
              <DeleteOutlined className="flex pt-[2px]" />
              Hapus
            </Button>
            <Modal
              open={open}
              footer={(_) => (
                <div className="justify-center flex pt-3">
                  <Button onClick={handleCancel} className="bg-red-600 text-white hover:text-white w-20">Batal</Button>
                  <Button className="text-white bg-[#525F89] hover:text-white w-20"
                    onClick={async() => {await SeminarRepository.manipulateData.delete(record.id) && window.location.reload()}}
                  >Ya</Button>
                </div>
              )}
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
    <LayoutAdmin menu="seminar">
      <div>
        <div>
          <Button
            className="flex justify-center gap-2 bg-green-500 hover:bg-green-400"
            href="create-seminar"
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
          <Table
            columns={columns}
            dataSource={dataSeminar?.data.map((val: any) => {
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
          />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Seminar;
