"use client"

import React, { useState } from 'react';
import VehicleSelector from '../components/VehicleSelector';
import styles from './page.module.css';
import { store } from "../Redux/store";
import { Provider } from "react-redux";

import MapWithRouteVisualization from '../components/MapWithRouteVisualization';

const vehicles = [
  { name: 'Car', type: 'Sedan', color: 'Red' },
  { name: 'Truck', type: 'Pickup', color: 'Blue' },
  { name: 'Motorcycle', type: 'Sport', color: 'Black' },
  // Add more vehicles as needed
];

const IndexPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    console.log('Selected Vehicle:', vehicle);
    // Perform actions with the selected vehicle here
  };

  return (
    <main className={styles.main}>
      <h1>Welcome to the Toll Calculator</h1>
      {!selectedVehicle ? (
        <div>
         
          <VehicleSelector vehicles={vehicles} onSelect={handleVehicleSelect} />
        </div>
      ) : (
        <div>
          <h2>Selected Vehicle:</h2>
          <p>{selectedVehicle.name}</p>
          {/* Display more details of the selected vehicle */}
        </div>
      )}
      <Provider store={store}>
      <MapWithRouteVisualization />
    </Provider>
    </main>
  );
};

export default IndexPage;
