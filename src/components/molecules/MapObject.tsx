import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import { MapPopup } from './MapPopup';
import curLocPin from './../../img/current_location_pin.svg';
import shopPin from './../../img/shop_pin.svg';

export const MapObject: React.FC = (props: any) => {
  const [lat, setLat] = useState(35.6513297);
  const [lng, setLng] = useState(139.5832906);
  const [err, setErr] = useState("");
  const [coordinations, setCoordinations] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedShop, setClickedShop] = useState({});
  const [mapcenter, setMapCenter] = useState({lat: lat, lng: lng});

  const curLocMarker = L.icon({
    iconUrl: curLocPin,
    iconSize: [55, 61],
    iconAnchor: [13, 41],
    popupAnchor: [0, -45]
  });

  const shopMarker = L.icon({
    iconUrl: shopPin,
    iconSize: [55, 61],
    iconAnchor: [13, 41],
    popupAnchor: [0, -45]
  });

  /* FIXME 現在地座標取得（デバッグのためコメントアウト）
  navigator.geolocation.getCurrentPosition(
    pos => {
      setLat(pos.coords.latitude)
      setLng(pos.coords.longitude)
    },
    err => console.log(err)
  );
  */
  const position = {lat: lat, lng: lng};

  const fetchStepsData = async (shop: any) => {
    await axios.get(`/api/v1/user/steps?shop_id=1`)
      .then(res => {
        setSteps(res.data);
        setIsOpen(true);
        setClickedShop(shop);
      })
      .catch(err => setErr(err));
  }

  const fetchCoordinationsData = async () => {
    await axios.get('/api/v1/user/coordinations',{
      params: {
        genre_id: [],
        from_lat: lat-0.025,
        to_lat: lat+0.025,
        from_lng: lng-0.025,
        to_lng: lat+0.025,
      }})
      .then(res => setCoordinations(res.data))
      .catch(err => setErr(err));
  }

  useEffect(() => {
    fetchCoordinationsData();
  }, []);

  useEffect(() => {
    console.log(clickedShop)
  }, [clickedShop]);


  return (
      <Map center={mapcenter} zoom={16} style={{ height: '100%' }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={5}
        />
        <Marker position={position} icon={curLocMarker}>
          <Popup>
            現在地
          </Popup>
        </Marker>
        
        {coordinations.map((data: any, i: number) => (
          <Marker 
            position={{lat: data.latitude, lng: data.longitude}} 
            icon={shopMarker}
            key={`shop${data.id}`}
            onClick={() => {
              setMapCenter({lat: data.latitude, lng: data.longitude});
              fetchStepsData(data.shop);
            }} >
          </Marker>
        ))}

        {isOpen &&
          <MapPopup steps={steps} data={clickedShop}/>
        }
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
          .container{
            width: 100%
          }
        `}</style>
      </Map>
  );
}