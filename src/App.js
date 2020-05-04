import React from 'react';
import './App.css';
import Weather from './app_component/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './app_component/form.component';


const API_KEY = "409437452277f77d45bf756ec32f1a6b";
//API Call to api.openweathermap.org/data/2.5/weather?q=London,uk


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       city: '',
       country: '',
       error_message: undefined,
       icon: undefined,
       main: undefined,
       celsius: undefined,
       temp_max: undefined,
       temp_min: undefined,
       description: "",

       temp_feels_like:undefined,
       humidity: undefined,
       pressure:undefined,
       wind:undefined,
       clouds:undefined,
       rain:undefined,
       sunrise:undefined,
       sunset:undefined,
      /* visibility:undefined,
       precipitation:undefined, */

       error_city_country_region: undefined
      

    };


    this.weatherIcon={
      thunderstorm: "wi-thunderstorm",
      drizzle:"wi-sleet",
      rain: "wi-storm-showers",
      snow: "wi-snow",
      atmosphere: "wi-fog",
      clear: "wi-day-sunny",
      clouds: "wi-day-fog"
    };
   
  }

  /*
   componentDidMount(){
     this.getWeather();
   }

  */

 getWeather = async (e) => {

  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const region = e.target.elements.region.value;
  

  if(city && country && region){

   try {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
   
    const response = await api_call.json();
     


     this.setState(
       {
        city: `${response.name}`,
        celsius: this.calculateCelsius(response.main.temp),
        temp_max: this.calculateCelsius(response.main.temp_max),
        temp_min: this.calculateCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error_city_country_region: false,
        error_message: "",
        temp_feels_like:this.calculateCelsius(response.main.feels_like),
        humidity: response.main.humidity,
        pressure:response.main.pressure,
        wind:this.calculateKilometerPerHour(response.wind.speed),
        clouds:response.clouds.all,
        sunrise:this.calculateTime(response.sys.sunrise),
        sunset:this.calculateTime(response.sys.sunset),
       /* visibility:response.visibility.value,
        precipitation:response.precipitation.value */
       }
      );
      this.getWeatherIcon(response.weather[0].id);

    }
   catch (err){
        this.setState({
          error_message:`Sorry. We are unable to fetch weather details for ${city} city at this moment!`, 
          error_city_country_region:true
        })
      }

  }

  else{
      this.setState({
        error_city_country_region:true, 
        error_message:"Please enter values in all the fields !"
      });
  }

};
 

  getWeatherIcon(range){
    switch(true){
      case range>=200 && range <=232:
        this.setState({icon: this.weatherIcon.thunderstorm})
        break;
      case range>=300 && range <=321:
        this.setState({icon: this.weatherIcon.drizzle})
        break;
      case range>=500 && range <=531:
        this.setState({icon: this.weatherIcon.rain})
        break;
      case range>=600 && range <=622:
        this.setState({icon: this.weatherIcon.snow})
        break;
      case range>=701 && range <=781:
        this.setState({icon: this.weatherIcon.atmosphere})
        break;
      case range === 800:
        this.setState({icon: this.weatherIcon.clear})
        break;
      case range>=801 && range <=804:
        this.setState({icon: this.weatherIcon.clouds})
        break;
      default:
        this.setState({icon: this.weatherIcon.clouds})
        

    }

  }
  
  calculateCelsius(temp){
      let celsius= Math.floor(temp-273.15)
      return celsius
  }
  calculateKilometerPerHour(windSpeed){
    let miles_hour = Math.floor(windSpeed * 3.6)
    return miles_hour
  }

  calculateTime(timestamp){
    let date = new Date(timestamp * 1000)
    let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return time
  }

  render() {
    return (
      <div className="App">
        <Form loadWeather = {this.getWeather} error_city_country_region ={this.state.error_city_country_region} error_message={this.state.error_message}/>
        
        {this.state.error_city_country_region === undefined || this.state.error_city_country_region === true 
                ? 
                null 
                :
                <Weather 
                   city ={this.state.city} 
                   country ={this.state.country} 
                   celsius={Math.floor(this.state.celsius)}    
                   temp_min ={Math.floor(this.state.temp_min)}
                   temp_max= {Math.floor(this.state.temp_max)}
                   description={this.state.description}
                   weatherIcon= {this.state.icon}
                   temp_feels_like={Math.floor(this.state.temp_feels_like)}
                   humidity= {Math.floor(this.state.humidity)}
                   pressure={Math.floor(this.state.pressure)}
                   wind={Math.floor(this.state.wind)}
                   clouds={Math.floor(this.state.clouds)}
                   sunrise={this.state.sunrise}
                   sunset={this.state.sunset}
                  /* visibility={this.state.visibility}
                  precipitation={this.state.precipitation} */
                />      
            }
        
        
      </div>
    )
  }
}

export default App;
