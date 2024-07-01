import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import './globals.css'; // CSS dosya yolunuza göre düzenleyin
import AuthProvider from './Providers';
import Navbar from './components/navbar/Navbar';
import Navbar2 from './components/navbar2/Navbar2';
import Footer from './components/footer/page';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
         <div className="pt-4">
        <div className="fixed top-0 z-10">
          <Navbar />
        </div>
        <div className="mt-14 md:mt-16">
          <Navbar2 />
        </div>
      </div>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>

      <Footer/>

    </AuthProvider>
  );
}

export default MyApp;
