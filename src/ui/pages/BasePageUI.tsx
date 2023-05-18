import {PropsWithChildren} from "react";
import {PageSettings} from "../../model/book";
import {darken, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

interface IProps extends PropsWithChildren {
    header: string
    pageNo: string
    active: boolean
    settings: PageSettings
}

export function BasePageUI({header, active, pageNo, settings, children}: IProps) {
    return <Page style={{
        borderColor: darken(settings.bgColor, 0.1),
        backgroundColor: settings.bgColor,
        backgroundImage: settings.bgImg || undefined
    }}>
        <Header variant={'caption'}>{header}</Header>
        <Content>
            {children}
        </Content>
        <Footer variant={'caption'}>{pageNo}</Footer>
    </Page>
}

const Header = styled(Typography)({
    width: '100%',
    height: 40,
    padding: '0 40px',
    lineHeight: '40px',
    '.--left &': {
        textAlign: 'left',
    },
    '.--right &': {
        textAlign: 'right',
    },
})

const Content = styled('div')({
    position: 'relative',
    width: 'calc(100% - 80px)',
    height: 'calc(100% - 80px)',
    marginLeft: 40,
})

const Footer = styled(Typography)({
    width: '100%',
    padding: '0 40px',
    height: 40,
    lineHeight: '40px',
    '.--left &': {
        textAlign: 'left',
    },
    '.--right &': {
        textAlign: 'right',
    },
})

const Page = styled('div')({
    width: '100%',
    height: '100%',

    borderWidth: 1,
    borderStyle: 'solid',

    '.--left &': {
        borderRight: 0,
        boxShadow: '-5px 0 20px 0 rgb(0 0 0 / 50%), inset -7px 0 10px -7px rgb(0 0 0 / 40%)',
    },
    '.--right &': {
        borderLeft: 0,
        boxShadow: '5px 0 20px 0 rgb(0 0 0 / 50%), inset 7px 0 10px -7px rgb(0 0 0 / 40%)'
    },
})