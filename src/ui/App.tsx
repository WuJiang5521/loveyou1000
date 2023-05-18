import {BookUI} from "./BookUI";
import {useLayoutEffect, useState} from "react";
import {pages} from "../model";

const ratio = 210 / 297;

function App() {
    const [size, setSize] = useState(100);

    useLayoutEffect(() => {
        setSize(Math.min(window.innerHeight * 0.9, (window.innerWidth - 260) / 2 / ratio))
    })

    return <BookUI width={size * ratio}
                   height={size}
                   pages={pages}/>
}

export default App
