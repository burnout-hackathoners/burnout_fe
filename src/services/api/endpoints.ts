const API_URL = 'http://localhost:8080/api/auth/';

const endpoints = {
    curriculums: {
        get: (userId: string, organizationId: string) => `${API_URL}curriculums/${userId}/${organizationId}`
    }
}

export default endpoints;
