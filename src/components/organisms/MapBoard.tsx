import React from 'react';
import { MapObject } from '../molecules/MapObject';

export const MapBoard: React.FC = () => {
    return (
        <div className="map-container">
            <MapObject/>
        </div>
    );
}