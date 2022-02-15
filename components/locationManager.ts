import * as Location from 'expo-location';
import { PermissionStatus } from 'expo-modules-core';
import { GOOGLE_API_KEY } from '../constants/constants';



export const requestGeoLocationPermission = async () : Promise<{
    status: boolean | string
}> => {
    
    try{

        const isServiceEnabled = await Location.hasServicesEnabledAsync();

        if (!isServiceEnabled) {

            return {
                status: "notEnabled"
            }
            
        }
        else{

            const locationVariable = await Location.requestForegroundPermissionsAsync();
        if(locationVariable.status === PermissionStatus.GRANTED){
            return {
                status: true
            }
        }
        else if ( locationVariable.canAskAgain == true && (locationVariable.status == PermissionStatus.UNDETERMINED || locationVariable.status == PermissionStatus.DENIED)){

            return {
                status: PermissionStatus.DENIED
            }
        }
        else {
            return {
                status: PermissionStatus.UNDETERMINED
            }
        }

        }
        
        
    }
    catch (err){

        return {
            status: PermissionStatus.DENIED
        }
     
}

}



export const getGeoLocationPermission = async () : Promise<{
    status: boolean | string
}> => {
    
    try{

        const isServiceEnabled = await Location.hasServicesEnabledAsync();

        if (!isServiceEnabled) {

            return {
                status: "notEnabled"
            }
            
        }
        else{

        const locationVariable = await Location.requestForegroundPermissionsAsync();
        if(locationVariable.status === PermissionStatus.GRANTED){
            return {
                status: true
            }
        }
        else if ( locationVariable.canAskAgain == true && (locationVariable.status == PermissionStatus.UNDETERMINED || locationVariable.status == PermissionStatus.DENIED)){

            return {
                status: PermissionStatus.DENIED
            }
        }
        else {
            return {
                status: PermissionStatus.UNDETERMINED
            }
        }
    }

        
    }
    catch (err){

        return {
            status: PermissionStatus.DENIED
        }
     
}

}


export const getGeoCoords = async () : Promise<{
    latitude: number, longitude: number
}> => {
    try{
            const { coords } = await Location.getCurrentPositionAsync({accuracy: 6});

                if (coords) {

                  const { latitude, longitude } = coords;


                      return {
                            latitude: latitude,
                            longitude: longitude
                      };

                }
                else{

                    return null
                }
        
        
    }
    catch (err){

        return null
     
}

}



export const getGeoCoordsLocationDetails = async (coords: {latitude: number, longitude: number}) : Promise<{
        country: string, 
        region: string, 
        street: string, 
        CountryCode: string
}> => {
    try{
                 //set Api key
                 //Location.setGoogleApiKey(GOOGLE_API_KEY);
                 
                  let response = await Location.reverseGeocodeAsync(coords);
                  for (let item of response) {
      
                    return {
                            country:  item.country, 
                            region:  item.region, 
                            street:  item.street, 
                            CountryCode:  item.isoCountryCode
                    }
        
                  }
        
        
    }
    catch (err){
        console.log(err)
        return null
     
}

}