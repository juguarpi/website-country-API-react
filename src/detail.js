import React, { Component } from 'react';
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 

        const {countryToDetail,
            borderCountryNames, 
            gotoDetailCountry, 
            backtoSummaryPage}=this.props;        

        return ( 
            <div className ="container-detail">
                
                <div className="btn-back"
                 onClick={backtoSummaryPage}                >
                    <span>&#8592; </span> 
                    <span>Back</span>
                </div>

                <div className="country-detail-card">
                    <img src={countryToDetail.flag} alt="" className="flagAtDetailPage"></img>
                    <div className="country-detail-info">
                        <h2 className="heading-2"> {countryToDetail.name}</h2>
                        <div className="detail-information">
                            <div className='detail-information-1'>
                                <p>Native Name: <span className="text-1">{countryToDetail.nativeName}</span></p>
                                <p>Population: <span className="text-1">{countryToDetail.population.toLocaleString()}</span></p>
                                <p>Region: <span className="text-1">{countryToDetail.region}</span></p>
                                <p>Sub Region: <span className="text-1">{countryToDetail.subregion}</span></p>
                                <p>Capital: <span className="text-1">{countryToDetail.capital}</span></p>
                            </div>
                            <div className='detail-information-section-2'>
                                <p>Top Level Domain: <span className="text-1">{countryToDetail.topLevelDomain[0]}</span></p>
                                <p>Currencies: <span className="text-1">{countryToDetail.currencies[0].name}</span></p>
                                <p>Language: <span className="text-1">{countryToDetail.languages.map(lang => <span>{lang.name}, </span>)}</span></p>
                            </div>
                        </div>

                        <h3 className="heading-3"> Border Countries</h3>
                        <div className="border-countries"> 
                            {borderCountryNames.map(name => <div className="border-country" id={name} 
                            onClick ={()=>gotoDetailCountry(name)}
                            >{name}</div>)}
                        </div>
                    </div>
                </div> 
            </div>
         );
    }
}
 
export default Detail;