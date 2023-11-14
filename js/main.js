const $photoInput = document.getElementById('photo-url');
const $img = document.getElementById('img');

$photoInput.addEventListener('input', function () {
  $img.src = $photoInput.value;
});

const formData = {
  nextEntryId: 1,
};

const $form = document.getElementById('myForm');

console.log('hello');
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('form submitted');

  const $title = document.querySelector('.title input').value;
  console.log($title);
  const $photo = document.querySelector('.photo-url input').value;
  console.log($photo);
  const $notes = document.querySelector('.notes textarea').value;
  console.log($notes);

  const $formInfo = {
    entryId: formData.nextEntryId,
    title: $title,
    photo: $photo,
    notes: $notes,
  };
  localStorage.setItem(
    `entryID-${formData.nextEntryId}`,
    JSON.stringify($formInfo)
  );

  console.log('form submitted with data');

  formData.nextEntryId++;

  $img.src = 'images/placeholder-image-square.jpg';

  document.querySelector('.title input').value = '';
  document.querySelector('.photo-url input').value = '';
  document.querySelector('.notes textarea').values = '';
});
