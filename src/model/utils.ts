import {
    Book,
    BookConfig,
    ContentLink,
    ContentPage,
    EmptyPage,
    LyricPage,
    PageSettings,
    SectionConfig, StoryPage,
    TitlePage
} from "./book";

const defaultPageSettings: PageSettings = {
    bgColor: 'rgb(255,255,255)',
    bgImg: null,
    bgMusic: null,
}

function makeSettings(settings?: Partial<PageSettings>): PageSettings {
    const s = {
        ...defaultPageSettings,
        ...settings,
    }
    if (s.bgMusic) s.bgMusic = `./musics/${s.bgMusic}.mp3`
    return s;
}
const SectionName = [
    '第一章',
    '第二章',
    '第三章',
    '第四章',
    '第五章',
]
function makeContent(sections: SectionConfig[], prePageCnt: number): Record<string, ContentLink> {
    const res: Record<string, ContentLink> = {};
    let page = 1;
    for (const [i, sec] of sections.entries()) {
        if (page % 2 === 0) page++;
        res[sec.title] = {
            title: `${SectionName[i]}　${sec.title}`,
            page: page.toString(),
            index: page + prePageCnt,
            level: 0,
        };
        page++;
        if (!sec.songSection) page++;
        for (const pageName of sec.pages) {
            if (sec.songSection) {
                res[`${sec.title},${pageName},story`] = {
                    title: pageName,
                    page: page.toString(),
                    index: page + prePageCnt,
                    level: 1,
                }
                page++;
            }
            res[`${sec.title},${pageName}`] = {
                title: pageName,
                page: page.toString(),
                index: page + prePageCnt,
                level: 1,
            }
            page++;
        }
    }
    return res;
}

function newTitlePage(title: string, subTitle?: string, settings?: Partial<PageSettings>, pageNo?: string): TitlePage {
    return {
        type: 'Title',
        pageNo: pageNo || '',
        header: '',
        settings: makeSettings(settings),
        title: title,
        subTitle: subTitle || null,
    }
}

function newEmptyPage(pageNo: string, header: string, settings?: Partial<PageSettings>): EmptyPage {
    return {
        type: 'Empty',
        header: header,
        pageNo: pageNo,
        settings: makeSettings(settings),
    }
}

function newContentPage(pages: Record<string, ContentLink>, sections: SectionConfig[], settings?: Partial<PageSettings>): ContentPage {
    return {
        type: 'Content',
        pageNo: '',
        header: '',
        settings: makeSettings(settings),
        links: sections.map(sec => [
            pages[sec.title],
            ...(sec.needSubContent
                ? sec.pages.map(page => pages[`${sec.title},${page}`])
                : [])
        ]).flat(),
    }
}

function newLyricPage(song: string, secTitle: string, pageNo: string, settings?: Partial<PageSettings>, music?: string, lyric?: string): LyricPage {
    return {
        type: 'Lyric',
        header: secTitle,
        pageNo,
        settings: makeSettings(settings),
        song,
        music: music || `./musics/${song}.mp3`,
        lyric: lyric || `./lyrics/${song}.lrc`,
    }
}

function newStoryPage(title: string, secTitle: string, pageNo: string, settings?: Partial<PageSettings>, story?: string): StoryPage {
    return {
        type: 'Story',
        header: secTitle,
        pageNo,
        settings: makeSettings(settings),
        title,
        story: story || `./stories/${title}.txt`,
    }
}

export function initBook(config: BookConfig): Book {
    const book: Book = [];
    book.push(newTitlePage(config.title, config.subTitle, config.settings));
    book.push(newEmptyPage('', '', config.settings));
    book.push(newStoryPage(config.preface, '', '', config.settings))
    book.push(newEmptyPage('', '', config.settings));
    const content = makeContent(config.sections, book.length + 1);
    book.push(newContentPage(content, config.sections, config.settings))
    for (const [i, sec] of config.sections.entries()) {
        const secTitle = `${SectionName[i]}　${sec.title}`;
        const secSettings = {...config.settings, ...sec.settings};
        if (book.length % 2 === 1) book.push(newEmptyPage('', '', secSettings));
        book.push(newTitlePage(secTitle, sec.subTitle, secSettings, content[sec.title].page));
        if (!sec.songSection) book.push(newEmptyPage('', secTitle, secSettings));
        for (const page of sec.pages) {
            if (sec.songSection) {
                book.push(newStoryPage(page, secTitle, content[`${sec.title},${page},story`].page, secSettings))
                book.push(newLyricPage(page, secTitle, content[`${sec.title},${page}`].page, secSettings))
            } else {
                book.push(newStoryPage(page, secTitle, content[`${sec.title},${page}`].page, secSettings))
            }
        }
    }
    if (book.length % 2 === 0) book.push(newEmptyPage('', '', {...config.settings, ...config.sections[config.sections.length - 1].settings}));
    book.push(newTitlePage(config.title, config.endWords, config.settings));
    return book;
}