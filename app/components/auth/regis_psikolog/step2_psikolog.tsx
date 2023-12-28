import React, { useState } from "react";
import { Button, DatePicker, Select, Upload, message } from "antd/lib/index";
import { Option } from "antd/es/mentions";
import { Form, Input } from "antd/lib/index";
import { FormInstance } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { RegisterPsikolog } from "#/app/types/typeRegisPsg";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { authRepository } from "#/repository/auth";

type Props = {
  setData: any;
  dataInput: RegisterPsikolog;
  formStep2: FormInstance<any>;
};

function PsikologStep2({ setData, dataInput, formStep2 }: Props) {
  const [foto, setFoto] = useState<string | null>(null);
  const [legalitas, setLegalitas] = useState<string | null>(null);
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

  const photo = async (args: UploadChangeParam<UploadFile<any>>) => {
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
            const response = await authRepository.manipulateData.Photo(
              file?.originFileObj
            );
            console.log(response.body.fileName, "hasilnya");
            setFoto(response.body.fileName);
            setData({ ...dataInput, photo: response.body.fileName });
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

  const legality = async (args: UploadChangeParam<UploadFile<any>>) => {
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
            const response = await authRepository.manipulateData.legality(
              file?.originFileObj
            );
            console.log(response.body.fileName, "hasilnya");
            setFoto(response.body.fileName);
            setData({ ...dataInput, legality: response.body.fileName });
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
    <Form form={formStep2}>
      <div className="flex flex-col space-y-15 w-full">
        <div className="grid gap-y-4 grid-cols-1"></div>
        <div className="grid gap-y-4 grid-cols-1">
          <div>
            <p className="text-teks text-2xl font-bold text-white">
              Kasus yang Ditangani
            </p>
          </div>
          <div className="w-full regis">
            <Form.Item name="case_handled">
              <TextArea
                onChange={(e) => {
                  setData({ ...dataInput, caseHandled: e.target.value });
                }}
                rows={2}
                placeholder="Tulis Disini"
                className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
              />
            </Form.Item>
          </div>
        </div>
        <div className="grid gap-y-4 grid-cols-1">
          <div>
            <p className="text-teks text-2xl font-bold text-white">
              Tentang Saya
            </p>
          </div>
          <div className="w-full regis">
            <Form.Item name="about_me">
              <TextArea
                onChange={(e) => {
                  setData({ ...dataInput, aboutMe: e.target.value });
                }}
                rows={2}
                placeholder="Tulis Disini"
                className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex gap-x-5 grid-cols-1">
          <div className="w-1/2 grid gap-y-4 grid-cols-1">
            <div>
              <p className="text-teks text-2xl font-bold text-white">
                Sertifikat Legalitas
              </p>
            </div>
            <div className="w-full">
              <FormItem name="legality">
                <Upload {...props} maxCount={1} onChange={legality}>
                  <Button
                    onChange={(e) => {
                      setData({ ...dataInput, legality: e });
                    }}
                    className="w-80"
                    icon={<UploadOutlined />}
                  >
                    Klik Untuk Mengunggah
                  </Button>
                </Upload>
              </FormItem>
            </div>
          </div>
          <div className="w-1/2 grid gap-y-4 grid-cols-1">
            <div>
              <p className="text-teks text-2xl font-bold text-white">Foto</p>
            </div>
            <div className="w-full">
              <FormItem name="photo">
                <Upload {...props} maxCount={1} onChange={photo}>
                  <Button
                    onChange={(e) => {
                      setData({ ...dataInput, photo: e });
                    }}
                    className="w-80"
                    icon={<UploadOutlined />}
                  >
                    Klik Untuk Mengunggah
                  </Button>
                </Upload>
              </FormItem>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default PsikologStep2;
