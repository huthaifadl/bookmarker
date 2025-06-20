var siteNameInput = document.getElementById("site-name");
var urlLinkInput = document.getElementById("url-link");
var siteNameError = document.getElementById("siteNameError");
var urlError = document.getElementById("urlError");
var bookMarksContainer;

if (localStorage.getItem("bookMark") == null) {
  bookMarksContainer = [];
} else {
  bookMarksContainer = JSON.parse(localStorage.getItem("bookMark"));
  displayBookMark();
}

function isValidURL(url) {
  const pattern = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}(\.\w{2,})?(\/\S*)?$/i;
  return pattern.test(url);
}


function validateInputs() {
  let valid = true;

  // Check the site name (at least 3 characters)
  if (siteNameInput.value.trim().length < 3) {
    siteNameError.classList.remove("d-none");
    siteNameInput.classList.add("is-invalid");
    valid = false;
  } else {
    siteNameError.classList.add("d-none");
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
  }

  // Check if the link is valid
  if (!isValidURL(urlLinkInput.value.trim())) {
    urlError.classList.remove("d-none");
    urlLinkInput.classList.add("is-invalid");
    valid = false;
  } else {
    urlError.classList.add("d-none");
    urlLinkInput.classList.remove("is-invalid");
    urlLinkInput.classList.add("is-valid");
  }

  return valid;
}

function addBookMark() {
  if (!validateInputs()) {
    return; // Stop adding if entries are invalid.
  }

  let url = urlLinkInput.value.trim();
  let siteName = siteNameInput.value.trim();

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
  url = "https://" + url;
}

  var bookMark = {
    siteName: siteName,
    siteURL: url
  };

  bookMarksContainer.push(bookMark);
  displayBookMark();
  localStorage.setItem('bookMark', JSON.stringify(bookMarksContainer));
  clearInputs();

  siteNameInput.classList.remove("is-valid");
  urlLinkInput.classList.remove("is-valid");
}

function clearInputs() {
  siteNameInput.value = "";
  urlLinkInput.value = "";
  siteNameError.classList.add("d-none");
  urlError.classList.add("d-none");
  siteNameInput.classList.remove("is-invalid", "is-valid");
  urlLinkInput.classList.remove("is-invalid", "is-valid");
}

function displayBookMark() {
  var cardCartona = "";
  var tableCartona = "";

  for (var i = 0; i < bookMarksContainer.length; i++) {
    cardCartona += `
      <div class="card" style="width: 18rem;">
        <img src="./img/bookmarkimg.jpg" class="card-img-top" alt="bookmark image">
        <div class="card-body text-center">
          <h5 class="card-title text-capitalize mb-4">${bookMarksContainer[i].siteName}</h5>
          <a href="${bookMarksContainer[i].siteURL}" target="_blank" class="btn btn-success text-capitalize">
            <i class="fa-solid fa-eye"></i> visit
          </a>
          <button onclick="deleteBookMark(${i})" class="btn btn-danger text-capitalize">
            <i class="fa-solid fa-trash"></i> delete
          </button>
        </div>
      </div>
    `;

    tableCartona += `
      <tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${bookMarksContainer[i].siteName}</td>
        <td>
          <button onclick="window.open('${bookMarksContainer[i].siteURL}', '_blank')" type="button" class="btn btn-success">
            <i class="fa-solid fa-eye"></i> Visit
          </button>
        </td>
        <td>
          <button onclick="deleteBookMark(${i})" type="button" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }
  document.getElementById('body-table').innerHTML = tableCartona;
  document.getElementById('cardsData').innerHTML = cardCartona;
}

function deleteBookMark(deletedIndex) {
  bookMarksContainer.splice(deletedIndex, 1);
  displayBookMark();
  localStorage.setItem('bookMark', JSON.stringify(bookMarksContainer));
}

// Live validation أثناء الكتابة

siteNameInput.addEventListener("input", () => {
  if (siteNameInput.value.trim().length >= 3) {
    siteNameError.classList.add("d-none");
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
  } else {
    siteNameError.classList.remove("d-none");
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
  }
});

urlLinkInput.addEventListener("input", () => {
  if (isValidURL(urlLinkInput.value.trim())) {
    urlError.classList.add("d-none");
    urlLinkInput.classList.remove("is-invalid");
    urlLinkInput.classList.add("is-valid");
  } else {
    urlError.classList.remove("d-none");
    urlLinkInput.classList.add("is-invalid");
    urlLinkInput.classList.remove("is-valid");
  }
});
