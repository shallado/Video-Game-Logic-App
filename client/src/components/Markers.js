import React, { Component } from 'react';
import { Marker, Popup } from 'react-map-gl';
import IconPin from '../svgs/IconPin';

class Markers extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.geoLocatorSet && this.props.markerId === null) ||
      nextProps.markerId !== this.props.markerId
    );
  }

  render() {
    return (
      <div>
        {this.props.locationsInfo.map((locationInfo) => {
          return (
            <div key={locationInfo.id}>
              <Marker
                longitude={locationInfo.center[0]}
                latitude={locationInfo.center[1]}
              >
                <IconPin
                  handleOnOpen={this.props.handleOnOpen}
                  locationInfoId={locationInfo.id}
                />
              </Marker>
              {this.props.markerId === locationInfo.id && (
                <Popup
                  longitude={locationInfo.center[0]}
                  latitude={locationInfo.center[1]}
                  closeButton={true}
                  closeOnClick={true}
                  onClose={this.props.handleOnClose}
                  anchor="top"
                  offsetLeft={12}
                  offsetTop={30}
                  className="more-info-modal__map-marker-popup"
                >
                  <div>
                    <p>{locationInfo.place_name.split(',')[0]}</p>
                    <p>{locationInfo.place_name.split(',')[1]}</p>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Markers;
