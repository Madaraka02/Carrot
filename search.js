let page=1
let moviesHTML = '';
let filter = false

function generateMoviesHTML(movies) {
  const newMoviesHTML = movies.map((movie) => {
    return `
      <div class="card">
        <div class="poster">
          <img src=${movie.Poster} alt="">
        </div>
        <div class="details">
          <div class="title">
            <h3>${movie.Title}</h3>
            <h6>${movie.Year}</h6>
          </div>
          <div class="tags"></div>
          <div class="info"></div>
          <div class="more">
            <a href="movie.html?id=${movie.imdbID}">
              <span>View details</span>
            </a>
          </div>
        </div>
      </div>
    `;
  });

  return newMoviesHTML.join("");
}

function showErrorPopup(message) {
        const popup = document.getElementById("errorPopup");
        const errorMessage = document.getElementById("errorMessage");
      
        errorMessage.textContent = message;
        popup.classList.add("show");
      
        const closeButton = document.getElementById("closeButton");
        closeButton.addEventListener("click", () => {
          popup.classList.remove("show");
        });
      }
    
    document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get the search keyword from the input field
    const keyword = document.getElementById("searchInput").value;
    searchKeyword = document.getElementById("searchInput").value;
    const searchUrl = `search.html?s=${encodeURIComponent(searchKeyword)}`;
    
    window.location.href = searchUrl;
})

const container = document.querySelector('.container');  
let searchKeyword = ''
const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get('s'); 


function fetchAndDisplayMovies() {

    console.log('fetchAndDisplayMovies called')

    // document.getElementById("loader").style.display = "block";
    let movieUrl = `https://www.omdbapi.com/?s=${movieName}&page=${page}&apikey=a70e048e`
    console.log('movieUrl',movieUrl)

    // Get the year input value
    const yearInput = document.getElementById("yearInput");
    const yearValue = yearInput.value;
    if (yearValue) {
        // Append the year filter to the URL
        movieUrl += `&y=${yearValue}`;
        page=1
        filter=true
    }



    const mySelect = document.getElementById("mySelect");
    const selectedOption = mySelect.value;
    if (selectedOption) {
        // Append the plot filter to the URL
        movieUrl += `&plot=${selectedOption}`;
        page = 1;
        filter=true
    }

    console.log('page',page)

    fetch(movieUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data.Search);
        // document.getElementById("loader").style.display = "none";
        const newMoviesHTML = generateMoviesHTML(data.Search);
        moviesHTML += newMoviesHTML;
        const hasYearFilter = movieUrl.includes("&y=");
  
        container.innerHTML = hasYearFilter? newMoviesHTML:moviesHTML;

        // const moviesHTML = data.Search.map((movie) => {
        //     return `
        //     <div class="card">
        //     <div class="poster">
        //         <img src=${movie.Poster} alt="">
        //     </div>
        //     <div class="details">
        //         <div class="title">
    
        //             <h3>${movie.Title}</h3>
        //             <h6>${movie.Year}</h6>
    
        //         </div>
        //         <div class="tags">
        //         </div>
        //         <div class="info">
        //         </div>
        //         <div class="more">
        //             <a href="movie.html?id=${movie.imdbID}">
        //                 <span>View details</span>
        //             </a>
        //         </div>
        //     </div>
        // </div>
        //     `;
        //     });
    
            // Update the movies container with the generated HTML
            // container.innerHTML = moviesHTML.join("");

    })
    .catch(error => {
        console.error("Error:", error);
        showErrorPopup(`An error "${searchKeyword}" was not found. Please search a valid movie name `)
        // document.getElementById("loader").style.display = "none";

    });
}     


// Function to check if user has reached the bottom of the page
function checkScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    console.log('Called')
    if (scrollTop + clientHeight >= scrollHeight) {
      page++; // Increment the page number
      fetchAndDisplayMovies();
    }
    console.log('scrollTop',scrollTop)
    console.log('clientHeight',clientHeight)

    
  }
    
      
window.addEventListener("load", fetchAndDisplayMovies);
// Event listener for the year input
const yearInput = document.getElementById("yearInput");
yearInput.addEventListener("input", fetchAndDisplayMovies);

// Event listener for the select option
const mySelect = document.getElementById("mySelect");
mySelect.addEventListener("change", fetchAndDisplayMovies);

window.addEventListener("scroll", checkScroll);