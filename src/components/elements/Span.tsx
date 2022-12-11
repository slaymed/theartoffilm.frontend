import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

export interface SpanProps extends ComponentProps<"span"> {}

const Span: FC<SpanProps> = ({ className = "", ...rest }) => {
    return <span {...rest} className={classNames("tracking-wide", { [className]: className })} />;
};

export default Span;
