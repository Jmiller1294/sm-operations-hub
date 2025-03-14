import type { Metadata } from "next";
import './styles/Homepage.module.css';
import './styles/globals.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Provider } from "./context/appointmentsContext";


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
          <Provider>
            <main>{children}</main>
          </Provider>
        </div>
      </body>
    </html>
  );
}
