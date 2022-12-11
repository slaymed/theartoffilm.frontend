import React, { FC, ComponentProps, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import TextHeader from "../components/elements/TextHeader";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import ProductPage from "../components/pages/products/ProductPage";
import Span from "../components/elements/Span";

import { fetchingSelectedProduct, selectedProductSelector } from "../store/products/selectors";
import { fetchSelectedProduct } from "../store/products/thunks";
import { user } from "../store/auth/selectors";

import { useDispatch } from "../hooks/useDispatch";

import { getPosterSellerId } from "../helpers/get-seller";

export interface PosterScreenProps extends ComponentProps<"div"> {}

const PosterScreen: FC<PosterScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const { posterId } = useParams();

    const userInfo = useSelector(user);
    const poster = useSelector(selectedProductSelector);
    const fetching = useSelector(fetchingSelectedProduct);

    useEffect(() => {
        if (posterId) dispatch(fetchSelectedProduct(posterId));
    }, [dispatch, posterId]);

    const sellerId = getPosterSellerId(poster);

    return (
        <div
            {...rest}
            className={classNames("p-8 sm:p-16 flex flex-col space-y-8 bg-light-dark", { [className]: className })}
        >
            <div className="flex items-center justify-between space-x-4">
                <TextHeader className="text-3xl sm:text-5xl text-accent">Poster Screen</TextHeader>
                {poster && !poster.sold && userInfo && sellerId === userInfo._id && (
                    <Link to={`/posters/${poster._id}/edit`}>
                        <Span className="text-accent text-lg underline underline-offset-2">Edit</Span>
                    </Link>
                )}
            </div>

            {fetching.loading && <LoadingBox />}
            <ErrorWithRedirect {...fetching} />

            {poster && !fetching.loading && <ProductPage product={poster} />}
        </div>
    );
};

export default PosterScreen;
