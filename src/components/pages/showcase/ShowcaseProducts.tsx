import React, { FC, ComponentProps, useState, useMemo } from "react";
import classNames from "classnames";

import { IShowcase } from "../../../store/showcase/types";
import { selectShowcaseProduct } from "../../../store/showcase/actions";

import ShowcaseCarousel from "./ShowcaseCarousel";
import AlphbetNumericFilter from "../../kits/AlphbetNumericFilter";

import { useDispatch } from "../../../hooks/useDispatch";

export interface ShowcaseProductsProps extends ComponentProps<"div"> {
    showcase: IShowcase;
}

const ShowcaseProducts: FC<ShowcaseProductsProps> = ({ className = "", showcase, ...rest }) => {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState("All");

    const products = useMemo(() => {
        if (!filter || filter === "All") return showcase.products;
        if (filter === "0..9") return showcase.products.filter(({ name }) => /\d/.test(name));
        return showcase.products.filter(({ name }) => name.toLowerCase().startsWith(filter.toLowerCase()));
    }, [filter, showcase.products]);

    const updateFilter = (filter: string) => {
        setFilter(filter);
        dispatch(selectShowcaseProduct(null));
    };

    return (
        <div
            {...rest}
            className={classNames("bg-base p-8 sm:p-16 flex flex-col gap-8 items-center", { [className]: className })}
        >
            <AlphbetNumericFilter filter={filter} updateFilter={updateFilter} />

            {products.length > 0 && (
                <div className="w-full">
                    <ShowcaseCarousel products={products} />
                </div>
            )}
        </div>
    );
};

export default ShowcaseProducts;
