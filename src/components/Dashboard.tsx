import {useState} from 'react';
import '../dashboard.css';
type Destination='home'|'chat'|'voice'|'images'|'projects'|'devices'|'settings';
export default function Dashboard({onNavigate,onSend}:{onNavigate:(page:Destination)=>void;onSend:(text:string)=>void}){
 const [prompt,setPrompt]=useState('');
 const actions=[['▦','Planen','Hilf mir, meinen Tag zu planen'],['📖','Lernen','Hilf mir beim Lernen'],['🎓','Erklären','Erkläre mir ein Thema'],['✎','Schreiben','Hilf mir beim Schreiben'],['💡','Erstellen','Hilf mir, eine Idee zu entwickeln'],['◭','Analysieren','Hilf mir, mein Projekt zu analysieren']];
 return <div className="dashboard">
  <div className="dash-grid">
   <aside className="dash-side">
    <nav className="glass dash-card dash-nav" aria-label="Dashboard Navigation">
     {([['home','⌂','Home'],['chat','◎','Chat'],['projects','▦','Projekte'],['images','✦','Bildstudio'],['voice','◉','Sprache'],['settings','⚙','Einstellungen']] as const).map(([page,icon,label])=><button key={page} onClick={()=>onNavigate(page)}><span>{icon}</span>{label}</button>)}
    </nav>
    <section className="glass dash-card"><h2>VISION WORLD</h2><div className="dash-globe">◎</div><p>Entdecken. Planen. Erleben.</p><small>Live-Daten noch nicht verbunden</small></section>
    <button className="glass dash-card" onClick={()=>onNavigate('voice')}><h2>KI ASSISTENT</h2><div className="dash-wave">▂ ▆ ▃ ▇ ▄ ▂ ▅ ▇ ▂ ▄</div><p>Sprachmodus öffnen</p><small>Mikrofon erst nach deinem Start</small></button>
   </aside>
   <section className="dash-center">
    <div className="dash-hero"><div className="dash-orbit"/><div className="dash-orbit second"/><img src={`${import.meta.env.BASE_URL}crystal.svg`} alt="Facettierter violetter VISION Kristall"/></div>
    <h1 className="title">VISION AI</h1><p className="dash-tagline">DEIN LEBEN. INTELLIGENTER.</p>
    <form className="dash-search" onSubmit={e=>{e.preventDefault();if(prompt.trim())onSend(prompt)}}><input aria-label="Nachricht an VISION" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Was kann ich heute für dich tun?"/><button type="button" onClick={()=>onNavigate('voice')} aria-label="Sprachmodus öffnen">◉</button><button type="submit" aria-label="Nachricht senden">➜</button></form>
    <div className="dash-actions">{actions.map(([icon,label,text])=><button key={label} onClick={()=>onSend(text)}><span>{icon}</span>{label}</button>)}</div>
    <div className="dash-platform"/><p className="dash-note">Demo-Modus · Noch keine echte KI verbunden</p>
   </section>
   <aside className="dash-side">
    <button className="glass dash-card" onClick={()=>onNavigate('devices')}><h2>VISION DEVICES</h2><div className="dash-devices"><span>▯</span><span>▱</span><span>▢</span></div><p>Eine neue Generation.</p><small>Geräte noch nicht verbunden →</small></button>
    <section className="glass dash-card"><h2>DEINE PROJEKTE</h2><p>Beispiel-Arbeitsbereiche</p>{['Lernplan','Fitness','Reisen','VISION'].map(name=><button className="dash-project" key={name} onClick={()=>onNavigate('projects')}><span>◈ {name}</span><span>Öffnen →</span></button>)}</section>
    <section className="glass dash-card"><h2>☁ VISION CLOUD</h2><p>Platz für deine Projekte.</p><small>Cloud-Speicherung noch nicht verbunden</small></section>
   </aside>
  </div>
 </div>
}
