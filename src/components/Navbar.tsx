'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="font-bold text-xl">
                                FIFA Players XDCR
                            </Link>
                        </div>
                        <div className="ml-6 flex items-center space-x-4">
                            <Link
                                href="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`}
                            >
                                Accueil
                            </Link>
                            <Link
                                href="/players"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    pathname === '/players' || pathname.startsWith('/players/') ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`}
                            >
                                Joueurs
                            </Link>
                            <Link
                                href="/status"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    pathname === '/status' ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`}
                            >
                                Statut XDCR
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}