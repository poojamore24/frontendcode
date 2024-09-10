import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const MapComponent = ({ filteredHostels }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const mapRef = useRef(null);
  const provider = new OpenStreetMapProvider();

  const center = [18.51957, 73.85535]; // Default center

  const customIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    className: "custom-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  const SearchControl = () => {
    const map = useMap();

    const handleSearch = async (e) => {
      e.preventDefault();
      const results = await provider.search({ query: searchQuery });
      setSearchResults(results);
      if (results.length > 0) {
        map.flyTo([results[0].y, results[0].x], 13);
      }
    };

    return (
      <div
        className="leaflet-top leaflet-left"
        style={{ top: "10px", left: "10px" }}
      >
        <div
          className="leaflet-control leaflet-bar"
          style={{
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          <form
            onSubmit={handleSearch}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location"
              style={{ marginRight: "5px", width: "120px", fontSize: "12px" }}
            />
            <button type="submit" style={{ fontSize: "12px" }}>
              Search
            </button>
          </form>
        </div>
      </div>
    );
  };

  const LocateControl = () => {
    const map = useMap();

    const handleLocate = () => {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, map.getZoom());
      });
    };

    return (
      <div
        className="leaflet-top leaflet-left"
        style={{ top: "50px", left: "10px" }}
      >
        <div className="leaflet-control leaflet-bar">
          <a
            className="leaflet-control-locate"
            href="#"
            title="Locate me"
            onClick={handleLocate}
            style={{
              backgroundColor: "white",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <span>📍</span>
          </a>
        </div>
      </div>
    );
  };

  const MapEventHandler = () => {
    useMapEvents({
      moveend: () => {
        const { lat, lng } = mapRef.current.getCenter();
        console.log(`Map center: ${lat}, ${lng}`);
      },
    });
    return null;
  };

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      {filteredHostels.length > 0 ? (
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "100%", width: "100%", borderRadius: "15px" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            {filteredHostels.map((hostel, index) => (
              <Marker
                key={index}
                position={[
                  hostel.latitude ?? center[0] + (Math.random() - 0.5) * 0.1,
                  hostel.longitude ?? center[1] + (Math.random() - 0.5) * 0.1,
                ]}
                icon={customIcon}
              >
                <Popup>
                  <div style={{ fontSize: "12px" }}>
                    <h3 style={{ fontSize: "14px", marginBottom: "5px" }}>
                      {hostel.name ?? "Unnamed Hostel"}
                    </h3>
                    <p>{hostel.address ?? "Address not available"}</p>
                    <p>Type: {hostel.hostelType ?? "Not specified"}</p>
                    <p>
                      Rent: ₹
                      {hostel.rentStructure?.[0]?.rentPerStudent ?? "N/A"}
                    </p>
                    {hostel.verified && <p>✅ Verified</p>}
                    {hostel.food && <p>🍽️ Food Available</p>}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          <LocateControl />
          <SearchControl />
          <MapEventHandler />
        </MapContainer>
      ) : (
        <div>No hostels found.</div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          background: "white",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontSize: "12px",
        }}
      >
        <h4 style={{ fontSize: "14px", marginBottom: "5px" }}>Legend</h4>
        <div>
          <span style={{ color: "red", marginRight: "5px" }}>📍</span> Hostel
        </div>
        <div>✅ Verified</div>
        <div>🍽️ Food</div>
      </div>
    </div>
  );
};

export default MapComponent;
// https://tse1.mm.bing.net/th?id=OIP.2Jkj453iqrGbUsklsZj5ZAHaE8&pid=Api&P=0&h=220
