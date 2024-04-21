const BASE_URL = 'http://localhost:5000/';

const deleteFile = async (file: string, path: string) => {
    try {
        const deleteFilesURL = new URL(`delete/${path}/${file}`, BASE_URL);
        const response = await fetch(deleteFilesURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        if (!response.ok){
            console.log("Ocurrió un error")
            return;
        }
        return response.json();
    } catch (error) {
        console.log("Error")
    }
}

export default deleteFile