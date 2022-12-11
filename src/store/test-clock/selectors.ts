import { createSelector } from "@reduxjs/toolkit";
import { GlobalOperation, RootState } from "../types";
import { TestClock } from "./types";

export const myTestClock = createSelector(
    (state: RootState) => state.testClocks.test_clock,
    (test_clock: TestClock | null) => test_clock
);

export const fetchingMyTestClock = createSelector(
    (state: RootState) => state.testClocks.fetching,
    (fetching: GlobalOperation) => fetching
);

export const advancingTestClock = createSelector(
    (state: RootState) => state.testClocks.advancing,
    (advancing: GlobalOperation) => advancing
);
