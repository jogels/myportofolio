import React, { useState, useEffect } from 'react';
import PortfolioHome from './pages/PortfolioHome';
import ContohUi from './pages/ContohUi';

function App() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname === '/contohUi' || window.location.hash === '#contohUi'
      ? '/contohUi'
      : '/'
  );

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === '/contohUi' || window.location.hash === '#contohUi') {
        setCurrentPath('/contohUi');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Showcase Lab jika di /contohUi
  if (currentPath === '/contohUi') {
    return <ContohUi />;
  }

  // Render Full Playful Portfolio Home di /
  return <PortfolioHome onNavigateContohUi={() => navigateTo('/contohUi')} />;
}

export default App;
