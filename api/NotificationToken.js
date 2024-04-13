import apiService from "./config";

export const setNotifTokenAPI = async (token) => {
    try {
        const res = await apiService.post('/set-device-token', {device_token: token});
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getNotifTokenAPI = async () => {
    try {
        const res = await apiService.get('/get-device-token');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}