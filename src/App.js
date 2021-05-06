import React, { Component } from 'react';
import AllCountry from './allcountry';
import Detail from './detail';
import './App.css';


class App extends Component {
  state= {
    showLoading:true,
    showDetail:false,
    countries:[],
    searchedCountries:[],
    filter:"all",
    regions:["all"],
    countriesToRender:[],
    countryToDetail:{},
    borderCountryNames:[],
  }
  
  render(){
      return (
          <div className="App">
            <header className="header">
              <h1 className="heading-1">Where is the world?</h1>
              <button className="btn-dark-mode"
                onClick ={(e)=>{
                  let currentTheme = document.documentElement.getAttribute("data-theme")
                  let switchToTheme = currentTheme === "dark" ? "light" : "dark";
                  document.documentElement.setAttribute("data-theme", switchToTheme);
                  let currentText = document.querySelector(".color-mode").textContent;
                  document.querySelector(".color-mode").textContent = currentText === "Dark Mode" ? "Light Mode" : "Dark Mode";
                }}
              > <span className="icofont-moon"> </span> <span className="color-mode">Dark Mode</span></button>
            </header>
            {
            this.state.showLoading? 
              <h1>Page is loading... please refresh if necessary</h1> 
              : this.state.showDetail ? 
                <Detail 
                  countryToDetail={this.state.countryToDetail}
                  borderCountryNames={this.state.borderCountryNames}
                  gotoDetailCountry={this.gotoDetailCountry.bind(this)}
                  backtoSummaryPage={this.backtoSummaryPage.bind(this)}
                /> 
                :<AllCountry 
                  countriesToRender={this.state.countriesToRender}
                  searchCountriesbyName={this.searchCountriesbyName.bind(this)} 
                  filterCountriesbyRegion={this.filterCountriesbyRegion.bind(this)}
                  gotoDetailCountry={this.gotoDetailCountry.bind(this)}
                  regions={this.state.regions}
                />
            }
          </div> 
      );
  }

  componentDidMount(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => {
      this.setState({countries: data});
      if (this.state.countries.length > 0) {
        this.setState({showLoading:false});
        this.setState({searchedCountries:this.state.countries});
        this.setState({countriesToRender:this.state.countries});
      const regions = data.reduce(reducer, ["all"])
      function reducer(acc, curr) {
         if(acc.includes(curr.region)) return acc;
         else {acc.push(curr.region)
          return acc;
          }
        }
      this.setState({regions:regions});  
      }
    })
    .catch(() => this.setState({showLoading:true})) 


  }


  searchCountriesbyName(input){
    const lowcaseInput =input.toLowerCase(); 
    const searchedCountries = this.state.countries.filter(country =>
      country.name.toLowerCase().includes(lowcaseInput));

    const regions = searchedCountries.reduce(reducer, ["all"])
    function reducer(acc, curr) {
     if(acc.includes(curr.region)) return acc;
     else {acc.push(curr.region)
      return acc;
      }
    }
    this.setState({regions:regions});
    this.setState({searchedCountries:searchedCountries}, 
      ()=>this.filterCountriesbyRegion(this.state.filter));

    // if(filter==="all") {
    //   this.setState({countriesToRender:searchedCountries});}
    // else{
    // const filteredCountries = searchedCountries.filter(country =>
    //   country.region === filter);
    // this.setState({countriesToRender:filteredCountries});
    // }
  }

  filterCountriesbyRegion(region){
    this.setState({filter:region});
    if(region==="all") {
      this.setState({countriesToRender:this.state.searchedCountries});}
    else{
    const filteredCountries = this.state.searchedCountries.filter(country =>
      country.region === region);
    this.setState({countriesToRender:filteredCountries});
    }
  }

  getCountryNamebyAlpha3Code(alpha3Code){

    const searchedCountries = this.state.countries.filter(country =>
      country.alpha3Code === alpha3Code);
 
    return searchedCountries[0].name;
    // return 1;
    }
  
  gotoDetailCountry(name){

    const searchedCountries = this.state.countries.filter(country =>
    country.name === name);
    this.setState({countryToDetail:searchedCountries[0]});
    const borderCountryCodes = searchedCountries[0].borders;
    const borderCountryNames = borderCountryCodes.map(code => this.getCountryNamebyAlpha3Code(code))
    this.setState({borderCountryNames:borderCountryNames});
    this.setState({showDetail:true})
  } 
  
  backtoSummaryPage(){
    // this.setState({countriesToRender:this.state.countries});
    this.setState({showDetail:false});
  }
}



export default App;
