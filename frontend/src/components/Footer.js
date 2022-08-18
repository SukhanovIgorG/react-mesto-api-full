function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__copyright">© {currentYear} Mesto-React by Sukhanov Igor</p>
    </footer>
  );
}

export default Footer
