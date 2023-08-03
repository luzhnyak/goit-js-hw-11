import { fetchImages } from './js/pixabay-api.js';
import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const btnMoreEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onFormSubmit);
btnMoreEl.addEventListener('click', onMoreClick);

const lightbox = new SimpleLightbox('.photo-card a', {
  /* options */
  captions: true,
  captionsData: 'alt',
  captionSelector: 'img',
  captionPosition: 'bottom',
  captionDelay: 250,
});

let q = '';
let page = 1;

async function loadImages() {
  Notiflix.Loading.standard('Loading data, please wait...');

  try {
    const images = await fetchImages(q, page);

    console.log(images);

    createMarkupCard(images);

    page += 1;

    Notiflix.Loading.remove();
  } catch (error) {
    console.log(error);
    Notiflix.Loading.remove();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';
  q = event.target.elements.searchQuery.value;
  loadImages();
}

function onMoreClick(event) {
  loadImages();
}

function createMarkupCard({ hits }) {
  const markupGallery = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a class="photo-link" href="${largeImageURL}">
    <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes </b>${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div> 
  
</div>`;
      }
    )
    .join(' ');

  galleryEl.insertAdjacentHTML('beforeend', markupGallery);
  lightbox.refresh();
}
