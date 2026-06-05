import { Header } from './components/Header/Header';
import { Hero } from './sections/Hero/Hero';
import { Services } from './sections/Services/Services';
import { Team } from './sections/Team/Team';
import { Contact } from './sections/Contact/Contact';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
