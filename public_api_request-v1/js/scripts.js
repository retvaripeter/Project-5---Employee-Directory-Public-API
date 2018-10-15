// ------------------------------------------
//  ELEMENT SELECTIONS
// ------------------------------------------
const selectGallery = document.querySelector('.gallery');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
//Reusable FETCH function
function Fetchdata (url){
  return fetch(url)
          .then(res => res.json())
}

Fetchdata('https://randomuser.me/api/?results=12')
  .then(data => getBasicData(data.results))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function getBasicData (data){
  const allData = data.map(item => `

    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src='${item.picture.large}' alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}</p>
        </div>
    </div>
  `).join('');
  selectGallery.innerHTML = allData;

}

function getModalData (data){

//create a modeldata container and append it after the gallery
const selectModalData = document.createElement('DIV');
selectModalData.className = 'modal-container';
selectGallery.parentNode.insertBefore(selectModalData, selectGallery.nextElementSibling);

const modalData = data.map(item => `

        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                <h3 id="name" class="modal-name cap">name</h3>
                <p class="modal-text">email</p>
                <p class="modal-text cap">city</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>

 `

  ).join('');
  selectGallery.innerHTML = allData;

}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
