import * as React from "react";

// --- Tipe Props untuk semua ikon ---
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// ==========================================
// 1. Ikon dari Rocscience (Ada di datamu)
// ==========================================

export const IconSlide2 = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <rect x="4.6" y="4.6" width="190.8" height="190.8" rx="8.47" fill="#fff" stroke="#ddd" strokeMiterlimit="10" strokeWidth="6.65" />
    <path d="M33.45,44.27c0,42.75,0,70.61.06,113.36h135V97.15L133.06,97,76.85,44.36Z" fill="#ddd" />
    <polyline points="35.93 87.75 78.93 87.75 106.85 117.94 166.1 117.94" fill="none" stroke="#e35205" strokeMiterlimit="10" strokeWidth="9.5" />
    <path d="M33.45,44.27c0,42.75,0,70.61.06,113.36h135V97.15L133.06,97,76.85,44.36Z" fill="none" stroke="#444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.75" />
  </svg>
);

export const IconSlide3 = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <rect x="3.69" y="3.69" width="192.61" height="192.61" rx="8.55" fill="#fff" stroke="#ddd" strokeMiterlimit="10" strokeWidth="6.71" />
    <polygon points="37.03 130.31 37.59 48.26 55.4 57.04 79.02 107.24 107.38 126.45 107.38 170.14 37.03 130.31" fill="#ddd" />
    <polygon points="79.02 107.24 140.19 81.98 173.12 94.26 107.38 126.28 79.02 107.24" fill="#ddd" />
    <polygon points="38.56 48.72 55.4 57.04 122.17 36.53 103.21 29.86 38.56 48.72" fill="#ddd" />
    <polygon points="107.37 154.85 72.24 134.57 50.21 87.69 40.92 83.98 40.96 75.74 55.87 81.69 78.16 129.12 107.39 146.01 107.37 154.85" fill="#E35205" />
    <polygon points="107.38 126.28 107.38 168.31 171 131.39 171 95.27 107.38 126.28" fill="gray" />
    <polygon points="55.4 57.04 79.02 107.24 140.19 81.98 123.15 36.23 55.4 57.04" fill="gray" />
    <path d="M38.56,130.86s67.28,39.28,68.82,39.28l65.74-37.75V94.26L140.19,82,122.58,34.71l-19.37-4.85L38.56,48.72C38.57,73.61,38.56,106,38.56,130.86Z" fill="none" stroke="#444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.8" />
  </svg>
);

export const IconRS2 = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <rect x="4.6" y="4.6" width="190.8" height="190.8" rx="8.47" fill="#fff" stroke="#ddd" strokeMiterlimit="10" strokeWidth="6.65" />
    <path d="M65.08,53.81V40H95.85V59.83H80.47Z" fill="#444" />
    <path d="M42.52,49.61l-.11,110.1h118V78a1.89,1.89,0,0,0-1.31-1.81L110.92,60.52a2.05,2.05,0,0,0-.55-.1l-29.58-.58a2.2,2.2,0,0,1-.57-.1L45,47.81A1.9,1.9,0,0,0,42.52,49.61Z" fill="#e35205" />
    <path d="M42.41,159.71V65s35,53.29,118,38.91v55.8Z" fill="#ddd" />
    <circle cx="122.23" cy="132.33" r="15.91" fill="#fff" stroke="#444" strokeMiterlimit="10" strokeWidth="3.8" />
    <path d="M42.52,49.61l-.11,110.1h118V78a1.89,1.89,0,0,0-1.31-1.81L110.92,60.52a2.05,2.05,0,0,0-.55-.1l-29.58-.58a2.2,2.2,0,0,1-.57-.1L45,47.81A1.9,1.9,0,0,0,42.52,49.61Z" fill="none" stroke="#444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.75" />
  </svg>
);

