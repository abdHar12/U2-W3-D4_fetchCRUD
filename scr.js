window.addEventListener("DOMContentLoaded", () => {
  const primaryLoading = "morocco";
  const secondaryLoading = "japan";
  const loadButton = document.getElementById("load-button");
  const inputSearchTopic = document.querySelector(".input-group>.form-control");
  const buttonSearchTopic = document.querySelector(".input-group>button");
  buttonSearchTopic.addEventListener("click", () => {
    if (inputSearchTopic.value !== "" && inputSearchTopic.value)
      creationPage(inputSearchTopic.value);
  });
  loadButton.addEventListener("click", () => creationPage(primaryLoading));
  const secondaryButton = document.getElementById("secondary-button");
  secondaryButton.addEventListener("click", () =>
    creationPage(secondaryLoading)
  );
});

const creationPage = (topic) => {
  fetch("https://api.pexels.com/v1/search?query=" + topic, {
    headers: {
      Authorization: "smXJpiDDvdeSv7u9ngsPte9M6sCYRk5xxPu0wyxy5JOMyACUDJPHPl7H"
    }
  })
    .then((res) => {
      if (res) return res.json();
      else throw new Error("Generic Fetching error");
    })
    .then((resultObj) => {
      if (resultObj.total_results === 0) {
        const section = document.querySelector(".jumbotron");
        if (document.querySelector(".jumbotron h2")) {
          section.removeChild(document.querySelector(".jumbotron h2"));
          creationH2();
        } else {
          creationH2();
        }
      } else {
        const section = document.querySelector(".jumbotron");
        if (document.querySelector(".jumbotron h2"))
          section.removeChild(document.querySelector(".jumbotron h2"));
      }
      console.dir(resultObj);
      const container = document.getElementById("container-cards");
      container.innerHTML = "";
      const divRow = document.createElement("div");
      divRow.className = "row";
      container.appendChild(divRow);
      resultObj.photos.forEach((photo) => {
        const divCol = document.createElement("div");
        divRow.appendChild(divCol);
        divCol.className = "col-md-4 mb-4";
        const card = document.createElement("div");
        divCol.appendChild(card);
        card.className = "card shadow-sm h-100";
        const img = document.createElement("img");
        const a = document.createElement("a");
        card.appendChild(a);
        a.appendChild(img);
        img.setAttribute("src", photo.src.medium);
        a.setAttribute("href", `./details.html?id=${photo.id}&q=${topic}`);
        a.className = "h-75";
        img.className = "w-100 h-100";
        img.style.cursor = "pointer";
        img.style.objectFit = "cover";
        const cardBody = document.createElement("div");
        card.appendChild(cardBody);
        cardBody.className = "card-body d-flex";
        const divButtonAndSmall = document.createElement("div");
        cardBody.appendChild(divButtonAndSmall);
        divButtonAndSmall.className =
          "w-100 d-flex justify-content-between align-items-center";
        const hideButton = document.createElement("button");
        hideButton.setAttribute("type", "button");
        divButtonAndSmall.appendChild(hideButton);
        hideButton.innerHTML = "Hide";
        hideButton.className = "btn btn-primary";
        hideButton.onclick = () => {
          const cardToHide = hideButton.closest(".col-md-4");
          cardToHide.style.visibility = "hidden";
        };
        const small = document.createElement("small");
        divButtonAndSmall.appendChild(small);
        small.innerText = "id: " + photo.id;
      });
    })
    .catch((error) => console.log("CATCH BLOCK", error));
};

const creationH2 = () => {
  const h2ToInsert = document.createElement("h2");
  const section = document.querySelector(".jumbotron");
  h2ToInsert.className = "mt-4";
  h2ToInsert.innerText = "No photo found";
  section.appendChild(h2ToInsert);
};

// const goToDetails = (e, resultObj) => {
//   let id;
//   const urlImg = e.target.getAttribute("src");
//   resultObj.photos.forEach((photo) => {
//     if (photo.src.medium === urlImg) {
//       id = photo.id;
//     }
//   });
//   e.target.setAttribute("href", `./detail.html?id=${id}`);
//   console.log(id);
// };
