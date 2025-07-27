import React, { useEffect, useRef, useState } from 'react'
import simoneImg from '../assets/simone.jpg'
import './Home.css'

export default function Home() {
  const whatsappNumber = '5524981548739';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  // Pop-in/out effect for left, right, contact, and maps sections
  const leftRef = useRef();
  const rightRef = useRef();
  const contactRef = useRef();
  const mapsRef = useRef();
  const [visible, setVisible] = useState([false, false, false, false]);

  useEffect(() => {
    function onScroll() {
      [leftRef, rightRef, contactRef, mapsRef].forEach((ref, i) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight - 80 && rect.bottom > 80;
        setVisible(prev => {
          const updated = [...prev];
          updated[i] = inView;
          return updated;
        });
      });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Clinic address and Google Maps embed link
  const clinicAddress = 'Rua Dr. Alencar Lima, 35 - Sala 915 / Centro - Petrópolis, RJ.';
  const googleMapsEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.430626575493!2d-43.178964!3d-22.510242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9787e1e9e3e3e3%3A0x123456789abcdef!2sRua%20Dr.%20Alencar%20Lima%2C%2035%20-%20Centro%2C%20Petr%C3%B3polis%20-%20RJ%2C%2025600-130!5e0!3m2!1spt-BR!2sbr!4v1712345678901';

  // Instagram post embed links (actual posts)
  const instagramEmbeds = [
    "https://www.instagram.com/p/DLZ1_0cxGdy/embed",
    "https://www.instagram.com/p/DDvbnw2uJqq/embed",
    "https://www.instagram.com/p/DLM_Va6Nf3B/embed",
    "https://www.instagram.com/p/DKhvR3Py0II/embed"
  ];

  // Facebook post embed links (add new embeds to the array)
  const facebookEmbeds = [
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0371ykxm7wvaAynCF8KyY91BUiwnbJLph2SmJWzdCXzNwdhJDbtWdMWJZKpFS6xPdbl%26id%3D100067061147888&show_text=true&width=400",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0Kxuk4kUcFqoABZtH4231jceSooXiasXhjV81ZtKWuRK5UfWvi5KH5x3htriGd2sZl%26id%3D100067061147888&show_text=true&width=400",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02sCAAQmrdqM9p7KDwyHoeG26FWXtwTDRNbxypbUxzNULjfjvE2ShJPQ4o55hpCUYbl%26id%3D100067061147888&show_text=true&width=400",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid028zegwYrNJWkqdbxwZpfpvC3eh84eD5k8iSvBodtAjhvT5Sz1pWfjEtuhTdSa5CpDl%26id%3D100067061147888&show_text=true&width=400"
  ];

  const [currentInstagramEmbed, setCurrentInstagramEmbed] = useState(0);
  const [currentFacebookEmbed, setCurrentFacebookEmbed] = useState(0);

  useEffect(() => {
    const instaInterval = setInterval(() => {
      setCurrentInstagramEmbed(prev => (prev + 1) % instagramEmbeds.length);
    }, 3500);
    const fbInterval = setInterval(() => {
      setCurrentFacebookEmbed(prev => (prev + 1) % facebookEmbeds.length);
    }, 3500);
    return () => {
      clearInterval(instaInterval);
      clearInterval(fbInterval);
    };
  }, [instagramEmbeds.length, facebookEmbeds.length]);

  // Detect mobile device using user agent (more reliable for mobile browsers)
  function getIsMobile() {
    if (typeof navigator !== "undefined") {
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return window.innerWidth <= 900;
  }
  const [isMobile, setIsMobile] = useState(getIsMobile());
  useEffect(() => {
    function handleResize() {
      setIsMobile(getIsMobile());
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Floating WhatsApp button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Abrir WhatsApp"
        style={isMobile ? {
          right: '3vw',
          bottom: '3vw',
          fontSize: '2.2rem',
          padding: '2.2vw 6vw 2.2vw 4vw',
          borderRadius: '6vw',
          gap: '2vw'
        } : {}}
      >
        <span className="floating-whatsapp-icon" style={isMobile ? { fontSize: '3.2rem', marginRight: '1vw' } : {}}>💬</span>
        <span className="floating-whatsapp-text" style={isMobile ? { fontSize: '2rem' } : {}}>WhatsApp</span>
      </a>
      <div
        className={`home-layout container py-5 ${visible[0] ? 'pop-in-main' : 'pop-out-main'}${isMobile ? ' mobile-layout' : ''}`}
        style={isMobile ? {
          width: '100vw',
          maxWidth: '100vw',
          minHeight: 'unset',
          flexDirection: 'column',
          padding: 0,
          gap: 0,
          marginTop: 0,
          overflowX: 'hidden'
        } : undefined}
      >
        {isMobile ? (
          <>
            <div
              className="home-left caduceus-bg"
              ref={leftRef}
              style={{
                width: '96vw',
                maxWidth: '96vw',
                minWidth: 0,
                height: 'auto',
                minHeight: 'calc(100vh - 4rem)',
                padding: '6vw 2vw 2vw 2vw',
                margin: '0 auto',
                boxSizing: 'border-box',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                textAlign: 'center'
              }}
            >
              <h1 style={{
                fontFamily: 'Tangerine',
                fontSize: '7vw',
                fontWeight: 700,
                letterSpacing: '0.08em',
                marginBottom: '2vw'
              }}>Dra. Simone L. S. Deo</h1>
              <h2 style={{
                fontSize: '4vw',
                marginBottom: '2vw',
                fontWeight: 700
              }}>Psiquiatria</h2>
              <p style={{
                fontWeight: 700,
                fontSize: '4.5vw',
                color: '#232946',
                lineHeight: '1.38',
                maxWidth: '92vw',
                margin: '0 auto',
                padding: '0 2vw'
              }}>
                Sou médica, com pós-graduação em Medicina Interna, Psiquiatria e Psicofarmacologia.<br /><br />
                Acredito que cada pessoa carrega uma história única, e por isso, meu atendimento é feito com naturalidade, empatia, ética e acolhimento.<br /><br />
                Meu compromisso é oferecer um cuidado personalizado, respeitando as necessidades e objetivos de cada paciente.<br /><br />
                Mais do que tratar a mente, meu propósito é cuidar das pessoas - escutando, orientando e criando um plano de tratamento individualizado que faça sentido para sua rotina e seu momento de vida.<br /><br />
                A saúde mental é um reflexo do que cultivamos dentro e fora. Assim sendo, não é alcançado somente através de remédios.<br /><br />
                A estabilidade começa com um firme propósito da pessoa tomar as rédeas da própria vida, e eu me proponho a ser acessível, e a caminharmos juntos rumo aos seus objetivos.<br /><br />
                Caso tenha mais dúvidas, entre em contato hoje mesmo.
              </p>
              <h2 style={{
                fontSize: '4vw',
                fontWeight: 700,
                marginTop: '2vw'
              }}>CRM 52.076388-8</h2>
              <img
                src={simoneImg}
                alt=""
                className="home-photo"
                style={{
                  border: `5px solid ${
                    typeof window !== "undefined" && window.document.documentElement.classList.contains('dark')
                      ? '#6c63ff'
                      : '#FFD700'
                  }`,
                  maxWidth: '88vw',
                  width: '88vw',
                  height: '48vw',
                  margin: '4vw auto 0 auto',
                  display: 'block',
                  objectFit: 'cover',
                  borderRadius: '1.2rem'
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="home-left caduceus-bg" ref={leftRef}>
              <h1 style={{
                fontFamily: 'Tangerine',
                fontSize: '4.2rem',
                fontWeight: 700,
                letterSpacing: '0.08em'
              }}>Dra. Simone L. S. Deo</h1>
              <h2 style={{
                fontSize: '1.55rem',
                marginBottom: '1.2rem',
                fontWeight: 700
              }}>Psiquiatria</h2>
              <p style={{
                fontWeight: 700,
                fontSize: '1.28rem',
                color: '#232946',
                lineHeight: '1.32',
                maxWidth: '700px',
                marginLeft: '-1.2rem',
                marginRight: '-1.2rem'
              }}>
                Sou médica, com pós-graduação em Medicina Interna, Psiquiatria e Psicofarmacologia.<br /><br />
                Acredito que cada pessoa carrega uma história única, e por isso, meu atendimento é feito com naturalidade, empatia, ética e acolhimento.<br /><br />
                Meu compromisso é oferecer um cuidado personalizado, respeitando as necessidades e objetivos de cada paciente.<br /><br />
                Mais do que tratar a mente, meu propósito é cuidar das pessoas - escutando, orientando e criando um plano de tratamento individualizado que faça sentido para sua rotina e seu momento de vida.<br /><br />
                A saúde mental é um reflexo do que cultivamos dentro e fora. Assim sendo, não é alcançado somente através de remédios.<br /><br />
                A estabilidade começa com um firme propósito da pessoa tomar as rédeas da própria vida, e eu me proponho a ser acessível, e a caminharmos juntos rumo aos seus objetivos.<br /><br />
                Caso tenha mais dúvidas, entre em contato hoje mesmo.
              </p>
              <h2 style={{
                fontSize: '1.55rem',
                fontWeight: 700
              }}>CRM 52.076388-8</h2>
            </div>
            <div className="home-right" ref={rightRef}>
              <img
                src={simoneImg}
                alt=""
                className="home-photo"
                style={{
                  border: `8px solid ${
                    typeof window !== "undefined" && window.document.documentElement.classList.contains('dark')
                      ? '#6c63ff'
                      : '#FFD700'
                  }`,
                  maxWidth: '540px',
                  width: '100%'
                }}
              />
            </div>
          </>
        )}
      </div>
      <div
        className={`home-layout container py-5 ${visible[3] ? 'pop-in-main' : 'pop-out-main'}`}
        style={isMobile ? {
          marginTop: '2vw',
          marginBottom: '2vw',
          gap: 0,
          padding: 0
        } : { marginTop: '1.2rem', marginBottom: '1.2rem' }}
      >
        <div className="home-left" ref={mapsRef} style={isMobile ? { padding: '0.2vw 0.2vw' } : {}}>
          <div className="maps-bar-title" style={{
            textAlign: 'center',
            width: '100%',
            fontSize: isMobile ? '3vw' : undefined,
            marginBottom: isMobile ? '1vw' : undefined,
            padding: isMobile ? '0 0.1vw' : undefined
          }}>
            <span style={{ color: '#181818' }}>Endereço para as consultas:</span>
            <div
              className={typeof window !== "undefined" && window.document.documentElement.classList.contains('dark') ? "maps-address-dark" : "maps-address-light"}
              style={{
                fontSize: isMobile ? '2.5vw' : undefined,
                padding: isMobile ? '0 0.1vw' : undefined,
                marginTop: isMobile ? '0.5vw' : undefined
              }}
            >
              {clinicAddress}
            </div>
          </div>
          <div
            className="maps-bar-single-inner"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              padding: 0,
              width: isMobile ? '100vw' : '100%',
              height: isMobile ? 'auto' : '100%',
            }}
          >
            <div
              style={{
                width: isMobile ? '92vw' : '480px',
                height: isMobile ? '92vw' : '480px',
                maxWidth: '480px',
                maxHeight: '480px',
                minWidth: '220px',
                minHeight: '220px',
                borderRadius: '1.2rem',
                overflow: 'hidden',
                boxShadow: '0 2px 18px rgba(40,60,120,0.14)',
                background: '#fff',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <iframe
                title="Localização da Clínica"
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  borderRadius: '1.2rem'
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="home-right" style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            width: isMobile ? '90vw' : '360px',
            height: isMobile ? '220px' : '380px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <iframe
              title="Facebook Post"
              src={facebookEmbeds[currentFacebookEmbed]}
              width={isMobile ? '90vw' : '360'}
              height={isMobile ? '220' : '380'}
              style={{
                border: 'none',
                overflow: 'hidden',
                borderRadius: '1.2rem',
                background: '#fff',
                width: '100%',
                height: '100%'
              }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div style={{
            width: isMobile ? '90vw' : '390px',
            height: isMobile ? '220px' : '390px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <iframe
              title="Instagram Post"
              src={instagramEmbeds[currentInstagramEmbed]}
              width={isMobile ? '90vw' : '350'}
              height={isMobile ? '220' : '390'}
              frameBorder="0"
              scrolling="no"
              allowtransparency="true"
              allow="encrypted-media"
              style={{
                borderRadius: '1.2rem',
                background: '#fff',
                width: '100%',
                height: '100%'
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}