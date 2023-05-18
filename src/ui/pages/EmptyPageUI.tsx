import {ContentPage, EmptyPage} from "../../model/book";
import {BasePageUI} from "./BasePageUI";

interface IProps {
    pageConfig: EmptyPage,
    active: boolean,
}

export function EmptyPageUI({active, pageConfig}: IProps) {
    return <BasePageUI header={pageConfig.header}
                       pageNo={pageConfig.pageNo}
                       active={active}
                       settings={pageConfig.settings}>

    </BasePageUI>;
}