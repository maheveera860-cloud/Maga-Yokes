function showMessage(msg) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = msg;
  setTimeout(() => messageDiv.innerText = "", 4000);
}

// Add Book
document.getElementById("addBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    title: form.title.value.trim(),
    author: form.author.value.trim(),
    isbn: form.isbn.value.trim(),
    quantity: parseInt(form.quantity.value)
  };

  const res = await fetch("http://localhost:5000/add_book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  showMessage(result.message);
  form.reset();
});

// Borrow Book
document.getElementById("borrowBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const isbn = e.target.isbn.value.trim();

  const res = await fetch(`http://localhost:5000/borrow_book/${isbn}`, { method: "POST" });
  const result = await res.json();
  showMessage(result.message);
  e.target.reset();
});

// Return Book
document.getElementById("returnBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const isbn = e.target.isbn.value.trim();

  const res = await fetch(`http://localhost:5000/return_book/${isbn}`, { method: "POST" });
  const result = await res.json();
  showMessage(result.message);
  e.target.reset();
});

// Search Books
async function searchBooks() {
  const query = document.getElementById("searchQuery").value.trim();
  if (!query) return showMessage("Please enter a search query.");

  const res = await fetch(`http://localhost:5000/search_books?query=${encodeURIComponent(query)}`);
  const result = await res.json();

  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = "<h3>Results:</h3>";

  if (result.books.length === 0) {
    resultsDiv.innerHTML += "<p>No books found.</p>";
  } else {
    result.books.forEach(book => {
      resultsDiv.innerHTML += `<p><strong>${book.title}</strong> by ${book.author} (ISBN: ${book.isbn}) — Quantity: ${book.quantity}</p>`;
    });
  }
}
