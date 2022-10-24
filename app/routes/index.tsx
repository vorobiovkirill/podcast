import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import { useTranslation } from "react-i18next";

import { getSeasonEpisodeList, getLatestEpisodeList } from '~/models/podcast.server';

import { Hero } from '~/components/layout/Hero';
import { Patreon } from '~/components/layout/Patreon';
import { LatestEpisodes } from '~/components/LatestEpisodes';
import { FeaturedShows } from '~/components/FeaturedShows';

export const loader: LoaderFunction = async () => {
    const episodes = await getLatestEpisodeList();
    const seasons = await getSeasonEpisodeList();

    return json({ episodes, seasons });
};

export const handle = {
    // In the handle export, we could add a i18n key with namespaces our route
    // will need to load. This key can be a single string or an array of strings.
    i18n: ['common']
  };

export default function Index() {
    const { episodes, seasons } = useLoaderData();
    const { t, ready } = useTranslation('common')
    const title = t('title');
    const description = t('description');

    if (!ready) return <div>Loading...</div>

    return (
        <>
            <Hero description={description} title={title} />
            <LatestEpisodes episodes={episodes} />
            <FeaturedShows seasons={seasons} />
            <Patreon />
        </>
    );
}
