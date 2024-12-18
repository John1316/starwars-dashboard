import Image from 'next/image'
import React from 'react'
// import { Imperial } from 'lucide-react';

export default function Header({children}: ChildrenProps) {
  return (
    <header className="layout__header">
      <div className="flex items-center justify-between h-full md:px-[24px] px-[12px]">
        <div className="flex items-center gap-4">
          {children}
          <div className="flex items-center gap-3">
            <Image
            
            src='/logo-white.png' 
            width={100}
            loading={'lazy'}
            height={100}
            alt='logo'
            />
          </div>
        </div>
      </div>
    </header>
  )
}
