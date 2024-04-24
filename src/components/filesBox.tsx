import React, { useEffect, useState } from "react";
import deleteFile from "@/services/deleteFile";



interface Files {
    type: number
    files: string[]
    path: string
    title: string
    successAlert: (text: string) => void
    warnAlert: (text: string) => void
    chargeLoadFiles: ()=>void
    chargeGeneratedFiles:()=>void
}

const FilesBox: React.FC<Files> = ({ type, files, path, title, chargeLoadFiles, chargeGeneratedFiles, successAlert, warnAlert }) => {

    useEffect(() => {
        if (type === 1) {
            chargeLoadFiles();
        }
        else if (type === 2) {
            chargeGeneratedFiles()
        }

    }, [])

    if (!files)
        return;

    if (!path)
        return;

    const handleDeleteFile = async (file: string) => {
        const confirmation = confirm("Estas seguro de querer borrarlo?");
        if (!confirmation)
            return;

        const res = await deleteFile(file, path);
        if (!res.ok)
            warnAlert("No hay archivo por eliminar.");
        successAlert("Archivo eliminado con éxito.");
        if (type === 1) {
            chargeLoadFiles();
        } else if (type === 2) {
            chargeGeneratedFiles();
        }
    }


    return (
        <div className="container">
            <legend>{title}</legend>
            {files.map((file) => (
                <div className="d-flex"
                    style={itemsList}
                    key={file}>
                    <div style={{ width: '380vw' }}>
                        <p>{file}</p>
                    </div>
                    <div className="container">
                        <img
                            src="/eliminar.png"
                            style={imagenStyle}
                            onClick={() => handleDeleteFile(file)}></img>
                    </div>
                    <div className="container">
                        <a href={`http://localhost:5000/download/${path}/${file}`}>
                            <img
                                src="/descargas.png"
                                style={imagenStyle}></img>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}

const itemsList = {
    width: '30vw',
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: ''
}

export const imagenStyle = {
    height: 40
}

export default FilesBox