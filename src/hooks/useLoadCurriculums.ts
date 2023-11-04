import { useQuery } from "react-query";
import CurriculumsService from '../services/curriculums.service';

function useLoadCurriculums(userId: string, organizationId: string) {
    return useQuery(
        ["curriculums", userId, organizationId],
        () => CurriculumsService.getCurriculums(userId, organizationId),
        {
            retry: false,
            enabled: !!userId && !!organizationId,
        }
    );
}

export default useLoadCurriculums;
