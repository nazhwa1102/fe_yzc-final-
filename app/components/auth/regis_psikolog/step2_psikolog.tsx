import React from "react";
import { Button, DatePicker, Select, Upload, message } from "antd/lib/index";
import { Option } from "antd/es/mentions";
import { Form, Input } from "antd/lib/index";
import { FormInstance } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

function PsikologStep2() {
  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
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

  return (
    <div className="flex flex-col space-y-15 w-full">
      <div className="grid gap-y-4 grid-cols-1"></div>
      <div className="grid gap-y-4 grid-cols-1">
        <div>
          <p className="text-teks text-2xl font-bold text-white">
            Tentang Saya
          </p>
        </div>
        <div className="w-full">
          <Form.Item>
            <TextArea
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
        <div className="w-full">
          <Form.Item>
            <TextArea
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
		  <Upload {...props}>
              <Button className="w-80" icon={<UploadOutlined />}>Klik Untuk Mengunggah</Button>
            </Upload>
          </div>
        </div>
        <div className="w-1/2 grid gap-y-4 grid-cols-1">
          <div>
            <p className="text-teks text-2xl font-bold text-white">Foto</p>
          </div>
          <div className="w-full">
            <Upload {...props}>
              <Button className="w-80" icon={<UploadOutlined />}>Klik Untuk Mengunggah</Button>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PsikologStep2;
