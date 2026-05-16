import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

// Free OpenStreetMap tiles via Leaflet — no API key required.

const REGIONS = {
  demand:    { lat: -6.2200, lng: 106.8100, zoom: 13 },
  incoming:  { lat: -6.2090, lng: 106.8161, zoom: 14 },
  orderList: { lat: -6.2194, lng: 106.8100, zoom: 12 },
  navigate:  { lat: -6.2180, lng: 106.8120, zoom: 15 },
  trip:      { lat: -6.2070, lng: 106.8190, zoom: 15 },
};

const PICKUP       = [-6.2236, 106.8093];
const DROPOFF      = [-6.1944, 106.8229];
const DRIVER       = [-6.2100, 106.8150];
const ROUTE        = [[-6.2236,106.8093],[-6.2188,106.8110],[-6.2100,106.8150],[-6.2020,106.8185],[-6.1944,106.8229]];
const ORDER_PICKUP = [[-6.2236,106.8093],[-6.2300,106.8311],[-6.2251,106.7980],[-6.2441,106.7993],[-6.1944,106.8229]];
const DEMAND_RINGS = [
  { latlng: [-6.2236, 106.8093], r: 900 },
  { latlng: [-6.1944, 106.8229], r: 700 },
  { latlng: [-6.2441, 106.7993], r: 600 },
];

// Load Leaflet from CDN once per page
let _leafletReady = false;
let _leafletPending = [];
function ensureLeaflet(cb) {
  if (_leafletReady) { cb(); return; }
  _leafletPending.push(cb);
  if (_leafletPending.length > 1) return; // already loading

  if (!document.getElementById('lf-css')) {
    const link = document.createElement('link');
    link.id = 'lf-css'; link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }
  const s = document.createElement('script');
  s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  s.onload = () => {
    _leafletReady = true;
    _leafletPending.forEach(fn => fn());
    _leafletPending = [];
  };
  document.body.appendChild(s);
}

function divIcon(L, html, size, anchor) {
  return L.divIcon({ html, iconSize: size, iconAnchor: anchor, className: '' });
}

export default function RealMap({ mode = 'demand', color = '#00A89B', deep = '#008275' }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const region = REGIONS[mode] || REGIONS.demand;

  useEffect(() => {
    let dead = false;
    ensureLeaflet(() => {
      if (dead || !containerRef.current) return;
      const L = window.L;

      // Destroy any previous Leaflet instance on this element
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      if (containerRef.current._leaflet_id) {
        delete containerRef.current._leaflet_id;
      }

      const map = L.map(containerRef.current, {
        center: [region.lat, region.lng], zoom: region.zoom,
        zoomControl: false, attributionControl: false,
        dragging: false, touchZoom: false, doubleClickZoom: false,
        scrollWheelZoom: false, boxZoom: false, keyboard: false,
      });
      mapRef.current = map;

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

      const ringStyle = { fillColor: color, fillOpacity: 0.15, color, opacity: 0.35, weight: 1.5 };

      if (mode === 'demand') {
        DEMAND_RINGS.forEach(c => L.circle(c.latlng, { ...ringStyle, radius: c.r }).addTo(map));
      }
      if (mode === 'incoming' || mode === 'navigate' || mode === 'trip') {
        L.polyline(ROUTE, {
          color, weight: 4,
          dashArray: mode === 'incoming' ? '10,6' : null,
        }).addTo(map);
      }
      if (mode === 'incoming' || mode === 'navigate') {
        L.marker(PICKUP, { icon: divIcon(L,
          `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:2.5px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,.25)"></div>`,
          [18,18],[9,9]) }).addTo(map);
      }
      if (mode === 'incoming' || mode === 'trip') {
        L.marker(DROPOFF, { icon: divIcon(L,
          `<div style="display:flex;flex-direction:column;align-items:center"><div style="width:16px;height:16px;border-radius:50%;background:${deep}"></div><div style="width:3px;height:8px;background:${deep};border-radius:2px;margin-top:1px"></div></div>`,
          [16,26],[8,26]) }).addTo(map);
      }
      if (mode === 'incoming' || mode === 'navigate' || mode === 'trip') {
        L.marker(DRIVER, { icon: divIcon(L,
          `<div style="width:24px;height:24px;border-radius:50%;background:${deep};border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
          [24,24],[12,12]) }).addTo(map);
      }
      if (mode === 'orderList') {
        ORDER_PICKUP.forEach(pos => L.marker(pos, { icon: divIcon(L,
          `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2)"></div>`,
          [16,16],[8,8]) }).addTo(map));
      }
    });

    return () => {
      dead = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, [mode, color, deep]);

  return <View ref={containerRef} style={[StyleSheet.absoluteFill, { backgroundColor: '#e8eef3' }]} />;
}
