import React, { useState } from "react";
import { imagenStyle } from "./filesBox";


const BASE_URL = 'http://localhost:5000/';

const DDButton: React.FC<Props> = ({ title, type }) => {
    const [url, setURL] = useState<string>()
    const [image, setImage] = useState<string>()
    if (type === "download") {
        setImage("descargas")
        
    }

    else if (type === "delete") {
        setImage("eliminar")
        
    }

    if (!url)
        return;

    return (
        <a href={url}>
            <img
                src={`/${image}.png`}
                style={imagenStyle
                }></img>
        </a>
    )
}

interface Props {
    title: string
    type: string
}

export default DDButton;