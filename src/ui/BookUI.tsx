import HTMLFlipBook from "react-pageflip";
import styled from "@emotion/styled";
import { Page } from "../model/book";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { ContentPageUI } from "./pages/ContentPageUI";
import { TitlePageUI } from "./pages/TitlePageUI";
import { LyricPageUI } from "./pages/LyricPageUI";
import { StoryPageUI } from "./pages/StoryPageUI";
import { EmptyPageUI } from "./pages/EmptyPageUI";
import { Button, IconButton, Typography } from "@mui/material";

interface IProps {
    width: number,
    height: number,
    pages: Page[],
}

function getStartPage() {
    const page = +window.location.pathname.substring(1);
    return isNaN(page) ? 0 : page;
}
const startPage = getStartPage();

export function BookUI({ width, height, pages }: IProps) {
    const ref = useRef<any>(null);
    const [state, setState] = useState('read');
    const [page, setPage] = useState(startPage);
    const [bgm, setBGM] = useState(pages[startPage].settings.bgMusic);
    const position: -1 | 0 | 1 = page === 0 ? -1
        : page === pages.length - 1 ? 1
            : 0;
    const isPageActive = (p: number) => Math.ceil(page / 2) === Math.ceil(p / 2);
    const flipTo = (page: number) => {
        if (!ref.current) return;
        const pageFlip = ref.current.pageFlip();
        let current = pageFlip.pages.currentSpreadIndex;
        const target = Math.ceil(page / 2);
        while (current < target) {
            pageFlip.flipNext('top');
            current++;
        }
        while (current > target) {
            pageFlip.flipPrev('top');
            current--;
        }
    }
    const handleSetPage = (page: number) => {
        if (!ref.current) return;
        page = Math.max(0, Math.min(page, pages.length - 1));
        setPage(page);
        const newBGM = pages[page].settings.bgMusic;
        if (bgm !== newBGM) setBGM(newBGM);
        flipTo(page);
    }
    const audio = useRef<HTMLAudioElement>(null);
    useEffect(() => {
        if (!audio.current) return;
        if (bgm && audio.current.paused) {
            audio.current.play()
                .then(() => {
                    if (!audio.current) return;
                    audio.current.muted = false;
                    audio.current.volume = 50;
                });
        }
        if (!bgm && !audio.current.paused) audio.current.pause();
    }, [bgm, page]);

    return <Container>
        <NavButton disabled={page === 0 || state !== 'read'}
            disableRipple
            onClick={() => handleSetPage(page - 2)}>
            <Typography align={'left'}>上一页</Typography>
        </NavButton>
        <Wrapper style={{
            width: width * 2,
            height,
            pointerEvents: page === pages.length - 1 ? 'none' : undefined
        }}
            position={position}>
            <HTMLFlipBook {...flipBookConfig}
                ref={el => ref.current = el}
                startPage={startPage}
                width={width}
                height={height}
                maxWidth={width}
                maxHeight={height}
                onChangeState={e => setState(e.data)}>
                {pages.map((page, pid) => (
                    <PageContainer key={pid} style={{ width, height }}>
                        {page.type === 'Content' && <ContentPageUI active={isPageActive(pid)}
                            pageConfig={page}
                            jumpPage={handleSetPage} />}
                        {page.type === 'Title' && <TitlePageUI active={isPageActive(pid)}
                            pageConfig={page} />}
                        {page.type === 'Lyric' && <LyricPageUI active={isPageActive(pid)}
                            pageConfig={page} />}
                        {page.type === 'Story' && <StoryPageUI active={isPageActive(pid)}
                            pageConfig={page} />}
                        {page.type === 'Empty' && <EmptyPageUI active={isPageActive(pid)}
                            pageConfig={page} />}
                    </PageContainer>
                ))}
            </HTMLFlipBook>
        </Wrapper>
        <NavButton disabled={state !== 'read'}
            disableRipple
            onClick={() => handleSetPage(page === pages.length - 1 ? 0 : (page + 2))}>
            <Typography align={'right'}>{page === pages.length - 1 ? '回到首页' : '下一页'}</Typography>
        </NavButton>
        {bgm && <audio ref={audio} src={bgm} autoPlay loop style={{ display: 'none' }} />}
    </Container>
}

const Container = styled('div')({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

const Wrapper = styled('div', {
    shouldForwardProp: propName => propName !== 'position'
})<HTMLAttributes<HTMLDivElement> & { position: -1 | 0 | 1 }>(({ position }) => ({
    transition: 'transform 1s ease',
    transform: `translate(${position * 25 - 50}%, -50%)`,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    overflow: 'visible',
}))

const PageContainer = styled('div')({
    background: '#ffffff',
})

const NavButton = styled(Button)({
    width: '50%',
    height: '100%',
    '& > div': {
        width: '80%'
    }
})

const flipBookConfig = {
    className: 'book',
    style: {},
    startPage: 0,
    size: 'stretch',
    minWidth: 0,
    minHeight: 0,
    drawShadow: true,
    flippingTime: 1000,
    usePortrait: true,
    startZIndex: 0,
    autoSize: true,
    maxShadowOpacity: 0.15,
    showCover: true,
    mobileScrollSupport: true,
    clickEventForward: true,
    useMouseEvents: false,
    swipeDistance: 30,
    showPageCorners: false,
    disableFlipByClick: true,
} as const;