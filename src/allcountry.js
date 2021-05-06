import React, { Component } from 'react';
import Country from './country';


class AllCountry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
          }

    }
    render() { 
        let {countriesToRender, searchCountriesbyName, filterCountriesbyRegion, gotoDetailCountry, regions} = this.props; 

        return ( 
            <div className ="container-all">
                <div className="container-searh-bar">
                    <div className ="search-bar">
                        <span className="icofont-search-2 magnifier"></span>
                        <input type="text" className="search-input" placeholder="Search for a Country"
                            onChange ={(e)=>{
                             const input = e.target.value
                             searchCountriesbyName(input);
                         }}
                        /> 
                    </div>
                    <div className="filter-bar" onMouseLeave={(e)=>{
                         const regionList=document.querySelector('.region-list');
                         regionList.classList.remove("region-list--shown");
                    }}>
                        <div className ="filter-bar-innerbox" onClick={(e) =>{
                            const regionList=document.querySelector('.region-list');
                            regionList.classList.toggle("region-list--shown");
                        }} >
                            <span className="filterBarText">Filter By Region</span>
                            <span> &#9663;</span> 
                        </div>
                        <div className="region-list">
                            {regions.map(region=><div 
                            className="region" 
                            id ={region}
                            onClick = {(e)=>{
                                filterCountriesbyRegion(region);
                                const filterBarText = document.querySelector(".filterBarText");
                                if(region!="all") filterBarText.textContent=region;
                                else filterBarText.textContent="Filter By Region";
                                const regionList=document.querySelector('.region-list');
                                regionList.classList.remove("region-list--shown");
                            }}
                            >{region}</div>)}
                        </div>
                    </div>
                </div>

                <div className="container-countries">
                    {countriesToRender.map(country => <Country 
                        country={country}
                        gotoDetailCountry={gotoDetailCountry}/>)}
                </div>
            </div>    
            );
    }
}
 
export default AllCountry;


