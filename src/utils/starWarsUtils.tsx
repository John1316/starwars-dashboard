// Utility functions for Star Wars data
 const starWarsUtils = {
    capitalize: (str: string): string => 
        str ? str.charAt(0).toUpperCase() + str.slice(1) : '',
        
    formatSectionTitle: (key: string): string =>
        key.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
            
    // Add more specific formatters for different types of Star Wars data
    formatResourceType: (url: string): string => {
        const match = url.match(/\/api\/(\w+)\//);
        return match ? match[1] : 'unknown';
    },

    getResourceIcon: (resourceType: string): string => {
        const icons: { [key: string]: string } = {
            people: '👤',
            films: '🎬',
            starships: '🚀',
            vehicles: '🚗',
            species: '👽',
            planets: '🌍'
        };
        return icons[resourceType] || '❓';
    }
};
export{
    starWarsUtils
}