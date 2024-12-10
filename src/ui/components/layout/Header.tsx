import React from 'react'
// import { Imperial } from 'lucide-react';

export default function Header({children}: ChildrenProps) {
  return (
    <header className="layout__header">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          {children}
          <div className="flex items-center gap-3">
            {/* <Imperial className="text-[var(--rebel-yellow)]" size={32} /> */}
            <h1 className="md:text-2xl text-md font-bold tracking-wider">
              GALACTIC DASHBOARD
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}
