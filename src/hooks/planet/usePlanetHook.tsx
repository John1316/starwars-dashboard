import { PlanetContext } from '@/context/PlanetContext';
import React, { useContext } from 'react'

export default function usePlanetHook() {
    const context = useContext(PlanetContext);
    if (context === undefined) {
      throw new Error('PlanetContext must be used within a PlanetContext');
    }
    return context;
}
