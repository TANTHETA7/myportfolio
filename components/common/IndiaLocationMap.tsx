"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocateFixed, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Bounding box used to project lat/lon onto the stylized India outline below.
const LAT_MIN = 6;
const LAT_MAX = 36;
const LON_MIN = 68;
const LON_MAX = 98;
const VIEW_W = 300;
const VIEW_H = 340;

// A small set of major cities for a network-free "nearest city" label —
// avoids depending on a third-party reverse-geocoding API.
const CITIES: Array<{ name: string; lat: number; lon: number }> = [
  { name: "Srinagar", lat: 34.08, lon: 74.79 },
  { name: "Chandigarh", lat: 30.73, lon: 76.78 },
  { name: "Delhi", lat: 28.61, lon: 77.21 },
  { name: "Jaipur", lat: 26.91, lon: 75.79 },
  { name: "Lucknow", lat: 26.85, lon: 80.95 },
  { name: "Guwahati", lat: 26.14, lon: 91.74 },
  { name: "Patna", lat: 25.59, lon: 85.14 },
  { name: "Ahmedabad", lat: 23.02, lon: 72.57 },
  { name: "Kolkata", lat: 22.57, lon: 88.36 },
  { name: "Bhopal", lat: 23.26, lon: 77.41 },
  { name: "Mumbai", lat: 19.08, lon: 72.88 },
  { name: "Pune", lat: 18.52, lon: 73.86 },
  { name: "Nagpur", lat: 21.15, lon: 79.09 },
  { name: "Bhubaneswar", lat: 20.30, lon: 85.82 },
  { name: "Hyderabad", lat: 17.39, lon: 78.49 },
  { name: "Goa", lat: 15.5, lon: 73.83 },
  { name: "Bengaluru", lat: 12.97, lon: 77.59 },
  { name: "Chennai", lat: 13.08, lon: 80.27 },
  { name: "Kochi", lat: 9.93, lon: 76.27 },
  { name: "Thiruvananthapuram", lat: 8.52, lon: 76.94 },
  { name: "Coimbatore", lat: 11.02, lon: 76.96 },
];

const BENGALURU = { name: "Bengaluru", lat: 12.9716, lon: 77.5946 };

function project(lat: number, lon: number) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * VIEW_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEW_H;
  return {
    x: Math.min(Math.max(x, 4), VIEW_W - 4),
    y: Math.min(Math.max(y, 4), VIEW_H - 4),
  };
}

function nearestCity(lat: number, lon: number): string {
  let best = CITIES[0];
  let bestDist = Infinity;
  for (const c of CITIES) {
    const d = (c.lat - lat) ** 2 + (c.lon - lon) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best.name;
}

// Stylized (not survey-accurate) India outline, hand-fit to the lat/lon
// bounding box above so a projected marker lands in roughly the right spot.
const INDIA_PATH =
  "M60,17 L100,11 L120,23 L120,57 L200,96 L290,79 L275,113 L255,141 L205,107 L200,164 L170,187 L140,226 L120,272 L95,314 L80,294 L65,249 L50,215 L47,175 L5,147 L20,130 L20,90 L65,45 Z";

type LocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "denied" }
  | { status: "unsupported" }
  | { status: "found"; lat: number; lon: number; label: string; isDefault?: boolean };

export function IndiaLocationMap({ className }: { className?: string }) {
  const [state, setState] = useState<LocationState>({ status: "idle" });

  const handleLocate = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({ status: "unsupported" });
      return;
    }
    setState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setState({
          status: "found",
          lat: latitude,
          lon: longitude,
          label: nearestCity(latitude, longitude),
        });
      },
      () => setState({ status: "denied" }),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  };

  const marker =
    state.status === "found"
      ? project(state.lat, state.lon)
      : project(BENGALURU.lat, BENGALURU.lon);

  const showMarker = state.status === "found" || state.status === "denied" || state.status === "unsupported";
  const label =
    state.status === "found"
      ? state.label
      : state.status === "denied" || state.status === "unsupported"
      ? `${BENGALURU.name} (default)`
      : null;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative w-full max-w-[180px] aspect-[300/340]">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <path
            d={INDIA_PATH}
            fill="rgba(139,92,246,0.08)"
            stroke="rgba(139,92,246,0.35)"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <AnimatePresence>
            {showMarker && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
              >
                <circle cx={marker.x} cy={marker.y} r={10} fill="rgba(239,68,68,0.18)">
                  <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={marker.x} cy={marker.y} r={4} fill="#ef4444" stroke="#fff" strokeWidth={1} />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {label && (
        <div className="flex items-center gap-1.5 text-xs text-white/60">
          <MapPin className="w-3 h-3 text-red-400/80" />
          <span>{label}</span>
        </div>
      )}

      {state.status !== "found" && (
        <button
          type="button"
          onClick={handleLocate}
          disabled={state.status === "loading"}
          data-cursor="pointer"
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium",
            "text-white/50 bg-white/[0.04] border border-white/[0.07]",
            "hover:bg-white/[0.07] hover:text-white/80 hover:border-white/[0.12]",
            "transition-all duration-200 disabled:opacity-50"
          )}
        >
          {state.status === "loading" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <LocateFixed className="w-3 h-3" />
          )}
          {state.status === "loading" ? "Locating…" : "Show my location"}
        </button>
      )}

      {state.status === "denied" && (
        <p className="text-[10px] text-white/25 text-center max-w-[180px]">
          Location permission denied — showing default location.
        </p>
      )}
      {state.status === "unsupported" && (
        <p className="text-[10px] text-white/25 text-center max-w-[180px]">
          Geolocation isn&apos;t supported here — showing default location.
        </p>
      )}
    </div>
  );
}
