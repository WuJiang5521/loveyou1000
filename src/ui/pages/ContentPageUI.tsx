import {ContentPage} from "../../model/book";
import {BasePageUI} from "./BasePageUI";
import {List, ListItemButton, ListItemText, Typography} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";

interface IProps {
    pageConfig: ContentPage,
    active: boolean,
    jumpPage: (page: number) => void,
}

export function ContentPageUI({active, pageConfig, jumpPage}: IProps) {
    return <BasePageUI header={pageConfig.header}
                       pageNo={pageConfig.pageNo}
                       active={active}
                       settings={pageConfig.settings}>
        <Title variant={'h3'}
               align={'center'}>
            目录
        </Title>
        <LinkList>
            {pageConfig.links.map(link => (
                <ListItemButton key={link.title}
                                sx={{pl: link.level * 4 + 2}}
                                onClick={() => jumpPage(link.index)}>
                    <LinkName>{link.title}</LinkName>
                    <LinkLine/>
                    <Typography>{link.page}</Typography>
                </ListItemButton>
            ))}
        </LinkList>
    </BasePageUI>;
}

const titleHeight = 56;
const Title = styled(Typography)({
    height: titleHeight,
})
const LinkList = styled(List)(({theme}) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    height: `calc(100% - ${titleHeight}px - ${theme.spacing(2)})`,
    overflow: 'hidden auto',
    position: 'relative',
}))
const LinkName = styled(ListItemText)({
    width: 'fit-content',
    flex: '0 0 auto',
})
const LinkLine = styled('div')(({theme}) => ({
    flex: 1,
    height: 0,
    margin: theme.spacing(1),
    borderTop: '1px dashed #364041'
}))
