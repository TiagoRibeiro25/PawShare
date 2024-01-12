/**
 * @typedef City
 * @property {string} name - The city name.
 * @property {string} country - The country name.
 */

/**
 * Array of cities with their names and countries.
 * @type {City[]}
 */
const cities = require("cities.json").map((city) => {
	return { name: city.name, country: city.country };
});

/**
 * Retrieves cities from a specific country.
 * @param {string} country - The country name.
 * @returns {string[]} - An array of cities from the specified country.
 */
function getCitiesFromCountry(country) {
	return cities.filter((city) => city.country === country).map((city) => city.name);
}

module.exports = { cities, getCitiesFromCountry };
