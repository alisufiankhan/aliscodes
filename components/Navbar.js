'use client';

import Link from 'next/link';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  return (
    <header>
      <div className="container nav-container">
        <Link href="/" className="logo">
          ali sufian
        </Link>
        <nav>
          <ul>
            <li><a href="#work">work</a></li>
            <li><a href="#built">built</a></li>
            <li><a href="#rates">rates</a></li>
            <li>
              <MagneticButton strength={0.25}>
                <button
                  type="button"
                  className="nav-btn"
                  data-cal-link="alis-sufian/mvp-building"
                  data-cal-namespace="mvp-building"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                >
                  book a call
                </button>
              </MagneticButton>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
