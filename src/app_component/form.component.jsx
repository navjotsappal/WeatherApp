import React, { useState }  from 'react'
import './form.style.css'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const Form = props => {

    const [country, selectCountry] = useState('');
    const [region, selectRegion] = useState('');

    return (
        <div className="container rounded-lg">
            
            <div className="row">
                <div className="col text-center">
                    <h1 className="title">Weather App</h1>
                    {props.error_city_country_region? retrieveError(props.error_message) : null}
                </div>
               
            </div>

            <form onSubmit={props.loadWeather} > 

                <div className="form-group pt-2">
                  <label className="color-icon" htmlFor="country">Select Country</label>
                  <CountryDropdown
                       className="form-control"
                       name="country"
                       defaultOptionLabel="Select a country"
                       value={country}
                       onChange={(val) => selectCountry(val)} 
                  />
                  
                </div>

               <div className="form-group pt-2">
                  <label className="color-icon" htmlFor="region">Select Province</label>
                  <RegionDropdown
                      blankOptionLabel="No country selected"
                      defaultOptionLabel="Now select a province"
                      className="form-control"
                      name="region"
                      country={country}
                      value={region}
                      onChange={(val) => selectRegion(val)} 
                  />
               </div>

               <div className="form-group pt-2">
                    <label className="color-icon" htmlFor="city">Enter City</label>
                     <input type="text" className="form-control" placeholder="e.g. New York" name="city" autoComplete="off"/>
                </div>

                
                <div className="form-group pt-2 text-center">
                    <button className="btn">Get Weather Details for Today</button>
                </div>
                              
       
            </form>
        </div>
    )
};

function retrieveError(error_message){
    return (
        <div className="alert alert-danger mx-5" role="alert">
           {error_message}
        </div>
    ); 
}
export default Form;
