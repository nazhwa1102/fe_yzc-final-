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

const SeminarApprove = () => {
  const token = localStorage.getItem("access_token");
  console.log(token, "yuk bisa");
  let role: string = "";
  let email: string = "";
  let fullNamePsi: string = "";
  let idPsi: string = ""

  console.log(parseJwt(token));
  
  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNamePsi = parseJwt(token).fullNamePsi;
    idPsi = parseJwt(token).idPsi
    console.log(role, "role cocok");
    console.log(fullNamePsi, "nama");
    console.log(idPsi, 'id');
  }
  const router = useRouter()
  const { data: dataSeminarApprove } = SeminarRepository.hooks.statusApprovePsi(idPsi);

  const columns: ColumnsType<DataType> = [
    {
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/seminar/upload/${record.poster}/image`}
          style={{ width: "65%", height: "auto" }}
        />
      ),
      width: 250,
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
      width: 250
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
              href={`seminar/${record.id}`}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Lihat Detail
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
      <div>
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
      </div>
  );
};

export default SeminarApprove;
