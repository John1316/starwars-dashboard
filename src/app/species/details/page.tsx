"use client";

import { getSpeciesListDetails } from "@/api/services/species.service";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";
import DashboardLayout from "@/layouts/DashboardLayout";
import EntityName from "@/ui/components/features/Records/EntityName";
import StatsCard from "@/ui/components/features/Records/StatsCard";
import { starWarsUtils } from "@/utils/starWarsUtils";
import { Spinner } from "@nextui-org/react";
import { 
  Ruler, 
  Timer, 
  Palette, 
  Brain, 
  Globe, 
  MessageSquare, 
  Users, 
  EyeIcon, 
  CaseSensitive
} from 'lucide-react';
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const speciesId = useSearchParams().get("id");
  const [speciesDetails, setSpeciesDetails] = useState<Species | null>(null);
  const { formatSectionTitle } = starWarsUtils;

  // Move the hook call to the component level
  const { relatedData } = useStarWarsArrayData(speciesDetails);

  useEffect(() => {
    async function fetchSpeciesDetails() {
      if (speciesId) {
        const res = await getSpeciesListDetails(speciesId);
        setSpeciesDetails(res);
      }
    }

    fetchSpeciesDetails();
  }, [speciesId]);

  if (!speciesDetails) return null;


  
  const speciesStats = [
    {
      icon: <Brain className="text-lightsaber-blue" size={20} />,
      label: 'Classification',
      value: `${speciesDetails.classification} - ${speciesDetails.designation}`
    },
    {
      icon: <Ruler className="text-lightsaber-blue" size={20} />,
      label: 'Average Height',
      value: `${speciesDetails.average_height} cm`
    },
    {
      icon: <Timer className="text-lightsaber-blue" size={20} />,
      label: 'Average Lifespan',
      value: `${speciesDetails.average_lifespan} years`
    },
    {
      icon: <Palette className="text-lightsaber-blue" size={20} />,
      label: 'Skin Colors',
      value: speciesDetails.skin_colors.split(', ').map(color => 
        color.charAt(0).toUpperCase() + color.slice(1)
      ).join(', ')
    },
    {
      icon: <Palette className="text-lightsaber-blue" size={20} />,
      label: 'Hair Colors',
      value: speciesDetails.hair_colors.split(', ').map(color => 
        color.charAt(0).toUpperCase() + color.slice(1)
      ).join(', ')
    },
    {
      icon: <EyeIcon className="text-lightsaber-blue" size={20} />,
      label: 'Eye Colors',
      value: speciesDetails.eye_colors.split(', ').map(color => 
        color.charAt(0).toUpperCase() + color.slice(1)
      ).join(', ')
    },
    {
      icon: <MessageSquare className="text-lightsaber-blue" size={20} />,
      label: 'Language',
      value: speciesDetails.language
    },
    {
      icon: <Users className="text-lightsaber-blue" size={20} />,
      label: 'Known Members',
      value: `${speciesDetails.people.length} documented`
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl text-white">Species</h1>
        </div>
        <StatsCard stat={{
          icon: <CaseSensitive className="text-lightsaber-blue" size={20} />,
          label: 'Name',
          value: speciesDetails.name || 'Unknown'
        }} />

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {speciesStats.map((stat, index) => (
            <StatsCard stat={stat} key={index} />
          ))}
        </div>

        {/* Dynamic Related Data Sections */}
        {Object.entries(relatedData).map(
          ([key, { data, isLoading, error }]) => (
            <div key={key}>
              {(() => {
                if (isLoading) {
                  return (
                    <div className="flex justify-center p-4">
                      <Spinner color="primary" />
                    </div>
                  );
                }
                if (error) {
                  return (
                    <div className="bg-red-500 text-white p-2">{error}</div>
                  );
                }
                if (data.length) {
                  return (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {formatSectionTitle(key)}:
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {data.map((entity: any) => (
                          <EntityName
                            entity={entity}
                            keyName={key}
                            key={entity.id}
                          />
                        ))}
                      </div>
                    </div>
                  );
                }
                return "";
              })()}
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}
