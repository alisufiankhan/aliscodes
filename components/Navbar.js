'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <div className="container nav-container">
        <Link href="/" className="logo">
          ali sufian
        </Link>
        <nav>
          <ul>
            <li><a href="/#projects">projects</a></li>
            <li><a href="/#services">services</a></li>
            <li><a href="mailto:alisufiancodes@gmail.com">contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
