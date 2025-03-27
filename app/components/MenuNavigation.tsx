import { useState, useEffect } from "react";
import { NavLink } from "@remix-run/react";

export default function MenuNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for the navigation bar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when window resizes to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between py-3">
                    {/* Logo container */}
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="block">
                            <img
                                className="h-8 md:h-10 w-auto object-contain bg-white"
                                src="/img/amadeus-logo-dark-sky.png"
                                alt="Amadeus logo"
                            />
                        </NavLink>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-base font-medium px-3 py-2 rounded-md transition-all duration-300 ${
                                    isActive
                                        ? 'text-white bg-accent-blue'
                                        : 'text-accent-blue hover:bg-light-blue hover:text-deep-blue'
                                }`
                            }
                        >
                            Inicio
                        </NavLink>
                        <a
                            href="https://amadeus.com/es/contacto"
                            target="_blank"
                            rel="noreferrer"
                            className="text-base font-medium text-accent-blue px-3 py-2 rounded-md hover:bg-light-blue hover:text-deep-blue transition-all duration-300"
                        >
                            Contacto
                        </a>
                        <a
                            href="https://amadeus.com/en"
                            target="_blank"
                            rel="noreferrer"
                            className="text-base font-medium text-accent-blue px-3 py-2 rounded-md hover:bg-light-blue hover:text-deep-blue transition-all duration-300"
                        >
                            Amadeus
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle navigation menu"
                        >
                            {!isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile menu, show/hide based on menu state */}
                <div 
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen 
                            ? 'max-h-60 opacity-100 border-t border-gray-100' 
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="py-2 space-y-1 pb-3">
                        <NavLink
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `block text-base font-medium px-4 py-3 rounded-md transition-all duration-300 ${
                                    isActive
                                        ? 'text-white bg-accent-blue'
                                        : 'text-accent-blue hover:bg-light-blue hover:text-deep-blue'
                                }`
                            }
                        >
                            Inicio
                        </NavLink>
                        <a
                            href="https://amadeus.com/es/contacto"
                            target="_blank"
                            rel="noreferrer"
                            className="block text-base font-medium text-accent-blue px-4 py-3 rounded-md hover:bg-light-blue hover:text-deep-blue transition-all duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contacto
                        </a>
                        <a
                            href="https://amadeus.com/en"
                            target="_blank"
                            rel="noreferrer"
                            className="block text-base font-medium text-accent-blue px-4 py-3 rounded-md hover:bg-light-blue hover:text-deep-blue transition-all duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Amadeus
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}