type Film = {
    title: string
    episode_id: number
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    characters: string[]
    planets: string[]
    starships: string[]
    vehicles: string[]
    species: string[]
    created: string
    edited: string
    url: string
  };
  
  type FilmContextState = {
    // Data
    films: Film[];
    selectedFilm: Film | null;
  
    // Pagination
    currentPage: number;
    totalPages: number;
  
    // Search
    searchQuery: string;
  
    // UI States
    isLoading: boolean;
    error: string | null;
    isModalOpen: boolean;
  };
  interface FilmContextValue extends FilmContextState {
    // Actions
    fetchFilms: (page?: number, search?: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
    setSelectedFilm: (Film: Film | null) => void;
    toggleModal: (isOpen: boolean) => void;
    clearError: () => void;
  }
  type FilmModalProps ={
    film: Film | null
  }