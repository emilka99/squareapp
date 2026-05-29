"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Props {
  coords: [number, number];
  name: string;
  address: string;
}

export default function ApartmentMap({ coords, name, address }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any;

    const init = async () => {
      const L = (await import("leaflet")).default;

      if (!containerRef.current) return;

      const icon = L.icon({
        iconUrl: "/assets/map-pin.svg",
        iconSize: [24, 32],
        iconAnchor: [12, 32],
      });

      map = L.map(containerRef.current, {
        center: coords,
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { attribution: '&copy; <a href="https://carto.com/">CARTO</a>' }
      ).addTo(map);

      L.marker(coords, { icon })
        .bindPopup(`<strong>${name}</strong><br>${address}`)
        .addTo(map);
    };

    init();

    return () => {
      if (map) map.remove();
    };
  }, [coords, name, address]);

  return (
    <div
      ref={containerRef}
      className="border border-[#b3bbbd]"
      style={{ height: "480px", width: "100%" }}
    />
  );
}
