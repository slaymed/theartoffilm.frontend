import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import AppInput from "./AppInput";
import Paragraph from "./Paragraph";
import CurrencyConvert from "../kits/CurrencyConvert";

import { currencySelector } from "../../store/currency/selectors";
import { GBP } from "../../store/currency/constants";

export interface CurrencyInputProps extends ComponentProps<"input"> {
    row?: boolean;
}

const CurrencyInput: FC<CurrencyInputProps> = ({ className = "", value, row, ...rest }) => {
    const currency = useSelector(currencySelector);

    return (
        <div className={classNames("flex gap-2 w-full", { "flex-col": !row, "items-center": row })}>
            <AppInput
                {...rest}
                value={value}
                type="number"
                className={classNames("w-full", { [className]: className })}
            />
            {currency !== GBP && value && parseFloat(value.toString()) > 0 && (
                <Paragraph className="text-sm text-accent">
                    {!row && "Converted to your currency:"} <CurrencyConvert amount={parseFloat(value.toString())} />
                </Paragraph>
            )}
        </div>
    );
};

export default CurrencyInput;
