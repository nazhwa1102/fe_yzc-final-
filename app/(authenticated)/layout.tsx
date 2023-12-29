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
  console.log(parseJwt(token));
  

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
    {/* {role !== isRole.customer && role !== isRole.psikolog && router.push('/admin/dashboard')}
    {role !== isRole.customer && role !== isRole.admin && router.push('/psikolog/dashboard')}
    {role !== isRole.admin && role !== isRole.psikolog && router.push('/home')} */}
    {children}
    </>
  );
};
export default AuthenticatedLayout;
