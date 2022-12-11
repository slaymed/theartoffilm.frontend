import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { AdvertisementType } from "../store/advertisements/enums";
import { fetchingAdvertisements, selectAdvertiseById, syncingAdvertisement } from "../store/advertisements/selectors";

import Page from "../components/pages/Page";
import TextHeader from "../components/elements/TextHeader";
import LoadingBox from "../components/kits/LoadingBox";
import MessageBox from "../components/kits/MessageBox";
import Paragraph from "../components/elements/Paragraph";
import AdvertorialPage from "../components/pages/advertise/AdvertorialPage";
import SponsoredLinkPage from "../components/pages/advertise/SponsoredLinkPage";
import AdvertisementBannerPage from "../components/pages/advertise/AdvertisementBannerPage";

export interface AdvertisementScreenProps extends ComponentProps<"div"> {}

const AdvertisementScreen: FC<AdvertisementScreenProps> = ({ className = "", ...rest }) => {
    const { advertisementId } = useParams();

    const advertisement = useSelector(selectAdvertiseById(advertisementId));
    const fetching = useSelector(fetchingAdvertisements);
    const syncing = useSelector(syncingAdvertisement);

    if (fetching.loading || syncing.loading)
        return (
            <Page>
                <LoadingBox />
            </Page>
        );

    if (fetching.errors.message)
        return (
            <Page>
                <MessageBox>{fetching.errors.message}</MessageBox>
            </Page>
        );

    if (!advertisement)
        return (
            <Page>
                <MessageBox>Advertisement Not Found</MessageBox>
            </Page>
        );

    return (
        <Page {...rest} className={classNames("", { [className]: className })}>
            <div className="container mx-auto flex flex-col gap-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        <TextHeader className="text-3xl line-clamp-1 hover:line-clamp-none text-accent">
                            {advertisement.title}
                        </TextHeader>
                        <Paragraph
                            className={classNames("rounded font-bold tracking-widest text-sm py-0.5 px-2", {
                                "bg-slate-400/20 text-slate-400": advertisement.type !== AdvertisementType.ADVERTORIAL,
                                "bg-accent/20 text-accent": advertisement.type === AdvertisementType.ADVERTORIAL,
                            })}
                        >
                            {advertisement.type === AdvertisementType.ADVERTORIAL && (
                                <Link to={`/advertorial/${advertisement._id}`}>
                                    <Paragraph className="text-sm line-clamp-1 underline-offset-2 underline">
                                        See Public Advertorial Page
                                    </Paragraph>
                                </Link>
                            )}
                            {advertisement.type === AdvertisementType.SPONSOR && "Sponsored Link"}
                            {advertisement.type === AdvertisementType.BANNER && "Home Page Banner"}
                        </Paragraph>
                    </div>
                    <Link to={`/edit-advertisement/${advertisement._id}`}>
                        <Paragraph className="text-accent text-sm underline underline-offset-2">Edit</Paragraph>
                    </Link>
                </div>

                {advertisement.type === AdvertisementType.ADVERTORIAL && (
                    <AdvertorialPage advertisement={advertisement} showTitle={false} />
                )}
                {advertisement.type === AdvertisementType.SPONSOR && (
                    <SponsoredLinkPage advertisement={advertisement} showTitle={false} />
                )}
                {advertisement.type === AdvertisementType.BANNER && (
                    <AdvertisementBannerPage advertisement={advertisement} showTitle={false} />
                )}
            </div>
        </Page>
    );
};

export default AdvertisementScreen;
