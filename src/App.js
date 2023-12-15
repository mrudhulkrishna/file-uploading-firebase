import { useState } from "react";
import "./App.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

function App() {
  const [uploadFile, setUploadFile] = useState();
  const [uploadStatus, setUploadStatus] = useState(false);
  const handleOnChange = (event) => {
    setUploadFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setUploadStatus(true);

    const storageRef = ref(storage, "Photos/" + uploadFile.name);
    const uploadResult = await uploadBytes(storageRef, uploadFile);
    const link = await getDownloadURL(uploadResult.ref);

    console.log(link);
    setUploadStatus(false);
  };

  return (
    <div className="App">
      {uploadStatus ? (
        <p>Uploading...</p>
      ) : (
        <div className="image-container">
          <input type="file" name="image" onChange={handleOnChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default App;
