import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { company } from '@/data/content';
import L from 'leaflet'; 


const customIcon = new L.Icon({
  iconUrl: '/icons/maphome.svg', // pode ser um arquivo local ou link externo
  iconSize: [80, 60], // tamanho do ícone (largura, altura)
  iconAnchor: [-49, 200], // ponto do ícone que ficará no ponto do mapa (meio base)
  popupAnchor: [89, -180], // ponto para abrir o popup em relação ao ícone
});


const LiveMap = () => {
  const position = [company.coordinates.lat, company.coordinates.lng];

  useEffect(() => {
    // Esconder attribution (se quiser)
    const attribution = document.querySelector('.leaflet-control-attribution');
    if (attribution) attribution.style.display = 'none';

    // Selecionar botões de zoom
    const zoomInBtn = document.querySelector('.leaflet-control-zoom-in');
    const zoomOutBtn = document.querySelector('.leaflet-control-zoom-out');

    // Aplicar estilos inline
    if (zoomInBtn) {
      zoomInBtn.style.backgroundColor = '#ca8a04'; // dourado
      zoomInBtn.style.color = 'white';
      zoomInBtn.style.borderRadius = '8px';
      zoomInBtn.style.border = 'none';
      zoomInBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
      zoomInBtn.style.fontSize = '18px';
      zoomInBtn.style.width = '36px';
      zoomInBtn.style.height = '36px';
      zoomInBtn.style.display = 'flex';
      zoomInBtn.style.justifyContent = 'center';
      zoomInBtn.style.alignItems = 'center';
      zoomInBtn.style.marginBottom = '10px'; // espaçamento entre os botões
    }

    if (zoomOutBtn) {
      zoomOutBtn.style.backgroundColor = '#ca8a04'; // dourado
      zoomOutBtn.style.color = 'white';
      zoomOutBtn.style.borderRadius = '8px';
      zoomOutBtn.style.border = 'none';
      zoomOutBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
      zoomOutBtn.style.fontSize = '18px';
      zoomOutBtn.style.width = '36px';
      zoomOutBtn.style.height = '36px';
      zoomOutBtn.style.display = 'flex';
      zoomOutBtn.style.justifyContent = 'center';
      zoomOutBtn.style.alignItems = 'center';
      zoomOutBtn.style.marginTop = '10px'; // espaçamento entre os botões
    }
  }, []);

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position} icon={customIcon}>
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
