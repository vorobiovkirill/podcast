import { AiTwotoneCalendar } from 'react-icons/ai'
import { RiTimeLine } from 'react-icons/ri'
import { Link } from 'remix'

import { EpisodeT } from '~/types'
import { getPublishDate } from '~/utils'

export const LatestEpisodeCard: React.VFC<EpisodeT> = ({ episode }) => {
    const publishDate = getPublishDate(episode.created_at || '');
    return (
        <div className="sp-card sp-card-compact w-80 grow md:grow-0">

            <Link to={`/episodes/${episode.id}`}>
                <figure>
                    <img
                        className="object-contain"
                        src="https://podcdn.zencast.fm/download/Podcast%2Fartworks%2F9820%2Fmedium%2Fd11dffa1979b25d0737f1737e60406b19a235e47ea960f4f1152d7c06d4f9d71%2F97353724501ffc60.png"
                        alt="Скажи Паляниця"
                    />
                </figure>
            </Link>

            <div className="sp-card-body">
                <div className="sp-card-actions justify-between">
                    <div className="flex items-center space-x-2 text-xs">
                        <AiTwotoneCalendar />
                        <span>{publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                        <RiTimeLine />
                        <span> {episode.duration}</span>
                    </div>
                </div>
                <Link to={`/episodes/${episode.id}`}>
                    <h3 className="text-sm font-semibold md:text-lg lg:sp-card-title">
                        {episode.title}
                    </h3>
                </Link>
            </div>
        </div>
    )
}