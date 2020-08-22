import React from 'react';
import { MapObject } from '../molecules/MapObject';

export const MapBoard: React.FC = () => {
    return (
      <div className="map-container">
        <MapObject/>
        <style jsx>{`
          .map-container{
            padding-top: 56px;
            width: 100%;
            height: 100%;
            background-color: #E8E6E2;
          }
        `}</style>
      </div>
    );
}