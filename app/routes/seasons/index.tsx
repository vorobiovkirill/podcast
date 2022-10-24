import type { sp_season } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';

import { getEpisodeList } from '~/models/podcast.server';

import { SeasonList } from '~/components/SeasonList';

export const meta: MetaFunction = () => {
    return { title: 'Seasons | Скажи Паляниця' };
};

export const loader: LoaderFunction = async () => {
    const data = await getEpisodeList();
    return data;
};

export default function Index() {
    const episodes = useLoaderData<sp_season[]>();

    return (
        <section className="seasons pt-10 pb-10">
            <div className="container mx-auto">
                <div className="flex flex-row gap-4">
                    <SeasonList />
                </div>
            </div>
        </section>
    );
}
