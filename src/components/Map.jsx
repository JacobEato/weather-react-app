import {React, useState} from "react";

import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import balloonPNG from "../assets/balloonIcon.png";


function Map(props){
    const balloonIcon = new L.icon({
        iconUrl: balloonPNG,
        iconSize: [25,25],
        iconAnchor: [12, 41],
    })
    return (
        
        <div>
            <MapContainer center={[37.4419, -122.1430]} zoom={5}>
                <TileLayer 
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {props.data.map((point, index) => {
                    return <Marker 
                    key={index} 
                    position = {[point[0], point[1]]}
                    eventHandlers={{
                        click: () => {props.update(index)},
                    }}
                    icon={balloonIcon}
                    ></Marker>
                })}

                
            </MapContainer>
        </div>
            
        
    );
}

export default Map;