


export function renderImages(images, lightbox) {
  const gallery = document.getElementById('gallery');
  
  // Створення проміжної змінної для зберігання розмітки
  let markup = images.map(image => createImageCard(image)).join('');

  // Додавання розмітки до галереї
  gallery.innerHTML = markup;

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
