const form = document.querySelector("form");
const bookContainer = document.querySelector(".book-container");
const addBook = document.querySelector(".add-card");
const addBookModal = document.querySelector(".add-book-modal");
const bookInfoModal = document.querySelector(".book-info-modal");
const modalTitle = document.querySelector(".book-title")
const modalAuthor = document.querySelector(".book-author")
const modalPages = document.querySelector(".book-pages")
const modalBookCover = document.querySelector(".right-side > img")
const submitButton = document.querySelector(".submit-button");
const closeButton = document.querySelector(".close-button");
const closeButton2 = document.querySelector(".close-button-2");
const readSwitch = document.querySelector("#switch")
let currentBookUUID = null;
const myLibrary = [];

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

closeButton2.addEventListener("click", ()=> {
    bookInfoModal.close();
})

function Book(title,author,pages,book_url,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.book_url = book_url;
    this.read = read;
    this.uuid = 'a' + self.crypto.randomUUID()
}

Book.prototype.toggleRead = function () {
    this.read = !this.read
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
        newCard.dataset.indexNumber = book.uuid

        newCard.addEventListener("click",() => {
            modalTitle.textContent = `Title: ${book.title}`
            modalAuthor.textContent = `Author: ${book.author}`
            modalPages.textContent = `# of Pages: ${book.pages}`
            modalBookCover.setAttribute("src", book.book_url)
            
            readSwitch.checked = book.read
            currentBookUUID = book.uuid
            bookInfoModal.showModal();
        })

        delButton.addEventListener("click", (event) => {
            event.stopPropagation()
            let targetUUID = newCard.getAttribute("data-index-number")
            let removedCard = document.querySelector(`[data-index-number=${targetUUID}]`)
            removedCard.remove();

            let index = myLibrary.findIndex(book => book.uuid === targetUUID)

            if (index !== -1){
                myLibrary.splice(index,1)
            }
        })

        deleteButtonContainer.appendChild(delButton)
        newCard.appendChild(deleteButtonContainer)
        newCard.appendChild(bookTitle)
        bookContainer.appendChild(newCard)
    })
}

readSwitch.addEventListener("change", () => {
    if (currentBookUUID) {
        const book = myLibrary.find(b => b.uuid === currentBookUUID);
        if (book) {
            book.toggleRead();
            addLibraryToDisplay(myLibrary);
        }
    }
    console.log(myLibrary)
});