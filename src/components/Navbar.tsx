import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const navLinks = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'];

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between',
        isScrolled ? 'bg-[#141414]' : 'bg-transparent bg-gradient-to-b from-black/70 to-transparent'
      )}
    >
      <div className="flex items-center gap-4 md:gap-10">
        <h1 className="text-2xl md:text-3xl font-bold text-netflix tracking-tighter uppercase">
          STREAMHUB
        </h1>
        
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-200 hover:text-gray-400 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Titles, people, genres"
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-black/40 border border-white/20 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-netflix/50 w-32 md:w-64 transition-all"
          />
        </div>
        
        <Bell className="w-5 h-5 text-gray-200 cursor-pointer hover:text-white hidden md:block" />
        
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded bg-netflix flex items-center justify-center text-white font-bold text-xs overflow-hidden">
            <User className="w-5 h-5" />
          </div>
          <User className="w-4 h-4 text-gray-200 group-hover:text-white hidden md:block" />
        </div>

        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#141414] border-t border-white/10 lg:hidden p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-lg font-medium text-gray-200 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
