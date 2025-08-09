import React from "react";

interface DigitalCertificateProps {
  userName: string;
  levelAchieved: string;
  completionDate: string;
}

const DigitalCertificate = React.forwardRef<
  HTMLDivElement,
  DigitalCertificateProps
>(({ userName, levelAchieved, completionDate }, ref) => {
  return (
    <div
      ref={ref}
      className="mx-auto max-w-2xl rounded-lg border-4 border-blue-800 bg-gray-50 p-8 shadow-lg"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900">
          Certificate of Achievement
        </h1>
        <p className="mt-4 text-lg text-gray-600">This certifies that</p>
        <h2 className="my-6 text-5xl font-serif font-semibold text-indigo-700">
          {userName}
        </h2>
        <p className="text-lg text-gray-600">
          has successfully completed the competency assessment and is certified
          at
        </p>
        <p className="my-4 text-3xl font-bold text-blue-900">
          Level {levelAchieved}
        </p>
        <div className="mt-8 flex items-center justify-between">
          <div className="text-left">
            <p className="text-sm font-semibold">Date of Completion</p>
            <p className="text-lg">{completionDate}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Issuing Authority</p>
            <p className="text-lg font-bold">Test_School</p>
          </div>
        </div>
      </div>
    </div>
  );
});

DigitalCertificate.displayName = "DigitalCertificate";

export default DigitalCertificate;
