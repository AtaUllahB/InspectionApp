import * as tf from '@tensorflow/tfjs';

/**
 * Filters detections based on confidence threshold and performs Non-Maximum Suppression (NMS).
 * 
 * @param {tf.Tensor} boxes Tensor of shape [num_detections, 4] for bounding box coordinates.
 * @param {tf.Tensor} scores Tensor of shape [num_detections] for confidence scores.
 * @param {tf.Tensor} classes Tensor of shape [num_detections] for class indices.
 * @param {Number} scoreThreshold Confidence score threshold for filtering detections.
 * @returns {Promise<Object[]>} Processed detections after applying threshold and NMS.
 */
export const postprocessDetections = async (boxes, scores, classes, scoreThreshold = 0.5) => {
    // Apply threshold to filter detections
    const indices = tf.where(tf.greater(scores, tf.scalar(scoreThreshold)));
    const filteredScores = tf.gather(scores, indices).squeeze();
    const filteredBoxes = tf.gather(boxes, indices).squeeze();
    const filteredClasses = tf.gather(classes, indices).squeeze();

    // Perform Non-Maximum Suppression (NMS)
    const nmsIndices = await tf.image.nonMaxSuppressionAsync(filteredBoxes, filteredScores, 20, 0.5, scoreThreshold);

    // Gather detections after NMS
    const nmsScores = tf.gather(filteredScores, nmsIndices).dataSync();
    const nmsBoxes = tf.gather(filteredBoxes, nmsIndices).dataSync();
    const nmsClasses = tf.gather(filteredClasses, nmsIndices).dataSync();

    // Format the detections for rendering
    const detections = Array.from(nmsIndices.dataSync()).map((index) => ({
        bbox: nmsBoxes.slice(index * 4, index * 4 + 4),
        score: nmsScores[index],
        class: nmsClasses[index],
    }));

    // Cleanup tensors
    tf.dispose([indices, filteredScores, filteredBoxes, filteredClasses, nmsIndices]);

    return detections;
};
