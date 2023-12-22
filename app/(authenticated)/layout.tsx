"use client";

import React from "react";
import {Layout} from "antd";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
	children,
}) => {

  return (
    <>
    {children}
    </>
  );
};

export default AuthenticatedLayout;
