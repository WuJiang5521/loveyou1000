import {LyricPage} from "../../model/book";
import {BasePageUI} from "./BasePageUI";
import H5AudioPlayer from "react-h5-audio-player";
import {Lrc} from "react-lrc";
import {Line} from "react-lrc/build/components/lrc";
import {Divider, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import 'react-h5-audio-player/lib/styles.css';
import {useTheme} from "@mui/material/styles";

interface IProps {
    pageConfig: LyricPage,
    active: boolean,
}

function LyricLine(props: { index: number, active: boolean, line: Line }) {
    let content = props.line.content || ' ';
    let color = 'default';
    for (const [prefix, c] of [['男', 'primary.dark'], ['女', 'secondary.dark'], ['合', 'success.dark']])
        if (content.startsWith(`${prefix}：`)) {
            color = c;
            break;
        } else if (content.startsWith(`[${prefix}]`)) {
            content = content.substring(3);
            color = c;
            break;
        }
    return <Typography variant={props.active ? 'h5' : 'inherit'}
                       color={color}
                       fontWeight={(props.index < 4 || props.active) ? 'bold' : 'inherit'}
                       align={'center'}
                       sx={{mt: 1, mb: 1, minHeight: 16}}>
        {content}
    </Typography>
}

export function LyricPageUI({pageConfig, active}: IProps) {
    const [lrc, setLRC] = useState('');
    const [ms, setMS] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        if (active && lrc === '')
            fetch(pageConfig.lyric)
                .then(res => res.text())
                .then(res => setLRC((res)));
    }, [active]);
    const handleSetMS = useCallback((e: Event) => {
        const target = e.target as HTMLAudioElement;
        setMS(target.currentTime * 1000)
    }, []);

    return <BasePageUI header={pageConfig.header}
                       pageNo={pageConfig.pageNo}
                       active={active}
                       settings={pageConfig.settings}>
        <Lrc currentMillisecond={ms}
             lrc={lrc}
             verticalSpace
             lineRenderer={LyricLine}
             style={{
                 width: '100%',
                 height: `calc(100% - 88px - ${theme.spacing(6)})`,
             }}/>
        <Divider sx={{mt: 3, mb: 3}}/>
        {active &&
            <H5AudioPlayer src={pageConfig.music}
                           listenInterval={200}
                           autoPlay
                           loop
                           volume={0.5}
                           showJumpControls={false}
                           onListen={handleSetMS}
                           style={{
                               boxShadow: 'none',
                               backgroundColor: 'transparent',
                           }}/>
        }
    </BasePageUI>;
}
