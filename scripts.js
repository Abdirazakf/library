const form = document.querySelector("form")
const bookContainer = document.querySelector(".book-container")
const addBook = document.querySelector(".add-card")
const addBookModal = document.querySelector("dialog")
const submitButton = document.querySelector(".submit-button")
const closeButton = document.querySelector(".close-button")

form.addEventListener("submit",(event) =>{
    event.preventDefault();
    addBookModal.close();
    addBookToLibrary();
    form.reset();
});

addBook.addEventListener("click",() =>{
    addBookModal.showModal();
});

closeButton.addEventListener("click",() =>{
    addBookModal.close();
    form.reset();
});

const myLibrary = [];

function Book(title,author,pages,book_url,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.book_url = book_url;
    this.read = read;
    this.uuid = self.crypto.randomUUID()
}

function addBookToLibrary(){
    let title = document.querySelector("input[id='title'").value;
    let author = document.querySelector("input[id='author'").value;
    let pages = document.querySelector("input[id='pages'").value;
    let book_url = document.querySelector("input[id='book-cover'").value;
    let read = document.querySelector("input[id='read'").checked;
    
    const newBook = new Book(title,author,pages,book_url,read);
    myLibrary.push(newBook);
    addLibraryToDisplay(myLibrary);
    console.log(myLibrary);
}

function addLibraryToDisplay(myLibrary){
    bookContainer.innerHTML = ""
    bookContainer.appendChild(addBook)
    myLibrary.forEach((book) =>{
        const newCard = document.createElement("div")
        const deleteButtonContainer = document.createElement("div")
        const delButton = document.createElement("button")
        const bookTitle = document.createElement("h3")
        bookTitle.textContent = book.title
        delButton.classList.add("delete-button")
        newCard.classList.add("card")
        newCard.style.background = `url(${book.book_url})`
        deleteButtonContainer.appendChild(delButton)
        newCard.appendChild(deleteButtonContainer)
        newCard.appendChild(bookTitle)
        bookContainer.appendChild(newCard)
    })
}