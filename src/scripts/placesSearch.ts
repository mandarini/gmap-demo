export function placesSearch(map: google.maps.Map) {
  const autocomplete_input: HTMLInputElement = document.getElementById(
    "place-input"
  ) as HTMLInputElement;

  const autocomplete = new google.maps.places.Autocomplete(autocomplete_input);
  autocomplete.bindTo("bounds", map);
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
  const marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", function () {
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    infowindow.setContent(infowindowContent);
    console.log(place);

    let address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }
    (document.getElementById(
      "place-icon"
    ) as HTMLImageElement).src = place.icon as string;
    (document.getElementById("place-name") as HTMLSpanElement).textContent =
      place.name;
    (document.getElementById(
      "place-address"
    ) as HTMLSpanElement).textContent = address;

    infowindow.open(map, marker);
  });

  (document.getElementById(
    "use-strict-bounds"
  ) as HTMLElement).addEventListener("change", (event) => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    autocomplete.setOptions({ strictBounds: target.checked });
  });
}
