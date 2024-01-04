"use client";

import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import { Icon } from "@iconify/react";
import LayoutAdmin from "#/app/components/layoutadmin";

const Dashboard: React.FC = () => {
 return(
  <LayoutAdmin menu="/admin/dashboard">
  <div className="w-[943] h-11 bg-yzc rounded-[10px] items-center">
            <p className="text-white text-base p-2 font-bold ">
              3 Rekomendasi Psikolog Terbaik Bulan ini!
            </p>
          </div>
          <br></br>
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  className="justify-between flex items-center"
                  style={{
                    width: 500,
                    height: 180,
                  }}
                  bordered={false}
                >
                  <div className="flex justify-between gap-10">
                    <div className="flex items-center justify-start">
                      <img
                        src="/asset/img/ps1.png"
                        className="w-[98px] h-[98px] flex items-center justify-center"
                        alt="psikolog1"
                      />
                    </div>
                    <div className="text-center">
                      <div className="font-bold mb-5 text-xl">
                        <div>Nazhwa Nur , M. Psi</div>
                      </div>
                      <div className="flex gap-2 text-lg">
                        <Icon
                          icon="fluent:people-team-16-filled"
                          className="mt-1"
                          color="#736f6f"
                        />
                        <p>3300 Sesi</p>
                      </div>
                      <div className="flex gap-2 text-lg">
                        <Icon
                          icon="mdi:emoticon-excited-outline"
                          className="mt-1"
                          color="#016255"
                        />
                        <p>99% Terbantu</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  className="justify-between flex items-center"
                  style={{
                    width: 500,
                    height: 180,
                  }}
                  bordered={false}
                >
                  <div className="flex justify-between gap-10">
                    <div className="flex items-center justify-start">
                      <img
                        src="/asset/img/ps2.png"
                        className="w-[100px] h-[100px]"
                        alt="psikolog2"
                      />
                    </div>
                    <div className="text-center">
                      <div className="font-bold mb-5 text-xl">
                        <div>Cecilia Siregar , M. Psi</div>
                      </div>
                      <div className="flex gap-2 text-lg">
                        <Icon
                          icon="fluent:people-team-16-filled"
                          className="mt-1"
                          color="#736f6f"
                        />
                        <p>3200 Sesi</p>
                      </div>
                      <div className="flex gap-2 text-lg">
                        <Icon
                          icon="mdi:emoticon-excited-outline"
                          className="mt-1"
                          color="#016255"
                        />
                        <p>99% Terbantu</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  className="justify-between flex items-center"
                  style={{
                    width: 500,
                    height: 180,
                  }}
                  bordered={false}
                >
                  <div className="flex justify-between gap-10">
                    <div className="flex items-center justify-start">
                      <img
                        src="/asset/img/ps3.png"
                        className="w-[100px] h-[100px]"
                        alt="psikolog3"
                      />
                    </div>
                    <div className="text-center">
                      <div className="font-bold mb-5 text-xl">
                        <div>Danar Kahfi , M. Psi</div>
                      </div>
                      <div className="flex gap-2 text-lg">
                        <Icon
                          icon="fluent:people-team-16-filled"
                          className="mt-1"
                          color="#736f6f"
                        />
                        <p>3100 Sesi</p>
                      </div>
                      <div className="flex gap-2 text-lg">
                        <Icon
                          icon="mdi:emoticon-excited-outline"
                          className="mt-1"
                          color="#016255"
                        />
                        <p>99% Terbantu</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
          <br></br>
          <Row>
            <Col span={12}>
              <div className="w-3/5 h-9 bg-yzc rounded-[10px] items-center">
                <p className="text-white text-base p-2 font-bold">Ulasan</p>
                <br></br>
                <Card
                  style={{
                    width: "100%",
                    height: 200,
                  }}
                >
                  <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded shadow p-4">
                        <h2 className="text-xl font-bold mb-2">HH</h2>
                        <p className="text-gray-700 mb-4">31 Oct 2023</p>
                        <p className="text-gray-700">
                          Makasii banyak mbak jadi lebih lega, lebih ngerti sama
                          masalah yang kebawa ke masa sekarang. Bagus, murah dan
                          membantu.
                        </p>
                      </div>
                      <div className="bg-white rounded shadow p-4">
                        <h2 className="text-xl font-bold mb-2">FN</h2>
                        <p className="text-gray-700 mb-4">30 Oct 2023</p>
                        <p className="text-gray-700">
                          Cukup membantu, terima kasih sudah diarahkan. Layanan
                          konseling profesional dengan harga terjangkau.
                        </p>
                      </div>
                      <div className="bg-white rounded shadow p-4">
                        
                        <h2 className="text-xl font-bold mb-2">UD</h2>
                        <p className="text-gray-700 mb-4">27 Oct 2023</p>
                        <p className="text-gray-700">
                          Terima kasih banyak saya jadi tersadar, Sangat
                          membantu.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
            <Col span={12}>
              <div className="w-3/5 h-9 bg-yzc rounded-[10px] items-center">
                <p className="text-white text-base p-2 font-bold">Seminar</p>
                <br></br>
                <Card
                  style={{
                    width: "100%",
                    height: 200,
                  }}
                >
                  <div className="flex items-center justify-start">
                    <img
                      src="/asset/img/seminar.png"
                      className="w-[124px] h-[187px]"
                      alt="seminar"
                    />
                  </div>
                  <div className="mt-8">
                      <h3 className="text-xl font-bold mb-2">
                        Judul: Rilekskan pikiran dan lakukan meditasi
                      </h3>
                      <p className="text-gray-700 mb-4">lakukan meditasi</p>
                      <p className="text-gray-700 mb-4">Tanggal: 22-12-23</p>
                      <p className="text-gray-700 mb-4"> Pemateri : </p>
                      <p className="text-gray-700 mb-4"> • Dinta Azkia, M.psi </p>
                      <p className="text-gray-700 mb-4"> • M. Psi Putro, M. Psi  </p>
                      <p className="text-gray-700 mb-4"> • Aisyah, M.Psi </p>
                      <p className="text-gray-700">
                        Menunggu konfirmasi Psikolog
                      </p>
                    </div>
                </Card>
              </div>
            </Col>
          </Row>
  </LayoutAdmin>
 )
}
export default Dashboard