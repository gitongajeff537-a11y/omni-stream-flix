import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieDetails from './components/MovieDetails';
import { mockMovies } from './data/mockMovies';
import { Movie, Provider } from './types/movie';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const featuredMovie = useMemo(() => {
    return mockMovies.find(m => m.id === '1') || mockMovies[0];
  }, []);

  const filteredMovies = useMemo(() => {
    if (!searchQuery) return mockMovies;
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const moviesByProvider = useMemo(() => {
    const providers: Provider[] = ['netflix', 'prime', 'disney', 'apple'];
    return providers.map(provider => ({
      provider,
      title: provider.charAt(0).toUpperCase() + provider.slice(1) + (provider === 'disney' ? '+' : provider === 'apple' ? ' TV+' : ' Originals'),
      movies: filteredMovies.filter(m => m.provider === provider)
    }));
  }, [filteredMovies]);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-netflix/30">
      <Navbar onSearch={setSearchQuery} />
      
      {!searchQuery && (
        <Hero 
          movie={featuredMovie} 
          onMoreInfo={handleMovieSelect}
        />
      )}

      <div className={searchQuery ? "pt-24" : "-mt-24 relative z-10"}>
        {searchQuery && (
          <div className="px-4 md:px-12 mb-8">
            <h2 className="text-xl text-gray-400">Search results for "{searchQuery}"</h2>
          </div>
        )}

        {moviesByProvider.map(({ provider, title, movies }) => (
          movies.length > 0 && (
            <MovieRow 
              key={provider}
              title={title}
              movies={movies}
              provider={provider}
              onMovieSelect={handleMovieSelect}
            />
          )
        ))}

        {filteredMovies.length === 0 && (
          <div className="h-[50vh] flex flex-col items-center justify-center text-center px-4">
            <p className="text-2xl font-bold text-gray-500 mb-2">No results found</p>
            <p className="text-gray-600">Try searching for different keywords or titles.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-white/5 px-4 md:px-12 text-center text-gray-600 text-sm">
        <p>&copy; 2024 STREAMHUB. All rights reserved.</p>
        <p className="mt-2">Inspired by Netflix, Prime Video, Disney+, and Apple TV+.</p>
      </footer>

      <MovieDetails 
        movie={selectedMovie} 
        isOpen={isDetailsOpen} 
        onClose={handleCloseDetails} 
      />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
