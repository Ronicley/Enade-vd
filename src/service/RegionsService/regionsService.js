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

export async function getErrosByRegion(region, course){    
    try {
        result = await api.get(`errosbyregion/${region}/${course}`)
        return result
    } catch (error) {
        console.error(error)
    }
};

export async function getHitsByRegion(region, course){    
    try {
        result = await api.get(`hitsbyregion/${region}/${course}`)
        return result
    } catch (error) {
        console.error(error)
    }
};