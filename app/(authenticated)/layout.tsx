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
        <Layout
          style={{height: "fit" }} 
        >
        {children}
      </Layout>
  );
};

export default AuthenticatedLayout;
