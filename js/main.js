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

  let $formInfo;

  if (data.editing === null) {
    const $title = document.querySelector('.title input').value;
    const $photo = document.querySelector('.photo-url input').value;
    const $notes = document.querySelector('.notes textarea').value;

    $formInfo = {
      entryId: data.nextEntryId,
      title: $title,
      photo: $photo,
      notes: $notes,
    };

    data.nextEntryId++;
    data.entries.unshift($formInfo);

    entryList.prepend(renderEntry($formInfo));
  } else {
    const $title = document.querySelector('.title input').value;
    const $photo = document.querySelector('.photo-url input').value;
    const $notes = document.querySelector('.notes textarea').value;

    $formInfo = {
      entryId: data.editing.entryId,
      title: $title,
      photo: $photo,
      notes: $notes,
    };

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $formInfo.entryId) {
        data.entries[i] = $formInfo;
      }
    }
    data.editing = null;

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $formInfo.entryId) {
        const $existingEntry = document.querySelector(
          `li[data-entry-id="${$formInfo.entryId}"]`
        );

        const $newEntry = renderEntry($formInfo);
        $existingEntry.parentNode.replaceChild($newEntry, $existingEntry);
      }
    }
    document.querySelector('.delete').classList.add('hidden');
    document.querySelector('.entryHeader').textContent = 'New Entry';
  }

  $img.src = 'images/placeholder-image-square.jpg';

  document.querySelector('.title input').value = '';
  document.querySelector('.photo-url input').value = '';
  document.querySelector('.notes textarea').value = '';

  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'row');
  $listItem.setAttribute('data-entry-id', entry.entryId);

  const $columnPhoto = document.createElement('div');
  $columnPhoto.setAttribute('class', 'column-half');

  const $image = document.createElement('img');
  $image.setAttribute('id', 'entryImg2');
  $image.setAttribute('class', 'photo');
  $image.setAttribute('src', entry.photo);
  $image.setAttribute('alt', 'entry photo');

  $columnPhoto.appendChild($image);

  const $columnText = document.createElement('div');
  $columnText.setAttribute('class', 'column-half');

  const $title = document.createElement('h2');
  $title.textContent = entry.title;
  $columnText.appendChild($title);

  const $paragraph = document.createElement('p');
  $paragraph.textContent = entry.notes;
  $columnText.appendChild($paragraph);

  $listItem.appendChild($columnPhoto);
  $listItem.appendChild($columnText);

  const $pencil = document.createElement('i');
  $pencil.className = 'fa-solid fa-pencil';
  $columnText.appendChild($pencil);

  return $listItem;
}

const entryList = document.getElementById('entryList');

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    entryList.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries() {
  const noEntries = document.querySelector('.entry');
  if (data.entries.length === 0) {
    noEntries.classList.remove('hidden');
  } else {
    noEntries.classList.add('hidden');
  }
}

const entries = document.querySelector('.entries');
const entryForm = document.querySelector('.entry-form');

function viewSwap(view) {
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
  data.editing = null;
  $img.src = 'images/placeholder-image-square.jpg';

  document.querySelector('.title input').value = '';
  document.querySelector('.photo-url input').value = '';
  document.querySelector('.notes textarea').value = '';
  document.querySelector('.entryHeader').textContent = 'New Entry';
  document.querySelector('.delete').classList.add('hidden');
});

const SwapToForm = document.getElementById('swapToForm');
SwapToForm.addEventListener('click', function () {
  viewSwap('entry-form');
});

entryList.addEventListener('click', function (event) {
  const clicked = event.target;
  if (clicked.classList.contains('fa-pencil')) {
    viewSwap('entry-form');

    const entryId = clicked.closest('li').dataset.entryId;
    for (let i = 0; i < data.entries.length; i++)
      // eslint-disable-next-line eqeqeq
      if (data.entries[i].entryId == entryId) {
        data.editing = data.entries[i];
        break;
      }
    document.querySelector('.title input').value = data.editing.title;
    document.querySelector('.photo-url input').value = data.editing.photo;
    document.querySelector('.notes textarea').value = data.editing.notes;

    $photoInput.dispatchEvent(new Event('input'));

    document.querySelector('.entryHeader').textContent = 'Edit Entry';
  }
  document.querySelector('.delete').classList.remove('hidden');
});

document.querySelector('.delete').addEventListener('click', function () {
  console.log('delete button pressed');
  document.querySelector('.modal-box').classList.remove('hidden');
});

document.querySelector('.cancelButton').addEventListener('click', function () {
  document.querySelector('.modal-box').classList.add('hidden');
});

document.querySelector('.confirmButton').addEventListener('click', function () {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i] === data.editing) {
      data.entries.splice(i, 1);
      const entryElement = document.querySelector(
        `li[data-entry-id="${data.editing.entryId}"]`
      );
      if (entryElement) {
        entryElement.remove();
      }
      data.editing = null;
      $img.src = 'images/placeholder-image-square.jpg';
      document.querySelector('.title input').value = '';
      document.querySelector('.photo-url input').value = '';
      document.querySelector('.notes textarea').value = '';
      document.querySelector('.entryHeader').textContent = 'New Entry';
      document.querySelector('.delete').classList.add('hidden');
      toggleNoEntries();
      break;
    }
  }

  document.querySelector('.modal-box').classList.add('hidden');
  viewSwap('entries');
});
