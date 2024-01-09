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
import { Button, Card, Modal, Pagination, Space, Tabs, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { bankRepository } from "#/repository/bank";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/navigation";
import LayoutPsikolog from "#/app/components/dashboardPsikolog";
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  bank_name: string;
  qr: string;
  account_owner_name: string;
  account_number: string;
}

type createBank = {
    psikolog: string;
    bank_name: string;
    qr: string;
    account_owner_name: string;
    account_number: string;
}

const Bank = () => {
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

  const { data: dataBank } = bankRepository.hooks.bankPsi(idPsi);


  const columns: ColumnsType<DataType> = [
    {
      title: "QR",
      dataIndex: "qr",
      key: "qr",
      render: (_, record) => (
        <img
          src={`http://localhost:3222/bank/upload/${record.qr}/image`}
          style={{ width: "25%", height: "auto" }}
        />
      ),
      width: 500,
    },
    {
      title: "Bank",
      dataIndex: "bank_name",
      key: "bank_name",
    },
    {
      title: "Nomer Rekening",
      dataIndex: "account_number",
      key: "account_number",
    },
    {
        title: "Nama Pemilik",
        dataIndex: "account_owner_name",
        key: "account_owner_name",
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
              href={`bank/${record.id}`}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Detail
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#525F89] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#525F89" }}
              href={`bank/edit/${record.id}`}
            >
              <EditOutlined className="flex pt-[2px]" />
              Edit
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#EC5151] text-white flex items-center w-[125px] justify-center"
              style={{ backgroundColor: "#EC5151" }}
              onClick={showModal}
            >
              <DeleteOutlined className="flex pt-[2px]" />
              Hapus
            </Button>
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
                      (await bankRepository.manipulateData.delete(
                        record.id
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
    <LayoutPsikolog menu="pemabayaran">
      <div>
        <div>
          <Button
            className="flex justify-center gap-2 bg-green-500 hover:bg-green-400"
            href="bank/create_bank"
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
            <div>Tambah Bank</div>
          </Button>
        </div>
        <div className="pt-5">
        <Table
                columns={columns}
                dataSource={dataBank?.data.map((val: any) => {
                  console.log(val.poster, "isi poster");
                  return {
                    id: val.id,
                    bank_name: val.bank_name,
                    qr: val.qr,
                    account_owner_name: val.account_owner_name,
                    account_number: val.account_number
                  };
                })}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
              />
        </div>
      </div>
    </LayoutPsikolog>
  );
};

export default Bank;
