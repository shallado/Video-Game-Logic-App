import React from 'react';
import { connect } from 'react-redux';
import { Marker, Popup } from 'react-map-gl';

const Markers = (props) => {
  return (
    <div>
      {props.locationsInfo.map((locationInfo) => {
        return (
          <div key={locationInfo.id}>
            <Marker
              className="mapboxgl-marker"
              longitude={locationInfo.center[0]}
              latitude={locationInfo.center[1]}
            >
              <ion-icon
                onClick={() => props.handleOpenPopup(locationInfo.id)}
                name="pin-outline"
              ></ion-icon>
            </Marker>
            {props.selectedMarker === locationInfo.id && (
              <Popup
                longitude={locationInfo.center[0]}
                latitude={locationInfo.center[1]}
                closeButton={true}
                closeOnClick={false}
                onClose={props.handleOnClose}
                anchor="top"
                offsetLeft={12}
                offsetTop={30}
              >
                {locationInfo.place_name.split(',')[1]}
              </Popup>
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  locationsInfo: state.error.data,
});

export default connect(mapStateToProps)(Markers);
