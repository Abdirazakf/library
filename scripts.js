// Book Model Module to handle the Book constructor

const BookModel = (() => {
    function Book (title,author,pages,book_url,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.book_url = book_url;
        this.read = read;
        this.uuid = "a" + self.crypto.randomUUID();
    }

    Book.prototype.toggleRead = function() {
        this.read = !this.read
        return this.read
    }

    return Book
})();

// Library Module to manage the book collection (array)

const Library = (() => {
    let myLibrary = [];

    const addBook = (book) => {
        myLibrary.push(book);
    }

    const deleteBook = (uuid) => {
        const index = myLibrary.findIndex(book => book.uuid === uuid);

        if (index !== -1){
            myLibrary.splice(index,1);
            return true
        }
        return false
    }

    const getBook = (uuid) => {
        return myLibrary.find(book => book.uuid === uuid)
    }

    const returnAllBooks = () => {
        return [...myLibrary]
    }

    return {
        addBook,
        deleteBook,
        getBook,
        returnAllBooks
    }
})()


// Handles DOM manipulation and updates to UI

const UI = (() => {

    // Cache DOM elements so I can avoid the my code being DRY
    const elements = {
        form: document.querySelector("form"),
        bookContainer: document.querySelector(".book-container"),
        addBookCard: document.querySelector(".add-card"),
        addBookModal: document.querySelector(".add-book-modal"),
        bookInfoModal: document.querySelector(".book-info-modal"),
        modalTitle: document.querySelector(".book-title"),
        modalAuthor: document.querySelector(".book-author"),
        modalPages: document.querySelector(".book-pages"),
        modalBookCover: document.querySelector(".right-side > img"),
        submitButton: document.querySelector(".submit-button"),
        closeButton: document.querySelector(".close-button"),
        closeButton2: document.querySelector(".close-button-2"),
        readSwitch: document.querySelector("#switch")
    }

    const createBookCard = (book) => {
        const newCard = document.createElement("div")
        const deleteButtonContainer = document.createElement("div")
        const delButton = document.createElement("button")
        const bookTitle = document.createElement("h3")

        bookTitle.textContent = book.title
        delButton.classList.add("delete-button")
        newCard.classList.add("card")
        newCard.style.background = `url(${book.book_url})`
        newCard.dataset.indexNumber = book.uuid

        deleteButtonContainer.appendChild(delButton)
        newCard.appendChild(deleteButtonContainer)
        newCard.appendChild(bookTitle)
        elements.bookContainer.appendChild(newCard)

        return {
            newCard,
            delButton
        }

    }

    const addToDisplay = (myLibrary) => {
        elements.bookContainer.innerHTML = "";
        elements.bookContainer.appendChild(elements.addBookCard);
        
        myLibrary.forEach(book => {
            const { newCard, delButton } = createBookCard(book);
            elements.bookContainer.appendChild(newCard);
        });
    }

    const getFormData = () => {
        return {
            title: document.querySelector("input[id='title'").value,
            author: document.querySelector("input[id='author'").value,
            pages: document.querySelector("input[id='pages'").value,
            book_url: document.querySelector("input[id='book-cover'").value,
            read: document.querySelector("input[id='read'").checked
        }
    }

    const clearForm = () => {
        elements.form.reset()
    }

    const showAddBookModal = () => {
        elements.addBookModal.showModal()
    }

    const closeAddBookModal = () => {
        elements.addBookModal.close()
    }

    const showBookInfoModal = (book) => {
        elements.modalTitle.textContent = `Title: ${book.title}`
        elements.modalAuthor.textContent = `Author: ${book.author}`
        elements.modalPages.textContent = `# of Pages: ${book.pages}`
        elements.modalBookCover.setAttribute("src", book.book_url)
        elements.readSwitch.checked = book.read
        elements.bookInfoModal.showModal();     
    }

    const closeBookInfoModal = () => {
        elements.bookInfoModal.close()
    }

    const getElements = () => elements;

    return {
        addToDisplay,
        getFormData,
        clearForm,
        showAddBookModal,
        closeAddBookModal,
        showBookInfoModal,
        closeBookInfoModal,
        getElements
    }
})();

// Manage all event listeners

