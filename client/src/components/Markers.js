import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import IconPin from '../svgs/IconPin';

const Markers = (props) => {
  return (
    <div>
      {props.locationsInfo.map((locationInfo) => {
        return (
          <div key={locationInfo.id}>
            <Marker
              longitude={locationInfo.center[0]}
              latitude={locationInfo.center[1]}
            >
              <IconPin
                handleOnOpen={props.handleOnOpen}
                locationInfoId={locationInfo.id}
              />
            </Marker>
            {props.markerId === locationInfo.id && (
              <Popup
                longitude={locationInfo.center[0]}
                latitude={locationInfo.center[1]}
                closeButton={true}
                closeOnClick={true}
                onClose={props.handleOnClose}
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
};

export default Markers;
