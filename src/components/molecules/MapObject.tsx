import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export const MapObject: React.FC = () => {
    const [lat, setLat] = useState(35.6513297);
    const [lng, setLng] = useState(139.5832906);
    const [zoom, setZoom] = useState(13);

    navigator.geolocation.getCurrentPosition(
      pos => {
          setLat(pos.coords.latitude)
          setLng(pos.coords.longitude)
      },
      err => console.log(err)
    );

    const position = {lat: lat, lng: lng};

    return (
      <Map center={position} zoom={zoom} style={{ height: '100%' }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
}