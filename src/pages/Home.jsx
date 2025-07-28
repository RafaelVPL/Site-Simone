import React, { useEffect, useRef, useState } from 'react'
import simoneImg from '../assets/simone.jpg'
import deomed1 from '../assets/deomed1.png'
import deomed2 from '../assets/deomed2.png'
import caduceusImg from '../assets/caduceus.png'
import './Home.css'

export default function Home() {
  const whatsappNumber = '5524981548739';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  // Pop-in/out effect for left, right, contact, and maps sections
  const leftRef = useRef();
  const rightRef = useRef();
  const contactRef = useRef();
  const mapsRef = useRef();
  const [, setVisible] = useState([false, false, false, false]);

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

  // Set page title and favicon
  useEffect(() => {
    document.title = "DeoMed";
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
      {/* PC layout: two sections, each split left/right */}
      {!isMobile ? (
        <>
          {/* Section 1: text left, photo right */}
          <div className="home-layout pc-section">
            <div className="home-left pc-left caduceus-bg">
              {/* Caduceus is handled by CSS ::before */}
              <h1 style={{
                fontFamily: 'Tangerine',
                fontSize: '4rem', // slightly bigger
                fontWeight: 700,
                letterSpacing: '0.08em',
                marginBottom: '0.7rem',
                textAlign: 'center'
              }}>Dra. Simone L. S. Deo</h1>
              <h2 style={{
                fontSize: '1.45rem', // slightly smaller
                marginBottom: '1.1rem',
                fontWeight: 700,
                textAlign: 'center'
              }}>Psiquiatria</h2>
              <p style={{
                fontWeight: 700,
                fontSize: '1.08rem', // slightly smaller
                color: '#232946',
                lineHeight: '1.13',
                maxWidth: '900px',
                marginLeft: '-1.2rem',
                marginRight: '-1.2rem',
                textAlign: 'center'
              }}>
                Sou médica, com pós-graduação em Medicina Interna, Psiquiatria e Psicofarmacologia.<br /><br />
                Acredito que cada pessoa carrega uma história única, e por isso, meu atendimento é feito com naturalidade, empatia, ética e acolhimento.<br /><br />
                Meu compromisso é oferecer um cuidado personalizado, respeitando as necessidades e objetivos de cada paciente.<br /><br />
                Mais do que tratar a mente, meu propósito é cuidar das pessoas - escutando, orientando e criando um plano de tratamento individualizado que faça sentido para sua rotina e seu momento de vida.<br /><br />
                A saúde mental é um reflexo do que cultivamos dentro e fora. Assim sendo, não é alcançada somente através de remédios.<br /><br />
                A estabilidade começa com um firme propósito da pessoa tomar as rédeas da própria vida, e eu me proponho a ser acessível, e a caminharmos juntos rumo aos seus objetivos.<br /><br />
                Caso tenha mais dúvidas, entre em contato hoje mesmo.
              </p>
              <h2 style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                marginTop: '1.1rem',
                textAlign: 'center'
              }}>CRM 52.076388-8</h2>
            </div>
            <div className="home-right pc-right" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginLeft: '-3vw'
            }}>
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
                  maxWidth: '420px', // smaller than before
                  width: '100%',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          </div>
          {/* Section 2: maps left, social right */}
          <div className="home-layout pc-section">
            <div className="home-left pc-left">
              <div className="maps-bar-title" style={{
                textAlign: 'center',
                width: '100%',
                fontSize: '1.35rem',
                marginBottom: '1.2rem',
                padding: 0
              }}>
                <span style={{ color: '#181818' }}>Endereço para as consultas:</span>
                <div
                  className={typeof window !== "undefined" && window.document.documentElement.classList.contains('dark') ? "maps-address-dark" : "maps-address-light"}
                  style={{
                    fontSize: '1.18rem',
                    marginTop: '0.5rem',
                    padding: 0,
                    textAlign: 'center'
                  }}
                >
                  {clinicAddress}
                </div>
              </div>
              <div className="maps-bar-single-inner" style={{
                minWidth: '440px',
                minHeight: '440px',
                width: '480px',
                height: '480px',
                borderRadius: '1.2rem',
                overflow: 'hidden',
                boxShadow: '0 2px 18px rgba(40,60,120,0.14)',
                background: '#fff',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
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
            <div className="home-right pc-right" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginLeft: '-3vw'
            }}>
              <div className="social-embed" style={{
                width: '390px',
                height: '390px',
                marginBottom: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <iframe
                  title="Instagram Post"
                  src={instagramEmbeds[currentInstagramEmbed]}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  allowtransparency="true"
                  allow="encrypted-media"
                  style={{
                    borderRadius: '1.2rem',
                    background: '#fff',
                    width: '100%',
                    height: '100%',
                    display: 'block'
                  }}
                ></iframe>
              </div>
              <div className="social-embed" style={{
                width: '390px',
                height: '390px',
                marginBottom: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <iframe
                  title="Facebook Post"
                  src={facebookEmbeds[currentFacebookEmbed]}
                  width="100%"
                  height="100%"
                  style={{
                    border: 'none',
                    overflow: 'hidden',
                    borderRadius: '1.2rem',
                    background: '#fff',
                    width: '100%',
                    height: '100%',
                    display: 'block'
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="home-layout container py-5 mobile-layout"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              minHeight: 'unset',
              flexDirection: 'column',
              padding: 0,
              gap: 0,
              marginTop: 0,
              overflowX: 'hidden'
            }}
          >
            <div
              className="home-left"
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
                fontSize: '10vw',
                fontWeight: 700,
                letterSpacing: '0.08em',
                marginBottom: '2vw'
              }}>Dra. Simone L. S. Deo</h1>
              <h2 style={{
                fontSize: '4vw',
                marginBottom: '2vw',
                fontWeight: 700
              }}>Psiquiatria</h2>
              <div className="first-text-bg" style={{
                fontWeight: 700,
                fontSize: '4.6vw',
                color: '#232946',
                lineHeight: '1.13',
                maxWidth: '92vw',
                margin: '0 auto',
                padding: '0 2vw',
                textAlign: 'center'
              }}>
                Sou médica, com pós-graduação em Medicina Interna, Psiquiatria e Psicofarmacologia.<br /><br />
                Acredito que cada pessoa carrega uma história única, e por isso, meu atendimento é feito com naturalidade, empatia, ética e acolhimento.<br /><br />
                Meu compromisso é oferecer um cuidado personalizado, respeitando as necessidades e objetivos de cada paciente.<br /><br />
              </div>
              <img
                src={deomed1}
                alt="DeoMed"
                style={{
                  width: '60vw',
                  maxWidth: '320px',
                  height: 'auto',
                  margin: '2vw auto 2vw auto',
                  display: 'block',
                  borderRadius: '1.2rem',
                  boxShadow: '0 2px 18px rgba(40,60,120,0.14)'
                }}
              />
              <div className="second-text-bg" style={{
                position: 'relative',
                zIndex: 1,
                fontWeight: 700,
                fontSize: '4vw',
                color: '#232946',
                lineHeight: '1.13',
                maxWidth: '92vw',
                margin: '5vw auto 0 auto',
                padding: '0 2vw',
                textAlign: 'center'
              }}>
                Mais do que tratar a mente, meu propósito é cuidar das pessoas - escutando, orientando e criando um plano de tratamento individualizado que faça sentido para sua rotina e seu momento de vida.<br /><br />
                A saúde mental é um reflexo do que cultivamos dentro e fora. Assim sendo, não é alcançada somente através de remédios.<br /><br />
                A estabilidade começa com um firme propósito da pessoa tomar as rédeas da própria vida, e eu me proponho a ser acessível, e a caminharmos juntos rumo aos seus objetivos.<br /><br />
                Caso tenha mais dúvidas, entre em contato hoje mesmo.
              </div>
              <h2 style={{
                fontSize: '4vw',
                fontWeight: 700,
                marginTop: '2vw'
              }}>CRM 52.076388-8</h2>
              {/* Completely redo mobile caduceus: normal element after CRM */}
              <img
                src={caduceusImg}
                alt="Caduceus"
                className="caduceus-mobile-after-crm"
                style={{
                  width: '54vw',
                  maxWidth: '220px',
                  height: '54vw',
                  maxHeight: '220px',
                  opacity: 0.32,
                  margin: '2vw auto 0 auto',
                  display: 'block',
                  pointerEvents: 'none'
                }}
              />
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
            <div className="mobile-sections-centered">
              <div className="mobile-section-maps">
                <div className="maps-bar-title" style={{
                  textAlign: 'center',
                  width: '100%',
                  fontSize: '3vw',
                  marginBottom: '1vw',
                  padding: 0
                }}>
                  <span style={{ color: '#181818' }}>Endereço para as consultas:</span>
                  <div
                    className={typeof window !== "undefined" && window.document.documentElement.classList.contains('dark') ? "maps-address-dark" : "maps-address-light"}
                    style={{
                      fontSize: '2vw',
                      marginTop: '0.5vw',
                      padding: 0,
                      textAlign: 'center'
                    }}
                  >
                    {clinicAddress}
                  </div>
                </div>
                <div
                  className="maps-bar-single-inner"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    padding: 0,
                    width: '100vw',
                    height: 'auto'
                  }}
                >
                  <div
                    style={{
                      width: '92vw',
                      height: '92vw',
                      maxWidth: '92vw',
                      maxHeight: '92vw',
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
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="mobile-section-instagram" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '3vw auto 0 auto',
                width: '92vw'
              }}>
                <iframe
                  title="Instagram Post"
                  src={instagramEmbeds[currentInstagramEmbed]}
                  width="100%"
                  height="220"
                  frameBorder="0"
                  scrolling="no"
                  allow="encrypted-media"
                  allowFullScreen
                  style={{
                    borderRadius: '1.2rem',
                    background: '#fff',
                    width: '92vw',
                    height: '44vw',
                    display: 'block',
                    margin: '0 auto',
                    border: 'none'
                  }}
                ></iframe>
              </div>
              <div className="mobile-section-facebook" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '3vw auto 0 auto',
                width: '92vw'
              }}>
                <iframe
                  title="Facebook Post"
                  src={facebookEmbeds[currentFacebookEmbed]}
                  width="100%"
                  height="220"
                  style={{
                    border: 'none',
                    overflow: 'hidden',
                    borderRadius: '1.2rem',
                    background: '#fff',
                    width: '92vw',
                    height: '44vw',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}