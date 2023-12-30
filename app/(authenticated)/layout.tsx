"use client";
import { parseJwt } from "#/utils/convert";
import { theme } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const isRole = {
  admin: 'admin',
  psikolog: 'psikolog',
  customer: 'customer',
};


const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
	children,
}) => {
  const router = useRouter()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const token = localStorage.getItem('access_token');
  console.log(token, "yuk bisa");
  let role: string = '';
  let email: string = '';
  console.log(token, "ini tokennya");
  

  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    console.log(role, "role cocok");
  }
  if (!token) {
    router.push('/');
  }


  return (
    <>
    {children}
    </>
  );
};
export default AuthenticatedLayout;
