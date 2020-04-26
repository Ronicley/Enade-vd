
import axios from 'axios';

// eslint-disable-next-line no-undef
const BASEURL = process.env.NODE_ENV === 'production' ? 'https://enadevmapi.herokuapp.com/': 'http://127.0.0.1:8000/';

export default axios.create(
  {
    baseURL: BASEURL
  }
);
