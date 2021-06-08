function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display consrtuctor
function Display() {

}

//Add methods to diplay prototype (DYNAMICALLY DISPLAY TABLE CONTENT AFTER ADDING DATA)
//Implement the add function
Display.prototype.add = function (book) { //call display.add() method
    console.log("adding to ui");
    tableBody = document.getElementById('tableBody');
    let uiString = `
                    <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML = uiString;
}
//Implement the clear function
Display.prototype.clear = function () { //call display.clear() method
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implement the validate function
Display.prototype.validate = function (book) { //call display.clear() method
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

//Implement book added or not added display alert msg
Display.prototype.show = function (type, dsiplayMessage) { //call display.show() method/function
    let message = document.getElementById('message');
    message.innerHTML = `
                        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong></strong>${dsiplayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    setTimeout(() => {
        message.innerHTML = '';
    }, 2000); //after 2 second alert msg automatically closed
}

//Add Submit Event Listener to forms
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("you have submitted library form..");
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