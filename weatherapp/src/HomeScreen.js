import React, { useEffect, useState } from 'react';
import './Style.css';
import axios from 'axios';


function HomeScreen() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: '/Images/clouds.png'
    })
    const [name, setName] = useState(' ');
    const [error, setError] = useState(' ');

    //   useEffect(()=>{

    //   },[])

    const handleClick = () => {
        if (name !== " ") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8b976814520e8853cdbb1a48b3913f1f&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagePath = ' ';
                    if (res.data.weather[0].main == "Clouds") {
                        imagePath = " /Images/clouds.png"
                    } else if (res.data.weather[0].main == "Clear") {
                        imagePath = " /Images/clear.png"
                    } else if (res.data.weather[0].main == "Rain") {
                        imagePath = " /Images/rain.png"
                    } else if (res.data.weather[0].main == "Drizzle") {
                        imagePath = " /Images/drizzle.png"
                    } else if (res.data.weather[0].main == "Mist") {
                        imagePath = " /Images/mist.png"
                    } else if (res.data.weather[0].main == "Snow") {
                        imagePath = " /Images/snow.png"
                    } else {
                        imagePath = " /Images/clouds.png"
                    }
                    console.log(res.data)
                    setData({
                        ...data, celcius: res.data.main.temp, name: res.data.name,
                        humidity: res.data.main.humidity, speed: res.data.wind.speed,
                        image: imagePath
                    })
                    setError('');
                })
                .catch(err => {
                    if (err.response.status == 404) {
                        setError("Invalid City Name")
                    } else {
                        setError('');
                    }
                    console.log(err)
                });
        }
    }
    return (
        <div className='container '>
            <div className='row'>
                <div className='weather'>
                    <div className='search'>
                        <input type='text' placeholder='Search City' onChange={e => setName(e.target.value)} />
                        <button><img src='\Images\search.png' onClick={handleClick} alt='' /></button>
                    </div>
                    <div className="error">
                        <p>{error}</p>
                    </div>

                    <div className='cloud'>
                        <img src={data.image} alt='' className='climg' />
                        <h1>{Math.round(data.celcius)}°C</h1>
                        <h2>{data.name}</h2>

                        <div className='details'>
                            <div className='show'>
                                <img src='\Images\humidity.png' />
                                <div className='humidity'>
                                    <p>{Math.round(data.humidity)}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>

                            <div className='show'>
                                <img src='\Images\wind.png' />
                                <div className='Wind'>
                                    <p>{Math.round(data.speed)} km/h</p>
                                    <p>Wind</p>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>


    );
}

export default HomeScreen;



