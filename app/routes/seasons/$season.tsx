import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getEpisodesBySeason } from '~/models/podcast.server';
import { sp_episode } from '@prisma/client';
import { EpisodeList } from '~/components/EpisodeList';

export const loader: LoaderFunction = async ({ params }) => {
    const data = await getEpisodesBySeason(params.season || '');
    return data;
};

export default function Index() {
    const episodes: sp_episode[] = useLoaderData();

    console.log('------>', episodes)
    return (
        <section className="featured-episodes pt-10 pb-10">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <EpisodeList episodes={episodes} />
                </div>
            </div>
        </section>
    )
}