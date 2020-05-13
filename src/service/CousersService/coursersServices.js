import api from '../../service/api';

export async function CoursersService() {
    let result;
    try {
        result = await api.get('result-by-areas-for-coursers');
        return result;

    } catch (e) {
        console.error(e);
    }
}

