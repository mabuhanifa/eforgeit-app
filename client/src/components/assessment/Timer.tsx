import { useEffect, useState } from "react";

interface TimerProps {
  endTime: Date;
  onTimeUp: () => void;
}

const Timer = ({ endTime, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("00:00");
        onTimeUp();
        return;
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onTimeUp]);

  return (
    <div className="rounded-lg bg-red-100 px-4 py-2 text-center font-mono text-2xl font-bold text-red-700">
      {timeLeft}
    </div>
  );
};

export default Timer;