export const IconRS3 = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <path d="M161.75,73.3a82.52,82.52,0,0,0-18.06,11.82c-7.9,6.8-8.53,9.94-16.28,15.12-5.83,3.9-8,3.83-15,8.5a83.48,83.48,0,0,0-8.48,6.53v-2c5.78-13.3,13.1-19.19,19-22.07,4.44-2.17,8.86-3,13.41-7.57,4.71-4.68,5.77-9.53,7.4-13.8,2.28-6,7.69-14,18-22.48Q161.71,60.35,161.75,73.3Z" fill="#fff" />
    <rect x="4.6" y="4.6" width="190.8" height="190.8" rx="8.47" fill="#fff" stroke="#ddd" strokeMiterlimit="10" strokeWidth="6.65" />
    <path d="M147.78,63.18c6.34-10.45,6.46-11.11,13.73-18.68-8.57-2-15.46-1.86-19.74-.7-13.19,3.59-17.73,4.64-23.22,2.53-1.17-.44-15.28-8-16.65-8.94-2.61,1.8-9.07,4.31-14.28,5.14s-11.82-.87-16.94.07c-4.58.83-12.3,3.61-17.89,6.06s-8.85,2.24-12.53,2.53V73c1.88,3,4.64,7.34,8.13,12.42,13.82,20.09,20.6,26,30.93,29.83,9.88,4,24-1.23,24-1.23s7.41-13.24,13.24-17.14c8.34-3.91,11.25-5.71,19.14-12.51C139.62,81,141.45,73.63,147.78,63.18Z" fill="#e35205" />
    <path d="M101.78,170.06l-61-32.43V69.93S63.3,112,85.68,114.4c12.55,1.27,16.84-1.5,16.84-1.5Z" fill="#ddd" />
    <ellipse cx="79.32" cy="135.63" rx="9.83" ry="15.07" transform="translate(-48.46 44.2) rotate(-24.1)" fill="#fff" stroke="#444" strokeMiterlimit="10" strokeWidth="3.8" />
    <path d="M161.51,44.5v89.94L101.8,168.76l.72-55.86s5-14.25,15.13-18.36,12.7-6,16.63-10c3.19-3.27,5.85-15.36,10.76-22.64C146.76,59.37,157.71,45.61,161.51,44.5Z" fill="#666" />
    <path d="M40.8,50.24v87.39l61,33.23,60.48-34.67.2-92.85a44.53,44.53,0,0,0-17.56-1.26c-11.5,1.57-16,7.2-23.66,4.83-1.32-.41-4.24-2.27-10.07-6-2.13-1.35-4-2.61-5.69-3.71a6.6,6.6,0,0,0-7.14-.16,33,33,0,0,1-12.84,4.76c-8.13,1.13-10.34-1.91-18.21,0-6,1.46-7,3.77-15,6.22A56.23,56.23,0,0,1,40.8,50.24Z" fill="none" stroke="#444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.75" />
  </svg>
);

export const IconKinematic = ({ className, ...props }: IconProps) => (
  // Menggunakan icon Dips (Kinematic Software dari Rocscience)
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <rect x="4.6" y="4.6" width="190.8" height="190.8" rx="8.47" fill="#fff" stroke="#e2e2e2" strokeMiterlimit="10" strokeWidth="6.65" />
    <circle cx="99.94" cy="100.17" r="59.23" fill="#ddd" />
    <path d="M152.12,128.41A59.23,59.23,0,1,1,67,51a59.23,59.23,0,0,0,85.14,77.37Z" fill="#666" />
    <path d="M76.05,146.9c7.67-5.6,2.31-10.46-.4-19.06-3.53-11.19-10.7-12.22-18.37-6.61s-7.72,11.55-2.52,17.67c4.08,4.8,6.16,6.88,10.26,9.52C68.22,150.48,72.4,149.57,76.05,146.9Z" fill="#722903" />
    <path d="M70.91,144.73c4.15-3,1.23-6.2-.25-10.86-1.91-6.06-5.79-6.61-9.95-3.58a9,9,0,0,0-2,12.53A8.6,8.6,0,0,0,70.91,144.73Z" fill="#e35205" />
    <path d="M93.38,40.94c-10.29,7.41-37.09,67.72.72,118.3" fill="none" stroke="#444" strokeMiterlimit="10" strokeWidth="2.85" />
    <path d="M41.05,97.54c0,13,64.16,40.87,118.24,3.09" fill="none" stroke="#444" strokeMiterlimit="10" strokeWidth="2.85" />
    <circle cx="100.06" cy="100.17" r="59.23" fill="none" stroke="#444" strokeMiterlimit="10" strokeWidth="4.75" />
    <path d="M99.3,53.62c-9.47,6.92-.57,16,5.54,30.43,7.94,18.72,18.42,22.21,27.88,15.29s9.67-22.77.44-35.39S108.77,46.69,99.3,53.62Z" fill="#722903" />
    <path d="M107.19,58.41c-5.13,3.75-.14,9.54,3.17,17.34,4.3,10.14,10,12,15.11,8.28s5.24-12.33.24-19.18S112.32,54.66,107.19,58.41Z" fill="#e35205" />
  </svg>
);

