import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, TextInput, Button,ScrollView, Platform } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../componets/BackButton';
import DropDown from '../../componets/DropDown';
import { GetFireTypes,GetFireStatus, GetAlarmLevels } from '../../api/FireTypes';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiService from '../../api/config';
import { AuthContext } from '../../context/Auth';



const UpdateIncident = ({route}) => {
    const {state} = React.useContext(AuthContext);
    const { item } = route.params;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [type, setType] = React.useState('');
    const [openType, setOpenType] = useState(false);
    const [fireTypes, setFireTypes] = useState([]);
    const [openStatus, setOpenStatus] = useState(false);
    const [fireStatus, setFireStatus] = useState([]);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openAlarmLevel, setOpenAlarmLevel] = useState(false);
    const [alarmLevel, setAlarmLevel] = useState([]);
    const [selectedAlarmLevel, setSelectedAlarmLevel] = useState('');

    const [responder, setResponder] = React.useState({
        commander: state?.user?.firstname + ' ' + state?.user?.lastname,
        date: new Date(),
        team:'',
        involved:'',
    });

    const [incident, setIncident] = React.useState({
        type:'',
        owner:'',
        fatality:'',
        damages:'',
        injured:'',
        numHouseAndEstablishment:'',
        numFamilyAffected:'',
        numTrucksResponded:'',
    });

    const [status, setStatus] = React.useState({
        timeArrival:'',
        fireOut:'',
        status:'pending',
    });

    const handleBackButton = () => {
        navigation.goBack();
    }
    const handleSelectType = (item) => {
       setIncident({...incident, type:item()})
    }

    const handleSelectStatus = (item) => {
        setStatus({...status, status:item()})
    }

    const handleSelectAlarmLevel = (item) => {
        setSelectedAlarmLevel(item())
    
    }

    useEffect(() => {
         const handGetDetails = async () => {
            setLoading(true);
            try {
                const res = await apiService.get(`/get-incident-details?id=${item.id}`);
                if(res?.data?.incident){
                    setIncident(res.data.incident);
                }
                if(res?.data?.responder){
                    const { commander,  ...rest} = res?.data?.responder;

                    const  date = new Date(res.data.responder.date)
                    if(state?.user){
                        setResponder({...rest, commander: state?.user?.firstname + ' ' + state?.user?.lastname, date:date});
                    }else{
                         setResponder({...rest, date:date});
                    }
                   
                }
                if(res?.data?.status){
                    setStatus(res.data.status);
                }
                if(res?.data?.alarm_level_id){
                    setSelectedAlarmLevel(res.data.alarm_level_id);
                }

               
                setLoading(false)
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        handGetDetails();
        const SelectItems = async () => {
            const fireTypes = await GetFireTypes();
            const fireStatus = await GetFireStatus();
            const alarmLevel = await GetAlarmLevels();
            setFireTypes(fireTypes);
            setFireStatus(fireStatus)
            setAlarmLevel(alarmLevel);
            
        }
        SelectItems();
    },[])

    const handleDateTime = (event, date) => {
        setResponder({...responder, date:date});
        if(Platform.OS === 'android'){
            setShow(!true);
        }
    }

    const datepicker = () => {
        setMode('date');
        setShow(true);
    }

    const timepicker = () => {
        setMode('time');
        setShow(true);
    }

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const payload = {
                incident: JSON.stringify(incident),
                responder: JSON.stringify(responder),
                status: JSON.stringify(status),
                id:item.id,
                alarm_level_id:selectedAlarmLevel
            }
            console.log('___payload',payload);
            const res = await apiService.post('/update-incident', payload);
            if(res?.data?.incident){
                setIncident(res.data.incident);
            }
            if(res?.data?.responder){
                const date = new Date(res.data.responder.date);
                setResponder({...res.data.responder, date:date});
            }
            if(res?.data?.status){
                setStatus(res.data.status);
                setSelectedAlarmLevel(res.data.alarm_level_id);
            }
          
            setLoading(false);
        } catch (error) {
            console.log(error.response.data);
            setLoading(false);
        }
    }
    return (
     <SafeAreaProvider>
     <View style={{ flex: 1, paddingTop: insets.top, paddingLeft:18, overflow:'scroll'}}>
        <BackButton
            handleBackButton={handleBackButton}
        />
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.header}>
                        Update Incident
                    </Text>
                </View>
                {loading ? 
                <Text>Loading...</Text>
                :
                <>
                    <View style={{marginTop:10, marginBottom:10}}>
                        <Text style={styles.subheader}>
                            Incident Information
                        </Text>
                        <Text style={styles.label}>
                            Type of Occupancy
                        </Text>
                            {fireTypes?.length > 0 &&
                            <DropDown
                                open={openType}
                                setOpen={setOpenType}
                                value={incident.type}
                                setValue={handleSelectType}
                                items={fireTypes}
                                autoScroll={true}
                                style={styles.select}
                            />}
                        <Text style={styles.label}>
                            Name of owner
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={incident.owner}
                            onChangeText={(e)=>setIncident({...incident, owner:e})}
                        />
                        <Text style={styles.label}>
                            Fatality
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={incident.fatality}
                            onChangeText={(e)=>setIncident({...incident, fatality:e})}
                        />
                        <Text style={styles.label}>
                            Estimated damages
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={incident.damages}
                            onChangeText={(e)=>setIncident({...incident, damages:e})}
                        />
                        <Text style={styles.label}>
                            Injured
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={incident.injured}
                            onChangeText={(e)=>setIncident({...incident, injured:e})}
                        />
                        <Text style={styles.label}>
                            Number of House/Establishment
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={incident.numHouseAndEstablishment}
                            onChangeText={(e)=>setIncident({...incident, numHouseAndEstablishment:e})}
                        />
                        <Text style={styles.label}>
                            Number of Family Affected
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={incident.numFamilyAffected}
                            onChangeText={(e)=>setIncident({...incident, numFamilyAffected:e})}

                        />
                    
                        <Text style={styles.label}>
                        Number of Trucks Responded
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={incident.numTrucksResponded}
                            onChangeText={(e)=>setIncident({...incident, numTrucksResponded:e})}

                        />
                    </View>
                    <View style={{marginTop:10, marginBottom:10}}>
                        <Text style={styles.subheader}>
                            Responder
                        </Text>
                            <Text style={styles.label}>
                                Ground Commander
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={responder.commander}
                                // onChangeText={(e)=>setResponder({...responder, commander:e})}
                                editable={false}
                            />
                        
                            <Text style={styles.label}>
                                Time/Date Reported
                            </Text>
                            <View style={{flex:1, display:'flex', flexDirection:'row', marginBottom:8}}>
                                {Platform.OS === 'ios' ?
                                <>
                                <DateTimePicker 
                                    value={responder.date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleDateTime}
                                />
                                <DateTimePicker 
                                    value={responder.date}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleDateTime}
                                />
                                </>
                                :
                                <>
                                <Button
                                    onPress={datepicker}
                                    title={responder.date.toLocaleDateString()}
                                />
                                <Button
                                    onPress={timepicker}
                                    title={responder.date.toLocaleTimeString()}
                                />
                                </>
                                }
                                { show && 
                                    <DateTimePicker value={responder.date}
                                        mode={mode}
                                        display="default"
                                        onChange={handleDateTime} 
                                    />
                                }
                            </View>
                            <Text style={styles.label}>
                                Reponding Team
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={responder.team}
                                onChangeText={(e)=>setResponder({...responder, team:e})}
                            />
                            <Text style={styles.label}>
                                Involved
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={responder.involved}
                                onChangeText={(e)=>setResponder({...responder, involved:e})}
                            />
                    </View>
                    <View style={{marginTop:10, marginBottom:10}}>
                        <Text style={styles.subheader}>
                            Status
                        </Text>
                            <Text style={styles.label}>
                                Time of Arrival
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={status.timeArrival}
                                onChangeText={(e)=>setStatus({...status, timeArrival:e})}
                            />
                            <Text style={styles.label}>
                                Involved
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={status.fireOut}
                                onChangeText={(e)=>setStatus({...status, fireOut:e})}
                            />
                            <Text style={styles.label}>
                                Status
                            </Text>
                            {fireStatus?.length > 0 &&
                                <DropDown
                                    open={openStatus}
                                    setOpen={setOpenStatus}
                                    value={status.status}
                                    setValue={handleSelectStatus}
                                    items={fireStatus}
                                    autoScroll={true}
                                    style={styles.select}
                                />
                            }
                            <Text style={styles.label}>
                                Alarm Level
                            </Text>
                            {alarmLevel?.length > 0 &&
                                <DropDown
                                    open={openAlarmLevel}
                                    setOpen={setOpenAlarmLevel}
                                    value={selectedAlarmLevel}
                                    setValue={handleSelectAlarmLevel}
                                    items={alarmLevel}
                                    autoScroll={true}
                                    style={styles.select}
                                />
                            }
                    </View>
                </>
                }
                <View style={{marginBottom:10, backgroundColor: '#FB9246'}}>
                <Button
                    title="Update"
                    onPress={handleUpdate}
                />
                </View>
                 
            </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  )
}

export default UpdateIncident

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,  
        marginBottom:20,
        width:'90%',
        height:'90%',
        scrollable: true,
        overflow: 'scroll',
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
        margin:15,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subheader:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15
    },
    label:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 8,
    },
    select: {
        minHeight: 40,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255)',
        marginBottom: 10,
    }
})