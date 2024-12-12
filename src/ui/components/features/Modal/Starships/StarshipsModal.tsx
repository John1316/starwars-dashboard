import React from "react";
import {
    Card,
    CardBody,
    Chip,
    Spinner
} from "@nextui-org/react";
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
    Sparkles
} from "lucide-react";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";
import { starWarsUtils } from "@/utils/starWarsUtils";
import { formatNumber } from "@/functions/DateHelpers";



export default function StarshipModal({
    starship,
}: StarshipModalProps) {
    const {relatedData} = useStarWarsArrayData(starship)
    const { formatSectionTitle } = starWarsUtils;

    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);


    const starshipStats = [
        {
            icon: <BadgeInfo className="text-lightsaber-blue" size={20} />,
            label: "Class",
            value: starship?.starship_class ? starWarsUtils.capitalize(starship.starship_class) : 'Unknown',
        },
        {
            icon: <Factory className="text-lightsaber-blue" size={20} />,
            label: "Manufacturer",
            value: starship?.manufacturer || 'Unknown',
        },
        {
            icon: <Coins className="text-lightsaber-blue" size={20} />,
            label: "Cost",
            value: starship?.cost_in_credits ? `${formatNumber(starship.cost_in_credits)} credits` : 'Unknown',
        },
        {
            icon: <Timer className="text-lightsaber-blue" size={20} />,
            label: "Length",
            value: starship?.length ? `${formatNumber(starship.length)} meters` : 'Unknown',
        },
    ];

    const technicalStats = [
        {
            icon: <Gauge className="text-lightsaber-blue" size={20} />,
            label: "Max Speed",
            value: starship?.max_atmosphering_speed ? `${starship.max_atmosphering_speed} km/h` : 'Unknown',
        },
        {
            icon: <Sparkles className="text-lightsaber-blue" size={20} />,
            label: "Hyperdrive Rating",
            value: starship?.hyperdrive_rating || 'Unknown',
        },
        {
            icon: <Rocket className="text-lightsaber-blue" size={20} />,
            label: "MGLT",
            value: starship?.MGLT ? `${starship.MGLT} MGLT` : 'Unknown',
        },
        {
            icon: <Clock className="text-lightsaber-blue" size={20} />,
            label: "Consumables",
            value: starship?.consumables || 'Unknown',
        },
    ];

    const capacityStats = [
        {
            icon: <Users className="text-lightsaber-blue" size={20} />,
            label: "Crew",
            value: starship?.crew || 'Unknown',
        },
        {
            icon: <Users className="text-lightsaber-blue" size={20} />,
            label: "Passengers",
            value: starship?.passengers ? formatNumber(starship.passengers) : 'Unknown',
        },
        {
            icon: <Box className="text-lightsaber-blue" size={20} />,
            label: "Cargo Capacity",
            value: starship?.cargo_capacity ? `${formatNumber(starship.cargo_capacity)} kg` : 'Unknown',
        },
    ];


    if (!starship) return null;

    return (
        <div className="space-y-6">
            {/* Basic Info */}

            <div className="space-y-2">
                <p className="text-white">Model: {starship.model}</p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {starshipStats.map((stat, index) => (
                    <Card key={index} className="bg-[var(--space-gray)] border-[var(--rebel-yellow)] border">
                        <CardBody className="flex flex-row items-center gap-3">
                            {stat.icon}
                            <div>
                                <p className="text-sm text-white">{stat.label}</p>
                                <p className="text-[var(--rebel-yellow)] font-semibold">
                                    {stat.value}
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Technical Specifications */}
            <Card className="bg-[var(--space-gray)] border-[var(--rebel-yellow)] border">
                <CardBody>
                    <h3 className="text-lg font-semibold mb-4 text-white">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                        {technicalStats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-3">
                                {stat.icon}
                                <div>
                                    <p className="text-sm text-white">{stat.label}</p>
                                    <p className="text-[var(--rebel-yellow)] font-semibold">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/* Capacity Information */}
            <Card className="bg-[var(--space-gray)] border-[var(--rebel-yellow)] border">
                <CardBody>
                    <h3 className="text-lg font-semibold mb-4 text-white">Capacity Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {capacityStats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-3">
                                {stat.icon}
                                <div>
                                    <p className="text-sm text-white">{stat.label}</p>
                                    <p className="text-[var(--rebel-yellow)] font-semibold">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/* Dynamic Related Data Sections */}
            {Object.entries(relatedData).map(([key, { data, isLoading, error }]) => (
                <div key={key}>
                    {(() => {
                        if (isLoading) {
                            return <div className="flex justify-center p-4">
                                <Spinner color="primary" />
                            </div>
                        }
                        if(error){
                            return <div className="bg-red-500 text-white  p-2">
                            {error}
                        </div>
                        }
                        if (data.length) {
                            return <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {formatSectionTitle(key)}:
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {data.map((name, index) => (
                                        <div
                                            key={index}
                                            className="p-2 rounded border border-[var(--rebel-yellow)]"
                                        >
                                            <p className="text-[var(--rebel-yellow)]">{name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        return ""
                    })()}
                </div>
            ))}
        </div>
    );
}