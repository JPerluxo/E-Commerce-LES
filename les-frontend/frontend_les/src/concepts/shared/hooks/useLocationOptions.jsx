import locations from './locations.json';

const useLocationOptions = () => {
    const countries = Object.keys(locations);
  
    const getStatesByCountry = (country) => {
      return locations[country] ? Object.keys(locations[country]).map(state => ({
        name: state,
        sigla: locations[country][state].sigla
      })) : [];
    };
  
    const getCitiesByState = (country, stateSigla) => {
      const state = Object.values(locations[country] || {}).find(state => state.sigla === stateSigla);
      return state ? state.cidades : [];
    };
  
    return {
      countries,
      getStatesByCountry,
      getCitiesByState,
    };
  }

export default useLocationOptions;
