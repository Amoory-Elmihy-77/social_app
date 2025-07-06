import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const useAppselector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
