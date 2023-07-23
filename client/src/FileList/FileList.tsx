import axios from "axios";
import React from "react";
import FileItem from "../FileItem/FileItem";

// const FileList = ({ files, removeFile }) => {
//     const deleteFileHandler = (_name) => {
//         axios.delete(`http://localhost:8080/upload?name=${_name}`)
//             .then((res) => removeFile(_name))
//             .catch((err) => console.error(err));
//     }
interface Props {
  files: {
    name: string;
    size: number;
    type: string;
    isUploading: boolean;
  }[];
  removeFile: (filename: string) => void;
}

const FileList: React.FC<Props> = ({ files, removeFile }) => {
  const deleteFileHandler = (name: string): void => {
    axios
      .delete(`http://localhost:8080/upload?name=${name}`)
      .then((res) => removeFile(name))
      .catch((err) => console.error(err));
  };

  return (
    <ul className="file-list">
      {files &&
        files.map((f) => (
          <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export default FileList;
