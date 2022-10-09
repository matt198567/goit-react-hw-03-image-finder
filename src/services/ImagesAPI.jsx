export const BASE_URL = 'https://pixabay.com/api/',
  API_KEY = '29544404-d54a0822c960a455fb427c754',
  SEARCH_PARAMS = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });
