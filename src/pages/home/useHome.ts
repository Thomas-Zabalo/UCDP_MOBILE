import { useNavigate } from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import type {Mission} from "../../types/mission.ts";
import {missionService} from "../mission/service/missionService.ts";

export const useHome = () => {
    const navigate = useNavigate();

    const { data: missions, loading } = useFetch<Mission[]>(
        () => missionService.getAll(),
        []
    );

    const goToMissions = () => navigate("/missions");

    const goToMissionDetail = (id: number) => navigate(`/mission/${id}`);

    return {
        missions,
        loading,
        goToMissions,
        goToMissionDetail
    };
};