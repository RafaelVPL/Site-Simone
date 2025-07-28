import React, { useEffect } from 'react';
import deomed2 from '../assets/deomed2.png';
import './Contact.css';

export default function Contatos() {
  const whatsappNumber = '24 98154-8739';
  const whatsappLink = 'https://wa.me/5524981548739';
  const email = 'simonedeomed@gmail.com';
  const emergencyNumber = '24 98838-1234';
  const emergencyWhatsappLink = 'https://wa.me/5524988381234';

  // Set page title and favicon for contacts page
  useEffect(() => {
    document.title = "Contatos";
    let favicon = document.querySelector("link[rel~='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      document.head.appendChild(favicon);
    }
    favicon.href = deomed2;
  }, []);

  // Detect mobile device for bigger text
  function getIsMobile() {
    if (typeof navigator !== "undefined") {
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return window.innerWidth <= 900;
  }
  const [isMobile, setIsMobile] = React.useState(getIsMobile());
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(getIsMobile());
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure background covers whole page on mobile
  React.useEffect(() => {
    // Add a class to body to force background to cover whole page for contact
    document.body.classList.add('contact-full-bg');
    return () => {
      document.body.classList.remove('contact-full-bg');
    };
  }, []);

  return (
    <div
      className="contact-page-centered contact-full-bg-container"
      style={isMobile ? { fontSize: '1.25rem', padding: '2.5rem 0.7rem 2rem 0.7rem', minHeight: '100vh' } : { minHeight: '70vh' }}
    >
      <h1 className="contact-title" style={isMobile ? { fontSize: '2.4rem', marginBottom: '2.2rem' } : {}}>Contatos</h1>
      <div className="contact-list-centered">
        <div className="contact-item-centered" style={isMobile ? { fontSize: '1.25rem', gap: '1.1rem' } : {}}>
          <span className="contact-label" style={isMobile ? { fontSize: '1.18rem' } : {}}>WhatsApp:</span>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-value contact-whatsapp" style={isMobile ? { fontSize: '1.25rem' } : {}}>
            {whatsappNumber}
          </a>
          <span className="contact-desc" style={isMobile ? { fontSize: '1.08rem' } : {}}> (Agendamento, dúvidas, informações)</span>
        </div>
        <div className="contact-item-centered" style={isMobile ? { fontSize: '1.25rem', gap: '1.1rem' } : {}}>
          <span className="contact-label" style={isMobile ? { fontSize: '1.18rem' } : {}}>Email:</span>
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="contact-value contact-email" style={isMobile ? { fontSize: '1.25rem' } : {}}>
            {email}
          </a>
          <span className="contact-desc" style={isMobile ? { fontSize: '1.08rem' } : {}}> (Agendamento, dúvidas, informações)</span>
        </div>
        <div className="contact-item-centered" style={isMobile ? { fontSize: '1.25rem', gap: '1.1rem' } : {}}>
          <span className="contact-label" style={isMobile ? { fontSize: '1.18rem' } : {}}>Urgências:</span>
          <a href={emergencyWhatsappLink} target="_blank" rel="noopener noreferrer" className="contact-value contact-emergency" style={isMobile ? { fontSize: '1.25rem' } : {}}>
            {emergencyNumber}
          </a>
          <span className="contact-desc" style={isMobile ? { fontSize: '1.08rem' } : {}}> (Contato exclusivo para urgências)</span>
        </div>
      </div>
    </div>
  );
}