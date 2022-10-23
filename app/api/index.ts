import type { sp_episode, sp_season } from '@prisma/client';
import { supabase } from '~/libs/supabase-client';

const getSeasonEpisodeList = async (): Promise<sp_season[] | null> => {
    try {
        const { data: seasons, error } = await supabase
            .from<sp_season>('sp-season')
            .select(
                `
                created_at,
                id,
                season_number,
                season_title,
                total_episodes,
                episodes:sp-episode (created_at, episode_number, id, title)
            `
            )
            .order('created_at', { foreignTable: 'sp-episode' })
            .limit(3, { foreignTable: 'sp-episode' });

        if (error) {
            throw error;
        }

        return seasons;
    } catch (error) {
        throw error;
    }
};

const getEpisodeList = async (): Promise<sp_episode[] | null> => {
    try {
        let { data: episodes, error } = await supabase
            .from<sp_episode>('sp-episode')
            .select()
            .order('season_number')
            .order('episode_number');

        if (error) {
            throw error;
        }

        return episodes;
    } catch (error) {
        throw error;
    }
};

const getLatestEpisodeList = async (): Promise<sp_episode[] | null> => {
    try {
        let { data: episodes, error } = await supabase
            .from<sp_episode>('sp-episode')
            .select()
            .order('created_at', {ascending: false})
            .limit(4);

        if (error) {
            throw error;
        }

        return episodes;
    } catch (error) {
        throw error;
    }
};

const getEpisode = async (id: string): Promise<sp_episode[] | null> => {
    try {
        let { data: episode, error } = await supabase
            .from<sp_episode>('sp-episode')
            .select()
            .eq('id', id);

        if (error) {
            throw error;
        }

        return episode;
    } catch (error) {
        throw error;
    }
};

const getEpisodesBySeason = async (id: string): Promise<sp_episode[] | null> => {
    try {
        let { data: episode, error } = await supabase
            .from<sp_episode>('sp-episode')
            .select()
            .eq('season_id', id);

        if (error) {
            throw error;
        }

        return episode;
    } catch (error) {
        throw error;
    }
};

export {
    getSeasonEpisodeList,
    getEpisodeList,
    getLatestEpisodeList,
    getEpisode,
    getEpisodesBySeason
};