export const WhatsappIcon = ({ className, ...props }: IconProps) => (
  // Menggunakan icon Dips (Kinematic Software dari Rocscience)
  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" fill="#089e0d" strokeWidth="0"  viewBox="0 0 16 16" className={className} {...props}>
  <path d="M13.641 2.325c-1.497-1.5-3.488-2.325-5.609-2.325-4.369 0-7.925 3.556-7.925 7.928 0 1.397 0.366 2.763 1.059 3.963l-1.125 4.109 4.203-1.103c1.159 0.631 2.463 0.966 3.787 0.966h0.003c0 0 0 0 0 0 4.369 0 7.928-3.556 7.928-7.928 0-2.119-0.825-4.109-2.322-5.609zM8.034 14.525v0c-1.184 0-2.344-0.319-3.356-0.919l-0.241-0.144-2.494 0.653 0.666-2.431-0.156-0.25c-0.663-1.047-1.009-2.259-1.009-3.506 0-3.634 2.956-6.591 6.594-6.591 1.759 0 3.416 0.688 4.659 1.931 1.244 1.247 1.928 2.9 1.928 4.662-0.003 3.637-2.959 6.594-6.591 6.594zM11.647 9.588c-0.197-0.1-1.172-0.578-1.353-0.644s-0.313-0.1-0.447 0.1c-0.131 0.197-0.512 0.644-0.628 0.778-0.116 0.131-0.231 0.15-0.428 0.050s-0.838-0.309-1.594-0.984c-0.588-0.525-0.987-1.175-1.103-1.372s-0.013-0.306 0.088-0.403c0.091-0.088 0.197-0.231 0.297-0.347s0.131-0.197 0.197-0.331c0.066-0.131 0.034-0.247-0.016-0.347s-0.447-1.075-0.609-1.472c-0.159-0.388-0.325-0.334-0.447-0.341-0.116-0.006-0.247-0.006-0.378-0.006s-0.347 0.050-0.528 0.247c-0.181 0.197-0.694 0.678-0.694 1.653s0.709 1.916 0.809 2.050c0.1 0.131 1.397 2.134 3.384 2.991 0.472 0.203 0.841 0.325 1.128 0.419 0.475 0.15 0.906 0.128 1.247 0.078 0.381-0.056 1.172-0.478 1.338-0.941s0.166-0.859 0.116-0.941c-0.047-0.088-0.178-0.137-0.378-0.238z"></path>
  </svg>
);
// ==========================================
// 2. Ikon Eksternal (Placeholder Sementara)
// ==========================================
// Ganti bagian <g> ... </g> dengan path SVG aslinya jika sudah punya.

export const IconPlaxis = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <rect width="200" height="200" fill="#f1f5f9" rx="16" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="bold">PLAXIS</text>
  </svg>
);

export const IconMinescape = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <rect width="200" height="200" fill="#f1f5f9" rx="16" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="bold">Minescape</text>
  </svg>
);

export const IconLeapfrog = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <rect width="200" height="200" fill="#f1f5f9" rx="16" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="bold">Leapfrog</text>
  </svg>
);

export const IconGeoStats = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className} {...props}>
    <rect width="200" height="200" fill="#f1f5f9" rx="16" />
    <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="bold">Geo</text>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="bold">Stats</text>
  </svg>
);