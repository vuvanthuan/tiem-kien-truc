export interface IMeta {
    URL: string | URL;
    siteName: string;
    title?: string;
    description?: string;
    og: {
        locale?: any;
        type?: 'website';
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
