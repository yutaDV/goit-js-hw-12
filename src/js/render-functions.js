
export function renderImages(images, lightbox, append = false) {
  const gallery = document.getElementById('gallery');
  const markup = images.map(image => createImageCard(image)).join('');
  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
  lightbox.refresh();
}



function createImageCard(image) {
  return `
  <div class="gallery-item-container">  
  <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy" />
      <div class="info">
        <p><span>Likes:</span> ${image.likes}</p>
        <p><span>Views:</span> ${image.views}</p>
        <p><span>Comments:</span> ${image.comments}</p>
        <p><span>Downloads:</span> ${image.downloads}</p>
      </div>
    </a>
  </div>
  `;
}

export function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}
