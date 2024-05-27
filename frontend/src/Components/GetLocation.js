import React from 'react'
import { useGeolocated } from 'react-geolocated';

export default function GetLocation() {
  
    const { coords, isGeolocationAvailable, isGeolocationEnabled, error } = useGeolocated({
        positionOptions: {
          enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
      });
  
        if(isGeolocationAvailable)
        {
            if(isGeolocationEnabled)
                {
                    return coords
                }
            else{
                return error
            }
        }
        else{
            return isGeolocationAvailable;
        }
    
}
