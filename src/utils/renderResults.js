/**
 * Renders detection results on a canvas.
 * 
 * @param {HTMLCanvasElement} canvas The canvas element to draw on.
 * @param {Object[]} detections Array of detection objects from postprocessing.
 * @param {String[]} labels Array of class labels corresponding to class indices.
 */
export const renderDetectionResults = (canvas, detections, labels) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

    detections.forEach(detection => {
        const [x, y, width, height] = detection.bbox;
        const label = labels[detection.class];
        const score = detection.score.toFixed(2);

        // Draw bounding box
        ctx.strokeStyle = '#00FF00'; // Green color for bounding box
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);

        // Draw label background
        ctx.fillStyle = '#00FF00'; // Green color for label background
        const textWidth = ctx.measureText(`${label}: ${score}`).width;
        const textHeight = parseInt(ctx.font, 10); // Extract font size
        ctx.fillRect(x, y - textHeight - 4, textWidth + 4, textHeight + 4);

        // Draw label text
        ctx.fillStyle = '#000000'; // Black color for text
        ctx.fillText(`${label}: ${score}`, x, y - 2);
    });
};
