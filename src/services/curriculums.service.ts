import { apiClient, endpoints } from './api';

const CurriculumsService = {
    getCurriculums(userId: string, organizationId: string) {
        return apiClient.get(endpoints.curriculums.get(userId, organizationId));
    }
}

export default CurriculumsService;
