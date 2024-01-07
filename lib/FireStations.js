// STATIC LIST OF FIRESTATIONS IN CDO

import apiService from "../api/config"

export const FireStations = async () => {
    try {
         const res = await apiService.get('/firestations');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

