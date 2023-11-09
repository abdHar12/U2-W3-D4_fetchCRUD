window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const appId = params.get("id");
  const topic = params.get("q");

  console.log(window.location);
  const urlAPI = "https://api.pexels.com/v1/search?query=" + topic;
  fetch(urlAPI, {
    headers: {
      Authorization: "smXJpiDDvdeSv7u9ngsPte9M6sCYRk5xxPu0wyxy5JOMyACUDJPHPl7H"
    }
  })
    .then((response) => {
      if (response) return response.json();
      else {
        throw new Error(Error("Generic Fetching error"));
      }
    })
    .then((responseObj) => {
      const img = document.querySelector(".card-img-top");
      const h1 = document.getElementsByTagName("h1")[0];
      const button = document.getElementsByTagName("a")[0];

      responseObj.photos.forEach((photo) => {
        if (photo.id === parseInt(appId)) {
          img.setAttribute("src", photo.src.large);
          console.dir(img);
          h1.innerHTML = photo.photographer;
          button.setAttribute("href", photo.photographer_url);
          button.setAttribute("target", "_blank");
          button.innerText = photo.photographer + " - Social Media";
        }
      });
    })
    .catch((error) => console.log("CATCH BLOCK", error));
});
