import * as React from 'react';
import apiService from '../api/config';
import { setStorage } from '../lib/TokenHandler';
import { getToken } from '../lib/TokenHandler';
import { removeCreds } from '../lib/TokenHandler';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
   const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOGIN':
          return {
            ...prevState,
            token: action.token,
            error:action.error,
            user:action.user
          };
        case 'LOGOUT':
          return {
            ...prevState,
            token: action.token,
        };
        case 'RESTORE_TOKEN':
          return {
            ...prevState, 
            token: action.token,
            error:action.error,
            user:action.user
          }
      }
    },
    {
      token:null,
      error:null,
      user:null
    }
  );

  React.useEffect(() => {  
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getToken();
        const res = await apiService.get('/user');
        if(res?.data){
          await setStorage('user', JSON.stringify(res?.data));
          dispatch({ type: 'RESTORE_TOKEN', token: userToken, user:res?.data });
        }
      } catch (e) {
        // Restoring token failed

      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      Login: async (payload) => {
        let request 
        try {
             request = await apiService.post('/login', payload, {
            'Accept': 'application/json',
            });
            if(request?.data?.token){
              await setStorage('token',request?.data?.token);
              await setStorage('user', JSON.stringify(request?.data?.user));
              dispatch({ type: 'LOGIN', token: request?.data?.token, user:request?.data?.user });
            }
        } catch (error) {
          console.log(error);
           dispatch({ type: 'LOGIN', error: error });
          
        }
      
      },
      Logout: async () => {
        try {
          const request = await apiService.get('/logout');
          if(request){
            await removeCreds()
            dispatch({ type: 'LOGOUT', token:null });
            
          }
        } catch (error) {
           console.log('error logout', error);
        }
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={{...authContext, state}}>
        {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider