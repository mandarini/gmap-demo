/// <reference types="@types/markerclustererplus" />

import * as clickListeners from "./scripts/clickListeners";
import { FunWithMaps } from "./scripts/map";
import {} from "google-maps";

setTimeout(() => {
  clickListeners.loadAllDrawingButtons();
  clickListeners.listenersForControlButtons();
}, 2000);

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 11,
    scrollwheel: true,
    center: new google.maps.LatLng(51.561638, -0.14),
    panControl: false,
    mapTypeControl: false,
    zoomControl: true,
    streetViewControl: false,
    scaleControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
  });
  FunWithMaps(map);
}
export { initMap };

import "./style.css"; // required for webpack
