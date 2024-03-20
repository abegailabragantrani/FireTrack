import apiService from "./config"

export const  GetFireTypes = async () => {
    try {
       const reponse = await apiService.get('/fire-types');
       let types = [];
        reponse.data.map((item) => {
            if(item.name === 'Structural'){
                types.push({label:item.name, value:item.id})
            }
            if(item.name === 'Non-Structural'){
                types.push({label:item.name, value:item.id})
            }
            if(item.name === 'Vehicular'){
                types.push({label:item.name, value:item.id})
            }
        })
        return types;
    } catch (error) {
        console.log(error);
    }
}

export const GetFireStatus = async () => {
    try {
        const res = await apiService.get('/fire-status');
        const status = res.data.map((item) => {
            return {label:item.status, value:item.id}
        })
        return status;
    } catch (error) {
        
    }
}

export const GetAlarmLevels = async () => {
    try {
        const res = await apiService.get('/alarm-levels');
        const levels = res.data.map((item) => {
            return {label:item.name, value:item.id}
        })
        return levels;
    } catch (error) {
        
    }
}