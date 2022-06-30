import React, { useState, useEffect } from 'react';
// library
import { Map, Marker, TileLayer } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
// components
import MapPopup from '../molecules/MapPopup';
import Loading from './../molecules/Loading';
import { RouteName } from '../../common/Const';


interface MapPopupProps {
  setPopupIsOpen: any;
  loading: boolean;
  coordinations: any;
  zoom: number;
  setZoom: any;
  clickedCoord: any;
  mapCenter: any;
  curLoc: any;
  clickedCoordUniqueImgs: any;
  setMapPopupInfo: any;
  setMapCenter: any;
  setLastLat: any;
  setLastLng: any;
  stations: any;
  fetchCoordinationsData: any;
  selectedGenre: any;
  handleStationClick: any;
  setIsSliderAppear: any;
  history: any;
}


const MapObject: React.FC<MapPopupProps> = (props: any) => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [reqShopIsOpen, setReqShopIsOpen] = useState(false);
  const [reqShopCoord, setReqShopCoord] = useState({lat: 0, lng: 0});

  const curLocMarker = L.icon({
    iconUrl: '/current_location_pin.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 61]
  });

  const shopMarkerNotOfficial = L.icon({
    iconUrl: '/shop_pin_unofficial.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 61]
  });

  const shopMarkerOfficial = L.icon({
    iconUrl: '/shop_pin.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 61]
  });

  const stationMarker = L.icon({
    iconUrl: '/station.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 61]
  });

  const reqShopMarker = L.icon({
    iconUrl: '/selected-pin.svg',
    iconSize: [55, 61],
    iconAnchor: [27, 61]
  });

  const calcStationCenter = (data: any) => {
    props.setLastLat(data[0].y);
    props.setLastLng(data[0].x);

    props.setMapCenter({ 
      lat: data[0].y,
      lng: data[0].x 
    });
    props.setZoom(14);
  }

  const createDate = () => {
    const dd = new Date();
    const YYYY = dd.getFullYear();
    const MM = dd.getMonth() + 1;
    const DD = dd.getDate();
    return YYYY + "/" + MM + "/" + DD;
  }

  const handleReqShop = async (coords: any) => {
    try {
      const res = await axios
        .get(`https://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${coords.lng}&y=${coords.lat}`)
      const add_obj = res.data.response.location[0];
      const address = '〒'+ add_obj.postal.substr(0,3) + '-' + add_obj.postal.slice(3) + ' ' + add_obj.prefecture + add_obj.city + add_obj.town;
      props.history.push({
        pathname: RouteName.USER_SHOP_FORM,
        state: {
          address: address,
        }
      });
    } catch (error) {
      console.log(error)
    }
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

    axios
      .get(`/api/v1/user/coordinations/${data.id}`)
      .then(res => props.setMapPopupInfo(res.data))
      .catch(err => console.log(err));

    setPopupIsOpen(true);
    props.setPopupIsOpen(true);
  }

  useEffect(() => {
    if (props.stations.length !== 0) {
      calcStationCenter(props.stations);
      props.handleStationClick(props.stations[0])
    }
  }, [props.stations]);

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
        onClick={(e: any) => {
          setReqShopCoord(e.latlng);
          setReqShopIsOpen(true);
          setPopupIsOpen(false);
          props.setIsSliderAppear(false);
          props.setPopupIsOpen(false);
        }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={5} />
        <Marker position={props.curLoc} icon={curLocMarker} />
        {reqShopIsOpen && <Marker position={reqShopCoord} icon={reqShopMarker} onClick={() => handleReqShop(reqShopCoord)}/>}

        {props.loading ? <Loading /> :
          props.coordinations?.map((data: any, i: number) => (
            <Marker
              riseOnHover={true}
              position={{ lat: data.latitude, lng: data.longitude }}
              icon={data.is_official ? shopMarkerOfficial : shopMarkerNotOfficial}
              key={`shop${data.id}`}
              onClick={() => handleMarkerClick(data)} >
            </Marker>
          ))}

        {props.stations && 
          props.stations?.map((data: any, i: number) => (
            <Marker
              riseOnHover={true}
              position={{ lat: data.y, lng: data.x }}
              icon={stationMarker}
              key={`station${i}`}
              onClick={() => props.handleStationClick(data)} >
            </Marker>
          ))}
        {popupIsOpen &&
          <MapPopup
            data={props.clickedCoord}
            uniqueImgs={props.clickedCoordUniqueImgs}
          />}
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