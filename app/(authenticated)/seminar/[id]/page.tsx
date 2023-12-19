"use client"

import { useRouter } from "next/navigation";
import {Card} from "antd/lib/index";
import Layout2 from "#/app/components/layout";
import { Button } from "antd";


const detailSeminar = () =>{
   
return (
   <Layout2 title="Detail Seminar">
 <div className="flex justify-center">
    <Card className="border-green-800 w-[1500px] h-[850px] gap-10 flex justify-stretch">
      <div className="flex justify-between gap-10 mt-5">
      <div className="flex items-center ">
         <div className="w-[500px] h-[750px] bg-slate-300 flex justify-center items-center">
            Poster
         </div>
      </div>
      <div>
      <div className="font-extrabold text-4xl">
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
      </div>
      <div className="pt-10 text-2xl font-bold">
         DD-MM-YYYY
      </div>
      <div className="pt-10 text-[#016255] font-bold text-3xl">
         Rp.50000
      </div>
      <div className="flex items-center gap-16 justify-center pt-[100px]">
         <div className="items-center justify-center gap-5">
            <img src="https://img.freepik.com/free-photo/happy-successful-muslim-businesswoman-posing-outside_74855-2007.jpg" alt="" className="rounded-[50%] w-[170px] h-[170px]" />
            <p className="font-bold text-xl">Nazhwa Nur , M. Psi</p>
         </div>
         <div>
            <img src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1701475200&semt=ais" alt="" className="rounded-[50%] w-[170px] h-[170px]" />
            <p className="font-bold text-xl">Danar Kahfi, M. Psi</p>
         </div>
         <div>
            <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" alt="" className="rounded-[50%] w-[170px] h-[170px]" />
            <p className="font-bold text-xl">Cecillia Siregar, M. Psi</p>
         </div>
      </div>
         <div className="flex justify-center items-center pt-10">
            <Button type="primary" href={`/seminar/pembayaran/1`}>Pesan Seminar</Button>
         </div>
      </div>
     </div> 
    </Card>
 </div>
 </Layout2>
)
}
export default detailSeminar;