// Function to search Wikipedia for articles matching a keyword
async function searchWikipedia(query) {
    const endpoint = `https://en.wikipedia.org/w/api.php`;
    const params = new URLSearchParams({
        action: 'query',
        list: 'search',     // Use the search list to find articles
        srsearch: query,    // The search query
        format: 'json',     // Get results in JSON format
        origin: '*',        // Required to bypass CORS issues
    });

    const url = `${endpoint}?${params.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if there are search results
        if (data.query && data.query.search.length > 0) {
            const searchResults = data.query.search;
            const firstResultTitle = searchResults[0].title;

            // Fetch the summary for the first result
            return await fetchWikipediaSummary(firstResultTitle);
        } else {
            return `No results found for "${query}".`;
        }
    } catch (error) {
        return `Error searching Wikipedia: ${error.message}`;
    }
}

// Function to fetch the summary for a specific Wikipedia page
async function fetchWikipediaSummary(pageTitle) {
    const endpoint = `https://en.wikipedia.org/w/api.php`;
    const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exintro: true,
        explaintext: true,
        titles: pageTitle,
        origin: '*',
    });

    const url = `${endpoint}?${params.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const page = Object.values(data.query.pages)[0];
        if (page.missing) {
            return `The page "${pageTitle}" does not exist.`;
        } else {
            return `Summary for ${page.title}:\n${page.extract}`;
        }
    } catch (error) {
        return `Error fetching the Wikipedia summary: ${error.message}`;
    }
}

export default searchWikipedia;

// Example usage: Searching for articles related to "Python programming"
// searchWikipedia("Python programming").then(result => {
//     console.log(result);
// });
