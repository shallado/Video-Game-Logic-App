import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  FlyToInterpolator,
} from 'react-map-gl';
import Markers from './Markers';
import { startGetMapLocations } from '../actions/map';
import mapboxConfig from '../config/mapbox';

class Map extends Component {
  state = {
    viewport: {
      width: 500,
      height: 500,
      zoom: 10,
      longitude: 0,
      latitude: 0,
    },
    selectedMarker: null,
    isLoading: true,
  };

  handleOpenPopup = (markerId) => {
    this.setState(() => ({ selectedMarker: markerId }));
  };

  handleOnClose = () => {
    this.setState({ selectedMarker: null });
  };

  handleGeoLocatorViewportChange = (viewport) => {
    viewport.zoom = 11;

    this.setState({ viewport });
  };

  handleMapViewportChange = (nextViewport) => {
    this.setState(() => ({ viewport: nextViewport }));
  };

  handleLocationZoom = (center, markerId) => {
    this.setState((prevState) => ({
      viewport: {
        ...prevState.viewport,
        longitude: center[0],
        latitude: center[1],
        zoom: 15,
      },
      selectedMarker: markerId,
    }));
  };

  componentDidMount() {
    this.props.startGetMapLocations();
  }

  render() {
    return (
      <div>
        <div>
          <h6>Physical Stores</h6>
          {this.props.locationsInfo.map((locationInfo) => {
            return (
              <div
                key={locationInfo.id}
                onClick={() =>
                  this.handleLocationZoom(locationInfo.center, locationInfo.id)
                }
              >
                <p>{locationInfo.place_name}</p>
              </div>
            );
          })}
        </div>
        <ReactMapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxConfig.apiToken}
          transitionInterpolator={
            new FlyToInterpolator({
              center: [
                this.state.viewport.latitude,
                this.state.viewport.longitude,
              ],
            })
          }
          onViewportChange={this.handleMapViewportChange}
        >
          <GeolocateControl
            onViewportChange={this.handleGeoLocatorViewportChange}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            auto={true}
          />
          <NavigationControl showZoom={true} />
          <Markers
            selectedMarker={this.state.selectedMarker}
            handleOpenPopup={this.handleOpenPopup}
            handleOnClose={this.handleOpenPopup}
          />
        </ReactMapGL>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locationsInfo: state.error.data,
});

const mapDispatchToProps = (dispatch) => ({
  startGetMapLocations: () => dispatch(startGetMapLocations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
