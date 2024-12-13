"use client";

import { getVehicleListDetails } from "@/api/services/vehicle.service";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";
import DashboardLayout from "@/layouts/DashboardLayout";
import EntityName from "@/ui/components/features/Records/EntityName";
import StatsCard from "@/ui/components/features/Records/StatsCard";
import { starWarsUtils } from "@/utils/starWarsUtils";
import { Spinner } from "@nextui-org/react";
import {
  Ruler,
  Gauge,
  Users,
  Box,
  Clock,
  CreditCard,
  Factory,
  Truck,
  CaseSensitive,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const vehicleId = useSearchParams().get("id");
  const [vehicleDetails, setVehicleDetails] = useState<Vehicle | null>(null);
  const { formatSectionTitle } = starWarsUtils;

  // Move the hook call to the component level
  const { relatedData } = useStarWarsArrayData(vehicleDetails);

  useEffect(() => {
    async function fetchVehicleDetails() {
      if (vehicleId) {
        const res = await getVehicleListDetails(vehicleId);
        setVehicleDetails(res);
      }
    }

    fetchVehicleDetails();
  }, [vehicleId]);

  if (!vehicleDetails) return null;

  const vehicleStats = [
    {
      icon: <CreditCard className="text-lightsaber-blue" size={20} />,
      label: "Cost",
      value: `${
        vehicleDetails.cost_in_credits.toLocaleString() || "Unknown"
      }  credits`,
    },
    {
      icon: <Ruler className="text-lightsaber-blue" size={20} />,
      label: "Length",
      value: `${vehicleDetails.length} meters`,
    },
    {
      icon: <Gauge className="text-lightsaber-blue" size={20} />,
      label: "Max Speed",
      value: `${vehicleDetails.max_atmosphering_speed} km/h`,
    },
    {
      icon: <Users className="text-lightsaber-blue" size={20} />,
      label: "Crew/Passengers",
      value: `${vehicleDetails.crew}/${vehicleDetails.passengers}`,
    },
    {
      icon: <Box className="text-lightsaber-blue" size={20} />,
      label: "Cargo Capacity",
      value: `${Number(vehicleDetails.cargo_capacity).toLocaleString()} kg`,
    },
    {
      icon: <Clock className="text-lightsaber-blue" size={20} />,
      label: "Consumables",
      value: vehicleDetails.consumables,
    },
    {
      icon: <Factory className="text-lightsaber-blue" size={20} />,
      label: "Manufacturer",
      value: vehicleDetails.manufacturer,
    },
    {
      icon: <Truck className="text-lightsaber-blue" size={20} />,
      label: "Vehicle Class",
      value: vehicleDetails.vehicle_class,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl text-white">Vehicle</h1>
          
        </div>
        <StatsCard stat={{
          icon: <CaseSensitive className="text-lightsaber-blue" size={20} />,
          label: 'Name',
          value: vehicleDetails.name || 'Unknown'
        }} />
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicleStats.map((stat, index) => (
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
