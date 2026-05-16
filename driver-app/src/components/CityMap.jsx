import React from 'react';
import Svg, { Defs, Pattern, Rect, Path, Circle, Text as SvgText } from 'react-native-svg';

export default function CityMap({
  width = 380, height = 240, dark = false,
  showRoute = true, showDriver = true, showPickup = true, showDropoff = true,
  showHeat = false, color = '#00A89B', deep = '#008275',
  routeProgress = 0.45,
}) {
  const land = dark ? '#0B1620' : '#E8EEF3';
  const street = dark ? '#1A2733' : '#FFFFFF';
  const block = dark ? '#11202A' : '#DFE6EC';
  const water = dark ? '#0A2230' : '#CFE4F0';
  const label = dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,40,60,0.35)';
  const routePath = 'M 40 200 Q 80 180 110 160 T 180 130 Q 220 110 260 100 T 340 70';
  const driverX = 40 + (340 - 40) * routeProgress;
  const driverY = 200 + (70 - 200) * routeProgress;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <Pattern id="gridpat" width="40" height="40" patternUnits="userSpaceOnUse">
          <Rect width="40" height="40" fill={block} />
          <Rect x="0" y="0" width="40" height="2" fill={street} />
          <Rect x="0" y="0" width="2" height="40" fill={street} />
        </Pattern>
      </Defs>
      <Rect width={width} height={height} fill={land} />
      <Rect width={width} height={height} fill="url(#gridpat)" />
      <Path d={`M -10 ${height * 0.75} Q ${width * 0.3} ${height * 0.55} ${width * 0.6} ${height * 0.65} T ${width + 10} ${height * 0.5}`}
        stroke={water} strokeWidth="22" fill="none" strokeLinecap="round" />
      <Path d="M 0 130 L 400 80" stroke={street} strokeWidth="6" />
      <SvgText x="60" y="50" fill={label} fontSize="9" fontWeight="600">Jl. Sudirman</SvgText>
      <SvgText x="200" y="220" fill={label} fontSize="9" fontWeight="600">Senayan</SvgText>
      {showHeat && (
        <>
          <Circle cx={width * 0.7} cy={height * 0.35} r="60" fill={color} opacity="0.18" />
          <Circle cx={width * 0.7} cy={height * 0.35} r="36" fill={color} opacity="0.28" />
          <Circle cx={width * 0.25} cy={height * 0.7} r="48" fill={color} opacity="0.15" />
        </>
      )}
      {showRoute && (
        <>
          <Path d={routePath} stroke={deep} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.18" />
          <Path d={routePath} stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeDasharray="14,6" />
        </>
      )}
      {showPickup && (
        <>
          <Circle cx="40" cy="200" r="9" fill={color} opacity="0.25" />
          <Circle cx="40" cy="200" r="5" fill={color} />
          <Circle cx="40" cy="200" r="2" fill="white" />
        </>
      )}
      {showDropoff && (
        <>
          <Circle cx="340" cy="70" r="10" fill="white" stroke={deep} strokeWidth="2" />
          <Rect x="338.5" y="63" width="1.5" height="14" fill={deep} />
          <Path d="M 340 63 L 347 66 L 340 69 Z" fill={deep} />
        </>
      )}
      {showDriver && (
        <>
          <Circle cx={driverX} cy={driverY} r="14" fill="white" opacity="0.8" />
          <Circle cx={driverX} cy={driverY} r="10" fill={deep} />
          <Path d={`M ${driverX - 5} ${driverY - 2} L ${driverX} ${driverY - 6} L ${driverX + 5} ${driverY - 2} L ${driverX + 5} ${driverY + 4} L ${driverX - 5} ${driverY + 4} Z`} fill="white" />
        </>
      )}
    </Svg>
  );
}
