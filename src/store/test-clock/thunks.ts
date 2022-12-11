import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    ADVANCE_TEST_CLOCK_PREFIX,
    ADVANCE_TEST_CLOCK_URL,
    FETCH_TEST_CLOCK_PREFIX,
    FETCH_TEST_CLOCK_URL,
} from "./constants";
import { TestClock } from "./types";

export const fetchMyTestClock = createAsyncThunk(FETCH_TEST_CLOCK_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_TEST_CLOCK_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as TestClock };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const advanceTestClock = createAsyncThunk(
    ADVANCE_TEST_CLOCK_PREFIX,
    async (advanceBy: number, { rejectWithValue }) => {
        try {
            const res = await axios.post(ADVANCE_TEST_CLOCK_URL, { advanceBy });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as TestClock };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
