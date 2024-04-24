import * as tf from '@tensorflow/tfjs';

/**
 * Run object detection using the YOLOv8 model on a preprocessed video frame.
 * 
 * @param {tf.Tensor} preprocessedFrame - The video frame preprocessed as a tensor.
 * @param {tf.GraphModel} model - The loaded TensorFlow.js model.
 * @returns {Promise<Object[]>} A promise that resolves to an array of detected objects.
 */
export const predictObjects = async (preprocessedFrame, model) => {
  try {
    // Run the model on the preprocessed frame
    const prediction = await model.predict(preprocessedFrame);

    // Process the raw prediction output to extract meaningful data
    const detectedObjects = await processPredictionOutput(prediction);
    return detectedObjects;
  } catch (error) {
    console.error('Error during model prediction:', error);
    return [];
  }
};

/**
 * Process the raw output of the YOLOv8 model to extract detection information.
 * 
 * @param {tf.Tensor|tf.Tensor[]} prediction - The raw output tensor(s) from the model.
 * @returns {Promise<Object[]>} A promise that resolves to an array of detected objects.
 */
const processPredictionOutput = async (prediction) => {
    // Example processing steps; adjust according to your model's output structure
    const [boxes, scores, classes, validDetections] = prediction;
  
    const width = videoRef.current.offsetWidth;
    const height = videoRef.current.offsetHeight;
  
    let detections = [];
    for (let i = 0; i < validDetections.dataSync()[0]; i++) {
      let bbox = boxes.dataSync().slice(i * 4, i * 4 + 4);
      let [top, left, bottom, right] = bbox;
      let score = scores.dataSync()[i];
      let classId = classes.dataSync()[i];
  
      // Convert bbox coordinates to pixels
      top = top * height;
      left = left * width;
      bottom = bottom * height;
      right = right * width;
  
      // Filter out low confidence detections and format the results
      if (score > 0.5) { // Example threshold
        detections.push({
          boundingBox: { top, left, bottom, right },
          score: score,
          classLabel: 'ClassName', // Map `classId` to actual class names as per your labels
        });
      }
    }
  
    return detections;
  };
  
