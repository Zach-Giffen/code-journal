/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  this.localStorage.setItem('local-storage', dataJSON);
});

const isData = localStorage.getItem('local-storage');
if (isData !== null) {
  data = JSON.parse(isData);
}

// end of data.js

const $photoInput = document.getElementById('photo-url');
const $img = document.getElementById('img');

$photoInput.addEventListener('input', function () {
  $img.src = $photoInput.value;
});

const $form = document.getElementById('myForm');

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  const $title = document.querySelector('.title input').value;
  const $photo = document.querySelector('.photo-url input').value;
  const $notes = document.querySelector('.notes textarea').value;

  const $formInfo = {
    entryId: data.nextEntryId,
    title: $title,
    photo: $photo,
    notes: $notes,
  };

  data.nextEntryId++;

  data.entries.unshift($formInfo);

  $img.src = 'images/placeholder-image-square.jpg';

  document.querySelector('.title input').value = '';
  document.querySelector('.photo-url input').value = '';
  document.querySelector('.notes textarea').value = '';
});

function renderEntry(entry) {
  const $unlisted = document.createElement('ul');
  $unlisted.setAttribute('class', 'row');

  const $listPhoto = document.createElement('li');
  $listPhoto.setAttribute('class', 'column-half');

  const $listImg = document.createElement('img');
  $listImg.setAttribute('id', 'entryImg');
  $listImg.setAttribute('class', 'photo-entry');
  $listImg.setAttribute('src', entry.photo);
  $listImg.setAttribute('alt', 'entry photo');

  $listPhoto.appendChild($listImg);

  const $listText = document.createElement('li');
  $listText.setAttribute('class', 'column-half');

  const $listName = document.createElement('h2');
  $listName.setAttribute('class', 'name-entry');
  $listName.textContent = entry.title;

  const $listNotes = document.createElement('p');
  $listNotes.setAttribute('class', 'notes-entry');
  $listNotes.textContent = entry.notes;

  $listText.appendChild($listName);
  $listText.appendChild($listNotes);

  $unlisted.appendChild($listPhoto);
  $unlisted.appendChild($listText);

  return $unlisted;
}

console.log(renderEntry(data.entries[0]));
console.log(renderEntry(data.entries[2]));

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }
});

function toggleNoEntries() {
  const noEntries = document.querySelector('.entry');
  console.log(noEntries);
  if (noEntries.classList.contains('hidden')) {
    noEntries.classList.remove('hidden');
  } else {
    noEntries.classList.add('hidden');
  }
}

console.log(toggleNoEntries());

const entries = document.querySelector('.entries');
const entryForm = document.querySelector('.entry-form');

function viewSwap(view) {
  console.log(view);
  if (view === 'entries') {
    entries.classList.remove('hidden');
    entryForm.classList.add('hidden');
  } else if (view === 'entry-form') {
    entryForm.classList.remove('entry-form');
    entries.classList('hidden');
  }
  data.view = view;
}

console.log(viewSwap);
