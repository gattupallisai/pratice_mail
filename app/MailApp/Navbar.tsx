'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`bg-white fixed w-full z-50 transition-shadow duration-300 ${
                hasShadow ? 'shadow-md' : ''
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/Home" className="text-2xl font-extrabold text-blue-600">
                    CamelQ Mail
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10 text-gray-700 font-semibold">
                    <ul className="flex space-x-10">
                        <li>
                            <Link
                                href="/hero"
                                className="hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/features"
                                className="hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/pricing"
                                className="hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>

                    {/* Desktop Login */}
                    <li className="px-6 py-4 list-none">
                        <Link
                            href="/login"
                            className="block text-center text-blue-600 font-semibold hover:underline transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                    </li>
                </div>

                {/* Hamburger Menu */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-md text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white shadow-lg border-t border-gray-200"
                    >
                        <li>
                            <Link
                                href="/hero"
                                className="block px-6 py-4 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/features"
                                className="block px-6 py-4 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/pricing"
                                className="block px-6 py-4 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="block px-6 py-4 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                        <li className="px-6 py-4">
                            <Link
                                href="/login"
                                className="block text-center text-blue-600 font-semibold hover:underline transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
}