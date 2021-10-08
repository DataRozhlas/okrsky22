/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
import './byeie'; // loučíme se s IE
import { staticStyleUrl, getMapLayerStyle } from './style'; // import stylu
import { parties, getPartyShortName, getPartyLongName } from './parties'; // list of all parties (now using old one)

// class identifiers in html
const mapClass = 'map';
const selectorClass = 'selector';
const mapContainerClass = 'container';
const geocodeFinderClass = 'finder';
const maplegendClass = 'legend';

const attendanceId = 'ucast';

const host = 'https://data.irozhlas.cz';

function getPartyIdLong(id) {
  if (id === attendanceId) {
    return id;
  }
  return `part_${id}`;
}

class Map {
  constructor(containerId, centerLng, centerLat, zoom, selectedParty) {
    this.containerId = containerId; // ID of container element
    this.container = document.getElementById(containerId);
    // center - point on the map on which the map is centered on first load
    this.centerLng = centerLng; // longitude
    this.centerLat = centerLat; // latitude
    this.zoom = zoom; // zoom on first load
    this.selectedParty = selectedParty; // displaying layer with this party on first load

    this.map = null; // mapbox object
    this.geocoder = null;
    this.selector = null;
    this.legend = null;
  }

  createMap() {
    const mapContainer = $(this.container).children(`.${mapClass}`); // find child of the container with map class identifier
    if (mapContainer.length === 0) {
      throw new Error(`Element with class ${mapClass} missing from map container with id ${this.containerId}`);
    }
    if (mapContainer.length > 1) {
      throw new Error(`Only one map element should be present in map container ${this.containerId}`);
    }
    this.map = new maplibregl.Map({
      container: mapContainer[0],
      style: staticStyleUrl, // imported style
      zoom: this.zoom,
      center: [this.centerLng, this.centerLat],
      maxZoom: 15, // ToDo: remove constant
      attributionControl: false,
    });

    this.map.addControl(new maplibregl.NavigationControl());
    this.addEvents();
    this.createSelector();
    this.createLegend();
    this.createGeocoder();
  }

  getContainer(className) {
    const containers = this.container.getElementsByClassName(className);
    if (containers.length === 0) {
      throw new Error(`Element with class ${className} missing from map container with id${this.containerId}`);
    }
    if (containers.length > 1) {
      throw new Error(`Only one ${className} element should be present in map container ${this.containerId}`);
    }
    return containers[0];
  }

  addInitialLayer() {
    this.map.addLayer({
      id: 'data',
      type: 'fill',
      source: {
        type: 'vector',
        tiles: [`${host}/eu-19-okrsky/tiles/{z}/{x}/{y}.pbf`],
      },
      'source-layer': 'data',
      paint: {
        'fill-color': getMapLayerStyle(this.selectedParty),
        'fill-opacity': 0.8,
        'fill-outline-color': 'hsla(0, 0%, 52%, 0.4)',
      },
    });
  }

  changeLayer(partyIdLong) {
    const style = getMapLayerStyle(partyIdLong);
    this.map.setPaintProperty('data', 'fill-color', style);
  }

  addEvents() {
    this.map.on('load', () => this.addInitialLayer());

    // update legend on mouse move
    this.map.on('mousemove', (e) => {
      const data = this.map.queryRenderedFeatures(e.point, { layers: ['data'] });
      const regionData = data.length === 0 ? null : data[0];
      this.legend.update(regionData, this.selector.selected);
    });
  }

  createLegend() {
    const legendContainer = this.getContainer(maplegendClass);
    this.legend = new MapLegend(legendContainer, this.map);
    this.legend.create();
  }

  createSelector() {
    const selContainer = this.getContainer(selectorClass);
    this.selector = new PartySelector(selContainer, this, this.selectedParty);
    this.selector.create();
  }

  createGeocoder() {
    const geoContainer = this.getContainer(geocodeFinderClass);
    this.geocoder = new GeocodeFinder(geoContainer, this);
    this.geocoder.create();
  }

  moveTo(coorList, zoom = null) {
    if (coorList === null) {
      this.moveToCenter();
    } else {
      zoom = zoom == null ? this.zoom : zoom;
      this.map.flyTo({ center: coorList, zoom });
    }
  }

  moveToCenter() {
    this.map.flyTo({ center: [this.centerLng, this.centerLat], zoom: this.zoom });
  }
}

class MapLegend {
  constructor(container, map) {
    this.container = container;
    this.map = map;
    this.legend = null;
    this.baseText = 'Vyberte okrsek v mapě.';
    this.text = this.baseText;
  }

