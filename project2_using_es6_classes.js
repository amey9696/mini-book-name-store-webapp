class Book{
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{
    add(book) { //call display.add() method
        // console.log("adding to ui");
        let tableBody = document.getElementById('tableBody');
        let uiString = `
                        <tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML = uiString;
    }

    clear() { 
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) { //call display.clear() method
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, dsiplayMessage) { //call display.show() method/function
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText='Sucess';
        }
        else{
            boldText='Error!';
        }
        message.innerHTML = `
                            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong>${dsiplayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        setTimeout(() => {
            message.innerHTML = '';
        }, 5000); //after 2 second alert msg automatically closed
    }
}

//Add Submit Event Listener to forms
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log("you have submitted library form..");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    //in type we grap 3 ids of radio button fiction, programming, cooking
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book); //adding book
        display.clear(); //clear form after doing operation
        display.show('success', ' your book is added successfully..');
    }
    else {
        //show error to the user
        display.show('danger', ' you cannot add this book..');
    }
    e.preventDefault(); //this line prevent the page load(stable the upsite display statement)
}
