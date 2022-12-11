import React, { FC, ComponentProps, useEffect, memo, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Paragraph from "../../elements/Paragraph";

import { advancingTestClock, fetchingMyTestClock, myTestClock } from "../../../store/test-clock/selectors";
import { advanceTestClock, fetchMyTestClock } from "../../../store/test-clock/thunks";
import { GlobalMessage, ThunkResponseType } from "../../../store/types";
import { TestClock } from "../../../store/test-clock/types";
import { RequestLifeCycle } from "../../../store/enums";

import { useDispatch } from "../../../hooks/useDispatch";

import LoadingBox from "../../kits/LoadingBox";
import Button from "../../elements/Button";

export interface StripeTestClockPageProps extends ComponentProps<"div"> {}

const StripeTestClockPage: FC<StripeTestClockPageProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const fetching = useSelector(fetchingMyTestClock);
    const testClock = useSelector(myTestClock);
    const advancing = useSelector(advancingTestClock);

    const [advanceBy, setAdvanceBy] = useState(0);

    const advance = async () => {
        const res = await dispatch(advanceTestClock(advanceBy));
        const { status } = res.payload as ThunkResponseType<TestClock, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        window.location.reload();
    };

    useEffect(() => {
        dispatch(fetchMyTestClock());
    }, [dispatch]);

    if (advancing.loading || fetching.loading) return <LoadingBox className="!text-sm" />;

    if (!testClock) return null;

    return (
        <div {...rest} className={classNames("flex flex-col gap-4", { [className]: className })}>
            <Paragraph className="text-slate-400 text-lg sm:text-xl font-bold tracking-widest uppercase">
                Test Clock
            </Paragraph>

            <div className="flex gap-2 items-center flex-wrap">
                <Paragraph className="text-slate-500 text-sm tracking-wider">Current Frozen Time</Paragraph>
                <Paragraph className="text-accent text-sm tracking-wider">
                    {dayjs(testClock.frozen_time * 1000).format("MMM D, YYYY HH:mm")}
                </Paragraph>
            </div>

            {advanceBy > 0 && (
                <div className="flex gap-2 items-center flex-wrap">
                    <Paragraph className="text-slate-500 text-sm tracking-wider">
                        Next Time After Advance will be{" "}
                    </Paragraph>
                    <Paragraph className="text-accent text-sm tracking-wider">
                        {dayjs(testClock.frozen_time * 1000 + advanceBy * 1000).format("MMM D, YYYY HH:mm")}
                    </Paragraph>
                </div>
            )}

            <div className="flex flex-wrap gap-2 items-center">
                <Button type="button" className="w-fit" onClick={() => setAdvanceBy(60 * 60)}>
                    <Paragraph className="underline underline-offset-2 text-accent text-xs">1 Hour</Paragraph>
                </Button>
                <Button type="button" className="w-fit" onClick={() => setAdvanceBy(60 * 60 * 24)}>
                    <Paragraph className="underline underline-offset-2 text-accent text-xs">1 Day</Paragraph>
                </Button>
                <Button type="button" className="w-fit" onClick={() => setAdvanceBy(60 * 60 * 24 * 7)}>
                    <Paragraph className="underline underline-offset-2 text-accent text-xs">1 Week</Paragraph>
                </Button>
                <Button type="button" className="w-fit" onClick={() => setAdvanceBy(60 * 60 * 24 * 30)}>
                    <Paragraph className="underline underline-offset-2 text-accent text-xs">1 Month</Paragraph>
                </Button>
                <Button type="button" className="w-fit" onClick={() => setAdvanceBy(60 * 60 * 24 * 59)}>
                    <Paragraph className="underline underline-offset-2 text-accent text-xs">59 Days</Paragraph>
                </Button>
            </div>

            {advanceBy > 0 && (
                <Button type="button" className="w-fit" onClick={advance}>
                    <Paragraph className="underline underline-offset-2 text-accent text-sm">Advance</Paragraph>
                </Button>
            )}

            <Paragraph className="text-accent/60 text-xs tracking-wider">
                Test Clock time is a frozen time that's need to be advanced manually.
            </Paragraph>
        </div>
    );
};

export default memo(StripeTestClockPage);
