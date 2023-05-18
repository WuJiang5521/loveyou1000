import {TitlePage} from "../../model/book";
import {BasePageUI} from "./BasePageUI";
import {Typography} from "@mui/material";

interface IProps {
    pageConfig: TitlePage,
    active: boolean,
}

export function TitlePageUI({active, pageConfig}: IProps) {
    return <BasePageUI header={pageConfig.header}
                       active={active}
                       pageNo={pageConfig.pageNo}
                       settings={pageConfig.settings}>
        <Typography variant={'h4'}
                    align={'center'}
                    sx={{mt: '40%', mb: '10%'}}>
            {pageConfig.title}
        </Typography>
        <Typography align={'left'}
                    sx={{ml: '55%', whiteSpace: 'break-spaces'}}>
            {pageConfig.subTitle}
        </Typography>
    </BasePageUI>;
}