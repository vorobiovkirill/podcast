import { RiArrowRightSLine } from 'react-icons/ri'
import { Link } from 'remix'

import { LatestEpisodeCard } from '~/components/LatestEpisodeCard'
import { EpisodeListT } from '~/types'

export const LatestEpisodes: React.VFC<EpisodeListT>  = ({ episodes }) => {
    return (
        <section className="featured-episodes py-10">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-11">
                    <h2 className="text-2xl">Latest Episodes</h2>
                    <Link
                        to="/episodes"
                        className="sp-link-hover sp-link flex items-center"
                    >
                        Browse all episodes <RiArrowRightSLine />
                    </Link>
                </div>
                <div className="flex flex-wrap">
                    {episodes.map((episode) => <LatestEpisodeCard episode={episode} key={episode.id} />)}
                </div>
            </div>
        </section>
    )
}