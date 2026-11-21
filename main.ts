import{readFileSync as a,writeFileSync as b,mkdirSync as c}from"node:fs";
let w,C,C0,G,A,V=[],U=[],P=[],s=0,D,L='udlr';
const R=(f,Y,t)=>{t=t||++s;Y[f]=t;let l=f;for(let d of D){let q=f+d;if(!C[q]&&Y[q]!=t){P[q]=f;let z=R(q,Y,t);if(z<l)l=z}}return l};
const X=(bx,pl)=>{
C=C0.slice();
for(let o of A)if(o)for(let b of o)C[b]=1;
let Bs=[[bx,pl,'']],M=new Set([R(pl,V)+':'+bx]);
for(let h=0;h<Bs.length&&h<1e6;h++){
let bs=Bs[h][0];pl=Bs[h][1];
for(let b of bs)C[b]=1;
R(pl,V);let r=s;
for(let b of bs){
for(let k=0;k<4;k++){let t=b+D[k],q=b-D[k];
if(V[q]!=r||C[t])continue;
let a='',v=pl;R(q,U);
for(;v!=q;v=P[v])a+=L[D.indexOf(P[v]-v)];
C[b]=0;C[t]=1;
let n=bs.slice();n[bs.indexOf(b)]=t;n.sort((a,b)=>a-b);
let y=R(b,U)+':'+n;
C[t]=0;C[b]=1;
if(M.has(y))continue;
M.add(y);
let m=Bs[h][2]+a+L[k];
if(n.every(b=>G[b]))return[m,b,n];
Bs.push([n,b,m]);
}}
for(let b of bs)C[b]=0;
}
};
function F(text){
let t=text.replace(/\n/g,'');
w=text.indexOf('\n');C0=[];G=[];A=[];
let pl=-1;
for(let i=0;i<t.length;i++){let c=t[i],e='#$.*@+'.indexOf(c);C0[i]=!e;G[i]=e>1&e!=4;if(e==1|e==3){let k=10*(i/(9*w)|0)+(i%w)/7|0;(A[k]??=[]).push(i)}if(e>3)pl=i}
D=[-w,w,-1,1];
let m='';
for(let j=0;j<A.length;j++)if(A[j]){let z=X(A[j],pl);if(!z)return'';m+=z[0];pl=z[1];A[j]=z[2]}
return m;
}
for(let k=1;k<6;k++){let i="i00"+k,o="/output/"+i,m="";try{m=F(a("/input/"+i+"/level.txt","utf8"))}catch{}c(o,{recursive:true});b(o+"/solution.txt",m)}