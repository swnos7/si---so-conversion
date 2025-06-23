import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { company } from '@/data/content';

const LiveMap = () => {
  const position = [company.coordinates.lat, company.coordinates.lng];

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div className="p-1">
            <p className="font-bold text-base">{company.name}</p>
            <p className="text-sm">{company.address}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveMap;