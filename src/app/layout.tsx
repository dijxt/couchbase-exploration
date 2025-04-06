import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'FIFA Players - XDCR Demo',
    description: 'Application de démonstration pour la réplication XDCR de Couchbase',
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
        <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <Navbar />
        <main className="py-6">
            {children}
        </main>
        <footer className="bg-white py-6 border-t">
            <div className="container mx-auto px-4 text-center text-gray-600">
                <p>Application Démo FIFA Players XDCR - Développée avec Next.js et Couchbase</p>
            </div>
        </footer>
        </body>
        </html>
    );
}