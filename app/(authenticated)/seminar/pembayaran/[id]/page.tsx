"use client";

import { usePathname, useRouter } from "next/navigation";
import { Card } from "antd/lib/index";
import Layout2 from "#/app/components/layout";
import {
  Button,
  Menu,
  MenuProps,
  Modal,
  Radio,
  Statistic,
  message,
} from "antd";
import { CheckCircleTwoTone, LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import Bank from "#/app/components/bank";
import { useState } from "react";
import Uploads from "#/app/components/upload";
import { SeminarRepository } from "#/repository/seminar";
import { IntlProvider } from "react-intl";
import PriceFormatter from "#/app/components/priceFormatter";
import { TransaksiRepository } from "#/repository/transaksi";
import { CreateTransaksi } from "#/app/types/typeCreateTransaksi";
import FormItem from "antd/lib/form/FormItem";
import UploadBukti from "#/app/components/buktiPembayaran";
import { parseJwt } from "#/utils/convert";
const { Countdown } = Statistic;
const deadline = Date.now() + 24000 * 60 * 60 + 1000;

const bayarSeminar = () => {
  const pathname = usePathname().split("/");
  const { data } = SeminarRepository.hooks.detailSeminar(
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
  const [dataInput, setTransaksi] = useState<CreateTransaksi>({
    bank: "",
    customer: idCus,
    detailOrder: [{
      id: data?.data.id,
      types: "seminar",
      price: data?.data.price
    }],
    exp_date: getTomorrowDate(),
    payment_proof: "",
    status: "pending",
    type: "CusToAdmin",
  });

  const onFinish = async (val: any) => {
    try {
      const datas = {
        bank: dataInput.bank,
        customer: idCus,
        detailOrder: [{
          id: data?.data.id,
          types: "seminar",
          price: data?.data.price
        }],
        exp_date: dataInput.exp_date,
        payment_proof: dataInput.payment_proof,
        status: "pending",
        type: "CusToAdmin",
      };
      const create_Transaksi = await TransaksiRepository.manipulateData.create(
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
          <div className="flex justify-center text-lg font-bold">
            <div className="flex justify-center">
            Success
            </div>
          </div>
        ),
        content: (
          <div className="flex justify-center text-xl font-bold">
            <div className="flex justify-center">
            Anda Berhasil Melakukan Transaksi
            </div>
          </div>
        ),
      })
      setTimeout(() => {
        Modal.destroyAll
      }, 10000);
      console.log(create_Transaksi);
      router.push(`/seminar/${pathname[pathname.length - 1]}`)
    } catch (error) {
      throw error;
    }
  };

  return (
    <Layout2 title="Detail Seminar">
      <div className="flex justify-center">
        <Card className="border-green-800 w-[1450px] h-[770px] gap-[100px] flex justify-between shadow-lg">
          <a href="/seminar" className="font-bold text-lg text-black">
            <LeftOutlined />
            Kembali
          </a>
          <div className="flex justify-between gap-[80px] mt-5 ">
            <div className="flex justify-between pl-5">
              <div className="flex justify-center">
                <img
                  src={`http://localhost:3222/seminar/upload/${data?.data.poster}/image`}
                  style={{ height: "500px", width: "auto" }}
                />
              </div>
            </div>
            <div className="w-[510px] h-[460px] bg-slate-50 p-2 shadow-lg">
              <div className="font-bold text-2xl">Detail Transaksi: </div>
              <br />
              <div className="font-bold text-xl justify-between">
                <div>"{data?.data.title}"</div>
              </div>
              <div className="pt-5 flex text-lg gap-5 font-bold">
                <div>{data?.data.datetime}</div>
              </div>
              <div className="pt-5 flex font-bold gap-5 text-lg text-yzc">
                <IntlProvider>
                  <PriceFormatter value={data?.data.price} />
                </IntlProvider>
              </div>
              <p className="pt-16 font-bold text-lg">Pemateri:</p>
              <div className="flex items-center justify-center gap-10">
                {data?.data.psikologseminar?.map((val: any) => (
                  <div className="items-center justify-center">
                    <div className="justify-center items-center flex">
                      <img
                        src={`http://localhost:3222/psikolog/upload/${val.psikolog.photo}/image`}
                        className="rounded-[50%] w-[80px] h-[80px] flex justify-center shadow-md"
                      />
                    </div>
                    <div className=" flex justify-center w-[170px] pt-2">
                      <p className="font-bold text-sm justify-center text-center flex">
                        "{val.psikolog.fullName}"
                      </p>
                    </div>
                  </div>
                ))}
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
                <Bank setData={setTransaksi} dataInput={dataInput} />
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
