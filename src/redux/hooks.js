import { useDispatch, useSelector } from "react-redux"
// import { AppDispatch, RootState } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes()
export const useAppSelector = useSelector.withTypes()