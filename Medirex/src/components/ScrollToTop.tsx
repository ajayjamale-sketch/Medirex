import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll the window (for non-dashboard pages like Landing Page, Login, etc.)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    // Scroll the dashboard layout container if it exists
    const mainContainer = document.getElementById('main-scroll-container');
    if (mainContainer) {
      mainContainer.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, search]);

  return null;
}
