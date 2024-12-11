type Starship = {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: any[]
  films: string[]
  created: string
  edited: string
  url: string
  };
  
  type StarshipsContextState = {
    // Data
    starships: Starship[];
    selectedStarship: Starship | null;
  
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
  interface StarshipsContextValue extends StarshipsContextState {
    // Actions
    fetchStarships: (page?: number, search?: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
    setSelectedStarship: (starship: Starship | null) => void;
    toggleModal: (isOpen: boolean) => void;
    clearError: () => void;
  }
    // Action types
    type ActionTypeStarships =
      | { type: 'SET_STARSHIPS'; payload: Starship[] }
      | { type: 'SET_SELECTED_STARSHIP'; payload: Starship | null }
      | { type: 'SET_CURRENT_PAGE'; payload: number }
      | { type: 'SET_TOTAL_PAGES'; payload: number }
      | { type: 'SET_SEARCH_QUERY'; payload: string }
      | { type: 'SET_LOADING'; payload: boolean }
      | { type: 'SET_ERROR'; payload: string | null }
      | { type: 'TOGGLE_MODAL'; payload: boolean };

      type StarshipModalProps = {
        starship: Starship | null
      }