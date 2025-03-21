import type { Metadata } from "next";
import "./styles/Homepage.module.css";
import "./styles/globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Provider as AppointmentsProvider } from "./context/appointmentsContext";
import { Provider as AppProvider } from "./context/appContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body-container">
        <Sidebar />
        <div className="main-container">
          <Header />
          <AppProvider>
            <AppointmentsProvider>
              <main>{children}</main>
            </AppointmentsProvider>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
