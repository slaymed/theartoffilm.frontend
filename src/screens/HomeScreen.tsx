import React, { FC, ComponentProps, useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";

import { useDispatch } from "../hooks/useDispatch";

import { fetchingHomeProducts, homeProductsSelector } from "../store/products/selectors";
import { fetchHomeProducts } from "../store/products/thunks";
import { fetchTopSellersShowcaseList } from "../store/showcase/thunks";
import { topSellersShowcaseList } from "../store/showcase/selectors";

import HowItWorksSection from "../components/sections/HowItWorksSection";
import ShowcaseSection from "../components/sections/ShowcaseSection";
import WelcomeSection from "../components/sections/WelcomeSection";
import Product from "../components/Product";
import SectionCard from "../components/cards/SectionCard";
import MessageBox from "../components/kits/MessageBox";
import LoadingBox from "../components/kits/LoadingBox";
import SearchBox from "../components/SearchBox";
import H1 from "../components/elements/H1";
import TextHeader from "../components/elements/TextHeader";
import SellerShowcaseCard from "../components/cards/SellerShowcaseCard";
import HomePageAdvertisementBanner from "../components/sections/ads/HomePageAdvertisementBanner";
import CombinedAdsSection from "../components/sections/ads/CombinedAdsSection";

const CarouselComponent = Carousel as any;

export interface HomeScreenProps extends ComponentProps<"div"> {}

const HomeScreen: FC<HomeScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const products = useSelector(homeProductsSelector).slice(0, 6);
    const showcases = useSelector(topSellersShowcaseList);
    const { loading, errors } = useSelector(fetchingHomeProducts);

    useEffect(() => {
        dispatch(fetchHomeProducts());
        dispatch(fetchTopSellersShowcaseList());
    }, [dispatch]);

    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <div className="relative h-[556px]" style={{ backgroundImage: "url(/images/home.jpg)" }}>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="flex flex-col space-y-10">
                        <H1 className="text-6xl text-center sm:text-7xl md:text-8xl lg:text-9xl">
                            <span className="text-accent">The Art Of</span> Film
                        </H1>
                        <TextHeader className="text-xl text-center sm:text-2xl md:text-3xl">
                            A MOVIE POSTER COLLECTOR’S INDISPENSABLE TOOLKIT
                        </TextHeader>
                        <SearchBox />
                    </div>
                </div>
            </div>

            <WelcomeSection />
            <HomePageAdvertisementBanner />
            <HowItWorksSection />
            <ShowcaseSection />

            <div className="flex flex-col items-center py-8 bg-light-dark">
                <div className="flex justify-center p-8">
                    <TextHeader className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                        <span className="text-accent">Shop for</span> Posters
                    </TextHeader>
                </div>
                <Link
                    to="/shop"
                    className="px-8 py-2 text-sm tracking-wider text-black md:text-md sm:px-12 sm:py-4 bg-accent"
                >
                    VISIT SHOP
                </Link>
                <br />
                {loading ? (
                    <LoadingBox />
                ) : errors.message ? (
                    <MessageBox variant="danger">{errors.message}</MessageBox>
                ) : (
                    <>
                        {Array.isArray(products) && products.length === 0 && <MessageBox>No Posters Found</MessageBox>}
                        <div className="flex w-full px-2 py-8 sm:px-8">
                            <CarouselComponent
                                breakPoints={[
                                    { width: 2, itemsToShow: 1 },
                                    { width: 960, itemsToShow: 2, itemsToScroll: 2 },
                                    { width: 1440, itemsToShow: 3, itemsToScroll: 3 },
                                ]}
                            >
                                {products.map(
                                    (product) =>
                                        product.image.length > 0 &&
                                        product.visible && <Product toShop={true} key={product._id} product={product} />
                                )}
                            </CarouselComponent>
                        </div>
                    </>
                )}
            </div>

            <div className="bg-base">
                <SectionCard
                    before="SUBSCRIBE"
                    title="TO YOU TUBE"
                    text="Sign up to The Art of Film YouTube channel today as we regularly upload movie poster related videos content that we know you will love. "
                    linkText="SUBSCRIBE Today"
                    link="https://www.youtube.com/watch?v=ofkryTjra7Q"
                    type="video"
                />
            </div>

            <div className="flex flex-col items-center gap-16 px-2 py-8 bg-light-dark sm:px-8">
                <TextHeader className="text-4xl sm:text-5xl md:text-6xl">
                    <span className="text-accent">Browse</span> Showcases
                </TextHeader>

                <div className="w-full">
                    <CarouselComponent
                        breakPoints={[
                            { width: 2, itemsToShow: 1 },
                            { width: 640, itemsToShow: 2, itemsToScroll: 2 },
                            { width: 960, itemsToShow: 3 },
                            { width: 1280, itemsToShow: 4 },
                        ]}
                    >
                        {Array.isArray(showcases) &&
                            showcases?.map(({ seller }) => {
                                if (!seller) return null;
                                return <SellerShowcaseCard key={seller._id} seller={seller} />;
                            })}
                    </CarouselComponent>
                </div>
            </div>

            <CombinedAdsSection flex="row" />
        </div>
    );
};

export default HomeScreen;
