// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { 
      title: "Quick Links", 
      links: [
        { name: "Home", path: "/" },
        { name: "Collection", path: "./collection" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
      ]
    },
    { 
      title: "Customer Service", 
      links: [
        { name: "FAQ", path: "/faq" },
        { name: "Shipping Policy", path: "/shipping" },
        { name: "Returns & Exchanges", path: "/returns" },
        { name: "Privacy Policy", path: "/privacy" },
      ]
    },
    { 
      title: "My Account", 
      links: [
        { name: "My Cart", path: "/cart" },
        { name: "Wishlist", path: "/wishlist" },
        { name: "Track Order", path: "/track" },
        { name: "Login/Register", path: "/login" },
      ]
    },
  ];

  return (
    <footer className="bg-[#003459] text-white pt-16 border-t border-gray-300  footer ">
      <div className="container mx-auto px-4">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">
          
          {/* 1. Brand Info & Social Media (Span 2 columns on desktop) */}
          <div className="col-span-2 md:col-span-2 space-y-4 pr-6">
            <Link to="/" className="text-5xl text- font-bold ">KHYOOT</Link>
            <p className="text-gray-400 max-w-sm">
              Your ultimate destination for the latest trends in fashion and accessories. Quality and style guaranteed.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Tiktok">
               <img  className="w-6 h-6" src="src/assets/frontend_assets/tik-tok.png" alt="" />
              </a>
              
              <a href="https://www.instagram.com/khyoot_eg/" target='_blank' className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
               <img  className="w-6 h-6" src="src/assets/frontend_assets/instagram.png" alt="" />
              </a>
            </div>
          </div>
          
          {/* 2. Link Groups */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-xl font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 3. Contact Info (Last column on desktop) */}
          {/* <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Contact Info</h3>
            <div className="text-gray-400 space-y-2 text-sm">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Cairo, New Cairo City, Egypt
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                info@shopstyle.com
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.79 21 3 14.21 3 6V5z"/></svg>
                +20 100 123 4567
              </p>
            </div>
          </div> */}
        </div>
        
        {/* Footer Bottom Bar (Copyright) */}
        <div className="py-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} khyoot. All rights reserved. | Designed by <a className='elattar' target='_blank' href="https://mohamedelattar-portfolio.vercel.app/">Mohamed Elattar</a> 
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;