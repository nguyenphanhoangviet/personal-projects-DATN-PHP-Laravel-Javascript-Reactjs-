import React from 'react';
import { Card } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Khởi tạo icon tùy chỉnh
const customIcon = new L.Icon({
  iconUrl: 'assets/images/icon-img/icon.png', 
  iconSize: [32, 32], // Kích thước của icon
  iconAnchor: [16, 32], // Điểm neo của icon (tâm nằm ở đáy)
  popupAnchor: [0, -32] // Điểm popup xuất hiện phía trên icon
});

export default function ContactMap() {
  const coordinates = [
    { lat: 10.853726, lng: 106.628350, label: 'Our Office' }
  ];

  return (
    <Card title="Contact Map" className="contact-map pb-70">
      <div style={{ height: '400px', width: '100%' }}>
        <MapContainer 
          center={[coordinates[0].lat, coordinates[0].lng]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }} 
          zoomControl={true} // Hiển thị điều khiển zoom
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates.map((coord, index) => (
            <Marker key={index} position={[coord.lat, coord.lng]} icon={customIcon}>
              <Popup>
                <strong>{coord.label}</strong> <br />
                Latitude: {coord.lat}, Longitude: {coord.lng}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
}
