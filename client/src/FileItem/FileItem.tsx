import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./FileItem.css";

interface Props {
  file: {
    name: string;
    size: number;
    type: string;
    isUploading: boolean;
  };
  deleteFile: (filename: string) => void;
}

const FileItem: React.FC<Props> = ({ file, deleteFile }) => {
  return (
    <>
      <li className="file-item" key={file.name}>
        <FontAwesomeIcon icon={faFileAlt} />
        <p>{file.name}</p>
        <div className="actions">
          <div className="loading"></div>
          {file.isUploading && (
            <FontAwesomeIcon
              icon={faSpinner}
              className="fa-spin"
              onClick={() => deleteFile(file.name)}
            />
          )}
          {!file.isUploading && (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteFile(file.name)}
            />
          )}
        </div>
      </li>
    </>
  );
};

export default FileItem;
