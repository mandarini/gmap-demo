export function directionCalculator(map: google.maps.Map) {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  let chosenTravelMode: google.maps.TravelMode = google.maps.TravelMode.DRIVING;
  let chosenUnitSystem: google.maps.UnitSystem = 0;
  let chosenTrafficModel: google.maps.TrafficModel =
    google.maps.TrafficModel.BEST_GUESS;
  let chosenTransit: google.maps.TransitMode = google.maps.TransitMode.BUS;

  const service: google.maps.DistanceMatrixService = new google.maps.DistanceMatrixService();

  const autocomplete_input_origin: HTMLInputElement = document.getElementById(
    "origin"
  ) as HTMLInputElement;
  const autocomplete_input_destination: HTMLInputElement = document.getElementById(
    "destination"
  ) as HTMLInputElement;

  let coordinates_origin: google.maps.LatLng;
  let coordinates_destination: google.maps.LatLng;

  const onChangeHandler = () => {
    calculateAndDisplayRoute(
      directionsService,
      directionsRenderer,
      service,
      autocomplete_input_origin,
      autocomplete_input_destination,
      chosenTravelMode,
      chosenUnitSystem,
      chosenTrafficModel,
      chosenTransit,
      coordinates_origin,
      coordinates_destination
    );
  };

  const autocomplete_origin = new google.maps.places.Autocomplete(
    autocomplete_input_origin
  );
  const autocomplete_destination = new google.maps.places.Autocomplete(
    autocomplete_input_destination
  );

  autocomplete_origin.bindTo("bounds", map);
  autocomplete_destination.bindTo("bounds", map);

  autocomplete_origin.setFields([
    "address_components",
    "geometry",
    "icon",
    "name",
  ]);
  autocomplete_destination.setFields([
    "address_components",
    "geometry",
    "icon",
    "name",
  ]);

  autocomplete_origin.addListener("place_changed", () => {
    const place = autocomplete_origin.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    } else {
      coordinates_origin = new google.maps.LatLng(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    }
    onChangeHandler();
  });

  autocomplete_destination.addListener("place_changed", () => {
    const place = autocomplete_destination.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    } else {
      coordinates_destination = new google.maps.LatLng(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    }
    onChangeHandler();
  });

  (document.getElementById(
    "use-strict-bounds"
  ) as HTMLElement).addEventListener("change", (event) => {
    console.log(event);
    const target: HTMLInputElement = event.target as HTMLInputElement;
    autocomplete_origin.setOptions({ strictBounds: target.checked });
    autocomplete_destination.setOptions({ strictBounds: target.checked });
  });

  const travelModeRadios: NodeListOf<HTMLInputElement> = document.getElementsByName(
    "directionsMode"
  ) as NodeListOf<HTMLInputElement>;

  for (var i = 0, length = travelModeRadios.length; i < length; i++) {
    travelModeRadios[i].addEventListener("change", (event) => {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      console.log(target.id, target.value);
      chosenTravelMode = target.value as google.maps.TravelMode;
      if (
        directionsService &&
        directionsRenderer &&
        service &&
        autocomplete_input_origin &&
        autocomplete_input_destination &&
        chosenTravelMode &&
        chosenUnitSystem &&
        chosenTrafficModel &&
        chosenTransit
      ) {
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          service,
          autocomplete_input_origin,
          autocomplete_input_destination,
          chosenTravelMode,
          chosenUnitSystem,
          chosenTrafficModel,
          chosenTransit,
          coordinates_origin,
          coordinates_destination
        );
      }
    });
  }

  const unitRadios: NodeListOf<HTMLInputElement> = document.getElementsByName(
    "unitSystem"
  ) as NodeListOf<HTMLInputElement>;

  for (var i = 0, length = unitRadios.length; i < length; i++) {
    unitRadios[i].addEventListener("change", (event) => {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      console.log(target.id, target.value);
      chosenUnitSystem = (target.value as unknown) as google.maps.UnitSystem;
      if (
        directionsService &&
        directionsRenderer &&
        service &&
        autocomplete_input_origin &&
        autocomplete_input_destination &&
        chosenTravelMode &&
        chosenUnitSystem &&
        chosenTrafficModel &&
        chosenTransit
      ) {
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          service,
          autocomplete_input_origin,
          autocomplete_input_destination,
          chosenTravelMode,
          chosenUnitSystem,
          chosenTrafficModel,
          chosenTransit,
          coordinates_origin,
          coordinates_destination
        );
      }
    });
  }

  const transitModeRadios: NodeListOf<HTMLInputElement> = document.getElementsByName(
    "transitMode"
  ) as NodeListOf<HTMLInputElement>;

  for (var i = 0, length = transitModeRadios.length; i < length; i++) {
    transitModeRadios[i].addEventListener("change", (event) => {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      console.log(target.id, target.value);
      chosenTransit = (target.value as unknown) as google.maps.TransitMode;
      if (
        directionsService &&
        directionsRenderer &&
        service &&
        autocomplete_input_origin &&
        autocomplete_input_destination &&
        chosenTravelMode &&
        chosenUnitSystem &&
        chosenTrafficModel &&
        chosenTransit
      ) {
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          service,
          autocomplete_input_origin,
          autocomplete_input_destination,
          chosenTravelMode,
          chosenUnitSystem,
          chosenTrafficModel,
          chosenTransit,
          coordinates_origin,
          coordinates_destination
        );
      }
    });
  }

  const trafficModelRadios: NodeListOf<HTMLInputElement> = document.getElementsByName(
    "trafficModel"
  ) as NodeListOf<HTMLInputElement>;

  for (var i = 0, length = trafficModelRadios.length; i < length; i++) {
    trafficModelRadios[i].addEventListener("change", (event) => {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      console.log(target.id, target.value);
      chosenTrafficModel = (target.value as unknown) as google.maps.TrafficModel;
      if (
        directionsService &&
        directionsRenderer &&
        service &&
        autocomplete_input_origin &&
        autocomplete_input_destination &&
        chosenTravelMode &&
        chosenUnitSystem &&
        chosenTrafficModel &&
        chosenTransit
      ) {
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          service,
          autocomplete_input_origin,
          autocomplete_input_destination,
          chosenTravelMode,
          chosenUnitSystem,
          chosenTrafficModel,
          chosenTransit,
          coordinates_origin,
          coordinates_destination
        );
      }
    });
  }
}

