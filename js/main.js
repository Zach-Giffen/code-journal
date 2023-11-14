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
