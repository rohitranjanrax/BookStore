const bookList = document.getElementById('book-list');
const form = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const genreInput = document.getElementById('genre');
const publishedDateInput = document.getElementById('publishedDate');

function loadBooks() {
  fetch('http://localhost:5500/Book/allbooks')
    .then(res => res.json())
    .then(data => {
      bookList.innerHTML = '';
      if (data.length === 0) {
        bookList.innerHTML = '<p>No books found.</p>';
        return;
      }
      data.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
          <strong>${book.title}</strong> by ${book.author}<br>
          Genre: ${book.genre} | Published: ${book.publishedDate}
          <button class="delete-btn" data-id="${book._id}">❌ Delete</button>
        `;
        bookList.appendChild(bookDiv);
      });
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          deleteBook(id);
        });
      });
    })
    .catch(error => {
      bookList.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
      console.error('Error:', error);
    });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const newBook = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    genre: genreInput.value.trim(),
    publishedDate: parseInt(publishedDateInput.value)
  };
  fetch('http://localhost:5500/Book/addbook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook)
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === "Book is added successfully") {
        alert(data.message);
        form.reset();
        loadBooks();
      } else {
        alert('Failed to add book: ' + (data.error || data.message));
      }
    })
    .catch(error => {
      alert('Error: ' + error.message);
      console.error('Add Error:', error);
    });
});

function deleteBook(id) {
  fetch(`http://localhost:5500/Book/search/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Book deleted');
      loadBooks();
    })
    .catch(err => {
      alert('Error deleting book: ' + err.message);
      console.error('Delete Error:', err);
    });
}

loadBooks();
