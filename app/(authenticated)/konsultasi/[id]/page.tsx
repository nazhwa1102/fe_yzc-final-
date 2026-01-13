"use client";

import { usePathname, useRouter } from "next/navigation";
import { Card } from "antd/lib/index";
import Layout2 from "#/app/components/layout";
import {
  Button,
  Form,
  Menu,
  MenuProps,
  Modal,
  Radio,
  Statistic,
  message,
} from "antd";
import { CheckCircleTwoTone, LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import Uploads from "#/app/components/upload";
import { SeminarRepository } from "#/repository/seminar";
import { IntlProvider } from "react-intl";
import PriceFormatter from "#/app/components/priceFormatter";
import { TransaksiRepository } from "#/repository/transaksi";
import FormItem from "antd/lib/form/FormItem";
import { parseJwt } from "#/utils/convert";
import { PsikologRepository } from "#/repository/psikolog";
import { CreateTransaksiPK } from "#/app/types/typeCreateTransaksiPK";
import { DatePicker, LocaleProvider } from "@douyinfe/semi-ui";
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import Bank from "#/app/components/bank2";
import UploadBukti from "#/app/components/buktiPembayaran2";


const bayarSeminar = () => {
  const pathname = usePathname().split("/");
  const { data } = PsikologRepository.hooks.getById(
    pathname[pathname.length - 1]
  );

  function getTomorrowDate(): Date {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  }
  const tomorrowDate = getTomorrowDate();

  const token = localStorage.getItem('access_token');
  console.log(token, "yuk bisa");
  let role: string = '';
  let email: string = '';
  let fullNameCus: string = ''
  let idCus: string = ''

  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNameCus = parseJwt(token).fullNameCus
    idCus = parseJwt(token).idCus
    console.log(role, "role cocok");
    console.log(fullNameCus, 'nama');
    console.log(idCus, 'ini id')
  }

  const router = useRouter();
  const [dataInput, setTransaksi] = useState<CreateTransaksiPK>({
    bank: "",
    customer: idCus,
    psikolog: data?.data.id,
    exp_date: getTomorrowDate(),
    payment_proof: "",
    status: "pending",
    type: "CusToAdmin",
    datetime: [],
    price: 50000
  });

  const onFinish = async (val: any) => {
    try {
      const datas = {
        bank: dataInput.bank,
        customer: idCus,
        psikolog: data?.data.id,
        exp_date: dataInput.exp_date,
        payment_proof: dataInput.payment_proof,
        status: "pending",
        type: "CusToAdmin",
        datetime: dataInput.datetime,
        price: 50000
      };
      const create_Transaksi = await TransaksiRepository.manipulateData.createPK(
        datas
      );
      Modal.success({
        icon:(
          <div className="flex justify-center">
            <div className="flex justify-center">
            <CheckCircleTwoTone twoToneColor="lightgreen" style={{fontSize: '90px'}}/>
            </div>
          </div>
        ),
        title:(
          <div className="flex justify-center text-lg font-bold text-center">
            <div className="flex justify-center">
            Success
            </div>
          </div>
        ),
        content: (
          <div className="flex justify-center text-xl font-bold text-center">
            <div className="justify-center">
            Anda Berhasil Melakukan Transaksi
            <p>Menunggu Konfirmasi Admin</p>
            </div>
          </div>
        ),
      })
      setTimeout(() => {
        Modal.destroyAll
      }, 10000);
      console.log(create_Transaksi);
      router.back()
    } catch (error) {
      throw error;
    }
  };

  return (
    <Layout2 title="Private Konseling">
      <div className="flex justify-center">
        <Card className="border-green-800 w-[1450px] h-[770px] gap-[100px] flex justify-between shadow-lg">
          <a href="/seminar" className="font-bold text-lg text-black">
            <LeftOutlined />
            Kembali
          </a>
          <div className="flex justify-between gap-[80px] mt-5 ">
            <div className="flex justify-between pl-5">
              <div className="flex justify-center">
                <Form>
                  <FormItem>
                    <LocaleProvider locale={en_GB}>
                    <DatePicker multiple={true} size="large" style={{ width: 300}} max={3} onChange={(e: any) => {
                      setTransaksi({...dataInput, datetime: e})
                    }}/>
                    </LocaleProvider>
                  </FormItem>
                </Form>
              </div>
            </div>
            <div className="w-[510px] h-[460px] bg-slate-50 p-2 shadow-lg">
              <div className="font-bold text-2xl">Detail Transaksi: </div>
              <br />
              <div className="items-center justify-center">
                <div className="justify-center">
                  <div className="justify-center items-center flex">
                      <img
                        src={`http://localhost:3222/psikolog/upload/${data?.data.photo}/image`}
                        className="rounded-[50%] w-[120px] h-[120px] flex justify-center shadow-md"
                      />
                  </div>
                  <div className="flex justify-center">
                    <div>
                      <div className=" flex justify-center w-[250px] pt-2">
                      <p className="font-bold text-2xl justify-center text-center flex">
                        {data?.data.fullName}
                      </p>
                    </div>
                    <div className=" flex justify-center w-[250px]">
                      <div className="font-bold text-xl justify-center text-center flex">
                        {data?.data.spesialis}
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
              <div className="pt-5 flex font-bold gap-2 text-lg text-yzc">
                <div>
                Harga:
                </div>
                <IntlProvider>
                  <PriceFormatter value={dataInput.price * dataInput.datetime.length}/>
                </IntlProvider>
              </div>
            </div>
            <div>
              <div>
                <div className="font-bold text-lg">
                  Lakukan Pembayaran Sebelum Berakhir Pada:{" "}
                </div>
                <div className="flex justify-center font-bold text-3xl text-yzc">
                  {tomorrowDate.toLocaleDateString("id-ID")}
                </div>
                <br />
              </div>
              <div>
                <div className="font-bold text-xl">
                  Pilih Metode Pembayaran :
                </div>
              </div>
              <FormItem name="bank">
                <Bank setData={setTransaksi} dataInput={dataInput}/>
              </FormItem>
              <div className="pt-4 justify-center flex"></div>
              <UploadBukti setData={setTransaksi} dataInput={dataInput} />
              <div className="pt-10 flex justify-center">
                <Button type="text" className="bg-green-600" onClick={onFinish}>
                  Selesaikan Pembayaran
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout2>
  );
};
export default bayarSeminar;
