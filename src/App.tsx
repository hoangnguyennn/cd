import { FC, useEffect, useState } from 'react';

import { time2Seconds, seconds2Display } from './utils/converter';

const App: FC = () => {
  const [hours, setHours] = useState('0');
  const [mins, setMins] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [time, setTime] = useState<number>();
  const [intervalValue, setIntervalValue] = useState<NodeJS.Timeout>();
  const [isPause, setIsPause] = useState<boolean>();
  const [isRunning, setIsRunning] = useState<boolean>();

  const handleStartButton = () => {
    const secs = time2Seconds(Number(hours), Number(mins), Number(seconds));
    console.log(secs);
    if (!isRunning && secs) {
      console.log('start');
      setTime(secs);
      setIsRunning(true);
      setIsPause(false);
      makeIntervalue();
    }
  };

  const handlePauseButton = () => {
    if (intervalValue && !isPause) {
      console.log('pause');
      clearInterval(intervalValue);
      setIntervalValue(undefined);
      setIsPause(true);
    }
  };

  const handleResumeButton = () => {
    if (isPause) {
      console.log('resume');
      makeIntervalue();
      setIsPause(false);
    }
  };

  const handleResetButton = () => {
    if (isRunning) {
      console.log('reset');
      setIsRunning(undefined);
      setIsPause(undefined);
      setHours('0');
      setMins('0');
      setSeconds('0');
      setTime(undefined);
      if (intervalValue) {
        clearInterval(intervalValue);
      }
    }
  };

  const makeIntervalue = () => {
    const timeId = setInterval(
      () => setTime((time) => (time ? time - 1 : undefined)),
      1000
    );

    setIntervalValue(timeId);
  };

  const renderPauseAndResumeButton = () => {
    switch (isPause) {
      case true:
        return <button onClick={handleResumeButton}>Resume</button>;
      case false:
        return <button onClick={handlePauseButton}>Pause</button>;
      default:
        return null;
    }
  };

  const renderStartAndResetButton = () => {
    switch (isRunning) {
      case true:
        return <button onClick={handleResetButton}>Reset</button>;
      default:
        return <button onClick={handleStartButton}>Start</button>;
    }
  };

  useEffect(() => {
    if (time === undefined) {
      return;
    }
    if (time <= 0 && intervalValue) {
      clearInterval(intervalValue);
      alert('timeout');
      setIsRunning(false);
      setIsPause(undefined);
    }
  }, [time, intervalValue]);

  return (
    <div className="content">
      <div className="input-wrapper">
        <select value={hours} onChange={(e) => setHours(e.target.value)}>
          {Array.from(new Array(24)).map((value, index) => (
            <option value={index} key={`hour_${index}`}>
              {index}
            </option>
          ))}
        </select>
        <select value={mins} onChange={(e) => setMins(e.target.value)}>
          {Array.from(new Array(60)).map((value, index) => (
            <option value={index} key={`min_${index}`}>
              {index}
            </option>
          ))}
        </select>
        <select value={seconds} onChange={(e) => setSeconds(e.target.value)}>
          {Array.from(new Array(60)).map((value, index) => (
            <option value={index} key={`sec_${index}`}>
              {index}
            </option>
          ))}
        </select>
      </div>
      <div className="actions">
        {renderStartAndResetButton()}
        {renderPauseAndResumeButton()}
      </div>
      <div className="display-countdown">
        Countdown: <span>{seconds2Display(time)}</span>
      </div>
    </div>
  );
};

export default App;
