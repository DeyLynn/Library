'use strict';

const shelf = document.querySelector('.card-container');
const addBookBtn = document.querySelector('form > div:last-of-type > input'); 

const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger');
const closeButton = document.querySelector('.close-button');

function toggleModal() {
  modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}


function Book(title, author, currentPage, pages) {
  this.title = title;
  this.author = author.split(' ').reverse().join(', ');
  this.currentPage = currentPage;
  this.pages = pages;
}

class Library {
  myBooks = [];

  addBookToLibrary(book) {
    this.myBooks.push(book);
  }
}

const myLibrary = new Library();

function getBookInfo() { 
  const title = document.getElementById('title'); 
  const author = document.getElementById('author');
  const currentPage = document.getElementById('current-page'); 
  const pages = document.getElementById('total-pages');
  const newBook = new Book(title.value, author.value, currentPage.value, pages.value); 

  myLibrary.addBookToLibrary(newBook); 

  title.value = '';
  author.value = '';
  currentPage.value = '';
  pages.value = '';

  if (title && author && currentPage && pages) createCard(newBook);
} 


function createCard(newBook) {
  const newCard = document.createElement('div');
  newCard.classList.add('book-card');

  const deleteButton = document.createElement('input');
  const readButton = document.createElement('input');
  const buttonElement = document.createElement('div');

  buttonElement.classList.add('button-container');
  buttonElement.append(readButton, deleteButton)

  const elements = [
  document.createTextNode(newBook.title), 
  document.createTextNode(newBook.author),
  document.createTextNode('page ' + newBook.currentPage
    + ' of ' + newBook.pages)];

  for (let i = 0; i < elements.length; i++) {
    let textBlock = document.createElement('div');
    textBlock.classList.add('text-block');
    textBlock.appendChild(elements[i]);
    newCard.appendChild(textBlock);
  }

  readButton.setAttribute('type', 'button');
  readButton.classList.add('read-button');
  readButton.addEventListener('click', updateReadStatus);
  
  if (parseInt(newBook.currentPage) >= parseInt(newBook.pages)) readButton.setAttribute('value', 'read');
  else readButton.setAttribute('value', 'unread');

  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('value', 'delete');
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', deleteCard);

  newCard.append(buttonElement);
  shelf.appendChild(newCard);

  toggleModal();
}

function updateReadStatus(event) {
  const card = event.target.parentElement.parentElement;
  const readBtn = card.querySelector('div:last-child > .read-button');
  const pageSection = card.querySelector('div:nth-child(3)');
  const pageText = pageSection.textContent;
  const totalPages = pageText.split(' ').pop();
  pageSection.textContent = 'page ' + totalPages + ' of ' + totalPages;

  readBtn.setAttribute('value', 'read');
}

function deleteCard(event) {
  const element = event.target;

  element.parentElement.parentElement.parentElement.removeChild(element.parentElement.parentElement);
}

window.addEventListener('DOMContentLoaded', () => { 
  trigger.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', toggleModal);
  addBookBtn.addEventListener('click', getBookInfo); 
  window.addEventListener('click', windowOnClick);
}); 

