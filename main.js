const breedListEl = document.querySelector('.breed-list');
const breedDetailEl = document.querySelector('.breed-detail');

async function fetchBreeds() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    const breeds = Object.keys(data.message);
    renderBreeds(breeds);
  } catch (error) {
    console.error(error);
    breedListEl.innerHTML = '<li>Ошибка загрузки данных</li>';
  }
}

function renderBreeds(breeds) {
  breedListEl.innerHTML = '';
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.classList.add('breed-item');
    li.textContent = breed;
    li.addEventListener('click', () => fetchBreedDetail(breed));
    breedListEl.appendChild(li);
  });
}

async function fetchBreedDetail(breed) {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    renderBreedDetail(breed, data.message);
  } catch (error) {
    console.error(error);
    breedDetailEl.innerHTML = `<p>Ошибка загрузки данных для породы ${breed}</p>`;
  }
}

function renderBreedDetail(breed, imageUrl) {
  breedDetailEl.innerHTML = `
    <h3>${breed}</h3>
    <img src="${imageUrl}" alt="Изображение породы ${breed}" class="breed-image" />
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds();
});
