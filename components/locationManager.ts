import { Platform } from "react-native";
//import { PERMISSIONS, request, check, RESULTS } from "react-native-permissions";
import { BLOCKED_RESPONSE } from '../constants/constants';

export const requestGeoLocationPermission = (yourCallBack: (status: boolean | string) => void) => {

    /* try {
         request(
             Platform.select({
                 android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                 ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
             })
         ).then(res => {
             if (res == RESULTS.GRANTED) {
                 //Location is permitted
                 yourCallBack(true);
             }
             else if (res == RESULTS.BLOCKED) {
                 //Location is is not permitted
                 yourCallBack(BLOCKED_RESPONSE);
             }
             else if (res == RESULTS.UNAVAILABLE) {
                 //Location is is not permitted
                 yourCallBack(BLOCKED_RESPONSE);
             }
             else {
                 //Location is is not permitted
                 yourCallBack(false);
             }
         });
     }
     catch (err) {
         //location permission request error
         yourCallBack(false);
     }
 
 */

}

export const checkGeoLocationPermission = (yourCallBack: (status: boolean | string) => void) => {
    /* try {
         check(
             Platform.select({
                 android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                 ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
             })
         ).then(res => {
             if (res == RESULTS.GRANTED) {
                 //Location is already permitted
                 yourCallBack(true);
             }
             else if (res == RESULTS.BLOCKED) {
                 //Location is is not permitted
                 yourCallBack(BLOCKED_RESPONSE);
             }
             else if (res == RESULTS.UNAVAILABLE) {
                 //Location is is not permitted
                 yourCallBack(BLOCKED_RESPONSE);
             }
             else {
                 //Location is disabled
                 yourCallBack(false);
             }
         });
     }
     catch (err) {
         //location permission check error
         yourCallBack(false);
     }
     */
}