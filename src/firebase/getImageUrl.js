import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './config';

const getImageUrl = (image) => {
	return new Promise((resolve, reject) => {
		const storageRef = ref(storage, `images/${image.name}`);
		const uploadTask = uploadBytesResumable(storageRef, image);

		uploadTask.on('state_changed', (snapshot) => {/* anything to do with the snapshot now? */ },
			(error) => {
				reject(error)
				console.log(error);
			},
			() => {
				resolve(getDownloadURL(uploadTask.snapshot.ref));
			})
	})
}

export default getImageUrl;