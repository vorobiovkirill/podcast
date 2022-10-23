import { sp_episode, sp_season } from '@prisma/client';

export type EpisodeT = {
    episode: sp_episode;
};

export type EpisodeListT = {
    episodes: sp_episode[];
};

export type SeasonT = {
    season: sp_season;
};

export type SeasonListT = {
    seasons: sp_season[];
};
