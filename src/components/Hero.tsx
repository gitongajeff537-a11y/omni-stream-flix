import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';

interface HeroProps {
  movie: Movie;
  onMoreInfo: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onMoreInfo }) => {
  return (
    <div className="relative h-[85vh] w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 pt-16 sm:pt-20 max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 bg-netflix text-white text-[10px] font-bold rounded-sm uppercase tracking-wider">
            {movie.provider === 'netflix' ? 'Netflix Series' : 
             movie.provider === 'prime' ? 'Prime Video' : 
             movie.provider === 'disney' ? 'Disney+' : 'Apple TV+'}
          </span>
          <span className="text-white/60 text-xs font-semibold">{movie.year}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg tracking-tight leading-tight">
          {movie.title}
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 line-clamp-3 md:line-clamp-4 drop-shadow">
          {movie.description}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2 font-bold px-8">
            <Play className="fill-black w-5 h-5" />
            Play
          </Button>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-gray-500/50 text-white hover:bg-gray-500/40 gap-2 font-bold px-8 backdrop-blur-md"
            onClick={() => onMoreInfo(movie)}
          >
            <Info className="w-5 h-5" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
