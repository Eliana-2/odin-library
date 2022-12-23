let myLibrary = [new Book('T-rex', 'Rawr', 2, 'Y'), new Book('Cow', 'Moooooooo', 100, 'N')];
table = document.getElementById('catalogue');

function Book(author, title, numPages, wasRead) {
  this.author = author
  this.title = title
  this.numPages = numPages
  this.wasRead = wasRead
}

function addBookToLibrary(author, title, numPages, wasRead) {
  const book = new Book(author, title, numPages, wasRead);
  myLibrary.push(book);
}

function updateCatalogue()
{
  while (table.children.length > 1) {
    table.removeChild(table.lastChild);
  }
  displayBooks();
}

function switchReadValue(index)
{
  myLibrary[index].wasRead = (myLibrary[index].wasRead === 'N') ? 'Y' : 'N';
  updateCatalogue();
}

function removeBook(index)
{
  myLibrary.splice(index, 1);
  updateCatalogue();

}

function openForm() {
  document.getElementById('popup-form').setAttribute('style', 'display:grid');
}

function clearForm() {
  const formInputs = document.querySelectorAll('input');
  formInputs.forEach((input) => {
    input.value = '';
  })
}

function closeForm() {
  document.getElementById('popup-form').setAttribute('style', 'display:none');
}

function addBook() {
  addBookToLibrary(document.getElementById('author').value, document.getElementById('title').value, document.getElementById('pages').value, document.getElementById('read').value);
  clearForm();
  closeForm();
  updateCatalogue();
}

function displayBooks() {
  for (const book of myLibrary) {
    const bookRow = document.createElement('tr');

    for (element in book) {
      const bookItem = document.createElement('td');
      bookItem.innerHTML = book[element];
      bookRow.appendChild(bookItem);
    }

    const readButton = document.createElement('button');
    readButton.innerHTML = (book.wasRead === 'N') ? 'Yes' : 'No';
    readButton.setAttribute('data-attribute', myLibrary.indexOf(book));
    readButton.setAttribute('class', 'book-button');

    readButton.addEventListener('click', function(e) {
      switchReadValue(e.target.getAttribute("data-attribute"));
    });

    bookRow.appendChild(readButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove book';
    removeButton.setAttribute('data-attribute', myLibrary.indexOf(book));
    removeButton.setAttribute('class', 'book-button');

    removeButton.addEventListener('click', function(e) {
      removeBook(e.target.getAttribute("data-attribute"));
    });

    bookRow.appendChild(removeButton);
    table.appendChild(bookRow);
  }
}

document.querySelector('.add-button').addEventListener('click', openForm);

displayBooks();