import AxiosInstance from '@/api/AxiosInstance';
import { extractSwapiId } from '@/utils/ExtractIds';
import React, { useEffect, useState } from 'react'

export default function useStarWarsArrayData(entity: any | null) {
    const [relatedData, setRelatedData] = useState<StarWarsDataState>({});

    useEffect(() => {
        if (!entity) return;

        // Reset state when entity changes
        setRelatedData({});

        // Find all array properties that contain SWAPI URLs
        const swapiProperties = Object.entries(entity)
            .filter(([_, value]) => 
                Array.isArray(value) && 
                value.length > 0 && 
                typeof value[0] === 'string' && 
                value[0].includes('swapi.dev/api/')  // Specific to Star Wars API
            );

        swapiProperties.forEach(([key, urls]: any) => {
            const fetchData = async () => {
                // Set initial loading state
                setRelatedData(prev => ({
                    ...prev,
                    [key]: { data: [], isLoading: true }
                }));

                try {
                    const promises = urls.map((url: string) => 
                        AxiosInstance("get", url)
                    );
                    const results = await Promise.all(promises);
                    
                    // Extract the main identifier (name or title) from the results
                    const names = results.map((item: any) => {
                        // Different SWAPI endpoints use different identifiers
                        return {
                            name: item.name || item.title || item.model || 'Unknown', 
                            id: extractSwapiId(item.url)
                        };
                    });

                    setRelatedData(prev => ({
                        ...prev,
                        [key]: { 
                            data: names, 
                            isLoading: false,
                            error: undefined 
                        }
                    }));
                } catch (error) {
                    console.error(`Error fetching ${key} data:`, error);
                    setRelatedData(prev => ({
                        ...prev,
                        [key]: { 
                            data: [], 
                            isLoading: false,
                            error: `Error fetching ${key} data` 
                        }
                    }));
                }
            };

            fetchData();
        });
    }, [entity]);

    return { relatedData };
}
