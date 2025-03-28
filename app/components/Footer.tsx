export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-white to-light-blue/30 py-8 mt-auto border-t border-accent-blue/30">
            <div className="container mx-auto px-4">
                {/* Logo and branding section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-8 border-b border-black/10">
                    <div className="mb-6 md:mb-0">
                        <img
                            src="/img/amadeus-logo-dark-sky.png"
                            alt="Amadeus logo"
                            className="h-10 bg-white p-1 rounded"
                        />
                    </div>

                    <div className="text-center md:text-right">
                        <h3 className="text-black text-lg font-bold mb-1">Aztro Travel</h3>
                        <p className="text-black/80 text-sm">Descubre tu destino ideal</p>
                    </div>
                </div>

                {/* Middle section with links and social */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Quick links */}
                    <div>
                        <h4 className="text-black font-bold mb-4 text-lg border-l-4 border-accent-blue pl-3">Enlaces rápidos</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-black hover:text-accent-blue transition-colors duration-300">Inicio</a></li>
                            <li><a href="/profile" className="text-black hover:text-accent-blue transition-colors duration-300">Crear perfil</a></li>
                            <li><a href="https://amadeus.com/es" target="_blank" rel="noreferrer" className="text-black hover:text-accent-blue transition-colors duration-300">Acerca de Amadeus</a></li>
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h4 className="text-black font-bold mb-4 text-lg border-l-4 border-accent-blue pl-3">Contacto</h4>
                        <ul className="space-y-2 text-black">
                            <li className="flex items-center gap-2">
                                <i className="fas fa-envelope text-accent-blue"></i>
                                <a href="mailto:info@aztrotravel.com" className="hover:text-accent-blue transition-colors duration-300">info@aztrotravel.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-phone text-accent-blue"></i>
                                <a href="tel:+123456789" className="hover:text-accent-blue transition-colors duration-300">+12 345 6789</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-map-marker-alt text-accent-blue"></i>
                                <span>Ciudad de México, México</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h4 className="text-black font-bold mb-4 text-lg border-l-4 border-accent-blue pl-3">Síguenos</h4>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://www.linkedin.com/company/amadeus/"
                                className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center hover:bg-accent-blue transition-all duration-300"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                            >
                                <i className="fab fa-linkedin text-black hover:text-white transition-colors duration-300"></i>
                            </a>
                            <a
                                href="https://x.com/AmadeusITGroup"
                                className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center hover:bg-accent-blue transition-all duration-300"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                            >
                                <i className="fab fa-twitter text-black hover:text-white transition-colors duration-300"></i>
                            </a>
                            <a
                                href="https://www.facebook.com/AmadeusITGroup/"
                                className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center hover:bg-accent-blue transition-all duration-300"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook text-black hover:text-white transition-colors duration-300"></i>
                            </a>
                            <a
                                href="https://www.instagram.com/amadeusitgroup/"
                                className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center hover:bg-accent-blue transition-all duration-300"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram text-black hover:text-white transition-colors duration-300"></i>
                            </a>
                            <a
                                href="https://www.youtube.com/user/AmadeusITGroup"
                                className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center hover:bg-accent-blue transition-all duration-300"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                            >
                                <i className="fab fa-youtube text-black hover:text-white transition-colors duration-300"></i>
                            </a>
                        </div>

                        <div className="mt-6">
                            <p className="text-black/80 text-sm">Suscríbete a nuestro boletín</p>
                            <div className="flex mt-2">
                                <input
                                    type="email"
                                    placeholder="Tu email"
                                    className="bg-white/50 border border-accent-blue/20 rounded-l-md px-3 py-2 focus:outline-none focus:border-accent-blue text-black text-sm w-full"
                                />
                                <button className="bg-accent-blue hover:bg-black text-white px-3 py-2 rounded-r-md transition-colors duration-300">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright section */}
                <div className="pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-black/70 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} Aztro Travel | Powered by Amadeus. Todos los derechos reservados.
                    </p>

                    <div className="flex gap-4">
                        <a href="#" className="text-black/70 hover:text-accent-blue text-sm transition-colors duration-300">Términos y condiciones</a>
                        <a href="#" className="text-black/70 hover:text-accent-blue text-sm transition-colors duration-300">Política de privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}