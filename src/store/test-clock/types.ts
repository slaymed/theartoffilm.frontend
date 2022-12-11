import { GlobalOperation } from "../types";
import { TestClockStatus } from "./enums";

export type TestClock = {
    id: string;
    object: string;
    created: number;
    deletes_after: number | null;
    frozen_time: number;
    livemode: boolean;
    name: string;
    status: TestClockStatus;
};

export interface ITestClocksState {
    test_clock: TestClock | null;
    fetching: GlobalOperation;
    advancing: GlobalOperation;
}
