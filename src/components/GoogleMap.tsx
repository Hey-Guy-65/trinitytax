import { useEffect, useRef, useState } from "react";

const OFFICE = { lat: 36.07172, lng: -115.27142 };

type MapsGlobal = {
  maps: {
    Map: new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
    Marker: new (opts: Record<string, unknown>) => unknown;
  };
};

declare global {
  interface Window {
    __trinityInitMap?: () => void;
  }
}

function getMaps(): MapsGlobal | undefined {
  return (globalThis as { google?: MapsGlobal }).google;
}

let scriptPromise: Promise<void> | null = null;

function loadMapsApi(browserKey: string, trackingId?: string) {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return;
    if (getMaps()?.maps?.Map) {
      resolve();
      return;
    }


    window.__trinityInitMap = () => resolve();

    const script = document.createElement("script");
    const channel = trackingId ? `&channel=${encodeURIComponent(trackingId)}` : "";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      browserKey,
    )}&loading=async&callback=__trinityInitMap${channel}`;
    script.async = true;
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function GoogleMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const browserKey = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as
      string | undefined;
    const trackingId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] as
      string | undefined;

    if (!browserKey) {
      setFailed(true);
      return;
    }

    let cancelled = false;

    loadMapsApi(browserKey, trackingId)
      .then(() => {
        if (cancelled || !containerRef.current) return;
        const google = getMaps();
        if (!google) {
          setFailed(true);
          return;
        }
        const map = new google.maps.Map(containerRef.current, {
          center: OFFICE,
          zoom: 15,
          disableDefaultUI: false,
          mapTypeControl: false,
          streetViewControl: false,
        });

        new google.maps.Marker({
          position: OFFICE,
          map,
          title: "Trinity Tax Consultants Inc.",
        });

      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted px-6 text-center text-sm text-muted-foreground">
        Map unavailable right now — find us at 8485 W Sunset Road, Las Vegas, NV.
      </div>
    );
  }

  return <div ref={containerRef} className="h-full w-full" aria-label="Map of our office" />;
}
