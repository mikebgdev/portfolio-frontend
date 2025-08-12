import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import themeReducer from './themeSlice';
import languageReducer from './languageSlice';
import authReducer from './authSlice';
import { portfolioApi } from '../services/portfolioApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'language', 'auth'],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  language: languageReducer,
  auth: authReducer,
  [portfolioApi.reducerPath]: portfolioApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(portfolioApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;