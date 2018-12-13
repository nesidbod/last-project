
import {
  ListItemText
} from '@material-ui/core'
import * as React from 'react'
import { GoogleMap, InfoWindow, Marker, withGoogleMap } from "react-google-maps"

interface IMapProps {
  position: any,
  isOpen: boolean,
  address: string,
  venue: string
  onOpen(value: boolean): any,
}

const GoogleMapView = withGoogleMap((props: IMapProps) =>
  <GoogleMap
    defaultZoom={8}
    defaultOptions={{
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
    defaultCenter={props.position}
  > <Marker position={props.position} onClick={() => props.onOpen(!props.isOpen)} >
      {props.isOpen && <InfoWindow onCloseClick={() => props.onOpen(false)}>
        <ListItemText className="googlemap-popup-title"
          primary={props.address || ''}
          secondary={props.venue || ''}
        />
      </InfoWindow>}
    </Marker>
  </GoogleMap>
)

export default GoogleMapView