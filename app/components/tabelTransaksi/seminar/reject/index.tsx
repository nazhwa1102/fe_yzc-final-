"use client";

import { TransaksiRepository } from "#/repository/transaksi";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import DetailOrder from "#/app/components/detailOrder";
import { Table } from "antd/lib";

interface DataType {
  id: string;
  nama: string;
  date: string;
  transaction_amount: number;
  payment_proof: string;
  status: string;
  detailOrder: string;
}

const TransaksiReject = () => {
  const { data: dataTransaksiSeminar } = TransaksiRepository.hooks.seminarReject();
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
    <>
      <Table
        columns={columns}
        dataSource={dataTransaksiSeminar?.data.map((val: any) => {
          console.log(val.poster, "isi poster");
          return {
            id: val.id,
            nama: val.customer.fullName,
            date: val.createdAt,
            transaction_amount: val.transaction_amount,
            payment_proof: val.payment_proof,
          };
        })}
        className="font-semibold"
        scroll={scroll}
        pagination={false}
      />
    </>
  );
};
export default TransaksiReject