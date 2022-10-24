import type { sp_episode } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getEpisode } from '~/models/podcast.server';
import { EpisodePlayer } from '~/components/EpisodePlayer';

export const loader: LoaderFunction = async ({ params }) => {
    const data = await getEpisode(params.episode || '');
    return data;
};

export default function Index() {
    const [episode]: [sp_episode] = useLoaderData();

    return (
        <article>
            <div className="container mx-auto py-8">
                <h2 className="text-4xl mb-10">
                    {episode.title}
                </h2>
                <div className="sp-player-wrapper w-1/2 m-auto">
                    <EpisodePlayer episode={episode} />
                </div>
                <div className="sp-shownotes-wrapper">
                    <p>{episode.shownotes}</p>
                </div>
            </div>

        </article>
    );
}