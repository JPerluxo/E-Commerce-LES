import locations from './locations.json';

const useLocationOptions = () => {
    const countries = Object.keys(locations);
  
    const getStatesByCountry = (country) => {
      return locations[country] ? Object.keys(locations[country]) : [];
    };
  
    const getCitiesByState = (country, state) => {
      return locations[country] && locations[country][state] ? locations[country][state] : [];
    };
  
    return {
      countries,
      getStatesByCountry,
      getCitiesByState,
    };
  }

export default useLocationOptions;
