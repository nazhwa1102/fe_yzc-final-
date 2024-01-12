"use client";

import React, { useState } from "react";
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
  Modal,
  Space,
  Tabs,
  Typography,
  Form,
  InputNumber,
  TimePicker,
  message,
  Input,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import LayoutPsikolog from "#/app/components/dashboardPsikolog";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, LocaleProvider } from "@douyinfe/semi-ui";
import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import { PrivateKonselingRepository } from "#/repository/private_konseling";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { Alasan } from "#/app/types/typeAlasan";
dayjs.extend(customParseFormat);
const onChange = (time: any, timeString: any) => {
  console.log(time, timeString);
};
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  datetime: Date[];
  price: number;
  psikolog: string;
}

const privateKonseling = () => {
  const token = localStorage.getItem("access_token");
  console.log(token, "yuk bisa");
  let role: string = "";
  let email: string = "";
  let fullNamePsi: string = "";
  let idPsi: string = "";

  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNamePsi = parseJwt(token).fullNamePsi;
    idPsi = parseJwt(token).idPsi;
    console.log(role, "role cocok");
    console.log(fullNamePsi, "nama");
    console.log(idPsi, "id");
  }
  const router = useRouter();

  const { data: dataPrivatePending } =
    PrivateKonselingRepository.hooks.statusPendingPsi(idPsi);
  const { data: dataPrivateApprove } =
    PrivateKonselingRepository.hooks.statusApprovePsi(idPsi);
  const { data: dataPrivateReject } =
    PrivateKonselingRepository.hooks.statusRejectPsi(idPsi);

  const [selectedOption, setSelectedOption] = useState<DataType | null>(null);
  const [open, setOpen] = useState(false);

  const showModal = (option: DataType) => {
    setSelectedOption(option);
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [selectedOption2, setSelectedOption2] = useState<DataType | null>(null);
  const [open2, setOpen2] = useState(false);

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

  const [dataInput, setUser] = useState<Alasan>({
    alasan: "",
  });

  const onFinish = async (val: any) => {
    try {
      const datas = {
        alasan: dataInput.alasan,
      };
      const create_Transaksi =
        await PrivateKonselingRepository.manipulateData.reject(datas, val);
      setOpen(false);
      mutate;
      setTimeout(message.success("Anda Telah Berhasil Menolak Seminar"), 5000);
    } catch (error) {
      throw error;
    }
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

    return `${year}-${month}-${day}`;
  }

  const { TabPane } = Tabs;
  const columns: ColumnsType<DataType> = [
    {
      title: "Tanggal",
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => (
        <div>
          {record.datetime.map((val) => (
            <ul className="list-disc pl-5">
              <li>
                <>{formatDateWithHyphens(val)}</>
              </li>
            </ul>
          ))}
        </div>
      ),
      width: 400,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      width: 400,
    },
    {
      title: "Psikolog",
      dataIndex: "psikolog",
      key: "psikolog",
      width: 400,
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
              href={`private-konseling/${record.id}`}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Detail
            </Button>
          </div>
          <div className="pb-1">
            <Button
              className="bg-[#525F89] text-white flex items-center w-[125px] justify-center"
              onClick={() => showModal2(record)}
              type="text"
            >
              <CheckOutlined className="flex pt-[2px]" />
              Terima
            </Button>
            {selectedOption2 && (
              <Modal
                open={open2}
                onCancel={handleCancel2}
                footer={(_) => (
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
                        (await PrivateKonselingRepository.manipulateData.approve(
                          selectedOption2.id
                        )) && window.location.reload();
                      }}
                    >
                      Ya
                    </Button>
                  </div>
                )}
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
                    Setujui Private Konseling
                  </div>
                  <div className="flex justify-center text-lg pt-3">
                    Apa Anda Yakin Ingin Menyetujui Private Konseling
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
                open={open}
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
                      onClick={() => {
                        onFinish(selectedOption.id);
                      }}
                    >
                      Ya
                    </Button>
                  </div>
                )}
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
                    Tolak Private Konseling
                  </div>
                  <div className="flex justify-center text-lg pt-3">
                    Apa Anda Yakin Ingin Menolak Private Konseling
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
                            placeholder="Masukan Alasan Penolakan Seminar"
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

  const columns2: ColumnsType<DataType> = [
    {
      title: "Tanggal",
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => (
        <div>
          {record.datetime.map((val) => (
            <ul className="list-disc pl-5">
              <li>
                <>{formatDateWithHyphens(val)}</>
              </li>
            </ul>
          ))}
        </div>
      ),
      width: 400,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      width: 400,
    },
    {
      title: "Psikolog",
      dataIndex: "psikolog",
      key: "psikolog",
      width: 400,
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
              href={`private-konseling/${record.id}`}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Detail
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const columns3: ColumnsType<DataType> = [
    {
      title: "Tanggal",
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => (
        <div>
          {record.datetime.map((val) => (
            <ul className="list-disc pl-5">
              <li>
                <>{formatDateWithHyphens(val)}</>
              </li>
            </ul>
          ))}
        </div>
      ),
      width: 400,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      width: 400,
    },
    {
      title: "Psikolog",
      dataIndex: "psikolog",
      key: "psikolog",
      width: 400,
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
              href={`private-konseling/${record.id}`}
            >
              <ZoomInOutlined className="flex pt-[2px]" />
              Detail
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
    <LayoutPsikolog>
      <div>
        <div className="pt-5">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Menunggu Konfirmasi" key="Seminar Pending">
              <Table
                columns={columns}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
                dataSource={dataPrivatePending?.data.map((val: any) => {
                  return {
                    id: val.id,
                    datetime: val.datetime,
                    price: val.price,
                    psikolog: val.psikolog?.fullName,
                  };
                })}
              />
            </TabPane>
            <TabPane tab="Disetujui" key="Seminar Approve">
              <Table
                columns={columns2}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
                dataSource={dataPrivateApprove?.data.map((val: any) => {
                  return {
                    id: val.id,
                    datetime: val.datetime,
                    price: val.price,
                    psikolog: val.psikolog?.fullName,
                  };
                })}
              />
            </TabPane>
            <TabPane tab="Ditolak" key="Seminar Reject">
              <Table
                columns={columns3}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
                dataSource={dataPrivateReject?.data.map((val: any) => {
                  return {
                    id: val.id,
                    datetime: val.datetime,
                    price: val.price,
                    psikolog: val.psikolog?.fullName,
                  };
                })}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </LayoutPsikolog>
  );
};
export default privateKonseling;
