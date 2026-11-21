import{readFileSync as a,writeFileSync as b,mkdirSync as c}from"node:fs";
let w,S,W,G,Q,Rs,V,U,T,P,s=0,D;
const R=(f,O,A)=>{let l=f,n=0;T[n++]=f;A[f]=++s;while(n){let p=T[--n];if(p<l)l=p;for(let i=0;i<4;i++){let q=p+D[i];if(!W[q]&&!O[q]&&A[q]!=s){A[q]=s;P[q]=p;T[n++]=q}}}return l};
const X=(bx,pl)=>{
let O=new Uint8Array(S),Bs=[bx],Z=[pl],M=new Set;
for(let b of bx)O[b]=1;
let y=R(pl,O,V);for(let x of bx)y=y*S+x;M.add(y);
let f=-1;
for(let h=0;f<0&&h<Bs.length;h++){
let bs=Bs[h];
for(let b of bs)O[b]=1;
R(Z[h]&255,O,V);
let r=s;
for(let i=0;i<bs.length&&f<0;i++){
let b=bs[i];
for(let k=0;k<4;k++){
let t=b+D[k];
if(V[b-D[k]]!=r||W[t]||O[t]||!G[t]&&(W[t-w]||W[t+w])&&(W[t-1]||W[t+1]))continue;
O[b]=0;O[t]=1;
let n=bs.slice();n[i]=t;n.sort((x,y)=>x-y);
let y=R(b,O,U);for(let x of n)y=y*S+x;
O[t]=0;O[b]=1;
if(M.has(y))continue;
if(Bs.length>1e6)return 0;
M.add(y);Bs.push(n);Z.push(b+(k<<8)+(h<<10));
if(n.every(b=>G[b])){f=Bs.length-1;break}
}}
for(let b of bs)O[b]=0;
}
if(f<0)return 0;
let p=[];
for(let j=f;j>0;j=Z[j]>>10)p.unshift(j);
let m='',cur=bx;
for(let j of p){
let n=Bs[j],z=Z[j],u=z&255,k=(z>>8)&3;
for(let b of cur)O[b]=1;
R(pl,O,V);
let a='';
for(let q=u-D[k];q!=pl;q=P[q])a='udlr'[D.indexOf(q-P[q])]+a;
m+=a;
for(let b of cur)O[b]=0;
m+='udlr'[k];
pl=u;cur=n;
}
return[m,pl];
};
const C=i=>((i/w|0)>8)*10+((i%w)/7|0);
const N=()=>{let A={};for(let i=0;i<S;i++){let b=Q.includes(i);if(!b&&!G[i])continue;let k=C(i),a=A[k]=A[k]||[[],[]];if(b)a[0].push(i);if(G[i])a[1].push(i)}return Object.values(A)};
const J=(r,v)=>{for(let o of Rs)if(o!==r)for(let b of o[0])W[b]=v};
function F(text){
let t=text.replace(/\n/g,'');
w=text.indexOf('\n');
S=t.length;W=new Uint8Array(S).fill(1);G=new Uint8Array(S);Q=[];
let pl=-1;
for(let i=0;i<S;i++){let c=t[i];if(c!='#')W[i]=0;G[i]='.*+'.includes(c);if('$*'.includes(c))Q.push(i);if('@+'.includes(c))pl=i}
D=[-w,w,-1,1];
V=new Int32Array(S);U=new Int32Array(S);T=new Int32Array(S);P=new Int32Array(S);
Rs=N();
let m='';
for(let r of Rs){
J(r,1);
let z=X(r[0],pl);
J(r,0);
if(!z)return'';
m+=z[0];pl=z[1];r[0]=r[1];
}
return m;
}
for(let k=1;k<6;k++){let i="i00"+k,m="";try{m=F(a("/input/"+i+"/level.txt","utf8"))}catch{}c("/output/"+i,{recursive:true});b("/output/"+i+"/solution.txt",m)}
