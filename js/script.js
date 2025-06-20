var siteNameInput = document.getElementById("site-name")
var urlLinkInput = document.getElementById("url-link") 
var bookMarksContainer;

if(localStorage.getItem("bookMark") == null) {
    bookMarksContainer = [];
}else {
    bookMarksContainer = JSON.parse( localStorage.getItem('bookMark'));
    displayBookMark();
}

function addBookMark() {
    var bookMark = {
        siteName: siteNameInput.value,
        siteURL: urlLinkInput.value
    }
    bookMarksContainer.push(bookMark);
    // clear
    displayBookMark();
    localStorage.setItem('bookMark' , JSON.stringify(bookMarksContainer));
    clearInputs();
}

function clearInputs() {
    siteNameInput.value = "";
    urlLinkInput.value = "";
}

function displayBookMark() {
    var cardCartona = "";
    var tableCartona = "";

    // Card Loop
    for(var i = 0; i < bookMarksContainer.length; i++) {
        cardCartona += `
        <div class="card" style="width: 18rem;">
            <img src="./img/bookmarkimg.jpg" class="card-img-top" alt="google logo">
                <div class="card-body text-center">
                    <h5 class="card-title text-capitalize mb-4">${bookMarksContainer[i].siteName}</h5>
                    <a href="${bookMarksContainer[i].siteURL}" target="_blank" class="btn btn-success text-capitalize"><i class="fa-solid fa-eye"></i> visit</a>
                    <button onclick="deleteBookMark(${i})" class="btn btn-danger text-capitalize"><i class="fa-solid fa-trash"></i> delete</button>
                </div>
        </div>
        `;
    }

    // Table Loop
    for(var i = 0; i < bookMarksContainer.length; i++) {
        tableCartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookMarksContainer[i].siteName}</td>
            <td><button onclick="window.open('${bookMarksContainer[i].siteURL}', '_blank')" type="button" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
            <td><button onclick="deleteBookMark(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('body-table').innerHTML = tableCartona;
    document.getElementById('cardsData').innerHTML = cardCartona;
}

function deleteBookMark(deletedIndex) {
    bookMarksContainer.splice(deletedIndex, 1);
    displayBookMark();
    localStorage.setItem('bookMark' , JSON.stringify(bookMarksContainer));
}