import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '8383420-2fd3a74e6fa7f1c43c1b3aa8e';
const STATIC_OPTIONS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
// axios.defaults.headers.common['x-api-key'] = API_KEY;

export async function fetchImages(q = '', page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${q}&page=${page}&${STATIC_OPTIONS}`;

  console.log(url);

  const responce = await axios.get(url);
  return responce.data;
}
