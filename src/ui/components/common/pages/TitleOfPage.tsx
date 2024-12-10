import React from 'react'

export default function TitleOfPage({title, children}: TitleOfPageProps) {
  return (
    <div className="flex lg:flex-row flex-col md:justify-between gap-[16px] items-center">
    <h1 className="lg:text-2xl text-md font-bold text-[var(--lightsaber-blue)]">{title}</h1>
    <div className="w-72">
      {children}
    </div>
  </div>  )
}
