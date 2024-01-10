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
  DollarOutlined,
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
  const { data: dataPsikologActive } = PsikologRepository.hooks.active();


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
              className="bg-[#455A64] text-white flex items-center w-fit justify-center"
              style={{ backgroundColor: "#455A64" }}
              href={`psikolog/${record.id}`}
            >
              <DollarOutlined className="flex pt-[2px]" />
              Kelola Pembayaran
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
    <LayoutAdmin menu="/admin/psikolog">
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
    </LayoutAdmin>
  );
};

export default Psikolog;
