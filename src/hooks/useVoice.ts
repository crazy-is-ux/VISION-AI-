import {useEffect,useRef,useState} from 'react';
export function useVoice(){
 const [voiceState,setVoiceState]=useState<'idle'|'listening'|'paused'>('idle');
 const [level,setLevel]=useState(0);
 const generation=useRef(0),pending=useRef(false);
 const audio=useRef<{stream:MediaStream;context:AudioContext;raf:number}|null>(null);
 const release=()=>{generation.current++;pending.current=false;const a=audio.current;audio.current=null;if(a){a.stream.getTracks().forEach(t=>t.stop());cancelAnimationFrame(a.raf);void a.context.close().catch(()=>{})}};
 const endVoice=()=>{release();setLevel(0);setVoiceState('idle')};
 useEffect(()=>release,[]);
 const startVoice=async()=>{
  if(pending.current||audio.current)return;
  pending.current=true;const token=++generation.current;
  let acquired:MediaStream|undefined;let context:AudioContext|undefined;
  try{
   acquired=await navigator.mediaDevices.getUserMedia({audio:true});
   if(token!==generation.current){acquired.getTracks().forEach(t=>t.stop());return}
   context=new AudioContext();await context.resume();
   if(token!==generation.current){acquired.getTracks().forEach(t=>t.stop());void context.close();return}
   const source=context.createMediaStreamSource(acquired),analyser=context.createAnalyser();analyser.fftSize=256;source.connect(analyser);
   const data=new Uint8Array(analyser.frequencyBinCount);const state={stream:acquired,context,raf:0};audio.current=state;
   const loop=()=>{if(audio.current!==state)return;analyser.getByteFrequencyData(data);setLevel(state.stream.getAudioTracks().some(t=>t.enabled)?data.reduce((a,b)=>a+b,0)/data.length/255:0);state.raf=requestAnimationFrame(loop)};
   loop();setVoiceState('listening');
  }catch{acquired?.getTracks().forEach(t=>t.stop());if(context)void context.close().catch(()=>{});if(token===generation.current)alert('Mikrofonzugriff nicht verfügbar. Bitte prüfe deine Browserberechtigung.');}
  finally{if(token===generation.current)pending.current=false}
 };
 const toggleVoice=()=>{const a=audio.current;if(!a)return;const enabled=!a.stream.getAudioTracks().some(t=>t.enabled);a.stream.getTracks().forEach(t=>t.enabled=enabled);setVoiceState(enabled?'listening':'paused');setLevel(0)};
 return {voiceState,level,startVoice,endVoice,toggleVoice};
}
