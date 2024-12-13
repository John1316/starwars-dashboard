"use client";

import { getPlanetListDetails } from "@/api/services/planets.service";
import { formatNumber } from "@/functions/DateHelpers";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";
import DashboardLayout from "@/layouts/DashboardLayout";
import EntityName from "@/ui/components/features/Records/EntityName";
import StatsCard from "@/ui/components/features/Records/StatsCard";
import { starWarsUtils } from "@/utils/starWarsUtils";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import {
  CaseSensitive,
  CircleDot,
  Droplets,
  Globe2,
  Mountain,
  Scale,
  Thermometer,
  Timer,
  Users,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const planetId = useSearchParams().get("id");
  const [planetDetails, setPlanetDetails] = useState<Planet | null>(null);
  const { formatSectionTitle } = starWarsUtils;

  // Move the hook call to the component level
  const { relatedData } = useStarWarsArrayData(planetDetails);

  useEffect(() => {
    async function fetchPlanetDetails() {
      if (planetId) {
        const res = await getPlanetListDetails(planetId);
        setPlanetDetails(res);
      }
    }

    fetchPlanetDetails();
  }, [planetId]);

  if (!planetDetails) return null;

  const planetStats = [
    {
      icon: <Timer className="text-lightsaber-blue" size={20} />,
      label: "Rotation Period",
      value: planetDetails?.rotation_period
        ? `${planetDetails.rotation_period} hours`
        : "Unknown",
    },
    {
      icon: <CircleDot className="text-lightsaber-blue" size={20} />,
      label: "Orbital Period",
      value: planetDetails?.orbital_period
        ? `${planetDetails.orbital_period} days`
        : "Unknown",
    },
    {
      icon: <Globe2 className="text-lightsaber-blue" size={20} />,
      label: "Diameter",
      value: planetDetails?.diameter
        ? `${formatNumber(planetDetails.diameter)} km`
        : "Unknown",
    },
    {
      icon: <Scale className="text-lightsaber-blue" size={20} />,
      label: "Gravity",
      value: planetDetails?.gravity || "Unknown",
    },
    {
      icon: <Thermometer className="text-lightsaber-blue" size={20} />,
      label: "Climate",
      value: planetDetails?.climate || "Unknown",
    },
    {
      icon: <Mountain className="text-lightsaber-blue" size={20} />,
      label: "Terrain",
      value: planetDetails?.terrain || "Unknown",
    },
    {
      icon: <Droplets className="text-lightsaber-blue" size={20} />,
      label: "Surface Water",
      value: planetDetails?.surface_water
        ? `${planetDetails.surface_water}%`
        : "Unknown",
    },
    {
      icon: <Users className="text-lightsaber-blue" size={20} />,
      label: "Population",
      value: planetDetails?.population
        ? formatNumber(planetDetails.population)
        : "Unknown",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl text-white">Planet</h1>
        </div>
        <StatsCard stat={{
          icon: <CaseSensitive className="text-lightsaber-blue" size={20} />,
          label: 'Name',
          value: planetDetails.name || 'Unknown'
        }} />
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planetStats.map((stat, index) => (
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
