import React, { useEffect } from 'react';
import deomed2 from '../assets/deomed2.png';
import './Contact.css';

export default function Contact() {
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

  return (
    <div className="contact-page-centered">
      <h1 className="contact-title">Contatos</h1>
      <div className="contact-list-centered">
        <div className="contact-item-centered">
          <span className="contact-label">WhatsApp:</span>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-value contact-whatsapp">
            {whatsappNumber}
          </a>
          <span className="contact-desc"> (Agendamento, dúvidas, informações)</span>
        </div>
        <div className="contact-item-centered">
          <span className="contact-label">Email:</span>
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="contact-value contact-email">
            {email}
          </a>
          <span className="contact-desc"> (Agendamento, dúvidas, informações)</span>
        </div>
        <div className="contact-item-centered">
          <span className="contact-label">Urgências:</span>
          <a href={emergencyWhatsappLink} target="_blank" rel="noopener noreferrer" className="contact-value contact-emergency">
            {emergencyNumber}
          </a>
          <span className="contact-desc"> (Contato exclusivo para urgências)</span>
        </div>
      </div>
    </div>
  );
}