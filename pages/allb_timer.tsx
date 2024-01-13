import MitamaLab from "../layouts/MitamaLab";
import {Card, Divider, Box, Stack, Typography, Grid} from "@mui/material";
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
  } else {
    for (const voice of speechSynthesis.getVoices()) {
      if (voice.lang === props.lang) {
        utterance.voice = voice;
        break;
      }
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

const TimerComponent = ({ interval }: {interval: number}) => {
  const [counter, setCounter] = useState(interval);
  const [isRunning, setIsRunning] = useState(false);
  
  const countDown = useCallback(() => {
    setCounter(prevCount => {
      if (prevCount-1 === 30) {
        playTextToSpeech({ text: "残り30秒です", lang: "ja-JP"} satisfies TextToSpeechInput);
      }
      if (prevCount-1 === 10) {
        playTextToSpeech({ text: "10 seconds left.", lang: "en-US" } satisfies TextToSpeechInput);
      }
      if (prevCount-1 === 0) {
        setIsRunning(false);
        return interval;
      }
      return --prevCount;
    });
  }, [interval]);
  useAnimationFrame(isRunning, countDown);
  
  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant={"h4"}>{counter}</Typography>
      </Box>
      <Divider light />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <button onClick={() => setIsRunning(true)}>START</button>
          <button onClick={() => setIsRunning(false)}>STOP</button>
          <button onClick={() => {
            setCounter(interval);
            setIsRunning(false);
          }}>
            RESET
          </button>
        </Stack>
      </Box>
    </Card>
  );
};
export default function Timer() {
  return (
    <MitamaLab>
      <Grid container alignItems='center' justifyContent='center' direction="column">
        <Divider textAlign="left">属性ロング</Divider>
        <TimerComponent interval={120}/>
        <Divider textAlign="left">盾</Divider>
        <TimerComponent interval={100}/>
        <Divider textAlign="left">鉄壁/覚醒/覚妨</Divider>
        <TimerComponent interval={90}/>
        <Divider textAlign="left">魔縮/祝福</Divider>
        <TimerComponent interval={80}/>
        <Divider textAlign="left">属性ショート</Divider>
        <TimerComponent interval={60}/>
      </Grid>
    </MitamaLab>
  );
}
