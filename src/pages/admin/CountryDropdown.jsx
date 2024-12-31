// src/CountryDropdown.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryNames = response.data.map(country => country.name.common);
        setCountries(countryNames);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries: {error.message}</p>;

  return (
    <select>
      {countries.map((country, index) => (
        <option key={index} value={country}>{country}</option>
      ))}
    </select>
  );
};

export default CountryDropdown;
