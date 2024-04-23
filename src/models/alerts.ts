export class Alert {
    typeAlert: string | undefined
    whoResponse: string | undefined
    textoAlerta: string | undefined
    mostrarAlertaCambios: string | undefined

    constructor(
        typeAlert: string,
        whoResponse: string,
        textoAlerta: string,
        mostrarAlertaCambios: string) {
        this.typeAlert = typeAlert
        this.whoResponse = whoResponse
        this.textoAlerta = textoAlerta
        this.mostrarAlertaCambios = mostrarAlertaCambios
    }

    emptyDataAlert = () => {
        this.mostrarAlertaCambios = '';
        this.typeAlert = 'alert-warning';
        this.textoAlerta = "No puedes dejar vacío el campo de archivos";
        this.whoResponse = 'Respuesta del cliente!!!';
    }

    successAlert = (data: string) => {
        this.mostrarAlertaCambios = '';
        this.typeAlert = 'alert-success';
        this.textoAlerta = data;
        this.whoResponse = 'Respuesta del servidor!!!';
    }

    warnAlert = (message: string) => {
        this.mostrarAlertaCambios = '';
        this.typeAlert = 'alert-warning';
        this.textoAlerta = message;
        this.whoResponse = 'Respuesta del cliente!!!';
    }

    dangerAlert = (who: string, data: string) => {
        this.mostrarAlertaCambios = '';
        this.typeAlert = 'alert-danger';
        this.textoAlerta = data;
        this.whoResponse = `Respuesta del ${who}!!!`;
    }

    handleOnClose = () => {
        this.mostrarAlertaCambios = "d-none";
    }
}
