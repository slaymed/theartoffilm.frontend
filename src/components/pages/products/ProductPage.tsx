import React, { FC, ComponentProps, useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TextHeader from "../../elements/TextHeader";
import Button from "../../elements/Button";
import Span from "../../elements/Span";
import CurrencyConvert from "../../kits/CurrencyConvert";
import LoadingBox from "../../kits/LoadingBox";
import ErrorWithRedirect from "../../kits/ErrorWithRedirect";

import { useDispatch } from "../../../hooks/useDispatch";

import { IProduct } from "../../../store/products/types";
import { user } from "../../../store/auth/selectors";
import { addToCart } from "../../../store/cart/thunks";
import { GlobalOperation, ThunkResponseType } from "../../../store/types";
import { ICart } from "../../../store/cart/types";
import { RequestLifeCycle } from "../../../store/enums";
import { addingToCart } from "../../../store/cart/selectors";
import { getPosterSeller } from "../../../helpers/get-seller";

export interface ProductPageProps extends ComponentProps<"div"> {
    product: IProduct;
    reverse?: boolean;
}

const ProductPage: FC<ProductPageProps> = ({ className = "", product, reverse, ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { sellerId } = useParams();

    const adding = useSelector(addingToCart);
    const userInfo = useSelector(user);

    const [images, setImages] = useState([product.image, ...product.images]);
    const [selectedImage, setSelectedImage] = useState(product.image);

    const add = async () => {
        const res = await dispatch(addToCart(product._id));
        const { status } = res.payload as ThunkResponseType<ICart, GlobalOperation>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        navigate("/cart");
    };

    useEffect(() => {
        setSelectedImage(product.image);
        setImages([product.image, ...product.images]);
    }, [product]);

    const seller = getPosterSeller(product);

    return (
        <div
            {...rest}
            className={classNames("flex flex-col gap-8 bg-light-dark", {
                "lg:flex-row": !reverse,
                "lg:flex-row-reverse": reverse,
                [className]: className,
            })}
        >
            {images.length > 0 && (
                <div className="flex flex-col justify-between flex-1 h-full gap-4">
                    <div className="w-full" style={{ backgroundImage: `url(${selectedImage})` }}>
                        <div className="w-full bg-black/50 backdrop-blur-md">
                            <img
                                src={selectedImage}
                                alt="Posetr Banner"
                                className="w-full max-h-[700px] object-contain"
                            />
                        </div>
                    </div>
                    <div className="h-[120px] w-full flex scroll-bar gap-4 overflow-x-auto">
                        {images.map((image) => (
                            <div
                                key={image}
                                className="flex-shrink-0 h-full cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image} className="h-full bg-cover" alt="Poster Small Banner" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex flex-col text-xl justify-between flex-1 gap-8">
                <div className="flex flex-col flex-1 gap-8">
                    <TextHeader className="text-4xl break-all sm:text-6xl text-accent lg:text-4xl xl:text-6xl line-clamp-1 hover:line-clamp-none">
                        {product.name}
                    </TextHeader>

                    {sellerId !== seller._id && (
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-4">
                                <Span className="tracking-widest text-slate-400">Poster For Sale From</Span>
                                <Link to={`/seller/${seller._id}`}>
                                    <Span className="tracking-widest underline text-accent underline-offset-2">
                                        {seller.sellerName || seller.name}
                                    </Span>
                                </Link>
                            </div>
                            <Link to={`/seller/${seller._id}`}>
                                <Span className="tracking-widest underline text-accent underline-offset-2">
                                    visite showcase
                                </Span>
                            </Link>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        {product.directors.length > 0 && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">Directors</Span>
                                <div className="flex flex-wrap justify-end gap-2 w-fit">
                                    {product.directors.map((d) => (
                                        <Span
                                            key={d._id}
                                            className="py-0.5 px-2 bg-slate-500/20 text-slate-400 rounded"
                                        >
                                            {d.name}
                                        </Span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {product.casts.length > 0 && (
                            <div className="flex justify-between gap-4">
                                <Span className="text-accent">Casts</Span>
                                <div className="flex flex-wrap justify-end gap-2 w-fit">
                                    {product.casts.map((c) => (
                                        <Span
                                            key={c._id}
                                            className="py-0.5 px-2 bg-slate-500/20 text-slate-400 rounded"
                                        >
                                            {c.name}
                                        </Span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {product.artists.length > 0 && (
                            <div className="flex justify-between gap-4">
                                <Span className="text-accent">Artists</Span>
                                <div className="flex flex-wrap justify-end gap-2 w-fit">
                                    {product.artists.map((a) => (
                                        <Span
                                            key={a._id}
                                            className="py-0.5 px-2 bg-slate-500/20 text-slate-400 rounded"
                                        >
                                            {a.name}
                                        </Span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {product.origin && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">Country of Origin</Span>
                                <Span className="py-0.5 px-2 bg-slate-500/20 text-slate-400 rounded">
                                    {product.origin}
                                </Span>
                            </div>
                        )}
                        {product.year && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">Year</Span>
                                <Span className="py-0.5 px-2 bg-slate-500/20 text-slate-400 rounded">
                                    {product.year}
                                </Span>
                            </div>
                        )}
                        {product.format && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">format</Span>
                                <Span className="py-0.5 px-2 bg-slate-500/20 text-slate-400 rounded">
                                    {product.format}
                                </Span>
                            </div>
                        )}
                        {product.condition && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">condition</Span>
                                <Span className="py-0.5 px-2 bg-slate-500/20 text-slate-400 rounded">
                                    {product.condition}
                                </Span>
                            </div>
                        )}
                        {product.rolledFolded && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">Rolled / Folded</Span>
                                <Span className="py-0.5  px-2 bg-slate-500/20 text-slate-400 rounded">
                                    {product.rolledFolded}
                                </Span>
                            </div>
                        )}
                        {product.description && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">description</Span>
                                <Span className="py-0.5  px-2 text-end bg-slate-500/20 text-slate-400 rounded line-clamp-1 hover:line-clamp-none">
                                    {product.description}
                                </Span>
                            </div>
                        )}
                        {product.price && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">price</Span>
                                <Span
                                    className={classNames(
                                        "py-0.5 px-2  text-end bg-accent/20 text-accent rounded line-clamp-1 hover:line-clamp-none",
                                        { "line-through": product.salePrice }
                                    )}
                                >
                                    <CurrencyConvert amount={product.price} />
                                </Span>
                            </div>
                        )}
                        {product.salePrice && (
                            <div className="flex justify-between w-full gap-4">
                                <Span className="text-accent">sale Price</Span>
                                <Span className="py-0.5  px-2 text-end bg-accent/20 text-accent rounded line-clamp-1 hover:line-clamp-none">
                                    <CurrencyConvert amount={product.salePrice} />
                                </Span>
                            </div>
                        )}
                    </div>
                </div>
                {product.forSale && !product.sold && product.visible && userInfo && seller._id !== userInfo._id && (
                    <div className="flex flex-col gap-4">
                        {adding.loading && <LoadingBox />}
                        <ErrorWithRedirect {...adding} />

                        <Button className="px-6 py-3 bg-accent" onClick={add}>
                            <Span className="text-2xl tracking-wider text-black">Add To Cart</Span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
