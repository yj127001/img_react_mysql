import { useState } from "react";
import "./App.css";
import FileUpload from "./FileUpload/FileUpload";
import FileList from "./FileList/FileList";

interface FileObject extends File {
  name: string;
  size: number;
  type: string;
  isUploading: boolean;
}

export interface CustomFile extends FileObject {}

function App() {
  const [files, setFiles] = useState<CustomFile[]>([]);

  const removeFile = (filename: string): void => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  return (
    <div className="App">
      <div className="title">Upload file</div>
      <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />
      <FileList files={files} removeFile={removeFile} />
    </div>
  );
}

export default App;
