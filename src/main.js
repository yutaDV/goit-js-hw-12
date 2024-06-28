
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
const loadMoreBtn = document.getElementById('load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let loadedHits = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = searchInput.value.trim();
  
  if (!currentQuery) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query.' });
    return;
  }

  currentPage = 1;
  loadMoreBtn.style.display = 'none';
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;
    loadedHits = data.hits.length;
    
    if (data.hits.length === 0) {
      iziToast.warning({ title: 'No Results', message: 'Sorry, there are no images matching your search query. Please try again!' });
    } else {
      renderImages(data.hits, lightbox);
      searchInput.value = '';
      if (loadedHits < totalHits) {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching images.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loadedHits += data.hits.length;
    renderImages(data.hits, lightbox, true); // Append new images
    smoothScroll(); // Scroll after rendering new images
    
    if (loadedHits >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({ title: 'End of Results', message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching images.' });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery a').getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
