const photoInput = document.getElementById('photo-url');
const img = document.getElementById('img');

photoInput.addEventListener('input', function () {
  img.src = photoInput.value;
});
