
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from './js/pixabay-api';
import { renderImages, showLoader, hideLoader } from './js/render-functions';

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'title',
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 250,
  fadeSpeed: 300,
  close: true,
  showCounter: true,
});

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query.' });
    return;
  }

  showLoader();

  try {
    const data = await fetchImages(query);
    
    if (data.hits.length === 0) {
      iziToast.warning({ title: 'No Results', message: 'Sorry, there are no images matching your search query. Please try again!' });
    } else {
      renderImages(data.hits, lightbox);
      searchInput.value = '';
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching images.' });
  } finally {
    hideLoader();
  }
});
