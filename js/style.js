import { breaks } from './breaks'; // percentage breaks for parties (now using old one)

const staticStyleUrl = 'https://data.irozhlas.cz/mapa-domu/map_styl/style.json';

// colors for parties without specified color palette and for attendance
export const basicColors = ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'];

// color for the first break - same for everyone
const zeroPercentColor = '#f2f0f7';
// color for the last break - same for everyone
const hundredPercentColor = '#a50f15';

// party color palettess
export const partyColors = {
  HL_ANO: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'], // ANO
  HL_ODS: ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'], // SPOLU
  'HL_ODS-TOP 09': ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'], // SPOLU
  'HL_KDU-ODS-TOP 09': ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'], // SPOLU
  HL_Piráti: ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'], // PirSTAN
  HL_SPD: ['#ffffd4', '#fee391', '#fec44f', '#fe9929', '#d95f0e', '#993404'], // SPD
  'HL_SPD-Trikolora': ['#ffffd4', '#fee391', '#fec44f', '#fe9929', '#d95f0e', '#993404'], // SPD
  'HL_PRAHA SOBĚ-NK': ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#c51b8a', '#7a0177'],
  HL_STAN: ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'], // KSCM
  UCAST: ['#f1eef6', '#d4b9da', '#c994c7', '#df65b0', '#dd1c77', '#980043'], // CSSD
};

function getPartyColor(partyIdLong, idx) {
  if (partyIdLong in partyColors) {
    return partyColors[partyIdLong][idx];
  }
  return basicColors[idx];
}

function getAttendanceStyle(partyIdLong) {
  const style = [
    'case',
    ['has', 'ZAPSANI_VOLICI'],
    [
      'interpolate',
      ['linear'],
      ['/', ['get', 'ODEVZDANE_OBALKY'], ['get', 'ZAPSANI_VOLICI']],
      0, zeroPercentColor,
      breaks[partyIdLong][0], getPartyColor(partyIdLong, 0),
      breaks[partyIdLong][1], getPartyColor(partyIdLong, 1),
      breaks[partyIdLong][2], getPartyColor(partyIdLong, 2),
      breaks[partyIdLong][3], getPartyColor(partyIdLong, 3),
      1.0, hundredPercentColor,
    ],
    'white',
  ];
  return style;
}

function getPartyStyle(partyIdLong) {
  const style = [
    'case',
    ['has', partyIdLong],
    [
      'interpolate',
      ['linear'],
      ['/', ['get', partyIdLong], ['get', 'PLATNE_HLASY']],
      0, zeroPercentColor,
      breaks[partyIdLong][0], getPartyColor(partyIdLong, 0),
      breaks[partyIdLong][1], getPartyColor(partyIdLong, 1),
      breaks[partyIdLong][2], getPartyColor(partyIdLong, 2),
      breaks[partyIdLong][3], getPartyColor(partyIdLong, 3),
      1.0, hundredPercentColor,
    ],
    'white',
  ];
  return style;
}

function getMapLayerStyle(partyIdLong) {
  if (partyIdLong === 'UCAST') {
    return getAttendanceStyle(partyIdLong);
  }
  return getPartyStyle(partyIdLong);
}

export { staticStyleUrl, getMapLayerStyle };
