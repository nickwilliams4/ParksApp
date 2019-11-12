'use strict';


function searchHandler() {
  const numberOfResults = $('#js-max-results').val();
  const search = $('.search').val();
  if (search.trim() === '') {
    $('.error-message').html('Please enter a state');
  } else {
    $('.search').val('');
    $('.searchResults').empty();
    $('.error-message').html('');
    getParks(search.replace(' ',''), numberOfResults);
  }
}

function getParks(query, limit) {
  const searchURL = `https://developer.nps.gov/api/v1/parks?stateCode=${query}&api_key=xwZsd8iEC2eTtbMSILdCFUlOcveQmekwkkTbMYac&limit=${limit}`
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
  console.log(results);
  $('.displayMessage').show();
  $('.searchResults').html(
      results.data
      .map(park => `<br> <div>Park Name: ${park.fullName} <br> Park Description: ${park.description} <br> <a href="${park.url}" target=blank>Link to Website</a></div> <br>`)
      .join('')
  );
  if (results.total == 0) {
    $('.error-message').html('No results. Please try your search again.')
  }
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    searchHandler();
    $('.displayMessage').hide();
  });
}

$(watchForm);