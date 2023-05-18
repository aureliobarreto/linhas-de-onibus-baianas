import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 13,
      lat: 51.505,
      lng: -0.09,
    };
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom + 1,
    });
  }

  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom - 1,
    });
  }

  render() {
    const position1 = [51.505, -0.09];
    const position2 = [51.51, -0.1];
    return (
      <MapContainer className="map" center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; OpenStreetMap contributors"
        />
        <Marker position={position1}>
          <Popup>
            <span>Marker 1</span>
          </Popup>
        </Marker>
        <Marker position={position2}>
          <Popup>
            <span>Marker 2</span>
          </Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
    );
  }
}

export default MyMap;

