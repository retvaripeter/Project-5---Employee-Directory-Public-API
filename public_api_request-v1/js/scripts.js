// ------------------------------------------
//  ELEMENT SELECTIONS
// ------------------------------------------
const selectGallery = document.querySelector('.gallery');
// ------------------------------------------
//  VARIABLES, ARRAYS, OBJECTS
// ------------------------------------------
const Students = [];
let studentFromClick;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
//Reusable FETCH function
function Fetchdata (url){ //create a function, which will return the fetch method
  return fetch(url) //add an argument to the function to set the URL later
          .then(res => res.json()) // convert the input data from the server to JSON format
}
Fetchdata('https://randomuser.me/api/?results=12') //call the Fetchdata function and set the URL
  .then(basicdata => getBasicData(basicdata.results)) //get the input data and call the getBasicData function
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function getBasicData (data){ //this function build up the cards DOM elements and use the data(objects) from the server
  //data.map will iterate trough the array, and use each student object's key to get the proper info
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
  `).join(''); //it modifies the output with join method to filter the ','

  const iterateStudents = data.map(item => Students.push(item)); // it puts each item to the iterateStudents array, which we defined at the top
  selectGallery.innerHTML = allData; //append the content to the selectGallery div

getModalWindow(); //call the function: getModalWindow

}

function getModalWindow () { //basically with this function we will display the modalwindow

  var allCard = document.querySelectorAll('.card'); //get all card element to set the eventlistener later

  for (let i=0; i < allCard.length; i+=1){ //this will iterate trough all cards and add an eventlistner to it
    //inside the event listener we identify the student that the user just clicked and after we create the modal window from the Students ARRAY
    // data depends on the number of the student clicked. E.g. if the user clicked on the 1th one, it will use the 1th student object from Students.
    (allCard[i]).addEventListener('click', () => {
       studentFromClick = i; //add the studentnumber (what the user clicked to the variable: studentFromClick)
       const createModalData = document.createElement('DIV'); //create the modeldata container to put the htmlModalData later into this DIV
       createModalData.className = 'modal-container';
       selectGallery.parentNode.insertBefore(createModalData, selectGallery.nextElementSibling);
       const selectModalData = document.querySelector('.modal-container');
       //build up the HTML element with all the proper data from the Sutdents array and with the help of the current click (studentFromClick)
       const htmlModalData = `

       <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
         <div class="modal-info-container">
              <img class="modal-img" src='${Students[studentFromClick].picture.large}' alt="profile picture">
              <h3 id="name" class="modal-name cap">${Students[studentFromClick].name.first} ${Students[studentFromClick].name.last}</h3>
              <p class="modal-text">${Students[studentFromClick].email}</p>
              <p class="modal-text cap"> <strong>City: </strong>${Students[studentFromClick].location.city}</p>
              <hr>
              <p class="modal-text"> <strong>Cell Number: </strong>${Students[studentFromClick].cell}</p>
              <p class="modal-text"> <strong>Street: </strong>${Students[studentFromClick].location.street}</p>
              <p class="modal-text"> <strong>State: </strong>${Students[studentFromClick].location.state}</p>
              <p class="modal-text"> <strong>Postcode: </strong> ${Students[studentFromClick].location.postcode}</p>
             <p class="modal-text"> <strong>Birthday: </strong>${Students[studentFromClick].dob.date.substring(0,10)}</p>
         </div>

       `;

       selectModalData.innerHTML = htmlModalData; //append the htmlModalData to the modalwindow container

       const selectX = document.querySelector('.modal-close-btn'); //make the x button clickable and useble to close the modal window on click
       selectX.addEventListener('click', () => {

         selectModalData.style.display = 'none';

       });

    });
  }
}
