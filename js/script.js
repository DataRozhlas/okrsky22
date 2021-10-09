/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
import './byeie'; // loučíme se s IE
import { staticStyleUrl, getMapLayerStyle } from './style'; // import stylu
import { parties, getPartyShortName, getPartyLongName } from './parties'; // list of all parties
import { breaks } from './breaks';
import { basicColors, partyColors } from './style'; // list of all parties

// class identifiers in html
const mapClass = 'map';
const selectorClass = 'selector';
const mapContainerClass = 'container';
const maplegendClass = 'legend';
const mapscaleClass = 'scale';

const attendanceId = 'ucast';

const host = 'https://data.irozhlas.cz';

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
    const mapContainer = this.container.querySelectorAll(`.${mapClass}`);
    // find child of the container with map class identifier
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

    if (this.centerLng === '') {
      const crBounds = [
        [12.0, 48.55],
        [18.85, 51.06],
      ];
      this.map.fitBounds(crBounds);
    }

    this.map.scrollZoom.disable();

    this.map.addControl(new maplibregl.NavigationControl());
    this.map.addControl(new Gcoder(), 'top-left');
    this.addEvents();
    this.createSelector();
    this.createLegend();
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
        tiles: [`${host}/okrsky21/tiles/{z}/{x}/{y}.pbf`],
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
    const scaleContainer = this.getContainer(mapscaleClass);
    this.selector = new PartySelector(selContainer, this, this.selectedParty, scaleContainer);
    this.selector.create();
  }
}

class MapLegend {
  constructor(container, map) {
    this.container = container;
    this.map = map;
    this.legend = null;
    this.baseText = 'Vyberte okrsek v mapě.<br>&nbsp;';
    this.text = this.baseText;
  }

  create() {
    this.legend = document.createElement('div');
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
    } else if (displayedParty === attendanceId) { // display attendance in region
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
    const partyVotes = regionData.properties[partyId] || 0;
    const result = Math.round((partyVotes / regionData.properties.hlasy_platne) * 1000) / 10;
    const text = `<b>Okrsek č. ${regionData.properties.Cislo} | ${regionData.properties.nazob}</b><br><b>${result} %</b> (${partyVotes} z ${regionData.properties.hlasy_platne} platnýc hlasů)`;
    return text;
  }
}

class PartySelector {
  constructor(container, map, selectedParty, scaleContainer) {
    this.container = container;
    this.map = map;
    this.selected = selectedParty;
    this.scale = scaleContainer;
  }

  createOption(partyId) {
    const option = document.createElement('option');
    option.innerHTML = getPartyLongName(partyId);
    option.value = partyId;
    return option;
  }

  makeScale() {
    const scaleDiv = document.createElement('div');
    scaleDiv.setAttribute('class', 'scale-holder');
    const brks = breaks[this.selected];
    const clrs = partyColors[this.selected] || basicColors;
    brks.forEach((brk, i) => {
      scaleDiv.innerHTML += `<div><span style="background-color: ${clrs[i]}"></span>${Math.round(brk * 1000) / 10} %</div>`;
    });
    return scaleDiv;
  }

  create() {
    const selector = document.createElement('select');
    const option = this.createOption(attendanceId);
    selector.appendChild(option);
    for (const partyId in parties) {
      const opt = this.createOption(partyId);
      selector.appendChild(opt);
    }
    this.container.appendChild(selector);
    this.addEvents(selector);
    selector.value = this.selected; // change default party to selected party

    // makes scale
    this.scale.appendChild(this.makeScale(this.selected));
  }

  addEvents(selector) {
    selector.addEventListener('change', (event) => {
      const selVal = event.currentTarget.selectedOptions[0].value;
      this.map.changeLayer(selVal);
      this.selected = selVal;

      // change scale on party change
      this.scale.innerHTML = '';
      this.scale.appendChild(this.makeScale(this.selected));
    });
  }
}

class Gcoder {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl gcode_form';

    const inp = document.createElement('input');
    inp.setAttribute('type', 'text');
    inp.setAttribute('placeholder', 'Vyhledejte obec či adresu v mapě');
    inp.setAttribute('size', inp.getAttribute('placeholder').length + 1);
    this._container.append(inp);

    const butt = document.createElement('button');
    butt.textContent = '🔍';
    butt.addEventListener('click', () => this.findAndMove(inp.value, this._map));
    this._container.append(butt);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  async findAndMove(input, map) {
    const crBounds = [
      [12.0, 48.55],
      [18.85, 51.06],
    ];
    this._map = map;
    const response = await fetch(`https://api.mapy.cz/geocode?query=${input}`);
    const dataText = await response.text();
    const data = (new window.DOMParser()).parseFromString(dataText, 'text/xml');
    const res = data.firstChild.children[0];
    if (res.children.length === 0) {
      map.fitBounds(crBounds);
    }
    if (res.children[0].attributes.x === undefined) {
      map.fitBounds(crBounds);
    } else {
      const x = parseFloat(res.children[0].attributes.x.value);
      const y = parseFloat(res.children[0].attributes.y.value);
      if (x < 12 || x > 19 || y < 48 || y > 52) { // limit coordinates to CR only (approximately)
        map.fitBounds(crBounds);
      } else {
        this._map.flyTo({ center: [x, y], zoom: 12 });
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
      const centerLng = container.dataset.centerLng;
      const centerLat = container.dataset.centerLat;
      const zoom = container.dataset.zoom;
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
