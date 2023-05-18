export interface PageSettings {
    bgColor: string,
    bgImg: string | null,
    bgMusic: string | null,
}

export interface SectionConfig {
    title: string,
    songSection: boolean,
    needSubContent: boolean,
    subTitle?: string,
    settings?: Partial<PageSettings>,
    pages: string[],
}
export interface BookConfig {
    title: string,
    subTitle?: string,
    endWords?: string,
    preface: string,
    settings?: Partial<PageSettings>,
    sections: SectionConfig[],
}

export interface BasePage {
    type: 'Title' | 'Content' | 'Lyric' | 'Story' | 'Empty',
    header: string,
    pageNo: string,
    settings: PageSettings,
}

export interface TitlePage extends BasePage {
    type: 'Title',
    title: string,
    subTitle: string | null,
}

export interface ContentLink {
    title: string,
    page: string,
    index: number,
    level: number,
}

export interface ContentPage extends BasePage {
    type: 'Content',
    links: ContentLink[],
}

export interface LyricPage extends BasePage {
    type: 'Lyric',
    song: string,
    music: string,
    lyric: string,
}

export interface StoryPage extends BasePage {
    type: 'Story',
    title: string,
    story: string,
}

export interface EmptyPage extends BasePage {
    type: 'Empty'
}

export type Page =
    | ContentPage
    | LyricPage
    | StoryPage
    | TitlePage
    | EmptyPage

export type Book = Page[];