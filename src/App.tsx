import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Seo } from '@/components/Seo/Seo';
import { PageRouter } from '@/router/PageRouter';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useHashRoute } from '@/hooks/useHashRoute';

function App(): JSX.Element {
  const isDesktop = useIsDesktop();
  const page = useHashRoute();

  return (
    <>
      <Seo />
      <Header isDesktop={isDesktop} />
      <main>
        <PageRouter page={page} isDesktop={isDesktop} />
      </main>
      <Footer />
    </>
  );
}

export default App;
