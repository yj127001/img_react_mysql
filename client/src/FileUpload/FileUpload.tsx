import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.css";
import axios from "axios";
import { CustomFile } from "../App";

interface Props {
  files: CustomFile[];
  setFiles: React.Dispatch<React.SetStateAction<CustomFile[]>>;
  removeFile: (filename: string) => void;
}
const FileUpload: React.FC<Props> = ({ files, setFiles, removeFile }) => {
  const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files == undefined) {
      return;
    }
    const file = event.target.files[0] as CustomFile;
    if (!file) return;
    file.isUploading = true;
    setFiles([...files, file]);
    console.log([...files]);

    // upload file
    const formData = new FormData();
    formData.append("newFile", file, file.name);
    console.log("formData" + formData);
    axios
      .post("http://localhost:8080/upload", formData)
      .then((res) => {
        file.isUploading = false;
        setFiles([...files, file]);
      })
      .catch((err) => {
        // inform the user
        console.error(err);
        removeFile(file.name);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/getdata")
      .then((res) => {
        console.log("back result:" + res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input type="file" onChange={uploadHandler} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </button>
        </div>

        <p className="main">Supported files</p>
        <p className="info">PDF, JPG, PNG</p>
      </div>
    </>
  );
};

export default FileUpload;
