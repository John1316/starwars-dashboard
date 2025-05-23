import React from "react";
import {
    Card,
    CardBody,
    Chip,
    Spinner
} from "@nextui-org/react";
import {
    Calendar,
    Clapperboard,
    User,
    Users,
} from "lucide-react";
import useStarWarsArrayData from "@/hooks/Global/useStarWarsArrayData";
import { starWarsUtils } from "@/utils/starWarsUtils";
import { useRouter } from "next/navigation";
import EntityName from "../../Records/EntityName";



export default function FilmModal({
    film,
}: FilmModalProps) {
    const { relatedData } = useStarWarsArrayData(film)
    const { formatSectionTitle } = starWarsUtils;

    const router = useRouter()


    const filmStats = [
        {
            icon: <Clapperboard className="text-lightsaber-blue" size={20} />,
            label: "Episode",
            value: film?.episode_id ? `Episode ${film.episode_id}` : '',
        },
        {
            icon: <Calendar className="text-lightsaber-blue" size={20} />,
            label: "Release Date",
            value: film?.release_date ? new Date(film.release_date).toLocaleDateString() : '',
        },
        {
            icon: <User className="text-lightsaber-blue" size={20} />,
            label: "Director",
            value: film?.director || '',
        },
        {
            icon: <Users className="text-lightsaber-blue" size={20} />,
            label: "Producers",
            value: film?.producer || '',
        },
    ];

    if (!film) return null;

    return (
        <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filmStats.map((stat, index) => (
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
    );
}