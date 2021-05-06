
import React, { Component } from 'react';
class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const {country, gotoDetailCountry} =this.props; 
        return ( 
            <div className='country-intro-card' onClick ={()=>{
                gotoDetailCountry(country.name);
            }}> 
                <img src={country.flag} alt={country.flag} className="flagAtAllPage"></img>
                <div className="country-intro-info">
                    <h2 className="heading-2"> {country.name}</h2>
                    <p>Population: <span className="text-1">{country.population.toLocaleString()}</span></p>
                    <p>Region: <span className="text-1">{country.region}</span></p>
                    <p>Capital: <span className="text-1">{country.capital}</span></p>
                </div>
            </div>
         );
    }
}
 
export default Country;