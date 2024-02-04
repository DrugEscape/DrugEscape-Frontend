import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Map(){
    const [selectedMarker, setSelectedMarker] = useState<{lat: number, lng: number} | null>(null);
    const [markers, setMarkers] = useState<{lat:number, lng:number}[]>([]);
    const serviceKey = import.meta.env.VITE_MAP_ICON_ID;
    const mapStyles = {        
      height: "100vh",
      width: "100%"};
      const defaultCenter = {
          lat: 37.487752, lng: 126.825173
        }
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`https://api.odcloud.kr/api/15106561/v1/uddi:55f4221a-230f-4137-9029-8dad0bd2af11?page=1&perPage=10&serviceKey=${serviceKey}`);
                console.log(response.data);
                console.log(response.data);
                const addresses = response.data.data.map((item: { 주소: String; }) => item.주소);
                const phone1 = response.data.data.map((item: { 기관지역번호: Number; }) => item.기관지역번호);
                const geocoder = new google.maps.Geocoder();
                console.log(addresses);
                console.log(phone1);
                addresses.forEach((address: string) => {
                    geocoder.geocode({ address}, (results, status) => {
                        if (status === 'OK' && results){
                            const lat: number = results[0].geometry.location.lat();
                            const lng: number = results[0].geometry.location.lng();
                            setMarkers((current) => [...current, {lat, lng}]);
                        }
                        else{
                            console.error(`Geocoding service failed due to: ${status}`);
                        }
                    })
                })
            }
            catch(error){
                console.error(error);
            }
        }
        fetchData();
     },[])
    return(
        <LoadScript
  googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={7}
          center={defaultCenter}
        >
          {
              markers.map((marker, index) => (
                  <Marker key={index} position={marker} onClick={()=> setSelectedMarker(marker)}/>
              ))
          }
           {selectedMarker && (
            <InfoWindow
                position={selectedMarker}
                onCloseClick={() => setSelectedMarker(null)}
            >
                <div>
                    <h2>For More Information</h2>
                    <p>This is a marker at {selectedMarker.lat}, {selectedMarker.lng}</p>
                </div>
            </InfoWindow>
        )}
          </GoogleMap>
     </LoadScript>
    )
}
export default Map;