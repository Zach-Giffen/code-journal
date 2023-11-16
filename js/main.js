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

  entryList.prepend(renderEntry($formInfo));

  viewSwap('entries');

  toggleNoEntries();
});

function renderEntry(entry) {
  // Create the main list item
  const $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'row');

  // Create the column for the photo
  const $columnPhoto = document.createElement('div');
  $columnPhoto.setAttribute('class', 'column-half');

  // Create the image element
  const $image = document.createElement('img');
  $image.setAttribute('id', 'entryImg2');
  $image.setAttribute('class', 'photo');
  $image.setAttribute('src', entry.photo); // or entry.photo
  $image.setAttribute('alt', 'entry photo');

  // Append image to photo column
  $columnPhoto.appendChild($image);

  // Create the column for the text
  const $columnText = document.createElement('div');
  $columnText.setAttribute('class', 'column-half');

  // Create and append the title
  const $title = document.createElement('h2');
  $title.textContent = entry.title; // 'Wizard of odd'
  $columnText.appendChild($title);

  // Create and append the paragraph
  const $paragraph = document.createElement('p');
  $paragraph.textContent = entry.notes; // 'Were going to see the wizard, the peculiar wizard of odd'
  $columnText.appendChild($paragraph);

  // Append both columns to the main list item
  $listItem.appendChild($columnPhoto);
  $listItem.appendChild($columnText);

  return $listItem;
}

const entryList = document.getElementById('entryList');

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    entryList.appendChild(renderEntry(data.entries[i]));
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
    entryForm.classList.remove('hidden');
    entries.classList.add('hidden');
  }
  data.view = view;
}

const SwapToEntries = document.getElementById('swapToEntries');
SwapToEntries.addEventListener('click', function () {
  viewSwap('entries');
});

const SwapToForm = document.getElementById('swapToForm');
SwapToForm.addEventListener('click', function () {
  viewSwap('entry-form');
});
