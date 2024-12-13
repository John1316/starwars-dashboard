// Utility function to extract ID from SWAPI URL
export const extractSwapiId = (url: string): string | null => {
    try {
      // Remove trailing slash if present
      const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
      
      // Get the last segment of the URL
      const segments = cleanUrl.split('/');
      const id = segments[segments.length - 1];
      
      // Ensure the extracted value is a number
      if (!isNaN(Number(id))) {
        return id;
      }
      
      return null;
    } catch (error) {
      console.error('Error extracting SWAPI ID:', error);
      return null;
    }
  };