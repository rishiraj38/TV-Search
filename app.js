const form = document.querySelector("#searchForm");
const resultsContainer = document.createElement("div");
document.body.append(resultsContainer); 

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  try {
    const res = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${searchTerm}`
    );
    clearImages(); 
    makeImages(res.data);
    form.elements.query.value = ""; 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const makeImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium; 
      resultsContainer.append(img);
    }
  }
};

const clearImages = () => {
  resultsContainer.innerHTML = ""; 
};
