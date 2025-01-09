// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Fetch the JSON data
async function fetchHadithData() {
  try {
    // List of JSON files to fetch
    const files = [
      "/db/by_chapter/the_9_books/abudawud/1.json",
      "/db/by_chapter/the_9_books/qudsi40.json",
      "/db/by_chapter/the_9_books/nasai/1.json",
      "/db/by_chapter/other_books/riyad_assalihin/1.json",
      "/db/by_chapter/the_9_books/nawawi40.json",
      "/db/by_chapter/the_9_books/bukhari/1.json",
      "/db/by_chapter/the_9_books/bukhari/2.json",
      "/db/by_chapter/the_9_books/bukhari/3.json",
      "/db/by_chapter/the_9_books/bukhari/4.json",
      "/db/by_chapter/the_9_books/bukhari/5.json",
      "/db/by_chapter/the_9_books/bukhari/6.json",
    ];

    // Fetch all files in parallel
    const responses = await Promise.all(files.map((file) => fetch(file)));

    // Check if all responses are successful
    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    // Parse all JSON files
    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    // Combine all hadiths from the different files
    const allHadiths = data.flatMap((item) => item.hadiths); // Assuming each JSON has a 'hadiths' array

    // Initialize search with combined hadiths
    initializeSearch(allHadiths);
  } catch (error) {
    console.error("Failed to fetch Hadith data:", error);
  }
}

// Initialize search functionality
function initializeSearch(hadiths) {
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    searchResults.innerHTML = ""; // Clear previous results

    if (query.trim() === "") {
      return; // Do nothing if the search input is empty
    }

    // Filter the Hadiths based on the search query
    const filteredHadiths = hadiths.filter((hadith) =>
      hadith.english.text.toLowerCase().includes(query)
    );

    // Display the search results
    filteredHadiths.forEach((hadith) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <div class="card-body">
              <h5 class="card-title">Hadith incoming...</h5>
              <p class="card-text">${highlightText(
                hadith.english.text,
                query
              )}</p>
          </div>
      `;
      searchResults.appendChild(card);
    });
  });
}

// Function to highlight the search query in the Hadith text
function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Fetch the Hadith data when the page loads
fetchHadithData();
