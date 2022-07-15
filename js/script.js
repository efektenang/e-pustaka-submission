document.addEventListener('DOMContentLoaded', function(){
    const submitForm = document.getElementById('inputForm');
    submitForm.addEventListener('submit', function(){
        addBook();
    });

    const searchButton = document.getElementById('searchBook');
    searchButton.addEventListener('click', function(){
        const keyword = document.getElementById('inputBookSearch').value;
        searchBook(keyword.toLowerCase());
    });

    if (isStorageExist()) { 
        loadDataFromStorage(); 
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("The data is successfully saved to local storage.");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});