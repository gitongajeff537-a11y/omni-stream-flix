import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie, Provider } from '@/types/movie';
import { cn } from '@/lib/utils';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  provider?: Provider;
  onMovieSelect: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, provider, onMovieSelect }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const providerStyles = {
    netflix: {
      accent: 'text-netflix',
      bg: 'hover:bg-netflix/20',
      logo: 'NETFLIX'
    },
    prime: {
      accent: 'text-prime',
      bg: 'hover:bg-prime/20',
      logo: 'PRIME VIDEO'
    },
    disney: {
      accent: 'text-disney',
      bg: 'hover:bg-disney/20',
      logo: 'DISNEY+'
    },
    apple: {
      accent: 'text-apple',
      bg: 'hover:bg-apple/20',
      logo: 'APPLE TV+'
    }
  };

  const style = provider ? providerStyles[provider] : null;

  return (
    <div className="space-y-2 md:space-y-4 px-4 md:px-12 mb-8 group/row">
      <div className="flex items-center gap-3">
        <h2 className={cn(
          "text-lg md:text-2xl font-bold transition-colors cursor-pointer",
          style ? style.accent : "text-gray-200"
        )}>
          {title}
        </h2>
        {provider && (
          <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-widest bg-white/5 px-2 py-1 rounded">
            {style?.logo}
          </span>
        )}
      </div>

      <div className="relative group">
        <button
          className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <div
          ref={rowRef}
          className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2 touch-pan-x"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />
          ))}
        </div>

        <button
          className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
