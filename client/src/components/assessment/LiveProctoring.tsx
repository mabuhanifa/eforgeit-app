import Webcam from "react-webcam";

const LiveProctoring = () => {
  return (
    <div className="fixed bottom-4 right-4 z-10 h-32 w-48 overflow-hidden rounded-lg border-2 border-gray-300 shadow-lg">
      <Webcam
        audio={false}
        width={192}
        height={128}
        className="h-full w-full object-cover"
        mirrored={true}
      />
    </div>
  );
};

export default LiveProctoring;
