import React from "react";
import Header from "./components/Header";
import { LayoutProps } from "@/.next/types/app/layout";
import Modal from "../components/Modal";

const AppointmentsPageLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Modal />
    </>
  );
};

export default AppointmentsPageLayout;
