import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Form from './components/Form';
import Header from './components/Header';
import Table from './components/Table';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase/config';

function App() {
  const [submitData, setSubmitData] = useState([]);

  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed', () => { },
        (error) => {
          reject(error)
          console.log(error);
        },
        () => {
          resolve(getDownloadURL(uploadTask.snapshot.ref));
        })
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const rawFormData = {
      name: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      hungry: e.target[3].value,
      photo: e.target[4].files[0],
    }

    document.querySelectorAll('input').forEach(elem => elem.value = '');
    uploadImage(rawFormData.photo)
      .then(imgLink => {
        const newData = { ...rawFormData, photo: imgLink }
        setSubmitData(submitData => [...submitData, newData]);
      })
  }

  // Routing
  const navigate = useNavigate();
  const location = useLocation();

  const switchView = () => {
    location.pathname === '/' ? navigate('table') : navigate('/');
  }

  return (
    <div className="wrapper">
      <Header />
      {/* change this button to a one liner and use ::after to add the text */}
      <button onClick={switchView}>
        Switch
      </button>
      <Routes>
        <Route path='/'
          element={
            <Form
              handleSubmit={handleFormSubmit}
            />}
        />
        <Route path='table'
          element={
            <Table
              data={submitData}
            />}
        />
      </Routes>
    </div>
  );
}

export default App;
