export class Webcam {
  open = (videoRef) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment",
            
          },
        })
        .then((stream) => {
          videoRef.srcObject = stream;
          // Inside your open function
videoRef.srcObject = stream;
videoRef.style.position = 'absolute';
videoRef.style.top = '0';

videoRef.style.width = 'calc(100vw )'; // Full viewport width minus sidebar width
videoRef.style.height = '100vh';
videoRef.style.objectFit = 'cover';

        })
        .catch((err) => {
          console.error("Error accessing the webcam: ", err);
          alert("Error accessing the webcam: " + err.message);
        });
    } else {
      alert("Webcam is not supported by your browser!");
    }
  };

  close = (videoRef) => {
    if (videoRef.srcObject) {
      videoRef.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.srcObject = null;
    } else {
      alert("Webcam was not open!");
    }
  };
}
