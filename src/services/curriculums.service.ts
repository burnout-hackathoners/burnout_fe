import { apiClient, endpoints } from './api';

const CurriculumsService = {
    getCurriculums(userId: string) {
        return apiClient.get(endpoints.curriculums.get(), { params: { user_id: userId } },);
    }
}

export default CurriculumsService;
