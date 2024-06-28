
import axios from 'axios';

const myApiKey = '44507065-2e810e6cd55f29a257fa3dc75';

export async function fetchImages(query, page = 1) {
  const url = `https://pixabay.com/api/?key=${myApiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Axios error: ', error);
    throw error;
  }
}
