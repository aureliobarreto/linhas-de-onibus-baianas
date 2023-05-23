import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from 'react-leaflet';

//const limeOptions = { color: 'lime' }
class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 6,    
      lat: -12.465285, 
      lng: -41.458085,
    };
    
  }



  render() {
    const position1 = [51.505, -0.09];
    const position2 = [51.51, -0.1];
    const {origem, destino, center}= this.props;
    return (
      <MapContainer className="map" center={[center[0], center[1]]} zoom={this.state.zoom} zoomControl={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; OpenStreetMap contributors"
        />
        <Marker position={origem}>
          <Popup>
            <span>Origem</span>
          </Popup>
        </Marker>
        <Marker position={destino}>
          <Popup>
            <span>Destino</span>
          </Popup>
        </Marker>        
      </MapContainer> 
    );
  }
}

export default MyMap;

