import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto flex item-center gap-1 justify-center text-white py-4">
      <span>created by</span>
      <a
        className="text-green hover:text-blue hover:underline"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        @mojotron
      </a>
    </footer>
  );
};

export default Footer;
