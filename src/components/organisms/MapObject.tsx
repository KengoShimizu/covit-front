import React, { useState } from 'react';
// library
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import Cookies from 'universal-cookie';
// components
import MapPopup from '../molecules/MapPopup';


interface MapPopupProps {
  coordinations: any;
  steps: any;
  zoom: number;
  setZoom: any;
  clickedShop: any;
  mapCenter: any;
  curLoc: any;
  clickedShopUniqueStepsImages: any;
  fetchStepsData: any;
  setMapCenter: any;
  setLastLat: any;
  setLastLng: any;
}


const MapObject: React.FC<MapPopupProps> = (props: any) => {
  const cookies = new Cookies();
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const curLocMarker = L.icon({
    iconUrl: '/current_location_pin.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 30]
  });

  const shopMarker = L.icon({
    iconUrl: '/shop_pin.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 30]
  });

  const createDate = () => {
      const dd = new Date();
      const YYYY = dd.getFullYear();
      const MM = dd.getMonth()+1;
      const DD = dd.getDate();
      return YYYY + "/" + MM + "/" + DD;
  }

  const handleMarkerClick = (data: any) => {
    const c = cookies.get('histories');
    const c_d = cookies.get('histories_date');
    if(c && c_d){
      const cookies_array = c.split(',').map((item: string) => parseInt(item));
      const cookies_date_array = c_d.split(',');
      if(cookies_array[0] !== data.id){
        while(cookies_array.length > 99){
          cookies_array.pop();
          cookies_date_array.pop();
        }
        cookies.set('histories', `${data.id},` + cookies_array.join(','));
        cookies.set('histories_date', createDate() + ',' + cookies_date_array.join(','));
      }
    }
    else{
      cookies.set('histories', data.id);
      cookies.set('histories_date', createDate());
    }
    props.setMapCenter({ lat: data.latitude, lng: data.longitude });
    props.fetchStepsData(data.shop);
    setPopupIsOpen(true);
  }

  return (
    <div className="map-container">
      <Map 
        center={props.mapCenter} 
        zoom={props.zoom}
        style={{ height: '100%' }} 
        zoomControl={false}
        onMoveend={(e:any) => {
          const latlng = e.target.getCenter();
          props.setLastLat(latlng.lat);
          props.setLastLng(latlng.lng);
          props.setZoom(e.target.getZoom());
          props.setMapCenter({lat: latlng.lat, lng: latlng.lng});
        }}
        onMovestart={() => setPopupIsOpen(false)}
        onClick={() => setPopupIsOpen(false)}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={5}/>
        <Marker position={props.curLoc} icon={curLocMarker} />

        {props.coordinations.map((data: any, i: number) => (
          <Marker
            position={{ lat: data.latitude, lng: data.longitude }}
            icon={shopMarker}
            key={`shop${data.id}`}
            onClick={() => handleMarkerClick(data)} >
          </Marker>
        ))}

        {popupIsOpen && <MapPopup steps={props.steps} data={props.clickedShop} uniqueImgs={props.clickedShopUniqueStepsImages} />}
      </Map>
      <style jsx>{`
        .map-container{
          width: 100%;
          height: calc(${window.innerHeight}px - 40px);
          top: 40px;
          position: relative;
          background-color: #E8E6E2;
        }
      `}</style>
    </div>
  );
}

export default MapObject;