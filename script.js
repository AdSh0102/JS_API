var itemsPerPage = 10; // Number of items to display per page
var currentPage = 1; // Current page number
var apiKey = "86f98f9a";
var searchQueryInput = document.getElementById("searchQueryInput");
var searchQuery = 'Avatar';
var dataArray = fetchMovieData();

// Function to fetch movie data from the OMDB API
function fetchMovieData() {
    var apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;
  dataArray = [];

  var fetchPromises = [];
  for (var i = 1; i <= 5; ++i) {
    fetchPromises.push(fetch(apiUrl + `&page=${i}`).then(response => response.json()));
  }

  // Wait for all fetch requests to complete using Promise.all()
  Promise.all(fetchPromises)
    .then(results => {
      // 'results' is an array containing the resolved data from all fetch requests
      dataArray = results;
      // Now that we have fetched the data, we can display the movie cards for the first page
      currentPage = 1;
      displayCurrentPageData();
    })
    .catch(error => {
      console.error("Error occurred while fetching movie data:", error);
    });
}



// Function to create a movie card element
function createMovieCard(movie) {
    // Create a div element for the movie card
    var card = document.createElement("div");
    card.classList.add("movie-card");

    // Create an image element for the movie poster
    var posterImg = document.createElement("img");
    posterImg.src = movie.Poster;
    posterImg.alt = movie.Title;
    posterImg.classList.add("poster");

    // Add an event listener to handle image loading errors
    posterImg.error = function () {
        posterImg.src = "placeholder.jpg"; // Replace with your placeholder image URL
    };

    // Create a paragraph element for the movie title
    var titlePara = document.createElement("p");
    titlePara.textContent = movie.Title;
    titlePara.classList.add("title");

    // Append the poster image and title to the card
    card.appendChild(posterImg);
    card.appendChild(titlePara);

    return card;
    // ... (same as in the previous example)
}

// Function to display movie cards for the current page
function displayCurrentPageData() {
    var movieContainer = document.getElementById("movieContainer");
    movieContainer.innerHTML = ""; // Clear the container
    if (!dataArray || !dataArray[currentPage - 1] || !dataArray[currentPage - 1]["Search"]) {
        // Handle invalid page number or missing 'Search' property
        console.error("No movie data found for the current page.");
        return;
    }

    var currentPageData = dataArray[currentPage - 1];
    var currentPageSearchData = currentPageData["Search"];

    for (var i = 0; i < itemsPerPage; i++) {
        var movie = currentPageSearchData[i];
        if (movie) {
            var movieCard = createMovieCard(movie);
            movieContainer.appendChild(movieCard);
        }
    }
}

// Function to handle page navigation when a pagination button is clicked
function changePage(pageNumber) {
    currentPage = pageNumber;
    displayCurrentPageData(pageNumber);
}

// Function to handle the search when the Search button is clicked
function searchMovies() {
    searchQuery = searchQueryInput.value;
    if(searchQuery.length == 0) return;
    // Call the fetchMovieData function with the new searchQuery
    fetchMovieData();
}