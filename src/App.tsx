import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import SecretSanta from './pages/SecretSanta';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import './styles/masonry.css';

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Dylan Lynch Ceramics';

    if (location.pathname === '/gallery') {
      title = 'Gallery | Dylan Lynch Ceramics';
    } else if (location.pathname === '/shop' || location.pathname.startsWith('/product/')) {
      title = 'Shop | Dylan Lynch Ceramics';
    } else if (location.pathname === '/secret-santa') {
      title = 'Secret Santa | Dylan Lynch Ceramics';
    }

    document.title = title;
  }, [location]);

  return null;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <TitleManager />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/gallery" replace />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/secret-santa" element={<SecretSanta />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
