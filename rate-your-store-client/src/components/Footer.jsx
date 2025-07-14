// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 border-t py-4 text-center text-white fixed bottom-0">
      © {new Date().getFullYear()} Rate Your Store. All rights reserved.
    </footer>
  );
};

export default Footer;
