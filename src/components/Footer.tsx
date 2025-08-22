const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Portfolio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;