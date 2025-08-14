import { Github, Linkedin, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, url: '#' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, url: '#' },
    { name: 'Twitter', icon: <Twitter size={18} />, url: '#' },
    { name: 'Facebook', icon: <Facebook size={18} />, url: '#' },
    { name: 'Instagram', icon: <Instagram size={18} />, url: '#' },
    { name: 'Email', icon: <Mail size={18} />, url: 'mailto:tu@email.com' },
  ];

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">Portfolio<span className="text-secondary">.</span></h2>
            <p className="mt-2 text-gray-400 text-sm">Desarrollador de software profesional</p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                className="text-gray-400 hover:text-secondary transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} - Tu Nombre. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;