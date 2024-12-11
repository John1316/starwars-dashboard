// components/Modals/CharacterDetailModal.tsx
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Spinner,
    Card,
    CardBody,
    Chip,
} from "@nextui-org/react";
import { getFilmsList } from "@/api/services/film.service";
import AxiosInstance from "@/api/AxiosInstance";
import {
    Calendar,
    Eye,
    Palette,
    Ruler,
    UserCircle,
    Weight,
} from "lucide-react";

interface Character {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    skin_color: string;
    films: string[];
    [key: string]: any;
}

interface CharacterDetailModalProps {
    character: Character | null;
}

export default function CharacterModal({
    character,
}: CharacterDetailModalProps) {
    const [filmNames, setFilmNames] = useState<string[]>([]);
    const [starshipsNames, setStarshipsNames] = useState<string[]>([]);
    const [speciesNames, setSpeciesNames] = useState<string[]>([]);
    const [isLoadingStarships, setIsLoadingStarships] = useState(true);
    const [isLoadingFilms, setIsLoadingFilms] = useState(true);
    const [isLoadingSpecies, setIsLoadingSpecies] = useState(true);

    useEffect(() => {
        const fetchStarshipsNames = async () => {
            if (character?.starships && character.starships.length > 0) {
                setIsLoadingStarships(true);
                try {
                    // Fetch all films in parallel
                    const starshipsPromises = character.starships.map(
                        (starshipsUrl: any) => AxiosInstance("get", starshipsUrl)
                    );

                    // Wait for all requests to complete
                    const starshipsData = await Promise.all(starshipsPromises);
                    console.log(
                        "🚀 ~ fetchStarshipsNames ~ starshipsData:",
                        starshipsData
                    );

                    // Extract just the titles from the starships objects
                    const starshipsTitles = starshipsData.map((film) => film.name);
                    console.log(
                        "🚀 ~ fetchStarshipsNames ~ starshipsTitles:",
                        starshipsTitles
                    );

                    setStarshipsNames(starshipsTitles);
                } catch (error) {
                    console.error("Error fetching starships names:", error);
                } finally {
                    setIsLoadingStarships(false);
                }
            }
        };

        if (character?.starships?.length) {
            fetchStarshipsNames();
        }
    }, [character?.starships]);
    useEffect(() => {
        const fetchFilmNames = async () => {
            if (character?.films && character.films.length > 0) {
                setIsLoadingFilms(true);
                try {
                    // Fetch all films in parallel
                    const filmPromises = character.films.map((filmUrl) =>
                        AxiosInstance("get", filmUrl)
                    );

                    // Wait for all requests to complete
                    const filmsData = await Promise.all(filmPromises);
                    console.log("🚀 ~ fetchFilmNames ~ filmsData:", filmsData);

                    // Extract just the titles from the film objects
                    const filmTitles = filmsData.map((film) => film.title);
                    console.log("🚀 ~ fetchFilmNames ~ filmTitles:", filmTitles);

                    setFilmNames(filmTitles);
                } catch (error) {
                    console.error("Error fetching film names:", error);
                } finally {
                    setIsLoadingFilms(false);
                }
            }
        };

        if (character?.films?.length) {
            fetchFilmNames();
        }
    }, [character?.films]);
    useEffect(() => {
        const fetchSpeciesNames = async () => {
            if (character?.species && character.species.length > 0) {
                try {
                    // Fetch all films in parallel
                    const speciesUrlPromises = character.species.map((speciesUrl: string) => AxiosInstance("get", speciesUrl));

                    // Wait for all requests to complete
                    const speciesData = await Promise.all(speciesUrlPromises);
                    console.log("🚀 ~ fetchFilmNames ~ speciesData:", speciesData);

                    // Extract just the titles from the film objects
                    const speciesTitles = speciesData.map((species) => species.title);
                    console.log("🚀 ~ fetchFilmNames ~ speciesData:", speciesTitles);

                    setSpeciesNames(speciesTitles);
                } catch (error) {
                    console.error("Error fetching species names:", error);
                } finally {
                    setIsLoadingSpecies(false);
                }
                
            }
            setIsLoadingSpecies(false);
        };

            fetchSpeciesNames();
            
    }, [character?.species]);

    if (!character) return null;
    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    const characterStats = [
        {
            icon: <Ruler className="text-lightsaber-blue" size={20} />,
            label: "Height",
            value: `${character.height} cm`,
        },
        {
            icon: <Weight className="text-lightsaber-blue" size={20} />,
            label: "Mass",
            value: `${character.mass} kg`,
        },
        {
            icon: <Calendar className="text-lightsaber-blue" size={20} />,
            label: "Birth Year",
            value: character.birth_year,
        },
        {
            icon: <Eye className="text-lightsaber-blue" size={20} />,
            label: "Eye Color",
            value: capitalize(character.eye_color),
        },
        {
            icon: <UserCircle className="text-lightsaber-blue" size={20} />,
            label: "Gender",
            value: capitalize(character.gender),
        },
        {
            icon: <Palette className="text-lightsaber-blue" size={20} />,
            label: "Hair Color",
            value: capitalize(character.hair_color),
        },
    ];
    return (
        <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characterStats.map((stat, index) => (
                    <Card key={index} className="border-[var(--lightsaber-blue)] border">
                        <CardBody className="flex flex-row items-center gap-3">
                            {stat.icon}
                            <div>
                                <p className="text-sm">{stat.label}</p>
                                <p className="text-[var(--lightsaber-blue)] font-semibold">
                                    {stat.value}
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Physical Traits</h3>
                <div className="flex flex-wrap gap-2">
                    <Chip color="primary" variant="bordered">
                        Skin Color: {capitalize(character.skin_color)}
                    </Chip>
                    <Chip color="primary" variant="bordered">
                        Hair Color: {capitalize(character.hair_color)}
                    </Chip>
                </div>
            </div>

            {/* Films Section */}
            
            {(() => {
                if(isLoadingFilms){
                    return <div className="flex justify-center p-4">
                        <Spinner color="primary" />
                    </div>
                }
                if(filmNames.length){
                    return <div>
                    <h3 className="text-xl font-semibold text-[var(--lightsaber-blue)] mb-2">
                        Appeared In Films :
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {filmNames.map((filmName, index) => (
                            <div
                                key={index}
                                className="p-2 rounded border border-[var(--lightsaber-blue)]"
                            >
                                <p className="text-[var(--lightsaber-blue)]">{filmName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                }
                return ""
            })()}
            {/* starships Section */}

            

                {(() => {
                if(isLoadingStarships){
                    return <div className="flex justify-center p-4">
                        <Spinner color="primary" />
                    </div>
                }
                if(starshipsNames.length){
                    return <div>
                    <h3 className="text-xl font-semibold text-[var(--lightsaber-blue)] mb-2">
                        Appeared In starships :
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {starshipsNames.map((starshipName, index) => (
                            <div
                                key={index}
                                className="p-2 rounded border border-[var(--lightsaber-blue)]"
                            >
                                <p className="text-[var(--lightsaber-blue)]">{starshipName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                }
                return ""
            })()}

            {(() => {
                if(isLoadingSpecies){
                    return <div className="flex justify-center p-4">
                        <Spinner color="primary" />
                    </div>
                }
                if(speciesNames.length){
                    return <div>
                    <h3 className="text-xl font-semibold text-[var(--lightsaber-blue)] mb-2">
                        Appeared In Species :
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {speciesNames.map((speciesName, index) => (
                            <div
                                key={index}
                                className="p-2 rounded border border-[var(--lightsaber-blue)]"
                            >
                                <p className="text-[var(--lightsaber-blue)]">{speciesName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                }
                return ""
            })()}
            
        </div>
    );
}
