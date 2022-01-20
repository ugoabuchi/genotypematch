import AsyncStorage from "@react-native-async-storage/async-storage";
import { localDataMergeAsyncType, localDataRetrieveAsyncType, localDataSaveAsyncType, localDataRemoveAsyncType } from "../types";


export const saveLocalData = async ({ key, valueinJson, yourCallBack }: localDataSaveAsyncType) => {
    const value = JSON.stringify(valueinJson);

    await AsyncStorage.setItem(key, value, (error) => {

        if (yourCallBack != undefined) {
            if (error) {
                yourCallBack(error);
            }
            else {
                yourCallBack(null);
            }
        }
    });

}


export const retrieveLocalData = async ({ key, yourCallBack }: localDataRetrieveAsyncType) => {

    await AsyncStorage.getItem(key, (error, result) => {
        if (error) {
            yourCallBack(error, null);
        }
        else {
            yourCallBack(null, JSON.parse(result));
        }
    });
}

export const mergeLocalData = async ({ key, valueinJson, yourCallBack }: localDataMergeAsyncType) => {
    const value = JSON.stringify(valueinJson);

    await AsyncStorage.mergeItem(key, value, (error) => {
        if (yourCallBack != undefined) {
            if (error) {
                yourCallBack(error);
            }
            else {
                yourCallBack(null);
            }
        }
    });

}

export const removeLocalData = async ({ key, yourCallBack }: localDataRemoveAsyncType) => {

    await AsyncStorage.removeItem(key, (error) => {
        if (error) {
            yourCallBack(error);
        }
        else {
            yourCallBack(null);
        }
    });
}
