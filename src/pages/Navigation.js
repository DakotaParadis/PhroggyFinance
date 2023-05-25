import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <Link legacyBehavior href="/">
        <a className="text-gray-600 hover:text-gray-800 px-4">Home</a>
      </Link>
      <Link legacyBehavior href="/budget">
        <a className="text-gray-600 hover:text-gray-800 px-4">Budget</a>
      </Link>
      <Link legacyBehavior href="/videos">
        <a className="text-gray-600 hover:text-gray-800 px-4">Videos</a>
      </Link>
    </nav>
  );
};

export default Navigation;
