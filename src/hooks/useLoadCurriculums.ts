import { useQuery } from "react-query";
import CurriculumsService from '../services/curriculums.service';


export type Achievement = {
    id: number;
    title: string;
}

function useLoadCurriculums(userId: string) {
    return useQuery<{ data: Achievement[]}>(
        ["curriculums", userId],
        () => CurriculumsService.getCurriculums(userId) as Promise<{ data: Achievement[]}>,
        {
            retry: false,
            refetchOnWindowFocus: false,
            enabled: !!userId,
        }
    );
}

export default useLoadCurriculums;
