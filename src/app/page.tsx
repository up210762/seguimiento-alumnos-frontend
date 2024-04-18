'use client'
import React, { useEffect, useState } from 'react';
import 'bootswatch/dist/materia/bootstrap.min.css';
import FilesGenerated from '@/components/filesGeneratedBox';
import FilesUpdated from '@/components/filesUpdatedBox';

const BASE_URL = 'http://localhost:5000/'
const UPLOAD_FILE_URL = new URL('upload-results', BASE_URL)

interface dataForm {
  title?: string | null
  file?: File
}

const Home: React.FC = () => {
  const [dataForm, setDataForm] = useState<dataForm>({});
  const [textoAlerta, setTextoAlerta] = useState<string>();
  const [mostrarAlertaCambios, setMostrarAlertaCambios] = useState<string>('d-none')
  const [typeAlert, setTypeAlert] = useState<string>();
  const [whoResponse, setWhoResponse] = useState<string>()

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (!value)
      return;
    setDataForm((prevDataForm) => ({ ...prevDataForm, title: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0)
      setDataForm((prevDataForm) => ({ ...prevDataForm, file: files[0] }))
  }

  const emptyDataAlert = () => {
    setTypeAlert('alert-warning')
    setTextoAlerta("No puedes dejar vacío el campo de archivos")
    setWhoResponse('Respuesta del cliente!!!')
  }

  const successAlert = (data: string) => {
    setTypeAlert('alert-success')
    setTextoAlerta(data)
    setWhoResponse('Respuesta del servidor!!!')
  }

  const dangerAlert = (who: string, data: string) => {
    setTypeAlert('alert-danger')
    setTextoAlerta(data)
    setWhoResponse(`Respuesta del ${who}!!!`)
  }

  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const decition = confirm("El título del archivo será el mismo que se lea en el archivo de subida. ¿Deseas continuar?")
      successAlert("Esto podría tomar un  tiempo...")
      const formData = new FormData();
      let data: string = "";
      if (!dataForm.file) {
        emptyDataAlert();
        return;
      }
      if (dataForm.title)
        formData.append('title', dataForm.title);
      formData.append('file', dataForm.file);

      const response = await fetch(UPLOAD_FILE_URL, {
        method: 'POST',
        body: formData
      });
      data = await response.json()

      if (!response.ok) {
        dangerAlert("servidor", data)
        formData.delete('title')
        formData.delete('files')
      }
      else {
        successAlert(data)
        formData.delete('title')
        formData.delete('files')

      }
    } catch (error) {
      setWhoResponse('Respuesta del cliente!!!')
      dangerAlert("cliente", `${error}`);
    }
    setMostrarAlertaCambios("")
  };

  return (
    <>
      <div style={{ width: "100%", height: 900, backgroundColor: "white" }}>
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Segumiento de alumnos</a>
          </div>
        </nav>
        <div style={{ margin: 10, display: 'flex' }}>
          <div className="container">
            <form onSubmit={handleUploadSubmit}>
              <fieldset>
                <div className="container">
                  <div className={`alert alert-dismissible ${typeAlert} ${mostrarAlertaCambios}`}>
                    <button type="button" className="btn-close" onClick={() => { setMostrarAlertaCambios("d-none") }}></button>
                    <strong>{whoResponse}</strong> {textoAlerta}
                  </div>
                </div>
                <div>
                  <legend>Inserta archivo</legend>
                  <div className='row' style={{ marginBottom: 20 }}>
                    <div>
                      <label htmlFor="staticFileName"
                        className="form-label mt-4">Nombre del archivo de salida</label>
                      <input type="text"
                        readOnly={false}
                        className="form-control"
                        id="title"
                        name='title'
                        onChange={handleChange}
                        placeholder="Nombre del archivo de salida" />
                    </div>
                    <div>
                      <label htmlFor="form-file"
                        className="form-label mt-4">Inserte archivo CSV</label>
                      <input className="form-control"
                        type="file"
                        id="file"
                        onChange={handleFileChange} />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Cargar</button>
              </fieldset>
            </form>
          </div>
          <FilesUpdated />

          <FilesGenerated />
        </div>
      </div>
    </>
  );
}

export default Home;