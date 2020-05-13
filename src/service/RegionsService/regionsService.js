/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import api from 'service/api';
let result

export async function regionsService() {    
    try {
        result = await api.get('regioes'); 
        return result;

    } catch (e) {
        console.error(e);
    }
    return;
}

export async function getErrosByRegion(year){
    try {
        result = await api.get(`errosbyregion/${year}`);
        return result
    } catch (error) {
        console.error(error)
    }
};

export async function getHitsByRegion(year){
    try {
        result = await api.get(`hitsbyregion/${year}`);
        return result
    } catch (error) {
        console.error(error)
    }
};

export async function getNullsByRegion(year){
    try {
        result = await api.get(`nullsbyregion/${year}`);
        return result
    } catch (error) {
        console.error(error)
    }
};

export async function getStudentsByYear(year, province){
    try {
        result = await api.get(`students-by-region/${year}/${province}`);
        return result
    } catch (error) {
        console.error(error)
    }
};
