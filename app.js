window.addEventListener("load", function() {
  let lat;
  let long;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      long = pos.coords.longitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/5ea3b9cbcaae83b6cacf7142fad5bb06/${lat},${long}`;
      fetch(api)
        .then(res => res.json())
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          const timezone = document.getElementById("timezone");
          const degree = document.getElementById("temperature-degree");
          const description = document.getElementById(
            "temperature-description"
          );
          let cityName = data.timezone;
          cityName = cityName.replace(/.*\//g, "");
          timezone.textContent = cityName;
          degree.textContent = temperature;
          description.textContent = summary;
          const iconID = document.getElementById("iconID");
          setIcons(iconID, icon);
          let celcius = (temperature - 32) * (5 / 9);
          celcius = Math.floor(celcius * 100) / 100;
          const tempPlace = document.getElementById("degree-section");
          const tempSpan = document.querySelector("#degree-section span");
          tempPlace.addEventListener("click", () => {
            if (tempSpan.textContent === "F") {
              tempSpan.textContent = "C";
              degree.textContent = celcius;
            } else {
              tempSpan.textContent = "F";
              degree.textContent = temperature;
            }
          });
        });
    });
  }
  function setIcons(iconID, icon) {
    const skycons = new Skycons({ color: "yellow" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
