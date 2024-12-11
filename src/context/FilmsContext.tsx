
  

  // contexts/StarWarsContext/StarWarsContext.tsx
  import React, { createContext, useReducer, useCallback } from 'react';
  import { getFilmsList } from '@/api/services/film.service';
//   import { StarWarsContextState, StarWarsContextValue, Character } from './types';
  
  // Create context
  export const FilmsContext = createContext<FilmContextValue | undefined>(undefined);
  

  
  // Initial state
  const initialState: FilmContextState = {
    films: [],
    selectedFilm: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    isModalOpen: false,
  };
  
  // Reducer
  function FilmReducer(state: FilmContextState, action: ActionTypeFilms): FilmContextState {
    switch (action.type) {
      case 'SET_FILMS':
        return { ...state, films: action.payload };
      case 'SET_SELECTED_FILMS':
        return { ...state, selectedFilm: action.payload };
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
  export function FilmContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(FilmReducer, initialState);
  
    // Actions
    const fetchFilms = useCallback(async (page?: number, search?: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
  
      try {
        const currentPage = page ?? state.currentPage;
        const currentSearch = search ?? state.searchQuery;
  
        const response = await getFilmsList(currentSearch, currentPage);
        
        dispatch({ type: 'SET_FILMS', payload: response.results });
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
  
    const setSelectedFilm = useCallback((film: Film | null) => {
      dispatch({ type: 'SET_SELECTED_FILMS', payload: film });
    }, []);
  
    const toggleModal = useCallback((isOpen: boolean) => {
      dispatch({ type: 'TOGGLE_MODAL', payload: isOpen });
    }, []);
  
    const clearError = useCallback(() => {
      dispatch({ type: 'SET_ERROR', payload: null });
    }, []);
  
    const value: FilmContextValue = {
      ...state,
      fetchFilms,
      setSearchQuery,
      setCurrentPage,
      setSelectedFilm,
      toggleModal,
      clearError,
    };
  
    return (
      <FilmsContext.Provider value={value}>
        {children}
      </FilmsContext.Provider>
    );
  }
  
