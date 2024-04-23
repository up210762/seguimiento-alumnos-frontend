'use client'
import React, { useContext, useEffect, useState } from 'react';
import 'bootswatch/dist/materia/bootstrap.min.css';
import FilesBox from '@/components/filesBox';
import NavBar from '@/components/navBar';
import StateContext from '@/services/stateContext';
import Alert from '@/components/alerts';

const BASE_URL = 'http://localhost:5000/'
const UPLOAD_FILE_URL = new URL('upload-results', BASE_URL)

interface dataForm {
  title?: string | null
  file?: File
}

const Home: React.FC = () => {
  const [dataForm, setDataForm] = useState<dataForm | undefined>({});
  const [textoAlerta, setTextoAlerta] = useState<string>();
  const [mostrarAlertaCambios, setMostrarAlertaCambios] = useState<string>('d-none')
  const [typeAlert, setTypeAlert] = useState<string>();
  const [whoResponse, setWhoResponse] = useState<string>();

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setDataForm((prevDataForm) => ({ ...prevDataForm, title: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0)
      setDataForm((prevDataForm) => ({ ...prevDataForm, file: files[0] }))
  }

  const emptyDataAlert = (text: string) => {
    setMostrarAlertaCambios('')
    setTypeAlert('alert-warning')
    setTextoAlerta(text)
    setWhoResponse('Respuesta del cliente!!!')
  }

  const successAlert = (data: string) => {
    setMostrarAlertaCambios('')
    setTypeAlert('alert-success')
    setTextoAlerta(data)
    setWhoResponse('Respuesta del servidor!!!')
  }

  const warnAlert = (message: string) => {
    setMostrarAlertaCambios('')
    setTypeAlert('alert-warning')
    setTextoAlerta(message)
    setWhoResponse('Respuesta del cliente!!!')
  }

  const dangerAlert = (who: string, data: string) => {
    setMostrarAlertaCambios('')
    setTypeAlert('alert-danger')
    setTextoAlerta(data)
    setWhoResponse(`Respuesta del ${who}!!!`)
  }

  const deleteAlert = (text: string) => {
    successAlert(text);
  }

  const deleteFailAlert = (text: string) => {
    warnAlert(text);
  }

  const handleOnClose = () => {
    setMostrarAlertaCambios('d-none')
    setDataForm(undefined)
  }

  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      let data: string = "";
      let decition = true;

      if (!dataForm) {
        emptyDataAlert("No puedes dejar el formulario vacío, llena el campo de archivos.");
        return
      }
      if (!dataForm.file) {
        decition = false;
        emptyDataAlert("No puedes dejar vacío el campo de archivos");
        return;
      }

      if (dataForm.title)
        formData.append('title', dataForm.title);
      else {
        decition = confirm("El título del archivo será el mismo que se lea en el archivo de subida. ¿Deseas continuar?")
      }

      if (!decition) {
        warnAlert("Proceso cancelado.")
        return;
      }

      successAlert("Esto podría tomar un  tiempo...")

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
      <NavBar />
      <div style={{ width: "100%", height: '100vh', backgroundColor: "white" }}>

        <div style={{ margin: 10, display: 'flex' }}>
          <div className="container">
            <form onSubmit={handleUploadSubmit}>
              <fieldset>
                <Alert typeAlert={typeAlert!}
                  mostrarAlertaCambios={mostrarAlertaCambios!}
                  handleOnClose={handleOnClose}
                  textoAlerta={textoAlerta!}
                  whoResponse={whoResponse!} />
                <div>
                  <legend>Inserta archivo en formato CSV</legend>
                  <div className='row' style={{ marginBottom: 20 }}>
                    <div>
                      <label htmlFor="staticFileName"
                        className="form-label mt-4">Nombre del archivo de salida</label>
                      <input type="text"
                        readOnly={false}
                        className="form-control"
                        id="title"
                        name='title'
                        onInputCapture={handleChange}
                        placeholder="Nombre del archivo de salida" />
                    </div>
                    <div>
                      <label htmlFor="form-file"
                        className="form-label mt-4">Inserte archivo CSV</label>
                      <input className="form-control"
                        type="file"
                        id="file"
                        onInputCapture={handleFileChange} />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Cargar</button>
              </fieldset>
            </form>
          </div>
          <FilesBox type={1} successAlert={deleteAlert} warnAlert={deleteFailAlert} />
          <FilesBox type={2} successAlert={deleteAlert} warnAlert={deleteFailAlert} />
        </div>
      </div>
    </>
  );
}

export default Home;