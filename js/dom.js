const BOOK_ITEM_ID = "itemId";
const UNCOMPLETED_READ_ID = 'inCompleteBookShelfList';
const COMPLETED_READ_ID = 'completeBookShelfList';

function addBook() {

    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputCheckBtn = document.getElementById("isComplete").checked;

    const book = inputBook(inputBookTitle, inputBookAuthor, inputBookYear, inputCheckBtn);
    const bookObject = composeBookObject(inputBookTitle, inputBookAuthor, inputBookYear, inputCheckBtn);
  
    book[BOOK_ITEM_ID] = bookObject.id;
    books.push(bookObject);

    if(inputCheckBtn){
        document.getElementById(COMPLETED_READ_ID).append(book);
        alert("Buku ditambahkan di Kartu Selesai Dibaca !");
    } else {
        document.getElementById(UNCOMPLETED_READ_ID).append(book);
        alert("Buku ditambahkan di Kartu Belum Selesai Dibaca !");
    }
    updateDataToStorage();
}

function inputBook(inputTitle, inputAuthor, inputYear, inputCheck){
    
    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.innerText = inputTitle;

    
    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-details');
    bookAuthor.innerText = inputAuthor;

    const bookYear = document.createElement('p');
    bookYear.classList.add('book-details');
    bookYear.innerText = inputYear;

    const buttons = document.createElement('div');
    buttons.classList.add('book-buttons');
    buttons.append(greenBtn(inputCheck));
    buttons.append(redBtn());

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-card');
    bookContainer.append(bookTitle, bookAuthor, bookYear, buttons);

    return bookContainer;
};

function createButton(buttonType, buttonText, eventListener){

    const button = document.createElement("button");
    button.innerText = buttonText;
    button.classList.add(buttonType);
    button.addEventListener("click", function (event) {
        eventListener(event); 
    });
    return button;
}

function greenBtn(status) {

    return createButton('green', (status ? 'Belum Selesai' : 'Selesai'), function(event) {
        if(status) {
            undoBookFromCompleted(event.target.parentElement.parentElement);
        } else {
            addBookToCompleted(event.target.parentElement.parentElement);
        }
    });
}

function redBtn() {

    return createButton('red', 'Hapus Buku', function(event) {
        removeBook(event.target.parentElement.parentElement);
    });
}

function addBookToCompleted(taskElement) {
    const book = findBook(taskElement[BOOK_ITEM_ID]);
    book.isComplete = true;

    const addBook = inputBook(book.title, book.author, book.year, isComplete=true);
    addBook[BOOK_ITEM_ID] = book.id;

    const bookCompleted = document.getElementById(COMPLETED_READ_ID);
    bookCompleted.append(addBook);

    taskElement.remove();
    updateDataToStorage();
}

function removeBook(taskElement) {
    const deleted = confirm('Yakin ingin menghapus buku dari daftar ?');
    if(deleted) {

        const bookPosition = findBookIndex(taskElement[BOOK_ITEM_ID]);
        books.splice(bookPosition, 1);

        taskElement.remove();
        updateDataToStorage();
    }
}

function undoBookFromCompleted(taskElement){
    const book = findBook(taskElement[BOOK_ITEM_ID]);
    book.isComplete = false;

    const newBook = inputBook(book.title, book.author, book.year, book.isComplete);
    newBook[BOOK_ITEM_ID] = book.id;
    
    const uncompletedRead = document.getElementById(UNCOMPLETED_READ_ID);
    uncompletedRead.append(newBook);

    taskElement.remove();
    updateDataToStorage();
}

function searchBook(keyword) {
    const bookList = document.querySelectorAll('.book-card');
    for(let book of bookList){
        const title = book.childNodes[0];
        if(!title.innerText.toLowerCase().includes(keyword)){
            title.parentElement.style.display = 'none';
        } else {
            title.parentElement.style.display = '';
        }
    }
}