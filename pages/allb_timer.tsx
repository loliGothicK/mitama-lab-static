import MitamaLab from "../layouts/MitamaLab";
import {Container} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";

const useAnimationFrame = (isRunning: boolean, callback = () => {}) => {
  const reqIdRef = useRef(0);
  const loop = useCallback(() => {
    callback();
  }, [callback]);
  
  useEffect(() => {
    setInterval(() => {
      console.log(`isRunning: ${isRunning}`);
      if (isRunning) {
        reqIdRef.current = requestAnimationFrame(loop);
      }
    }, 1000);
    return () => cancelAnimationFrame(reqIdRef.current);
  }, [isRunning, loop]);
};

const TimerComponent = () => {
  const [counter, setCounter] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  
  const countDown = useCallback(() => {
    setCounter(prevCount => --prevCount);
  }, []);
  useAnimationFrame(isRunning, countDown);
  
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setIsRunning(true)}>START</button>
      <button onClick={() => setIsRunning(false)}>STOP</button>
    </div>
  );
};
export default function Timer() {
  return (
    <MitamaLab>
      <Container maxWidth={'lg'}>
        <TimerComponent />
      </Container>
    </MitamaLab>
  );
}
