
import React from 'react'

const CountryList = ({ countryList }) => {

    if (countryList.length > 10){   
        return (
            <div>
                <p>Too many matches, specify anonther filter</p>
            </div>
        )
    }
    
    if (countryList.length >= 2) {
        return (
            <ul>
                {countryList.map(country => <li key={country.name}> {country.name}</li>)}
            </ul>
        )
    }
    if (countryList.length === 1) {
        const country = countryList[0]
        return (
            <div>
                <h1>{country.name}</h1>  
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name} ><b>{language.name}</b></li>)}
                </ul>
                <img src={country.flag} alt="Country Flag" ></img>
            </div>
        )
    }
    if (countryList.length === 0) {
        return (
            <p>no results found</p>
        )
    }

}

export default CountryList