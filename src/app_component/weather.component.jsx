import React from 'react'
import './weather.style.css'
import {GiThermometerHot,GiSunrise,GiSunset} from "react-icons/gi"
import {FaTemperatureHigh,FaMixcloud,FaTemperatureLow} from "react-icons/fa"
import {WiHumidity} from "react-icons/wi"
import {RiWindyLine} from "react-icons/ri"
import {BsCloud} from "react-icons/bs"


const Weather = (props) => {
    return (
        <div className="container rounded-lg text-center">
            <div className="pt-2">
                
                <div className="row">
                    <div className="col-12 color-icon">
                        <h1>{props.city}</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                          <h5 className="py-4">
                            <i className={`wi ${props.weatherIcon} display-1 color-icon`}></i>
                         </h5>
                    </div>
                </div>
                       

                <div className="row">
                    <div className="col-12">
                       {
                         retrieveTemperature(props.celsius)
                       }
                    </div>
                </div> 

                <div className="row">
                    <div className="col-12">
                        {retrieveDescription(props.description)}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4 py-2">
                        {retrieveFeelsLikeTemperature(props.temp_feels_like) }
                    </div>

                    <div className="col-sm-4 py-2">
                       { retrieveMinTemperature(props.temp_min) }
                    </div>

                    <div className="col-sm-4 py-2">
                      { retrieveMaxTemperature(props.temp_max) }
                    </div>

                </div>
                
                <div className="row">
                    <div className="col-sm-4 py-2">
                        {retrieveHumidity(props.humidity)}
                    </div>

                    <div className="col-sm-4 py-2">
                        {retrievePressure(props.pressure)}
                    </div>

                    <div className="col-sm-4 py-2">
                        {retrieveWindSpeed(props.wind)}
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-4 py-2">
                        {retrieveClouds(props.clouds)}
                    </div>

                    <div className="col-sm-4 py-2">
                        {retrieveSunrise(props.sunrise)}
                    </div>

                    <div className="col-sm-4 py-2">
                        {retrieveSunset(props.sunset)}
                    </div>

                </div>
              

            </div>
        </div>
    );
}

function retrieveSunset(sunset){
    let temp= undefined
    if(sunset !== false){
        temp = <small>Sunset <strong>{sunset}</strong> </small>
    }else{
        temp = <small className="text-danger">No data</small>
    }

    return(
        <div className="py-2 card border-light box-shadow-card">
           <h5>
                 <GiSunset className="color-icon"/>
                 <span className="px-2">
                     {temp}  
                 </span>
            </h5>
        </div>
);
}

function retrieveSunrise(sunrise){
    let temp= undefined
    if(sunrise !== false){
        temp = <small>Sunrise <strong>{sunrise}</strong> </small>
    }else{
        temp = <small className="text-danger">No data</small>
    }
    return(
        <div className="py-2 card border-light box-shadow-card">
           <h5>
                 <GiSunrise className="color-icon"/>
                 <span className="px-2">
                     {temp}
                 </span>
            </h5>
        </div>
);
}

function retrieveClouds(cloud){
    let temp = undefined
   
    if(cloud !== false){
        temp = <small>Cloud <strong>{cloud}</strong>  %</small>
    }else{
        temp = <small className="text-danger">No data</small>
    }
    return(
        <div className="py-2 card border-light box-shadow-card">
           <h5>
                 <BsCloud className="color-icon"/>
                 <span className="px-2">
                    {temp}
                 </span>
            </h5>
        </div>
);
}

function retrieveWindSpeed(wind){
    let temp = undefined
   
    if(wind !== false){
        temp = <small>Wind <strong>{wind}</strong> km/h</small>
    }else{
        temp = <small className="text-danger">No data</small>
    }
    return(
        <div className="py-2 card border-light box-shadow-card">
           <h5>
                 <RiWindyLine className="color-icon"/>
                 <span className="px-2">
                     {temp}
                 </span>
            </h5>
        </div>
);
}

function retrievePressure(pressure){
    pressure=Math.floor(pressure/100)
    let temp = undefined
   
    if(pressure !== false){
        temp = <small>Pressure <strong>{pressure}</strong> mb</small>
    }else{
        temp = <small className="text-danger">No data</small>
    }

    return(
        <div className="py-2 card border-light box-shadow-card">
           <h5>
                 <FaMixcloud className="color-icon"/>
                 <span className="px-2">
                     {temp}
                 </span>
            </h5>
        </div>
    );
}

function retrieveHumidity(humidity){
   
    let temp = undefined
    if(humidity !== false){
        temp = <small>Humidity <strong>{humidity}</strong> %</small>
    }else{
        temp = <small className="text-danger">No data</small>
    }

    return(
        <div className="py-2 card border-light box-shadow-card">
           <h5>
                 <WiHumidity className="color-icon" />
                 <span className="px-2">
                     {temp}
                 </span>
            </h5>
        </div>
);

}

function retrieveDescription(description){
    if(description){
        return(
        <h4 className="py-2 color-icon">{description}</h4>
        );
    }
    else{
        return(
            <h5> 
                <small className="text-danger">Unable to retrieve description!</small>
            </h5>
        );
    }
}

function retrieveTemperature(celsius){
    if(celsius!==false){
        return(
                <h1 className="py-2 color-icon">
                    {celsius}&deg;<small>c</small>
                </h1>
        );
    }
    else{
        return(
            <div className="py-2">       
                <h5> <small className="text-danger">Unable to retrieve temperature!</small></h5>
           </div>
        );
    }
}

function retrieveMinTemperature(temp_min){
    let temp = undefined

    if(temp_min !==false){
        temp = <small className="px-2">Min <strong>{temp_min}&deg;</strong>c</small>
    }else{
        temp = <small className="px-2 text-danger">No data</small>
    }

    return(
                <div className="py-2 card border-light box-shadow-card">
                     <h5>
                        <FaTemperatureLow className="color-icon"/>
                        {temp}
                     </h5>
                   
                </div>
        );
        
       
        
    
}
function retrieveMaxTemperature(temp_max){
    let temp = undefined

    if(temp_max !==false){
        temp = <small className="px-2">Max <strong>{temp_max}&deg;</strong>c</small>
    }else{
        temp = <small className="px-2 text-danger">No data</small>
    }

    return(
       
                <div className="py-2 card border-light box-shadow-card">
                     <h5>
                        <FaTemperatureHigh className="color-icon"/>
                        {temp}
                     </h5>
                   
                </div>
         
        );
        
       
        
    
}

function retrieveFeelsLikeTemperature(temp_feels_like){
    let temp = undefined

    if(temp_feels_like !==false){
        temp = <small className="px-2">Feels like <strong>{temp_feels_like}&deg;</strong>c</small>
    }else{
        temp = <small className="px-2 text-danger">No data</small>
    }

    return(
                <div className="py-2 card border-light box-shadow-card">
                     <h5>
                        <GiThermometerHot className="color-icon"/>
                        {temp}
                     </h5>
                   
                </div>
         
        );
        
       
        
    
}

export default Weather;
