import React from 'react';
import { X, Play, Plus, ThumbsUp, Volume2 } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MovieDetailsProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, isOpen, onClose }) => {
  if (!movie) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={cn(
          "relative w-full max-w-4xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 max-h-[90vh] overflow-y-auto",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
        )}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero Section of Modal */}
        <div className="relative h-[300px] md:h-[450px]">
          <img 
            src={movie.backdropUrl} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {movie.title}
            </h2>
            <div className="flex items-center gap-3">
              <Button className="bg-white text-black hover:bg-white/90 gap-2 font-bold px-8">
                <Play className="fill-black w-5 h-5" />
                Play
              </Button>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-white hover:border-white transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-white hover:border-white transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                </button>
              </div>
              <button className="ml-auto w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-white hover:border-white transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-500 font-bold">98% Match</span>
              <span className="text-gray-400">{movie.year}</span>
              <span className="border border-gray-600 px-1 text-gray-400 uppercase text-xs">
                {movie.rating}
              </span>
              <span className="text-gray-400">{movie.duration}</span>
              <span className="border border-gray-700 rounded px-1.5 text-[10px] text-gray-400 uppercase">
                HD
              </span>
            </div>

            <p className="text-white text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm">
              <span className="text-gray-500">Genres: </span>
              <span className="text-white">{movie.genres.join(', ')}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Available on: </span>
              <span className={cn(
                "font-bold uppercase tracking-wider",
                movie.provider === 'netflix' ? 'text-netflix' : 
                movie.provider === 'prime' ? 'text-prime' : 
                movie.provider === 'disney' ? 'text-disney' : 'text-apple'
              )}>
                {movie.provider}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
