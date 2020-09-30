import React, { useEffect } from 'react';
import { useState } from 'react';
import CountryList from './components/CountryList'
import axios from 'axios'

function App() {

  const [ countryList, setCountryList] = useState([])
  const [ newCountry, setNewCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryList(response.data)
      })
  }, [])

  const handleSetNewCountry = (event) => {
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          find countries <input value={newCountry} onChange={handleSetNewCountry}/>
        </div>
      </form>
      <CountryList countryList={countryList.filter(country => country.name.toLowerCase().includes(newCountry.toLowerCase()))} />
    </div>
  );
}

export default App;
