import {} from "google-maps";

let drawingManager: google.maps.drawing.DrawingManager;
let drawingLayer: google.maps.Data;
let allOverlays: any[] = [];

export function listenForDrawing(map: google.maps.Map) {
  console.log("hello", drawingManager);
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: false, // i have my custom tools so i don't need the defaults to be displayed
  });
  drawingManager.setMap(map);
  drawingLayer = new google.maps.Data();
  drawingManager.addListener("overlaycomplete", (event) => {
    allOverlays.push(event.overlay);
    event.overlay.addListener("rightclick", () => {
      event.overlay.setMap(null);
    });
    switch (event.type) {
      case "polygon":
        drawingLayer.add(
          new google.maps.Data.Feature({
            geometry: new google.maps.Data.Polygon([
              event.overlay.getPath().getArray(),
            ]),
          })
        );
        /**
         * We could do this, here:
         *
         * drawingLayer.setMap(map);
         *
         * The reason we are not doing this,
         * is because we want to keep the custom icons
         * showing. And if we add the data layer on the map,
         * it will use the default.
         */
        map.data.add(
          new google.maps.Data.Feature({
            geometry: new google.maps.Data.Polygon([
              event.overlay.getPath().getArray(),
            ]),
          })
        );

        let infoWindow = new google.maps.InfoWindow();
        let marker_area = new google.maps.Marker({
          position: event.overlay.getPath().getArray()[0],
        });
        marker_area.setMap(map);
        infoWindow.setPosition(event.overlay.getPath().getArray()[0]);
        infoWindow.setContent(
          `<p>${Math.round(
            calculateArea(event.overlay.getPath().getArray())
          )} square meters</p>`
        );
        infoWindow.open(map, marker_area);
        break;
      case "rectangle":
        let bounds = event.overlay.getBounds();
        let points = [
          bounds.getSouthWest(),
          {
            lat: bounds.getSouthWest().lat(),
            lng: bounds.getNorthEast().lng(),
          },
          bounds.getNorthEast(),
          {
            lng: bounds.getSouthWest().lng(),
            lat: bounds.getNorthEast().lat(),
          },
        ];
        drawingLayer.add(
          new google.maps.Data.Feature({
            geometry: new google.maps.Data.Polygon([points]),
          })
        );
        map.data.add(
          new google.maps.Data.Feature({
            geometry: new google.maps.Data.Polygon([points]),
          })
        );
        break;
      case "polyline":
        drawingLayer.add(
          new google.maps.Data.Feature({
            geometry: new google.maps.Data.LineString(
              event.overlay.getPath().getArray()
            ),
          })
        );
        map.data.add(
          new google.maps.Data.Feature({
            geometry: new google.maps.Data.LineString(
              event.overlay.getPath().getArray()
            ),
          })
        );
        const start: google.maps.LatLng = new google.maps.LatLng(
          event.overlay.getPath().getArray()[0].lat(),
          event.overlay.getPath().getArray()[0].lng()
        );
        const finish: google.maps.LatLng = new google.maps.LatLng(
          event.overlay.getPath().getArray()[1].lat(),
          event.overlay.getPath().getArray()[1].lng()
        );
        let marker = new google.maps.Marker({
          position: calculatePoints(start, finish, 0.25),
        });
        marker.setMap(map);
        marker = new google.maps.Marker({
          position: calculatePoints(start, finish, 0.5),
        });
        marker.setMap(map);
        marker = new google.maps.Marker({
          position: calculatePoints(start, finish, 0.75),
        });
        marker.setMap(map);
        break;
      case "circle":
        drawingLayer.add(
          new google.maps.Data.Feature({
            properties: {
              radius: event.overlay.getRadius(),
            },
            geometry: new google.maps.Data.Point(event.overlay.getCenter()),
          })
        );
        map.data.add(
          new google.maps.Data.Feature({
            properties: {
              radius: event.overlay.getRadius(),
            },
          })
        );
        break;
      case "marker":
        drawingLayer.add(
          new google.maps.Data.Feature({
            geometry: new google.maps.Data.Point(event.overlay.getPosition()),
          })
        );
        break;
      default:
        console.log("end");
    }
  });
}

export function draw(type: string) {
  switch (type) {
    case "marker":
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
      let point: google.maps.Icon = {
        url: "assets/img/point.png",
        scaledSize: new google.maps.Size(30, 30),
      };

      drawingManager.setOptions({
        markerOptions: {
          icon: point,
          clickable: true,
          draggable: true,
        },
      });
      break;
    case "cat":
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
      let cat: google.maps.Icon = {
        url: "assets/img/cat.png",
        scaledSize: new google.maps.Size(70, 70),
      };
      drawingManager.setOptions({
        markerOptions: {
          icon: cat,
          clickable: true,
          draggable: true,
        },
      });
      break;
    case "polygon":
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
      drawingManager.setOptions({
        polygonOptions: {
          fillColor: "#9c4d4f",
          fillOpacity: 0.5,
          strokeWeight: 2,
          strokeColor: "#401619",
          clickable: true,
          editable: true,
          draggable: true,
        },
      });
      break;
    case "square":
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
      drawingManager.setOptions({
        rectangleOptions: {
          fillColor: "#fff82e",
          fillOpacity: 0.5,
          strokeWeight: 2,
          strokeColor: "#c8a535",
          clickable: true,
          editable: true,
          draggable: true,
        },
      });
      break;
    case "polyline":
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
      drawingManager.setOptions({
        polylineOptions: {
          strokeWeight: 2,
          strokeColor: "#00b801",
          clickable: true,
          editable: true,
          draggable: true,
        },
      });
      break;
    case "circle":
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
      drawingManager.setOptions({
        circleOptions: {
          fillColor: "#00b801",
          fillOpacity: 0.5,
          strokeWeight: 2,
          strokeColor: "#00b801",
          clickable: true,
          editable: true,
          draggable: true,
        },
      });
      break;
    case "pan":
      drawingManager.setDrawingMode(null);
      break;
    case "save":
      drawingManager.setDrawingMode(null);
      drawingLayer.toGeoJson((obj) => {
        console.log(obj);
        download(JSON.stringify(obj), "drawingData.txt");
      });
      break;
    default:
      drawingManager.setDrawingMode(null);
  }
}

function download(content: string, fileName: string) {
  let a = document.createElement("a");
  let file = new Blob([content], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export function clearAll() {
  allOverlays.map((overlay) => {
    overlay.setMap(null);
  });
  drawingLayer.setMap(null);
  drawingLayer = new google.maps.Data();
  allOverlays = [];
}

function calculatePoints(
  point_a: google.maps.LatLng,
  point_b: google.maps.LatLng,
  fraction: number
): google.maps.LatLng {
  return google.maps.geometry.spherical.interpolate(point_a, point_b, fraction);
}

function calculateArea(point: google.maps.MVCArray<google.maps.LatLng>) {
  return google.maps.geometry.spherical.computeArea(point);
}
