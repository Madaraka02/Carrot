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

const container = document.querySelector('.container');  
let searchKeyword = ''
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get the search keyword from the input field
    const keyword = document.getElementById("searchInput").value;
    searchKeyword = document.getElementById("searchInput").value;
    const searchUrl = `search.html?s=${encodeURIComponent(searchKeyword)}`;
  
    window.location.href = searchUrl;
    console.log('search', searchKeyword)

    // document.getElementById("loader").style.display = "block";

    // fetch(`https://www.omdbapi.com/?s=${searchKeyword}&apikey=a70e048e`)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data.Search);
    //     document.getElementById("loader").style.display = "none";
    //     const moviesHTML = data.Search.map((movie) => {
    //         return `
    //         <div class="card">
    //         <div class="poster">
    //             <img src=${movie.Poster} alt="">
    //         </div>
    //         <div class="details">
    //             <div class="title">
  
    //                 <h3>${movie.Title}</h3>
    //                 <h6>${movie.Year}</h6>
  
    //             </div>
    //             <div class="tags">
    //             </div>
    //             <div class="info">
    //             </div>
    //             <div class="more">
    //                 <a href="movie.html?id=${movie.imdbID}">
    //                     <span>View details</span>
    //                 </a>
    //             </div>
    //         </div>
    //     </div>
    //         `;
    //       });
    
    //       // Update the movies container with the generated HTML
    //       container.innerHTML = moviesHTML.join("");

    // })
    // .catch(error => {
    //   console.error("Error:", error);
    //   showErrorPopup(`An error "${searchKeyword}" was not found. Please search a valid movie name `)
    //   document.getElementById("loader").style.display = "none";

    // });
})


