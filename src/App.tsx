import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './sections/Hero/Hero';
import { Services } from './sections/Services/Services';
import { Team } from './sections/Team/Team';
import { Contact } from './sections/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Impressum } from './sections/Impressum/Impressum';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'impressum'>('home');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/team') {
        setCurrentPage('team');
        window.scrollTo(0, 0);
      } else if (hash === '#/impressum') {
        setCurrentPage('impressum');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
        
        // If transitioning back to home with an anchor hash (e.g. #services), scroll to it after rendering
        const anchor = hash.replace('#', '');
        if (anchor && anchor !== '/') {
          setTimeout(() => {
            const element = document.getElementById(anchor);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 50);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      <Header isDesktop={isDesktop} />
      <main>
        {isDesktop ? (
          <>
            {currentPage === 'impressum' ? (
              <Impressum />
            ) : (
              <>
                <Hero />
                <Services />
                <Team />
                <Contact />
              </>
            )}
          </>
        ) : (
          <>
            {currentPage === 'impressum' ? (
              <Impressum />
            ) : currentPage === 'home' ? (
              <>
                <Hero />
                <Services />
                <Contact />
              </>
            ) : (
              <Team />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
