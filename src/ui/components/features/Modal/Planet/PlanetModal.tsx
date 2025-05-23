import React from "react";
import {
    Card,
    CardBody,
    Chip,
    Spinner
} from "@nextui-org/react";
import {
    CircleDot,
    Droplets,
    Globe2,
    Mountain,
    Scale,
    Thermometer,
    Timer,
    Users,
} from "lucide-react";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";
import { starWarsUtils } from "@/utils/starWarsUtils";
import { formatNumber } from "@/functions/DateHelpers";
import StatsCard from "../../Records/StatsCard";
import EntityName from "../../Records/EntityName";



export default function PlanetModal({
    planet,
}: PlanetModalProps) {
    const {relatedData} = useStarWarsArrayData(planet)
    const { formatSectionTitle } = starWarsUtils;

    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);


    const planetStats = [
        {
            icon: <Timer className="text-lightsaber-blue" size={20} />,
            label: "Rotation Period",
            value: planet?.rotation_period ? `${planet.rotation_period} hours` : 'Unknown',
        },
        {
            icon: <CircleDot className="text-lightsaber-blue" size={20} />,
            label: "Orbital Period",
            value: planet?.orbital_period ? `${planet.orbital_period} days` : 'Unknown',
        },
        {
            icon: <Globe2 className="text-lightsaber-blue" size={20} />,
            label: "Diameter",
            value: planet?.diameter ? `${formatNumber(planet.diameter)} km` : 'Unknown',
        },
        {
            icon: <Scale className="text-lightsaber-blue" size={20} />,
            label: "Gravity",
            value: planet?.gravity || 'Unknown',
        },
        {
            icon: <Thermometer className="text-lightsaber-blue" size={20} />,
            label: "Climate",
            value: planet?.climate || 'Unknown',
        },
        {
            icon: <Mountain className="text-lightsaber-blue" size={20} />,
            label: "Terrain",
            value: planet?.terrain || 'Unknown',
        },
        {
            icon: <Droplets className="text-lightsaber-blue" size={20} />,
            label: "Surface Water",
            value: planet?.surface_water ? `${planet.surface_water}%` : 'Unknown',
        },
        {
            icon: <Users className="text-lightsaber-blue" size={20} />,
            label: "Population",
            value: planet?.population ? formatNumber(planet.population) : 'Unknown',
        },
    ];


    if (!planet) return null;

    return (
        <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {planetStats.map((stat, index) => (
                    <StatsCard key={index} stat={stat} />
                ))}
            </div>
            {/* Environment Summary */}
            <Card className="bg-[var(--space-gray)] border-[var(--rebel-yellow)] border">
                <CardBody>
                    <h3 className="text-lg font-semibold mb-2 text-white">Environmental Summary</h3>
                    <div className="flex flex-wrap gap-2">
                        <Chip color="primary" variant="bordered">
                            Climate: {planet.climate}
                        </Chip>
                        <Chip color="primary" variant="bordered">
                            Terrain: {planet.terrain}
                        </Chip>
                        <Chip color="primary" variant="bordered">
                            Surface Water: {planet.surface_water}%
                        </Chip>
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
                                    {data.map((planet: any) => (
                                        <EntityName entity={planet} keyName={key} key={planet.id} />
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