
document.addEventListener("DOMContentLoaded", ()=> {
    let myLabary = [];

    function Book(id, title, author, pages, readStatus) {
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor.")
        }

        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    function addBookToLibrary(title, author, pages, readStatus) {
        const uniqId = crypto.randomUUID();
        const newBook = new Book(`ID: ${uniqId}`, `Title: ${title}`, `Author: ${author}`, `Page: ${pages}`, `${readStatus ? "Read" : "Not Read Yet!"}`);
        myLabary.push(newBook);
    }

    addBookToLibrary("Binti", "Nnedi Okorafor", 96, true);
    addBookToLibrary("Life of Pi", "Yann Martel", 350, false);
    addBookToLibrary("Efuru", "Flora Nwapa", 288, true);
    addBookToLibrary("Dune", "Frank Herbert", 412, false);

    function displayBooks() {
        let div_card = document.querySelector("#div_card");
        div_card.innerHTML = '';
        
        const cards = document.createElement("div");
        cards.setAttribute('class', 'cards');

        for (const book of myLabary) {
            const card = document.createElement("div");
            card.setAttribute('class', 'card');
            const id = document.createElement("p");
            id.setAttribute('class', 'cardID');
            const title = document.createElement("h4");
            const author = document.createElement("p");
            const pages = document.createElement("p");

            const readStatus = document.createElement("span");
            const changeReadStatus = document.createElement("button");

            const delete_p = document.createElement("p");
            const delete_card = document.createElement("button");

            delete_p.append(delete_card);
            changeReadStatus.setAttribute("class", "read-toggle");
            changeReadStatus.setAttribute("data-book-id", `${book.id}`);
            delete_card.setAttribute("data-book-id", `${book.id}`);
            delete_card.setAttribute("id", "delete_card");

            id.textContent = book.id;
            title.textContent = book.title;
            author.textContent = book.author;
            pages.textContent = book.pages;
            readStatus.textContent = book.readStatus;
            changeReadStatus.textContent = ("Change Status")
            delete_card.textContent = ("Delete");

            card.appendChild(id);
            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(pages);
            card.appendChild(readStatus);
            card.appendChild(changeReadStatus);
            card.appendChild(delete_p)

            cards.appendChild(card);
        }
        div_card.appendChild(cards);
    }
    displayBooks()

    function createNewBook() {
        const submit = document.querySelector('.submit');

        const dialog = document.querySelector("#dialog");
        const closeButton = document.querySelector("#closeBtn");
        const openButton = document.querySelector("#openBtn");

        openButton.addEventListener("click", () => {
            dialog.show()
        })
        closeButton.addEventListener("click", () => {
            dialog.close();
        })
        
        let formElement = document.querySelector("form");
        formElement.addEventListener("submit", (event)=> {
            event.preventDefault();
            const titleValue = document.getElementById("title").value;
            const authorValue = document.getElementById("author").value;
            const pageValue = document.getElementById("page").value;
            const readStValue = document.getElementById("readSt").checked;

            addBookToLibrary(titleValue, authorValue, pageValue, readStValue);
            displayBooks();            
            formElement.reset();
        })
    }
    createNewBook();

    // The Separation of Concerns combined with Event Delegation.
    function toggleReadStatus(bookIdToToggle) {
        const bookToToggle = myLabary.find(book => book.id === bookIdToToggle);
        if (bookToToggle) {

            if (bookToToggle.readStatus === "Not Read Yet!") {
                bookToToggle.readStatus = "Read";
            } else {
                bookToToggle.readStatus = "Not Read Yet!";
            }
        }
        displayBooks();
    }

    div_card.addEventListener("click", (event) => {
        if (event.target.classList.contains('read-toggle')) {
            const bookId = event.target.dataset.bookId;
            toggleReadStatus(bookId);
        } else if (event.target.dataset.bookId) {
            const bookId = event.target.dataset.bookId;

            function removeBookFromLibrary(bookIdToRemove) {
                myLabary = myLabary.filter(book => book.id !== bookIdToRemove);
                displayBooks();
            }
            removeBookFromLibrary(bookId);
        }
    })
})    
