import type { sp_episode } from '@prisma/client';
import { useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import { getEpisodeList } from '~/api';
import { EpisodeList } from '~/components/EpisodeList';


export const meta: MetaFunction = () => {
    return { title: 'Season | Скажи Паляниця' };
};

export const loader: LoaderFunction = async () => {
    const data = await getEpisodeList();
    return data;
};

export default function Index() {
    const episodes = useLoaderData<sp_episode[]>();

    return (
        <section className="season-episodes pt-10 pb-10">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <EpisodeList episodes={episodes} />
                </div>
            </div>
        </section>
    );
}
