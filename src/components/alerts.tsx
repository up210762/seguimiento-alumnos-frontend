import React, { useEffect, useState } from "react"

interface ComponentProps {
    typeAlert: string;
    mostrarAlertaCambios: string
    textoAlerta: string
    whoResponse: string
    handleOnClose: ()=>void
}

const Alert: React.FC<ComponentProps> = ({ typeAlert, mostrarAlertaCambios, textoAlerta, whoResponse, handleOnClose }) => {

    return (
        <div className="container">
            <div className={`alert alert-dismissible ${typeAlert} ${mostrarAlertaCambios}`}>
                <button type="button" className="btn-close" onClick={handleOnClose}></button>
                <strong>{whoResponse}</strong> {textoAlerta}
            </div>
        </div>
    )
}

export default Alert


