export interface IMeta {
    URL: string | URL;
    siteName: string;
    title?: string;
    description?: string;
    og: {
        locale?: string;
        type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
        ogImage: string | URL;
        width?: number;
        height?: number;
    };
    twitter?: {
        card?: string;
        site?: string;
    };
    keywords: string[]
}
