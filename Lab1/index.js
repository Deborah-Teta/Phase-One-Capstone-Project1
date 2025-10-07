import { fetchBooks } from '../lab3/fetchbook.js';

// Make functions available globally
window.addToFavorites = addToFavorites;
window.searchBooks = searchBooks;

// Display books in the grid
function displayBooks(books) {
    const booksGrid = document.getElementById('books-grid');
    const noResults = document.getElementById('no-results');
    const loading = document.getElementById('loading');
    
    // Hide loading
    loading.classList.add('hidden');
    
    // Clear previous results
    booksGrid.innerHTML = '';
    
    if (books.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    // Create book cards for each book
    books.forEach(book => {
        const bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

function createBookCard(book) {
    // Create the main book card div
    const bookCard = document.createElement('div');
    bookCard.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105';
    
    // Create the image/cover section
    const coverDiv = document.createElement('div');
    coverDiv.className = 'h-64 bg-gray-300 flex items-center justify-center overflow-hidden';
    
    if (book.cover) {
        const img = document.createElement('img');
        img.src = book.cover;
        img.alt = book.title;
        img.className = 'w-full h-full object-cover';
        
        // If image fails to load, show "No cover available"
        img.onerror = function() {
            coverDiv.innerHTML = '<p class="text-gray-600">No cover available</p>';
        };
        
        coverDiv.appendChild(img);
    } else {
        coverDiv.innerHTML = '<p class="text-gray-600">No cover available</p>';
    }
    
    // Create the content section
    const contentDiv = document.createElement('div');
    contentDiv.className = 'p-4';
    
    // Create title
    const title = document.createElement('h3');
    title.className = 'font-bold text-lg mb-2 text-gray-800';
    title.textContent = book.title;
    
    // Create author
    const author = document.createElement('p');
    author.className = 'text-gray-600 text-sm mb-3';
    author.textContent = book.author;
    
    // Create favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'w-full bg-amber-900 hover:bg-red-900 text-white py-2 px-4 rounded transition';
    favoriteBtn.textContent = 'Add to Favorites';
    
    // Add click event to the button
    favoriteBtn.onclick = function() {
        addToFavorites(book.id, book.title, book.author, book.cover);
    };
    
    // Put everything together
    contentDiv.appendChild(title);
    contentDiv.appendChild(author);
    contentDiv.appendChild(favoriteBtn);
    
    bookCard.appendChild(coverDiv);
    bookCard.appendChild(contentDiv);
    
    return bookCard;
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

// Search function
async function searchBooks() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim() || 'books';
    
    showLoading(true);
    const books = await fetchBooks(searchTerm);
    displayBooks(books);
}

// Add to favorites function
function addToFavorites(id, title, author, cover) {
    // Get existing favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    
    // Check if book is already in favorites
    let alreadyExists = false;
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === id) {
            alreadyExists = true;
            break;
        }
    }
    
    if (!alreadyExists) {
        // Add new favorite
        favorites.push({
            id: id,
            title: title,
            author: author,
            cover: cover
        });
        
        // Save back to localStorage
        localStorage.setItem('favoriteBooks', JSON.stringify(favorites));
        
        // Show success message
        alert('Book added to favorites!');
    } else {
        alert('This book is already in your favorites!');
    }
}

// Initialize the page when it loads
document.addEventListener('DOMContentLoaded', async function() {
    showLoading(true);
    
    // Load initial books
    const books = await fetchBooks();
    displayBooks(books);
    
    // Add event listener for Enter key in search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });
});