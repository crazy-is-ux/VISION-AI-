export type Message = {id:number;role:'user'|'assistant';text:string};
const KEY='vision-react-chat';
export function loadChat(storage?: Pick<Storage,'getItem'>): Message[] {
  try {
    const data:unknown=JSON.parse((storage??localStorage).getItem(KEY)||'[]');
    if(!Array.isArray(data))return [];
    return data.filter((m):m is Message=>!!m && typeof m==='object' && Number.isFinite(m.id) && ['user','assistant'].includes(m.role) && typeof m.text==='string').slice(-80);
  } catch {return [];}
}
export function saveChat(messages:Message[],storage?:Pick<Storage,'setItem'>):boolean {
  try{(storage??localStorage).setItem(KEY,JSON.stringify(messages.slice(-80)));return true;}catch{return false;}
}
