import { IoHeadset } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { SubscribeBlock } from '~/components/SubscribeBlock';

type HeroT = {
    description: string;
    title: string;
};

export const Hero = ({ description, title }: HeroT) => {
    return (
        <div className="sp-hero min-h-screen bg-base-200">
            <div className="sp-hero-content flex-col lg:flex-row-reverse">
                <div>
                    <h1 className="text-5xl font-bold sm:text-center md:text-left">{title}</h1>
                    <p className="py-6 sm:text-center md:text-left">{description}</p>
                    <div className="flex items-center space-x-4 flex-col md:flex-row">
                        <Link to="/seasons">
                            <button className="sp-btn sp-btn-secondary sm:mb-4 md:mb-0">
                                <IoHeadset className="mr-2" />
                                Listen Now
                            </button>
                        </Link>
                        <SubscribeBlock />
                    </div>
                </div>
            </div>
        </div>
    );
};
