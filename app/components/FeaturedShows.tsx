import { RiArrowRightSLine } from 'react-icons/ri'
import { Link } from '@remix-run/react';

import { SeasonListCard } from '~/components/SeasonListCard'
import { SeasonListT } from '~/types'

export const FeaturedShows: React.VFC<SeasonListT> = ({ seasons }) => {
    return (
        <section className="featured-episodes py-10">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-11">
                    <h2 className="text-2xl">Featured Shows</h2>
                    <Link
                        to="/seasons"
                        className="sp-link-hover sp-link flex items-center"
                    >
                        Browse All Featured Shows <RiArrowRightSLine />
                    </Link>
                </div>
                <div className="flex flex-col">
                    {seasons.map((season) => <SeasonListCard season={season} key={season.id} />)}
                </div>
            </div>
        </section>
    )
}