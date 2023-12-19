"use client";

import { useRouter } from "next/navigation";
import { Card } from "antd/lib/index";
import Layout2 from "#/app/components/layout";
import { Button, Menu, MenuProps, Modal, Radio, Statistic } from "antd";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import Bank from "#/app/components/bank";
import { useState } from "react";
import Uploads from "#/app/components/upload";
const {Countdown} = Statistic
const deadline = Date.now() + 24000 * 60 * 60 + 1000;



const detailSeminar = () => {
  return (
    <Layout2 title="Detail Seminar">
      <div className="flex justify-center">
        <Card className="border-green-800 w-[1250px] h-[750px] gap-10 flex justify-stretch">
            <a href="/seminar" className="font-bold text-lg text-black"><LeftOutlined/>Kembali</a>
          <div className="flex justify-between gap-10 mt-5 ">
            <div className="flex items-center ">
              <div className="w-[300px] h-[500px] bg-slate-300 flex justify-center items-center">
                Poster
              </div>
            </div>
            <div className="w-[410px] h-fit bg-slate-100 p-2">
              <div className="font-bold text-2xl">Detail Transaksi: </div>
              <br />
              <div className="font-bold text-base justify-between">
                <div>Judul Seminar :</div>{" "}
                <div>
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
                </div>
              </div>
              <div className="pt-5 flex text-base gap-5 font-bold">
                <div>Tanggal Seminnar :</div> <div>"DD-MM-YYYY"</div>
              </div>
              <div className="pt-5 flex font-bold gap-5 text-base">
                <div>Harga :</div>{" "}
                <div className="text-[#016255]">"Rp.50000"</div>
              </div>
              <p className="pt-20 font-bold text-lg">Pemateri:</p>
              <div className="flex items-center gap-7 justify-center">
                <div className="items-center justify-center">
                  <img
                    src="https://img.freepik.com/free-photo/happy-successful-muslim-businesswoman-posing-outside_74855-2007.jpg"
                    alt=""
                    className="rounded-[50%] w-[80px] h-[80px]"
                  />
                  <p className="font-bold text-xs text-center w-16 justify-center flex">
                    Nazhwa Nur , M. Psi
                  </p>
                </div>
                <div className="items-center justify-center">
                  <img
                    src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1701475200&semt=ais"
                    alt=""
                    className="rounded-[50%] w-[80px] h-[80px]"
                  />
                  <p className="font-bold text-xs text-center w-16 justify-center flex">
                    Danar Kahfi, M. Psi
                  </p>
                </div>
                <div className="items-center justify-center">
                  <img
                    src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg"
                    alt=""
                    className="rounded-[50%] w-[80px] h-[80px]"
                  />
                  <p className="font-bold text-xs text-center w-16 justify-center flex">
                    Cecillia Siregar, M. Psi
                  </p>
                </div>
              </div>
            </div>
            <div>
            <div>
            <div className="font-bold text-lg">Lakukan Pembayaran Sebelum Berakhir Pada: </div>
            <div className="flex justify-center"><Countdown value={deadline} valueStyle={{color: '#016255',border: '1px solid #016255',borderRadius: '5px'}}/></div>
            <br />
            </div>
            <div>
                <div className="font-bold text-xl">Pilih Metode Pembayaran :</div>
            </div>
            <Bank/>
            <div className="pt-4 justify-center flex">
                <Uploads/>
            </div>
            <div className="pt-10 flex justify-center">
              <Button type="primary" href="/seminar">Selesaikan Pembayaran</Button>
            </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout2>
  );
};
export default detailSeminar;
