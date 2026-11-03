import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loadChat,saveChat} from '../src/lib/chatStorage.ts';
import {StreamSession} from '../src/lib/streamSession.ts';
test('invalid storage cannot break chat rendering',()=>{for(const value of ['{','null','{}','[null,{},42]'])assert.deepEqual(loadChat({getItem:()=>value}),[])});
test('blocked storage remains usable',()=>{assert.deepEqual(loadChat({getItem(){throw Error('denied')}}),[]);assert.equal(saveChat([],{setItem(){throw Error('full')}}),false)});
test('only valid recent messages survive',()=>{const items=Array.from({length:90},(_,id)=>({id,role:'user',text:'hello'}));const out=loadChat({getItem:()=>JSON.stringify(items)});assert.equal(out.length,80);assert.equal(out[0].id,10)});
test('rapid submit is rejected synchronously',()=>{const s=new StreamSession();assert.notEqual(s.begin(),null);assert.equal(s.begin(),null)});
test('cancelled stream cannot affect a subsequent stream',()=>{const s=new StreamSession();const old=s.begin();s.cancel();const next=s.begin();assert.equal(s.active(old),false);assert.equal(s.finish(old),false);assert.equal(s.active(next),true);assert.equal(s.finish(next),true)});
