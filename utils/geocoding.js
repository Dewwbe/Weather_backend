import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAV7d1xSqiZ9DiFapyFn-6g51BaV4HIGM8';

export const getCityFromCoordinates = async (latitude, longitude) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

        const response = await axios.get(url);
        const results = response.data.results;

        if (!results || results.length === 0) {
            throw new Error('No results found for the given coordinates.');
        }

        // Extract the city name from the address components
        const addressComponents = results[0].address_components;
        const cityComponent = addressComponents.find((component) =>
            component.types.includes('locality')
        );

        if (!cityComponent) {
            throw new Error('City name not found in the address components.');
        }

        return cityComponent.long_name; // Return the city name
    } catch (error) {
        console.error('Error fetching city name:', error.message);
        throw error; // Re-throw the error for handling in the calling function
    }
};