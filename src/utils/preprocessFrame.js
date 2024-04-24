import * as tf from '@tensorflow/tfjs';

/**
 * Preprocess a video frame before feeding it into the YOLOv8 model.
 * 
 * @param {HTMLVideoElement} videoElement - The video element capturing the live camera feed.
 * @param {number[]} modelInputShape - The expected input shape of the model [height, width].
 * @returns {tf.Tensor} The preprocessed video frame as a tensor.
 */
export const preprocessFrame = (videoElement, modelInputShape) => {
  const [height, width] = modelInputShape;

  return tf.tidy(() => {
    // Convert the video frame to a tensor
    let tensor = tf.browser.fromPixels(videoElement);

    // Resize to the expected shape
    tensor = tf.image.resizeBilinear(tensor, [height, width]);

    // Normalize the pixel values to be between 0 and 1
    tensor = tensor.div(255.0);

    // Add a batch dimension
    tensor = tensor.expandDims(0);

    return tensor;
  });
};
