import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  FlyToInterpolator,
} from 'react-map-gl';
import Markers from './Markers';
import mapboxConfig from '../config/mapbox';

class Map extends Component {
  state = {
    viewport: {
      width: 940,
      height: 500,
      zoom: 10,
      longitude: 0,
      latitude: 0,
    },
    isLoading: true,
    markerId: null,
  };

  handleOnClose = () => {
    this.setState(() => ({
      markerId: null,
    }));
  };

  handleOnOpen = (markerId) => {
    this.setState(() => ({
      markerId,
    }));
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
      markerId,
    }));
  };

  render() {
    return (
      <>
        <div className="more-info-modal__market-place-physical">
          <h5 className="heading-five">Physical Stores</h5>
          <ul>
            {this.props.locationsInfo.map((locationInfo) => {
              return (
                <li
                  key={locationInfo.id}
                  onClick={this.handleLocationZoom}
                  className="more-info-modal__market-place-store"
                >
                  {locationInfo.place_name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="more-info-modal__map">
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
            scrollZoom={false}
          >
            <GeolocateControl
              onViewportChange={this.handleGeoLocatorViewportChange}
              positionOptions={{ enableHighAccuracy: true }}
              auto={true}
            />
            <div className="more-info-modal__map-navigation">
              <NavigationControl showZoom={true} />
            </div>
            <Markers
              handleOnClose={this.handleOnClose}
              handleOnOpen={this.handleOnOpen}
              locationsInfo={this.props.locationsInfo}
              showPop={this.state.showPop}
              markerId={this.state.markerId}
            />
          </ReactMapGL>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  locationsInfo: state.map.locationsInfo,
});

export default connect(mapStateToProps)(Map);
