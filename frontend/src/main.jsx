import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Questionnaire from './screens/Questionnaire.jsx';
import PredictScreen from './screens/PredictScreen.jsx';
import TreatmentScreen from './screens/TreatmentScreen.jsx';
import DermatologistScreen from './screens/DermatologistScreen.jsx';
import DiseasesScreen from './screens/DiseasesScreen.jsx';
import AllDermatologistsScreen from './screens/AllDermatologistsScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/predict" element={<PredictScreen />} />
        <Route path="/treatments/:id" element={<TreatmentScreen />} />
        <Route path="/diseases/:id" element={<DiseasesScreen />} />
        <Route
          path="/all-dermatologists"
          element={<AllDermatologistsScreen />}
        />
        <Route
          path="/dermatologist/doctorId"
          element={<DermatologistScreen />}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
