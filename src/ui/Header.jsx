import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
import Button from './Button';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-main px-4 py-3 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-xl font-extrabold text-second md:text-3xl"
          >
            {/* <img src="/logo.svg" alt="Crusto Pizza Logo" className="h-12 w-auto sm:h-16" /> */}
            Crusto
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <SearchOrder />
            <nav className="flex items-center gap-4 font-semibold text-second">
              <Username />
              <Button to="/menu" type="second">
                Menu
              </Button>
              <Button to="/cart" type="second">
                Cart
              </Button>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-second md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="mb-4">
              <SearchOrder />
            </div>
            <nav className="flex flex-col gap-4 font-semibold text-second">
              <Username />
              <Link
                to="/menu"
                className="transition-colors duration-200 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/cart"
                className="transition-colors duration-200 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
