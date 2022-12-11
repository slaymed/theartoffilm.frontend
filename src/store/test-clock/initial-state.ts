import { OperationInitialState } from "../initial-state";
import { ADVANCE_TEST_CLOCK, FETCH_TEST_CLOCK } from "./constants";
import { ITestClocksState } from "./types";

export const TestClockInitialState: ITestClocksState = {
    [FETCH_TEST_CLOCK]: OperationInitialState,
    [ADVANCE_TEST_CLOCK]: OperationInitialState,
    test_clock: null,
};
