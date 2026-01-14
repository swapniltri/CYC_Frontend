import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return <footer className="bg-[#1a5e63] text-white py-12">
        <div className="my-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img
                            src="/images/cyc-logo.png"
                            alt="CYC Logo"
                            width={80}
                            height={32}
                            className="h-8 w-auto bg-white p-1 rounded"
                        />
                    </div>
                    <p className="text-sm mb-4">Premium, macro-balanced meals for fitness enthusiasts.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-white/70 hover:text-white transition-colors">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-white transition-colors">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-white transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-4">Menu</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                All Meals
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Protein Focused
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Low Carb
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Plant Based
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Press
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Shipping
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/70 hover:text-white transition-colors">
                                Terms & Conditions
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/20 mt-12 pt-6 text-sm text-center">
                <p>&copy; {new Date().getFullYear()} CYC. All rights reserved.</p>
            </div>
        </div>
    </footer>
}