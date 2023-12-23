"use client"

import { usePathname } from "next/navigation";
import {Card} from "antd/lib/index";
import Layout2 from "#/app/components/layout";
import { Button } from "antd";
import { SeminarRepository } from "#/repository/seminar";
import { parseJwt } from "#/app/components/helper/convert";
import { IntlProvider } from "react-intl";
import PriceFormatter from "#/app/components/priceFormatter";
import { useEffect } from "react";
// import { useRouter } from "next/router";


const detailSeminar = () =>{
// const token = localStorage.getItem("access_token");
//   let id;
//   if (token) {
//     id = parseJwt(token).id;
//     console.log("ini id:",id);
//   }
// const router = useRouter();
// const {id} = router.query

//dia ngambil dari pathname rey, router query adanya di versi yang lama ternyata

const pathname = usePathname().split('/')
const {data} = SeminarRepository.hooks.detailSeminar(pathname[pathname.length -1])
   
return (
   <Layout2 title="Detail Seminar">
   <div className="text-[#016255] text-2xl font-bold flex justify-center">Yuk tunggu apa lagi segara daftar seminar sekarang  !!</div>
    <div className="flex justify-center pt-5">
    <Card className="border-green-800 w-[1500px] h-[850px] gap-10 flex justify-stretch">
      <div className="flex justify-between gap-10 mt-5">
      <div className="flex items-center ">
         <div>
         <img src={`http://localhost:3222/seminar/upload/${data?.data.poster}/image`} style={{height: '700px', width: 'auto'}} />
         </div>
      </div>
      <div>
      <div className="font-extrabold text-4xl">
         "{data?.data.title}"
      </div>
      <div className="pt-10 text-2xl font-bold">
         {data?.data.datetime}
      </div>
      <div className="pt-10 text-[#016255] font-bold text-3xl">
         <IntlProvider>
      <PriceFormatter value={data?.data.price}/>
         </IntlProvider>
      </div>
      <div className="flex items-center gap-16 justify-center pt-[100px] pl-20">
         {data?.data.psikologseminar.map((val: any) => {
         <div className="items-center justify-center gap-5">
            <img src={`http://localhost:3222/psikolog/upload/${val.psikolog.photo}/image`} className="rounded-[50%] w-[170px] h-[170px]" />
            <p className="font-bold text-xl">{val.psikolog.fullName}</p>
         </div>
         })}
      </div>
         <div className="flex justify-center items-center pt-10">
            <Button type="primary" href={`/seminar/pembayaran/1`}>Daftar Seminar</Button>
         </div>
      </div>
     </div> 
    </Card>
 </div>
 </Layout2>
)
}
export default detailSeminar;