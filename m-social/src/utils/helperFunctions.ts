import { City } from "@/types/CommonTypes";

export const transformCitiesList = (cities: City[] | undefined) => {
  if (!cities) return [];
  const parsedCities = cities.map((city) => ({
    ...city,
    population: Number(city.population),
  }));

  const filteredCities = parsedCities.filter((city) => city.population > 50000);

  if (filteredCities.length === 0) return [];

  const largestCity = filteredCities.reduce((max, city) =>
    city.population > max.population ? city : max
  );

  const otherCities = filteredCities.filter(
    (city) => city.city !== largestCity.city
  );

  const sortedCities = otherCities.sort((a, b) => a.city.localeCompare(b.city));

  const finalArray = [largestCity, ...sortedCities].map((city) => {
    return {
      value: city.city,
      label: city.city,
    };
  });

  return finalArray;
};

export const updateNameInLocalStorage = (newName: string) => {
  localStorage.setItem("formName", newName);
  window.dispatchEvent(new Event("localStorageUpdated"));
};

export const getDataFromStorage = (key: string): string | undefined => {
  if (typeof window !== "undefined") {
    const storedName = localStorage.getItem("formName");
    if (storedName) {
      return storedName;
    }
  }
  return undefined;
};
