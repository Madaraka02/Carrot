// Get the movie ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// API endpoint for retrieving movie details
document.getElementById("loader").style.display = "block";
const apiUrl = `https://omdbapi.com/?i=${movieId}&apikey=a70e048e`;

// Fetch movie details from the API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.getElementById("loader").style.display = "none";
    const movieDetailsHTML = generateMovieDetailsHTML(data);
    console.log('movieDetailsHTML',movieDetailsHTML)
    document.getElementById('movieDetailsContainer').innerHTML = movieDetailsHTML;
  })
  .catch(error => {
    document.getElementById("loader").style.display = "none";
    console.error("Error:", error);
  });

  function generateMovieDetailsHTML(data) {
    const languages = data.Language.split(", ");
    const languagesHTML = languages.map(language => `<span>${language}</span>`).join("");
        return `
        <div class="banner" style="background-image: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url('${data.Poster}');">

        <div class="content">
            <h2>${data.Title}</h2>
            <p>
            ${data.Plot}
            </p>
            <p>
            ${data.Awards}
            </p>
            <div class="rating" style="color: white;">
                <div class="rate">
                    <div class="stars">

                        <i class="fa fa-star" ></i>/
                        <span> ${data.imdbRating}</span>
                    </div>

                    <div class="likes">

                        <i class="fa fa-thumbs-up" ></i>
                        <span>${data.imdbVotes}</span>
                    </div>
                    <span>${data.Genre}</span>
                    <span>${data.Released}</span>



                </div>
            </div>
            <div class="genre">
                <span>Actors:</span>

                <span>${data.Actors}</span>

            </div>
            <div class="languages">
            ${languagesHTML}
            </div>
        </div>
        <div class="slide" style="background: url('${data.Poster}');"></div>
    </div>
        `;
      };