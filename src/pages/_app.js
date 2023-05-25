import '../styles/tailwind.css';
import React from 'react';
import Navigation from './/Navigation';

const App = ({ Component, pageProps }) => {
  return (
    <div className="container mx-auto">
      

      <main>
        <Component {...pageProps} />
      </main>

      <footer className="flex justify-center py-4">
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mr-4">
        <img src="/images/instagram.png" alt="Instagram" className="h-6 w-6" />
      </a>
      <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="mr-4">
        <img src="/images/github.png" alt="GitHub" className="h-6 w-6" />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src="/images/linkedin.png" alt="LinkedIn" className="h-6 w-6" />
      </a>
    </footer>
    </div>
  );
};

export default App;
