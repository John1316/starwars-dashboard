
  

  // contexts/StarWarsContext/StarWarsContext.tsx
  import React, { createContext, useContext, useReducer, useCallback } from 'react';
  import { getPeopleList } from '@/api/services/people.service';
//   import { StarWarsContextState, StarWarsContextValue, Character } from './types';
  
  // Create context
  export const PeopleContext = createContext<StarWarsContextValue | undefined>(undefined);
  

  
  // Initial state
  const initialState: StarWarsContextState = {
    characters: [],
    selectedCharacter: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    isModalOpen: false,
  };
  
  // Reducer
  function PeopleReducer(state: StarWarsContextState, action: ActionType): StarWarsContextState {
    switch (action.type) {
      case 'SET_CHARACTERS':
        return { ...state, characters: action.payload };
      case 'SET_SELECTED_CHARACTER':
        return { ...state, selectedCharacter: action.payload };
      case 'SET_CURRENT_PAGE':
        return { ...state, currentPage: action.payload };
      case 'SET_TOTAL_PAGES':
        return { ...state, totalPages: action.payload };
      case 'SET_SEARCH_QUERY':
        return { ...state, searchQuery: action.payload };
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
  export function PeopleContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(PeopleReducer, initialState);
  
    // Actions
    const fetchCharacters = useCallback(async (page?: number, search?: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
  
      try {
        const currentPage = page ?? state.currentPage;
        const currentSearch = search ?? state.searchQuery;
  
        const response = await getPeopleList(currentSearch, currentPage);
        
        dispatch({ type: 'SET_CHARACTERS', payload: response.results });
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
  
    const setSelectedCharacter = useCallback((character: Character | null) => {
      dispatch({ type: 'SET_SELECTED_CHARACTER', payload: character });
    }, []);
  
    const toggleModal = useCallback((isOpen: boolean) => {
      dispatch({ type: 'TOGGLE_MODAL', payload: isOpen });
    }, []);
  
    const clearError = useCallback(() => {
      dispatch({ type: 'SET_ERROR', payload: null });
    }, []);
  
    const value: StarWarsContextValue = {
      ...state,
      fetchCharacters,
      setSearchQuery,
      setCurrentPage,
      setSelectedCharacter,
      toggleModal,
      clearError,
    };
  
    return (
      <PeopleContext.Provider value={value}>
        {children}
      </PeopleContext.Provider>
    );
  }
  
