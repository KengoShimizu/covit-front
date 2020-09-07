import React, { useState } from 'react';
// library
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
// components
import MapPopup from '../molecules/MapPopup';
import Loading from './../molecules/Loading';


interface MapPopupProps {
  setPopupIsOpen: any;
  loading: boolean;
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
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const curLocMarker = L.icon({
    iconUrl: '/current_location_pin.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 61]
  });

  const shopMarker = L.icon({
    iconUrl: '/shop_pin.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 61]
  });

  const createDate = () => {
    const dd = new Date();
    const YYYY = dd.getFullYear();
    const MM = dd.getMonth() + 1;
    const DD = dd.getDate();
    return YYYY + "/" + MM + "/" + DD;
  }

  const handleMarkerClick = (data: any) => {
    const strage = localStorage.getItem('histories');
    const strage_date = localStorage.getItem('histories_date');
    if (strage && strage_date){
      const arr = JSON.parse(strage)
      const arr_date = JSON.parse(strage_date)
      if (arr[0] !== data.id) {
        arr.unshift(data.id)
        arr_date.unshift(createDate())
        localStorage.setItem('histories', JSON.stringify(arr));
        localStorage.setItem('histories_date', JSON.stringify(arr_date));
      }
    } else {
      localStorage.setItem('histories', JSON.stringify([data.id]));
      localStorage.setItem('histories_date', JSON.stringify([createDate()]));
    }
    props.setMapCenter({ lat: data.latitude, lng: data.longitude });
    props.fetchStepsData(data.shop);
    setPopupIsOpen(true);
    props.setPopupIsOpen(true);
  }

  return (
    <div className="map-container">
      <Map
        center={props.mapCenter}
        zoom={props.zoom}
        style={{ height: '100%' }}
        zoomControl={false}
        onMoveend={(e: any) => {
          const latlng = e.target.getCenter();
          props.setLastLat(latlng.lat);
          props.setLastLng(latlng.lng);
          props.setZoom(e.target.getZoom());
          props.setMapCenter({ lat: latlng.lat, lng: latlng.lng });
        }}
        onMovestart={() => {
          setPopupIsOpen(false);
          props.setPopupIsOpen(false);
        }}
        onClick={() => {
          setPopupIsOpen(false);
          props.setPopupIsOpen(false);
        }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={5} />
        <Marker position={props.curLoc} icon={curLocMarker} />

        {props.loading ? <Loading /> :
          props.coordinations.map((data: any, i: number) => (
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