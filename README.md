# 📚 Library Web App

A dynamic web application for managing your personal book collection. Built with vanilla JavaScript, this project allows users to add, view, and manage books in their digital library.

---

## 🌟 Features

- **Add Books**: Add new books to your library with title, author, page count, and cover image
- **Visual Display**: Books are displayed as cards with their cover images as backgrounds
- **Read Status**: Track and toggle whether you've read each book
- **Book Details**: Click on any book to view its full information in a modal
- **Delete Books**: Remove books from your library with a single click
- **Responsive Design**: Clean and intuitive user interface with modal dialogs
- **Persistent Storage**: Each book is assigned a unique UUID for tracking

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- DOM Manipulation
- Constructor Functions & Prototypes
- Event Handling
- Modal Dialogs

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript (if you want to modify the code)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Abdirazakf/library.git
```

2. Navigate to the project directory
```bash
cd library
```

3. Open `index.html` in your web browser
```bash
open index.html
```

Or simply double-click the `index.html` file

---

## 📖 Usage

1. **Adding a Book**
   - Click the "Add A New Book" card
   - Fill in the book details:
     - Title
     - Author
     - Number of pages
     - Book cover URL (paste an image URL)
     - Check if you've read it
   - Click Submit

2. **Viewing Book Details**
   - Click on any book card to open its details modal
   - View all information about the book
   - Toggle the read status using the switch

3. **Deleting a Book**
   - Click the delete button on any book card
   - The book will be immediately removed from your library

---

## Project Structure

```
library/
│
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # Main JavaScript file
├── assets/            
│   └── img/           # Images and icons
└── README.md          # Project documentation
```

---

## 💻 Code Overview

### Book Constructor
```javascript
function Book(title, author, pages, book_url, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.book_url = book_url;
    this.read = read;
    this.uuid = 'a' + self.crypto.randomUUID();
}
```

### Key Functions
- `addBookToLibrary()`: Creates a new book object and adds it to the library array
- `addLibraryToDisplay()`: Renders all books in the DOM
- `toggleRead()`: Prototype method to toggle a book's read status

---

## Contributing

1. Fork this repository  
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:  
   ```bash
   git commit -m "Add new dashboard widget"
   ```
4. Push to your fork and open a pull request

