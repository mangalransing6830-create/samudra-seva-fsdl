import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Beach {
  _id?: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  cleanlinessLevel?: string;
}

interface Props {
  beaches?: Beach[]; // optional
}

export default function BeachMap({ beaches = [] }: Props) {
  const defaultPosition: [number, number] = [19.0760, 72.8777]; // Mumbai

  const validBeaches = beaches.filter(
    (beach) =>
      beach.latitude !== undefined &&
      beach.longitude !== undefined &&
      !isNaN(beach.latitude) &&
      !isNaN(beach.longitude)
  );

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={defaultPosition}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {validBeaches.map((beach) => (
          <Marker
            key={beach._id || beach.name}
            position={[beach.latitude!, beach.longitude!]}
          >
            <Popup>
              <strong>{beach.name}</strong>
              <br />
              {beach.location}
              <br />
              Status: {beach.cleanlinessLevel || "Unknown"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}