"use client";

import LayoutAdmin from "#/app/components/layoutadmin";
import React, { useState } from "react";
import { Button, Modal, Tabs, message, Table, Form, Input } from "antd";
import type { TabsProps } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  CheckOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { TransaksiRepository } from "#/repository/transaksi";
import DetailOrder from "#/app/components/detailOrder";
import LayoutCustomer from "#/app/components/layoutCustomer";
import TransaksiPendingCus from "#/app/components/tabelTransaksi/customer/pending";
import TransaksiApproveCus from "#/app/components/tabelTransaksi/customer/approve";
import TransaksiRejectCus from "#/app/components/tabelTransaksi/customer/reject";

interface DataType {
  id: string;
  nama: string;
  date: string;
  transaction_amount: number;
  payment_proof: string;
  status: string;
  detailOrder: string;
}

const { TabPane } = Tabs;

const RiwayatTransaksi = () => {
  const { data: dataTransaksiSeminar } = TransaksiRepository.hooks.seminar();
  const { data: dataTransaksiPrivateKonseling } =
    TransaksiRepository.hooks.privateKonseling();

  const [open, setOpen] = useState(false);

  function formatDateWithHyphens(date: any) {
    const inputDate = new Date(date);

    if (isNaN(inputDate.getTime())) {
      // Handle the case where 'date' is not a valid date
      console.error("Invalid date:", date);
      return "Invalid Date";
    }

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = inputDate.getDate().toString().padStart(2, "0");
    const hour = inputDate.getHours().toString().padStart(2, "0");
    const minute = inputDate.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}, ${hour}.${minute} WIB`;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Tanggal",
      dataIndex: "date",
      key: "date",
      render: (_, record) => <div>{formatDateWithHyphens(record.date)}</div>,
    },
    {
      title: "Nominal",
      dataIndex: "transaction_amount",
      key: "transaction_amount",
    },
    {
      title: "Foto",
      dataIndex: "payment_proof",
      key: "payment_proof",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/transaksi/upload/${record.payment_proof}/image`}
          style={{ width: "100%", height: "auto" }}
        />
      ),
      width: 100,
    },
    {
      title: "Detail",
      dataIndex: "id",
      key: "detail",
      render: (_, record) => (
        <div className="justify-center flex">
          <DetailOrder id={record.id} />
        </div>
      ),
    },
  ];

  const scroll = {
    x: "max-content",
    y: 600,
  };

  return (
    <LayoutCustomer menu="/riwayat_transaksi">
      <div>
            <Tabs>
              <TabPane tab="List Transaksi Tertunda" key="Transaksi Pending">
                <TransaksiPendingCus />
              </TabPane>
              <TabPane tab="List Transaksi Disetejui" key="Transaksi Approve">
                <TransaksiApproveCus />
              </TabPane>
              <TabPane tab="List Transaksi Ditolak" key="Transaksi Reject">
                <TransaksiRejectCus />
              </TabPane>
            </Tabs>
      </div>
    </LayoutCustomer>
  );
};

console.log();

export default RiwayatTransaksi;
