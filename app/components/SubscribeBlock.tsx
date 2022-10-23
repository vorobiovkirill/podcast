import { FaApple, FaGoogle, FaSpotify } from 'react-icons/fa';
import { podcastLinks } from '~/config';

export const SubscribeBlock = () => {
    return (
        <div className="flex items-center space-x-4 justify-center">
            <span>Subscribe On:</span>
            <a
                href={podcastLinks.apple}
                className="sp-link-hover sp-link flex items-center space-x-2"
            >
                <FaApple /> <span>Apple Music</span>
            </a>
            <a
                href={podcastLinks.google}
                className="sp-link-hover sp-link flex items-center space-x-2"
            >
                <FaGoogle /> <span>Google Podcast</span>
            </a>
            <a
                href={podcastLinks.spotify}
                className="sp-link-hover sp-link flex items-center space-x-2"
            >
                <FaSpotify /> <span>Spotify</span>
            </a>
        </div>
    );
};
