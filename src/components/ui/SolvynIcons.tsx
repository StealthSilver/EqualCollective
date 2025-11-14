import React from "react";
import { ICON_SIZE } from "../../types/solvynTypes";

const IconWrapper: React.FC<{ active: boolean; children: React.ReactNode }> = ({ active, children }) => {
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center transition-all duration-500 ${
        active ? "opacity-100 scale-110" : "opacity-60 scale-100"
      }`}
      style={!active ? { filter: "grayscale(100%) brightness(0.4)" } : {}}
    >
      {children}
    </div>
  );
};

export const TaxIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.049.00995851C22.4341.325767 25.7367 1.28014 28.7794 2.83046c3.0426 1.55031 5.756 3.66123 8.0012 6.2142.9142 1.03954.6576 2.61624-.4624 3.42994L20.5259 23.9483c-1.6569 1.2039-3.98.0202-3.98-2.0279V2.40011c0-1.38439 1.1247-2.518749 2.5031-2.39015149z"
          fill="url(#product-icon-tax-Sticky-a)"
        />
        <circle
          cx="17.6666"
          cy="24.3334"
          transform="rotate(-90 17.6666 24.3334)"
          fill="#96F"
          r="15.6666"
        />
        <path
          d="M31.099 16.2665l-10.5731 7.6818c-1.6569 1.2038-3.98.0201-3.98-2.028V8.70618c.37-.02614.7436-.03943 1.1202-.03943 5.7019 0 10.6924 3.04605 13.4329 7.59975z"
          fill="url(#product-icon-tax-Sticky-b)"
        />
        <defs>
          <linearGradient
            id="product-icon-tax-Sticky-a"
            x1="27.6927"
            y1="-.106484"
            x2="27.6927"
            y2="20.5734"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".23665" stopColor="#FF5191" />
            <stop offset="1" stopColor="#E03071" />
          </linearGradient>
          <linearGradient
            id="product-icon-tax-Sticky-b"
            x1="23.3061"
            y1="24.96"
            x2="18.8407"
            y2="7.43349"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6E00F5" />
            <stop offset="1" stopColor="#9860FE" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const ClimateIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33.24 21.09c-4.28 0-9.09-2.96-13.24-5.81-4.4-3.04-9.24-7.05-13.24-7.05C2.68 8.23 0 11.96 0 15.28v.28a20 20 0 1 0 40 0c-.13 2.68-2.03 5.53-6.76 5.53z"
          fill="url(#product-icon-climate-Sticky-a)"
        />
        <path
          d="M33.24 8.24c-4 0-8.84 4-13.24 7.04-4.15 2.85-8.96 5.8-13.24 5.8-4.73 0-6.63-2.84-6.76-5.52a20 20 0 1 0 40 0v-.28c0-3.32-2.67-7.05-6.76-7.04z"
          fill="url(#product-icon-climate-Sticky-b)"
        />
        <path
          d="M20 15.28c4.15 2.85 8.96 5.8 13.24 5.8 4.73 0 6.63-2.84 6.76-5.52a20 20 0 1 1-40 0c.13 2.68 2.03 5.53 6.76 5.53 4.28 0 9.09-2.96 13.24-5.81z"
          fill="url(#product-icon-climate-Sticky-c)"
        />
        <defs>
          <linearGradient
            id="product-icon-climate-Sticky-a"
            x1="20"
            y1="20.63"
            x2="20"
            y2="9.57"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFD748" />
            <stop offset=".21" stopColor="#FFD644" />
            <stop offset=".33" stopColor="#FFD438" />
            <stop offset=".45" stopColor="#FFD024" />
            <stop offset=".57" stopColor="#FFCB09" />
            <stop offset="1" stopColor="#FFC900" />
          </linearGradient>
          <linearGradient
            id="product-icon-climate-Sticky-b"
            x1="20"
            y1="9.56"
            x2="20"
            y2="21.9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#009C00" />
            <stop offset="1" stopColor="#00BA18" />
          </linearGradient>
          <linearGradient
            id="product-icon-climate-Sticky-c"
            x1="20"
            y1="35.28"
            x2="20"
            y2="15.28"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".13" stopColor="#00CB1B" />
            <stop offset="1" stopColor="#00D924" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const TreasuryIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29 14.5c0-.36-.07-.71-.22-1.04l-3.92-8.94A2.52 2.52 0 0 0 22.56 3H2.52A2.54 2.54 0 0 0 0 5.56v17.88A2.54 2.54 0 0 0 2.52 26h20.04c1 0 1.9-.6 2.3-1.52l3.92-8.94c.15-.33.22-.68.22-1.04z"
          fill="url(#product-icon-banking-Sticky-a)"
        />
        <path
          d="M11 25.5c0 .36.07.71.22 1.04l3.92 8.94c.4.93 1.3 1.52 2.3 1.52h20.04c1.4 0 2.52-1.14 2.52-2.56V16.56A2.54 2.54 0 0 0 37.48 14H17.44c-1 0-1.9.6-2.3 1.52l-3.92 8.94c-.15.33-.22.68-.22 1.04z"
          fill="#00D924"
        />
        <path
          d="M28.95 14a2.59 2.59 0 0 1-.17 1.54l-3.92 8.94c-.4.93-1.3 1.52-2.3 1.52H11.05a2.59 2.59 0 0 1 .17-1.54l3.92-8.94c.4-.93 1.3-1.52 2.3-1.52h11.51z"
          fill="url(#product-icon-banking-Sticky-b)"
        />
        <defs>
          <linearGradient
            id="product-icon-banking-Sticky-a"
            x1="14.5"
            y1="6.13"
            x2="14.5"
            y2="28.22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#11EFE3" />
            <stop offset=".35" stopColor="#14E8E2" />
            <stop offset=".86" stopColor="#1ED6E1" />
            <stop offset="1" stopColor="#21CFE0" />
          </linearGradient>
          <linearGradient
            id="product-icon-banking-Sticky-b"
            x1="25.31"
            y1="29.5"
            x2="25.31"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00D924" />
            <stop offset="1" stopColor="#00A600" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const AtlasIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#product-icon-atlas-a)">
          <path d="M20.51.3c1 0 1.92.57 2.36 1.47l8.22 16.42 8.65 17.31a2.64 2.64 0 0 1-1.65 3.73l-.17.04c-.12.03-.24.04-.36.05h-.18L20.5 35.99 9.94 18.19l8.2-16.42A2.64 2.64 0 0 1 20.52.3z" fill="#FB0"/>
          <path d="M20.51.3c1 0 1.92.57 2.36 1.47l8.22 16.42L20.5 35.98 3.65 39.33a2.64 2.64 0 0 1-2.37-3.83l8.66-17.3 8.2-16.43A2.64 2.64 0 0 1 20.52.3z" fill="url(#product-icon-atlas-b)"/>
          <path d="M20.51.3c1 0 1.92.57 2.36 1.47l8.22 16.42L20.5 35.98 9.94 18.19l8.2-16.42A2.64 2.64 0 0 1 20.34.3h.18z" fill="url(#product-icon-atlas-c)"/>
        </g>
        <defs>
          <linearGradient id="product-icon-atlas-b" x1="16.03" y1="18.01" x2="15.94" y2="39.33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD748"/>
            <stop offset=".54" stopColor="#FFCD48"/>
            <stop offset="1" stopColor="#FFCB48"/>
          </linearGradient>
          <linearGradient id="product-icon-atlas-c" x1="20.51" y1="34.72" x2="20.51" y2="15.01" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFAD00"/>
            <stop offset="1" stopColor="#FF7600"/>
          </linearGradient>
          <clipPath id="product-icon-atlas-a">
            <path fill="#fff" d="M0 0h40v40H0z"/>
          </clipPath>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const ElementsIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 10.02c0-.95.5-1.83 1.33-2.3L16.08.36a2.66 2.66 0 0 1 2.66 0l12.75 7.36a2.66 2.66 0 0 1 1.33 2.3v6l-5-2.89a2.66 2.66 0 0 0-2.66 0l-9.51 5.48a2.66 2.66 0 0 0-1.34 2.3v10.95c0 .9.45 1.72 1.19 2.21L3.33 27.05A2.66 2.66 0 0 1 2 24.75V10.02z" fill="url(#product-icon-elements-a)"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M15.5 34.07l.58.34c.82.48 1.84.48 2.66 0l12.75-7.36a2.66 2.66 0 0 0 1.33-2.3v-8.72l4.47 2.58a2.66 2.66 0 0 1 1.33 2.3v10.95c0 .95-.5 1.83-1.33 2.3l-9.48 5.48c-.82.48-1.83.48-2.65 0l-9.51-5.47-.15-.1z" fill="#96F"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M32.82 16.03l-5-2.9a2.66 2.66 0 0 0-2.66 0l-9.51 5.48a2.66 2.66 0 0 0-1.34 2.3v10.95c0 .9.45 1.72 1.19 2.21l.58.34c.82.48 1.84.48 2.66 0l12.75-7.36a2.66 2.66 0 0 0 1.33-2.3v-8.72z" fill="url(#product-icon-elements-b)"/>
        <defs>
          <linearGradient id="product-icon-elements-a" x1="17.41" y1="2.24" x2="17" y2="32.18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#11EFE3"/>
            <stop offset=".33" stopColor="#15E8E2"/>
            <stop offset=".74" stopColor="#1FD3E0"/>
            <stop offset="1" stopColor="#21CFE0"/>
          </linearGradient>
          <linearGradient id="product-icon-elements-b" x1="21.95" y1="40.81" x2="30.59" y2="9.56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0048E5"/>
            <stop offset=".64" stopColor="#625AF5"/>
            <stop offset="1" stopColor="#8A62FC"/>
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const PaymentsIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.61 11.28a2.56 2.56 0 0 0-1.22-1.04L8.54.2A2.57 2.57 0 0 0 5 2.6V15c0 1.05.64 2 1.61 2.4l6.44 2.6 21.56 8.72c.26-.4.4-.88.39-1.36V12.64c0-.48-.13-.96-.39-1.37z" fill="url(#product-icon-payments-a)"/>
        <path d="M34.63 11.28L13.06 20l-6.45 2.6A2.58 2.58 0 0 0 5 25v12.42a2.58 2.58 0 0 0 3.54 2.39L33.4 29.76c.5-.21.93-.57 1.21-1.04.26-.41.4-.88.39-1.36V12.64c0-.48-.12-.95-.37-1.36z" fill="#96F"/>
        <path d="M34.62 11.28l.1.17c.18.37.28.77.28 1.19v-.03 14.75c0 .48-.13.95-.39 1.36L13.06 20l21.56-8.72z" fill="url(#product-icon-payments-b)"/>
        <defs>
          <linearGradient id="product-icon-payments-a" x1="20" y1="4.13" x2="20" y2="21.13" gradientUnits="userSpaceOnUse">
            <stop stopColor="#11EFE3"/>
            <stop offset="1" stopColor="#21CFE0"/>
          </linearGradient>
          <linearGradient id="product-icon-payments-b" x1="35" y1="11.28" x2="35" y2="28.72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0048E5"/>
            <stop offset="1" stopColor="#9B66FF"/>
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const WindmillIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 22 L22 22 L24 36 L16 36 Z" fill="url(#windmill-tower)" />
        <circle cx="20" cy="12" r="3" fill="url(#windmill-hub)" />
        <path d="M20 12 L26 4 L28 6 L22 14 Z" fill="url(#windmill-blade)" />
        <path d="M20 12 L12 6 L14 4 L22 10 Z" fill="url(#windmill-blade)" />
        <path d="M20 12 L18 20 L16 20 L18 12 Z" fill="url(#windmill-blade)" />
        <defs>
          <linearGradient id="windmill-tower" x1="20" y1="22" x2="20" y2="36">
            <stop stopColor="#A0A0A0" />
            <stop offset="1" stopColor="#C7C7C7" />
          </linearGradient>
          <linearGradient id="windmill-hub" x1="20" y1="9" x2="20" y2="15">
            <stop stopColor="#FFD748" />
            <stop offset="1" stopColor="#FFC900" />
          </linearGradient>
          <linearGradient id="windmill-blade" x1="20" y1="4" x2="20" y2="20">
            <stop stopColor="#00B3FF" />
            <stop offset="1" stopColor="#0092D9" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const SolarPanelIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="30" cy="10" r="6" fill="url(#solar-sun)" />
        <rect
          x="6"
          y="20"
          width="28"
          height="14"
          rx="2"
          fill="url(#solar-panel-surface)"
        />
        <path d="M6 25H34" stroke="url(#solar-panel-lines)" strokeWidth="1.2" />
        <path d="M6 30H34" stroke="url(#solar-panel-lines)" strokeWidth="1.2" />
        <path d="M14 20V34" stroke="url(#solar-panel-lines)" strokeWidth="1.2" />
        <path d="M22 20V34" stroke="url(#solar-panel-lines)" strokeWidth="1.2" />
        <path d="M30 20V34" stroke="url(#solar-panel-lines)" strokeWidth="1.2" />
        <rect x="18" y="34" width="4" height="4" fill="url(#solar-panel-stand)" />
        <defs>
          <linearGradient id="solar-sun" x1="30" y1="4" x2="30" y2="16">
            <stop stopColor="#FFD748" />
            <stop offset="1" stopColor="#FFC900" />
          </linearGradient>
          <linearGradient id="solar-panel-surface" x1="20" y1="20" x2="20" y2="34">
            <stop stopColor="#1E4BFF" />
            <stop offset="1" stopColor="#1638C7" />
          </linearGradient>
          <linearGradient id="solar-panel-lines" x1="20" y1="20" x2="20" y2="34">
            <stop stopColor="#A9C8FF" />
            <stop offset="1" stopColor="#7AA3FF" />
          </linearGradient>
          <linearGradient id="solar-panel-stand" x1="20" y1="34" x2="20" y2="38">
            <stop stopColor="#8A8A8A" />
            <stop offset="1" stopColor="#C5C5C5" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const BatteryIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6"
          y="10"
          width="26"
          height="18"
          rx="3"
          fill="url(#battery-body)"
        />
        <rect
          x="32"
          y="15"
          width="4"
          height="8"
          rx="1"
          fill="url(#battery-cap)"
        />
        <rect
          x="9"
          y="13"
          width="20"
          height="12"
          rx="2"
          fill="url(#battery-fill)"
        />
        <path
          d="M21 14 L17 22 H20 L19 27 L24 20 H21 Z"
          fill="url(#battery-bolt)"
        />
        <defs>
          <linearGradient id="battery-body" x1="20" y1="10" x2="20" y2="28">
            <stop stopColor="#444" />
            <stop offset="1" stopColor="#777" />
          </linearGradient>
          <linearGradient id="battery-cap" x1="34" y1="15" x2="34" y2="23">
            <stop stopColor="#888" />
            <stop offset="1" stopColor="#BEBEBE" />
          </linearGradient>
          <linearGradient id="battery-fill" x1="20" y1="13" x2="20" y2="25">
            <stop stopColor="#00D924" />
            <stop offset="1" stopColor="#00A81A" />
          </linearGradient>
          <linearGradient id="battery-bolt" x1="20" y1="14" x2="20" y2="27">
            <stop stopColor="#FFD748" />
            <stop offset="1" stopColor="#FFC900" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const ForecastingSchedulingIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 28 L14 20 L22 24 L34 12"
          stroke="url(#fs-line)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="28"
          cy="28"
          r="8"
          fill="url(#fs-clock)"
        />
        <path
          d="M28 23 V28 L32 28"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="fs-line" x1="6" y1="12" x2="34" y2="28">
            <stop stopColor="#00B3FF" />
            <stop offset="1" stopColor="#0092D9" />
          </linearGradient>
          <linearGradient id="fs-clock" x1="28" y1="20" x2="28" y2="36">
            <stop stopColor="#FFD748" />
            <stop offset="1" stopColor="#FFC900" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const TradingDeckIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="14"
          width="6"
          height="14"
          rx="1"
          fill="url(#td-green)"
        />
        <path
          d="M13 10 V14"
          stroke="url(#td-green)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="24"
          y="10"
          width="6"
          height="18"
          rx="1"
          fill="url(#td-red)"
        />
        <path
          d="M27 6 V10"
          stroke="url(#td-red)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 30H34"
          stroke="url(#td-base)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="td-green" x1="10" y1="10" x2="10" y2="28">
            <stop stopColor="#00CB1B" />
            <stop offset="1" stopColor="#00A817" />
          </linearGradient>
          <linearGradient id="td-red" x1="24" y1="6" x2="24" y2="28">
            <stop stopColor="#FF5A5A" />
            <stop offset="1" stopColor="#E63B3B" />
          </linearGradient>
          <linearGradient id="td-base" x1="6" y1="30" x2="34" y2="30">
            <stop stopColor="#A0A0A0" />
            <stop offset="1" stopColor="#C7C7C7" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const ReportingIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="6"
          width="24"
          height="28"
          rx="3"
          fill="url(#rp-doc)"
        />
        <path
          d="M28 6 L32 10 L28 10 Z"
          fill="url(#rp-fold)"
        />
        <rect x="12" y="22" width="4" height="8" fill="url(#rp-bar)" />
        <rect x="18" y="18" width="4" height="12" fill="url(#rp-bar)" />
        <rect x="24" y="14" width="4" height="16" fill="url(#rp-bar)" />
        <path d="M12 12H26" stroke="#ffffffaa" strokeWidth="2" />
        <path d="M12 16H22" stroke="#ffffffaa" strokeWidth="2" />
        <defs>
          <linearGradient id="rp-doc" x1="20" y1="6" x2="20" y2="34">
            <stop stopColor="#1E4BFF" />
            <stop offset="1" stopColor="#1638C7" />
          </linearGradient>
          <linearGradient id="rp-fold" x1="28" y1="6" x2="32" y2="10">
            <stop stopColor="#A9C8FF" />
            <stop offset="1" stopColor="#7AA3FF" />
          </linearGradient>
          <linearGradient id="rp-bar" x1="20" y1="14" x2="20" y2="30">
            <stop stopColor="#FFD748" />
            <stop offset="1" stopColor="#FFC900" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

export const BidOptimizationIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <IconWrapper active={active}>
      <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 12 L22 12 L30 20 L20 30 L10 30 Z"
          fill="url(#bo-tag)"
          stroke="url(#bo-tag-stroke)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="16" r="2.5" fill="white" opacity="0.85" />
        <path
          d="M18 24 L24 18 L28 22"
          stroke="url(#bo-arrow)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="bo-tag" x1="20" y1="12" x2="20" y2="30">
            <stop offset="0" stopColor="#1E4BFF" />
            <stop offset="1" stopColor="#1638C7" />
          </linearGradient>
          <linearGradient id="bo-tag-stroke" x1="20" y1="12" x2="20" y2="30">
            <stop stopColor="#A9C8FF" />
            <stop offset="1" stopColor="#7AA3FF" />
          </linearGradient>
          <linearGradient id="bo-arrow" x1="18" y1="18" x2="28" y2="24">
            <stop stopColor="#00CB1B" />
            <stop offset="1" stopColor="#00D924" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrapper>
  );
};

