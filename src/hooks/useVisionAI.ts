import {useEffect,useRef,useState} from 'react';
import {StreamSession} from '../lib/streamSession';
export function useVisionAI(){
 const [busy,setBusy]=useState(false);
 const session=useRef(new StreamSession());
 useEffect(()=>()=>session.current.cancel(),[]);
 const stop=()=>{session.current.cancel();setBusy(false)};
 const stream=async(prompt:string,start:()=>void,update:(text:string)=>void)=>{
   const token=session.current.begin();if(token===null)return;
   setBusy(true);
   try{
     start();
     const response='VISION läuft im Demo-Modus. Deine Nachricht „'+prompt.slice(0,100)+'“ wurde empfangen. Eine echte KI ist noch nicht verbunden.';
     let text='';
     for(const word of response.split(' ')){
       if(!session.current.active(token))return;
       text+=word+' ';update(text);
       await new Promise(resolve=>setTimeout(resolve,30));
     }
   }finally{if(session.current.finish(token))setBusy(false)}
 };
 return {busy,stream,stop};
}
