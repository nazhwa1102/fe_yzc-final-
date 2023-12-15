import { DatePicker, Select } from "antd/lib/index";
import { Option } from "antd/es/mentions";
import { Form, Input } from "antd/lib/index";
import { FormInstance } from "antd";

function CustomerStep1() {
  return (
    <div  className="flex flex-col space-y-15 w-full">
      <div className="grid gap-y-4 grid-cols-1">
			<div>
				<p className="text-teks text-2xl font-bold text-white">Nama Lengkap</p>
			</div> 
			<div className="w-full">
			<Form.Item 
				name="full_name"
				rules={[{ required: true, message: 'Harap masukan nama lengkap anda!' }]}
			>
				<Input placeholder="Masukan nama lengkap" className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl" />
			</Form.Item>
			</div>
		</div>
        <div className="flex gap-x-5 grid-cols-1">
			<div className="w-1/2 grid gap-y-4 grid-cols-1">
            <div>
					<p className="text-teks text-2xl font-bold text-white">Jenis Kelamin</p>
				</div>
				<div className="w-full">
				<Form.Item
					name="gender"
					rules={[{ required: true, message: 'Harap masukan jenis kelamin anda!' }]}
				>
					<Select
					 placeholder="Pilih jenis kelamin" className="w-full regis">
						<Option value="pria">Pria</Option>
						<Option value="wanita">Wanita</Option>
					</Select>
				</Form.Item>
				</div>
			</div>
			<div className="w-1/2 grid gap-y-4 grid-cols-1">
            <div>
					<p className="text-teks text-2xl font-bold text-white">Agama</p>
				</div>
				<div className="w-full">
				<Form.Item
					name="religion"
					rules={[{ required: true, message: 'Harap masukan nama agama anda!' }]}
				>
					<Select
					 placeholder="Pilih Agama" className="w-full regis">
						<Option value="islam">Islam</Option>
						<Option value="katolik">Katolik</Option>
                        <Option value="prostestan">Prostestan</Option>
						<Option value="budha">Budha</Option>
                        <Option value="hindu">Hindu</Option>
                        <Option value="konghucu">Konghucu</Option>
					</Select>
				</Form.Item>
				</div>
			</div>
		</div>
        <div className="grid gap-y-4 grid-cols-1">
			<div>
				<p className="text-teks text-2xl font-bold text-white">Tanggal Lahir</p>
			</div> 
			<div className="w-full">
			<Form.Item
					name="birth_date"
					rules={[{ required: true, message: 'Harap masukan tanggal lahir anda!' }]}
				>
					<DatePicker placeholder="Pilih tanggal" className="w-full regis" />
				</Form.Item>
			</div>
		</div>
        <div className="grid gap-y-4 grid-cols-1">
			<div>
				<p className="text-teks text-2xl font-bold text-white">Pendidikan Terakhir</p>
			</div> 
			<div className="w-full">
			<Form.Item 
				name="last_education"
				rules={[{ required: true, message: 'Harap masukan pendidikan terakhir anda!' }]}
			>
				<Input placeholder="Masukan Pendidikan Terakhir" className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl" />
			</Form.Item>
			</div>
		</div>
    </div>
  );
}
export default CustomerStep1;
