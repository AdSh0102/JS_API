const apiKey = "86f98f9a";

// Function to fetch movie data from the OMDB API
function fetchMovieData(searchQuery) {
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;
    const dataReceived = [];

    for (var i = 1; i <= 5; ++i) {
        // Make the GET request using the Fetch API
        fetch(apiUrl + `&page=${i}`)
            .then((response) => {
                // Check if the response status is OK (200)
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // Parse the JSON data from the response
                return response.json();
            })
            .then((data) => {
                // Process the data here
                dataReceived.push(data);
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error("Fetch error:", error);
            });
    }
    return dataReceived;
}

// Call the function to fetch movie data
const dataArray = fetchMovieData("Avengers");

const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1; // Current page number

// Function to create a movie card element
function createMovieCard(movie) {
    // Create a div element for the movie card
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // Create an image element for the movie poster
    const posterImg = document.createElement("img");
    posterImg.src = movie.Poster;
    posterImg.alt = movie.Title;
    posterImg.classList.add("poster");

    // Add an event listener to handle image loading errors
    posterImg.onerror = function () {
        posterImg.src = "placeholder.jpg"; // Replace with your placeholder image URL
    };

    // Create a paragraph element for the movie title
    const titlePara = document.createElement("p");
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
    const movieContainer = document.getElementById("movieContainer");
    movieContainer.innerHTML = ""; // Clear the container

    console.log(dataArray);
    const currentPageData = dataArray[currentPage - 1]["Search"];

    if (!currentPageData) return; // Handle invalid page number

    for (let i = 0; i < itemsPerPage; i++) {
        const movie = currentPageData[i];
        if (movie) {
            const movieCard = createMovieCard(movie);
            console.log(movieCard);
            movieContainer.appendChild(movieCard);
        }
    }
}

// Function to handle page navigation when a pagination button is clicked
function changePage(pageNumber) {
    currentPage = pageNumber;
    displayCurrentPageData();
}

var searchQuery = 'Avatar';

// Call the function to fetch movie data and display the first page of data
fetchMovieData(searchQuery);
displayCurrentPageData();
changePage(1);