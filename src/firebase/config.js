import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyAzNQ6sQB_z28sMcrRrPw68MwAXDZfr-sw",
	authDomain: "form-table-bf907.firebaseapp.com",
	projectId: "form-table-bf907",
	storageBucket: "form-table-bf907.appspot.com",
	messagingSenderId: "52575474028",
	appId: "1:52575474028:web:ee79a5c9446f02d75ca349"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);