type Planet = {
    name: string;
    gender: string;
    birth_year: string;
    skin_color: string;
    eye_color: string;
    [key: string]: any;
  };
  
  type PlanetContextState = {
    // Data
    planets: Planet[];
    selectedPlanet: any | null;
  
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
  interface PlanetContextValue extends PlanetContextState {
    // Actions
    fetchPlanets: (page?: number, search?: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
    setSelectedPlanet: (planet: Planet | null) => void;
    toggleModal: (isOpen: boolean) => void;
    clearError: () => void;
  }
    // Action types
    type ActionTypePlanet =
      | { type: 'SET_PLANETS'; payload: Planet[] }
      | { type: 'SET_SELECTED_PLANET'; payload: Planet | null }
      | { type: 'SET_CURRENT_PAGE'; payload: number }
      | { type: 'SET_TOTAL_PAGES'; payload: number }
      | { type: 'SET_SEARCH_QUERY'; payload: string }
      | { type: 'SET_LOADING'; payload: boolean }
      | { type: 'SET_ERROR'; payload: string | null }
      | { type: 'TOGGLE_MODAL'; payload: boolean };