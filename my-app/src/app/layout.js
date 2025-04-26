import { Baloo_Bhai_2 } from "next/font/google";
import "./globals.css";

const balooBhai2 = Baloo_Bhai_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  display: "swap",
});

export const metadata = {
  title: "Dictionary Web Application",
  description: "This app made for help to find the words and gives you meaning, example and synonyms to the word",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${balooBhai2.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
