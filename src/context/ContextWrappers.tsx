import React from 'react'
import { PlanetsContextProvider } from './PlanetContext'
import { StarshipsContextProvider } from './StarshipsContext'
import { FilmContextProvider } from './FilmsContext'
import { PeopleContextProvider } from './PeopleContext'

export default function ContextWrappers({children}: {children: React.ReactNode}) {
  return (
    <StarshipsContextProvider>
    <PeopleContextProvider>
      <FilmContextProvider>
        <PlanetsContextProvider>

          {children}
     
        </PlanetsContextProvider>
      </FilmContextProvider>
    </PeopleContextProvider>
  </StarshipsContextProvider>
  )
}
