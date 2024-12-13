"use client"

import { getFilmDetailsById } from '@/api/services/film.service'
import useStarWarsArrayData from '@/hooks/Global/useStarWarsArrayData'
import DashboardLayout from '@/layouts/DashboardLayout'
import EntityName from '@/ui/components/features/Records/EntityName'
import StatsCard from '@/ui/components/features/Records/StatsCard'
import { starWarsUtils } from '@/utils/starWarsUtils'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { Calendar, CaseSensitive, Clapperboard, User, Users } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const filmId = useSearchParams().get("id")
    const [filmDetails, setFilmDetails] = useState<Film | null>(null)
    const { formatSectionTitle } = starWarsUtils
    
    // Move the hook call to the component level
    const { relatedData } = useStarWarsArrayData(filmDetails)

    useEffect(() => {
        async function fetchFilmDetails() {
            if (filmId) {
                const res = await getFilmDetailsById(filmId)
                setFilmDetails(res)
            }
        }
        
        fetchFilmDetails()
    }, [filmId])
    
    if (!filmDetails) return null

    const filmStats = [
        {
            icon: <Clapperboard className="text-lightsaber-blue" size={20} />,
            label: "Episode",
            value: filmDetails?.episode_id ? `Episode ${filmDetails.episode_id}` : '',
        },
        {
            icon: <Calendar className="text-lightsaber-blue" size={20} />,
            label: "Release Date",
            value: filmDetails?.release_date ? new Date(filmDetails.release_date).toLocaleDateString() : '',
        },
        {
            icon: <User className="text-lightsaber-blue" size={20} />,
            label: "Director",
            value: filmDetails?.director || '',
        },
        {
            icon: <Users className="text-lightsaber-blue" size={20} />,
            label: "Producers",
            value: filmDetails?.producer || '',
        },
    ]

    return (
        <DashboardLayout>

            <div className="space-y-6">
            <div className="space-y-2">
            <h1 className='text-xl text-white'>Film</h1>

            </div>
            <StatsCard stat={{
          icon: <CaseSensitive className="text-lightsaber-blue" size={20} />,
          label: 'Name',
          value: filmDetails.title || 'Unknown'
        }} />
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filmStats.map((stat, index) => (
                        <StatsCard stat={stat} key={index} />
                    ))}
                </div>

                {/* Dynamic Related Data Sections */}
                {Object.entries(relatedData).map(([key, { data, isLoading, error }]) => (
                    <div key={key}>
                        {(() => {
                            if (isLoading) {
                                return <div className="flex justify-center p-4">
                                    <Spinner color="primary" />
                                </div>
                            }
                            if (error) {
                                return <div className="bg-red-500 text-white p-2">
                                    {error}
                                </div>
                            }
                            if (data.length) {
                                return <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {formatSectionTitle(key)}:
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {data.map((entity: any) => (
                                            <EntityName entity={entity} keyName={key} key={entity.id} />
                                        ))}
                                    </div>
                                </div>
                            }
                            return ""
                        })()}
                    </div>
                ))}
            </div>

        </DashboardLayout>
    )
}