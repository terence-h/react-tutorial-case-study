// src/components/ScrollToTop.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Scroll to the element with the ID matching the hash
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView(); // { behavior: 'smooth' }
            }
        } else {
            // Scroll to top if no hash
            window.scrollTo({
                top: 0,
                left: 0,
                // behavior: 'smooth',
            });
        }
    }, [pathname, hash]);

    return null;
};