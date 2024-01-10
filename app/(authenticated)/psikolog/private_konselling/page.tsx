"use client";
//wait jua
import React, { useState } from "react";
import {
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  PlusOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Modal,
  Pagination,
  Space,
  Tabs,
  Typography,
  Input,
  Form,
  InputNumber,
  TimePicker,
  Calendar,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import LayoutPsikolog from "#/app/components/dashboardPsikolog";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {DatePicker, LocaleProvider } from "@douyinfe/semi-ui";
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
dayjs.extend(customParseFormat);
const onChange = (time: any, timeString: any) => {
  console.log(time, timeString);
};
const { Text, Paragraph } = Typography;

interface DataType {
  id: string;
  poster: string;
  title: string;
  datetime: Date;
}

const privateKonseling = () => {
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

  const [open2, setOpen2] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal2 = () => {
    setIsModalOpen(true);
  };
  const handleOk2 = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen(false);
  };

  const parsePrice = (value: any) => {
    return parseInt(value.replace(/[^0-9]/g, ""), 10);
  };

  const [selectedDates, setSelectedDates] = useState<string[] | any>([]);
  const handleDateSelect = (value: any) => {
    // Menyimpan tanggal yang dipilih ke dalam state
    setSelectedDates([...selectedDates, value.format("YYYY-MM-DD")]);
  };

  const dateCellRender = (value: any) => {
    const dateString: string = value.format("YYYY-MM-DD");

    // Memeriksa apakah tanggal saat ini terpilih
    const isSelected: any = selectedDates.includes(dateString);
  };

  const { TabPane } = Tabs;
  const columns: ColumnsType<DataType> = [
    {
      title: "Tanggal",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Jam",
      dataIndex: "jam",
      key: "jam",
      width: 500,
    },
    {
      title: "Harga",
      dataIndex: "Harga",
      key: "Harga",
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
                  Apa Anda Yakin Ingin Menghapus Private Konselling
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
    <LayoutPsikolog>
      <div>
        <div>
          <Button type="primary" onClick={showModal2}>
            Tambah Private Konselling
            <div>
              <PlusOutlined />
            </div>
          </Button>
          <Modal open={isModalOpen} onOk={handleOk2} onCancel={handleCancel2}>
            <div className="font-bold text-center text-2xl pb-5 text-yzc">
              Tambah Private Konselling
            </div>
            <div className="w-full">
              <div className="font-bold">Pilih Tanggal Private Konselling</div>
              <div className="w-full calender">
                <Form.Item
                  name="date"
                  label="Harap Masukan Tanggal Private Konselling"
                  required={true}
                  className="w-full"
                >
                  <div>
                  <LocaleProvider locale={en_US}>
                  <DatePicker 
                   className="w-full"
                   multiple={true} style={{ width: 240 }} placeholder="Masukan Tanggal" onChange={(e)=>{}}/>
                  </LocaleProvider>
                  </div>
                </Form.Item>
              </div>
              <div className="font-bold">Pilih Jam Private Konselling</div>
              <div className="w-full">
                <Form.Item
                  name="time"
                  label="Harap Masukan Jam Private Konselling"
                  required={true}
                  className="w-full"
                >
                  <Space
                    className="w-full"
                    direction="vertical"
                    size={12}
                  >
                    <TimePicker
                      onChange={onChange}
                      defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                      placeholder="Pilih Jam"
                      className="w-full"
                    />
                  </Space>
                </Form.Item>
              </div>
              <div className="font-bold">Harga Seminar</div>
              <div className="w-full">
                <Form.Item
                  name="price"
                  label="Harap Masukan Harga Seminar"
                  required={true}
                >
                  <InputNumber
                    placeholder="Masukan Harga Seminar"
                    className="w-full"
                    onChange={(e: any) => {}}
                    min={0}
                    step={1}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={parsePrice}
                  />
                </Form.Item>
              </div>
            </div>
          </Modal>
        </div>
        <div className="pt-5">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Semua" key="Seminar All">
              <Table
                columns={columns}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
              />
            </TabPane>
            <TabPane
              tab="Menunggu Konfirmasi"
              key="Seminar Pending"
            >
              <Table
                columns={columns}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
              />
            </TabPane>
            <TabPane
              tab="Disetujui"
              key="Seminar Approve"
            >
              <Table
                columns={columns}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
              />
            </TabPane>
            <TabPane
              tab="Ditolak"
              key="Seminar Reject"
            >
              <Table
                columns={columns}
                className="font-semibold"
                scroll={scroll}
                pagination={false}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </LayoutPsikolog>
  );
};
export default privateKonseling;
