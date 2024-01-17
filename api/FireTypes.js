import apiService from "./config"

export const  GetFireTypes = async () => {
    try {
       const reponse = await apiService.get('/fire-types');
       let types = [
            {label:'Structural', value:'Structural',  labelStyle: {fontWeight: 'bold'}},
            {label:'Non-Structural', value:'Non-Structural', labelStyle: {fontWeight: 'bold'}},
            {label:'Vehicle', value:'Vehicular', labelStyle: {fontWeight: 'bold'}}
        ];
        reponse.data.map((item) => {
            if(item.type === 'Structural'){
                types.push({label:item.name, value:item.id, parent: 'Structural'})
            }
            if(item.type === 'Non-Structural'){
                types.push({label:item.name, value:item.id, parent: 'Non-Structural'})
            }
            if(item.type === 'Vehicular'){
                types.push({label:item.name, value:item.id, parent: 'Vehicular'})
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