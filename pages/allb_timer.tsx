import MitamaLab from "../layouts/MitamaLab";
import {Container} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";

interface TextToSpeechInput {
  text: string;
  lang: "en-US" | "ja-JP"; // ISO 639-1コードの形式
  speed?: number; // 範囲: 0.1 ~ 10
  pitch?: number; // 範囲: 0.1 ~ 10
  volume?: number; // 範囲: 0 ~ 1
  voiceName?: string; // 使用する音声の種類
}

/**
 * 特定の文字をしゃべらせる
 * @param props
 */
export const playTextToSpeech = (props: TextToSpeechInput) => {
  const utterance = new SpeechSynthesisUtterance(props.text);
  utterance.rate = props.speed? props.speed: 1;
  if (props.voiceName){
    if (
      speechSynthesis.getVoices().find(
        (voice) => voice.name === props.voiceName)
    ){
      utterance.voice = speechSynthesis.getVoices().find(
        (voice) => voice.name === props.voiceName
      ) as SpeechSynthesisVoice
    }
  }
  utterance.pitch = (props.pitch)? props.pitch: 1;
  utterance.volume = (props.volume)? props.volume: 1;
  speechSynthesis.speak(utterance);
}
const useAnimationFrame = (isRunning: boolean, callback = () => {}) => {
  const reqIdRef = useRef(0);
  const loop = useCallback(() => {
    callback();
  }, [callback]);
  
  useEffect(() => {
    const id = setInterval(() => {
      if (isRunning) {
        reqIdRef.current = requestAnimationFrame(loop);
      }
    }, 1000);

    return () => {
      clearInterval(id)
      cancelAnimationFrame(reqIdRef.current)
    };
  }, [isRunning, loop]);
};

const TimerComponent = () => {
  const [counter, setCounter] = useState(40);
  const [isRunning, setIsRunning] = useState(false);
  
  const countDown = useCallback(() => {
    setCounter(prevCount => {
      if (prevCount-1 === 30) {
        playTextToSpeech({ text: "30 seconds left.", lang: "en-US"} satisfies TextToSpeechInput);
      }
      if (prevCount-1 === 10) {
        playTextToSpeech({ text: "10 seconds left.", lang: "en-US" } satisfies TextToSpeechInput);
      }
      if (prevCount-1 === 0) {
        setIsRunning(false);
        return 30;
      }
      return --prevCount;
    });
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
