const OFFICE = { lat: 36.0690652, lng: -115.2764426 };

const MAP_SRC = `https://maps.google.com/maps?q=${OFFICE.lat},${OFFICE.lng}&z=15&output=embed`;

export function GoogleMap() {
  return (
    <iframe
      title="Map showing Trinity Tax Consultants Inc. at 8485 W Sunset Road, Suite 206, Las Vegas, NV 89113"
      src={MAP_SRC}
      className="h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      tabIndex={-1}
    />
  );
}
