import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {create,act} from 'react-test-renderer';
import {useVoice} from '../src/hooks/useVoice.ts';
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
globalThis.requestAnimationFrame=()=>1;
globalThis.cancelAnimationFrame=()=>{};
globalThis.alert=()=>{};
class Context {
 resume(){return Promise.resolve()}
 close(){return Promise.resolve()}
 createMediaStreamSource(){return {connect(){}}}
 createAnalyser(){return {frequencyBinCount:2,getByteFrequencyData(data){data.fill(50)}}}
}
globalThis.AudioContext=Context;
function setup(getUserMedia){Object.defineProperty(globalThis,'navigator',{configurable:true,value:{mediaDevices:{getUserMedia}}})}
function stream(){const track={enabled:true,stopped:false,stop(){this.stopped=true}};return {track,getTracks:()=>[track],getAudioTracks:()=>[track]}}
let api;
function Harness(){api=useVoice();return null}
test('pause disables tracks, resume enables them, exit releases microphone',async()=>{
 const s=stream();setup(async()=>s);let root;
 await act(async()=>{root=create(React.createElement(Harness))});
 await act(async()=>{await api.startVoice()});assert.equal(api.voiceState,'listening');
 await act(async()=>api.toggleVoice());assert.equal(s.track.enabled,false);assert.equal(api.voiceState,'paused');
 await act(async()=>api.toggleVoice());assert.equal(s.track.enabled,true);
 await act(async()=>api.endVoice());assert.equal(s.track.stopped,true);assert.equal(api.voiceState,'idle');
 await act(async()=>root.unmount());
});
test('permission resolving after exit is released and cannot restart recording',async()=>{
 const s=stream();let resolve;setup(()=>new Promise(r=>resolve=r));let root,pending;
 await act(async()=>{root=create(React.createElement(Harness))});
 await act(async()=>{pending=api.startVoice()});
 await act(async()=>api.endVoice());
 await act(async()=>{resolve(s);await pending});assert.equal(s.track.stopped,true);assert.equal(api.voiceState,'idle');
 await act(async()=>root.unmount());
});
test('double start requests only one microphone stream and unmount stops it',async()=>{
 const s=stream();let calls=0;setup(async()=>{calls++;return s});let root;
 await act(async()=>{root=create(React.createElement(Harness))});
 await act(async()=>{await Promise.all([api.startVoice(),api.startVoice()])});assert.equal(calls,1);
 await act(async()=>root.unmount());assert.equal(s.track.stopped,true);
});
