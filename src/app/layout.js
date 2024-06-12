import { Inter } from "next/font/google";
import "./globals.css";
import UserContextComponent from "./(context)/UserContextComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Equinox",
  description: "Trustworthy password manager",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <UserContextComponent>
        <body className={inter.className}>{children}</body>
      </UserContextComponent>
    </html>
  );
}
