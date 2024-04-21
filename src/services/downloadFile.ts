const BASE_URL = 'http://localhost:5000/';

const downloadFile = async (file: string) => {
    const downloadFilesURL = new URL(`download/${file}`, BASE_URL);
    const res = await fetch(downloadFilesURL);
    console.log(res.url)
    return res.url
}

export default downloadFile