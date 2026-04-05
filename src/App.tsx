import React, { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, Utensils, MapPin, Clock, Instagram, Menu, X, Globe, Star } from 'lucide-react';
import { translations, menuData } from './translations';

type Language = 'en' | 'fr' | 'ar';

const AccordionItem: React.FC<{ question: string, answer: string, isOpen: boolean, onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-stone-200 mb-4 bg-white rounded-2xl shadow-sm overflow-hidden transition-all">
      <button 
        type="button"
        className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors"
        onClick={onClick}
      >
        <span className="text-sm font-semibold tracking-wide text-stone-900">{question}</span>
        {isOpen ? <ChevronDown size={20} className="text-red-900 transform rotate-180 transition-transform" /> : <ChevronDown size={20} className="text-stone-400 transition-transform" />}
      </button>
      {isOpen && (
        <div className="p-6 pt-0 text-sm text-stone-600 leading-relaxed bg-white">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [openFaq, setOpenFaq] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[lang] as Record<string, string>;
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: t.faq1q,
      a: t.faq1a
    },
    {
      q: t.faq2q,
      a: t.faq2a
    },
    {
      q: t.faq3q,
      a: t.faq3a
    }
  ];

  return (
    <div className={`min-h-screen bg-stone-50 text-stone-900 ${isRtl ? 'font-sans' : 'font-sans'}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'} px-6 md:px-16 lg:px-24`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://i.ibb.co/CGFVrpM/azrou-city-logo.jpg" alt="Azrou City Logo" className="h-12 w-auto rounded-md" />
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide text-stone-600">
            <a href="#" className="hover:text-red-900 transition-colors">{t.menu}</a>
            <a href="#" className="hover:text-red-900 transition-colors">{t.about}</a>
            <a href="#" className="hover:text-red-900 transition-colors">{t.find}</a>
            <a href="#" className="hover:text-red-900 transition-colors">{t.contact}</a>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1 text-stone-600 hover:text-red-900 transition-colors">
                <Globe size={18} />
                <span className="uppercase text-xs font-bold">{lang}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-stone-100 py-2 hidden group-hover:block min-w-[100px]">
                <button onClick={() => setLang('en')} className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50">English</button>
                <button onClick={() => setLang('fr')} className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50">Français</button>
                <button onClick={() => setLang('ar')} className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50">العربية</button>
              </div>
            </div>
            <button className="bg-red-900 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-red-950 transition-colors shadow-lg shadow-red-900/20">
              {t.book}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-1 text-stone-600">
                <Globe size={20} />
                <span className="uppercase text-xs font-bold">{lang}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-stone-100 py-2 hidden group-hover:block min-w-[100px]">
                <button onClick={() => setLang('en')} className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50">English</button>
                <button onClick={() => setLang('fr')} className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50">Français</button>
                <button onClick={() => setLang('ar')} className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50">العربية</button>
              </div>
            </div>
            <button className="text-stone-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 md:hidden">
          <a href="#" className="text-2xl font-serif text-stone-900 border-b border-stone-100 pb-4">{t.menu}</a>
          <a href="#" className="text-2xl font-serif text-stone-900 border-b border-stone-100 pb-4">{t.about}</a>
          <a href="#" className="text-2xl font-serif text-stone-900 border-b border-stone-100 pb-4">{t.find}</a>
          <a href="#" className="text-2xl font-serif text-stone-900 border-b border-stone-100 pb-4">{t.contact}</a>
          <button className="bg-red-900 text-white px-8 py-4 rounded-full font-semibold text-lg mt-4 shadow-lg shadow-red-900/20">
            {t.book}
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-16 lg:px-24 overflow-hidden">
        {/* Mobile Background Image */}
        <div 
          className="absolute inset-0 z-0 md:hidden"
          style={{ backgroundImage: 'url(https://i.ibb.co/mF84wvJy/azrou-city.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-white/30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50/0 via-red-50/0 to-stone-100/0 -z-10 md:bg-gradient-to-br md:from-stone-50 md:via-red-50/30 md:to-stone-100"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-stone-100 mb-8 w-fit">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider text-stone-600 uppercase">{t.open}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-stone-900 mb-6 font-bold">
              {t.heroTitle1}<br />
              <span className="text-red-900 italic">{t.heroTitle2}</span><br />
              {t.heroTitle3}
            </h1>
            <p className="text-stone-800 md:text-stone-600 font-medium md:font-normal text-base sm:text-lg mb-8 max-w-md leading-relaxed">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="tel:0808504352" className="bg-red-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-950 transition-colors shadow-xl shadow-red-900/20 flex items-center justify-center gap-3">
                {t.callRes} <Phone size={18} />
              </a>
              <a href="https://www.instagram.com/azroucitycafe/" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full font-semibold text-stone-900 border border-stone-200 bg-white/80 backdrop-blur-sm hover:bg-stone-100 transition-colors flex items-center justify-center gap-2">
                <Instagram size={18} /> {t.follow}
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative h-[500px] md:h-[600px] w-full hidden md:block">
            <img 
              src="https://i.ibb.co/mF84wvJy/azrou-city.png" 
              alt="Azrou City Cafe" 
              className="absolute top-0 right-0 w-[70%] h-[80%] object-cover rounded-[2rem] shadow-2xl z-10"
            />
            <img 
              src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800" 
              alt="Pastries" 
              className="absolute bottom-0 left-0 w-[60%] h-[60%] object-cover rounded-[2rem] shadow-2xl border-8 border-stone-50 z-20"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] w-full order-2 md:order-1">
            <img 
              src="https://i.ibb.co/YF6H6pY0/batisii.png" 
              alt="Coffee and Croissant" 
              className="w-full h-full object-cover rounded-[2rem] shadow-xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-red-900 text-white p-8 rounded-[2rem] shadow-xl hidden md:block">
              <p className="text-4xl font-serif font-bold mb-2">{t.years}</p>
              <p className="text-sm font-medium tracking-wider uppercase opacity-90 whitespace-pre-line">{t.yearsText}</p>
            </div>
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-red-900"></span>
              <p className="text-xs font-bold tracking-[0.2em] text-red-900 uppercase">{t.storyTag}</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-stone-900 font-bold">
              {t.storyTitle}
            </h2>
            <div className="text-stone-600 text-base leading-relaxed space-y-6">
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Breakfast Section */}
      <section className="py-24 bg-white px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-red-900"></span>
            <p className="text-xs font-bold tracking-[0.2em] text-red-900 uppercase">{t.bfastTag}</p>
            <span className="w-8 h-[1px] bg-red-900"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-stone-900 font-bold">{t.bfastTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-xl">
              <img src="https://i.ibb.co/QFqX1CVx/another-ftor.jpg" alt="Breakfast 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-xl">
              <img src="https://i.ibb.co/t99XKP5/ftiwr.png" alt="Breakfast 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-xl">
              <img src="https://i.ibb.co/wFjzgGWX/ftor.jpg" alt="Breakfast 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-24 bg-stone-50 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-red-900"></span>
            <p className="text-xs font-bold tracking-[0.2em] text-red-900 uppercase">{t.sigTag}</p>
            <span className="w-8 h-[1px] bg-red-900"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-stone-900 font-bold">{t.sigTitle}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { img: "https://i.ibb.co/DPBSTgz3/smm.jpg", title: t.sig1 },
              { img: "https://i.ibb.co/WWg2NPyN/cafe.png", title: t.sig2 },
              { img: "https://i.ibb.co/nssXt4MY/PIZZA.jpg", title: t.sig3 },
              { img: "https://i.ibb.co/PKNYgMc/nice.jpg", title: t.sig4 }
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl shadow-md mb-4 aspect-[4/5]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-stone-900 group-hover:text-red-900 transition-colors">{item.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-16 max-w-4xl mx-auto">
              <video 
                src="https://res.cloudinary.com/ddfazkkij/video/upload/q_auto/f_auto/v1775395806/SaveClip.App_AQMiSxCuux3OltWtEhH8dOcIvIXmfMzx1Zdh5YYG2FnZSCpIFrjwF5gXiMrbELN4ZCOBV6t6bl46OgskLSj6nsm8usO85NbTuEBMVHc_a55weg.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto object-cover"
              />
            </div>
            <a href="#full-menu" className="inline-block bg-white border-2 border-stone-200 text-stone-900 px-10 py-4 rounded-full font-semibold hover:border-red-900 hover:text-red-900 transition-colors">
              {t.viewFull}
            </a>
          </div>
        </div>
      </section>

      {/* Full Menu Section */}
      <section className="py-24 bg-white px-6 md:px-16 lg:px-24" id="full-menu">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-red-900"></span>
              <p className="text-xs font-bold tracking-[0.2em] text-red-900 uppercase">{t.discTag}</p>
              <span className="w-8 h-[1px] bg-red-900"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 font-bold">{t.fullTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {menuData[lang].map((category, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-serif font-bold text-red-900 mb-8 border-b border-stone-200 pb-4">{category.category}</h3>
                <div className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-baseline">
                      <div>
                        <h4 className="text-lg font-semibold text-stone-900">{item.name}</h4>
                        {item.desc && <p className="text-sm text-stone-500 mt-1">{item.desc}</p>}
                      </div>
                      <span className="text-red-900 font-bold ml-4 whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center text-stone-500 text-sm italic">
            {t.menuNote}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-red-900 text-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-red-800/50">
          <div className="space-y-3">
            <p className="text-5xl font-serif font-bold">24/7</p>
            <p className="text-xs font-bold tracking-widest text-red-200 uppercase">{t.stat1}</p>
          </div>
          <div className="space-y-3">
            <p className="text-5xl font-serif font-bold">100%</p>
            <p className="text-xs font-bold tracking-widest text-red-200 uppercase">{t.stat2}</p>
          </div>
          <div className="space-y-3">
            <p className="text-5xl font-serif font-bold">50+</p>
            <p className="text-xs font-bold tracking-widest text-red-200 uppercase">{t.stat3}</p>
          </div>
          <div className="space-y-3">
            <p className="text-5xl font-serif font-bold">1</p>
            <p className="text-xs font-bold tracking-widest text-red-200 uppercase">{t.stat4}</p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-white px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-red-900"></span>
              <p className="text-xs font-bold tracking-[0.2em] text-red-900 uppercase">{t.welcomeTag}</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-stone-900 font-bold">
              {t.welcomeTitle}
            </h2>
            <p className="text-stone-600 text-base leading-relaxed">
              {t.welcomeDesc}
            </p>
          </div>
          <div className="relative h-[500px] w-full">
            <img 
              src="https://i.ibb.co/SXy5Dzqq/patisisi.png" 
              alt="Restaurant Interior" 
              className="absolute top-0 right-0 w-[80%] h-[70%] object-cover rounded-[2rem] shadow-xl z-0"
            />
            <img 
              src="https://i.ibb.co/t99XKP5/ftiwr.png" 
              alt="Food" 
              className="absolute bottom-0 left-0 w-[60%] h-[50%] object-cover rounded-[2rem] shadow-2xl border-8 border-white z-10"
            />
          </div>
        </div>
      </section>

      {/* The Perfect Blend / FAQ */}
      <section className="py-24 bg-stone-50 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] w-full hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" 
              alt="Coffee Pouring" 
              className="w-full h-full object-cover rounded-[2rem] shadow-xl"
            />
          </div>
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-red-900"></span>
                <p className="text-xs font-bold tracking-[0.2em] text-red-900 uppercase">{t.expTag}</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight text-stone-900 font-bold">
                {t.expTitle}
              </h2>
              <div className="text-stone-600 text-base leading-relaxed space-y-4">
                <p>{t.expP1}</p>
                <p>{t.expP2}</p>
              </div>
            </div>
            
            <div className="space-y-0 pt-6">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-stone-100 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-red-900"></span>
            <p className="text-xs font-bold tracking-[0.2em] text-red-900 uppercase">{t.reviewsTag}</p>
            <span className="w-8 h-[1px] bg-red-900"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-stone-900 font-bold">{t.reviewsTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "Sarah M.", review: t.review1 },
              { name: "Karim B.", review: t.review2 },
              { name: "Emma T.", review: t.review3 },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-left flex flex-col h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-stone-600 italic mb-6 flex-grow">"{item.review}"</p>
                <p className="font-bold text-stone-900">— {item.name}</p>
              </div>
            ))}
          </div>
          
          <a 
            href="https://maps.app.goo.gl/GMzMjmMS3k2vo4Xs5" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-stone-200 text-stone-900 px-8 py-4 rounded-xl font-bold hover:bg-stone-50 transition-colors shadow-sm"
          >
            <MapPin size={20} className="text-red-900" />
            {t.viewOnGoogle}
          </a>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 bg-white px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto bg-stone-50 rounded-[2rem] shadow-xl shadow-stone-900/5 border border-stone-200/50 overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-red-900 text-white p-10 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4 font-bold">{t.bookTitle}</h2>
              <p className="text-red-100 text-sm mb-12 leading-relaxed">
                {t.bookDesc}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-red-800/50 p-3 rounded-full">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-red-200 uppercase tracking-wider font-bold mb-1">{t.callUs}</p>
                  <p className="text-lg font-semibold">08 08 50 43 52</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-800/50 p-3 rounded-full">
                  <Instagram size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-red-200 uppercase tracking-wider font-bold mb-1">Instagram</p>
                  <a href="https://www.instagram.com/azroucitycafe/" target="_blank" rel="noreferrer" className="text-lg font-semibold hover:underline">@azroucitycafe</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-800/50 p-3 rounded-full">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-red-200 uppercase tracking-wider font-bold mb-1">{t.loc}</p>
                  <a href="https://maps.app.goo.gl/GMzMjmMS3k2vo4Xs5" target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline">
                    {t.locDesc}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/5 p-10 md:p-12 bg-white flex flex-col justify-center items-center text-center">
            <div className="bg-red-50 p-6 rounded-full mb-6">
              <Phone size={48} className="text-red-900" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">{t.readyJoin}</h3>
            <p className="text-stone-600 mb-8 max-w-md">
              {t.readyDesc}
            </p>
            <a href="tel:0808504352" className="w-full sm:w-auto bg-red-900 text-white px-10 py-5 rounded-xl text-lg font-bold tracking-wide hover:bg-red-950 transition-colors shadow-lg shadow-red-900/20 flex items-center justify-center gap-3">
              <Phone size={24} />
              {t.callAction}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-20 pb-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <img src="https://i.ibb.co/CGFVrpM/azrou-city-logo.jpg" alt="Azrou City Logo" className="h-12 w-auto rounded-md" />
              </div>
              <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
                {t.footerDesc}
              </p>
              <div className="flex gap-4 pt-4">
                <a href="https://www.instagram.com/azroucitycafe/" target="_blank" rel="noreferrer" className="bg-stone-800 p-3 rounded-full hover:bg-red-900 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-serif mb-6 text-white">{t.quickLinks}</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">{t.menu}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.about}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.find}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.contact}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.book}</a></li>
              </ul>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-serif mb-6 text-white">{t.contact}</h3>
                <div className="space-y-3 text-sm">
                  <a href="https://maps.app.goo.gl/GMzMjmMS3k2vo4Xs5" target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-white transition-colors"><MapPin size={16} className="text-red-500 shrink-0 mt-1" /> {t.locDesc}</a>
                  <p className="flex items-center gap-3"><Phone size={16} className="text-red-500 shrink-0" /> 08 08 50 43 52</p>
                  <p className="flex items-center gap-3"><Clock size={16} className="text-red-500 shrink-0" /> Mon - Sun: 7:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
            <p>© 2026 <span className="text-white">Azrou City Cafe</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
