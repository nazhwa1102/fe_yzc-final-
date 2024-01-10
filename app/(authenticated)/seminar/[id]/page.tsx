"use client";

import { usePathname, useRouter } from "next/navigation";
import { Card } from "antd/lib/index";
import Layout2 from "#/app/components/layout";
import { Button } from "antd";
import { SeminarRepository } from "#/repository/seminar";
import { parseJwt } from "#/app/components/helper/convert";
import { IntlProvider } from "react-intl";
import PriceFormatter from "#/app/components/priceFormatter";
import { useEffect } from "react";
// import { useRouter } from "next/router";

const detailSeminar = () => {

  const pathname = usePathname().split("/");
  const { data } = SeminarRepository.hooks.detailSeminar(
    pathname[pathname.length - 1]
  );    
  
    const {data: dataSeminar} = SeminarRepository.hooks.statusApprove()
    console.log(dataSeminar);
    const token = localStorage.getItem('access_token');
    console.log(token, "yuk bisa");
    let role: string = '';
    let email: string = '';
    let fullNameCus: string = ''
  
    if (token) {
      role = parseJwt(token).role;
      email = parseJwt(token).email;
      fullNameCus = parseJwt(token).fullNameCus
      console.log(role, "role cocok");
      console.log(fullNameCus, 'nama');
      
    }
  
    const router = useRouter();
  
  return (
    <Layout2 title="Detail Seminar">
      <div className="text-[#016255] text-2xl font-bold flex justify-center">
        Yuk tunggu apa lagi segara daftar seminar sekarang !!
      </div>
      <div className="flex justify-center pt-5">
        <Card className="border-green-800 w-[1500px] h-[850px] gap-10 flex justify-stretch shadow-lg">
          <div className="flex justify-between gap-10 mt-5">
            <div className="flex items-center ">
              <div>
                <img
                  src={`http://localhost:3222/seminar/upload/${data?.data.poster}/image`}
                  style={{ height: "700px", width: "auto" }}
                />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-4xl">
                "{data?.data.title}"
              </div>
              <div className="pt-10 text-2xl font-bold flex">
               Tanggal Seminar: {data?.data.datetime}
              </div>
              <div className="pt-10 text-2xl font-bold flex">
               Kuota Tersisa: {data?.data.kuota}
              </div>
              <div className="pt-10 text-[#016255] font-bold text-2xl flex">
                Harga Seminar:
                <div className="pl-2">
                <IntlProvider>
                  <PriceFormatter value={data?.data.price}/>
                </IntlProvider>
                </div>
              </div>
              <div className="flex items-center gap-16 justify-around pt-[100px] pl-10">
                {data?.data.psikologseminar?.map((val: any) => (
                  <div className="items-center justify-center gap-5">
                    <div className="flex justify-center">
                    <img
                      src={`http://localhost:3222/psikolog/upload/${val.psikolog.photo}/image`}
                      className="rounded-[50%] w-[170px] h-[170px] flex justify-center shadow-md"
                    />
                    </div>
                    <div className=" flex justify-center pt-2">
                    <p className="font-bold text-xl justify-center flex">{val.psikolog.fullName}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
              <div className="flex justify-end items-center pl-[500px]">
              <div className="flex pt-[131px] pl-10">
                <Button type="primary" style={{width: '300px', height: 'auto', fontSize: '30px'}} className="shadow-lg hover:shadow-md" onClick={() => {
                if (token) {
                  router.push(`/seminar/pembayaran/${data?.data.id}`)
                }else{
                  router.push('/')
                }
               }}>
                  Daftar Seminar
                </Button>
              </div>
              </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout2>
  );
};

export default detailSeminar;
