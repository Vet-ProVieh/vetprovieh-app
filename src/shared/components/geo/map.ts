import {VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {Feature, Map, View} from 'ol';
import {Coordinate} from 'ol/coordinate';
import Circle from 'ol/geom/Circle';
import Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {transform} from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import {GpsCoordinates} from '../../models';

// eslint-disable-next-line new-cap
@WebComponent({
  template: `
        <link rel="stylesheet" href="/assets/css/ol.css">
        <style>
            #map {
                width: 100%;
                height: 100%;
            }
        </style>
        <div id="map">
        </div>
    `,
  tag: 'geo-map',
})
/**
 * Display a Map
 */
export class GeoMap extends VetproviehElement {
    private map: Map | undefined;

    private vectorLayer: VectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: 'white',
        }),
      }),
    });

    private _center: Coordinate = [0, 0];

    private zoom = 16;

    /**
 * Connected-Callback
 */
    connectedCallback() {
      this.createMap();
      if (this.map) {
        this.map.render();
      }
    }

    /**
     * Getting coordinate
     * @return {GpsCoordinates}
     */
    public get gpsCenter(): GpsCoordinates {
      return GpsCoordinates.createFromOpenLayers(this._center);
    }

    /**
     * Setting coordinate
     * @param {GpsCoordinates} value
     */
    public set gpsCenter(value: GpsCoordinates) {
      if (value && !value.equals(this._center)) {
        this._center = [value.longitude, value.latitude];
        this.recenterMap();
      }
    }

    /**
     * Rendering the Element
     */
    public render() {
      super.render();
    }

    /**
     * Koordinaten anzeigen
     */
    public addMarker() {
      const source = this.vectorLayer.getSource();
      const feature = new Feature(new Circle(this.transformedCenter, 20));
      source.addFeature(feature);
    }

    /**
     * Removing all Markers
     */
    public clearMarkers() {
      const source = this.vectorLayer.getSource();
      source.clear();
    }

    /**
     * Recenter the displayed map
     */
    private recenterMap() {
      if (this.map) {
        this.map.getView().setCenter(this.transformedCenter);
      }
    }

    /**
     * Creating Map to Display
     */
    private createMap() {
      this.map = new Map({
        target: this.mapDiv,
        layers: this.generateLayers(),
        view: this.buildView(),
      });
    }

    /**
     * Return Center coordinates transformd
     * @return {Coordinate}
     */
    private get transformedCenter(): Coordinate {
      return transform(this._center, 'EPSG:4326', 'EPSG:3857');
    }

    /**
     * Getting MapDiv
     * @return {HTMLElement}
     */
    private get mapDiv(): HTMLElement {
      return this.getByIdFromShadowRoot('map') as HTMLElement;
    }

    /**
     * Ansicht erstellen
     * @return {View}
     */
    private buildView(): View {
      return new View({
        center: this._center,
        zoom: this.zoom,
      });
    }


    /**
     * Building Layer for Map
     * @return {Layer[]}
     */
    private generateLayers(): Layer[] {
      return [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ];
    }
}
