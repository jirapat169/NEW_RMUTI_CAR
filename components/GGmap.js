import React from "react";

class AutocompleteDirectionsHandler {
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    const originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput
    );
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(["place_id"]);

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
  }

  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }
      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    const me = this;
    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}

const GGMap = (props) => {
  React.useEffect(() => {
    let rmutiLocation = { lat: 14.988319611169972, lng: 102.11773235118517 };
    const map = new window.google.maps.Map(
      window.document.getElementById(`mapRender`),
      {
        mapTypeControl: false,
        zoom: 8,
        center: rmutiLocation,
      }
    );

    // new google.maps.Marker({
    //   position: rmutiLocation,
    //   label: `A`,
    //   animation: google.maps.Animation.DROP,
    //   map: map,
    // });

    new AutocompleteDirectionsHandler(map);
    // window.document.getElementById(`mapRender`).appendChild(mapDiv);
  }, []);

  return (
    <>
      <input
        id="origin-input"
        className="controls"
        type="text"
        placeholder="Enter an origin location"
      />

      <input
        id="destination-input"
        className="controls"
        type="text"
        placeholder="Enter a destination location"
      />

      <div className="mt-3 mb-3" id="mapRender" style={{ height: "600px" }}>
        Hello
      </div>
    </>
  );
};

export default GGMap;
