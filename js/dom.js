const COMPLETE_BOOK = "completedBook";
const UNCOMPLETE_BOOK = "uncompletedBook";
const BOOK_ITEMID = "itemid";

function makeBook(titleBook, authorBook, yearBook, isCompleted) {
  const innerBook = document.createElement('div');
  innerBook.classList.add('inner-book');

  const titleBookEl = document.createElement('h3');
  titleBookEl.innerText = titleBook;

  const authorBookEl = document.createElement('p')
  authorBookEl.classList.add('author')
  authorBookEl.innerText = authorBook;

  const yearBookEl = document.createElement('p');
  yearBookEl.classList.add('year')
  yearBookEl.innerText = yearBook;
  innerBook.append(titleBookEl, authorBookEl, yearBookEl);

  const buttonWrap = document.createElement('div');
  buttonWrap.classList.add('wrap-button');

  if (isCompleted) {
    buttonWrap.append(createUndoButton(), createTrashButton());
  } else {
    buttonWrap.append(createCheckButton(), createTrashButton());
  }

  const container = document.createElement('div');
  container.classList.add('inner');
  container.append(innerBook, buttonWrap);

  return container;
}

function createCheckButton() {
  return createButton('check-button', function (event) {
    addBookToComplete(event.target.parentElement.parentElement);
  });
}

function createTrashButton() {
  return createButton('trash-button', function (event) {
    removeBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function createUndoButton() {
  return createButton('undo-button', function (event) {
    undoBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.addEventListener('click', function (event) {
    eventListener(event);
  });
  return button;
}

function addBook() {
  const uncompletedBook = document.getElementById(UNCOMPLETE_BOOK);
  const title = document.getElementById('title').value;
  const author = 'Penulis: ' + document.getElementById('author').value;
  const year = 'Tahun: ' + document.getElementById('year').value;

  const addBookEl = makeBook(title, author, year, false);
  const bookObject = composeBookObject(title, author, year, false);

  addBookEl[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);
  uncompletedBook.append(addBookEl);
  resetInput();
  updateDataToStorage();
}

function resetInput() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('year').value = '';
}

function addBookToComplete(element) {
  const listCompleted = document.getElementById(COMPLETE_BOOK);
  const titleBook = element.querySelector('.inner-book h3').innerText;
  const authorBook = element.querySelector('.inner-book > .author').innerText;
  const yearBook = element.querySelector('.inner-book > .year').innerText;

  const newBook = makeBook(titleBook, authorBook, yearBook, true);

  const book = findBook(element[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  listCompleted.append(newBook);
  element.remove();

  updateDataToStorage();
}

function removeBookFromCompleted(element) {
  const bookPosition = findBookIndex(element[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  element.remove();
  updateDataToStorage();
}

function undoBookFromCompleted(element) {
  const listUncompleted = document.getElementById(UNCOMPLETE_BOOK);
  const titleBook = element.querySelector('.inner-book h3').innerText;
  const authorBook = element.querySelector('.inner-book > .author').innerText;
  const yearBook = element.querySelector('.inner-book > .year').innerText;

  const newBook = makeBook(titleBook, authorBook, yearBook, false);
  const book = findBook(element[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  element.remove();

  updateDataToStorage();
}

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETE_BOOK);
  const listCompleted = document.getElementById(COMPLETE_BOOK);

  for (book of books) {
    const newBook = makeBook(book.titleBook, book.authorBook, book.yearBook, book.isCompleted);
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}
