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
import { Button, Card, Form, Input, Modal, Pagination, Space, Tabs, Typography, message, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { SeminarRepository } from "#/repository/seminar";
import LayoutPsikolog from "#/app/components/dashboardPsikolog";
import { Alasan } from "#/app/types/typeAlasan";
import { mutate } from "swr";
import SeminarApprove from "#/app/components/tabelseminar/approve";
import SeminarReject from "#/app/components/tabelseminar/reject";
import { parseJwt } from "#/utils/convert";
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  poster: string;
  title: string;
  datetime: Date;
}

const Seminar = () => {
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
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

  return (
    <LayoutPsikolog menu="dashboard">
      <div>
        
      </div>
    </LayoutPsikolog>
  );
};

export default Seminar;