const EventController = (() => {
    let currentBookUUID = null;
    const uiElements = UI.getElements();

    const init = () => {
        uiElements.form.addEventListener("submit", formSubmit);
        uiElements.addBookCard.addEventListener("click", UI.showAddBookModal);
        uiElements.closeButton.addEventListener("click", handleCloseAddModal);
        uiElements.closeButton2.addEventListener("click", UI.closeBookInfoModal);
        uiElements.readSwitch.addEventListener("change", handleReadState);
        uiElements.bookContainer.addEventListener("click", handleBookContainerClick)
    }

    const formSubmit = (event)  => {
        event.preventDefault();

        const formData = UI.getFormData();
        const newBook = new BookModel (
            formData.title,
            formData.author,
            formData.pages,
            formData.book_url,
            formData.read
        );

        Library.addBook(newBook);
        UI.addToDisplay(Library.returnAllBooks());
        handleCloseAddModal();
    }

    const handleReadState = () => {
        if (currentBookUUID) {
            const book = Library.getBook(currentBookUUID);
            if(book) {
                book.toggleRead()
                UI.addToDisplay(Library.returnAllBooks())
            }
        }
    }

    const handleCloseAddModal = () => {
        UI.closeAddBookModal()
        UI.clearForm()
    }

    const handleBookContainerClick = (event) => {
        if (event.target.classList.contains("delete-button")){
            event.stopPropagation();
            const card = event.target.closest(".card")
            const uuid = card.dataset.indexNumber

            if (Library.deleteBook(uuid)){
                card.remove()
            }
            return
        }
        
        const clickedCard = event.target.closest(".card:not(.add-card)")
        if (clickedCard) {
            const uuid = clickedCard.dataset.indexNumber;
            const book = Library.getBook(uuid)
            
            if (book) {
                currentBookUUID = uuid;
                UI.showBookInfoModal(book);
            }
        }
    }

    return {
        init
    }
})()

// Start script when DOM loads

document.addEventListener("DOMContentLoaded", ()=> {
    EventController.init();
})


// Old messy spaghetti code that I wrote before learning modular programming, very hard to revisit/maintain

// const form = document.querySelector("form");
// const bookContainer = document.querySelector(".book-container");
// const addBook = document.querySelector(".add-card");
// const addBookModal = document.querySelector(".add-book-modal");
// const bookInfoModal = document.querySelector(".book-info-modal");
// const modalTitle = document.querySelector(".book-title")
// const modalAuthor = document.querySelector(".book-author")
// const modalPages = document.querySelector(".book-pages")
// const modalBookCover = document.querySelector(".right-side > img")
// const submitButton = document.querySelector(".submit-button");
// const closeButton = document.querySelector(".close-button");
// const closeButton2 = document.querySelector(".close-button-2");
// const readSwitch = document.querySelector("#switch")
// let currentBookUUID = null;
// const myLibrary = [];

// form.addEventListener("submit",(event) =>{
//     event.preventDefault();
//     addBookModal.close();
//     addBookToLibrary();
//     form.reset();
// });

// addBook.addEventListener("click",() =>{
//     addBookModal.showModal();
// });

// closeButton.addEventListener("click",() =>{
//     addBookModal.close();
//     form.reset();
// });

// closeButton2.addEventListener("click", ()=> {
//     bookInfoModal.close();
// })

// function Book(title,author,pages,book_url,read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.book_url = book_url;
//     this.read = read;
//     this.uuid = 'a' + self.crypto.randomUUID()
// }

// Book.prototype.toggleRead = function () {
//     this.read = !this.read
// }

// function addBookToLibrary(){
//     let title = document.querySelector("input[id='title'").value;
//     let author = document.querySelector("input[id='author'").value;
//     let pages = document.querySelector("input[id='pages'").value;
//     let book_url = document.querySelector("input[id='book-cover'").value;
//     let read = document.querySelector("input[id='read'").checked;
    
//     const newBook = new Book(title,author,pages,book_url,read);
//     myLibrary.push(newBook);
//     addLibraryToDisplay(myLibrary);
// }

// function addLibraryToDisplay(myLibrary){
//     bookContainer.innerHTML = ""
//     bookContainer.appendChild(addBook)
//     myLibrary.forEach((book) =>{
//         const newCard = document.createElement("div")
//         const deleteButtonContainer = document.createElement("div")
//         const delButton = document.createElement("button")
//         const bookTitle = document.createElement("h3")

//         bookTitle.textContent = book.title
//         delButton.classList.add("delete-button")
//         newCard.classList.add("card")
//         newCard.style.background = `url(${book.book_url})`
//         newCard.dataset.indexNumber = book.uuid

//         newCard.addEventListener("click",() => {
//             modalTitle.textContent = `Title: ${book.title}`
//             modalAuthor.textContent = `Author: ${book.author}`
//             modalPages.textContent = `# of Pages: ${book.pages}`
//             modalBookCover.setAttribute("src", book.book_url)
            
//             readSwitch.checked = book.read
//             currentBookUUID = book.uuid
//             bookInfoModal.showModal();
//         })

//         delButton.addEventListener("click", (event) => {
//             event.stopPropagation()
//             let targetUUID = newCard.getAttribute("data-index-number")
//             let removedCard = document.querySelector(`[data-index-number=${targetUUID}]`)
//             removedCard.remove();

//             let index = myLibrary.findIndex(book => book.uuid === targetUUID)

//             if (index !== -1){
//                 myLibrary.splice(index,1)
//             }
//         })

//         deleteButtonContainer.appendChild(delButton)
//         newCard.appendChild(deleteButtonContainer)
//         newCard.appendChild(bookTitle)
//         bookContainer.appendChild(newCard)
//     })
// }

// readSwitch.addEventListener("change", () => {
//     if (currentBookUUID) {
//         const book = myLibrary.find(b => b.uuid === currentBookUUID);
//         if (book) {
//             book.toggleRead();
//             addLibraryToDisplay(myLibrary);
//         }
//     }
//     console.log(myLibrary)
// });