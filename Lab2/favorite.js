// Function to get favorite books from localStorage
function getFavoriteBooks() {
    const favorites = localStorage.getItem('favoriteBooks');
    if (favorites) {
        return JSON.parse(favorites);
    } else {
        return [];
    }
}

// Function to remove a book from favorites
function removeFromFavorites(bookId) {
    let favoriteBooks = getFavoriteBooks();
    
    // Filter out the book to remove
    let newFavorites = [];
    for (let i = 0; i < favoriteBooks.length; i++) {
        if (favoriteBooks[i].id !== bookId) {
            newFavorites.push(favoriteBooks[i]);
        }
    }
    
    // Update localStorage
    localStorage.setItem('favoriteBooks', JSON.stringify(newFavorites));
    
    // Refresh the display
    displayFavorites();
    
    // Show confirmation
    alert('Book removed from favorites!');
}

// Function to display favorite books
function displayFavorites() {
    const favoriteBooks = getFavoriteBooks();
    const favoritesEmpty = document.getElementById('favorites-empty');
    const favoritesGrid = document.getElementById('favorites-grid');
    
    console.log('Favorite books:', favoriteBooks); // Debug line
    
    // Clear the grid
    favoritesGrid.innerHTML = '';
    
    if (favoriteBooks.length === 0) {
        // Show empty state
        favoritesEmpty.style.display = 'block';
        favoritesGrid.style.display = 'none';
    } else {
        // Hide empty state and show grid
        favoritesEmpty.style.display = 'none';
        favoritesGrid.style.display = 'grid';
        
        // Create a card for each favorite book
        favoriteBooks.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105';
            
            // Create cover section
            const coverDiv = document.createElement('div');
            coverDiv.className = 'h-64 bg-gray-300 flex items-center justify-center overflow-hidden';
            
            if (book.cover && book.cover !== 'null') {
                const img = document.createElement('img');
                img.src = book.cover;
                img.alt = book.title;
                img.className = 'w-full h-full object-cover';
                
                img.onerror = function() {
                    coverDiv.innerHTML = '<p class="text-gray-600">No cover available</p>';
                };
                
                coverDiv.appendChild(img);
            } else {
                coverDiv.innerHTML = '<p class="text-gray-600">No cover available</p>';
            }
            
            // Create content section
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
            
            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.className = 'w-full bg-amber-800 hover:bg-red-900 text-white py-2 px-4 rounded transition';
            removeBtn.textContent = 'Remove from Favorites';
            
            // Add click event to remove button
            removeBtn.onclick = function() {
                removeFromFavorites(book.id);
            };
            
            // Put everything together
            contentDiv.appendChild(title);
            contentDiv.appendChild(author);
            contentDiv.appendChild(removeBtn);
            
            bookCard.appendChild(coverDiv);
            bookCard.appendChild(contentDiv);
            
            favoritesGrid.appendChild(bookCard);
        });
    }
}

// Function to navigate to explore books
function showPage() {
    window.location.href = '../Lab1/index.html';
}

// Make functions available globally
window.removeFromFavorites = removeFromFavorites;
window.showPage = showPage;

// Initialize favorites page
document.addEventListener('DOMContentLoaded', function() {
    displayFavorites();
    
    // Add click event to the Explore Books button
    const exploreBtn = document.querySelector('#favorites-empty button');
    if (exploreBtn) {
        exploreBtn.onclick = showPage;
    }
});