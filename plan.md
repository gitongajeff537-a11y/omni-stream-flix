# Plan: Multi-Provider Movie Streaming Platform (Frontend-Only)

Build a high-fidelity, Netflix-style movie streaming interface that aggregates/simulates content from multiple providers (Netflix, Prime Video, Disney+, Apple TV+). The application will be a "discovery" platform where users can browse content categorized by streaming source.

## Scope Summary
- **Theming:** Distinct visual styles for rows belonging to different providers (e.g., Prime Video Blue, Netflix Red, Disney+ Teal).
- **Navigation:** Browse by provider, genre, and search.
- **Components:** High-impact Hero section, horizontal scrolling movie carousels, movie detail modals, and a multi-provider filtering system.
- **Data:** Mock movie data including titles, posters, descriptions, and "Available On" metadata.
- **Non-Goals:** Actual video playback (trailers/simulated players only), user authentication, real-time backend updates, or actual API integration with these services.

## Assumptions & Open Questions
- **Data Source:** We will use hardcoded mock data for the initial build to ensure reliability.
- **Search:** Client-side search implementation.
- **Navigation:** Single-page application using standard React state or routing if multiple pages are needed (e.g., Movie Detail page).

## Affected Areas
- **Frontend Components:**
  - `Navbar`: Search and category links.
  - `Hero`: Featured content with dynamic backgrounds.
  - `MovieRow`: Thematic carousels for specific providers.
  - `MovieCard`: Hover effects and quick-info display.
  - `MovieDetails`: Comprehensive view of selected movie.
- **State Management:** Local React state for search, filters, and modal visibility.
- **Styling:** Tailwind CSS with custom colors for branding (Netflix, Prime, Disney+, Apple).

## Phases

### Phase 1: Mock Data & Types
- Define `Movie` and `Provider` types.
- Create a robust mock data file with movies tagged by provider, genre, and rating.
- **Owner:** frontend_engineer

### Phase 2: Layout & Branding Components
- Implement the base layout with a dark, cinematic theme.
- Build the `Navbar` with provider-specific logos/colors.
- Create the `Hero` component for featured titles.
- **Owner:** frontend_engineer

### Phase 3: Themed Movie Rows
- Build a generic `MovieRow` component.
- Implement provider-specific styling (e.g., Netflix "Originals" style vs. Prime Video "Store" style).
- Add horizontal scrolling behavior and hover animations.
- **Owner:** frontend_engineer

### Phase 4: Discovery & Details
- Implement the `MovieDetails` modal/overlay.
- Build the search and filtering logic (filter by Netflix, Disney, etc.).
- Add "Watch Now" call-to-action that points to simulated providers.
- **Owner:** frontend_engineer

### Phase 5: Polishing & Responsive Design
- Refine animations (fades, scales).
- Ensure mobile responsiveness for the carousel and navbar.
- Final CSS tweaks for the "premium" feel.
- **Owner:** quick_fix_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Setup types, data, and core layout/components (Phases 1-4).
2. quick_fix_engineer — Polish UI/UX and fix responsive issues (Phase 5).

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** 
    - Create `src/types/movie.ts` and `src/data/mockMovies.ts`.
    - Build `Navbar`, `Hero`, `MovieRow`, `MovieCard`, and `MovieDetails`.
    - Ensure `MovieRow` accepts a `provider` prop to adjust its accent color and logo.
    - Implement a "Master Gallery" in `App.tsx` that sections content by provider.
- **Files:** 
    - `src/App.tsx`
    - `src/components/Navbar.tsx`
    - `src/components/Hero.tsx`
    - `src/components/MovieRow.tsx`
    - `src/components/MovieCard.tsx`
    - `src/components/MovieDetails.tsx`
- **Depends on:** none
- **Acceptance criteria:** App displays distinct rows for Netflix, Prime, Disney+, and Apple TV+; movies are searchable; clicking a movie opens a detailed view.

### 2. quick_fix_engineer
- **Phases:** 5
- **Scope:** 
    - Enhance hover transitions on `MovieCard`.
    - Ensure the horizontal scrolling rows work smoothly on touch devices.
    - Fix any overlapping text in the `Hero` component on small screens.
- **Files:** 
    - `src/index.css`
    - `src/components/MovieCard.tsx`
- **Depends on:** frontend_engineer
- **Acceptance criteria:** UI feels "premium" and animations are fluid across all screen sizes.

**Do not dispatch:** supabase_engineer (out of scope).
