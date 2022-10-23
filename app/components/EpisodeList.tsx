import { sp_episode } from '@prisma/client';
import { IconContext } from "react-icons";

import { EpisodeListCard } from '~/components/EpisodeListCard';
import { EpisodeListT } from '~/types';

export const EpisodeList: React.VFC<EpisodeListT> = ({ episodes }) => {
    return (
        <IconContext.Provider value={{ size: '1em' }}>
            {episodes.map((episode: sp_episode) => <EpisodeListCard episode={episode} key={episode.id} />)}
        </IconContext.Provider>
    )
};
