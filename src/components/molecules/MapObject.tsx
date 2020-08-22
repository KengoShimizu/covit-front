import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import { MapPopup } from './MapPopup';
import PopupIcon from './../../img/service-icon.svg';

export const MapObject: React.FC = (props: any) => {
  const [lat, setLat] = useState(35.6513297);
  const [lng, setLng] = useState(139.5832906);
  const [err, setErr] = useState("");
  const [coordinations, setCoordinations] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedShop, setClickedShop] = useState({});
  const [mapcenter, setMapCenter] = useState({lat: lat, lng: lng});

  const marker = L.icon({
    iconUrl: PopupIcon,
    iconSize: [25, 41],
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
        genre_id: 'a',
        from_lat: 0,
        to_lat: 0,
        from_lng: 0,
        to_lng: 0,
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
      <Map center={mapcenter} zoom={13} style={{ height: '50vh' }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            現在地
          </Popup>
        </Marker>
        
        {coordinations.map((data: any, i: number) => (
          <Marker 
            position={{lat: data.latitude, lng: data.longitude}} 
            icon={marker}
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