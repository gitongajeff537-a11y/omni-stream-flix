import React from 'react';
import { Play, Plus, ChevronDown, ThumbsUp } from 'lucide-react';
import { Movie } from '@/types/movie';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  const providerColors = {
    netflix: 'border-netflix',
    prime: 'border-prime',
    disney: 'border-disney',
    apple: 'border-apple',
  };

  return (
    <div 
      className="group relative flex-none w-[160px] md:w-[240px] aspect-[16/9] md:aspect-video rounded-md overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:z-20 hover:scale-105 hover:shadow-2xl"
      onClick={() => onSelect(movie)}
    >
      <img
        src={movie.backdropUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-30"
      />
      
      {/* Quick Info Overlay on Hover */}
      <div className="absolute inset-0 p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="flex gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <Play className="fill-black text-black w-4 h-4 ml-0.5" />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
            <Plus className="text-white w-4 h-4" />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
            <ThumbsUp className="text-white w-4 h-4" />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors ml-auto">
            <ChevronDown className="text-white w-4 h-4" />
          </div>
        </div>
        
        <h3 className="text-sm font-bold text-white mb-1 truncate">{movie.title}</h3>
        
        <div className="flex items-center gap-2 text-[10px] md:text-xs">
          <span className={cn("font-bold", 
            movie.provider === 'netflix' ? 'text-netflix' : 
            movie.provider === 'prime' ? 'text-prime' : 
            movie.provider === 'disney' ? 'text-disney' : 'text-apple'
          )}>
            98% Match
          </span>
          <span className="border border-gray-500 px-1 text-gray-400 uppercase leading-none">
            {movie.rating}
          </span>
          <span className="text-gray-400">{movie.duration}</span>
        </div>
        
        <div className="flex gap-1 mt-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="text-[10px] text-gray-300 flex items-center">
              {genre}
              <span className="last:hidden inline-block w-1 h-1 rounded-full bg-gray-600 mx-1" />
            </span>
          ))}
        </div>
      </div>

      {/* Provider Border indicator */}
      <div className={cn("absolute bottom-0 left-0 h-1 transition-all duration-300", 
        movie.provider === 'netflix' ? 'bg-netflix' : 
        movie.provider === 'prime' ? 'bg-prime' : 
        movie.provider === 'disney' ? 'bg-disney' : 'bg-apple',
        "w-0 group-hover:w-full"
      )} />
    </div>
  );
};

export default MovieCard;
