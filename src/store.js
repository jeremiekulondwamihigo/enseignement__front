import { configureStore } from '@reduxjs/toolkit';
import anneeReducer, {anneeFetch } from './features/anneeSlice';

export const store = configureStore({
    reducer : {
      annee : anneeReducer
    }
  })
  
  store.dispatch(anneeFetch())
