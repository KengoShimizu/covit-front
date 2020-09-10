import React, { useState, useEffect } from 'react';
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
  stations: any;
  //fetchCoordinationsData: any;
  //selectedGenre: any;
}


const MapObject: React.FC<MapPopupProps> = (props: any) => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  
  //FIXME stations →　props.stations
  const stations = [
    {"name":"新宿","prefecture":"東京都","line":"JR中央線","x":139.700464,"y":35.689729,"postal":"1600022","prev":"代々木","next":"大久保"},
    {"name":"新宿","prefecture":"東京都","line":"JR埼京線","x":139.700464,"y":35.689729,"postal":"1600022","prev":"渋谷","next":"池袋"},
    {"name":"新宿","prefecture":"東京都","line":"JR山手線","x":139.700464,"y":35.689729,"postal":"1600022","prev":"代々木","next":"新大久保"},
    {"name":"新宿","prefecture":"東京都","line":"JR湘南新宿ライン","x":139.700464,"y":35.689729,"postal":"1600022","prev":"池袋","next":"渋谷"},
    {"name":"新宿","prefecture":"東京都","line":"JR総武線","x":139.700464,"y":35.689729,"postal":"1600022","prev":"大久保","next":"代々木"},
    {"name":"新宿","prefecture":"東京都","line":"京王線","x":139.699187,"y":35.690163,"postal":"1600023","prev":null,"next":"笹塚"},
    {"name":"新宿","prefecture":"東京都","line":"小田急小田原線","x":139.699574,"y":35.691435,"postal":"1600023","prev":null,"next":"南新宿"},
    {"name":"新宿","prefecture":"東京都","line":"東京メトロ丸ノ内線","x":139.700711,"y":35.69235,"postal":"1600022","prev":"新宿三丁目","next":"西新宿"},
    {"name":"新宿","prefecture":"東京都","line":"都営大江戸線","x":139.698812,"y":35.68869,"postal":"1510053","prev":"代々木","next":"都庁前"},
    {"name":"新宿","prefecture":"東京都","line":"都営新宿線","x":139.698812,"y":35.68869,"postal":"1600023","prev":null,"next":"新宿三丁目"},
    {"name":"新宿","prefecture":"東京都","line":"相鉄・JR直通線","x":139.700464,"y":35.689729,"postal":"1600022","prev":null,"next":"渋谷"}
  ];

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

  // FIXME 駅のマーカー画像にする
  const stationMarker = L.icon({
    iconUrl: '/shop_pin.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 61]
  });

  const calcStationCenter = (data: any) => {
    const x_arr = data.map((item: any) => item.x)
    const y_arr = data.map((item: any) => item.y)

    const lat = (Math.max.apply(null, y_arr) + Math.min.apply(null, y_arr)) / 2;
    const lng = (Math.max.apply(null, x_arr) + Math.min.apply(null, x_arr)) / 2;

    props.setLastLat(lat);
    props.setLastLng(lng);

    props.setMapCenter({ 
      lat: lat,
      lng: lng 
    });
    props.setZoom(16);
  }

  const handleStationClick = (data: any) => {
    //props.fetchCoordinationsData(props.selectedGenre, data.y, data.x)
    props.setLastLat(data.y);
    props.setLastLng(data.x);
    props.setMapCenter({
      lat: data.y,
      lng: data.x 
    });
    props.setZoom(16);
  }

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
          calcStationCenter(stations);
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

        {stations && 
          stations.map((data: any, i: number) => (
            <Marker
              position={{ lat: data.y, lng: data.x }}
              icon={stationMarker}
              key={`station${data.id}`}
              onClick={() => {handleStationClick(data)}} >
            </Marker>
          ))}

        {popupIsOpen && <MapPopup steps={props.steps} data={props.clickedShop} uniqueImgs={props.clickedShopUniqueStepsImages}/>}
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