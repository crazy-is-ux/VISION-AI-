/** A synchronous lock and generation token prevent overlapping and stale updates. */
export class StreamSession {
  private generation=0;
  private running=false;
  begin():number|null {if(this.running)return null;this.running=true;return ++this.generation;}
  active(token:number):boolean{return this.running&&token===this.generation;}
  finish(token:number):boolean{if(!this.active(token))return false;this.running=false;return true;}
  cancel():void{this.generation++;this.running=false;}
}
