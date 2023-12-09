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
          }
      }
    },
    {
      token:null,
      error:null
    }
  );

  React.useEffect(() => {  
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getToken();
      } catch (e) {
        // Restoring token failed

      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
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
              dispatch({ type: 'LOGIN', token: request?.data?.token });
            }
        } catch (error) {
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