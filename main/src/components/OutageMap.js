import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import mockData from './testData/MOCK_DATA.json'

const fillBlueOptions = { fillColor: 'blue' };


function OutageMap() { //This is where the map page will be rendered.
    return (
        <MapContainer center={[38.89, -77.059]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mockData.map(mock => (
                <Circle center={[mock.Latitude, mock.Longitude]} pathOptions={fillBlueOptions} radius={200}>
                    <Popup>{mock.id}</Popup>
                </Circle>

            ))}
        </MapContainer>
    );
  }
  
  export default OutageMap;