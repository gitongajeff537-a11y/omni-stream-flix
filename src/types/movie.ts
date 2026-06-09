export type Provider = 'netflix' | 'prime' | 'disney' | 'apple';

export interface Movie {
  id: string;
  title: string;
  description: string;
  backdropUrl: string;
  posterUrl: string;
  rating: string;
  year: number;
  duration: string;
  genres: string[];
  provider: Provider;
  isOriginal?: boolean;
}
