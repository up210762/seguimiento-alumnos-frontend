import React, { useEffect, useState } from "react";

const BASE_URL = 'http://localhost:5000/';

const FilesGenerated: React.FC = () => {
    const generatedPath = new URL('get-generated-files', BASE_URL);
    const [files, setFiles] = useState([]);

    useEffect(()=>{
        async () =>{
            const res = await fetch(generatedPath)
            const data = await res.json()
            console.log(data)
            setFiles(data)
        }
        console.log(files)
    })
    
    return (
        <div className="container">
            <legend>Archivos generados</legend>
            {files.map((file) => (
                <p>{file}</p>
            ))}
        </div>
    )
}

export default FilesGenerated