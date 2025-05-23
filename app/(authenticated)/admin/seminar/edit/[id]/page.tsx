"use client";

import { usePathname, useRouter } from "next/navigation";
import { Card } from "antd/lib/index";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import { SeminarRepository } from "#/repository/seminar";
import { parseJwt } from "#/app/components/helper/convert";
import { IntlProvider } from "react-intl";
import PriceFormatter from "#/app/components/priceFormatter";
import { useEffect, useState } from "react";
import LayoutAdmin from "#/app/components/layoutadmin";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
  RedoOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import UploadPoster from "#/app/components/upload";
import { PsikologRepository } from "#/repository/psikolog";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";

const detailSeminar = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const pathname = (usePathname() ?? "").split("/");
  const {
    data: dataSeminar,
    error,
    isLoading,
  } = SeminarRepository.hooks.detailSeminar(pathname[pathname.length - 1]);
  const { data: datapsikolog } = PsikologRepository.hooks.get();

  const [updateSeminar, setUpdateSeminar] = useState({
    title: "",
    datetime: "",
    price: "",
    link: "",
    poster: "",
    psikolog: "",
    kuota: "",
  });

  useEffect(() => {
    if (!isLoading) {
      setUpdateSeminar({
        title: dataSeminar?.data.title,
        datetime: dataSeminar?.data.datetime,
        price: dataSeminar?.data.price,
        link: dataSeminar?.data.link,
        poster: dataSeminar?.data.poster,
        psikolog: dataSeminar?.data.psikolog,
        kuota: dataSeminar?.data.kuota
      });
    }
    form.setFieldsValue({
      title: dataSeminar?.data.title,
      datetime: dataSeminar?.data.datetime,
      price: dataSeminar?.data.price,
      link: dataSeminar?.data.link,
      poster: dataSeminar?.data.poster,
      psikolog: dataSeminar?.data.psikolog,
      kuota: dataSeminar?.data.kuota
    });
  }, [dataSeminar]);

  const onFinish = async () => {
    try {
      const data = {
        title: updateSeminar?.title,
        datetime: updateSeminar?.datetime,
        price: updateSeminar?.price,
        link: updateSeminar?.link,
        poster: updateSeminar?.poster,
        psikolog: updateSeminar?.psikolog,
        kuota: updateSeminar?.kuota
      };
      const updates = await SeminarRepository.manipulateData.update(
        data,
        dataSeminar?.data.id
      );
      setTimeout(
        message.success("Anda Telah Berhasil Menambahkan Seminar"),
        5000
      );
      router.back();
    } catch (error) {
      throw error;
    }
  };

  type FieldType = {
    title: string;
    datetime: Date;
    price: number;
    link: string;
    poster: string;
    psikolog: [];
    kuota: number;
  };

  const parsePrice = (value: any) => {
    return parseInt(value.replace(/[^0-9]/g, ""), 10);
  };

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [image, setImage] = useState<string | null>(null);
  const images = async (args: UploadChangeParam<UploadFile<any>>) => {
    const file = args.file;
    try {
      if (file.status === "done") {
        if (file.size && file.size > 2097152) {
          message.error("ukuran file terlalu besar");
        } else {
          if (
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
          ) {
            const response = await SeminarRepository.manipulateData.UploadImage(
              file?.originFileObj
            );
            console.log(response.body.fileName, "hasilnya");
            setImage(response.body.fileName);
            setUpdateSeminar({
              ...updateSeminar,
              poster: response.body.fileName,
            });
          } else {
            message.error(
              "Anda Hanya Dapat Mengunggah dengan ektensi JPG/JPEG/PNG"
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutAdmin>
      <div className="flex justify-center pt-5">
        <div>
          <div>
            <Form
              size="large"
              style={{ maxWidth: "500px" }}
              onFinish={onFinish}
            >
              <div className="font-bold text-2xl">Poster</div>
              <div>Harap Masukan Poster Seminar</div>
              <div className="w-[500px] h-[250px] pt-5">
                <FormItem<FieldType> name="poster">
                  <Dragger {...props} onChange={images} className="shadow-lg">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Klik Atau Seret File Ke Area Ini
                    </p>
                    <p className="ant-upload-hint">
                      Masukan File Berformat jpg/jpeg/png
                    </p>
                  </Dragger>
                </FormItem>
              </div>
              <div className="">
                <div className="font-bold text-2xl">Judul Seminar</div>
                <div>Harap Masukan Judul Seminar</div>
                <div className="pt-2">
                  <Form.Item<FieldType>
                    name="title"
                    initialValue={dataSeminar?.data.title}
                  >
                    <Input
                      placeholder="Masukan Judul Seminar"
                      className="w-[500px]"
                      onChange={(e) => {
                        setUpdateSeminar({
                          ...updateSeminar,
                          title: e.target.value,
                        });
                      }}
                      value={dataSeminar?.data.title}
                      defaultValue={dataSeminar?.data.title}
                    />
                  </Form.Item>
                </div>
                <div className="font-bold text-2xl">Tanggal Seminar</div>
                <div>Harap Masukan Tanggal Seminar</div>
                <div className="pt-2">
                  <Form.Item<FieldType>
                    name="datetime"
                    initialValue={dataSeminar?.data.datetime}
                  >
                    <DatePicker
                      className="w-[500px] h-10"
                      onChange={(e: any) => {
                        setUpdateSeminar({ ...updateSeminar, datetime: e });
                      }}
                      value={dataSeminar?.data.datetime}
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="flex pl-[100px]">
          <div>
            <div className="pt-5">
              <Form size="large" onFinish={onFinish}>
                <div className="font-bold text-2xl">Harga Seminar</div>
                <div>Harap Masukan Harga Seminar</div>
                <div className="pt-2">
                  <Form.Item<FieldType>
                    name="price"
                    initialValue={dataSeminar?.data.price}
                  >
                    <InputNumber
                      placeholder="Masukan Harga Seminar"
                      className="w-[500px]"
                      onChange={(e: any) => {
                        setUpdateSeminar({ ...updateSeminar, price: e });
                      }}
                      min={0}
                      step={1}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={parsePrice}
                      value={dataSeminar?.data.price}
                    />
                  </Form.Item>
                </div>
                <div className="font-bold text-2xl">Kuota Seminar</div>
                <div>Harap Masukan Kuota Seminar</div>
                <div className="pt-2">
                  <Form.Item<FieldType>
                    name="kuota"
                    initialValue={dataSeminar?.data.kuota}
                  >
                    <Input
                      placeholder="Masukan Kuota Seminar"
                      className="w-[500px]"
                      onChange={(e: any) => {
                        setUpdateSeminar({
                          ...updateSeminar,
                          kuota: e.target.value,
                        });
                      }}
                      value={dataSeminar?.data.kuota}
                    />
                  </Form.Item>
                </div>
                <div className="font-bold text-2xl">Tautan Seminar</div>
                <div>Harap Masukan Tautan Seminar</div>
                <div className="pt-2">
                  <Form.Item<FieldType>
                    name="link"
                    initialValue={dataSeminar?.data.link}
                  >
                    <Input
                      placeholder="Masukan Tautan Seminar"
                      className="w-[500px]"
                      onChange={(e) => {
                        setUpdateSeminar({
                          ...updateSeminar,
                          link: e.target.value,
                        });
                      }}
                      value={dataSeminar?.data.link}
                    />
                  </Form.Item>
                </div>
              </Form>
              <div className="font-bold text-2xl">Pemateri</div>
              <div>Harap Masukan Namam Pemateri Masksimal 3 Orang</div>
              <div className="pt-2 flex">
                <Form onFinish={onFinish} size="middle">
                  <Form.Item<FieldType>
                    name="psikolog"
                    initialValue={dataSeminar?.data.psikolog}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "500px", height: "40px" }}
                      placeholder="Please select"
                      options={datapsikolog?.data.map((val: any) => {
                        return {
                          value: val.id,
                          label: val.fullName,
                        };
                      })}
                      maxLength={3}
                      maxTagCount={3}
                      maxTagPlaceholder={3}
                      maxTagTextLength={3}
                      onChange={(e) => {
                        setUpdateSeminar({ ...updateSeminar, psikolog: e });
                      }}
                    />
                  </Form.Item>
                </Form>
              </div>
              <div className="flex justify-center pt-20">
                <Button
                  type="text"
                  className="bg-primary text-2xl h-fit w-[400px] rounded-[20px]"
                  onClick={onFinish}
                >
                  Perbarui Seminar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default detailSeminar;
