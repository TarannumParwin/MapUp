// VehicleSelector.js
import React, { useState } from 'react';

const VehicleSelector = ({ vehicles, onSelect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    onSelect(vehicle);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Select a Vehicle:</h2>
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <button
          onClick={toggleDropdown}
          style={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          {selectedVehicle ? selectedVehicle.name : 'Select'}
          <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            ▼ {/* Dropdown arrow */}
          </span>
        </button>
        {showDropdown && (
          <ul
            style={{
              position: 'absolute',
              top: 'calc(100% + 5px)',
              right: '0',
              zIndex: '10',
              width: '200px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderTop: 'none',
              borderRadius: '0 0 4px 4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              listStyleType: 'none',
              padding: '0',
              margin: '0',
              textAlign: 'left',
            }}
          >
            {vehicles.map((vehicle, index) => (
              <li key={index} style={{ padding: '10px' }}>
                <button
                  onClick={() => handleSelect(vehicle)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
                >
                  {vehicle.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedVehicle && (
        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Selected Vehicle:</h3>
          <p><strong>Name:</strong> {selectedVehicle.name}</p>
          <p><strong>Model:</strong> {selectedVehicle.model}</p>
          <p><strong>Year:</strong> {selectedVehicle.year}</p>
          {/* Add more details or properties of the selected vehicle */}
        </div>
      )}
    </div>
  );
};

export default VehicleSelector;
