import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastProvider } from '../components/Toast';
import CalScript from '../components/CalScript';
import VibeCodingAudio from '../components/VibeCodingAudio';

export const metadata = {
  title: 'Ali Sufian | Content Creator, Entrepreneur & Builder',
  description: 'Portfolio of Ali Sufian, a content creator, entrepreneur, and builder focused on AI tools, Python automation, and MVP building.',
  icons: {
    icon: '/assets/profile.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <div className="grain-overlay" />
          <div className="ambient-night-cone" />
          <Navbar />
          <div className="container">
            {children}
            <Footer />
          </div>
          <VibeCodingAudio />
        </ToastProvider>
        <CalScript />
      </body>
    </html>
  );
}
