'use strict';


function searchHandler() {
  const search = $('.search').val();
  if (search.trim() === '') {
    $('.error-message').html('Please enter a state');
  } else {
    $('.search').val('');
    $('.searchResults').empty();
    $('.error-message').html('');
    getParks(search);
  }
}

function getParks(query) {
  const searchURL = `https://developer.nps.gov/api/v1/parks?stateCode=${query}&api_key=xwZsd8iEC2eTtbMSILdCFUlOcveQmekwkkTbMYac`
  fetch(searchURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(responseJson => 
      displayResults(responseJson))
    .catch(e => {
      $('.error-message').html('Something went wrong. Try again later.');
})
}
function displayResults(results) {
  $('.searchResults').html(
    results
      .map(results => `<div>${data.states[0]}</div>`)
      .join('')
  );
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    searchHandler();
  });
}

$(watchForm);