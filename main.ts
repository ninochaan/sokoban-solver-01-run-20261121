import*as f from"node:fs";
let w,h,C,C0,G,A,V=[],P=[],D,L='udlr',R,X,F,pl,m;
R=f=>{V[f]=h;for(let d of D){let q=f+d;if(!C[q]&&V[q]!=h){P[q]=f;R(q)}}};
X=j=>{
V=[];
C=[...C0];
A.flat().map(b=>C[b]=1);
let B=[[A[j],pl,'']],M={};
for(h=0;h<1e6&&B[h];h++){
let[bs,p,u]=B[h],y;
bs.map(b=>C[b]=1);
R(p);
for(let b of bs)for(let k in D){let t=b+D[k],q=2*b-t;
if(V[q]!=h||C[t])continue;
let n=bs.map(x=>x-b?x:t);n.sort();
if(M[y=b+':'+n])continue;
M[y]=1;
let a='',v=q;
for(;v-p;v=P[v])a=L[D.indexOf(v-P[v])]+a;
a=u+a+L[k];
if(n.every(b=>G[b])){m+=a;pl=b;A[j]=n;return 1}
B.push([n,b,a]);
}
bs.map(b=>C[b]=0);
}
};
F=t=>{
w=t.indexOf('\n')+1;C0=[];G=[];A=[];m='';
[...t].map((c,i)=>{let e='\n#$.*@+'.indexOf(c);C0[i]=!e|e==1;G[i]=e>2&e!=5;if(e>4)pl=i;if(e==2|e==4){let k=(i>9*w-1)*10+i%w/7|0;(A[k]??=[]).push(i)}});
D=[-w,w,-1,1];
for(let j in A)if(!X(j))return'';
return m;
};for(let k=1,o;k<6;k++)o="/output/i00"+k,f.mkdirSync(o,{recursive:!0}),f.writeFileSync(o+"/solution.txt",F(""+f.readFileSync("/input/i00"+k+"/level.txt")))