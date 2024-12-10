
  

  // contexts/StarWarsContext/StarWarsContext.tsx
  import React, { createContext, useReducer, useCallback } from 'react';
  import { getPlanetsList } from '@/api/services/planets.service';
//   import { StarWarsContextState, StarWarsContextValue, Character } from './types';
  
  // Create context
  export const PlanetContext = createContext<PlanetContextValue | undefined>(undefined);
  

  
  // Initial state
  const initialState: PlanetContextState = {
    planets: [],
    selectedPlanet: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    isModalOpen: false,
  };
  
  // Reducer
  function StarshipReducer(state: PlanetContextState, action: ActionTypePlanet): PlanetContextState {
    switch (action.type) {
      case 'SET_PLANETS':
        return { ...state, planets: action.payload };
      case 'SET_SELECTED_PLANET':
        return { ...state, selectedPlanet: action.payload };
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
  export function PlanetsContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(StarshipReducer, initialState);
  
    // Actions
    const fetchPlanets = useCallback(async (page?: number, search?: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
  
      try {
        const currentPage = page ?? state.currentPage;
        const currentSearch = search ?? state.searchQuery;
  
        const response = await getPlanetsList(currentSearch, currentPage);
        
        dispatch({ type: 'SET_PLANETS', payload: response.results });
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
  
    const setSelectedPlanet = useCallback((planet: Planet | null) => {
      dispatch({ type: 'SET_SELECTED_PLANET', payload: planet });
    }, []);
  
    const toggleModal = useCallback((isOpen: boolean) => {
      dispatch({ type: 'TOGGLE_MODAL', payload: isOpen });
    }, []);
  
    const clearError = useCallback(() => {
      dispatch({ type: 'SET_ERROR', payload: null });
    }, []);
  
    const value: PlanetContextValue = {
      ...state,
      fetchPlanets,
      setSearchQuery,
      setCurrentPage,
      setSelectedPlanet,
      toggleModal,
      clearError,
    };
  
    return (
      <PlanetContext.Provider value={value}>
        {children}
      </PlanetContext.Provider>
    );
  }
  