  create() {
    this.legend = document.createElement('p');
    this.legend.innerHTML = this.text;
    this.container.appendChild(this.legend);
  }

  setText(newText) {
    this.text = newText;
    this.legend.innerHTML = this.text;
  }

  update(regionData, displayedParty) {
    if (regionData == null) { // region doesn't have voting data - display placeholder
      this.setText(this.baseText);
    } else if (displayedParty == attendanceId) { // display attendance in region
      this.setText(this.getAttendanceText(regionData));
    } else { // display party result
      this.setText(this.getPartyText(regionData, displayedParty));
    }
  }

  getAttendanceText(regionData) {
    // accuracy to one decimal place
    const attendance = Math.round((regionData.properties.hlasy_platne / regionData.properties.zapsani) * 1000) / 10 || 0;
    const text = `<b>Okrsek č. ${regionData.properties.Cislo} | ${regionData.properties.nazob}</b><br><b>${attendance} %</b> (${regionData.properties.hlasy_platne} z ${regionData.properties.zapsani} zapsaných voličů)`;
    return text;
  }

  getPartyText(regionData, partyId) {
    // accuracy to one decimal place
    const result = Math.round((regionData.properties[partyId] / regionData.properties.hlasy_platne) * 1000) / 10 || 0;
    const text = `<b>Okrsek č. ${regionData.properties.Cislo} | ${regionData.properties.nazob}</b><br><b>${result} %</b> (${regionData.properties[partyId]} z ${regionData.properties.hlasy_platne} platnýc hlasů)`;
    return text;
  }
}

class PartySelector {
  constructor(container, map, selectedParty) {
    this.container = container;
    this.map = map;
    this.selected = selectedParty;
  }

  createOption(partyId) {
    const option = document.createElement('option');
    option.innerHTML = getPartyLongName(partyId);
    option.value = partyId;
    return option;
  }

  create() {
    const selector = document.createElement('select');
    var option = this.createOption(attendanceId);
    selector.appendChild(option);
    for (const partyId in parties) {
      var option = this.createOption(partyId);
      selector.appendChild(option);
    }
    this.container.appendChild(selector);
    this.addEvents(selector);
    selector.value = this.selected; // change default party to selected party
  }

  addEvents(selector) {
    selector.addEventListener('change', (event) => {
      const selVal = event.currentTarget.selectedOptions[0].value;
      this.map.changeLayer(selVal);
      this.selected = selVal;
    });
  }
}

class GeocodeFinder {
  constructor(container, map) {
    this.container = container;
    this.map = map;

    this.placeholderText = 'Vyhledejte obec či adresu na mapě';
    this.submitButtonText = 'Najít';
    this.findZoom = 12;
  }

  create() {
    const geocodeContainer = $(this.container);
    const form = $('<form></form>');
    form.append(`<input class="text" type="text" placeholder="${this.placeholderText}">`);
    form.append(`<input type="submit" value="${this.submitButtonText}">`);
    form.submit((event) => {
      event.preventDefault();
      const textInput = $(event.currentTarget).children('.text').val();
      this.findAndMove(textInput);
    });
    geocodeContainer.append(form);
  }

  async findAndMove(input) {
    const response = await fetch(`https://api.mapy.cz/geocode?query=${input}`);
    const data = await response.text();
    if ($(data).find('item').attr('x') === undefined) {
      this.map.moveToCenter();
    } else {
      const x = parseFloat($(data).find('item').attr('x'));
      const y = parseFloat($(data).find('item').attr('y'));
      if (x < 12 || x > 19 || y < 48 || y > 52) { // limit coordinates to CR only (approximately)
        this.map.moveToCenter();
      } else {
        this.map.moveTo([x, y], this.findZoom);
      }
    }
  }
}

class MapEmbedder {
  constructor() {
    // when data attributes are not specified in html, default values are used
    this.defaultLng = 15.3350758;
    this.defaultLat = 49.7417517;
    this.defaultZoom = 7;
    this.defaultParty = attendanceId;
  }

  embedAllMaps() {
    const containers = document.getElementsByClassName(mapContainerClass);
    for (const container of containers) {
      const { id } = container;
      const centerLng = container.dataset.centerLng ? container.dataset.centerLng : this.defaultLng;
      const centerLat = container.dataset.centerLat ? container.dataset.centerLat : this.defaultLat;
      const zoom = container.dataset.zoom ? container.dataset.zoom : this.defaultZoom;
      const party = container.dataset.party ? container.dataset.party : this.defaultParty;
      const map = new Map(id, centerLng, centerLat, zoom, party);
      map.createMap();
    }
  }
}

window.onload = function () {
  const embedder = new MapEmbedder();
  embedder.embedAllMaps();
};
