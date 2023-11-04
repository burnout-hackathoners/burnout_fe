const API_URL = '/api/v1/';

const endpoints = {
    curriculums: {
        get: (userId: string, organizationId: string) => `${API_URL}curriculums/${userId}/${organizationId}`
    }
}

export default endpoints;
