type Film = {
    name: string;
    gender: string;
    birth_year: string;
    skin_color: string;
    eye_color: string;
    [key: string]: any;
  };
  
  type FilmContextState = {
    // Data
    films: Film[];
    selectedFilm: any | null;
  
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