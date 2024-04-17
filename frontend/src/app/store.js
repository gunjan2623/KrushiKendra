import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/car/goalSlice';

export const store =configureStore({
    immutableCheck: false,
    serializableCheck: false,
    reducer:{
        auth:authReducer,
        cars:goalReducer,
    },
})