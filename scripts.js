const addBook = document.querySelector(".add-card")
const bookModal = document.querySelector("dialog")
const closeButton = document.querySelector(".close-button")

addBook.addEventListener("click",() =>{
    bookModal.showModal();
})

closeButton.addEventListener("click",() =>{
    bookModal.close()
})