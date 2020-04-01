/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import axios from 'axios';

export default axios.create(
  {
    // baseURL: 'https://enadedm-api.herokuapp.com/'
    baseURL: 'http://127.0.0.1:8000/'
  }
);