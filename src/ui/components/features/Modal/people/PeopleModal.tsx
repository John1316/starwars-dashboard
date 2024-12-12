import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Chip,
    Spinner
} from "@nextui-org/react";
import AxiosInstance from "@/api/AxiosInstance";
import {
    Calendar,
    Eye,
    Palette,
    Ruler,
    UserCircle,
    Weight,
} from "lucide-react";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";

interface Character {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    skin_color: string;
    [key: string]: any;
}

interface CharacterDetailModalProps {
    character: Character | null;
}

interface RelatedDataState {
    [key: string]: {
        data: string[];
        isLoading: boolean;
    };
}

export default function CharacterModal({
    character,
}: CharacterDetailModalProps) {
    const {relatedData} = useStarWarsArrayData(character)
    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);


    const characterStats = [
        {
            icon: <Ruler className="text-lightsaber-blue" size={20} />,
            label: "Height",
            value: character?.height ? `${character.height} cm` : '',
        },
        {
            icon: <Weight className="text-lightsaber-blue" size={20} />,
            label: "Mass",
            value: character?.mass ? `${character.mass} kg` : '',
        },
        {
            icon: <Calendar className="text-lightsaber-blue" size={20} />,
            label: "Birth Year",
            value: character?.birth_year || '',
        },
        {
            icon: <Eye className="text-lightsaber-blue" size={20} />,
            label: "Eye Color",
            value: character?.eye_color ? capitalize(character.eye_color) : '',
        },
        {
            icon: <UserCircle className="text-lightsaber-blue" size={20} />,
            label: "Gender",
            value: character?.gender ? capitalize(character.gender) : '',
        },
        {
            icon: <Palette className="text-lightsaber-blue" size={20} />,
            label: "Hair Color",
            value: character?.hair_color ? capitalize(character.hair_color) : '',
        },
    ];

    if (!character) return null;

    return (
        <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characterStats.map((stat, index) => (
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

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Physical Traits</h3>
                <div className="flex flex-wrap gap-2">
                    <Chip color="primary" variant="bordered">
                        Skin Color: {capitalize(character.skin_color)}
                    </Chip>
                    <Chip color="primary" variant="bordered">
                        Hair Color: {capitalize(character.hair_color)}
                    </Chip>
                </div>
            </div>

            {/* Dynamic Related Data Sections */}
            {Object.entries(relatedData).map(([key, { data, isLoading }]) => (
                <div key={key}>
                    {(() => {
                        if (isLoading) {
                            return <div className="flex justify-center p-4">
                                <Spinner color="primary" />
                            </div>
                        }
                        if (data.length) {
                            return <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {capitalize(key.replace(/_/g, ' '))}:
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