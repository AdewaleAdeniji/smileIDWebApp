import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthFromLocalStorage } from "../utils/serverUtils";
import SmartCamera from "./components/smartCamera";
import { upload_selfie, upload_smile_images } from "../services/api/app";
import ReactJson from "react-json-view";

export interface SmileImage {
  image_type_id: number;
  image: string;
}
export type SmileImages = SmileImage[];

const AppPage = () => {
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const [logs, setLogs] = useState<any[]>([]);
  const [smileImages, setSmileImages] = useState<SmileImages>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>({});
  const [responseImages, setResponseImages] = useState<any[]>([]);
  const user = getAuthFromLocalStorage();
  console.log(user);
  const AddToLog = (log: any) => {
    const newLog = { log, time: new Date().toLocaleTimeString() };
    const newLogArray = [...logs, newLog];
    //newLogArray.push(newLog);
    setLogs([...newLogArray]);
  };
  useEffect(() => {
    AddToLog("App opened");
  }, []);
  const handleImages = async (images: SmileImages) => {
    console.log(images);
    AddToLog("Images received from smileid component");
    AddToLog(`${images.length}  images received`);
    setSmileImages(images);
    AddToLog(`Images added to state`);
    // calll upload endpoint
  };
  const handleUpload = async () => {
    // upload file first, then the images

    if (smileImages.length === 0) {
      return setMessage({
        type: "error",
        text: "Livesness images not captured",
      });
    }
    setLoading(true);
    AddToLog("Uploading liveness photos");
    try {
      console.log(smileImages);
      const upload = await upload_smile_images(smileImages);
      console.log(upload);
      setResult(upload?.result);
      setResponseImages(upload?.images);
      AddToLog("liveness images uploaded");
      setMessage({
        type: "success",
        text: "liveness File uploaded",
      });
    } catch (err: any) {
      AddToLog("liveness  images upload failed");
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Selfie File upload failed",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSelfUpload = async (e: any) => {
    if (e.target.files && e.target.files.length === 0) {
      return;
    }
    AddToLog("Uploading self photo");
    const file = e.target.files[0];
    const formdata = new FormData();
    //getBase64(file);
    formdata.append("file", file, file?.name);
    try {
      const upload = await upload_selfie(formdata);
      console.log(upload.result);
      AddToLog("self File uploaded");
      setMessage({
        type: "success",
        text: "self File uploaded",
      });
    } catch (err: any) {
      console.log(err);
      AddToLog("file upload failed");
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "File upload failed",
      });
    }
  };
  function getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  return (
    <div className="page">
      <div className="page-content">
        <h1>App</h1>
        <p>Upload photo and take liveness check</p>
        <div className="form">
          <input type="file" onChange={handleSelfUpload} />
        </div>
        <SmartCamera
          handleImages={handleImages}
          logger={AddToLog}
        ></SmartCamera>
        <br />
        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading" : "Upload"}
        </button>
        {result && <ReactJson src={result} />}
        {responseImages &&
          responseImages.length > 0 &&
          responseImages.map((imgString, index) => {
            return (
              <Fragment key={index}>
                <img
                  src={`data:image/png;base64,` + imgString?.image}
                  alt="response"
                  style={{ width: "150px", margin: "10px" }}
                />
                {imgString.image_type_id}
              </Fragment>
            );
          })}
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
        <br />
        <div className="signup-link">
          <Link to="/login"> &nbsp; Logout!</Link>
        </div>
      </div>
      <div className="log-box">
        <h3>Logs</h3>
        <div className="logs">
          {logs.map((log, index) => {
            return (
              <div className="log" key={index}>
                <span className="logd">{log.log}</span>
                <span className="time">{log.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AppPage;
