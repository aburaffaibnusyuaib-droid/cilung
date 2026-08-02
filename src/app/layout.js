import { Plus_Jakarta_Sans, Montserrat } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: "Cilung Bara - Otentik Gerobak Keliling",
  description: "Sensasi Cilung Nikmat & Fresh Gerobak Keliling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${montserrat.variable} h-full`}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}