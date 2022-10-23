import { AiTwotoneCalendar } from 'react-icons/ai';
import { RiFolderMusicLine, RiTimeLine } from 'react-icons/ri';

import { PodcastPlayer } from '~/components/PodcastPlayer';
import { EpisodeT } from '~/types';
import { Sharing } from './Sharing';

export const EpisodePlayer: React.VFC<EpisodeT>  = ({ episode }) => {
    return (
        <div className="sp-card sp-card-compact bg-base-100 shadow-2xl ">
            <div className="sp-card-body">
                <div className="sp-card-actions justify-between">
                    <div className="flex items-center space-x-2 text-xs">
                        <AiTwotoneCalendar />
                        <span>{episode.created_at}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                        <RiTimeLine />
                        <span> {episode.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                        <RiFolderMusicLine />
                        <span>{episode.size} mb</span>
                    </div>
                </div>
                <div className="sp-player">
                    <PodcastPlayer audio={episode.audio || ''} />
                </div>
                <div>
                    <Sharing />
                </div>
            </div>
        </div>
    )
}