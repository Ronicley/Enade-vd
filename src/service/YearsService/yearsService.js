/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import api from '../api';

let result;

export async function yearsService() {
    try {
        result = await api.get('anos');
        return result;

    } catch (e) {
        console.error(e);
    }
}

export async function getVolumeIncByYear() {
    try {
        result = await api.get(`resultados-por-anos`);
        return result;
    } catch (error) {
        console.error(error);
    }
}
