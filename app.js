'use strict';
const search = $('.search').val()
const searchURL = `https://developer.nps.gov/api/v1/parks?stateCode=${search}&api_key=xwZsd8iEC2eTtbMSILdCFUlOcveQmekwkkTbMYac`

function getParks(search) {
  fetch(searchURL)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getParks(search);
  });
}

$(watchForm);

console.log(search);