import React, { useState, useEffect } from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { MapPopup } from '../molecules/MapPopup';
import curLocPin from './../../img/current_location_pin.svg';
import shopPin from './../../img/shop_pin.svg';

interface MapPopupProps {
  coordinations: any;
  steps: any;
  zoom: number;
  setZoom: any;
  isOpen: any;
  clickedShop: any;
  mapCenter: any;
  curLoc: any;
  clickedShopUniqueStepsImages: any;
  fetchStepsData: any;
  setMapCenter: any;
  setLastLat: any;
  setLastLng: any;
}


export const MapObject: React.FC<MapPopupProps> = (props: any) => {

  const curLocMarker = L.icon({
    iconUrl: curLocPin,
    iconSize: [55, 61],
    iconAnchor: [27, 30]
  });

  const shopMarker = L.icon({
    iconUrl: shopPin,
    iconSize: [55, 61],
    iconAnchor: [27, 30]
  });

  return (
    <div className="map-container">
      <Map 
        center={props.mapCenter} 
        zoom={props.zoom}
        style={{ height: '100%' }} 
        onMoveend={(e:any) => {
          const latlng = e.target.getCenter();
          props.setLastLat(latlng.lat);
          props.setLastLng(latlng.lng);
          props.setZoom(e.target.getZoom());
          props.setMapCenter({lat: latlng.lat, lng: latlng.lng});
        }}>
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
            onClick={() => {
              props.setMapCenter({ lat: data.latitude, lng: data.longitude });
              props.fetchStepsData(data.shop);
            }} >
          </Marker>
        ))}

        {props.isOpen &&
          <MapPopup steps={props.steps} data={props.clickedShop} uniqueImgs={props.clickedShopUniqueStepsImages} />
        }
      </Map>
      <style jsx>{`
        *{
          margin:0;
          padding:0;
          border:0;
          outline:0;
          list-style:none;
        }
        a{
          text-decoration: none;
        }
        .map-container{
          height: calc(100vh - 56px);
          background-color: #E8E6E2;
        }
      `}</style>

    </div>
  );
}