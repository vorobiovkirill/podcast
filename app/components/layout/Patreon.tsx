import { RiPatreonLine } from 'react-icons/ri';
import { SubscribeBlock } from '~/components/SubscribeBlock';
import { socialLinks } from '~/config';

export const Patreon = () => {
    return (
        <section className="py-24 bg-cover bg-no-repeat bg-center bg-base-300">
            <div className="container mx-auto px-4">
                <div className="m-auto max-w-3xl text-center">
                    <h3 className="text-5xl">Support Our Channel On Patreon</h3>
                    <p className="py-6">
                        Lorem Ipsum является текст-заполнитель обычно
                        используется в графических, печать и издательской
                        индустрии для предварительного просмотра макета и
                        визуальных макетах.
                    </p>
                    <a className="sp-btn sp-btn-accent" href={socialLinks.patreon}>
                        <RiPatreonLine className="mr-2" />
                        Become a patreon
                    </a>
                    <div className="mt-8">
                        <SubscribeBlock />
                    </div>
                </div>
            </div>
        </section>
    );
};