function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer,
  service: google.maps.DistanceMatrixService,
  origin: HTMLInputElement,
  destination: HTMLInputElement,
  chosenTravelMode: google.maps.TravelMode,
  chosenUnitSystem: google.maps.UnitSystem,
  chosenTrafficModel: google.maps.TrafficModel,
  chosenTransit: google.maps.TransitMode,
  coordinates_origin: google.maps.LatLng,
  coordinates_destination: google.maps.LatLng
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
        travelMode: chosenTravelMode,
        transitOptions: {
          modes: [chosenTransit],
        },
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: chosenTrafficModel,
        },
      },
      (response: any, status: any) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          service.getDistanceMatrix(
            {
              origins: [origin.value],
              destinations: [destination.value],
              travelMode: chosenTravelMode,
              unitSystem: chosenUnitSystem,
            },
            (response, status) => {
              console.log(response);
              if (status !== "OK") {
                alert("Error was: " + status);
              } else {
                (document.getElementById(
                  "distance"
                ) as HTMLSpanElement).textContent =
                  response.rows[0].elements[0].distance.text +
                  " " +
                  response.rows[0].elements[0].duration.text;
                if (coordinates_origin && coordinates_destination) {
                  const geodistance: number = calculateDistance(
                    coordinates_origin,
                    coordinates_destination
                  );
                  (document.getElementById(
                    "geodistance"
                  ) as HTMLSpanElement).textContent = `${geodistance} meters.`;
                }
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

function calculateDistance(
  point_a: google.maps.LatLng,
  point_b: google.maps.LatLng
): number {
  return Math.round(
    google.maps.geometry.spherical.computeDistanceBetween(point_a, point_b)
  );
}

function calculateMidPoints(
  point_a: google.maps.LatLng,
  point_b: google.maps.LatLng
) {
  return google.maps.geometry.spherical.interpolate(point_a, point_b, 5);
}
