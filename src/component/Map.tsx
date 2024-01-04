import { GoogleMap, LoadScript } from '@react-google-maps/api';


function Map(){
    
    const mapStyles = {        
        height: "100vh",
        width: "100%"};
        const defaultCenter = {
            lat: 37.487752, lng: 126.825173
          }
    return(
        <LoadScript
  googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
    )
}
export default Map;