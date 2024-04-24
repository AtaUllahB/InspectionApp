import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import { detect, detectVideo } from "../utils/detect";

import { Webcam } from "../utils/webcam";


const webcam = new Webcam(); // webcam handler  

const App = () => {
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  // references

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  // model configs
  const modelName = "yolov8s";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.href}/${modelName}_web_model/model.json`,

      ); // load model

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      }); // set model & input shape

      tf.dispose([warmupResults, dummyInput]); // cleanup memory

      webcam.open(cameraRef.current);
    });
  }, [webcam]);

  return (
    <div className="App">
      <div className="header">
        <h1>Quality Inspection of Cabin</h1>

      </div>

      <div className="content">

        <video
          autoPlay
          muted
          ref={cameraRef}
          style={{ display: "block" }} // Ensure video is displayed
          onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current)}
        />

        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
      </div>


    </div>
  );
};

export default App;