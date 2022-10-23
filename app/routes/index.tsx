import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import remixI18n from '~/server/i18n.server';

import { getSeasonEpisodeList, getLatestEpisodeList } from '~/api';

import { Hero } from '~/components/layout/Hero';
import { Patreon } from '~/components/layout/Patreon';
import { LatestEpisodes } from '~/components/LatestEpisodes';
import { FeaturedShows } from '~/components/FeaturedShows';

export const loader: LoaderFunction = async ({ request }) => {
    const episodes = await getLatestEpisodeList();
    const seasons = await getSeasonEpisodeList();

    const locale = await remixI18n.getLocale(request);
    const t = await remixI18n.getFixedT(request, 'index');
    const title = t('hero-title');
    const description = t('hero-description');
    return json({ episodes, locale, title, description, seasons });
};

export default function Index() {
    const { description, episodes, seasons, title } = useLoaderData();
    console.log('seasons', seasons);

    return (
        <>
            <Hero description={description} title={title} />
            <LatestEpisodes episodes={episodes} />
            <FeaturedShows seasons={seasons} />
            <Patreon />
        </>
    );
}
