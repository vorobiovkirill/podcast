import { IconContext } from 'react-icons';
import { AiTwotoneHeart } from 'react-icons/ai';
import { RiCopyrightLine } from 'react-icons/ri';
import { SiTelegram, SiInstagram } from 'react-icons/si';
import { podcastLinks, socialLinks } from '~/config';

export const Footer = () => {
    return (
        <footer className="sp-footer sp-footer-center rounded bg-base-200 p-10 text-base-content">
            <div className="grid grid-flow-col gap-4">
                <a href={podcastLinks.rss} className="sp-link-hover sp-link">
                    RSS
                </a>
            </div>

            <IconContext.Provider value={{ size: '2em' }}>
                <div className="grid grid-flow-col gap-4">
                    <a href={socialLinks.telegram}>
                        <SiTelegram />
                    </a>
                    <a href={socialLinks.instagram}>
                        <SiInstagram />
                    </a>
                </div>
            </IconContext.Provider>

            <div className="grid grid-flow-col">
                <RiCopyrightLine />
                2022 Скажи Паляниця!
                <span className="sep"> | </span> Made with <AiTwotoneHeart className="text-red-600"/> by Kyrylo Vorobiov
            </div>
        </footer>
    );
};
