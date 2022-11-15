import React, { useState, useEffect } from "react";
import axios from 'axios';

// const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`
// const API_key = `609a086982ec17d868d2e1ad77d48185`
const useGeoLocation = () => {
  //   const [latitude, setLatitude] = useState('');
  //   const [longitude, setLongitude] = useState('')
  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLatitude(position.coords.latitude)
  //       setLongitude(position.coords.longitude)
  //     })
  // let finalAPIEndpoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`;
  // axios.get(finalAPIEndpoint)
  //   .then((response) => {
  //     console.log(response.data)
  //   })

  //   }, [])
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {


    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeoLocation;