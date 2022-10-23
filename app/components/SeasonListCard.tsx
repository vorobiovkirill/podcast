import { sp_episode } from '@prisma/client'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { IoHeadset } from 'react-icons/io5'
import { MdNotes } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { SeasonT } from '~/types'
import { getPublishDate } from '~/utils'

export const SeasonListCard: React.VFC<SeasonT> = ({ season }) => {
    const publishDate = getPublishDate(season.created_at || '');

    return (
        <div className="flex flex-col lg:flex-row gap-4 pb-5">
            <div className="lg:w-3/5">
                <div className="sp-card sp-card-side sp-card-compact bg-base-100 shadow-xl h-full">
                    <figure className="h-full">
                        <Link to={`/seasons/${season.id}`}>
                            <img src="https://podcdn.zencast.fm/download/Podcast%2Fartworks%2F9820%2Fmedium%2Fd11dffa1979b25d0737f1737e60406b19a235e47ea960f4f1152d7c06d4f9d71%2F97353724501ffc60.png" alt="" />
                        </Link>
                    </figure>
                    <div className="sp-card-body flex-1">
                        <Link to={`/seasons/${season.id}`}>
                            <h2 className="sp-card-title">{season.season_title}</h2>
                        </Link>
                        <div className="sp-card-actions justify-between">
                            <div className="flex items-center space-x-2 text-xs">
                                <AiTwotoneCalendar />
                                <span>{publishDate}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs">
                                <MdNotes />
                                <span>{`Total episodes: ${season.total_episodes}`}</span>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt in felis malesuada mollis purus id sit in aliquet lectus eget morbi dui felis malesuada mollis purus lorem ipsum dolor sit amet eget.</p>
                        <div className="sp-card-actions justify-between">
                            <Link to={`/seasons/${season.id}`}>
                                <div className="flex items-center space-x-2 text-xs">
                                    <IoHeadset />
                                    <span>Listen now</span>
                                </div>
                            </Link>
                            <Link to="/seasons">
                                <div className="flex items-center space-x-2 text-xs">
                                    <MdNotes />
                                    <span>Browse all</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:w-2/5 justify-between gap-y-4 lg:gap-y-0">
                {season.episodes.map((episode: sp_episode) => (
                    <Link to={`/episodes/${episode.id}`} key={episode.id}>
                        <div className="sp-card sp-card-compact w-auto bg-base-100 shadow-xl hover:shadow-2xl">
                            <div className="sp-card-body">
                                <span>{`Episode: ${episode.episode_number}`}</span>
                                <h2 className="sp-card-title text-xs">{episode.title}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}