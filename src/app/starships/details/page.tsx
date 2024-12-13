"use client";

import { getStarshipListDetails } from "@/api/services/starship.service";
import { formatNumber } from "@/functions/DateHelpers";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";
import DashboardLayout from "@/layouts/DashboardLayout";
import EntityName from "@/ui/components/features/Records/EntityName";
import StatsCard from "@/ui/components/features/Records/StatsCard";
import { starWarsUtils } from "@/utils/starWarsUtils";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import {
  Rocket,
  Gauge,
  Timer,
  Users,
  Box,
  Coins,
  Factory,
  BadgeInfo,
  Clock,
  Sparkles,
  CaseSensitive,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const starshipId = useSearchParams().get("id");
  const [starshipDetails, setStarshipDetails] = useState<Starship | null>(null);
  const { formatSectionTitle } = starWarsUtils;

  // Move the hook call to the component level
  const { relatedData } = useStarWarsArrayData(starshipDetails);

  useEffect(() => {
    async function fetchFilmDetails() {
      if (starshipId) {
        const res = await getStarshipListDetails(starshipId);
        setStarshipDetails(res);
      }
    }

    fetchFilmDetails();
  }, [starshipId]);

  if (!starshipDetails) return null;

  const starshipStats = [
    {
      icon: <BadgeInfo className="text-lightsaber-blue" size={20} />,
      label: "Class",
      value: starshipDetails?.starship_class
        ? starWarsUtils.capitalize(starshipDetails.starship_class)
        : "Unknown",
    },
    {
      icon: <Factory className="text-lightsaber-blue" size={20} />,
      label: "Manufacturer",
      value: starshipDetails?.manufacturer || "Unknown",
    },
    {
      icon: <Coins className="text-lightsaber-blue" size={20} />,
      label: "Cost",
      value: starshipDetails?.cost_in_credits
        ? `${formatNumber(starshipDetails.cost_in_credits)} credits`
        : "Unknown",
    },
    {
      icon: <Timer className="text-lightsaber-blue" size={20} />,
      label: "Length",
      value: starshipDetails?.length
        ? `${formatNumber(starshipDetails.length)} meters`
        : "Unknown",
    },
  ];

  const technicalStats = [
    {
      icon: <Gauge className="text-lightsaber-blue" size={20} />,
      label: "Max Speed",
      value: starshipDetails?.max_atmosphering_speed
        ? `${starshipDetails.max_atmosphering_speed} km/h`
        : "Unknown",
    },
    {
      icon: <Sparkles className="text-lightsaber-blue" size={20} />,
      label: "Hyperdrive Rating",
      value: starshipDetails?.hyperdrive_rating || "Unknown",
    },
    {
      icon: <Rocket className="text-lightsaber-blue" size={20} />,
      label: "MGLT",
      value: starshipDetails?.MGLT ? `${starshipDetails.MGLT} MGLT` : "Unknown",
    },
    {
      icon: <Clock className="text-lightsaber-blue" size={20} />,
      label: "Consumables",
      value: starshipDetails?.consumables || "Unknown",
    },
  ];

  const capacityStats = [
    {
      icon: <Users className="text-lightsaber-blue" size={20} />,
      label: "Crew",
      value: starshipDetails?.crew || "Unknown",
    },
    {
      icon: <Users className="text-lightsaber-blue" size={20} />,
      label: "Passengers",
      value: starshipDetails?.passengers
        ? formatNumber(starshipDetails.passengers)
        : "Unknown",
    },
    {
      icon: <Box className="text-lightsaber-blue" size={20} />,
      label: "Cargo Capacity",
      value: starshipDetails?.cargo_capacity
        ? `${formatNumber(starshipDetails.cargo_capacity)} kg`
        : "Unknown",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl text-white">Starship</h1>
          
        </div>
        <StatsCard stat={{
          icon: <CaseSensitive className="text-lightsaber-blue" size={20} />,
          label: 'Name',
          value: starshipDetails.name || 'Unknown'
        }} />
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {starshipStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        {/* Technical Specifications */}
        <Card className="bg-[var(--space-gray)] border-[var(--rebel-yellow)] border">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {technicalStats.map((stat, index) => (
                <StatsCard key={index} stat={stat} />
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Capacity Information */}
        <Card className="bg-[var(--space-gray)] border-[var(--rebel-yellow)] border">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Capacity Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capacityStats.map((stat, index) => (
                <StatsCard key={index} stat={stat} />
              ))}
            </div>
          </CardBody>
        </Card>

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
