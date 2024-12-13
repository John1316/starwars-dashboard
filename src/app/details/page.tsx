"use client";

import { getFilmDetailsById } from "@/api/services/film.service";
import { getPeopleListDetails } from "@/api/services/people.service";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";
import DashboardLayout from "@/layouts/DashboardLayout";
import EntityName from "@/ui/components/features/Records/EntityName";
import StatsCard from "@/ui/components/features/Records/StatsCard";
import { starWarsUtils } from "@/utils/starWarsUtils";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import {
  Calendar,
  CaseSensitive,
  Clapperboard,
  Eye,
  Palette,
  Ruler,
  User,
  UserCircle,
  Users,
  Weight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const peopleId = useSearchParams().get("id");
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const [peopleDetails, setPeopleDetails] = useState<Character | null>(null);
  const { formatSectionTitle } = starWarsUtils;

  // Move the hook call to the component level
  const { relatedData } = useStarWarsArrayData(peopleDetails);

  async function fetchPeopleDetails() {
    if (peopleId) {
      const res = await getPeopleListDetails(peopleId || "");
      setPeopleDetails(res);
    }
  }
  useEffect(() => {
    fetchPeopleDetails();
  }, [peopleId]);

  if (!peopleDetails) return null;

  const characterStats = [
    {
      icon: <Ruler className="text-lightsaber-blue" size={20} />,
      label: "Height",
      value: peopleDetails?.height ? `${peopleDetails.height} cm` : "",
    },
    {
      icon: <Weight className="text-lightsaber-blue" size={20} />,
      label: "Mass",
      value: peopleDetails?.mass ? `${peopleDetails.mass} kg` : "",
    },
    {
      icon: <Calendar className="text-lightsaber-blue" size={20} />,
      label: "Birth Year",
      value: peopleDetails?.birth_year || "",
    },
    {
      icon: <Eye className="text-lightsaber-blue" size={20} />,
      label: "Eye Color",
      value: peopleDetails?.eye_color
        ? capitalize(peopleDetails.eye_color)
        : "",
    },
    {
      icon: <UserCircle className="text-lightsaber-blue" size={20} />,
      label: "Gender",
      value: peopleDetails?.gender ? capitalize(peopleDetails.gender) : "",
    },
    {
      icon: <Palette className="text-lightsaber-blue" size={20} />,
      label: "Hair Color",
      value: peopleDetails?.hair_color
        ? capitalize(peopleDetails.hair_color)
        : "",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl text-white">Character</h1>
        </div>
        <StatsCard stat={{
          icon: <CaseSensitive className="text-lightsaber-blue" size={20} />,
          label: 'Name',
          value: peopleDetails.name || 'Unknown'
        }} />
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characterStats.map((stat, index) => (
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
