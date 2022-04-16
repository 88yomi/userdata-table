import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Form from './components/Form';
import Header from './components/Header';
import Table from './components/Table';

import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from 'firebase/storage'; //
import { storage } from './firebase/config'; //

function App() {
  const [submitData, setSubmitData] = useState([]);
  
  const [imgUrl, setImgUrl] = useState(null);
  
  const [progress, setProgress] = useState(0);

  const uploadImage = (image) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed', (snapshot) => {
      const percent = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percent);
      console.log(progress)
    },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => setImgUrl(url));
      })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const file = e.target[4].files[0];
    setImgUrl(uploadImage(file))

    let photo = await uploadImage(e.target[4].value);
    console.log(photo);

    let newData = {
      name: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      hungry: e.target[3].value,
      photo: e.target[4].value,
      id: nanoid(10)
    };
    setSubmitData(submitData => [...submitData, newData]);
    document.querySelectorAll('input').forEach(elem => elem.value = '');
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
