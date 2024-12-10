
  

  // contexts/StarWarsContext/StarWarsContext.tsx
  import React, { createContext, useReducer, useCallback } from 'react';
  import { getStarshipsList } from '@/api/services/starship.service';
//   import { StarWarsContextState, StarWarsContextValue, Character } from './types';
  
  // Create context
  export const StarshipsContext = createContext<StarshipsContextValue | undefined>(undefined);
  

  
  // Initial state
  const initialState: StarshipsContextState = {
    starships: [],
    selectedStarship: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    isModalOpen: false,
  };
  
  // Reducer
  function StarshipReducer(state: StarshipsContextState, action: ActionTypeStarships): StarshipsContextState {
    switch (action.type) {
      case 'SET_STARSHIPS':
        return { ...state, starships: action.payload };
      case 'SET_SELECTED_STARSHIP':
        return { ...state, selectedStarship: action.payload };
      case 'SET_CURRENT_PAGE':
        return { ...state, currentPage: action.payload };
      case 'SET_TOTAL_PAGES':
        return { ...state, totalPages: action.payload };
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      case 'TOGGLE_MODAL':
        return { ...state, isModalOpen: action.payload };
      default:
        return state;
    }
  }
  
  // Provider component
  export function StarshipsContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(StarshipReducer, initialState);
  
    // Actions
    const fetchStarships = useCallback(async (page?: number, search?: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
  
      try {
        const currentPage = page ?? state.currentPage;
        const currentSearch = search ?? state.searchQuery;
  
        const response = await getStarshipsList(currentSearch, currentPage);
        
        dispatch({ type: 'SET_STARSHIPS', payload: response.results });
        dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(response.count / 10) });
      } catch (error) {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: error instanceof Error ? error.message : 'An error occurred' 
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }, [state.currentPage, state.searchQuery]);
  
    const setSearchQuery = useCallback((query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    }, []);
  
    const setCurrentPage = useCallback((page: number) => {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    }, []);
  
    const setSelectedStarship = useCallback((starship: Starship | null) => {
      dispatch({ type: 'SET_SELECTED_STARSHIP', payload: starship });
    }, []);
  
    const toggleModal = useCallback((isOpen: boolean) => {
      dispatch({ type: 'TOGGLE_MODAL', payload: isOpen });
    }, []);
  
    const clearError = useCallback(() => {
      dispatch({ type: 'SET_ERROR', payload: null });
    }, []);
  
    const value: StarshipsContextValue = {
      ...state,
      fetchStarships,
      setSearchQuery,
      setCurrentPage,
      setSelectedStarship,
      toggleModal,
      clearError,
    };
  
    return (
      <StarshipsContext.Provider value={value}>
        {children}
      </StarshipsContext.Provider>
    );
  }
  
