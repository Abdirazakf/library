const form = document.querySelector("form")
const card = document.querySelector(".card")
const addBook = document.querySelector(".add-card")
const addBookModal = document.querySelector("dialog")
const submitButton = document.querySelector(".submit-button")
const closeButton = document.querySelector(".close-button")

form.addEventListener("submit",(event) =>{
    event.preventDefault();
    addBookModal.close();
    addBookToLibrary();
    form.reset();
})

addBook.addEventListener("click",() =>{
    addBookModal.showModal();
})

closeButton.addEventListener("click",() =>{
    addBookModal.close();
})

const myLibrary = []

function Book(title,author,pages,book_url,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.book_url = book_url
    this.read = read
}

function addBookToLibrary(){
    let title = document.querySelector("input[id='title'").value
    let author = document.querySelector("input[id='author'").value
    let pages = document.querySelector("input[id='pages'").value
    let book_url = document.querySelector("input[id='book-cover'").value
    let read = document.querySelector("input[id='read'").checked
    
    const newBook = new Book(title,author,pages,book_url,read)
    
    console.log(newBook)
}