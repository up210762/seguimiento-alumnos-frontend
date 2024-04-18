import React, { useEffect, useState } from "react";

const BASE_URL = 'http://localhost:5000/';

const FilesUpdated: React.FC = () => {
    const [files, setFiles] = useState([]);
    const uploadedFilesURL = new URL('get-upload-files', BASE_URL);

    useEffect(()=>{
        async () =>{
            const res = await fetch(uploadedFilesURL)
            const data = await res.json()
            console.log(data)
            setFiles(data)
        }
    })
    
    return (
        <div className="container">
            <legend>Archivos cargados</legend>
            {files.map((file) => (
                <p>{file}</p>
            ))}
        </div>
    )
}

interface File {
    name: string
    path: string
}

export default FilesUpdated