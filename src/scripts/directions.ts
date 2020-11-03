export function directionCalculator(map: google.maps.Map) {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  const service: google.maps.DistanceMatrixService = new google.maps.DistanceMatrixService();

  const autocomplete_input_origin: HTMLInputElement = document.getElementById(
    "origin"
  ) as HTMLInputElement;
  const autocomplete_input_destination: HTMLInputElement = document.getElementById(
    "destination"
  ) as HTMLInputElement;
  const onChangeHandler = () => {
    calculateAndDisplayRoute(
      directionsService,
      directionsRenderer,
      service,
      autocomplete_input_origin,
      autocomplete_input_destination
    );
  };

  const autocomplete_origin = new google.maps.places.Autocomplete(
    autocomplete_input_origin
  );
  const autocomplete_destination = new google.maps.places.Autocomplete(
    autocomplete_input_destination
  );

  autocomplete_origin.setFields([
    "address_components",
    "geometry",
    "icon",
    "name"
  ]);
  autocomplete_destination.setFields([
    "address_components",
    "geometry",
    "icon",
    "name"
  ]);

  autocomplete_origin.addListener("place_changed", () => {
    const place = autocomplete_origin.getPlace();
    onChangeHandler();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
  });

  autocomplete_destination.addListener("place_changed", () => {
    const place = autocomplete_destination.getPlace();
    onChangeHandler();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
  });
}

function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer,
  service: google.maps.DistanceMatrixService,
  origin: HTMLInputElement,
  destination: HTMLInputElement
) {
  if (
    origin.value &&
    origin.value.length > 0 &&
    destination.value &&
    destination.value.length > 0
  ) {
    directionsService.route(
      {
        origin: { query: origin.value },
        destination: { query: destination.value },
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response: any, status: any) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          service.getDistanceMatrix(
            {
              origins: [origin.value],
              destinations: [destination.value],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC
            },
            (response, status) => {
              if (status !== "OK") {
                alert("Error was: " + status);
              } else {
                (document.getElementById(
                  "distance"
                ) as HTMLSpanElement).textContent =
                  response.rows[0].elements[0].distance.text +
                  " " +
                  response.rows[0].elements[0].duration.text;
              }
            }
          );
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}
