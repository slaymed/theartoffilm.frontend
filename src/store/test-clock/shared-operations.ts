import { ADVANCE_TEST_CLOCK, FETCH_TEST_CLOCK } from "./constants";
import { advanceTestClock, fetchMyTestClock } from "./thunks";

export const testClockSharedOperation = [
    {
        thunk: fetchMyTestClock,
        updateKey: FETCH_TEST_CLOCK,
    },
    {
        thunk: advanceTestClock,
        updateKey: ADVANCE_TEST_CLOCK,
    },
];
