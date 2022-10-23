import { RiTimeLine } from 'react-icons/ri';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { Link } from '@remix-run/react';

import { getPublishDate } from '~/utils';
import { EpisodeT } from '~/types';

export const EpisodeListCard: React.VFC<EpisodeT> = ({ episode }) => {
    const publishDate = getPublishDate(episode.created_at || '');

    return (
        <div
            className="sp-card sp-card-side sp-card-compact mb-6 bg-base-300 shadow-xl"
        >
            <figure className="w-52 flex-initial">
                <Link to={`/episodes/${episode.id}`}>
                    <img
                        src="https://podcdn.zencast.fm/download/Podcast%2Fartworks%2F9032%2Fmedium%2Fe3cdf831327649dbd439c6121f8b92af4251af5a7cd507f1ea8554b112a38b96%2F1p4ODMV4JouZENpbuZoyiisY9QT4h8WlcEnMeXdj.jpg"
                        alt="Скажи Паляниця"
                    />
                </Link>
            </figure>

            <div className="sp-card-body flex flex-1 flex-col justify-between">
                <div className="flex flex-col">
                    <div className="flex items-start">
                        <div className="flex-1">
                            <Link to={`/episodes/${episode.id}`}>
                                <h2 className="sp-card-title">
                                    {episode.title}
                                </h2>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-2 text-xs">
                            <AiTwotoneCalendar />
                            <span>{publishDate}</span>
                        </div>
                    </div>
                    <p>{episode.description}</p>
                </div>
                <div className="flex justify-between">
                    <div className="sp-card-actions justify-between">
                        <p>{`Паляниця #${episode.episode_number}`}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                        <RiTimeLine />
                        <span> {episode.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
