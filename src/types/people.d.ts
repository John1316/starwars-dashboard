type Character = {
  name: string;
  gender: string;
  birth_year: string;
  skin_color: string;
  eye_color: string;
  [key: string]: any;
};

type StarWarsContextState = {
  // Data
  characters: Character[];
  selectedCharacter: any | null;

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
interface StarWarsContextValue extends StarWarsContextState {
  // Actions
  fetchCharacters: (page?: number, search?: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedCharacter: (character: Character | null) => void;
  toggleModal: (isOpen: boolean) => void;
  clearError: () => void;
}
  // Action types
  type ActionType =
    | { type: 'SET_CHARACTERS'; payload: Character[] }
    | { type: 'SET_SELECTED_CHARACTER'; payload: Character | null }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_TOTAL_PAGES'; payload: number }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'TOGGLE_MODAL'; payload: boolean };