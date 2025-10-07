export async function fetchBooks(searchTerm = 'books') {
  try {
    // Fetch data from the Open Library API
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`);

    // Parse the response as JSON
    const data = await response.json();

    // Get the first 20 results and format them nicely
    const books = data.docs.slice(0, 20).map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown author",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}