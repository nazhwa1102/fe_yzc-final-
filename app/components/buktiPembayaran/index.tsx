import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { SeminarRepository } from '#/repository/seminar';
import { UploadChangeParam ,UploadFile} from 'antd/lib/upload';
import { CreateTransaksi } from '#/app/type/typeCreateTransaksi';
import { TransaksiRepository } from '#/repository/transaksi';

const { Dragger } = Upload;

type Props ={
  setData: any,
  dataInput: CreateTransaksi,
}
const UploadBukti = ({setData, dataInput}: Props) => {

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

const [image, setImage] = useState<string | null>(null)
const images = async (args: UploadChangeParam<UploadFile<any>>) => {
  const file = args.file;
  try {
    if(file.status === 'done'){
      if (file.size && file.size > 2097152) {
        message.error("ukuran file terlalu besar");
      } else {
        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg"
        ) {
          const response = await TransaksiRepository.manipulateData.UploadImage(file?.originFileObj);
          console.log(response.body.fileName, "hasilnya");
          setImage(response.body.fileName);
          setData({ ...dataInput, payment_proof: response.body.fileName });
        } else {
          message.error("Anda Hanya Dapat Mengunggah dengan ektensi JPG/JPEG/PNG");
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
return(
  <div>
 <Dragger {...props} onChange={images} className='shadow-lg'>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Klik Atau Seret File Ke Area Ini</p>
    <p className="ant-upload-hint">
      Masukan File Berformat jpg/jpeg/png
    </p>
  </Dragger>   
  </div>
  
)
};

export default UploadBukti;
