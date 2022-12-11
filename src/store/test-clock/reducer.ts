import { createSlice } from "@reduxjs/toolkit";
import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { TestClockInitialState } from "./initial-state";
import { testClockSharedOperation } from "./shared-operations";
import { TestClock } from "./types";

const slice = createSlice({
    name: "test_clocks",
    initialState: TestClockInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        for (const { thunk, updateKey } of testClockSharedOperation) {
            addCase(thunk.pending, (testClocks) => {
                testClocks[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (testClocks, { payload }) => {
                const { data: test_clock } = payload;

                testClocks.test_clock = test_clock;
                testClocks[updateKey].errors = globalMessage;
                testClocks[updateKey].loading = false;
            });
            addCase(thunk.rejected, (testClocks, { payload }) => {
                const { errors } = payload as ThunkResponseType<TestClock, GlobalMessage>;
                if (errors) testClocks[updateKey].errors = errors;
                testClocks[updateKey].loading = false;
            });
        }
    },
});

const testClocksReducer = slice.reducer;

export default testClocksReducer;
