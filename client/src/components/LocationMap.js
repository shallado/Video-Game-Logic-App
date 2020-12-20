import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  FlyToInterpolator,
} from 'react-map-gl';
import Markers from './Markers';
import mapboxConfig from '../config/mapbox';

class LocationMap extends Component {
  state = {
    viewport: {
      height: '100%',
      width: '100%',
      zoom: 10,
      longitude: 0,
      latitude: 0,
    },
    markerId: null,
    geoLocatorSet: true,
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

    this.setState({
      viewport,
      geoLocatorSet: false,
    });
  };

  handleMapViewportChange = (nextViewport) => {
    this.setState((prevState) => ({
      viewport: {
        ...prevState.viewport,
        ...nextViewport,
        height: '100%',
        width: '100%',
      },
    }));
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
        {this.props.locationsInfo.length > 0 ? (
          <>
            <div className="more-info-modal__market-place-physical">
              <h5 className="heading-five">Physical Stores</h5>
              <ul>
                {this.props.locationsInfo.map((locationInfo) => (
                  <li
                    key={locationInfo.id}
                    onClick={() =>
                      this.handleLocationZoom(
                        locationInfo.center,
                        locationInfo.id
                      )
                    }
                    className="more-info-modal__market-place-store"
                  >
                    {locationInfo.place_name}
                  </li>
                ))}
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
                  markerId={this.state.markerId}
                  geoLocatorSet={this.state.geoLocatorSet}
                />
              </ReactMapGL>
            </div>
          </>
        ) : (
          <p>...loading</p>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  locationsInfo: state.map.locationsInfo,
});

export default connect(mapStateToProps)(LocationMap);
