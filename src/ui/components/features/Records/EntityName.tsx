import { useRouter } from 'next/navigation'
import React from 'react'

export default function EntityName({
    entity, 
    keyName
}: EntityProps) {
    const router = useRouter()
    function navigateToPage(){
        console.log("🚀 ~ navigateToPage ~ keyName:", keyName)
        if(keyName === "films"){
            router.push(`/films/details?id=${entity.id}`)
        }else if(keyName === "planets"){
            router.push(`/planets/details?id=${entity.id}`)
        }else if(keyName === "starships"){
            router.push(`/starships/details?id=${entity.id}`)
        }else if(keyName === "vehicles"){
            router.push(`/vehicle/details?id=${entity.id}`)
        }else if(keyName === "species"){
            router.push(`/species/details?id=${entity.id}`)
        }else{
            router.push(`/details?id=${entity.id}`)
        }
    }
  return (
    <div
    className="p-2 flex justify-between items-center rounded border border-[var(--rebel-yellow)]"
>
    <p className="text-[var(--rebel-yellow)]">{entity.name}</p>
    <button
        onClick={navigateToPage}
        className="px-4 py-2 rounded-lg bg-[var(--rebel-yellow)] text-[var(--star-white)] hover:bg-[var(--rebel-yellow)] transition-colors"
    >
        View Details
    </button>
</div>  )
}
