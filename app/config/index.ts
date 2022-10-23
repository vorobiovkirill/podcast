type PodcastLinksT = {
    apple: string;
    google: string;
    spotify: string;
    rss: string;
};

type SocialLinksT = {
    telegram: string;
    instagram: string;
    patreon: string;
};

export const podcastLinks: PodcastLinksT = {
    apple: 'https://podcasts.apple.com/us/podcast/za30cast/id1604439189',
    google: 'https://www.google.com/podcasts?feed=aHR0cHM6Ly9tZWRpYS56ZW5jYXN0LmZtL3NrYXpoaS1wYWx5YW5pY3lhLTExNzM3NDI5L3Jzcw%3D',
    spotify: 'https://open.spotify.com/show/0Zwjt2v9A3rOwWVA0Zb4nf',
    rss: 'https://media.zencast.fm/skazhi-palyanicya-11737429/rss'
};

export const socialLinks: SocialLinksT = {
    telegram: 'https://t.me/za30cast',
    instagram: '',
    patreon: 'https://www.patreon.com/saypalyanitsa'
};
