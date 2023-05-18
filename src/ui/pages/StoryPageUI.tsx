import {StoryPage} from "../../model/book";
import {BasePageUI} from "./BasePageUI";
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";

interface IProps {
    pageConfig: StoryPage,
    active: boolean,
}

export function StoryPageUI({pageConfig, active}: IProps) {
    const story = useStory(pageConfig.story, active);
    return <BasePageUI header={pageConfig.header}
                       pageNo={pageConfig.pageNo}
                       active={active}
                       settings={pageConfig.settings}>
        <Title variant={'h4'}
               align={'center'}>
            {pageConfig.title}
        </Title>
        <Content>
            {story.map((para, pid) => {
                let align: 'left' | 'center' | 'right' | 'justify' = 'justify';
                if (para.startsWith('[L]')) {
                    para = para.substring(3);
                    align = 'left'
                } else if (para.startsWith('[C]')) {
                    para = para.substring(3);
                    align = 'center'
                } else if (para.startsWith('[R]')) {
                    para = para.substring(3);
                    align = 'right'
                }
                return <Paragraph key={pid} align={align} variant={'h6'}>{para}</Paragraph>
            })}
        </Content>
    </BasePageUI>;
}

const titleHeight = 42;
const Title = styled(Typography)({
    height: titleHeight,
    lineHeight: titleHeight + 'px',
})
const Content = styled('div')(({theme}) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    height: `calc(100% - ${titleHeight}px - ${theme.spacing(2)})`,
    overflow: 'hidden auto',
    position: 'relative',
}))
const Paragraph = styled(Typography)(({theme}) => ({
    textIndent: '2em',
    padding: theme.spacing(1)
}))

function useStory(path: string, trigger: boolean): string[] {
    const [story, setStory] = useState<string[]>([]);
    useEffect(() => {
        if (story.length !== 0) return;
        if (!trigger) return;
        fetch(path)
            .then(res => res.text())
            .then(res => setStory(res.split('\n')))
    }, [trigger])
    return story;
}