import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from "leaflet"
class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 6,
    };
  }
  

  render() {
    const { origem, destino, center } = this.props;
    const polylinePositions = [origem.length == 0 ? [-12.465285, -41.458080] : origem, destino == 0 ? [-12.465285, -41.458080] : destino];

    const busIcon = new L.icon ({
      iconUrl: require('../assets/bus.png'),
      iconRetinaUrl: require('../assets/bus.png'),
      popupAnchor:  [-0, -0],
       iconSize: [35, 35],
      })
    
    

    return (
      <MapContainer className="map" center={center.length == 0? [-12.465285, -41.458080]: center} zoom={this.state.zoom} zoomControl={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; OpenStreetMap contributors"
        />
        <Marker position={origem.length == 0 ? [-12.465285, -41.458080] : origem}>
          <Popup>
            <span>Origem</span>
          </Popup>
        </Marker>
        <Marker position={destino == 0 ? [-12.465285, -41.458080] : destino}>
          <Popup>
            <span>Destino</span>
          </Popup>
        </Marker>
         <Marker position={center.length == 0? [-12.465285, -41.458080]: center} icon={busIcon}>         
          <Popup>          
            <span>Ônibus</span>
          </Popup>
        </Marker> 
        <Polyline positions={polylinePositions} color="red" />
      </MapContainer>
    );
  }
}

export default MyMap;
