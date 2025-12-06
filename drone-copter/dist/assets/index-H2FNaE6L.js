(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pu="170",eg=0,xd=1,tg=2,mf=1,Du=2,pi=3,bi=0,ln=1,_t=2,Vi=0,rr=1,yd=2,vd=3,Sd=4,ng=5,fs=100,ig=101,sg=102,rg=103,og=104,ag=200,lg=201,cg=202,ug=203,fc=204,pc=205,dg=206,hg=207,fg=208,pg=209,mg=210,gg=211,_g=212,xg=213,yg=214,mc=0,gc=1,_c=2,xr=3,xc=4,yc=5,vc=6,Sc=7,gf=0,vg=1,Sg=2,Hi=0,Mg=1,Tg=2,bg=3,Eg=4,wg=5,Ag=6,Rg=7,Md="attached",Cg="detached",_f=300,yr=301,vr=302,Mc=303,Tc=304,cl=306,Sr=1e3,Fi=1001,Pa=1002,$t=1003,xf=1004,no=1005,Tt=1006,ya=1007,vi=1008,Ei=1009,yf=1010,vf=1011,mo=1012,Lu=1013,As=1014,zn=1015,Ro=1016,Iu=1017,Uu=1018,Mr=1020,Sf=35902,Mf=1021,Tf=1022,bn=1023,bf=1024,Ef=1025,or=1026,Tr=1027,Nu=1028,Fu=1029,wf=1030,Ou=1031,Bu=1033,va=33776,Sa=33777,Ma=33778,Ta=33779,bc=35840,Ec=35841,wc=35842,Ac=35843,Rc=36196,Cc=37492,Pc=37496,Dc=37808,Lc=37809,Ic=37810,Uc=37811,Nc=37812,Fc=37813,Oc=37814,Bc=37815,kc=37816,zc=37817,Vc=37818,Hc=37819,Gc=37820,Wc=37821,ba=36492,Xc=36494,qc=36495,Af=36283,Yc=36284,jc=36285,Kc=36286,go=2300,_o=2301,Ml=2302,Td=2400,bd=2401,Ed=2402,Pg=2500,Dg=0,Rf=1,$c=2,Lg=3200,Ig=3201,Cf=0,Ug=1,Ni="",zt="srgb",Zt="srgb-linear",ul="linear",lt="srgb",Ls=7680,wd=519,Ng=512,Fg=513,Og=514,Pf=515,Bg=516,kg=517,zg=518,Vg=519,Zc=35044,Ad="300 es",Si=2e3,Da=2001;class Fr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Rd=1234567;const oo=Math.PI/180,br=180/Math.PI;function Hn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function Xt(i,e,t){return Math.max(e,Math.min(t,i))}function ku(i,e){return(i%e+e)%e}function Hg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Gg(i,e,t){return i!==e?(t-i)/(e-i):0}function ao(i,e,t){return(1-t)*i+t*e}function Wg(i,e,t,n){return ao(i,e,1-Math.exp(-t*n))}function Xg(i,e=1){return e-Math.abs(ku(i,e*2)-e)}function qg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Yg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function jg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Kg(i,e){return i+Math.random()*(e-i)}function $g(i){return i*(.5-Math.random())}function Zg(i){i!==void 0&&(Rd=i);let e=Rd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qg(i){return i*oo}function Jg(i){return i*br}function e0(i){return(i&i-1)===0&&i!==0}function t0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function n0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function i0(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),d=r((e-n)/2),h=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,l*d,l*h,a*c);break;case"YZY":i.set(l*h,a*u,l*d,a*c);break;case"ZXZ":i.set(l*d,l*h,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*p,a*c);break;case"YXY":i.set(l*p,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const s0={DEG2RAD:oo,RAD2DEG:br,generateUUID:Hn,clamp:Xt,euclideanModulo:ku,mapLinear:Hg,inverseLerp:Gg,lerp:ao,damp:Wg,pingpong:Xg,smoothstep:qg,smootherstep:Yg,randInt:jg,randFloat:Kg,randFloatSpread:$g,seededRandom:Zg,degToRad:Qg,radToDeg:Jg,isPowerOfTwo:e0,ceilPowerOfTwo:t0,floorPowerOfTwo:n0,setQuaternionFromProperEuler:i0,normalize:rt,denormalize:Bn};class je{constructor(e=0,t=0){je.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,n,s,r,o,a,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],M=s[1],E=s[4],x=s[7],D=s[2],R=s[5],w=s[8];return r[0]=o*_+a*M+l*D,r[3]=o*m+a*E+l*R,r[6]=o*f+a*x+l*w,r[1]=c*_+u*M+d*D,r[4]=c*m+u*E+d*R,r[7]=c*f+u*x+d*w,r[2]=h*_+p*M+g*D,r[5]=h*m+p*E+g*R,r[8]=h*f+p*x+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*r,p=c*r-o*l,g=t*d+n*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*c-u*n)*_,e[2]=(a*n-s*o)*_,e[3]=h*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Tl.makeScale(e,t)),this}rotate(e){return this.premultiply(Tl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Tl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Tl=new ke;function Df(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function r0(){const i=xo("canvas");return i.style.display="block",i}const Cd={};function io(i){i in Cd||(Cd[i]=!0,console.warn(i))}function o0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function a0(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function l0(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ye={enabled:!0,workingColorSpace:Zt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===lt&&(i.r=Ti(i.r),i.g=Ti(i.g),i.b=Ti(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===lt&&(i.r=ar(i.r),i.g=ar(i.g),i.b=ar(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ni?ul:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ar(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Pd=[.64,.33,.3,.6,.15,.06],Dd=[.2126,.7152,.0722],Ld=[.3127,.329],Id=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ud=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ye.define({[Zt]:{primaries:Pd,whitePoint:Ld,transfer:ul,toXYZ:Id,fromXYZ:Ud,luminanceCoefficients:Dd,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:Pd,whitePoint:Ld,transfer:lt,toXYZ:Id,fromXYZ:Ud,luminanceCoefficients:Dd,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}});let Is;class c0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Is===void 0&&(Is=xo("canvas")),Is.width=e.width,Is.height=e.height;const n=Is.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ti(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let u0=0;class Lf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Hn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(bl(s[o].image)):r.push(bl(s[o]))}else r=bl(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function bl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?c0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let d0=0;class Rt extends Fr{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=Fi,s=Fi,r=Tt,o=vi,a=bn,l=Ei,c=Rt.DEFAULT_ANISOTROPY,u=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=Hn(),this.name="",this.source=new Lf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_f)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sr:e.x=e.x-Math.floor(e.x);break;case Fi:e.x=e.x<0?0:1;break;case Pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sr:e.y=e.y-Math.floor(e.y);break;case Fi:e.y=e.y<0?0:1;break;case Pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=_f;Rt.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,n=0,s=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(p+1)/2,D=(f+1)/2,R=(u+h)/4,w=(d+_)/4,C=(g+m)/4;return E>x&&E>D?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=R/n,r=w/n):x>D?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=R/s,r=C/s):D<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),n=w/r,s=C/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(h-u)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class h0 extends Fr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Rt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Lf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rs extends h0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class If extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class f0 extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class He{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const h=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==h||c!==p||u!==g){let m=1-a;const f=l*h+c*p+u*g+d*_,M=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){const D=Math.sqrt(E),R=Math.atan2(D,f*M);m=Math.sin(m*R)/D,a=Math.sin(a*R)/D}const x=a*M;if(l=l*m+h*x,c=c*m+p*x,u=u*m+g*x,d=d*m+_*x,m===1-a){const D=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=D,c*=D,u*=D,d*=D}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[o],h=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+u*d+l*p-c*h,e[t+1]=l*g+u*h+c*d-a*p,e[t+2]=c*g+u*p+a*h-l*d,e[t+3]=u*g-a*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),d=a(r/2),h=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(e=0,t=0,n=0){b.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return El.copy(this).projectOnVector(e),this.sub(El)}reflect(e){return this.sub(El.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const El=new b,Nd=new He;class ni{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,An):An.fromBufferAttribute(r,o),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bo.copy(n.boundingBox)),Bo.applyMatrix4(e.matrixWorld),this.union(Bo)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yr),ko.subVectors(this.max,Yr),Us.subVectors(e.a,Yr),Ns.subVectors(e.b,Yr),Fs.subVectors(e.c,Yr),Ri.subVectors(Ns,Us),Ci.subVectors(Fs,Ns),Ji.subVectors(Us,Fs);let t=[0,-Ri.z,Ri.y,0,-Ci.z,Ci.y,0,-Ji.z,Ji.y,Ri.z,0,-Ri.x,Ci.z,0,-Ci.x,Ji.z,0,-Ji.x,-Ri.y,Ri.x,0,-Ci.y,Ci.x,0,-Ji.y,Ji.x,0];return!wl(t,Us,Ns,Fs,ko)||(t=[1,0,0,0,1,0,0,0,1],!wl(t,Us,Ns,Fs,ko))?!1:(zo.crossVectors(Ri,Ci),t=[zo.x,zo.y,zo.z],wl(t,Us,Ns,Fs,ko))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const li=[new b,new b,new b,new b,new b,new b,new b,new b],An=new b,Bo=new ni,Us=new b,Ns=new b,Fs=new b,Ri=new b,Ci=new b,Ji=new b,Yr=new b,ko=new b,zo=new b,es=new b;function wl(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){es.fromArray(i,r);const a=s.x*Math.abs(es.x)+s.y*Math.abs(es.y)+s.z*Math.abs(es.z),l=e.dot(es),c=t.dot(es),u=n.dot(es);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const p0=new ni,jr=new b,Al=new b;class ii{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):p0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jr.subVectors(e,this.center);const t=jr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(jr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Al.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jr.copy(e.center).add(Al)),this.expandByPoint(jr.copy(e.center).sub(Al))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ci=new b,Rl=new b,Vo=new b,Pi=new b,Cl=new b,Ho=new b,Pl=new b;class Co{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Rl.copy(e).add(t).multiplyScalar(.5),Vo.copy(t).sub(e).normalize(),Pi.copy(this.origin).sub(Rl);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Vo),a=Pi.dot(this.direction),l=-Pi.dot(Vo),c=Pi.lengthSq(),u=Math.abs(1-o*o);let d,h,p,g;if(u>0)if(d=o*l-a,h=o*a-l,g=r*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,p=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Rl).addScaledVector(Vo,h),p}intersectSphere(e,t){ci.subVectors(e.center,this.origin);const n=ci.dot(this.direction),s=ci.dot(ci)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,n,s,r){Cl.subVectors(t,e),Ho.subVectors(n,e),Pl.crossVectors(Cl,Ho);let o=this.direction.dot(Pl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pi.subVectors(this.origin,e);const l=a*this.direction.dot(Ho.crossVectors(Pi,Ho));if(l<0)return null;const c=a*this.direction.dot(Cl.cross(Pi));if(c<0||l+c>o)return null;const u=-a*Pi.dot(Pl);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _e{constructor(e,t,n,s,r,o,a,l,c,u,d,h,p,g,_,m){_e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,d,h,p,g,_,m)}set(e,t,n,s,r,o,a,l,c,u,d,h,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _e().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Os.setFromMatrixColumn(e,0).length(),r=1/Os.setFromMatrixColumn(e,1).length(),o=1/Os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=o*u,p=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,p=l*d,g=c*u,_=c*d;t[0]=h+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,p=l*d,g=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,p=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=g*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(m0,e,g0)}lookAt(e,t,n){const s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),Di.crossVectors(n,hn),Di.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),Di.crossVectors(n,hn)),Di.normalize(),Go.crossVectors(hn,Di),s[0]=Di.x,s[4]=Go.x,s[8]=hn.x,s[1]=Di.y,s[5]=Go.y,s[9]=hn.y,s[2]=Di.z,s[6]=Go.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],M=n[3],E=n[7],x=n[11],D=n[15],R=s[0],w=s[4],C=s[8],v=s[12],y=s[1],P=s[5],I=s[9],L=s[13],B=s[2],q=s[6],W=s[10],j=s[14],z=s[3],se=s[7],he=s[11],Ee=s[15];return r[0]=o*R+a*y+l*B+c*z,r[4]=o*w+a*P+l*q+c*se,r[8]=o*C+a*I+l*W+c*he,r[12]=o*v+a*L+l*j+c*Ee,r[1]=u*R+d*y+h*B+p*z,r[5]=u*w+d*P+h*q+p*se,r[9]=u*C+d*I+h*W+p*he,r[13]=u*v+d*L+h*j+p*Ee,r[2]=g*R+_*y+m*B+f*z,r[6]=g*w+_*P+m*q+f*se,r[10]=g*C+_*I+m*W+f*he,r[14]=g*v+_*L+m*j+f*Ee,r[3]=M*R+E*y+x*B+D*z,r[7]=M*w+E*P+x*q+D*se,r[11]=M*C+E*I+x*W+D*he,r[15]=M*v+E*L+x*j+D*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*l*d-s*c*d-r*a*h+n*c*h+s*a*p-n*l*p)+_*(+t*l*p-t*c*h+r*o*h-s*o*p+s*c*u-r*l*u)+m*(+t*c*d-t*a*p-r*o*d+n*o*p+r*a*u-n*c*u)+f*(-s*a*u-t*l*d+t*a*h+s*o*d-n*o*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],M=d*m*c-_*h*c+_*l*p-a*m*p-d*l*f+a*h*f,E=g*h*c-u*m*c-g*l*p+o*m*p+u*l*f-o*h*f,x=u*_*c-g*d*c+g*a*p-o*_*p-u*a*f+o*d*f,D=g*d*l-u*_*l-g*a*h+o*_*h+u*a*m-o*d*m,R=t*M+n*E+s*x+r*D;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=M*w,e[1]=(_*h*r-d*m*r-_*s*p+n*m*p+d*s*f-n*h*f)*w,e[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*f+n*l*f)*w,e[3]=(d*l*r-a*h*r-d*s*c+n*h*c+a*s*p-n*l*p)*w,e[4]=E*w,e[5]=(u*m*r-g*h*r+g*s*p-t*m*p-u*s*f+t*h*f)*w,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*f-t*l*f)*w,e[7]=(o*h*r-u*l*r+u*s*c-t*h*c-o*s*p+t*l*p)*w,e[8]=x*w,e[9]=(g*d*r-u*_*r-g*n*p+t*_*p+u*n*f-t*d*f)*w,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*f+t*a*f)*w,e[11]=(u*a*r-o*d*r-u*n*c+t*d*c+o*n*p-t*a*p)*w,e[12]=D*w,e[13]=(u*_*s-g*d*s+g*n*h-t*_*h-u*n*m+t*d*m)*w,e[14]=(g*a*s-o*_*s-g*n*l+t*_*l+o*n*m-t*a*m)*w,e[15]=(o*d*s-u*a*s+u*n*l-t*d*l-o*n*h+t*a*h)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,h=r*c,p=r*u,g=r*d,_=o*u,m=o*d,f=a*d,M=l*c,E=l*u,x=l*d,D=n.x,R=n.y,w=n.z;return s[0]=(1-(_+f))*D,s[1]=(p+x)*D,s[2]=(g-E)*D,s[3]=0,s[4]=(p-x)*R,s[5]=(1-(h+f))*R,s[6]=(m+M)*R,s[7]=0,s[8]=(g+E)*w,s[9]=(m-M)*w,s[10]=(1-(h+_))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Os.set(s[0],s[1],s[2]).length();const o=Os.set(s[4],s[5],s[6]).length(),a=Os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Rn.copy(this);const c=1/r,u=1/o,d=1/a;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=d,Rn.elements[9]*=d,Rn.elements[10]*=d,t.setFromRotationMatrix(Rn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Si){const l=this.elements,c=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),h=(n+s)/(n-s);let p,g;if(a===Si)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Da)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Si){const l=this.elements,c=1/(t-e),u=1/(n-s),d=1/(o-r),h=(t+e)*c,p=(n+s)*u;let g,_;if(a===Si)g=(o+r)*d,_=-2*d;else if(a===Da)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Os=new b,Rn=new _e,m0=new b(0,0,0),g0=new b(1,1,1),Di=new b,Go=new b,hn=new b,Fd=new _e,Od=new He;class Wn{constructor(e=0,t=0,n=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Od.setFromEuler(this),this.setFromQuaternion(Od,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class zu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _0=0;const Bd=new b,Bs=new He,ui=new _e,Wo=new b,Kr=new b,x0=new b,y0=new He,kd=new b(1,0,0),zd=new b(0,1,0),Vd=new b(0,0,1),Hd={type:"added"},v0={type:"removed"},ks={type:"childadded",child:null},Dl={type:"childremoved",child:null};class ht extends Fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ht.DEFAULT_UP.clone();const e=new b,t=new Wn,n=new He,s=new b(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _e},normalMatrix:{value:new ke}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.multiply(Bs),this}rotateOnWorldAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.premultiply(Bs),this}rotateX(e){return this.rotateOnAxis(kd,e)}rotateY(e){return this.rotateOnAxis(zd,e)}rotateZ(e){return this.rotateOnAxis(Vd,e)}translateOnAxis(e,t){return Bd.copy(e).applyQuaternion(this.quaternion),this.position.add(Bd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(kd,e)}translateY(e){return this.translateOnAxis(zd,e)}translateZ(e){return this.translateOnAxis(Vd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wo.copy(e):Wo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Kr,Wo,this.up):ui.lookAt(Wo,Kr,this.up),this.quaternion.setFromRotationMatrix(ui),s&&(ui.extractRotation(s.matrixWorld),Bs.setFromRotationMatrix(ui),this.quaternion.premultiply(Bs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hd),ks.child=e,this.dispatchEvent(ks),ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(v0),Dl.child=e,this.dispatchEvent(Dl),Dl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hd),ks.child=e,this.dispatchEvent(ks),ks.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,e,x0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,y0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ht.DEFAULT_UP=new b(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Cn=new b,di=new b,Ll=new b,hi=new b,zs=new b,Vs=new b,Gd=new b,Il=new b,Ul=new b,Nl=new b,Fl=new tt,Ol=new tt,Bl=new tt;class kn{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Cn.subVectors(e,t),s.cross(Cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Cn.subVectors(s,t),di.subVectors(n,t),Ll.subVectors(e,t);const o=Cn.dot(Cn),a=Cn.dot(di),l=Cn.dot(Ll),c=di.dot(di),u=di.dot(Ll),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const h=1/d,p=(c*l-a*u)*h,g=(o*u-a*l)*h;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hi.x),l.addScaledVector(o,hi.y),l.addScaledVector(a,hi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Fl.setScalar(0),Ol.setScalar(0),Bl.setScalar(0),Fl.fromBufferAttribute(e,t),Ol.fromBufferAttribute(e,n),Bl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Fl,r.x),o.addScaledVector(Ol,r.y),o.addScaledVector(Bl,r.z),o}static isFrontFacing(e,t,n,s){return Cn.subVectors(n,t),di.subVectors(e,t),Cn.cross(di).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Cn.cross(di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return kn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return kn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;zs.subVectors(s,n),Vs.subVectors(r,n),Il.subVectors(e,n);const l=zs.dot(Il),c=Vs.dot(Il);if(l<=0&&c<=0)return t.copy(n);Ul.subVectors(e,s);const u=zs.dot(Ul),d=Vs.dot(Ul);if(u>=0&&d<=u)return t.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(zs,o);Nl.subVectors(e,r);const p=zs.dot(Nl),g=Vs.dot(Nl);if(g>=0&&p<=g)return t.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Vs,a);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Gd.subVectors(r,s),a=(d-u)/(d-u+(p-g)),t.copy(s).addScaledVector(Gd,a);const f=1/(m+_+h);return o=_*f,a=h*f,t.copy(n).addScaledVector(zs,o).addScaledVector(Vs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Uf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},Xo={h:0,s:0,l:0};function kl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ge{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=ku(e,1),t=Xt(t,0,1),n=Xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=kl(o,r,e+1/3),this.g=kl(o,r,e),this.b=kl(o,r,e-1/3)}return Ye.toWorkingColorSpace(this,s),this}setStyle(e,t=zt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const n=Uf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=ar(e.r),this.g=ar(e.g),this.b=ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return Ye.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Xt(Wt.r*255,0,255))*65536+Math.round(Xt(Wt.g*255,0,255))*256+Math.round(Xt(Wt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(Wt.copy(this),t);const n=Wt.r,s=Wt.g,r=Wt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=zt){Ye.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,s=Wt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+t,Li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Li),e.getHSL(Xo);const n=ao(Li.h,Xo.h,t),s=ao(Li.s,Xo.s,t),r=ao(Li.l,Xo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new ge;ge.NAMES=Uf;let S0=0;class Gn extends Fr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=Hn(),this.name="",this.blending=rr,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fc,this.blendDst=pc,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ls,this.stencilZFail=Ls,this.stencilZPass=Ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(n.blending=this.blending),this.side!==bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fc&&(n.blendSrc=this.blendSrc),this.blendDst!==pc&&(n.blendDst=this.blendDst),this.blendEquation!==fs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ls&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ls&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ls&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class at extends Gn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=gf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new b,qo=new je;class Ct{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zc,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qo.fromBufferAttribute(this,t),qo.applyMatrix3(e),this.setXY(t,qo.x,qo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zc&&(e.usage=this.usage),e}}class Nf extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ff extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class St extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}}let M0=0;const Sn=new _e,zl=new ht,Hs=new b,fn=new ni,$r=new ni,Lt=new b;class Et extends Fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Df(e)?Ff:Nf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,n){return Sn.makeTranslation(e,t,n),this.applyMatrix4(Sn),this}scale(e,t,n){return Sn.makeScale(e,t,n),this.applyMatrix4(Sn),this}lookAt(e){return zl.lookAt(e),zl.updateMatrix(),this.applyMatrix4(zl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new St(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];$r.setFromBufferAttribute(a),this.morphTargetsRelative?(Lt.addVectors(fn.min,$r.min),fn.expandByPoint(Lt),Lt.addVectors(fn.max,$r.max),fn.expandByPoint(Lt)):(fn.expandByPoint($r.min),fn.expandByPoint($r.max))}fn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Lt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Lt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Lt.fromBufferAttribute(a,c),l&&(Hs.fromBufferAttribute(e,c),Lt.add(Hs)),s=Math.max(s,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new b,l[C]=new b;const c=new b,u=new b,d=new b,h=new je,p=new je,g=new je,_=new b,m=new b;function f(C,v,y){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,v),d.fromBufferAttribute(n,y),h.fromBufferAttribute(r,C),p.fromBufferAttribute(r,v),g.fromBufferAttribute(r,y),u.sub(c),d.sub(c),p.sub(h),g.sub(h);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(P),a[C].add(_),a[v].add(_),a[y].add(_),l[C].add(m),l[v].add(m),l[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let C=0,v=M.length;C<v;++C){const y=M[C],P=y.start,I=y.count;for(let L=P,B=P+I;L<B;L+=3)f(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const E=new b,x=new b,D=new b,R=new b;function w(C){D.fromBufferAttribute(s,C),R.copy(D);const v=a[C];E.copy(v),E.sub(D.multiplyScalar(D.dot(v))).normalize(),x.crossVectors(R,v);const P=x.dot(l[C])<0?-1:1;o.setXYZW(C,E.x,E.y,E.z,P)}for(let C=0,v=M.length;C<v;++C){const y=M[C],P=y.start,I=y.count;for(let L=P,B=P+I;L<B;L+=3)w(e.getX(L+0)),w(e.getX(L+1)),w(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const s=new b,r=new b,o=new b,a=new b,l=new b,c=new b,u=new b,d=new b;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new Ct(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=e(h,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wd=new _e,ts=new Co,Yo=new ii,Xd=new b,jo=new b,Ko=new b,$o=new b,Vl=new b,Zo=new b,qd=new b,Qo=new b;class we extends ht{constructor(e=new Et,t=new at){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Zo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(Vl.fromBufferAttribute(d,e),o?Zo.addScaledVector(Vl,u):Zo.addScaledVector(Vl.sub(t),u))}t.add(Zo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yo.copy(n.boundingSphere),Yo.applyMatrix4(r),ts.copy(e.ray).recast(e.near),!(Yo.containsPoint(ts.origin)===!1&&(ts.intersectSphere(Yo,Xd)===null||ts.origin.distanceToSquared(Xd)>(e.far-e.near)**2))&&(Wd.copy(r).invert(),ts.copy(e.ray).applyMatrix4(Wd),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ts)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,D=E;x<D;x+=3){const R=a.getX(x),w=a.getX(x+1),C=a.getX(x+2);s=Jo(this,f,e,n,c,u,d,R,w,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=a.getX(m),E=a.getX(m+1),x=a.getX(m+2);s=Jo(this,o,e,n,c,u,d,M,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,D=E;x<D;x+=3){const R=x,w=x+1,C=x+2;s=Jo(this,f,e,n,c,u,d,R,w,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=m,E=m+1,x=m+2;s=Jo(this,o,e,n,c,u,d,M,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function T0(i,e,t,n,s,r,o,a){let l;if(e.side===ln?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===bi,a),l===null)return null;Qo.copy(a),Qo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Qo);return c<t.near||c>t.far?null:{distance:c,point:Qo.clone(),object:i}}function Jo(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,jo),i.getVertexPosition(l,Ko),i.getVertexPosition(c,$o);const u=T0(i,e,t,n,jo,Ko,$o,qd);if(u){const d=new b;kn.getBarycoord(qd,jo,Ko,$o,d),s&&(u.uv=kn.getInterpolatedAttribute(s,a,l,c,d,new je)),r&&(u.uv1=kn.getInterpolatedAttribute(r,a,l,c,d,new je)),o&&(u.normal=kn.getInterpolatedAttribute(o,a,l,c,d,new b),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new b,materialIndex:0};kn.getNormal(jo,Ko,$o,h.normal),u.face=h,u.barycoord=d}return u}class Tn extends Et{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(u,3)),this.setAttribute("uv",new St(d,2));function g(_,m,f,M,E,x,D,R,w,C,v){const y=x/w,P=D/C,I=x/2,L=D/2,B=R/2,q=w+1,W=C+1;let j=0,z=0;const se=new b;for(let he=0;he<W;he++){const Ee=he*P-L;for(let Ge=0;Ge<q;Ge++){const ct=Ge*y-I;se[_]=ct*M,se[m]=Ee*E,se[f]=B,c.push(se.x,se.y,se.z),se[_]=0,se[m]=0,se[f]=R>0?1:-1,u.push(se.x,se.y,se.z),d.push(Ge/w),d.push(1-he/C),j+=1}}for(let he=0;he<C;he++)for(let Ee=0;Ee<w;Ee++){const Ge=h+Ee+q*he,ct=h+Ee+q*(he+1),$=h+(Ee+1)+q*(he+1),ie=h+(Ee+1)+q*he;l.push(Ge,ct,ie),l.push(ct,$,ie),z+=6}a.addGroup(p,z,v),p+=z,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Er(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function jt(i){const e={};for(let t=0;t<i.length;t++){const n=Er(i[t]);for(const s in n)e[s]=n[s]}return e}function b0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Of(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const E0={clone:Er,merge:jt};var w0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,A0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xi extends Gn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=w0,this.fragmentShader=A0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Er(e.uniforms),this.uniformsGroups=b0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Bf extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=Si}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ii=new b,Yd=new je,jd=new je;class qt extends Bf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=br*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(oo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return br*2*Math.atan(Math.tan(oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z)}getViewSize(e,t){return this.getViewBounds(e,Yd,jd),t.subVectors(jd,Yd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(oo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Gs=-90,Ws=1;class R0 extends ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(Gs,Ws,e,t);s.layers=this.layers,this.add(s);const r=new qt(Gs,Ws,e,t);r.layers=this.layers,this.add(r);const o=new qt(Gs,Ws,e,t);o.layers=this.layers,this.add(o);const a=new qt(Gs,Ws,e,t);a.layers=this.layers,this.add(a);const l=new qt(Gs,Ws,e,t);l.layers=this.layers,this.add(l);const c=new qt(Gs,Ws,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Si)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Da)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class kf extends Rt{constructor(e,t,n,s,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:yr,super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class C0 extends Rs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new kf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Tt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Tn(5,5,5),r=new Xi({name:"CubemapFromEquirect",uniforms:Er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:Vi});r.uniforms.tEquirect.value=t;const o=new we(s,r),a=t.minFilter;return t.minFilter===vi&&(t.minFilter=Tt),new R0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Hl=new b,P0=new b,D0=new ke;class us{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Hl.subVectors(n,t).cross(P0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Hl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||D0.getNormalMatrix(e),s=this.coplanarPoint(Hl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ns=new ii,ea=new b;class Vu{constructor(e=new us,t=new us,n=new us,s=new us,r=new us,o=new us){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Si){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],h=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],M=s[13],E=s[14],x=s[15];if(n[0].setComponents(l-r,h-c,m-p,x-f).normalize(),n[1].setComponents(l+r,h+c,m+p,x+f).normalize(),n[2].setComponents(l+o,h+u,m+g,x+M).normalize(),n[3].setComponents(l-o,h-u,m-g,x-M).normalize(),n[4].setComponents(l-a,h-d,m-_,x-E).normalize(),t===Si)n[5].setComponents(l+a,h+d,m+_,x+E).normalize();else if(t===Da)n[5].setComponents(a,d,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){return ns.center.set(0,0,0),ns.radius=.7071067811865476,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ea.x=s.normal.x>0?e.max.x:e.min.x,ea.y=s.normal.y>0?e.max.y:e.min.y,ea.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ea)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function L0(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class bt extends Et{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,d=e/a,h=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<u;f++){const M=f*h-o;for(let E=0;E<c;E++){const x=E*d-r;g.push(x,-M,0),_.push(0,0,1),m.push(E/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){const E=M+c*f,x=M+c*(f+1),D=M+1+c*(f+1),R=M+1+c*f;p.push(E,x,R),p.push(x,D,R)}this.setIndex(p),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(_,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bt(e.width,e.height,e.widthSegments,e.heightSegments)}}var I0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,U0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,N0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,F0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,O0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,B0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,k0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,z0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,V0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,H0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,G0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,W0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,X0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,q0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Y0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,J0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,e_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,t_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,n_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,i_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,s_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,r_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,o_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,a_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,l_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,c_="gl_FragColor = linearToOutputTexel( gl_FragColor );",u_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,d_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,h_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,f_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,p_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,m_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,g_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,__=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,x_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,y_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,v_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,S_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,M_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,T_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,b_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,E_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,w_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,A_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,R_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,C_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,P_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,D_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,L_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,I_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,U_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,N_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,F_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,k_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,z_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,V_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,H_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,G_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,W_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,X_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,q_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Y_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,K_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Z_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Q_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ex=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,nx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ix=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ox=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ax=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ux=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,px=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,mx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_x=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ex=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ax=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ix=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ox=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,zx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$x=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ey=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ty=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ny=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,iy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ry=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ay=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ly=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,uy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:I0,alphahash_pars_fragment:U0,alphamap_fragment:N0,alphamap_pars_fragment:F0,alphatest_fragment:O0,alphatest_pars_fragment:B0,aomap_fragment:k0,aomap_pars_fragment:z0,batching_pars_vertex:V0,batching_vertex:H0,begin_vertex:G0,beginnormal_vertex:W0,bsdfs:X0,iridescence_fragment:q0,bumpmap_pars_fragment:Y0,clipping_planes_fragment:j0,clipping_planes_pars_fragment:K0,clipping_planes_pars_vertex:$0,clipping_planes_vertex:Z0,color_fragment:Q0,color_pars_fragment:J0,color_pars_vertex:e_,color_vertex:t_,common:n_,cube_uv_reflection_fragment:i_,defaultnormal_vertex:s_,displacementmap_pars_vertex:r_,displacementmap_vertex:o_,emissivemap_fragment:a_,emissivemap_pars_fragment:l_,colorspace_fragment:c_,colorspace_pars_fragment:u_,envmap_fragment:d_,envmap_common_pars_fragment:h_,envmap_pars_fragment:f_,envmap_pars_vertex:p_,envmap_physical_pars_fragment:E_,envmap_vertex:m_,fog_vertex:g_,fog_pars_vertex:__,fog_fragment:x_,fog_pars_fragment:y_,gradientmap_pars_fragment:v_,lightmap_pars_fragment:S_,lights_lambert_fragment:M_,lights_lambert_pars_fragment:T_,lights_pars_begin:b_,lights_toon_fragment:w_,lights_toon_pars_fragment:A_,lights_phong_fragment:R_,lights_phong_pars_fragment:C_,lights_physical_fragment:P_,lights_physical_pars_fragment:D_,lights_fragment_begin:L_,lights_fragment_maps:I_,lights_fragment_end:U_,logdepthbuf_fragment:N_,logdepthbuf_pars_fragment:F_,logdepthbuf_pars_vertex:O_,logdepthbuf_vertex:B_,map_fragment:k_,map_pars_fragment:z_,map_particle_fragment:V_,map_particle_pars_fragment:H_,metalnessmap_fragment:G_,metalnessmap_pars_fragment:W_,morphinstance_vertex:X_,morphcolor_vertex:q_,morphnormal_vertex:Y_,morphtarget_pars_vertex:j_,morphtarget_vertex:K_,normal_fragment_begin:$_,normal_fragment_maps:Z_,normal_pars_fragment:Q_,normal_pars_vertex:J_,normal_vertex:ex,normalmap_pars_fragment:tx,clearcoat_normal_fragment_begin:nx,clearcoat_normal_fragment_maps:ix,clearcoat_pars_fragment:sx,iridescence_pars_fragment:rx,opaque_fragment:ox,packing:ax,premultiplied_alpha_fragment:lx,project_vertex:cx,dithering_fragment:ux,dithering_pars_fragment:dx,roughnessmap_fragment:hx,roughnessmap_pars_fragment:fx,shadowmap_pars_fragment:px,shadowmap_pars_vertex:mx,shadowmap_vertex:gx,shadowmask_pars_fragment:_x,skinbase_vertex:xx,skinning_pars_vertex:yx,skinning_vertex:vx,skinnormal_vertex:Sx,specularmap_fragment:Mx,specularmap_pars_fragment:Tx,tonemapping_fragment:bx,tonemapping_pars_fragment:Ex,transmission_fragment:wx,transmission_pars_fragment:Ax,uv_pars_fragment:Rx,uv_pars_vertex:Cx,uv_vertex:Px,worldpos_vertex:Dx,background_vert:Lx,background_frag:Ix,backgroundCube_vert:Ux,backgroundCube_frag:Nx,cube_vert:Fx,cube_frag:Ox,depth_vert:Bx,depth_frag:kx,distanceRGBA_vert:zx,distanceRGBA_frag:Vx,equirect_vert:Hx,equirect_frag:Gx,linedashed_vert:Wx,linedashed_frag:Xx,meshbasic_vert:qx,meshbasic_frag:Yx,meshlambert_vert:jx,meshlambert_frag:Kx,meshmatcap_vert:$x,meshmatcap_frag:Zx,meshnormal_vert:Qx,meshnormal_frag:Jx,meshphong_vert:ey,meshphong_frag:ty,meshphysical_vert:ny,meshphysical_frag:iy,meshtoon_vert:sy,meshtoon_frag:ry,points_vert:oy,points_frag:ay,shadow_vert:ly,shadow_frag:cy,sprite_vert:uy,sprite_frag:dy},re={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Yn={basic:{uniforms:jt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:jt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ge(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:jt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:jt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:jt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new ge(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:jt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:jt([re.points,re.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:jt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:jt([re.common,re.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:jt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:jt([re.sprite,re.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:jt([re.common,re.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:jt([re.lights,re.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Yn.physical={uniforms:jt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const ta={r:0,b:0,g:0},is=new Wn,hy=new _e;function fy(i,e,t,n,s,r,o){const a=new ge(0);let l=r===!0?0:1,c,u,d=null,h=0,p=null;function g(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?t:e).get(E)),E}function _(M){let E=!1;const x=g(M);x===null?f(a,l):x&&x.isColor&&(f(x,1),E=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,E){const x=g(E);x&&(x.isCubeTexture||x.mapping===cl)?(u===void 0&&(u=new we(new Tn(1,1,1),new Xi({name:"BackgroundCubeMaterial",uniforms:Er(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),is.copy(E.backgroundRotation),is.x*=-1,is.y*=-1,is.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(hy.makeRotationFromEuler(is)),u.material.toneMapped=Ye.getTransfer(x.colorSpace)!==lt,(d!==x||h!==x.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=x,h=x.version,p=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new we(new bt(2,2),new Xi({name:"BackgroundMaterial",uniforms:Er(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(x.colorSpace)!==lt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||h!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,d=x,h=x.version,p=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,E){M.getRGB(ta,Of(i)),n.buffers.color.setClear(ta.r,ta.g,ta.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),l=E,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,f(a,l)},render:_,addToRenderList:m}}function py(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,o=!1;function a(y,P,I,L,B){let q=!1;const W=d(L,I,P);r!==W&&(r=W,c(r.object)),q=p(y,L,I,B),q&&g(y,L,I,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,x(y,P,I,L),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function d(y,P,I){const L=I.wireframe===!0;let B=n[y.id];B===void 0&&(B={},n[y.id]=B);let q=B[P.id];q===void 0&&(q={},B[P.id]=q);let W=q[L];return W===void 0&&(W=h(l()),q[L]=W),W}function h(y){const P=[],I=[],L=[];for(let B=0;B<t;B++)P[B]=0,I[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:L,object:y,attributes:{},index:null}}function p(y,P,I,L){const B=r.attributes,q=P.attributes;let W=0;const j=I.getAttributes();for(const z in j)if(j[z].location>=0){const he=B[z];let Ee=q[z];if(Ee===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(Ee=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(Ee=y.instanceColor)),he===void 0||he.attribute!==Ee||Ee&&he.data!==Ee.data)return!0;W++}return r.attributesNum!==W||r.index!==L}function g(y,P,I,L){const B={},q=P.attributes;let W=0;const j=I.getAttributes();for(const z in j)if(j[z].location>=0){let he=q[z];he===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(he=y.instanceColor));const Ee={};Ee.attribute=he,he&&he.data&&(Ee.data=he.data),B[z]=Ee,W++}r.attributes=B,r.attributesNum=W,r.index=L}function _(){const y=r.newAttributes;for(let P=0,I=y.length;P<I;P++)y[P]=0}function m(y){f(y,0)}function f(y,P){const I=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;I[y]=1,L[y]===0&&(i.enableVertexAttribArray(y),L[y]=1),B[y]!==P&&(i.vertexAttribDivisor(y,P),B[y]=P)}function M(){const y=r.newAttributes,P=r.enabledAttributes;for(let I=0,L=P.length;I<L;I++)P[I]!==y[I]&&(i.disableVertexAttribArray(I),P[I]=0)}function E(y,P,I,L,B,q,W){W===!0?i.vertexAttribIPointer(y,P,I,B,q):i.vertexAttribPointer(y,P,I,L,B,q)}function x(y,P,I,L){_();const B=L.attributes,q=I.getAttributes(),W=P.defaultAttributeValues;for(const j in q){const z=q[j];if(z.location>=0){let se=B[j];if(se===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),se!==void 0){const he=se.normalized,Ee=se.itemSize,Ge=e.get(se);if(Ge===void 0)continue;const ct=Ge.buffer,$=Ge.type,ie=Ge.bytesPerElement,Se=$===i.INT||$===i.UNSIGNED_INT||se.gpuType===Lu;if(se.isInterleavedBufferAttribute){const ae=se.data,De=ae.stride,Fe=se.offset;if(ae.isInstancedInterleavedBuffer){for(let We=0;We<z.locationSize;We++)f(z.location+We,ae.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let We=0;We<z.locationSize;We++)m(z.location+We);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let We=0;We<z.locationSize;We++)E(z.location+We,Ee/z.locationSize,$,he,De*ie,(Fe+Ee/z.locationSize*We)*ie,Se)}else{if(se.isInstancedBufferAttribute){for(let ae=0;ae<z.locationSize;ae++)f(z.location+ae,se.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ae=0;ae<z.locationSize;ae++)m(z.location+ae);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let ae=0;ae<z.locationSize;ae++)E(z.location+ae,Ee/z.locationSize,$,he,Ee*ie,Ee/z.locationSize*ae*ie,Se)}}else if(W!==void 0){const he=W[j];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(z.location,he);break;case 3:i.vertexAttrib3fv(z.location,he);break;case 4:i.vertexAttrib4fv(z.location,he);break;default:i.vertexAttrib1fv(z.location,he)}}}}M()}function D(){C();for(const y in n){const P=n[y];for(const I in P){const L=P[I];for(const B in L)u(L[B].object),delete L[B];delete P[I]}delete n[y]}}function R(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const I in P){const L=P[I];for(const B in L)u(L[B].object),delete L[B];delete P[I]}delete n[y.id]}function w(y){for(const P in n){const I=n[P];if(I[y.id]===void 0)continue;const L=I[y.id];for(const B in L)u(L[B].object),delete L[B];delete I[y.id]}}function C(){v(),o=!0,r!==s&&(r=s,c(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:v,dispose:D,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function my(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];t.update(p,n,1)}function l(c,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function gy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==bn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const C=w===Ro&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Ei&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==zn&&!C)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:D,maxSamples:R}}function _y(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new us,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||s;return s=h,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const M=r?0:n,E=M*4;let x=f.clippingState||null;l.value=x,x=u(g,h,E,p);for(let D=0;D!==E;++D)x[D]=t[D];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,x=p;E!==_;++E,x+=4)o.copy(d[E]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function xy(i){let e=new WeakMap;function t(o,a){return a===Mc?o.mapping=yr:a===Tc&&(o.mapping=vr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Mc||a===Tc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new C0(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Hu extends Bf{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const tr=4,Kd=[.125,.215,.35,.446,.526,.582],ps=20,Gl=new Hu,$d=new ge;let Wl=null,Xl=0,ql=0,Yl=!1;const ds=(1+Math.sqrt(5))/2,Xs=1/ds,Zd=[new b(-ds,Xs,0),new b(ds,Xs,0),new b(-Xs,0,ds),new b(Xs,0,ds),new b(0,ds,-Xs),new b(0,ds,Xs),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class Qd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Wl=this._renderer.getRenderTarget(),Xl=this._renderer.getActiveCubeFace(),ql=this._renderer.getActiveMipmapLevel(),Yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=th(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Wl,Xl,ql),this._renderer.xr.enabled=Yl,e.scissorTest=!1,na(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yr||e.mapping===vr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wl=this._renderer.getRenderTarget(),Xl=this._renderer.getActiveCubeFace(),ql=this._renderer.getActiveMipmapLevel(),Yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Tt,minFilter:Tt,generateMipmaps:!1,type:Ro,format:bn,colorSpace:Zt,depthBuffer:!1},s=Jd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jd(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yy(r)),this._blurMaterial=vy(r,e,t)}return s}_compileMaterial(e){const t=new we(this._lodPlanes[0],e);this._renderer.compile(t,Gl)}_sceneToCubeUV(e,t,n,s){const a=new qt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor($d),u.toneMapping=Hi,u.autoClear=!1;const p=new at({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),g=new we(new Tn,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy($d),_=!0);for(let f=0;f<6;f++){const M=f%3;M===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):M===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const E=this._cubeSize;na(s,M*E,f>2?E:0,E,E),u.setRenderTarget(s),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===yr||e.mapping===vr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=th()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=eh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;na(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Gl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Zd[(s-r-1)%Zd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new we(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ps-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):ps;m>ps&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ps}`);const f=[];let M=0;for(let w=0;w<ps;++w){const C=w/_,v=Math.exp(-C*C/2);f.push(v),w===0?M+=v:w<m&&(M+=2*v)}for(let w=0;w<f.length;w++)f[w]=f[w]/M;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-n;const x=this._sizeLods[s],D=3*x*(s>E-tr?s-E+tr:0),R=4*(this._cubeSize-x);na(t,D,R,3*x,2*x),l.setRenderTarget(t),l.render(d,Gl)}}function yy(i){const e=[],t=[],n=[];let s=i;const r=i-tr+1+Kd.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-tr?l=Kd[o-i+tr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,_=3,m=2,f=1,M=new Float32Array(_*g*p),E=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let R=0;R<p;R++){const w=R%3*2/3-1,C=R>2?0:-1,v=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];M.set(v,_*g*R),E.set(h,m*g*R);const y=[R,R,R,R,R,R];x.set(y,f*g*R)}const D=new Et;D.setAttribute("position",new Ct(M,_)),D.setAttribute("uv",new Ct(E,m)),D.setAttribute("faceIndex",new Ct(x,f)),e.push(D),s>tr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Jd(i,e,t){const n=new Rs(i,e,t);return n.texture.mapping=cl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function na(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function vy(i,e,t){const n=new Float32Array(ps),s=new b(0,1,0);return new Xi({name:"SphericalGaussianBlur",defines:{n:ps,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Gu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function eh(){return new Xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function th(){return new Xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function Gu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Sy(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Mc||l===Tc,u=l===yr||l===vr;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Qd(i)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new Qd(i)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function My(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&io("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ty(i,e,t,n){const s={},r=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const g in h)e.update(h[g],i.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(d){const h=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const M=p.array;_=p.version;for(let E=0,x=M.length;E<x;E+=3){const D=M[E+0],R=M[E+1],w=M[E+2];h.push(D,R,R,w,w,D)}}else if(g!==void 0){const M=g.array;_=g.version;for(let E=0,x=M.length/3-1;E<x;E+=3){const D=E+0,R=E+1,w=E+2;h.push(D,R,R,w,w,D)}}else return;const m=new(Df(h)?Ff:Nf)(h,1);m.version=_;const f=r.get(d);f&&e.remove(f),r.set(d,m)}function u(d){const h=r.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function by(i,e,t){let n;function s(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,p){i.drawElements(n,p,r,h*o),t.update(p,n,1)}function c(h,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,h*o,g),t.update(p,n,g))}function u(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function d(h,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)c(h[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,h,0,_,0,g);let f=0;for(let M=0;M<g;M++)f+=p[M]*_[M];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Ey(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function wy(i,e,t){const n=new WeakMap,s=new tt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==d){let y=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var p=y;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let D=a.attributes.position.count*x,R=1;D>e.maxTextureSize&&(R=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const w=new Float32Array(D*R*4*d),C=new If(w,D,R,d);C.type=zn,C.needsUpdate=!0;const v=x*4;for(let P=0;P<d;P++){const I=f[P],L=M[P],B=E[P],q=D*R*4*P;for(let W=0;W<I.count;W++){const j=W*v;g===!0&&(s.fromBufferAttribute(I,W),w[q+j+0]=s.x,w[q+j+1]=s.y,w[q+j+2]=s.z,w[q+j+3]=0),_===!0&&(s.fromBufferAttribute(L,W),w[q+j+4]=s.x,w[q+j+5]=s.y,w[q+j+6]=s.z,w[q+j+7]=0),m===!0&&(s.fromBufferAttribute(B,W),w[q+j+8]=s.x,w[q+j+9]=s.y,w[q+j+10]=s.z,w[q+j+11]=B.itemSize===4?s.w:1)}}h={count:d,texture:C,size:new je(D,R)},n.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Ay(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Vf extends Rt{constructor(e,t,n,s,r,o,a,l,c,u=or){if(u!==or&&u!==Tr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===or&&(n=As),n===void 0&&u===Tr&&(n=Mr),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:$t,this.minFilter=l!==void 0?l:$t,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Hf=new Rt,nh=new Vf(1,1),Gf=new If,Wf=new f0,Xf=new kf,ih=[],sh=[],rh=new Float32Array(16),oh=new Float32Array(9),ah=new Float32Array(4);function Or(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=ih[s];if(r===void 0&&(r=new Float32Array(s),ih[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Dt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function dl(i,e){let t=sh[e];t===void 0&&(t=new Int32Array(e),sh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ry(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Cy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2fv(this.addr,e),Dt(t,e)}}function Py(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;i.uniform3fv(this.addr,e),Dt(t,e)}}function Dy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4fv(this.addr,e),Dt(t,e)}}function Ly(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Pt(t,n))return;ah.set(n),i.uniformMatrix2fv(this.addr,!1,ah),Dt(t,n)}}function Iy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Pt(t,n))return;oh.set(n),i.uniformMatrix3fv(this.addr,!1,oh),Dt(t,n)}}function Uy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Pt(t,n))return;rh.set(n),i.uniformMatrix4fv(this.addr,!1,rh),Dt(t,n)}}function Ny(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Fy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2iv(this.addr,e),Dt(t,e)}}function Oy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3iv(this.addr,e),Dt(t,e)}}function By(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4iv(this.addr,e),Dt(t,e)}}function ky(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function zy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2uiv(this.addr,e),Dt(t,e)}}function Vy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3uiv(this.addr,e),Dt(t,e)}}function Hy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4uiv(this.addr,e),Dt(t,e)}}function Gy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(nh.compareFunction=Pf,r=nh):r=Hf,t.setTexture2D(e||r,s)}function Wy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Wf,s)}function Xy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Xf,s)}function qy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Gf,s)}function Yy(i){switch(i){case 5126:return Ry;case 35664:return Cy;case 35665:return Py;case 35666:return Dy;case 35674:return Ly;case 35675:return Iy;case 35676:return Uy;case 5124:case 35670:return Ny;case 35667:case 35671:return Fy;case 35668:case 35672:return Oy;case 35669:case 35673:return By;case 5125:return ky;case 36294:return zy;case 36295:return Vy;case 36296:return Hy;case 35678:case 36198:case 36298:case 36306:case 35682:return Gy;case 35679:case 36299:case 36307:return Wy;case 35680:case 36300:case 36308:case 36293:return Xy;case 36289:case 36303:case 36311:case 36292:return qy}}function jy(i,e){i.uniform1fv(this.addr,e)}function Ky(i,e){const t=Or(e,this.size,2);i.uniform2fv(this.addr,t)}function $y(i,e){const t=Or(e,this.size,3);i.uniform3fv(this.addr,t)}function Zy(i,e){const t=Or(e,this.size,4);i.uniform4fv(this.addr,t)}function Qy(i,e){const t=Or(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Jy(i,e){const t=Or(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ev(i,e){const t=Or(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function tv(i,e){i.uniform1iv(this.addr,e)}function nv(i,e){i.uniform2iv(this.addr,e)}function iv(i,e){i.uniform3iv(this.addr,e)}function sv(i,e){i.uniform4iv(this.addr,e)}function rv(i,e){i.uniform1uiv(this.addr,e)}function ov(i,e){i.uniform2uiv(this.addr,e)}function av(i,e){i.uniform3uiv(this.addr,e)}function lv(i,e){i.uniform4uiv(this.addr,e)}function cv(i,e,t){const n=this.cache,s=e.length,r=dl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Hf,r[o])}function uv(i,e,t){const n=this.cache,s=e.length,r=dl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Wf,r[o])}function dv(i,e,t){const n=this.cache,s=e.length,r=dl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Xf,r[o])}function hv(i,e,t){const n=this.cache,s=e.length,r=dl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Gf,r[o])}function fv(i){switch(i){case 5126:return jy;case 35664:return Ky;case 35665:return $y;case 35666:return Zy;case 35674:return Qy;case 35675:return Jy;case 35676:return ev;case 5124:case 35670:return tv;case 35667:case 35671:return nv;case 35668:case 35672:return iv;case 35669:case 35673:return sv;case 5125:return rv;case 36294:return ov;case 36295:return av;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return cv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return dv;case 36289:case 36303:case 36311:case 36292:return hv}}class pv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yy(t.type)}}class mv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fv(t.type)}}class gv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const jl=/(\w+)(\])?(\[|\.)?/g;function lh(i,e){i.seq.push(e),i.map[e.id]=e}function _v(i,e,t){const n=i.name,s=n.length;for(jl.lastIndex=0;;){const r=jl.exec(n),o=jl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){lh(t,c===void 0?new pv(a,i,e):new mv(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new gv(a),lh(t,d)),t=d}}}class Ea{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);_v(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function ch(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const xv=37297;let yv=0;function vv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const uh=new ke;function Sv(i){Ye._getMatrix(uh,Ye.workingColorSpace,i);const e=`mat3( ${uh.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case ul:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function dh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+vv(i.getShaderSource(e),o)}else return s}function Mv(i,e){const t=Sv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Tv(i,e){let t;switch(e){case Mg:t="Linear";break;case Tg:t="Reinhard";break;case bg:t="Cineon";break;case Eg:t="ACESFilmic";break;case Ag:t="AgX";break;case Rg:t="Neutral";break;case wg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ia=new b;function bv(){Ye.getLuminanceCoefficients(ia);const i=ia.x.toFixed(4),e=ia.y.toFixed(4),t=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ev(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(so).join(`
`)}function wv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Av(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function so(i){return i!==""}function hh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Rv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qc(i){return i.replace(Rv,Pv)}const Cv=new Map;function Pv(i,e){let t=Ve[e];if(t===void 0){const n=Cv.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Qc(t)}const Dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ph(i){return i.replace(Dv,Lv)}function Lv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function mh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Iv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Du?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===pi&&(e="SHADOWMAP_TYPE_VSM"),e}function Uv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case yr:case vr:e="ENVMAP_TYPE_CUBE";break;case cl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Nv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vr:e="ENVMAP_MODE_REFRACTION";break}return e}function Fv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case gf:e="ENVMAP_BLENDING_MULTIPLY";break;case vg:e="ENVMAP_BLENDING_MIX";break;case Sg:e="ENVMAP_BLENDING_ADD";break}return e}function Ov(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Bv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Iv(t),c=Uv(t),u=Nv(t),d=Fv(t),h=Ov(t),p=Ev(t),g=wv(r),_=s.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(so).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(so).join(`
`),f.length>0&&(f+=`
`)):(m=[mh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(so).join(`
`),f=[mh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hi?"#define TONE_MAPPING":"",t.toneMapping!==Hi?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Hi?Tv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Mv("linearToOutputTexel",t.outputColorSpace),bv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(so).join(`
`)),o=Qc(o),o=hh(o,t),o=fh(o,t),a=Qc(a),a=hh(a,t),a=fh(a,t),o=ph(o),a=ph(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Ad?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ad?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=M+m+o,x=M+f+a,D=ch(s,s.VERTEX_SHADER,E),R=ch(s,s.FRAGMENT_SHADER,x);s.attachShader(_,D),s.attachShader(_,R),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(P){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(_).trim(),L=s.getShaderInfoLog(D).trim(),B=s.getShaderInfoLog(R).trim();let q=!0,W=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,D,R);else{const j=dh(s,D,"vertex"),z=dh(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+j+`
`+z)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(L===""||B==="")&&(W=!1);W&&(P.diagnostics={runnable:q,programLog:I,vertexShader:{log:L,prefix:m},fragmentShader:{log:B,prefix:f}})}s.deleteShader(D),s.deleteShader(R),C=new Ea(s,_),v=Av(s,_)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let v;this.getAttributes=function(){return v===void 0&&w(this),v};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,xv)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=R,this}let kv=0;class zv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Vv(e),t.set(e,n)),n}}class Vv{constructor(e){this.id=kv++,this.code=e,this.usedTimes=0}}function Hv(i,e,t,n,s,r,o){const a=new zu,l=new zv,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,y,P,I,L){const B=I.fog,q=L.geometry,W=v.isMeshStandardMaterial?I.environment:null,j=(v.isMeshStandardMaterial?t:e).get(v.envMap||W),z=j&&j.mapping===cl?j.image.height:null,se=g[v.type];v.precision!==null&&(p=s.getMaxPrecision(v.precision),p!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const he=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ee=he!==void 0?he.length:0;let Ge=0;q.morphAttributes.position!==void 0&&(Ge=1),q.morphAttributes.normal!==void 0&&(Ge=2),q.morphAttributes.color!==void 0&&(Ge=3);let ct,$,ie,Se;if(se){const st=Yn[se];ct=st.vertexShader,$=st.fragmentShader}else ct=v.vertexShader,$=v.fragmentShader,l.update(v),ie=l.getVertexShaderID(v),Se=l.getFragmentShaderID(v);const ae=i.getRenderTarget(),De=i.state.buffers.depth.getReversed(),Fe=L.isInstancedMesh===!0,We=L.isBatchedMesh===!0,xt=!!v.map,Qe=!!v.matcap,Mt=!!j,k=!!v.aoMap,yn=!!v.lightMap,Ke=!!v.bumpMap,$e=!!v.normalMap,Ce=!!v.displacementMap,ft=!!v.emissiveMap,Re=!!v.metalnessMap,A=!!v.roughnessMap,S=v.anisotropy>0,V=v.clearcoat>0,Z=v.dispersion>0,ee=v.iridescence>0,K=v.sheen>0,Te=v.transmission>0,le=S&&!!v.anisotropyMap,fe=V&&!!v.clearcoatMap,Je=V&&!!v.clearcoatNormalMap,te=V&&!!v.clearcoatRoughnessMap,pe=ee&&!!v.iridescenceMap,Pe=ee&&!!v.iridescenceThicknessMap,Ie=K&&!!v.sheenColorMap,me=K&&!!v.sheenRoughnessMap,Ze=!!v.specularMap,ze=!!v.specularColorMap,ut=!!v.specularIntensityMap,N=Te&&!!v.transmissionMap,oe=Te&&!!v.thicknessMap,X=!!v.gradientMap,Q=!!v.alphaMap,de=v.alphaTest>0,ce=!!v.alphaHash,Oe=!!v.extensions;let yt=Hi;v.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(yt=i.toneMapping);const Ht={shaderID:se,shaderType:v.type,shaderName:v.name,vertexShader:ct,fragmentShader:$,defines:v.defines,customVertexShaderID:ie,customFragmentShaderID:Se,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:We,batchingColor:We&&L._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&L.instanceColor!==null,instancingMorph:Fe&&L.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Zt,alphaToCoverage:!!v.alphaToCoverage,map:xt,matcap:Qe,envMap:Mt,envMapMode:Mt&&j.mapping,envMapCubeUVHeight:z,aoMap:k,lightMap:yn,bumpMap:Ke,normalMap:$e,displacementMap:h&&Ce,emissiveMap:ft,normalMapObjectSpace:$e&&v.normalMapType===Ug,normalMapTangentSpace:$e&&v.normalMapType===Cf,metalnessMap:Re,roughnessMap:A,anisotropy:S,anisotropyMap:le,clearcoat:V,clearcoatMap:fe,clearcoatNormalMap:Je,clearcoatRoughnessMap:te,dispersion:Z,iridescence:ee,iridescenceMap:pe,iridescenceThicknessMap:Pe,sheen:K,sheenColorMap:Ie,sheenRoughnessMap:me,specularMap:Ze,specularColorMap:ze,specularIntensityMap:ut,transmission:Te,transmissionMap:N,thicknessMap:oe,gradientMap:X,opaque:v.transparent===!1&&v.blending===rr&&v.alphaToCoverage===!1,alphaMap:Q,alphaTest:de,alphaHash:ce,combine:v.combine,mapUv:xt&&_(v.map.channel),aoMapUv:k&&_(v.aoMap.channel),lightMapUv:yn&&_(v.lightMap.channel),bumpMapUv:Ke&&_(v.bumpMap.channel),normalMapUv:$e&&_(v.normalMap.channel),displacementMapUv:Ce&&_(v.displacementMap.channel),emissiveMapUv:ft&&_(v.emissiveMap.channel),metalnessMapUv:Re&&_(v.metalnessMap.channel),roughnessMapUv:A&&_(v.roughnessMap.channel),anisotropyMapUv:le&&_(v.anisotropyMap.channel),clearcoatMapUv:fe&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Je&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:me&&_(v.sheenRoughnessMap.channel),specularMapUv:Ze&&_(v.specularMap.channel),specularColorMapUv:ze&&_(v.specularColorMap.channel),specularIntensityMapUv:ut&&_(v.specularIntensityMap.channel),transmissionMapUv:N&&_(v.transmissionMap.channel),thicknessMapUv:oe&&_(v.thicknessMap.channel),alphaMapUv:Q&&_(v.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&($e||S),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!q.attributes.uv&&(xt||Q),fog:!!B,useFog:v.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:De,skinning:L.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ge,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:yt,decodeVideoTexture:xt&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===lt,decodeVideoTextureEmissive:ft&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===lt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===_t,flipSided:v.side===ln,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Oe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&v.extensions.multiDraw===!0||We)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ht.vertexUv1s=c.has(1),Ht.vertexUv2s=c.has(2),Ht.vertexUv3s=c.has(3),c.clear(),Ht}function f(v){const y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)y.push(P),y.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(M(y,v),E(y,v),y.push(i.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function M(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function E(v,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),v.push(a.mask)}function x(v){const y=g[v.type];let P;if(y){const I=Yn[y];P=E0.clone(I.uniforms)}else P=v.uniforms;return P}function D(v,y){let P;for(let I=0,L=u.length;I<L;I++){const B=u[I];if(B.cacheKey===y){P=B,++P.usedTimes;break}}return P===void 0&&(P=new Bv(i,y,v,r),u.push(P)),P}function R(v){if(--v.usedTimes===0){const y=u.indexOf(v);u[y]=u[u.length-1],u.pop(),v.destroy()}}function w(v){l.remove(v)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:D,releaseProgram:R,releaseShaderCache:w,programs:u,dispose:C}}function Gv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Wv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function gh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function _h(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,h,p,g,_,m){let f=i[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function a(d,h,p,g,_,m){const f=o(d,h,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(d,h,p,g,_,m){const f=o(d,h,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(d,h){t.length>1&&t.sort(d||Wv),n.length>1&&n.sort(h||gh),s.length>1&&s.sort(h||gh)}function u(){for(let d=e,h=i.length;d<h;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function Xv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new _h,i.set(n,[o])):s>=r.length?(o=new _h,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function qv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new ge};break;case"SpotLight":t={position:new b,direction:new b,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new b,halfWidth:new b,halfHeight:new b};break}return i[e.id]=t,t}}}function Yv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let jv=0;function Kv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $v(i){const e=new qv,t=Yv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new b);const s=new b,r=new _e,o=new _e;function a(c){let u=0,d=0,h=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,M=0,E=0,x=0,D=0,R=0,w=0;c.sort(Kv);for(let v=0,y=c.length;v<y;v++){const P=c[v],I=P.color,L=P.intensity,B=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=I.r*L,d+=I.g*L,h+=I.b*L;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],L);w++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const j=P.shadow,z=t.get(P);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=q,n.directionalShadowMatrix[p]=P.shadow.matrix,M++}n.directional[p]=W,p++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(I).multiplyScalar(L),W.distance=B,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[_]=W;const j=P.shadow;if(P.map&&(n.spotLightMap[D]=P.map,D++,j.updateMatrices(P),P.castShadow&&R++),n.spotLightMatrix[_]=j.matrix,P.castShadow){const z=t.get(P);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=q,x++}_++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(I).multiplyScalar(L),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const j=P.shadow,z=t.get(P);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,z.shadowCameraNear=j.camera.near,z.shadowCameraFar=j.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=W,g++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(L),W.groundColor.copy(P.groundColor).multiplyScalar(L),n.hemi[f]=W,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const C=n.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==m||C.hemiLength!==f||C.numDirectionalShadows!==M||C.numPointShadows!==E||C.numSpotShadows!==x||C.numSpotMaps!==D||C.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=x+D-R,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=w,C.directionalLength=p,C.pointLength=g,C.spotLength=_,C.rectAreaLength=m,C.hemiLength=f,C.numDirectionalShadows=M,C.numPointShadows=E,C.numSpotShadows=x,C.numSpotMaps=D,C.numLightProbes=w,n.version=jv++)}function l(c,u){let d=0,h=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){const E=c[f];if(E.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(E.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function xh(i){const e=new $v(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Zv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new xh(i),e.set(s,[a])):r>=o.length?(a=new xh(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Qv extends Gn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Lg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Jv extends Gn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const eS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nS(i,e,t){let n=new Vu;const s=new je,r=new je,o=new tt,a=new Qv({depthPacking:Ig}),l=new Jv,c={},u=t.maxTextureSize,d={[bi]:ln,[ln]:bi,[_t]:_t},h=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:eS,fragmentShader:tS}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Et;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new we(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mf;let f=this.type;this.render=function(R,w,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const v=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Vi),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const L=f!==pi&&this.type===pi,B=f===pi&&this.type!==pi;for(let q=0,W=R.length;q<W;q++){const j=R[q],z=j.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const se=z.getFrameExtents();if(s.multiply(se),r.copy(z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/se.x),s.x=r.x*se.x,z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/se.y),s.y=r.y*se.y,z.mapSize.y=r.y)),z.map===null||L===!0||B===!0){const Ee=this.type!==pi?{minFilter:$t,magFilter:$t}:{};z.map!==null&&z.map.dispose(),z.map=new Rs(s.x,s.y,Ee),z.map.texture.name=j.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const he=z.getViewportCount();for(let Ee=0;Ee<he;Ee++){const Ge=z.getViewport(Ee);o.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),I.viewport(o),z.updateMatrices(j,Ee),n=z.getFrustum(),x(w,C,z.camera,j,this.type)}z.isPointLightShadow!==!0&&this.type===pi&&M(z,C),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(v,y,P)};function M(R,w){const C=e.update(_);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Rs(s.x,s.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(w,null,C,h,_,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(w,null,C,p,_,null)}function E(R,w,C,v){let y=null;const P=C.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(P!==void 0)y=P;else if(y=C.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const I=y.uuid,L=w.uuid;let B=c[I];B===void 0&&(B={},c[I]=B);let q=B[L];q===void 0&&(q=y.clone(),B[L]=q,w.addEventListener("dispose",D)),y=q}if(y.visible=w.visible,y.wireframe=w.wireframe,v===pi?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:d[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const I=i.properties.get(y);I.light=C}return y}function x(R,w,C,v,y){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===pi)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,R.matrixWorld);const L=e.update(R),B=R.material;if(Array.isArray(B)){const q=L.groups;for(let W=0,j=q.length;W<j;W++){const z=q[W],se=B[z.materialIndex];if(se&&se.visible){const he=E(R,se,v,y);R.onBeforeShadow(i,R,w,C,L,he,z),i.renderBufferDirect(C,null,L,he,R,z),R.onAfterShadow(i,R,w,C,L,he,z)}}}else if(B.visible){const q=E(R,B,v,y);R.onBeforeShadow(i,R,w,C,L,q,null),i.renderBufferDirect(C,null,L,q,R,null),R.onAfterShadow(i,R,w,C,L,q,null)}}const I=R.children;for(let L=0,B=I.length;L<B;L++)x(I[L],w,C,v,y)}function D(R){R.target.removeEventListener("dispose",D);for(const C in c){const v=c[C],y=R.target.uuid;y in v&&(v[y].dispose(),delete v[y])}}}const iS={[mc]:gc,[_c]:vc,[xc]:Sc,[xr]:yc,[gc]:mc,[vc]:_c,[Sc]:xc,[yc]:xr};function sS(i,e){function t(){let N=!1;const oe=new tt;let X=null;const Q=new tt(0,0,0,0);return{setMask:function(de){X!==de&&!N&&(i.colorMask(de,de,de,de),X=de)},setLocked:function(de){N=de},setClear:function(de,ce,Oe,yt,Ht){Ht===!0&&(de*=yt,ce*=yt,Oe*=yt),oe.set(de,ce,Oe,yt),Q.equals(oe)===!1&&(i.clearColor(de,ce,Oe,yt),Q.copy(oe))},reset:function(){N=!1,X=null,Q.set(-1,0,0,0)}}}function n(){let N=!1,oe=!1,X=null,Q=null,de=null;return{setReversed:function(ce){if(oe!==ce){const Oe=e.get("EXT_clip_control");oe?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT);const yt=de;de=null,this.setClear(yt)}oe=ce},getReversed:function(){return oe},setTest:function(ce){ce?ae(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(ce){X!==ce&&!N&&(i.depthMask(ce),X=ce)},setFunc:function(ce){if(oe&&(ce=iS[ce]),Q!==ce){switch(ce){case mc:i.depthFunc(i.NEVER);break;case gc:i.depthFunc(i.ALWAYS);break;case _c:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case xc:i.depthFunc(i.EQUAL);break;case yc:i.depthFunc(i.GEQUAL);break;case vc:i.depthFunc(i.GREATER);break;case Sc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ce}},setLocked:function(ce){N=ce},setClear:function(ce){de!==ce&&(oe&&(ce=1-ce),i.clearDepth(ce),de=ce)},reset:function(){N=!1,X=null,Q=null,de=null,oe=!1}}}function s(){let N=!1,oe=null,X=null,Q=null,de=null,ce=null,Oe=null,yt=null,Ht=null;return{setTest:function(st){N||(st?ae(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(st){oe!==st&&!N&&(i.stencilMask(st),oe=st)},setFunc:function(st,En,oi){(X!==st||Q!==En||de!==oi)&&(i.stencilFunc(st,En,oi),X=st,Q=En,de=oi)},setOp:function(st,En,oi){(ce!==st||Oe!==En||yt!==oi)&&(i.stencilOp(st,En,oi),ce=st,Oe=En,yt=oi)},setLocked:function(st){N=st},setClear:function(st){Ht!==st&&(i.clearStencil(st),Ht=st)},reset:function(){N=!1,oe=null,X=null,Q=null,de=null,ce=null,Oe=null,yt=null,Ht=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,E=null,x=null,D=null,R=null,w=new ge(0,0,0),C=0,v=!1,y=null,P=null,I=null,L=null,B=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,j=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(z)[1]),W=j>=1):z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),W=j>=2);let se=null,he={};const Ee=i.getParameter(i.SCISSOR_BOX),Ge=i.getParameter(i.VIEWPORT),ct=new tt().fromArray(Ee),$=new tt().fromArray(Ge);function ie(N,oe,X,Q){const de=new Uint8Array(4),ce=i.createTexture();i.bindTexture(N,ce),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<X;Oe++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,de):i.texImage2D(oe+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,de);return ce}const Se={};Se[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),Se[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Se[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(xr),Ke(!1),$e(xd),ae(i.CULL_FACE),k(Vi);function ae(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function De(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function Fe(N,oe){return d[N]!==oe?(i.bindFramebuffer(N,oe),d[N]=oe,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=oe),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function We(N,oe){let X=p,Q=!1;if(N){X=h.get(oe),X===void 0&&(X=[],h.set(oe,X));const de=N.textures;if(X.length!==de.length||X[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,Oe=de.length;ce<Oe;ce++)X[ce]=i.COLOR_ATTACHMENT0+ce;X.length=de.length,Q=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,Q=!0);Q&&i.drawBuffers(X)}function xt(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const Qe={[fs]:i.FUNC_ADD,[ig]:i.FUNC_SUBTRACT,[sg]:i.FUNC_REVERSE_SUBTRACT};Qe[rg]=i.MIN,Qe[og]=i.MAX;const Mt={[ag]:i.ZERO,[lg]:i.ONE,[cg]:i.SRC_COLOR,[fc]:i.SRC_ALPHA,[mg]:i.SRC_ALPHA_SATURATE,[fg]:i.DST_COLOR,[dg]:i.DST_ALPHA,[ug]:i.ONE_MINUS_SRC_COLOR,[pc]:i.ONE_MINUS_SRC_ALPHA,[pg]:i.ONE_MINUS_DST_COLOR,[hg]:i.ONE_MINUS_DST_ALPHA,[gg]:i.CONSTANT_COLOR,[_g]:i.ONE_MINUS_CONSTANT_COLOR,[xg]:i.CONSTANT_ALPHA,[yg]:i.ONE_MINUS_CONSTANT_ALPHA};function k(N,oe,X,Q,de,ce,Oe,yt,Ht,st){if(N===Vi){_===!0&&(De(i.BLEND),_=!1);return}if(_===!1&&(ae(i.BLEND),_=!0),N!==ng){if(N!==m||st!==v){if((f!==fs||x!==fs)&&(i.blendEquation(i.FUNC_ADD),f=fs,x=fs),st)switch(N){case rr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yd:i.blendFunc(i.ONE,i.ONE);break;case vd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sd:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case rr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yd:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case vd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sd:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,E=null,D=null,R=null,w.set(0,0,0),C=0,m=N,v=st}return}de=de||oe,ce=ce||X,Oe=Oe||Q,(oe!==f||de!==x)&&(i.blendEquationSeparate(Qe[oe],Qe[de]),f=oe,x=de),(X!==M||Q!==E||ce!==D||Oe!==R)&&(i.blendFuncSeparate(Mt[X],Mt[Q],Mt[ce],Mt[Oe]),M=X,E=Q,D=ce,R=Oe),(yt.equals(w)===!1||Ht!==C)&&(i.blendColor(yt.r,yt.g,yt.b,Ht),w.copy(yt),C=Ht),m=N,v=!1}function yn(N,oe){N.side===_t?De(i.CULL_FACE):ae(i.CULL_FACE);let X=N.side===ln;oe&&(X=!X),Ke(X),N.blending===rr&&N.transparent===!1?k(Vi):k(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Q=N.stencilWrite;a.setTest(Q),Q&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ft(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(N){y!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),y=N)}function $e(N){N!==eg?(ae(i.CULL_FACE),N!==P&&(N===xd?i.cullFace(i.BACK):N===tg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),P=N}function Ce(N){N!==I&&(W&&i.lineWidth(N),I=N)}function ft(N,oe,X){N?(ae(i.POLYGON_OFFSET_FILL),(L!==oe||B!==X)&&(i.polygonOffset(oe,X),L=oe,B=X)):De(i.POLYGON_OFFSET_FILL)}function Re(N){N?ae(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function A(N){N===void 0&&(N=i.TEXTURE0+q-1),se!==N&&(i.activeTexture(N),se=N)}function S(N,oe,X){X===void 0&&(se===null?X=i.TEXTURE0+q-1:X=se);let Q=he[X];Q===void 0&&(Q={type:void 0,texture:void 0},he[X]=Q),(Q.type!==N||Q.texture!==oe)&&(se!==X&&(i.activeTexture(X),se=X),i.bindTexture(N,oe||Se[N]),Q.type=N,Q.texture=oe)}function V(){const N=he[se];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Je(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pe(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ie(N){ct.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ct.copy(N))}function me(N){$.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),$.copy(N))}function Ze(N,oe){let X=c.get(oe);X===void 0&&(X=new WeakMap,c.set(oe,X));let Q=X.get(N);Q===void 0&&(Q=i.getUniformBlockIndex(oe,N.name),X.set(N,Q))}function ze(N,oe){const Q=c.get(oe).get(N);l.get(oe)!==Q&&(i.uniformBlockBinding(oe,Q,N.__bindingPointIndex),l.set(oe,Q))}function ut(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},se=null,he={},d={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,E=null,x=null,D=null,R=null,w=new ge(0,0,0),C=0,v=!1,y=null,P=null,I=null,L=null,B=null,ct.set(0,0,i.canvas.width,i.canvas.height),$.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:De,bindFramebuffer:Fe,drawBuffers:We,useProgram:xt,setBlending:k,setMaterial:yn,setFlipSided:Ke,setCullFace:$e,setLineWidth:Ce,setPolygonOffset:ft,setScissorTest:Re,activeTexture:A,bindTexture:S,unbindTexture:V,compressedTexImage2D:Z,compressedTexImage3D:ee,texImage2D:pe,texImage3D:Pe,updateUBOMapping:Ze,uniformBlockBinding:ze,texStorage2D:Je,texStorage3D:te,texSubImage2D:K,texSubImage3D:Te,compressedTexSubImage2D:le,compressedTexSubImage3D:fe,scissor:Ie,viewport:me,reset:ut}}function yh(i,e,t,n){const s=rS(n);switch(t){case Mf:return i*e;case bf:return i*e;case Ef:return i*e*2;case Nu:return i*e/s.components*s.byteLength;case Fu:return i*e/s.components*s.byteLength;case wf:return i*e*2/s.components*s.byteLength;case Ou:return i*e*2/s.components*s.byteLength;case Tf:return i*e*3/s.components*s.byteLength;case bn:return i*e*4/s.components*s.byteLength;case Bu:return i*e*4/s.components*s.byteLength;case va:case Sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ma:case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ec:case Ac:return Math.max(i,16)*Math.max(e,8)/4;case bc:case wc:return Math.max(i,8)*Math.max(e,8)/2;case Rc:case Cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Dc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ic:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Nc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Bc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case kc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case zc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Vc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Gc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ba:case Xc:case qc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Af:case Yc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case jc:case Kc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rS(i){switch(i){case Ei:case yf:return{byteLength:1,components:1};case mo:case vf:case Ro:return{byteLength:2,components:1};case Iu:case Uu:return{byteLength:2,components:4};case As:case Lu:case zn:return{byteLength:4,components:1};case Sf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function oS(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new je,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return p?new OffscreenCanvas(A,S):xo("canvas")}function _(A,S,V){let Z=1;const ee=Re(A);if((ee.width>V||ee.height>V)&&(Z=V/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const K=Math.floor(Z*ee.width),Te=Math.floor(Z*ee.height);d===void 0&&(d=g(K,Te));const le=S?g(K,Te):d;return le.width=K,le.height=Te,le.getContext("2d").drawImage(A,0,0,K,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+K+"x"+Te+")."),le}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){i.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(A,S,V,Z,ee=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=S;if(S===i.RED&&(V===i.FLOAT&&(K=i.R32F),V===i.HALF_FLOAT&&(K=i.R16F),V===i.UNSIGNED_BYTE&&(K=i.R8)),S===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.R8UI),V===i.UNSIGNED_SHORT&&(K=i.R16UI),V===i.UNSIGNED_INT&&(K=i.R32UI),V===i.BYTE&&(K=i.R8I),V===i.SHORT&&(K=i.R16I),V===i.INT&&(K=i.R32I)),S===i.RG&&(V===i.FLOAT&&(K=i.RG32F),V===i.HALF_FLOAT&&(K=i.RG16F),V===i.UNSIGNED_BYTE&&(K=i.RG8)),S===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RG8UI),V===i.UNSIGNED_SHORT&&(K=i.RG16UI),V===i.UNSIGNED_INT&&(K=i.RG32UI),V===i.BYTE&&(K=i.RG8I),V===i.SHORT&&(K=i.RG16I),V===i.INT&&(K=i.RG32I)),S===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RGB8UI),V===i.UNSIGNED_SHORT&&(K=i.RGB16UI),V===i.UNSIGNED_INT&&(K=i.RGB32UI),V===i.BYTE&&(K=i.RGB8I),V===i.SHORT&&(K=i.RGB16I),V===i.INT&&(K=i.RGB32I)),S===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),V===i.UNSIGNED_INT&&(K=i.RGBA32UI),V===i.BYTE&&(K=i.RGBA8I),V===i.SHORT&&(K=i.RGBA16I),V===i.INT&&(K=i.RGBA32I)),S===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),S===i.RGBA){const Te=ee?ul:Ye.getTransfer(Z);V===i.FLOAT&&(K=i.RGBA32F),V===i.HALF_FLOAT&&(K=i.RGBA16F),V===i.UNSIGNED_BYTE&&(K=Te===lt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(A,S){let V;return A?S===null||S===As||S===Mr?V=i.DEPTH24_STENCIL8:S===zn?V=i.DEPTH32F_STENCIL8:S===mo&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===As||S===Mr?V=i.DEPTH_COMPONENT24:S===zn?V=i.DEPTH_COMPONENT32F:S===mo&&(V=i.DEPTH_COMPONENT16),V}function D(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==$t&&A.minFilter!==Tt?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function R(A){const S=A.target;S.removeEventListener("dispose",R),C(S),S.isVideoTexture&&u.delete(S)}function w(A){const S=A.target;S.removeEventListener("dispose",w),y(S)}function C(A){const S=n.get(A);if(S.__webglInit===void 0)return;const V=A.source,Z=h.get(V);if(Z){const ee=Z[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&v(A),Object.keys(Z).length===0&&h.delete(V)}n.remove(A)}function v(A){const S=n.get(A);i.deleteTexture(S.__webglTexture);const V=A.source,Z=h.get(V);delete Z[S.__cacheKey],o.memory.textures--}function y(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let ee=0;ee<S.__webglFramebuffer[Z].length;ee++)i.deleteFramebuffer(S.__webglFramebuffer[Z][ee]);else i.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)i.deleteFramebuffer(S.__webglFramebuffer[Z]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const V=A.textures;for(let Z=0,ee=V.length;Z<ee;Z++){const K=n.get(V[Z]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(V[Z])}n.remove(A)}let P=0;function I(){P=0}function L(){const A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function B(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function q(A,S){const V=n.get(A);if(A.isVideoTexture&&Ce(A),A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){const Z=A.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(V,A,S);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+S)}function W(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){$(V,A,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+S)}function j(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){$(V,A,S);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+S)}function z(A,S){const V=n.get(A);if(A.version>0&&V.__version!==A.version){ie(V,A,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+S)}const se={[Sr]:i.REPEAT,[Fi]:i.CLAMP_TO_EDGE,[Pa]:i.MIRRORED_REPEAT},he={[$t]:i.NEAREST,[xf]:i.NEAREST_MIPMAP_NEAREST,[no]:i.NEAREST_MIPMAP_LINEAR,[Tt]:i.LINEAR,[ya]:i.LINEAR_MIPMAP_NEAREST,[vi]:i.LINEAR_MIPMAP_LINEAR},Ee={[Ng]:i.NEVER,[Vg]:i.ALWAYS,[Fg]:i.LESS,[Pf]:i.LEQUAL,[Og]:i.EQUAL,[zg]:i.GEQUAL,[Bg]:i.GREATER,[kg]:i.NOTEQUAL};function Ge(A,S){if(S.type===zn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Tt||S.magFilter===ya||S.magFilter===no||S.magFilter===vi||S.minFilter===Tt||S.minFilter===ya||S.minFilter===no||S.minFilter===vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,se[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,se[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,se[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,he[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,he[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Ee[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===$t||S.minFilter!==no&&S.minFilter!==vi||S.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ct(A,S){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",R));const Z=S.source;let ee=h.get(Z);ee===void 0&&(ee={},h.set(Z,ee));const K=B(S);if(K!==A.__cacheKey){ee[K]===void 0&&(ee[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ee[K].usedTimes++;const Te=ee[A.__cacheKey];Te!==void 0&&(ee[A.__cacheKey].usedTimes--,Te.usedTimes===0&&v(S)),A.__cacheKey=K,A.__webglTexture=ee[K].texture}return V}function $(A,S,V){let Z=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=i.TEXTURE_3D);const ee=ct(A,S),K=S.source;t.bindTexture(Z,A.__webglTexture,i.TEXTURE0+V);const Te=n.get(K);if(K.version!==Te.__version||ee===!0){t.activeTexture(i.TEXTURE0+V);const le=Ye.getPrimaries(Ye.workingColorSpace),fe=S.colorSpace===Ni?null:Ye.getPrimaries(S.colorSpace),Je=S.colorSpace===Ni||le===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let te=_(S.image,!1,s.maxTextureSize);te=ft(S,te);const pe=r.convert(S.format,S.colorSpace),Pe=r.convert(S.type);let Ie=E(S.internalFormat,pe,Pe,S.colorSpace,S.isVideoTexture);Ge(Z,S);let me;const Ze=S.mipmaps,ze=S.isVideoTexture!==!0,ut=Te.__version===void 0||ee===!0,N=K.dataReady,oe=D(S,te);if(S.isDepthTexture)Ie=x(S.format===Tr,S.type),ut&&(ze?t.texStorage2D(i.TEXTURE_2D,1,Ie,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,Ie,te.width,te.height,0,pe,Pe,null));else if(S.isDataTexture)if(Ze.length>0){ze&&ut&&t.texStorage2D(i.TEXTURE_2D,oe,Ie,Ze[0].width,Ze[0].height);for(let X=0,Q=Ze.length;X<Q;X++)me=Ze[X],ze?N&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,me.width,me.height,pe,Pe,me.data):t.texImage2D(i.TEXTURE_2D,X,Ie,me.width,me.height,0,pe,Pe,me.data);S.generateMipmaps=!1}else ze?(ut&&t.texStorage2D(i.TEXTURE_2D,oe,Ie,te.width,te.height),N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,te.width,te.height,pe,Pe,te.data)):t.texImage2D(i.TEXTURE_2D,0,Ie,te.width,te.height,0,pe,Pe,te.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ze&&ut&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,Ie,Ze[0].width,Ze[0].height,te.depth);for(let X=0,Q=Ze.length;X<Q;X++)if(me=Ze[X],S.format!==bn)if(pe!==null)if(ze){if(N)if(S.layerUpdates.size>0){const de=yh(me.width,me.height,S.format,S.type);for(const ce of S.layerUpdates){const Oe=me.data.subarray(ce*de/me.data.BYTES_PER_ELEMENT,(ce+1)*de/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,ce,me.width,me.height,1,pe,Oe)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,te.depth,pe,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,Ie,me.width,me.height,te.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,te.depth,pe,Pe,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,X,Ie,me.width,me.height,te.depth,0,pe,Pe,me.data)}else{ze&&ut&&t.texStorage2D(i.TEXTURE_2D,oe,Ie,Ze[0].width,Ze[0].height);for(let X=0,Q=Ze.length;X<Q;X++)me=Ze[X],S.format!==bn?pe!==null?ze?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(i.TEXTURE_2D,X,Ie,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?N&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,me.width,me.height,pe,Pe,me.data):t.texImage2D(i.TEXTURE_2D,X,Ie,me.width,me.height,0,pe,Pe,me.data)}else if(S.isDataArrayTexture)if(ze){if(ut&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,Ie,te.width,te.height,te.depth),N)if(S.layerUpdates.size>0){const X=yh(te.width,te.height,S.format,S.type);for(const Q of S.layerUpdates){const de=te.data.subarray(Q*X/te.data.BYTES_PER_ELEMENT,(Q+1)*X/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,te.width,te.height,1,pe,Pe,de)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,pe,Pe,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,te.width,te.height,te.depth,0,pe,Pe,te.data);else if(S.isData3DTexture)ze?(ut&&t.texStorage3D(i.TEXTURE_3D,oe,Ie,te.width,te.height,te.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,pe,Pe,te.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,te.width,te.height,te.depth,0,pe,Pe,te.data);else if(S.isFramebufferTexture){if(ut)if(ze)t.texStorage2D(i.TEXTURE_2D,oe,Ie,te.width,te.height);else{let X=te.width,Q=te.height;for(let de=0;de<oe;de++)t.texImage2D(i.TEXTURE_2D,de,Ie,X,Q,0,pe,Pe,null),X>>=1,Q>>=1}}else if(Ze.length>0){if(ze&&ut){const X=Re(Ze[0]);t.texStorage2D(i.TEXTURE_2D,oe,Ie,X.width,X.height)}for(let X=0,Q=Ze.length;X<Q;X++)me=Ze[X],ze?N&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,pe,Pe,me):t.texImage2D(i.TEXTURE_2D,X,Ie,pe,Pe,me);S.generateMipmaps=!1}else if(ze){if(ut){const X=Re(te);t.texStorage2D(i.TEXTURE_2D,oe,Ie,X.width,X.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Pe,te)}else t.texImage2D(i.TEXTURE_2D,0,Ie,pe,Pe,te);m(S)&&f(Z),Te.__version=K.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function ie(A,S,V){if(S.image.length!==6)return;const Z=ct(A,S),ee=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+V);const K=n.get(ee);if(ee.version!==K.__version||Z===!0){t.activeTexture(i.TEXTURE0+V);const Te=Ye.getPrimaries(Ye.workingColorSpace),le=S.colorSpace===Ni?null:Ye.getPrimaries(S.colorSpace),fe=S.colorSpace===Ni||Te===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Je=S.isCompressedTexture||S.image[0].isCompressedTexture,te=S.image[0]&&S.image[0].isDataTexture,pe=[];for(let Q=0;Q<6;Q++)!Je&&!te?pe[Q]=_(S.image[Q],!0,s.maxCubemapSize):pe[Q]=te?S.image[Q].image:S.image[Q],pe[Q]=ft(S,pe[Q]);const Pe=pe[0],Ie=r.convert(S.format,S.colorSpace),me=r.convert(S.type),Ze=E(S.internalFormat,Ie,me,S.colorSpace),ze=S.isVideoTexture!==!0,ut=K.__version===void 0||Z===!0,N=ee.dataReady;let oe=D(S,Pe);Ge(i.TEXTURE_CUBE_MAP,S);let X;if(Je){ze&&ut&&t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,Ze,Pe.width,Pe.height);for(let Q=0;Q<6;Q++){X=pe[Q].mipmaps;for(let de=0;de<X.length;de++){const ce=X[de];S.format!==bn?Ie!==null?ze?N&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de,0,0,ce.width,ce.height,Ie,ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de,Ze,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de,0,0,ce.width,ce.height,Ie,me,ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de,Ze,ce.width,ce.height,0,Ie,me,ce.data)}}}else{if(X=S.mipmaps,ze&&ut){X.length>0&&oe++;const Q=Re(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,Ze,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(te){ze?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,pe[Q].width,pe[Q].height,Ie,me,pe[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ze,pe[Q].width,pe[Q].height,0,Ie,me,pe[Q].data);for(let de=0;de<X.length;de++){const Oe=X[de].image[Q].image;ze?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de+1,0,0,Oe.width,Oe.height,Ie,me,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de+1,Ze,Oe.width,Oe.height,0,Ie,me,Oe.data)}}else{ze?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ie,me,pe[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ze,Ie,me,pe[Q]);for(let de=0;de<X.length;de++){const ce=X[de];ze?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de+1,0,0,Ie,me,ce.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de+1,Ze,Ie,me,ce.image[Q])}}}m(S)&&f(i.TEXTURE_CUBE_MAP),K.__version=ee.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Se(A,S,V,Z,ee,K){const Te=r.convert(V.format,V.colorSpace),le=r.convert(V.type),fe=E(V.internalFormat,Te,le,V.colorSpace),Je=n.get(S),te=n.get(V);if(te.__renderTarget=S,!Je.__hasExternalTextures){const pe=Math.max(1,S.width>>K),Pe=Math.max(1,S.height>>K);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,K,fe,pe,Pe,S.depth,0,Te,le,null):t.texImage2D(ee,K,fe,pe,Pe,0,Te,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),$e(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,ee,te.__webglTexture,0,Ke(S)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,ee,te.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(A,S,V){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){const Z=S.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,K=x(S.stencilBuffer,ee),Te=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=Ke(S);$e(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le,K,S.width,S.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,le,K,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,K,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,A)}else{const Z=S.textures;for(let ee=0;ee<Z.length;ee++){const K=Z[ee],Te=r.convert(K.format,K.colorSpace),le=r.convert(K.type),fe=E(K.internalFormat,Te,le,K.colorSpace),Je=Ke(S);V&&$e(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Je,fe,S.width,S.height):$e(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Je,fe,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,fe,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(S.depthTexture);Z.__renderTarget=S,(!Z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q(S.depthTexture,0);const ee=Z.__webglTexture,K=Ke(S);if(S.depthTexture.format===or)$e(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(S.depthTexture.format===Tr)$e(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Fe(A){const S=n.get(A),V=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const Z=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=Z}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");De(S.__webglFramebuffer,A)}else if(V){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=i.createRenderbuffer(),ae(S.__webglDepthbuffer[Z],A,!1);else{const ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,K)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ae(S.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ee)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(A,S,V){const Z=n.get(A);S!==void 0&&Se(Z.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Fe(A)}function xt(A){const S=A.texture,V=n.get(A),Z=n.get(S);A.addEventListener("dispose",w);const ee=A.textures,K=A.isWebGLCubeRenderTarget===!0,Te=ee.length>1;if(Te||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=S.version,o.memory.textures++),K){V.__webglFramebuffer=[];for(let le=0;le<6;le++)if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[le]=[];for(let fe=0;fe<S.mipmaps.length;fe++)V.__webglFramebuffer[le][fe]=i.createFramebuffer()}else V.__webglFramebuffer[le]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let le=0;le<S.mipmaps.length;le++)V.__webglFramebuffer[le]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Te)for(let le=0,fe=ee.length;le<fe;le++){const Je=n.get(ee[le]);Je.__webglTexture===void 0&&(Je.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&$e(A)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let le=0;le<ee.length;le++){const fe=ee[le];V.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[le]);const Je=r.convert(fe.format,fe.colorSpace),te=r.convert(fe.type),pe=E(fe.internalFormat,Je,te,fe.colorSpace,A.isXRRenderTarget===!0),Pe=Ke(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,pe,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,V.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ge(i.TEXTURE_CUBE_MAP,S);for(let le=0;le<6;le++)if(S.mipmaps&&S.mipmaps.length>0)for(let fe=0;fe<S.mipmaps.length;fe++)Se(V.__webglFramebuffer[le][fe],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,fe);else Se(V.__webglFramebuffer[le],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(S)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let le=0,fe=ee.length;le<fe;le++){const Je=ee[le],te=n.get(Je);t.bindTexture(i.TEXTURE_2D,te.__webglTexture),Ge(i.TEXTURE_2D,Je),Se(V.__webglFramebuffer,A,Je,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,0),m(Je)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(le=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,Z.__webglTexture),Ge(le,S),S.mipmaps&&S.mipmaps.length>0)for(let fe=0;fe<S.mipmaps.length;fe++)Se(V.__webglFramebuffer[fe],A,S,i.COLOR_ATTACHMENT0,le,fe);else Se(V.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,le,0);m(S)&&f(le),t.unbindTexture()}A.depthBuffer&&Fe(A)}function Qe(A){const S=A.textures;for(let V=0,Z=S.length;V<Z;V++){const ee=S[V];if(m(ee)){const K=M(A),Te=n.get(ee).__webglTexture;t.bindTexture(K,Te),f(K),t.unbindTexture()}}}const Mt=[],k=[];function yn(A){if(A.samples>0){if($e(A)===!1){const S=A.textures,V=A.width,Z=A.height;let ee=i.COLOR_BUFFER_BIT;const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(A),le=S.length>1;if(le)for(let fe=0;fe<S.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let fe=0;fe<S.length;fe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[fe]);const Je=n.get(S[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Je,0)}i.blitFramebuffer(0,0,V,Z,0,0,V,Z,ee,i.NEAREST),l===!0&&(Mt.length=0,k.length=0,Mt.push(i.COLOR_ATTACHMENT0+fe),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Mt.push(K),k.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,k)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let fe=0;fe<S.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,Te.__webglColorRenderbuffer[fe]);const Je=n.get(S[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,Je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Ke(A){return Math.min(s.maxSamples,A.samples)}function $e(A){const S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ce(A){const S=o.render.frame;u.get(A)!==S&&(u.set(A,S),A.update())}function ft(A,S){const V=A.colorSpace,Z=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==Zt&&V!==Ni&&(Ye.getTransfer(V)===lt?(Z!==bn||ee!==Ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),S}function Re(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=I,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=j,this.setTextureCube=z,this.rebindTextures=We,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=Qe,this.updateMultisampleRenderTarget=yn,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=$e}function aS(i,e){function t(n,s=Ni){let r;const o=Ye.getTransfer(s);if(n===Ei)return i.UNSIGNED_BYTE;if(n===Iu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Uu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yf)return i.BYTE;if(n===vf)return i.SHORT;if(n===mo)return i.UNSIGNED_SHORT;if(n===Lu)return i.INT;if(n===As)return i.UNSIGNED_INT;if(n===zn)return i.FLOAT;if(n===Ro)return i.HALF_FLOAT;if(n===Mf)return i.ALPHA;if(n===Tf)return i.RGB;if(n===bn)return i.RGBA;if(n===bf)return i.LUMINANCE;if(n===Ef)return i.LUMINANCE_ALPHA;if(n===or)return i.DEPTH_COMPONENT;if(n===Tr)return i.DEPTH_STENCIL;if(n===Nu)return i.RED;if(n===Fu)return i.RED_INTEGER;if(n===wf)return i.RG;if(n===Ou)return i.RG_INTEGER;if(n===Bu)return i.RGBA_INTEGER;if(n===va||n===Sa||n===Ma||n===Ta)if(o===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===va)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===va)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===bc||n===Ec||n===wc||n===Ac)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===bc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ec)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ac)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rc||n===Cc||n===Pc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Rc||n===Cc)return o===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Pc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Dc||n===Lc||n===Ic||n===Uc||n===Nc||n===Fc||n===Oc||n===Bc||n===kc||n===zc||n===Vc||n===Hc||n===Gc||n===Wc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Dc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ic)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===kc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ba||n===Xc||n===qc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ba)return o===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Af||n===Yc||n===jc||n===Kc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ba)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Kc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class lS extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _s extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cS={type:"move"};class Kl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _s,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _s,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _s,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cS)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _s;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const uS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class hS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Rt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Xi({vertexShader:uS,fragmentShader:dS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new we(new bt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fS extends Fr{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null;const _=new hS,m=t.getContextAttributes();let f=null,M=null;const E=[],x=[],D=new je;let R=null;const w=new qt;w.viewport=new tt;const C=new qt;C.viewport=new tt;const v=[w,C],y=new lS;let P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ie=E[$];return ie===void 0&&(ie=new Kl,E[$]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function($){let ie=E[$];return ie===void 0&&(ie=new Kl,E[$]=ie),ie.getGripSpace()},this.getHand=function($){let ie=E[$];return ie===void 0&&(ie=new Kl,E[$]=ie),ie.getHandSpace()};function L($){const ie=x.indexOf($.inputSource);if(ie===-1)return;const Se=E[ie];Se!==void 0&&(Se.update($.inputSource,$.frame,c||o),Se.dispatchEvent({type:$.type,data:$.inputSource}))}function B(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",q);for(let $=0;$<E.length;$++){const ie=x[$];ie!==null&&(x[$]=null,E[$].disconnect(ie))}P=null,I=null,_.reset(),e.setRenderTarget(f),p=null,h=null,d=null,s=null,M=null,ct.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",B),s.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(D),s.renderState.layers===void 0){const ie={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ie),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Rs(p.framebufferWidth,p.framebufferHeight,{format:bn,type:Ei,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ie=null,Se=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=m.stencil?Tr:or,Se=m.stencil?Mr:As);const De={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};d=new XRWebGLBinding(s,t),h=d.createProjectionLayer(De),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Rs(h.textureWidth,h.textureHeight,{format:bn,type:Ei,depthTexture:new Vf(h.textureWidth,h.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ct.setContext(s),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q($){for(let ie=0;ie<$.removed.length;ie++){const Se=$.removed[ie],ae=x.indexOf(Se);ae>=0&&(x[ae]=null,E[ae].disconnect(Se))}for(let ie=0;ie<$.added.length;ie++){const Se=$.added[ie];let ae=x.indexOf(Se);if(ae===-1){for(let Fe=0;Fe<E.length;Fe++)if(Fe>=x.length){x.push(Se),ae=Fe;break}else if(x[Fe]===null){x[Fe]=Se,ae=Fe;break}if(ae===-1)break}const De=E[ae];De&&De.connect(Se)}}const W=new b,j=new b;function z($,ie,Se){W.setFromMatrixPosition(ie.matrixWorld),j.setFromMatrixPosition(Se.matrixWorld);const ae=W.distanceTo(j),De=ie.projectionMatrix.elements,Fe=Se.projectionMatrix.elements,We=De[14]/(De[10]-1),xt=De[14]/(De[10]+1),Qe=(De[9]+1)/De[5],Mt=(De[9]-1)/De[5],k=(De[8]-1)/De[0],yn=(Fe[8]+1)/Fe[0],Ke=We*k,$e=We*yn,Ce=ae/(-k+yn),ft=Ce*-k;if(ie.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ft),$.translateZ(Ce),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),De[10]===-1)$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Re=We+Ce,A=xt+Ce,S=Ke-ft,V=$e+(ae-ft),Z=Qe*xt/A*Re,ee=Mt*xt/A*Re;$.projectionMatrix.makePerspective(S,V,Z,ee,Re,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function se($,ie){ie===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ie.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ie=$.near,Se=$.far;_.texture!==null&&(_.depthNear>0&&(ie=_.depthNear),_.depthFar>0&&(Se=_.depthFar)),y.near=C.near=w.near=ie,y.far=C.far=w.far=Se,(P!==y.near||I!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,I=y.far),w.layers.mask=$.layers.mask|2,C.layers.mask=$.layers.mask|4,y.layers.mask=w.layers.mask|C.layers.mask;const ae=$.parent,De=y.cameras;se(y,ae);for(let Fe=0;Fe<De.length;Fe++)se(De[Fe],ae);De.length===2?z(y,w,C):y.projectionMatrix.copy(w.projectionMatrix),he($,y,ae)};function he($,ie,Se){Se===null?$.matrix.copy(ie.matrixWorld):($.matrix.copy(Se.matrixWorld),$.matrix.invert(),$.matrix.multiply(ie.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=br*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let Ee=null;function Ge($,ie){if(u=ie.getViewerPose(c||o),g=ie,u!==null){const Se=u.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let ae=!1;Se.length!==y.cameras.length&&(y.cameras.length=0,ae=!0);for(let Fe=0;Fe<Se.length;Fe++){const We=Se[Fe];let xt=null;if(p!==null)xt=p.getViewport(We);else{const Mt=d.getViewSubImage(h,We);xt=Mt.viewport,Fe===0&&(e.setRenderTargetTextures(M,Mt.colorTexture,h.ignoreDepthValues?void 0:Mt.depthStencilTexture),e.setRenderTarget(M))}let Qe=v[Fe];Qe===void 0&&(Qe=new qt,Qe.layers.enable(Fe),Qe.viewport=new tt,v[Fe]=Qe),Qe.matrix.fromArray(We.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(We.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(xt.x,xt.y,xt.width,xt.height),Fe===0&&(y.matrix.copy(Qe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ae===!0&&y.cameras.push(Qe)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")){const Fe=d.getDepthInformation(Se[0]);Fe&&Fe.isValid&&Fe.texture&&_.init(e,Fe,s.renderState)}}for(let Se=0;Se<E.length;Se++){const ae=x[Se],De=E[Se];ae!==null&&De!==void 0&&De.update(ae,ie,c||o)}Ee&&Ee($,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const ct=new zf;ct.setAnimationLoop(Ge),this.setAnimationLoop=function($){Ee=$},this.dispose=function(){}}}const ss=new Wn,pS=new _e;function mS(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Of(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,E,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,M,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ln&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ln&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f),E=M.envMap,x=M.envMapRotation;E&&(m.envMap.value=E,ss.copy(x),ss.x*=-1,ss.y*=-1,ss.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),m.envMapRotation.value.setFromMatrix4(pS.makeRotationFromEuler(ss)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ln&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function gS(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){const x=E.program;n.uniformBlockBinding(M,x)}function c(M,E){let x=s[M.id];x===void 0&&(g(M),x=u(M),s[M.id]=x,M.addEventListener("dispose",m));const D=E.program;n.updateUBOMapping(M,D);const R=e.render.frame;r[M.id]!==R&&(h(M),r[M.id]=R)}function u(M){const E=d();M.__bindingPointIndex=E;const x=i.createBuffer(),D=M.__size,R=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,D,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,x),x}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const E=s[M.id],x=M.uniforms,D=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let R=0,w=x.length;R<w;R++){const C=Array.isArray(x[R])?x[R]:[x[R]];for(let v=0,y=C.length;v<y;v++){const P=C[v];if(p(P,R,v,D)===!0){const I=P.__offset,L=Array.isArray(P.value)?P.value:[P.value];let B=0;for(let q=0;q<L.length;q++){const W=L[q],j=_(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,I+B,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,B),B+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,I,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,E,x,D){const R=M.value,w=E+"_"+x;if(D[w]===void 0)return typeof R=="number"||typeof R=="boolean"?D[w]=R:D[w]=R.clone(),!0;{const C=D[w];if(typeof R=="number"||typeof R=="boolean"){if(C!==R)return D[w]=R,!0}else if(C.equals(R)===!1)return C.copy(R),!0}return!1}function g(M){const E=M.uniforms;let x=0;const D=16;for(let w=0,C=E.length;w<C;w++){const v=Array.isArray(E[w])?E[w]:[E[w]];for(let y=0,P=v.length;y<P;y++){const I=v[y],L=Array.isArray(I.value)?I.value:[I.value];for(let B=0,q=L.length;B<q;B++){const W=L[B],j=_(W),z=x%D,se=z%j.boundary,he=z+se;x+=se,he!==0&&D-he<j.storage&&(x+=D-he),I.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=x,x+=j.storage}}}const R=x%D;return R>0&&(x+=D-R),M.__size=x,M.__cache={},this}function _(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function m(M){const E=M.target;E.removeEventListener("dispose",m);const x=o.indexOf(E.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class qf{constructor(e={}){const{canvas:t=r0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const M=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this.toneMapping=Hi,this.toneMappingExposure=1;const x=this;let D=!1,R=0,w=0,C=null,v=-1,y=null;const P=new tt,I=new tt;let L=null;const B=new ge(0);let q=0,W=t.width,j=t.height,z=1,se=null,he=null;const Ee=new tt(0,0,W,j),Ge=new tt(0,0,W,j);let ct=!1;const $=new Vu;let ie=!1,Se=!1;const ae=new _e,De=new _e,Fe=new b,We=new tt,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function Mt(){return C===null?z:1}let k=n;function yn(T,F){return t.getContext(T,F)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pu}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",ce,!1),k===null){const F="webgl2";if(k=yn(F,T),k===null)throw yn(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ke,$e,Ce,ft,Re,A,S,V,Z,ee,K,Te,le,fe,Je,te,pe,Pe,Ie,me,Ze,ze,ut,N;function oe(){Ke=new My(k),Ke.init(),ze=new aS(k,Ke),$e=new gy(k,Ke,e,ze),Ce=new sS(k,Ke),$e.reverseDepthBuffer&&h&&Ce.buffers.depth.setReversed(!0),ft=new Ey(k),Re=new Gv,A=new oS(k,Ke,Ce,Re,$e,ze,ft),S=new xy(x),V=new Sy(x),Z=new L0(k),ut=new py(k,Z),ee=new Ty(k,Z,ft,ut),K=new Ay(k,ee,Z,ft),Ie=new wy(k,$e,A),te=new _y(Re),Te=new Hv(x,S,V,Ke,$e,ut,te),le=new mS(x,Re),fe=new Xv,Je=new Zv(Ke),Pe=new fy(x,S,V,Ce,K,p,l),pe=new nS(x,K,$e),N=new gS(k,ft,$e,Ce),me=new my(k,Ke,ft),Ze=new by(k,Ke,ft),ft.programs=Te.programs,x.capabilities=$e,x.extensions=Ke,x.properties=Re,x.renderLists=fe,x.shadowMap=pe,x.state=Ce,x.info=ft}oe();const X=new fS(x,k);this.xr=X,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=Ke.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ke.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(T){T!==void 0&&(z=T,this.setSize(W,j,!1))},this.getSize=function(T){return T.set(W,j)},this.setSize=function(T,F,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,j=F,t.width=Math.floor(T*z),t.height=Math.floor(F*z),H===!0&&(t.style.width=T+"px",t.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(W*z,j*z).floor()},this.setDrawingBufferSize=function(T,F,H){W=T,j=F,z=H,t.width=Math.floor(T*H),t.height=Math.floor(F*H),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(Ee)},this.setViewport=function(T,F,H,G){T.isVector4?Ee.set(T.x,T.y,T.z,T.w):Ee.set(T,F,H,G),Ce.viewport(P.copy(Ee).multiplyScalar(z).round())},this.getScissor=function(T){return T.copy(Ge)},this.setScissor=function(T,F,H,G){T.isVector4?Ge.set(T.x,T.y,T.z,T.w):Ge.set(T,F,H,G),Ce.scissor(I.copy(Ge).multiplyScalar(z).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(T){Ce.setScissorTest(ct=T)},this.setOpaqueSort=function(T){se=T},this.setTransparentSort=function(T){he=T},this.getClearColor=function(T){return T.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(T=!0,F=!0,H=!0){let G=0;if(T){let O=!1;if(C!==null){const ne=C.texture.format;O=ne===Bu||ne===Ou||ne===Fu}if(O){const ne=C.texture.type,ue=ne===Ei||ne===As||ne===mo||ne===Mr||ne===Iu||ne===Uu,xe=Pe.getClearColor(),ye=Pe.getClearAlpha(),Ne=xe.r,Be=xe.g,ve=xe.b;ue?(g[0]=Ne,g[1]=Be,g[2]=ve,g[3]=ye,k.clearBufferuiv(k.COLOR,0,g)):(_[0]=Ne,_[1]=Be,_[2]=ve,_[3]=ye,k.clearBufferiv(k.COLOR,0,_))}else G|=k.COLOR_BUFFER_BIT}F&&(G|=k.DEPTH_BUFFER_BIT),H&&(G|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),fe.dispose(),Je.dispose(),Re.dispose(),S.dispose(),V.dispose(),K.dispose(),ut.dispose(),N.dispose(),Te.dispose(),X.dispose(),X.removeEventListener("sessionstart",ud),X.removeEventListener("sessionend",dd),Qi.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const T=ft.autoReset,F=pe.enabled,H=pe.autoUpdate,G=pe.needsUpdate,O=pe.type;oe(),ft.autoReset=T,pe.enabled=F,pe.autoUpdate=H,pe.needsUpdate=G,pe.type=O}function ce(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Oe(T){const F=T.target;F.removeEventListener("dispose",Oe),yt(F)}function yt(T){Ht(T),Re.remove(T)}function Ht(T){const F=Re.get(T).programs;F!==void 0&&(F.forEach(function(H){Te.releaseProgram(H)}),T.isShaderMaterial&&Te.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,H,G,O,ne){F===null&&(F=xt);const ue=O.isMesh&&O.matrixWorld.determinant()<0,xe=Zm(T,F,H,G,O);Ce.setMaterial(G,ue);let ye=H.index,Ne=1;if(G.wireframe===!0){if(ye=ee.getWireframeAttribute(H),ye===void 0)return;Ne=2}const Be=H.drawRange,ve=H.attributes.position;let et=Be.start*Ne,dt=(Be.start+Be.count)*Ne;ne!==null&&(et=Math.max(et,ne.start*Ne),dt=Math.min(dt,(ne.start+ne.count)*Ne)),ye!==null?(et=Math.max(et,0),dt=Math.min(dt,ye.count)):ve!=null&&(et=Math.max(et,0),dt=Math.min(dt,ve.count));const pt=dt-et;if(pt<0||pt===1/0)return;ut.setup(O,G,xe,H,ye);let Qt,nt=me;if(ye!==null&&(Qt=Z.get(ye),nt=Ze,nt.setIndex(Qt)),O.isMesh)G.wireframe===!0?(Ce.setLineWidth(G.wireframeLinewidth*Mt()),nt.setMode(k.LINES)):nt.setMode(k.TRIANGLES);else if(O.isLine){let be=G.linewidth;be===void 0&&(be=1),Ce.setLineWidth(be*Mt()),O.isLineSegments?nt.setMode(k.LINES):O.isLineLoop?nt.setMode(k.LINE_LOOP):nt.setMode(k.LINE_STRIP)}else O.isPoints?nt.setMode(k.POINTS):O.isSprite&&nt.setMode(k.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)nt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ke.get("WEBGL_multi_draw"))nt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const be=O._multiDrawStarts,ai=O._multiDrawCounts,it=O._multiDrawCount,wn=ye?Z.get(ye).bytesPerElement:1,Ds=Re.get(G).currentProgram.getUniforms();for(let dn=0;dn<it;dn++)Ds.setValue(k,"_gl_DrawID",dn),nt.render(be[dn]/wn,ai[dn])}else if(O.isInstancedMesh)nt.renderInstances(et,pt,O.count);else if(H.isInstancedBufferGeometry){const be=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ai=Math.min(H.instanceCount,be);nt.renderInstances(et,pt,ai)}else nt.render(et,pt)};function st(T,F,H){T.transparent===!0&&T.side===_t&&T.forceSinglePass===!1?(T.side=ln,T.needsUpdate=!0,Oo(T,F,H),T.side=bi,T.needsUpdate=!0,Oo(T,F,H),T.side=_t):Oo(T,F,H)}this.compile=function(T,F,H=null){H===null&&(H=T),f=Je.get(H),f.init(F),E.push(f),H.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),T!==H&&T.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();const G=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ne=O.material;if(ne)if(Array.isArray(ne))for(let ue=0;ue<ne.length;ue++){const xe=ne[ue];st(xe,H,O),G.add(xe)}else st(ne,H,O),G.add(ne)}),E.pop(),f=null,G},this.compileAsync=function(T,F,H=null){const G=this.compile(T,F,H);return new Promise(O=>{function ne(){if(G.forEach(function(ue){Re.get(ue).currentProgram.isReady()&&G.delete(ue)}),G.size===0){O(T);return}setTimeout(ne,10)}Ke.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let En=null;function oi(T){En&&En(T)}function ud(){Qi.stop()}function dd(){Qi.start()}const Qi=new zf;Qi.setAnimationLoop(oi),typeof self<"u"&&Qi.setContext(self),this.setAnimationLoop=function(T){En=T,X.setAnimationLoop(T),T===null?Qi.stop():Qi.start()},X.addEventListener("sessionstart",ud),X.addEventListener("sessionend",dd),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(F),F=X.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,F,C),f=Je.get(T,E.length),f.init(F),E.push(f),De.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),$.setFromProjectionMatrix(De),Se=this.localClippingEnabled,ie=te.init(this.clippingPlanes,Se),m=fe.get(T,M.length),m.init(),M.push(m),X.enabled===!0&&X.isPresenting===!0){const ne=x.xr.getDepthSensingMesh();ne!==null&&Sl(ne,F,-1/0,x.sortObjects)}Sl(T,F,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(se,he),Qe=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Qe&&Pe.addToRenderList(m,T),this.info.render.frame++,ie===!0&&te.beginShadows();const H=f.state.shadowsArray;pe.render(H,T,F),ie===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,O=m.transmissive;if(f.setupLights(),F.isArrayCamera){const ne=F.cameras;if(O.length>0)for(let ue=0,xe=ne.length;ue<xe;ue++){const ye=ne[ue];fd(G,O,T,ye)}Qe&&Pe.render(T);for(let ue=0,xe=ne.length;ue<xe;ue++){const ye=ne[ue];hd(m,T,ye,ye.viewport)}}else O.length>0&&fd(G,O,T,F),Qe&&Pe.render(T),hd(m,T,F);C!==null&&(A.updateMultisampleRenderTarget(C),A.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(x,T,F),ut.resetDefaultState(),v=-1,y=null,E.pop(),E.length>0?(f=E[E.length-1],ie===!0&&te.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Sl(T,F,H,G){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||$.intersectsSprite(T)){G&&We.setFromMatrixPosition(T.matrixWorld).applyMatrix4(De);const ue=K.update(T),xe=T.material;xe.visible&&m.push(T,ue,xe,H,We.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||$.intersectsObject(T))){const ue=K.update(T),xe=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),We.copy(T.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),We.copy(ue.boundingSphere.center)),We.applyMatrix4(T.matrixWorld).applyMatrix4(De)),Array.isArray(xe)){const ye=ue.groups;for(let Ne=0,Be=ye.length;Ne<Be;Ne++){const ve=ye[Ne],et=xe[ve.materialIndex];et&&et.visible&&m.push(T,ue,et,H,We.z,ve)}}else xe.visible&&m.push(T,ue,xe,H,We.z,null)}}const ne=T.children;for(let ue=0,xe=ne.length;ue<xe;ue++)Sl(ne[ue],F,H,G)}function hd(T,F,H,G){const O=T.opaque,ne=T.transmissive,ue=T.transparent;f.setupLightsView(H),ie===!0&&te.setGlobalState(x.clippingPlanes,H),G&&Ce.viewport(P.copy(G)),O.length>0&&Fo(O,F,H),ne.length>0&&Fo(ne,F,H),ue.length>0&&Fo(ue,F,H),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function fd(T,F,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[G.id]===void 0&&(f.state.transmissionRenderTarget[G.id]=new Rs(1,1,{generateMipmaps:!0,type:Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float")?Ro:Ei,minFilter:vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace}));const ne=f.state.transmissionRenderTarget[G.id],ue=G.viewport||P;ne.setSize(ue.z,ue.w);const xe=x.getRenderTarget();x.setRenderTarget(ne),x.getClearColor(B),q=x.getClearAlpha(),q<1&&x.setClearColor(16777215,.5),x.clear(),Qe&&Pe.render(H);const ye=x.toneMapping;x.toneMapping=Hi;const Ne=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),f.setupLightsView(G),ie===!0&&te.setGlobalState(x.clippingPlanes,G),Fo(T,H,G),A.updateMultisampleRenderTarget(ne),A.updateRenderTargetMipmap(ne),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let ve=0,et=F.length;ve<et;ve++){const dt=F[ve],pt=dt.object,Qt=dt.geometry,nt=dt.material,be=dt.group;if(nt.side===_t&&pt.layers.test(G.layers)){const ai=nt.side;nt.side=ln,nt.needsUpdate=!0,pd(pt,H,G,Qt,nt,be),nt.side=ai,nt.needsUpdate=!0,Be=!0}}Be===!0&&(A.updateMultisampleRenderTarget(ne),A.updateRenderTargetMipmap(ne))}x.setRenderTarget(xe),x.setClearColor(B,q),Ne!==void 0&&(G.viewport=Ne),x.toneMapping=ye}function Fo(T,F,H){const G=F.isScene===!0?F.overrideMaterial:null;for(let O=0,ne=T.length;O<ne;O++){const ue=T[O],xe=ue.object,ye=ue.geometry,Ne=G===null?ue.material:G,Be=ue.group;xe.layers.test(H.layers)&&pd(xe,F,H,ye,Ne,Be)}}function pd(T,F,H,G,O,ne){T.onBeforeRender(x,F,H,G,O,ne),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(x,F,H,G,T,ne),O.transparent===!0&&O.side===_t&&O.forceSinglePass===!1?(O.side=ln,O.needsUpdate=!0,x.renderBufferDirect(H,F,G,O,T,ne),O.side=bi,O.needsUpdate=!0,x.renderBufferDirect(H,F,G,O,T,ne),O.side=_t):x.renderBufferDirect(H,F,G,O,T,ne),T.onAfterRender(x,F,H,G,O,ne)}function Oo(T,F,H){F.isScene!==!0&&(F=xt);const G=Re.get(T),O=f.state.lights,ne=f.state.shadowsArray,ue=O.state.version,xe=Te.getParameters(T,O.state,ne,F,H),ye=Te.getProgramCacheKey(xe);let Ne=G.programs;G.environment=T.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(T.isMeshStandardMaterial?V:S).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Ne===void 0&&(T.addEventListener("dispose",Oe),Ne=new Map,G.programs=Ne);let Be=Ne.get(ye);if(Be!==void 0){if(G.currentProgram===Be&&G.lightsStateVersion===ue)return gd(T,xe),Be}else xe.uniforms=Te.getUniforms(T),T.onBeforeCompile(xe,x),Be=Te.acquireProgram(xe,ye),Ne.set(ye,Be),G.uniforms=xe.uniforms;const ve=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(ve.clippingPlanes=te.uniform),gd(T,xe),G.needsLights=Jm(T),G.lightsStateVersion=ue,G.needsLights&&(ve.ambientLightColor.value=O.state.ambient,ve.lightProbe.value=O.state.probe,ve.directionalLights.value=O.state.directional,ve.directionalLightShadows.value=O.state.directionalShadow,ve.spotLights.value=O.state.spot,ve.spotLightShadows.value=O.state.spotShadow,ve.rectAreaLights.value=O.state.rectArea,ve.ltc_1.value=O.state.rectAreaLTC1,ve.ltc_2.value=O.state.rectAreaLTC2,ve.pointLights.value=O.state.point,ve.pointLightShadows.value=O.state.pointShadow,ve.hemisphereLights.value=O.state.hemi,ve.directionalShadowMap.value=O.state.directionalShadowMap,ve.directionalShadowMatrix.value=O.state.directionalShadowMatrix,ve.spotShadowMap.value=O.state.spotShadowMap,ve.spotLightMatrix.value=O.state.spotLightMatrix,ve.spotLightMap.value=O.state.spotLightMap,ve.pointShadowMap.value=O.state.pointShadowMap,ve.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=Be,G.uniformsList=null,Be}function md(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=Ea.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function gd(T,F){const H=Re.get(T);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function Zm(T,F,H,G,O){F.isScene!==!0&&(F=xt),A.resetTextureUnits();const ne=F.fog,ue=G.isMeshStandardMaterial?F.environment:null,xe=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Zt,ye=(G.isMeshStandardMaterial?V:S).get(G.envMap||ue),Ne=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Be=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),ve=!!H.morphAttributes.position,et=!!H.morphAttributes.normal,dt=!!H.morphAttributes.color;let pt=Hi;G.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(pt=x.toneMapping);const Qt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,nt=Qt!==void 0?Qt.length:0,be=Re.get(G),ai=f.state.lights;if(ie===!0&&(Se===!0||T!==y)){const vn=T===y&&G.id===v;te.setState(G,T,vn)}let it=!1;G.version===be.__version?(be.needsLights&&be.lightsStateVersion!==ai.state.version||be.outputColorSpace!==xe||O.isBatchedMesh&&be.batching===!1||!O.isBatchedMesh&&be.batching===!0||O.isBatchedMesh&&be.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&be.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&be.instancing===!1||!O.isInstancedMesh&&be.instancing===!0||O.isSkinnedMesh&&be.skinning===!1||!O.isSkinnedMesh&&be.skinning===!0||O.isInstancedMesh&&be.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&be.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&be.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&be.instancingMorph===!1&&O.morphTexture!==null||be.envMap!==ye||G.fog===!0&&be.fog!==ne||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==te.numPlanes||be.numIntersection!==te.numIntersection)||be.vertexAlphas!==Ne||be.vertexTangents!==Be||be.morphTargets!==ve||be.morphNormals!==et||be.morphColors!==dt||be.toneMapping!==pt||be.morphTargetsCount!==nt)&&(it=!0):(it=!0,be.__version=G.version);let wn=be.currentProgram;it===!0&&(wn=Oo(G,F,O));let Ds=!1,dn=!1,Xr=!1;const mt=wn.getUniforms(),qn=be.uniforms;if(Ce.useProgram(wn.program)&&(Ds=!0,dn=!0,Xr=!0),G.id!==v&&(v=G.id,dn=!0),Ds||y!==T){Ce.buffers.depth.getReversed()?(ae.copy(T.projectionMatrix),a0(ae),l0(ae),mt.setValue(k,"projectionMatrix",ae)):mt.setValue(k,"projectionMatrix",T.projectionMatrix),mt.setValue(k,"viewMatrix",T.matrixWorldInverse);const wi=mt.map.cameraPosition;wi!==void 0&&wi.setValue(k,Fe.setFromMatrixPosition(T.matrixWorld)),$e.logarithmicDepthBuffer&&mt.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&mt.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,dn=!0,Xr=!0)}if(O.isSkinnedMesh){mt.setOptional(k,O,"bindMatrix"),mt.setOptional(k,O,"bindMatrixInverse");const vn=O.skeleton;vn&&(vn.boneTexture===null&&vn.computeBoneTexture(),mt.setValue(k,"boneTexture",vn.boneTexture,A))}O.isBatchedMesh&&(mt.setOptional(k,O,"batchingTexture"),mt.setValue(k,"batchingTexture",O._matricesTexture,A),mt.setOptional(k,O,"batchingIdTexture"),mt.setValue(k,"batchingIdTexture",O._indirectTexture,A),mt.setOptional(k,O,"batchingColorTexture"),O._colorsTexture!==null&&mt.setValue(k,"batchingColorTexture",O._colorsTexture,A));const qr=H.morphAttributes;if((qr.position!==void 0||qr.normal!==void 0||qr.color!==void 0)&&Ie.update(O,H,wn),(dn||be.receiveShadow!==O.receiveShadow)&&(be.receiveShadow=O.receiveShadow,mt.setValue(k,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(qn.envMap.value=ye,qn.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(qn.envMapIntensity.value=F.environmentIntensity),dn&&(mt.setValue(k,"toneMappingExposure",x.toneMappingExposure),be.needsLights&&Qm(qn,Xr),ne&&G.fog===!0&&le.refreshFogUniforms(qn,ne),le.refreshMaterialUniforms(qn,G,z,j,f.state.transmissionRenderTarget[T.id]),Ea.upload(k,md(be),qn,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ea.upload(k,md(be),qn,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&mt.setValue(k,"center",O.center),mt.setValue(k,"modelViewMatrix",O.modelViewMatrix),mt.setValue(k,"normalMatrix",O.normalMatrix),mt.setValue(k,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const vn=G.uniformsGroups;for(let wi=0,Ai=vn.length;wi<Ai;wi++){const _d=vn[wi];N.update(_d,wn),N.bind(_d,wn)}}return wn}function Qm(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function Jm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,F,H){Re.get(T.texture).__webglTexture=F,Re.get(T.depthTexture).__webglTexture=H;const G=Re.get(T);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||Ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,F){const H=Re.get(T);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(T,F=0,H=0){C=T,R=F,w=H;let G=!0,O=null,ne=!1,ue=!1;if(T){const ye=Re.get(T);if(ye.__useDefaultFramebuffer!==void 0)Ce.bindFramebuffer(k.FRAMEBUFFER,null),G=!1;else if(ye.__webglFramebuffer===void 0)A.setupRenderTarget(T);else if(ye.__hasExternalTextures)A.rebindTextures(T,Re.get(T.texture).__webglTexture,Re.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const ve=T.depthTexture;if(ye.__boundDepthTexture!==ve){if(ve!==null&&Re.has(ve)&&(T.width!==ve.image.width||T.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(T)}}const Ne=T.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(ue=!0);const Be=Re.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[F])?O=Be[F][H]:O=Be[F],ne=!0):T.samples>0&&A.useMultisampledRTT(T)===!1?O=Re.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?O=Be[H]:O=Be,P.copy(T.viewport),I.copy(T.scissor),L=T.scissorTest}else P.copy(Ee).multiplyScalar(z).floor(),I.copy(Ge).multiplyScalar(z).floor(),L=ct;if(Ce.bindFramebuffer(k.FRAMEBUFFER,O)&&G&&Ce.drawBuffers(T,O),Ce.viewport(P),Ce.scissor(I),Ce.setScissorTest(L),ne){const ye=Re.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+F,ye.__webglTexture,H)}else if(ue){const ye=Re.get(T.texture),Ne=F||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,ye.__webglTexture,H||0,Ne)}v=-1},this.readRenderTargetPixels=function(T,F,H,G,O,ne,ue){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ue!==void 0&&(xe=xe[ue]),xe){Ce.bindFramebuffer(k.FRAMEBUFFER,xe);try{const ye=T.texture,Ne=ye.format,Be=ye.type;if(!$e.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-G&&H>=0&&H<=T.height-O&&k.readPixels(F,H,G,O,ze.convert(Ne),ze.convert(Be),ne)}finally{const ye=C!==null?Re.get(C).__webglFramebuffer:null;Ce.bindFramebuffer(k.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(T,F,H,G,O,ne,ue){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ue!==void 0&&(xe=xe[ue]),xe){const ye=T.texture,Ne=ye.format,Be=ye.type;if(!$e.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=T.width-G&&H>=0&&H<=T.height-O){Ce.bindFramebuffer(k.FRAMEBUFFER,xe);const ve=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,ve),k.bufferData(k.PIXEL_PACK_BUFFER,ne.byteLength,k.STREAM_READ),k.readPixels(F,H,G,O,ze.convert(Ne),ze.convert(Be),0);const et=C!==null?Re.get(C).__webglFramebuffer:null;Ce.bindFramebuffer(k.FRAMEBUFFER,et);const dt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await o0(k,dt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,ve),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ne),k.deleteBuffer(ve),k.deleteSync(dt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,F=null,H=0){T.isTexture!==!0&&(io("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,T=arguments[1]);const G=Math.pow(2,-H),O=Math.floor(T.image.width*G),ne=Math.floor(T.image.height*G),ue=F!==null?F.x:0,xe=F!==null?F.y:0;A.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,H,0,0,ue,xe,O,ne),Ce.unbindTexture()},this.copyTextureToTexture=function(T,F,H=null,G=null,O=0){T.isTexture!==!0&&(io("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1],F=arguments[2],O=arguments[3]||0,H=null);let ne,ue,xe,ye,Ne,Be,ve,et,dt;const pt=T.isCompressedTexture?T.mipmaps[O]:T.image;H!==null?(ne=H.max.x-H.min.x,ue=H.max.y-H.min.y,xe=H.isBox3?H.max.z-H.min.z:1,ye=H.min.x,Ne=H.min.y,Be=H.isBox3?H.min.z:0):(ne=pt.width,ue=pt.height,xe=pt.depth||1,ye=0,Ne=0,Be=0),G!==null?(ve=G.x,et=G.y,dt=G.z):(ve=0,et=0,dt=0);const Qt=ze.convert(F.format),nt=ze.convert(F.type);let be;F.isData3DTexture?(A.setTexture3D(F,0),be=k.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(A.setTexture2DArray(F,0),be=k.TEXTURE_2D_ARRAY):(A.setTexture2D(F,0),be=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,F.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,F.unpackAlignment);const ai=k.getParameter(k.UNPACK_ROW_LENGTH),it=k.getParameter(k.UNPACK_IMAGE_HEIGHT),wn=k.getParameter(k.UNPACK_SKIP_PIXELS),Ds=k.getParameter(k.UNPACK_SKIP_ROWS),dn=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,pt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,pt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,ye),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ne),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Be);const Xr=T.isDataArrayTexture||T.isData3DTexture,mt=F.isDataArrayTexture||F.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const qn=Re.get(T),qr=Re.get(F),vn=Re.get(qn.__renderTarget),wi=Re.get(qr.__renderTarget);Ce.bindFramebuffer(k.READ_FRAMEBUFFER,vn.__webglFramebuffer),Ce.bindFramebuffer(k.DRAW_FRAMEBUFFER,wi.__webglFramebuffer);for(let Ai=0;Ai<xe;Ai++)Xr&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Re.get(T).__webglTexture,O,Be+Ai),T.isDepthTexture?(mt&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Re.get(F).__webglTexture,O,dt+Ai),k.blitFramebuffer(ye,Ne,ne,ue,ve,et,ne,ue,k.DEPTH_BUFFER_BIT,k.NEAREST)):mt?k.copyTexSubImage3D(be,O,ve,et,dt+Ai,ye,Ne,ne,ue):k.copyTexSubImage2D(be,O,ve,et,dt+Ai,ye,Ne,ne,ue);Ce.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else mt?T.isDataTexture||T.isData3DTexture?k.texSubImage3D(be,O,ve,et,dt,ne,ue,xe,Qt,nt,pt.data):F.isCompressedArrayTexture?k.compressedTexSubImage3D(be,O,ve,et,dt,ne,ue,xe,Qt,pt.data):k.texSubImage3D(be,O,ve,et,dt,ne,ue,xe,Qt,nt,pt):T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,O,ve,et,ne,ue,Qt,nt,pt.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,O,ve,et,pt.width,pt.height,Qt,pt.data):k.texSubImage2D(k.TEXTURE_2D,O,ve,et,ne,ue,Qt,nt,pt);k.pixelStorei(k.UNPACK_ROW_LENGTH,ai),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,it),k.pixelStorei(k.UNPACK_SKIP_PIXELS,wn),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ds),k.pixelStorei(k.UNPACK_SKIP_IMAGES,dn),O===0&&F.generateMipmaps&&k.generateMipmap(be),Ce.unbindTexture()},this.copyTextureToTexture3D=function(T,F,H=null,G=null,O=0){return T.isTexture!==!0&&(io("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,T=arguments[2],F=arguments[3],O=arguments[4]||0),io('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,F,H,G,O)},this.initRenderTarget=function(T){Re.get(T).__webglFramebuffer===void 0&&A.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?A.setTextureCube(T,0):T.isData3DTexture?A.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?A.setTexture2DArray(T,0):A.setTexture2D(T,0),Ce.unbindTexture()},this.resetState=function(){R=0,w=0,C=null,Ce.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}class Yf extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class _S{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zc,this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Yt=new b;class Wu{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Wu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const vh=new b,Sh=new tt,Mh=new tt,xS=new b,Th=new _e,sa=new b,$l=new ii,bh=new _e,Zl=new Co;class yS extends we{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Md,this.bindMatrix=new _e,this.bindMatrixInverse=new _e,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ni),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,sa),this.boundingBox.expandByPoint(sa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ii),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,sa),this.boundingSphere.expandByPoint(sa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$l.copy(this.boundingSphere),$l.applyMatrix4(s),e.ray.intersectsSphere($l)!==!1&&(bh.copy(s).invert(),Zl.copy(e.ray).applyMatrix4(bh),!(this.boundingBox!==null&&Zl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Zl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Md?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Cg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Sh.fromBufferAttribute(s.attributes.skinIndex,e),Mh.fromBufferAttribute(s.attributes.skinWeight,e),vh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Mh.getComponent(r);if(o!==0){const a=Sh.getComponent(r);Th.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(xS.copy(vh).applyMatrix4(Th),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class jf extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Kf extends Rt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=$t,u=$t,d,h){super(null,o,a,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Eh=new _e,vS=new _e;class Xu{constructor(e=[],t=[]){this.uuid=Hn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new _e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new _e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:vS;Eh.multiplyMatrices(a,t[r]),Eh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Xu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Kf(t,e,e,bn,zn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new jf),this.bones.push(o),this.boneInverses.push(new _e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Jc extends Ct{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const qs=new _e,wh=new _e,ra=[],Ah=new ni,SS=new _e,Zr=new we,Qr=new ii;class MS extends we{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,SS)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ni),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qs),Ah.copy(e.boundingBox).applyMatrix4(qs),this.boundingBox.union(Ah)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ii),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qs),Qr.copy(e.boundingSphere).applyMatrix4(qs),this.boundingSphere.union(Qr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Zr.geometry=this.geometry,Zr.material=this.material,Zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qr.copy(this.boundingSphere),Qr.applyMatrix4(n),e.ray.intersectsSphere(Qr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,qs),wh.multiplyMatrices(n,qs),Zr.matrixWorld=wh,Zr.raycast(e,ra);for(let o=0,a=ra.length;o<a;o++){const l=ra[o];l.instanceId=r,l.object=this,t.push(l)}ra.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Kf(new Float32Array(s*this.count),s,this.count,Nu,zn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ji extends Gn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const La=new b,Ia=new b,Rh=new _e,Jr=new Co,oa=new ii,Ql=new b,Ch=new b;class Ki extends ht{constructor(e=new Et,t=new ji){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)La.fromBufferAttribute(t,s-1),Ia.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=La.distanceTo(Ia);e.setAttribute("lineDistance",new St(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(s),oa.radius+=r,e.ray.intersectsSphere(oa)===!1)return;Rh.copy(s).invert(),Jr.copy(e.ray).applyMatrix4(Rh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const f=u.getX(_),M=u.getX(_+1),E=aa(this,e,Jr,l,f,M);E&&t.push(E)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),f=aa(this,e,Jr,l,_,m);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const f=aa(this,e,Jr,l,_,_+1);f&&t.push(f)}if(this.isLineLoop){const _=aa(this,e,Jr,l,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function aa(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(La.fromBufferAttribute(o,s),Ia.fromBufferAttribute(o,r),t.distanceSqToSegment(La,Ia,Ql,Ch)>n)return;Ql.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ql);if(!(l<e.near||l>e.far))return{distance:l,point:Ch.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Ph=new b,Dh=new b;class $f extends Ki{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Ph.fromBufferAttribute(t,s),Dh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ph.distanceTo(Dh);e.setAttribute("lineDistance",new St(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class TS extends Ki{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Zf extends Gn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Lh=new _e,eu=new Co,la=new ii,ca=new b;class bS extends ht{constructor(e=new Et,t=new Zf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),la.copy(n.boundingSphere),la.applyMatrix4(s),la.radius+=r,e.ray.intersectsSphere(la)===!1)return;Lh.copy(s).invert(),eu.copy(e.ray).applyMatrix4(Lh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=h,_=p;g<_;g++){const m=c.getX(g);ca.fromBufferAttribute(d,m),Ih(ca,m,l,s,e,t,this)}}else{const h=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=h,_=p;g<_;g++)ca.fromBufferAttribute(d,g),Ih(ca,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ih(i,e,t,n,s,r,o){const a=eu.distanceSqToPoint(i);if(a<t){const l=new b;eu.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class xn extends Rt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class lr extends Et{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],h=[],p=[];let g=0;const _=[],m=n/2;let f=0;M(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new St(d,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(p,2));function M(){const x=new b,D=new b;let R=0;const w=(t-e)/n;for(let C=0;C<=r;C++){const v=[],y=C/r,P=y*(t-e)+e;for(let I=0;I<=s;I++){const L=I/s,B=L*l+a,q=Math.sin(B),W=Math.cos(B);D.x=P*q,D.y=-y*n+m,D.z=P*W,d.push(D.x,D.y,D.z),x.set(q,w,W).normalize(),h.push(x.x,x.y,x.z),p.push(L,1-y),v.push(g++)}_.push(v)}for(let C=0;C<s;C++)for(let v=0;v<r;v++){const y=_[v][C],P=_[v+1][C],I=_[v+1][C+1],L=_[v][C+1];(e>0||v!==0)&&(u.push(y,P,L),R+=3),(t>0||v!==r-1)&&(u.push(P,I,L),R+=3)}c.addGroup(f,R,0),f+=R}function E(x){const D=g,R=new je,w=new b;let C=0;const v=x===!0?e:t,y=x===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,m*y,0),h.push(0,y,0),p.push(.5,.5),g++;const P=g;for(let I=0;I<=s;I++){const B=I/s*l+a,q=Math.cos(B),W=Math.sin(B);w.x=v*W,w.y=m*y,w.z=v*q,d.push(w.x,w.y,w.z),h.push(0,y,0),R.x=q*.5+.5,R.y=W*.5*y+.5,p.push(R.x,R.y),g++}for(let I=0;I<s;I++){const L=D+I,B=P+I;x===!0?u.push(B,B+1,L):u.push(B+1,B,L),C+=3}c.addGroup(f,C,x===!0?1:2),f+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qu extends lr{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new qu(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $i extends Et{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new b,h=new b,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const M=[],E=f/n;let x=0;f===0&&o===0?x=.5/t:f===n&&l===Math.PI&&(x=-.5/t);for(let D=0;D<=t;D++){const R=D/t;d.x=-e*Math.cos(s+R*r)*Math.sin(o+E*a),d.y=e*Math.cos(o+E*a),d.z=e*Math.sin(s+R*r)*Math.sin(o+E*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(R+x,1-E),M.push(c++)}u.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const E=u[f][M+1],x=u[f][M],D=u[f+1][M],R=u[f+1][M+1];(f!==0||o>0)&&p.push(E,x,R),(f!==n-1||l<Math.PI)&&p.push(x,D,R)}this.setIndex(p),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(_,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ms extends Et{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new b,d=new b,h=new b;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,M=(s+1)*p+g;o.push(_,m,M),o.push(m,f,M)}this.setIndex(o),this.setAttribute("position",new St(a,3)),this.setAttribute("normal",new St(l,3)),this.setAttribute("uv",new St(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ms(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Yu extends Gn{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new ge(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class It extends Gn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cf,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class si extends It{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new je(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ua(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ES(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function wS(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Uh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function Qf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class Po{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class AS extends Po{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Td,endingEnd:Td}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case bd:r=e,a=2*t-n;break;case Ed:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case bd:o=e,l=2*n-t;break;case Ed:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,f=-h*m+2*h*_-h*g,M=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,E=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let D=0;D!==a;++D)r[D]=f*o[u+D]+M*o[c+D]+E*o[l+D]+x*o[d+D];return r}}class RS extends Po{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==a;++h)r[h]=o[c+h]*d+o[l+h]*u;return r}}class CS extends Po{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class ri{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ua(t,this.TimeBufferType),this.values=ua(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ua(e.times,Array),values:ua(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new CS(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new RS(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new AS(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case go:t=this.InterpolantFactoryMethodDiscrete;break;case _o:t=this.InterpolantFactoryMethodLinear;break;case Ml:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return go;case this.InterpolantFactoryMethodLinear:return _o;case this.InterpolantFactoryMethodSmooth:return Ml}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&ES(s))for(let a=0,l=s.length;a!==l;++a){const c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ml,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{const d=a*n,h=d-n,p=d+n;for(let g=0;g!==n;++g){const _=t[d+g];if(_!==t[h+g]||_!==t[p+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,h=o*n;for(let p=0;p!==n;++p)t[h+p]=t[d+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}ri.prototype.TimeBufferType=Float32Array;ri.prototype.ValueBufferType=Float32Array;ri.prototype.DefaultInterpolation=_o;class Br extends ri{constructor(e,t,n){super(e,t,n)}}Br.prototype.ValueTypeName="bool";Br.prototype.ValueBufferType=Array;Br.prototype.DefaultInterpolation=go;Br.prototype.InterpolantFactoryMethodLinear=void 0;Br.prototype.InterpolantFactoryMethodSmooth=void 0;class Jf extends ri{}Jf.prototype.ValueTypeName="color";class wr extends ri{}wr.prototype.ValueTypeName="number";class PS extends Po{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t);let c=e*a;for(let u=c+a;c!==u;c+=4)He.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Ar extends ri{InterpolantFactoryMethodLinear(e){return new PS(this.times,this.values,this.getValueSize(),e)}}Ar.prototype.ValueTypeName="quaternion";Ar.prototype.InterpolantFactoryMethodSmooth=void 0;class kr extends ri{constructor(e,t,n){super(e,t,n)}}kr.prototype.ValueTypeName="string";kr.prototype.ValueBufferType=Array;kr.prototype.DefaultInterpolation=go;kr.prototype.InterpolantFactoryMethodLinear=void 0;kr.prototype.InterpolantFactoryMethodSmooth=void 0;class Rr extends ri{}Rr.prototype.ValueTypeName="vector";class DS{constructor(e="",t=-1,n=[],s=Pg){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Hn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(IS(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ri.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=wS(l);l=Uh(l,1,u),c=Uh(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new wr(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(r);if(u&&u.length>1){const d=u[1];let h=s[d];h||(s[d]=h=[]),h.push(c)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,p,g,_){if(p.length!==0){const m=[],f=[];Qf(p,m,f,g),m.length!==0&&_.push(new d(h,m,f))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const p={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)p[h[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let M=0;M!==h[g].morphTargets.length;++M){const E=h[g];m.push(E.time),f.push(E.morphTarget===_?1:0)}s.push(new wr(".morphTargetInfluence["+_+"]",m,f))}l=p.length*o}else{const p=".bones["+t[d].name+"]";n(Rr,p+".position",h,"pos",s),n(Ar,p+".quaternion",h,"rot",s),n(Rr,p+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function LS(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return wr;case"vector":case"vector2":case"vector3":case"vector4":return Rr;case"color":return Jf;case"quaternion":return Ar;case"bool":case"boolean":return Br;case"string":return kr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function IS(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=LS(i.type);if(i.times===void 0){const t=[],n=[];Qf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Oi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class US{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}}const NS=new US;class Cs{constructor(e){this.manager=e!==void 0?e:NS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Cs.DEFAULT_MATERIAL_NAME="__DEFAULT";const fi={};class FS extends Error{constructor(e,t){super(e),this.response=t}}class ju extends Cs{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Oi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(fi[e]!==void 0){fi[e].push({onLoad:t,onProgress:n,onError:s});return}fi[e]=[],fi[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=fi[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=h?parseInt(h):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){M();function M(){d.read().then(({done:E,value:x})=>{if(E)f.close();else{_+=x.byteLength;const D=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let R=0,w=u.length;R<w;R++){const C=u[R];C.onProgress&&C.onProgress(D)}f.enqueue(x),M()}},E=>{f.error(E)})}}});return new Response(m)}else throw new FS(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,p=new TextDecoder(h);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{Oi.add(e,c);const u=fi[e];delete fi[e];for(let d=0,h=u.length;d<h;d++){const p=u[d];p.onLoad&&p.onLoad(c)}}).catch(c=>{const u=fi[e];if(u===void 0)throw this.manager.itemError(e),c;delete fi[e];for(let d=0,h=u.length;d<h;d++){const p=u[d];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class OS extends Cs{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Oi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=xo("img");function l(){u(),Oi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class BS extends Cs{constructor(e){super(e)}load(e,t,n,s){const r=new Rt,o=new OS(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class hl extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Jl=new _e,Nh=new b,Fh=new b;class Ku{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new je(512,512),this.map=null,this.mapPass=null,this.matrix=new _e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vu,this._frameExtents=new je(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Nh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nh),Fh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fh),t.updateMatrixWorld(),Jl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Jl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class kS extends Ku{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=br*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class zS extends hl{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new kS}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Oh=new _e,eo=new b,ec=new b;class VS extends Ku{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new je(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),eo.setFromMatrixPosition(e.matrixWorld),n.position.copy(eo),ec.copy(n.position),ec.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ec),n.updateMatrixWorld(),s.makeTranslation(-eo.x,-eo.y,-eo.z),Oh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oh)}}class HS extends hl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new VS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class GS extends Ku{constructor(){super(new Hu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zr extends hl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new GS}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ep extends hl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class lo{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class WS extends Cs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Oi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Oi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Oi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Oi.add(e,l),r.manager.itemStart(e)}}let da;class tp{static getContext(){return da===void 0&&(da=new(window.AudioContext||window.webkitAudioContext)),da}static setContext(e){da=e}}class Vr extends Cs{constructor(e){super(e)}load(e,t,n,s){const r=this,o=new ju(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{const c=l.slice(0);tp.getContext().decodeAudioData(c,function(d){t(d)}).catch(a)}catch(c){a(c)}},n,s);function a(l){s?s(l):console.error(l),r.manager.itemError(e)}}}class XS{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Bh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Bh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Bh(){return performance.now()}const rs=new b,kh=new He,qS=new b,os=new b;class YS extends ht{constructor(){super(),this.type="AudioListener",this.context=tp.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new XS}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(rs,kh,qS),os.set(0,0,-1).applyQuaternion(kh),t.positionX){const s=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(rs.x,s),t.positionY.linearRampToValueAtTime(rs.y,s),t.positionZ.linearRampToValueAtTime(rs.z,s),t.forwardX.linearRampToValueAtTime(os.x,s),t.forwardY.linearRampToValueAtTime(os.y,s),t.forwardZ.linearRampToValueAtTime(os.z,s),t.upX.linearRampToValueAtTime(n.x,s),t.upY.linearRampToValueAtTime(n.y,s),t.upZ.linearRampToValueAtTime(n.z,s)}else t.setPosition(rs.x,rs.y,rs.z),t.setOrientation(os.x,os.y,os.z,n.x,n.y,n.z)}}let Cr=class extends ht{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}};const as=new b,zh=new He,jS=new b,ls=new b;class np extends Cr{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(as,zh,jS),ls.set(0,0,1).applyQuaternion(zh);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(as.x,n),t.positionY.linearRampToValueAtTime(as.y,n),t.positionZ.linearRampToValueAtTime(as.z,n),t.orientationX.linearRampToValueAtTime(ls.x,n),t.orientationY.linearRampToValueAtTime(ls.y,n),t.orientationZ.linearRampToValueAtTime(ls.z,n)}else t.setPosition(as.x,as.y,as.z),t.setOrientation(ls.x,ls.y,ls.z)}}const $u="\\[\\]\\.:\\/",KS=new RegExp("["+$u+"]","g"),Zu="[^"+$u+"]",$S="[^"+$u.replace("\\.","")+"]",ZS=/((?:WC+[\/:])*)/.source.replace("WC",Zu),QS=/(WCOD+)?/.source.replace("WCOD",$S),JS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zu),eM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zu),tM=new RegExp("^"+ZS+QS+JS+eM+"$"),nM=["material","materials","bones","map"];class iM{constructor(e,t,n){const s=n||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ot{constructor(e,t,n){this.path=t,this.parsedPath=n||ot.parseTrackName(t),this.node=ot.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ot.Composite(e,t,n):new ot(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(KS,"")}static parseTrackName(e){const t=tM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);nM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ot.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[s];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ot.Composite=iM;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Vh=new _e;class sM{constructor(e,t,n=0,s=1/0){this.ray=new Co(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new zu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Vh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vh),this}intersectObject(e,t=!0,n=[]){return tu(e,this,n,t),n.sort(Hh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)tu(e[s],this,n,t);return n.sort(Hh),n}}function Hh(i,e){return i.distance-e.distance}function tu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)tu(r[o],e,t,!0)}}class rM extends $f{constructor(e=10,t=10,n=4473924,s=8947848){n=new ge(n),s=new ge(s);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let h=0,p=0,g=-a;h<=t;h++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=h===r?n:s;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}const u=new Et;u.setAttribute("position",new St(l,3)),u.setAttribute("color",new St(c,3));const d=new ji({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pu);function Gh(i,e){if(e===Dg)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===$c||e===Rf){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===$c)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Qu extends Cs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new uM(t)}),this.register(function(t){return new dM(t)}),this.register(function(t){return new vM(t)}),this.register(function(t){return new SM(t)}),this.register(function(t){return new MM(t)}),this.register(function(t){return new fM(t)}),this.register(function(t){return new pM(t)}),this.register(function(t){return new mM(t)}),this.register(function(t){return new gM(t)}),this.register(function(t){return new cM(t)}),this.register(function(t){return new _M(t)}),this.register(function(t){return new hM(t)}),this.register(function(t){return new yM(t)}),this.register(function(t){return new xM(t)}),this.register(function(t){return new aM(t)}),this.register(function(t){return new TM(t)}),this.register(function(t){return new bM(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=lo.extractUrlBase(e);o=lo.resolveURL(c,this.path)}else o=lo.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new ju(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===ip){try{o[qe.KHR_BINARY_GLTF]=new EM(e)}catch(d){s&&s(d);return}r=JSON.parse(o[qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new BM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case qe.KHR_MATERIALS_UNLIT:o[d]=new lM;break;case qe.KHR_DRACO_MESH_COMPRESSION:o[d]=new wM(r,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:o[d]=new AM;break;case qe.KHR_MESH_QUANTIZATION:o[d]=new RM;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function oM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class aM{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new ge(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Zt);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new zr(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new HS(u),c.distance=d;break;case"spot":c=new zS(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,mi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class lM{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return at}extendParams(e,t,n){const s=[];e.color=new ge(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Zt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,zt))}return Promise.all(s)}}class cM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class uM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new je(a,a)}return Promise.all(r)}}class dM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class hM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class fM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ge(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Zt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,zt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class pM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class mM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ge().setRGB(a[0],a[1],a[2],Zt),Promise.all(r)}}class gM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class _M{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ge().setRGB(a[0],a[1],a[2],Zt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,zt)),Promise.all(r)}}class xM{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class yM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class vM{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class SM{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class MM{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class TM{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=s.byteOffset||0,c=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(p),u,d,h,s.mode,s.filter),p})})}else return null}}class bM{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==Mn.TRIANGLES&&c.mode!==Mn.TRIANGLE_STRIP&&c.mode!==Mn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,p=[];for(const g of d){const _=new _e,m=new b,f=new He,M=new b(1,1,1),E=new MS(g.geometry,g.material,h);for(let x=0;x<h;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,x),l.SCALE&&M.fromBufferAttribute(l.SCALE,x),E.setMatrixAt(x,_.compose(m,f,M));for(const x in l)if(x==="_COLOR_0"){const D=l[x];E.instanceColor=new Jc(D.array,D.itemSize,D.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);ht.prototype.copy.call(E,g),this.parser.assignFinalMaterial(E),p.push(E)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const ip="glTF",to=12,Wh={JSON:1313821514,BIN:5130562};class EM{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,to),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ip)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-to,r=new DataView(e,to);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Wh.JSON){const c=new Uint8Array(e,to+o,a);this.content=n.decode(c)}else if(l===Wh.BIN){const c=to+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class wM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=nu[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=nu[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],p=cr[h.componentType];c[d]=p.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(p){for(const g in p.attributes){const _=p.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}d(p)},a,c,Zt,h)})})}}class AM{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class RM{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}}class sp extends Po{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=s-t,d=(n-t)/u,h=d*d,p=h*d,g=e*c,_=g-c,m=-2*p+3*h,f=p-h,M=1-m,E=f-h+d;for(let x=0;x!==a;x++){const D=o[_+x+a],R=o[_+x+l]*u,w=o[g+x+a],C=o[g+x]*u;r[x]=M*D+E*R+m*w+f*C}return r}}const CM=new He;class PM extends sp{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return CM.fromArray(r).normalize().toArray(r),r}}const Mn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},cr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Xh={9728:$t,9729:Tt,9984:xf,9985:ya,9986:no,9987:vi},qh={33071:Fi,33648:Pa,10497:Sr},tc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},nu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ui={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},DM={CUBICSPLINE:void 0,LINEAR:_o,STEP:go},nc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function LM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new It({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:bi})),i.DefaultMaterial}function cs(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function mi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function IM(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;o.push(h)}if(s){const h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(h)}if(r){const h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],h=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function UM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function NM(i){let e;const t=i.extensions&&i.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ic(t.attributes):e=i.indices+":"+ic(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ic(i.targets[n]);return e}function ic(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function iu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function FM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const OM=new _e;class BM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new oM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new BS(this.options.manager):this.textureLoader=new WS(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ju(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return cs(r,a,s),mi(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())r(u,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(lo.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=tc[s.type],a=cr[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Ct(c,o,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=tc[s.type],c=cr[s.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(p&&p!==d){const f=Math.floor(h/p),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count;let E=t.cache.get(M);E||(_=new c(a,f*p,s.count*p/u),E=new _S(_,p/u),t.cache.add(M,E)),m=new Wu(E,l,h%p/u,g)}else a===null?_=new c(s.count*l):_=new c(a,h,s.count*l),m=new Ct(_,l,g);if(s.sparse!==void 0){const f=tc.SCALAR,M=cr[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,D=new M(o[1],E,s.sparse.count*f),R=new c(o[2],x,s.sparse.count*l);a!==null&&(m=new Ct(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,C=D.length;w<C;w++){const v=D[w];if(m.setX(v,R[w*l]),l>=2&&m.setY(v,R[w*l+1]),l>=3&&m.setZ(v,R[w*l+2]),l>=4&&m.setW(v,R[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(r.samplers||{})[o.sampler]||{};return u.magFilter=Xh[h.magFilter]||Tt,u.minFilter=Xh[h.minFilter]||vi,u.wrapS=qh[h.wrapS]||Sr,u.wrapT=qh[h.wrapT]||Sr,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==$t&&u.minFilter!==Tt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=s.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const h=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(h,p){let g=h;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Rt(_);m.needsUpdate=!0,h(m)}),t.load(lo.resolveURL(d,r.path),g,void 0,p)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),mi(d,o),d.userData.mimeType=o.mimeType||FM(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Zf,Gn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new ji,Gn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return It}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[qe.KHR_MATERIALS_UNLIT]){const d=s[qe.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,r,t))}else{const d=r.pbrMetallicRoughness||{};if(a.color=new ge(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Zt),a.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,zt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=_t);const u=r.alphaMode||nc.OPAQUE;if(u===nc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===nc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==at&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new je(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==at&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==at){const d=r.emissiveFactor;a.emissive=new ge().setRGB(d[0],d[1],d[2],Zt)}return r.emissiveTexture!==void 0&&o!==at&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,zt)),Promise.all(c).then(function(){const d=new o(a);return r.name&&(d.name=r.name),mi(d,r),t.associations.set(d,{materials:e}),r.extensions&&cs(s,d,r),d})}createUniqueName(e){const t=ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Yh(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=NM(c),d=s[u];if(d)o.push(d.promise);else{let h;c.extensions&&c.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=Yh(new Et,c,t),s[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?LM(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let p=0,g=u.length;p<g;p++){const _=u[p],m=o[p];let f;const M=c[p];if(m.mode===Mn.TRIANGLES||m.mode===Mn.TRIANGLE_STRIP||m.mode===Mn.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new yS(_,M):new we(_,M),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===Mn.TRIANGLE_STRIP?f.geometry=Gh(f.geometry,Rf):m.mode===Mn.TRIANGLE_FAN&&(f.geometry=Gh(f.geometry,$c));else if(m.mode===Mn.LINES)f=new $f(_,M);else if(m.mode===Mn.LINE_STRIP)f=new Ki(_,M);else if(m.mode===Mn.LINE_LOOP)f=new TS(_,M);else if(m.mode===Mn.POINTS)f=new bS(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&UM(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),mi(f,r),m.extensions&&cs(s,f,m),t.assignFinalMaterial(f),d.push(f)}for(let p=0,g=d.length;p<g;p++)t.associations.set(d[p],{meshes:e,primitives:p});if(d.length===1)return r.extensions&&cs(s,d[0],r),d[0];const h=new _s;r.extensions&&cs(s,h,r),t.associations.set(h,{meshes:e});for(let p=0,g=d.length;p<g;p++)h.add(d[p]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qt(s0.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Hu(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),mi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const h=new _e;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Xu(a,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){const p=s.channels[d],g=s.samplers[p.sampler],_=p.target,m=_.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",M)),c.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const h=d[0],p=d[1],g=d[2],_=d[3],m=d[4],f=[];for(let M=0,E=h.length;M<E;M++){const x=h[M],D=p[M],R=g[M],w=_[M],C=m[M];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const v=n._createAnimationTracks(x,D,R,w,C);if(v)for(let y=0;y<v.length;y++)f.push(v[y])}return new DS(r,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(h,OM)});for(let p=0,g=d.length;p<g;p++)u.add(d[p]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new jf:c.length>1?u=new _s:c.length===1?u=c[0]:u=new ht,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=o),mi(u,r),r.extensions&&cs(n,u,r),r.matrix!==void 0){const d=new _e;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new _s;n.name&&(r.name=s.createUniqueName(n.name)),mi(r,n),n.extensions&&cs(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)r.add(l[u]);const c=u=>{const d=new Map;for(const[h,p]of s.associations)(h instanceof Gn||h instanceof Rt)&&d.set(h,p);return u.traverse(h=>{const p=s.associations.get(h);p!=null&&d.set(h,p)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,l=[];Ui[r.path]===Ui.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch(Ui[r.path]){case Ui.weights:c=wr;break;case Ui.rotation:c=Ar;break;case Ui.position:case Ui.scale:c=Rr;break;default:switch(n.itemSize){case 1:c=wr;break;case 2:case 3:default:c=Rr;break}break}const u=s.interpolation!==void 0?DM[s.interpolation]:_o,d=this._getArrayFromAccessor(n);for(let h=0,p=l.length;h<p;h++){const g=new c(l[h]+"."+Ui[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=iu(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Ar?PM:sp;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function kM(i,e,t){const n=e.attributes,s=new ni;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new b(l[0],l[1],l[2]),new b(c[0],c[1],c[2])),a.normalized){const u=iu(cr[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new b,l=new b;for(let c=0,u=r.length;c<u;c++){const d=r[c];if(d.POSITION!==void 0){const h=t.json.accessors[d.POSITION],p=h.min,g=h.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),h.normalized){const _=iu(cr[h.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new ii;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Yh(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(const o in n){const a=nu[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Ye.workingColorSpace!==Zt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),mi(i,e),kM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?IM(i,e.targets,t):i})}const zM=document.getElementById("drone-3d-container"),Do=new Yf,Ju=new qt(50,1,.1,100);Ju.position.set(0,.5,2);Ju.lookAt(0,0,0);const fl=new qf({alpha:!0,antialias:!0});fl.setSize(400,400);fl.setClearColor(0,0);zM.appendChild(fl.domElement);const VM=new ep(16777215,.8);Do.add(VM);const rp=new zr(51455,1);rp.position.set(2,2,2);Do.add(rp);const op=new zr(16739179,.5);op.position.set(-2,1,-2);Do.add(op);let gi=null,ap=[];const HM=new Qu;HM.load("./doron.glb",i=>{gi=i.scene,gi.scale.set(.8,.8,.8),gi.position.set(0,0,0),Do.add(gi),gi.traverse(a=>{if(a.name==="pera1"||a.name==="pera2"||a.name==="pera3"||a.name==="pera4"){if(a.geometry){a.geometry.computeBoundingBox();const l=new b;a.geometry.boundingBox.getCenter(l),a.geometry.translate(-l.x,-l.y,-l.z),a.position.copy(l)}ap.push(a)}});const e=new Tn(.1,.04,.01),t=new It({color:35071,emissive:35071,emissiveIntensity:2}),n=new we(e,t);n.position.set(0,.04,.22),gi.add(n);let s=0;const r=[{visible:!0,duration:150},{visible:!1,duration:150},{visible:!0,duration:150},{visible:!1,duration:1e3}];function o(){n.visible=r[s].visible,setTimeout(()=>{s=(s+1)%r.length,o()},r[s].duration)}o()});let jh=0;function lp(){requestAnimationFrame(lp),gi&&(jh+=.016,gi.position.y=Math.sin(jh*1.2)*.05,gi.rotation.y+=.005,ap.forEach(i=>{i.rotation.y+=.5})),fl.render(Do,Ju)}lp();const xi=new Audio("./mainBGM.mp3");xi.loop=!0;xi.volume=.2;let co=!1;const Pr=document.getElementById("bgm-btn");function GM(){co?(xi.pause(),Pr.classList.remove("playing"),co=!1):xi.play().then(()=>{Pr.classList.add("playing"),co=!0}).catch(i=>console.log("BGM再生エラー:",i))}Pr.addEventListener("click",GM);const cp=new Audio("./mainbutton.mp3");cp.volume=.5;const yo=new Audio("./crash.mp3");yo.volume=.3;const WM=document.getElementById("credits-btn"),su=document.getElementById("back-btn"),up=document.getElementById("credits-page"),dp=document.getElementById("landing-page");WM.addEventListener("click",()=>{yo.currentTime=0,yo.play(),dp.style.display="none",up.style.display="flex",su.style.display="block",Pr.style.display="none"});su.addEventListener("click",()=>{yo.currentTime=0,yo.play(),up.style.display="none",dp.style.display="flex",su.style.display="none",Pr.style.display="flex"});function XM(i=2e3){if(!co)return;const e=xi.volume,t=20,n=i/t,s=e/t;let r=0;const o=setInterval(()=>{r++,xi.volume=Math.max(0,e-s*r),r>=t&&(clearInterval(o),xi.pause(),xi.currentTime=0,xi.volume=.2,Pr.classList.remove("playing"),co=!1)},n)}function hp(i,e){cp.play(),XM(2500);let t=0;const n=setInterval(()=>{i.style.opacity=i.style.opacity==="0.3"?"1":"0.3",t++,t>=15&&(clearInterval(n),i.style.opacity="1",e())},200)}document.getElementById("landing-mr-btn").addEventListener("click",function(){const i=this;i.disabled=!0,document.getElementById("landing-vr-btn").disabled=!0,hp(i,function(){document.getElementById("landing-page").style.display="none",document.getElementById("start-button").click()})});document.getElementById("landing-vr-btn").addEventListener("click",function(){const i=this;i.disabled=!0,document.getElementById("landing-mr-btn").disabled=!0,hp(i,function(){document.getElementById("landing-page").style.display="none",document.getElementById("vr-button").click()})});const vt={ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:.05,AxisTouchThreshold:.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function fp(i){const e=await fetch(i);if(e.ok)return e.json();throw new Error(e.statusText)}async function qM(i){if(!i)throw new Error("No basePath supplied");return await fp(`${i}/profilesList.json`)}async function YM(i,e,t=null,n=!0){if(!i)throw new Error("No xrInputSource supplied");if(!e)throw new Error("No basePath supplied");const s=await qM(e);let r;if(i.profiles.some(l=>{const c=s[l];return c&&(r={profileId:l,profilePath:`${e}/${c.path}`,deprecated:!!c.deprecated}),!!r}),!r){if(!t)throw new Error("No matching profile name found");const l=s[t];if(!l)throw new Error(`No matching profile name found and default profile "${t}" missing.`);r={profileId:t,profilePath:`${e}/${l.path}`,deprecated:!!l.deprecated}}const o=await fp(r.profilePath);let a;if(n){let l;if(i.handedness==="any"?l=o.layouts[Object.keys(o.layouts)[0]]:l=o.layouts[i.handedness],!l)throw new Error(`No matching handedness, ${i.handedness}, in profile ${r.profileId}`);l.assetPath&&(a=r.profilePath.replace("profile.json",l.assetPath))}return{profile:o,assetPath:a}}const jM={xAxis:0,yAxis:0,button:0,state:vt.ComponentState.DEFAULT};function KM(i=0,e=0){let t=i,n=e;if(Math.sqrt(i*i+e*e)>1){const o=Math.atan2(e,i);t=Math.cos(o),n=Math.sin(o)}return{normalizedXAxis:t*.5+.5,normalizedYAxis:n*.5+.5}}class $M{constructor(e){this.componentProperty=e.componentProperty,this.states=e.states,this.valueNodeName=e.valueNodeName,this.valueNodeProperty=e.valueNodeProperty,this.valueNodeProperty===vt.VisualResponseProperty.TRANSFORM&&(this.minNodeName=e.minNodeName,this.maxNodeName=e.maxNodeName),this.value=0,this.updateFromComponent(jM)}updateFromComponent({xAxis:e,yAxis:t,button:n,state:s}){const{normalizedXAxis:r,normalizedYAxis:o}=KM(e,t);switch(this.componentProperty){case vt.ComponentProperty.X_AXIS:this.value=this.states.includes(s)?r:.5;break;case vt.ComponentProperty.Y_AXIS:this.value=this.states.includes(s)?o:.5;break;case vt.ComponentProperty.BUTTON:this.value=this.states.includes(s)?n:0;break;case vt.ComponentProperty.STATE:this.valueNodeProperty===vt.VisualResponseProperty.VISIBILITY?this.value=this.states.includes(s):this.value=this.states.includes(s)?1:0;break;default:throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class ZM{constructor(e,t){if(!e||!t||!t.visualResponses||!t.gamepadIndices||Object.keys(t.gamepadIndices).length===0)throw new Error("Invalid arguments supplied");this.id=e,this.type=t.type,this.rootNodeName=t.rootNodeName,this.touchPointNodeName=t.touchPointNodeName,this.visualResponses={},Object.keys(t.visualResponses).forEach(n=>{const s=new $M(t.visualResponses[n]);this.visualResponses[n]=s}),this.gamepadIndices=Object.assign({},t.gamepadIndices),this.values={state:vt.ComponentState.DEFAULT,button:this.gamepadIndices.button!==void 0?0:void 0,xAxis:this.gamepadIndices.xAxis!==void 0?0:void 0,yAxis:this.gamepadIndices.yAxis!==void 0?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(e){if(this.values.state=vt.ComponentState.DEFAULT,this.gamepadIndices.button!==void 0&&e.buttons.length>this.gamepadIndices.button){const t=e.buttons[this.gamepadIndices.button];this.values.button=t.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,t.pressed||this.values.button===1?this.values.state=vt.ComponentState.PRESSED:(t.touched||this.values.button>vt.ButtonTouchThreshold)&&(this.values.state=vt.ComponentState.TOUCHED)}this.gamepadIndices.xAxis!==void 0&&e.axes.length>this.gamepadIndices.xAxis&&(this.values.xAxis=e.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===vt.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>vt.AxisTouchThreshold&&(this.values.state=vt.ComponentState.TOUCHED)),this.gamepadIndices.yAxis!==void 0&&e.axes.length>this.gamepadIndices.yAxis&&(this.values.yAxis=e.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===vt.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>vt.AxisTouchThreshold&&(this.values.state=vt.ComponentState.TOUCHED)),Object.values(this.visualResponses).forEach(t=>{t.updateFromComponent(this.values)})}}class QM{constructor(e,t,n){if(!e)throw new Error("No xrInputSource supplied");if(!t)throw new Error("No profile supplied");this.xrInputSource=e,this.assetUrl=n,this.id=t.profileId,this.layoutDescription=t.layouts[e.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach(s=>{const r=this.layoutDescription.components[s];this.components[s]=new ZM(s,r)}),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){const e=[];return Object.values(this.components).forEach(t=>{e.push(t.data)}),e}updateFromGamepad(){Object.values(this.components).forEach(e=>{e.updateFromGamepad(this.xrInputSource.gamepad)})}}const JM="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles",eT="generic-trigger";class tT extends ht{constructor(){super(),this.motionController=null,this.envMap=null}setEnvironmentMap(e){return this.envMap==e?this:(this.envMap=e,this.traverse(t=>{t.isMesh&&(t.material.envMap=this.envMap,t.material.needsUpdate=!0)}),this)}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&(this.motionController.updateFromGamepad(),Object.values(this.motionController.components).forEach(t=>{Object.values(t.visualResponses).forEach(n=>{const{valueNode:s,minNode:r,maxNode:o,value:a,valueNodeProperty:l}=n;s&&(l===vt.VisualResponseProperty.VISIBILITY?s.visible=a:l===vt.VisualResponseProperty.TRANSFORM&&(s.quaternion.slerpQuaternions(r.quaternion,o.quaternion,a),s.position.lerpVectors(r.position,o.position,a)))})}))}}function nT(i,e){Object.values(i.components).forEach(t=>{const{type:n,touchPointNodeName:s,visualResponses:r}=t;if(n===vt.ComponentType.TOUCHPAD)if(t.touchPointNode=e.getObjectByName(s),t.touchPointNode){const o=new $i(.001),a=new at({color:255}),l=new we(o,a);t.touchPointNode.add(l)}else console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);Object.values(r).forEach(o=>{const{valueNodeName:a,minNodeName:l,maxNodeName:c,valueNodeProperty:u}=o;if(u===vt.VisualResponseProperty.TRANSFORM){if(o.minNode=e.getObjectByName(l),o.maxNode=e.getObjectByName(c),!o.minNode){console.warn(`Could not find ${l} in the model`);return}if(!o.maxNode){console.warn(`Could not find ${c} in the model`);return}}o.valueNode=e.getObjectByName(a),o.valueNode||console.warn(`Could not find ${a} in the model`)})})}function Kh(i,e){nT(i.motionController,e),i.envMap&&e.traverse(t=>{t.isMesh&&(t.material.envMap=i.envMap,t.material.needsUpdate=!0)}),i.add(e)}class iT{constructor(e=null,t=null){this.gltfLoader=e,this.path=JM,this._assetCache={},this.onLoad=t,this.gltfLoader||(this.gltfLoader=new Qu)}setPath(e){return this.path=e,this}createControllerModel(e){const t=new tT;let n=null;return e.addEventListener("connected",s=>{const r=s.data;r.targetRayMode!=="tracked-pointer"||!r.gamepad||r.hand||YM(r,this.path,eT).then(({profile:o,assetPath:a})=>{t.motionController=new QM(r,o,a);const l=this._assetCache[t.motionController.assetUrl];if(l)n=l.scene.clone(),Kh(t,n),this.onLoad&&this.onLoad(n);else{if(!this.gltfLoader)throw new Error("GLTFLoader not set.");this.gltfLoader.setPath(""),this.gltfLoader.load(t.motionController.assetUrl,c=>{this._assetCache[t.motionController.assetUrl]=c,n=c.scene.clone(),Kh(t,n),this.onLoad&&this.onLoad(n)},null,()=>{throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`)})}}).catch(o=>{console.warn(o)})}),e.addEventListener("disconnected",()=>{t.motionController=null,t.remove(n),n=null}),t}}let J=null,Me=null,Ae=null,U=null,Ue=null,wt=!1,pp=[],cn=null,Xe=null,hs=0,Dr=!1,mp=!1,Dn={horizontal:.15,vertical:.05},gs=!1,Ps=!1,nr=new b,vo=.02,wa="horizontal",gp=!1,Qn=null,yi=null,Jt=null,en=null,Bi=!0,_p=!1,Bt=null,Ua=!1,xp=!1,kt=null,Lr=!1,ki=null,Jn=null,ru=0,pl=!1,yp=1,ou=0,ml=!1,vp=1,Ut=null,So=!1,Sp=0,Mp=!1,Tp=1,bp=!1,jn=null,In=null,an=1,Nt=null,Mo=!1,Ep=0,wp=!1,Ap=1,Kn=null,Un=null,Ft=null,Ir=!1,Rp=0,Cp=!1,Pp=1,$n=null,Nn=null,Ot=null,ed=!1,Dp=0,Lp=!1,Ip=1,Zn=null,Fn=null,Up=!1,rn=null,ur=!0,dr=!0,on=null,un=!1,Zi=!1,Lo=0,Na=1,Aa=!1,xs=null,ir=null,To=null,au=null,Np=null,Gi=!1,sr=null,Es=null,lu=null,Fp=null,ro=null,Op=!1,tn=new b(0,0,0),mn=new b(0,0,0),Io=new b(0,0,0),Kt=null,hr=null,ws=null,fr=!1,_n=new Map,cu=null,uo=[],Mi=null,gn=null,zi=new Map;function Bp(i){uo=i}function gl(i){Mi=i}function _l(i){gn=i}let kp=null,zp=null,ei=!1,ti=!1,Qs=null,uu=null,ho=new b,ys=new He,du=!1,hu=!1,qi=!1,Ra=0,fu=.3,Xn=.3,sc=new b,Ys=new He;const rc=.3;let js=new b,Ks=new He;const $h=.3;let oc=new b,Vp=0,Uo=!1,Hp=new b,td=new He,nd=new He,Ca=0;const sT=1,rT=1/sT;let gt=new b(0,0,0),pu=0,fo=.001;const Gp=.001;let Fa=.015;const oT=.015;let sn=10,mu=null,Wp=!1,Xp=!1,nn=null,pn=null,id=.965;const aT=.965;let qp=.0015,Oa=.06,Yp=.965;const lT=.965;let Ba=.6;const Zh=.05;let xl=.15,pr=!1,yl=!1;new b;let Js=null,gu=null,jp=null,_u=!1;function cT(){return(navigator.language||navigator.userLanguage||"en").startsWith("ja")?"ja":"en"}let sd=cT();function uT(i){J=i}function dT(i){Me=i}function hT(i){Ae=i}function fT(i){U=i}function ka(i){Ue=i}function rd(i){wt=i}function pT(i){pp=i}function mT(i){cn=i}function gT(i){Xe=i}function xu(i){hs=i}function _T(i){Dr=i}function xT(i){mp=i}function yT(i){Dn=i}function _i(i){gs=i}function yu(i){Ps=i}function Kp(i){vo=i}function po(i){wa=i}function vT(i){gp=i}function $p(i){Qn=i}function Zp(i){yi=i}function ac(i){Jt=i}function lc(i){en=i}function ST(i){Bi=i}function MT(i){_p=i}function Qp(i){Bt=i}function Jp(i){Ua=i}function TT(i){xp=i}function em(i){kt=i}function tm(i){Lr=i}function nm(i){ki=i}function im(i){Jn=i}function za(i){ru=i}function Va(i){pl=i}function sm(i){yp=i}function Ha(i){ou=i}function Ga(i){ml=i}function rm(i){vp=i}function om(i){Ut=i}function am(i){So=i}function lm(i){Sp=i}function Wa(i){Mp=i}function cm(i){Tp=i}function ha(i){bp=i}function um(i){jn=i}function dm(i){In=i}function Yi(i){an=i}function hm(i){Nt=i}function fm(i){Mo=i}function pm(i){Ep=i}function Xa(i){wp=i}function mm(i){Ap=i}function gm(i){Kn=i}function _m(i){Un=i}function xm(i){Ft=i}function ym(i){Ir=i}function vm(i){Rp=i}function qa(i){Cp=i}function Sm(i){Pp=i}function Mm(i){$n=i}function Tm(i){Nn=i}function bm(i){Ot=i}function Em(i){ed=i}function wm(i){Dp=i}function Ya(i){Lp=i}function Am(i){Ip=i}function Rm(i){Zn=i}function Cm(i){Fn=i}function fa(i){Up=i}function vu(i){rn=i}function bT(i){ur=i}function ET(i){dr=i}function Su(i){on=i}function bo(i){un=i}function Eo(i){Zi=i}function Wi(i){Lo=i}function wT(i){Na=i}function AT(i){Aa=i}function Ur(i){xs=i}function wo(i){ir=i}function Nr(i){To=i}function pa(i){au=i}function ma(i){Np=i}function Pm(i){Gi=i}function Mu(i){sr=i}function Tu(i){Es=i}function ga(i){lu=i}function _a(i){Fp=i}function bu(i){ro=i}function Ao(i){Op=i}function Qh(i){Kt=i}function Dm(i){hr=i}function Lm(i){ws=i}function Jh(i){fr=i}function Im(i){cu=i}function Um(i){kp=i}function Nm(i){zp=i}function Eu(i){ei=i}function Fm(i){ti=i}function wu(i){Qs=i}function Om(i){uu=i}function RT(i){du=i}function CT(i){hu=i}function ef(i){qi=i}function PT(i){Ra=i}function DT(i){fu=i}function LT(i){Xn=i}function IT(i){Vp=i}function od(i){Uo=i}function ja(i){Ca=i}function No(i){pu=i}function Bm(i){fo=i}function UT(i){Fa=i}function tf(i){sn=i}function nf(i){mu=i}function sf(i){Wp=i}function rf(i){Xp=i}function cc(i){nn=i}function uc(i){pn=i}function km(i){id=i}function NT(i){qp=i}function FT(i){Oa=i}function zm(i){Yp=i}function OT(i){Ba=i}function BT(i){xl=i}function ad(i){pr=i}function of(i){yl=i}function ld(i){Js=i}function Ka(i){gu=i}function $a(i){jp=i}function Za(i){_u=i}function kT(i){sd=i}function Le(i){const e=document.getElementById("info");e&&(e.textContent=i),console.log("[INFO]",i)}let vs=null,Vm=null,Ss=null,Hm=null,Ms=null,Gm=null,Ts=null,Wm=null,Ln=null,Xm=null,Vn=null,qm=null,Qa=!1,mr=null;function zT(){if(!cn){console.error("オーディオリスナーが未初期化");return}vs=new Cr(cn),new Vr().load("./button1.mp3",e=>{Vm=e,vs.setBuffer(e),vs.setVolume(.2),console.log("ボタン音声読み込み完了")},void 0,e=>{console.error("ボタン音声ファイルの読み込みエラー:",e)})}function Vt(){!vs||!Vm||(vs.isPlaying&&vs.stop(),vs.play())}function VT(){if(!cn){console.error("オーディオリスナーが未初期化");return}Ss=new Cr(cn),Ms=new Cr(cn);const i=new Vr;i.load("./window1.mp3",e=>{Hm=e,Ss.setBuffer(e),Ss.setVolume(.2),console.log("ウィンドウ開く音声読み込み完了")},void 0,e=>{console.error("ウィンドウ開く音声ファイルの読み込みエラー:",e)}),i.load("./window2.mp3",e=>{Gm=e,Ms.setBuffer(e),Ms.setVolume(.2),console.log("ウィンドウ閉じる音声読み込み完了")},void 0,e=>{console.error("ウィンドウ閉じる音声ファイルの読み込みエラー:",e)})}function Hr(){!Ss||!Hm||(Ss.isPlaying&&Ss.stop(),Ss.play())}function Gr(){!Ms||!Gm||(Ms.isPlaying&&Ms.stop(),Ms.play())}function HT(){if(!cn){console.error("オーディオリスナーが未初期化");return}Ts=new Cr(cn),new Vr().load("./cursor.mp3",e=>{Wm=e,Ts.setBuffer(e),Ts.setVolume(.2),console.log("カーソル音声読み込み完了")},void 0,e=>{console.error("カーソル音声ファイルの読み込みエラー:",e)})}function af(){!Ts||!Wm||(Ts.isPlaying&&Ts.stop(),Ts.play())}function GT(){if(!U||!cn){console.error("ドローンまたはオーディオリスナーが未初期化");return}Ln=new np(cn),new Vr().load("./crash.mp3",e=>{Xm=e,Ln.setBuffer(e),Ln.setVolume(.5),Ln.setRefDistance(.5),Ln.setRolloffFactor(2),Ln.setMaxDistance(10),console.log("衝突音声読み込み完了")},void 0,e=>{console.error("衝突音声ファイルの読み込みエラー:",e)}),U.add(Ln)}function er(){!Ln||!Xm||(Ln.isPlaying&&Ln.stop(),Ln.play())}function WT(){if(!cn){console.error("オーディオリスナーが未初期化");return}Vn=new Cr(cn),new Vr().load("./maou_bgm.mp3",e=>{qm=e,Vn.setBuffer(e),Vn.setLoop(!0),Vn.setVolume(.2),console.log("チュートリアルBGM読み込み完了")},void 0,e=>{console.error("チュートリアルBGMファイルの読み込みエラー:",e)})}function XT(){!Vn||!qm||Qa||(mr&&(clearInterval(mr),mr=null),Vn.setVolume(.2),Vn.play(),Qa=!0,console.log("チュートリアルBGM再生開始"))}function qT(i=2e3){if(!Vn||!Qa)return;const e=Vn.getVolume(),t=20,n=i/t,s=e/t;let r=0;mr=setInterval(()=>{r++;const o=Math.max(0,e-s*r);Vn.setVolume(o),r>=t&&(clearInterval(mr),mr=null,Vn.stop(),Qa=!1,console.log("チュートリアルBGMフェードアウト完了"))},n)}function YT(){if(!U||!cn){console.error("ドローンまたはオーディオリスナーが未初期化");return}const i=new np(cn);new Vr().load("./OTO.mp3",t=>{i.setBuffer(t),i.setLoop(!0),i.setVolume(.7),i.setRefDistance(.5),i.setRolloffFactor(2),i.setMaxDistance(10),console.log("ドローン音声読み込み完了"),Le("ドローン音声準備完了")},t=>{console.log("音声読み込み中:",t.loaded/t.total*100+"%")},t=>{console.error("音声ファイルの読み込みエラー:",t),Le("エラー: 音声ファイルを読み込めませんでした")}),U.add(i),gT(i),console.log("ドローンに音声を追加")}function cd(){if(!Xe||!Xe.isPlaying||Zi||!un)return;if(!Dr){const n=Math.pow(Xn/.3,.5)*.7,s=Math.max(.1,Math.min(1,n));Xe.setVolume(s)}let i=Math.pow(.3/Xn,.5);i=Math.max(.2,Math.min(2.7,i));const e=Math.min(Vp*.6,.3),t=i+e;Xe.setPlaybackRate(Math.max(.2,Math.min(3,t)))}function jT(){const i=new Tn(.1,.04,.01),e=new It({color:35071,emissive:35071,emissiveIntensity:2}),t=new we(i,e);t.position.set(0,.04,.22);let n=0;const s=[{visible:!0,duration:150},{visible:!1,duration:150},{visible:!0,duration:150},{visible:!1,duration:1e3}];function r(){if(!Zi&&!un&&Lo===0){t.visible=!0,setTimeout(r,100);return}t.visible=s[n].visible,setTimeout(()=>{n=(n+1)%s.length,r()},s[n].duration)}return r(),t}function Ym(){if(!U)return;const i=new ni().setFromObject(U),e=new b;i.getSize(e);const t=Math.max(e.x,e.z)/2,n=e.y/2*1.1;yT({horizontal:t,vertical:n}),console.log("ドローンのサイズ:",e),console.log("当たり判定 - 水平:",(t*100).toFixed(1)+"cm"),console.log("当たり判定 - 垂直:",(n*100).toFixed(1)+"cm")}function KT(i){U&&(i<.01&&(i=.01),U.scale.set(i,i,i),LT(i),Ym(),Ja(),cd(),console.log("ドローンのスケール変更:",i.toFixed(2)))}function Ja(){const i=.05+(sn-1)*3.95/29,e=Math.pow(Xn/.3,.5),t=Math.max(.5,Math.min(2,e)),n=oT*i*t,s=Gp*i*t;UT(n),Bm(s);const r=(t-1)*.04;let o=aT+r;o=Math.max(.9,Math.min(.98,o)),km(o);let a=lT+r;a=Math.max(.9,Math.min(.98,a)),zm(a),Ps?(Kp(n*1.5),console.log(`速度レベル: ${sn}, サイズ倍率: ${t.toFixed(2)}, maxSpeed: ${n.toFixed(4)}, autoReturnSpeed: ${vo.toFixed(4)}, 摩擦: ${o.toFixed(3)}`)):console.log(`速度レベル: ${sn}, サイズ倍率: ${t.toFixed(2)}, maxSpeed: ${n.toFixed(4)}, 加速度: ${s.toFixed(6)}, 摩擦: ${o.toFixed(3)}`)}function $T(){new Qu().load("./doron.glb",e=>{const t=e.scene;t.scale.set(.3,.3,.3),t.position.set(0,0,-2),J.add(t),fT(t);const n=[];t.traverse(r=>{if(r.name==="pera1"||r.name==="pera2"||r.name==="pera3"||r.name==="pera4"){if(r.geometry){r.geometry.computeBoundingBox();const o=new b;r.geometry.boundingBox.getCenter(o),console.log("プロペラ発見:",r.name),console.log("  元の位置:",r.position.clone()),console.log("  ジオメトリ中心:",o),r.geometry.translate(-o.x,-o.y,-o.z),r.position.copy(o),console.log("  新しい位置:",r.position)}n.push(r)}}),pT(n),console.log("ドローンモデル読み込み完了"),console.log("プロペラ数:",n.length),Ym(),Ja();const s=jT();t.add(s),YT(),zT(),VT(),HT(),GT(),WT(),t.visible=!1,Le("ドローンモデル読み込み完了")},e=>{console.log("Loading:",e.loaded/e.total*100+"%")},e=>{console.error("ドローンモデルの読み込みエラー:",e),Le("エラー: ドローンモデルを読み込めませんでした")})}const lf={ja:{settings:{title:"設定",language:"言語",languageDesc:"表示言語を選択",deadzone:"デッドゾーン",deadzoneDesc:"スティック入力の無効範囲",acceleration:"加速度",accelerationDesc:"ドローンの加速の強さ",friction:"摩擦",frictionDesc:"高いほど滑らかに止まる",tilt:"傾き量",tiltDesc:"移動時のドローンの傾き",angularSpeed:"旋回スピード",angularSpeedDesc:"左スティック横の回転速度",propellerSpeed:"プロペラ速度",propellerSpeedDesc:"プロペラの回転速度",fpvMode:"FPVモード (実験的機能)",fpvModeDesc:"ドローン視点で操縦",laserInstruction:"右コントローラーのレーザーで操作",closeInstruction:"X ボタンで閉じる",returnToTitle:"タイトルに戻る",tutorial:"チュートリアルを受ける",default:"DEFAULT",on:"ON",off:"OFF",japanese:"日本語",english:"English"},guide:{title:"操作ガイド",leftController:"左コントローラー",rightController:"右コントローラー",stickUpDown:"スティック↑↓",stickLeftRight:"スティック←→",yButton:"Y ボタン",xButton:"X ボタン",aButton:"A ボタン",bButton:"B ボタン",stickPress:"スティック押込",trigger:"トリガー",grip:"グリップ",forwardBackward:"前進 / 後退",turnLeftRight:"左旋回 / 右旋回",startStop:"起動 / 終了",settingsWindow:"設定ウィンドウ",collisionToggle:"衝突 ON/OFF",speedDown:"速度ダウン",grabDrone:"ドローンを掴む",upDown:"上昇 / 下降",moveLeftRight:"左移動 / 右移動",thisMenu:"このメニュー",volumeToggle:"音量 ON/OFF",autoReturn:"自動帰還",speedUp:"速度アップ",handTracking:"ハンドトラッキング対応",handTrackingDesc:"ピンチジェスチャーでドローンを掴んで移動・スケール変更",bothGrips:"両グリップ同時押し + 左右移動: ドローンサイズ変更",closeWithA:"A ボタンで閉じる",footer:"Quest 3 / Quest Pro 対応 | WebXR Immersive Experience"},status:{autoReturn:"自動帰還中",volumeOn:"音量 ON",volumeOff:"音量 OFF",collisionOn:"当たり判定 ON",collisionOff:"当たり判定 OFF",startingUp:"起動中",shuttingDown:"終了中",trackingLostBoth:"Controllers Tracking Lost",trackingLostLeft:"Left Controller Tracking Lost",trackingLostRight:"Right Controller Tracking Lost"},welcome:{step:"チュートリアル①",stepEn:"Tutorial 1",title:"ドローンの世界へようこそ",titleEn:"Welcome to Drone World",instruction1:"コントローラーの前にドローンが配置されます",instruction1En:"Drone will be placed in front of your controller",nextWithA:"A ボタンで次へ",nextWithAEn:"Press A to continue"},tutorial2:{step:"チュートリアル②",stepEn:"Tutorial 2",title:"ドローンの世界へようこそ",titleEn:"Welcome to Drone World",instruction1:"Aボタンでコントロールガイドを開く",instruction2:"こちらで操作方法を覚えましょう",instruction1En:"Press A button to open Controller Guide",instruction2En:"Learn how to operate here",nextWithA:"A ボタンで開く",nextWithAEn:"Press A to open"},tutorial3:{step:"チュートリアル③",stepEn:"Tutorial 3",title:"ドローンの世界へようこそ",titleEn:"Welcome to Drone World",instruction1:"Xボタンで各種設定ウィンドウが出ます",instruction1En:"Press X button to open Settings window",nextWithA:"X ボタンで開く",nextWithAEn:"Press X to open"},tutorial4:{step:"チュートリアル④",stepEn:"Tutorial 4",title:"ドローンの世界へようこそ",titleEn:"Welcome to Drone World",instruction1:"Yボタンでドローンを起動できます",instruction2:"さぁドローンを楽しみましょう!!",instruction1En:"Press Y button to start the Drone",instruction2En:"Let's enjoy flying the Drone!!",nextWithA:"Y ボタンで起動",nextWithAEn:"Press Y to start"}},en:{settings:{title:"SETTINGS",language:"Language",languageDesc:"Select display language",deadzone:"Deadzone",deadzoneDesc:"Stick input dead zone",acceleration:"Acceleration",accelerationDesc:"Drone acceleration strength",friction:"Friction",frictionDesc:"Higher = smoother stop",tilt:"Tilt Amount",tiltDesc:"Drone tilt during movement",angularSpeed:"Turn Speed",angularSpeedDesc:"Left stick horizontal rotation",propellerSpeed:"Propeller Speed",propellerSpeedDesc:"Propeller rotation speed",fpvMode:"FPV Mode (Experimental)",fpvModeDesc:"Fly from drone perspective",laserInstruction:"Use right controller laser to operate",closeInstruction:"Press X to close",returnToTitle:"Return to Title",tutorial:"Start Tutorial",default:"DEFAULT",on:"ON",off:"OFF",japanese:"日本語",english:"English"},guide:{title:"CONTROLLER GUIDE",leftController:"Left Controller",rightController:"Right Controller",stickUpDown:"Stick ↑↓",stickLeftRight:"Stick ←→",yButton:"Y Button",xButton:"X Button",aButton:"A Button",bButton:"B Button",stickPress:"Stick Press",trigger:"Trigger",grip:"Grip",forwardBackward:"Forward / Backward",turnLeftRight:"Turn Left / Right",startStop:"Start / Stop",settingsWindow:"Settings Window",collisionToggle:"Collision ON/OFF",speedDown:"Speed Down",grabDrone:"Grab Drone",upDown:"Up / Down",moveLeftRight:"Move Left / Right",thisMenu:"This Menu",volumeToggle:"Volume ON/OFF",autoReturn:"Auto Return",speedUp:"Speed Up",handTracking:"Hand Tracking Supported",handTrackingDesc:"Pinch gesture to grab drone and move/scale",bothGrips:"Both Grips + Move: Change Drone Size",closeWithA:"Press A to close",footer:"Quest 3 / Quest Pro Compatible | WebXR Immersive Experience"},status:{autoReturn:"Auto Returning",volumeOn:"Volume On",volumeOff:"Volume Off",collisionOn:"Collision On",collisionOff:"Collision Off",startingUp:"STARTING UP",shuttingDown:"SHUTTING DOWN",trackingLostBoth:"Controllers Tracking Lost",trackingLostLeft:"Left Controller Tracking Lost",trackingLostRight:"Right Controller Tracking Lost"},welcome:{step:"Tutorial 1",stepEn:"Tutorial 1",title:"Welcome to Drone World",titleEn:"Welcome to Drone World",instruction1:"Drone will be placed in front of your controller",instruction1En:"Drone will be placed in front of your controller",nextWithA:"Press A to continue",nextWithAEn:"Press A to continue"},tutorial2:{step:"Tutorial 2",stepEn:"Tutorial 2",title:"Welcome to Drone World",titleEn:"Welcome to Drone World",instruction1:"Press A button to open Controller Guide",instruction1En:"Press A button to open Controller Guide",nextWithA:"Press A to open",nextWithAEn:"Press A to open"},tutorial3:{step:"Tutorial 3",stepEn:"Tutorial 3",title:"Welcome to Drone World",titleEn:"Welcome to Drone World",instruction1:"Press X button to open Settings window",instruction1En:"Press X button to open Settings window",nextWithA:"Press X to open",nextWithAEn:"Press X to open"},tutorial4:{step:"Tutorial 4",stepEn:"Tutorial 4",title:"Welcome to Drone World",titleEn:"Welcome to Drone World",instruction1:"Press Y button to start the Drone",instruction2:"Let's enjoy flying the Drone!!",instruction1En:"Press Y button to start the Drone",instruction2En:"Let's enjoy flying the Drone!!",nextWithA:"Press Y to start",nextWithAEn:"Press Y to start"}}};function Y(i,e){return lf[sd||"ja"][i][e]||lf.ja[i][e]||e}function ZT(){if(Qn)return;const i=document.createElement("canvas");i.width=512,i.height=128;const e=i.getContext("2d");e.fillStyle="#00ff00",e.font="bold 60px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(Y("status","autoReturn"),i.width/2,i.height/2);const t=new xn(i),n=new bt(.15,.0375),s=new at({map:t,transparent:!0,side:_t,depthWrite:!1}),r=new we(n,s);J.add(r),$p(r)}function QT(){if(yi)return;const i=document.createElement("canvas");i.width=512,i.height=128;const e=i.getContext("2d");e.fillStyle="#00ff00",e.font="bold 60px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(Y("status","autoReturn"),i.width/2,i.height/2);const t=new xn(i),n=new bt(.15,.0375),s=new at({map:t,transparent:!0,side:_t,depthWrite:!1}),r=new we(n,s);J.add(r),Zp(r)}function jm(){Qn&&(J.remove(Qn),Qn.geometry.dispose(),Qn.material.dispose(),Qn.material.map.dispose(),$p(null)),yi&&(J.remove(yi),yi.geometry.dispose(),yi.material.dispose(),yi.material.map.dispose(),Zp(null))}function JT(){if(Qn){const i=new b;Me.getWorldPosition(i);const e=new b(0,0,-1).applyQuaternion(Me.quaternion),t=new b(1,0,0).applyQuaternion(Me.quaternion),n=new b(0,-1,0).applyQuaternion(Me.quaternion),s=i.clone().add(e.multiplyScalar(.5)).add(t.multiplyScalar(.2)).add(n.multiplyScalar(.15));Qn.position.copy(s),Qn.lookAt(Me.position)}yi&&(yi.visible=!1)}function xa(){nn&&(J.remove(nn),nn.geometry.dispose(),nn.material.dispose(),nn.material.map.dispose(),cc(null)),pn&&(J.remove(pn),pn.geometry.dispose(),pn.material.dispose(),pn.material.map.dispose(),uc(null));const i=document.createElement("canvas");i.width=512,i.height=128;const e=i.getContext("2d");e.fillStyle="#ffff00",e.font="bold 60px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText("Speed "+sn,i.width/2,i.height/2);const t=new xn(i),n=new bt(.2,.05),s=new at({map:t.clone(),transparent:!0,side:_t,depthWrite:!1}),r=new we(n,s);J.add(r),cc(r);const o=new bt(.2,.05),a=new at({map:t.clone(),transparent:!0,side:_t,depthWrite:!1}),l=new we(o,a);J.add(l),uc(l),mu&&clearTimeout(mu);const c=setTimeout(()=>{nn&&(J.remove(nn),nn.geometry.dispose(),nn.material.dispose(),nn.material.map.dispose(),cc(null)),pn&&(J.remove(pn),pn.geometry.dispose(),pn.material.dispose(),pn.material.map.dispose(),uc(null)),nf(null)},3e3);nf(c)}function eb(){if(nn){const i=new b;Me.getWorldPosition(i);const e=new b(0,0,-1).applyQuaternion(Me.quaternion),t=new b(1,0,0).applyQuaternion(Me.quaternion),n=new b(0,-1,0).applyQuaternion(Me.quaternion),s=i.clone().add(e.multiplyScalar(.5)).add(t.multiplyScalar(.2)).add(n.multiplyScalar(.2));nn.position.copy(s),nn.lookAt(Me.position)}pn&&(pn.visible=!1)}function cf(i){Jt&&(J.remove(Jt),Jt.geometry.dispose(),Jt.material.dispose(),Jt.material.map.dispose(),ac(null));const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.fillStyle="#00ff00",t.font="bold 60px Arial",t.textAlign="center",t.textBaseline="middle";const n=i?Y("status","volumeOn"):Y("status","volumeOff");t.fillText(n,e.width/2,e.height/2);const s=new xn(e),r=new bt(.2,.05),o=new at({map:s,transparent:!0,side:_t,depthWrite:!1}),a=new we(r,o);J.add(a),ac(a),setTimeout(()=>{Jt&&(J.remove(Jt),Jt.geometry.dispose(),Jt.material.dispose(),Jt.material.map.dispose(),ac(null))},3e3)}function tb(){if(Jt){const i=new b;Me.getWorldPosition(i);const e=new b(0,0,-1).applyQuaternion(Me.quaternion),t=new b(1,0,0).applyQuaternion(Me.quaternion),n=new b(0,-1,0).applyQuaternion(Me.quaternion),s=i.clone().add(e.multiplyScalar(.5)).add(t.multiplyScalar(.2)).add(n.multiplyScalar(.25));Jt.position.copy(s),Jt.lookAt(Me.position)}}function nb(i){en&&(J.remove(en),en.geometry.dispose(),en.material.dispose(),en.material.map.dispose(),lc(null));const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.fillStyle="#00ff00",t.font="bold 60px Arial",t.textAlign="center",t.textBaseline="middle";const n=i?Y("status","collisionOn"):Y("status","collisionOff");t.fillText(n,e.width/2,e.height/2);const s=new xn(e),r=new bt(.2,.05),o=new at({map:s,transparent:!0,side:_t,depthWrite:!1}),a=new we(r,o);J.add(a),lc(a),setTimeout(()=>{en&&(J.remove(en),en.geometry.dispose(),en.material.dispose(),en.material.map.dispose(),lc(null))},3e3)}function ib(){if(en){const i=new b;Me.getWorldPosition(i);const e=new b(0,0,-1).applyQuaternion(Me.quaternion),t=new b(-1,0,0).applyQuaternion(Me.quaternion),n=new b(0,-1,0).applyQuaternion(Me.quaternion),s=i.clone().add(e.multiplyScalar(.5)).add(t.multiplyScalar(.2)).add(n.multiplyScalar(.25));en.position.copy(s),en.lookAt(Me.position)}}function sb(){rn&&(J.remove(rn),rn.geometry.dispose(),rn.material.dispose(),rn.material.map.dispose(),vu(null));let i="";if(!ur&&!dr)i="Controllers Tracking Lost";else if(!ur)i="Left Controller Tracking Lost";else if(!dr)i="Right Controller Tracking Lost";else return;const e=document.createElement("canvas");e.width=1024,e.height=128;const t=e.getContext("2d");t.fillStyle="#ff0000",t.font="bold 60px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText(i,e.width/2,e.height/2);const n=new xn(e),s=new bt(.4,.05),r=new at({map:n,transparent:!0,side:_t,depthWrite:!1}),o=new we(s,r);J.add(o),vu(o)}function rb(){rn&&(J.remove(rn),rn.geometry.dispose(),rn.material.dispose(),rn.material.map.dispose(),vu(null))}function ob(){if(rn){const i=new b;Me.getWorldPosition(i);const e=new b(0,0,-1).applyQuaternion(Me.quaternion),t=new b(0,-1,0).applyQuaternion(Me.quaternion),n=i.clone().add(e.multiplyScalar(.5)).add(t.multiplyScalar(.3));rn.position.copy(n),rn.lookAt(Me.position)}}function uf(i){on&&(J.remove(on),on.geometry.dispose(),on.material.dispose(),on.material.map.dispose(),Su(null));const e=document.createElement("canvas"),t=e.getContext("2d");t.font="bold 60px Arial";const s=t.measureText(i).width,r=60,o=10;e.width=s+o*2,e.height=r+o*2,t.font="bold 60px Arial",t.fillStyle="#00ff00",t.textAlign="center",t.textBaseline="middle",t.fillText(i,e.width/2,e.height/2);const a=new xn(e),l=e.width/e.height,c=.05,u=c*l,d=new bt(u,c),h=new at({map:a,transparent:!0,side:_t,depthWrite:!1}),p=new we(d,h);J.add(p),Su(p)}function Au(){on&&(J.remove(on),on.geometry.dispose(),on.material.dispose(),on.material.map.dispose(),Su(null))}function ab(){if(on){const i=new b;Me.getWorldPosition(i);const e=new b(0,0,-1).applyQuaternion(Me.quaternion),t=new b(0,-1,0).applyQuaternion(Me.quaternion),n=i.clone().add(e.multiplyScalar(.5)).add(t.multiplyScalar(.2));on.position.copy(n),on.lookAt(Me.position)}}let bs=null,gr=null;function lb(){if(Bt)return;bs=document.createElement("canvas"),bs.width=800,bs.height=820;const i=bs,e=i.getContext("2d");e.clearRect(0,0,i.width,i.height),e.fillStyle="rgba(10, 10, 26, 0.7)",e.fillRect(0,0,i.width,i.height),e.strokeStyle="rgba(0, 200, 255, 0.5)",e.lineWidth=4,e.strokeRect(2,2,i.width-4,i.height-4);const t=e.createLinearGradient(0,0,i.width,i.height);t.addColorStop(0,"rgba(0, 200, 255, 0.1)"),t.addColorStop(.5,"rgba(255, 107, 107, 0.05)"),t.addColorStop(1,"rgba(0, 200, 255, 0.1)"),e.fillStyle=t,e.fillRect(4,4,i.width-8,i.height-8),e.font="bold 48px Arial",e.fillStyle="#00c8ff",e.textAlign="center",e.shadowColor="rgba(0, 200, 255, 0.8)",e.shadowBlur=20,e.fillText(Y("guide","title"),i.width/2,60),e.shadowBlur=0,e.strokeStyle="rgba(0, 200, 255, 0.3)",e.lineWidth=2,e.beginPath(),e.moveTo(50,90),e.lineTo(i.width-50,90),e.stroke();const n=200;let s=140;const r=e.createLinearGradient(n-120,s,n+120,s+30);r.addColorStop(0,"#00c8ff"),r.addColorStop(1,"#ff6b6b"),e.fillStyle=r,e.beginPath(),e.roundRect(n-100,s-5,200,35,8),e.fill(),e.font="bold 24px Arial",e.fillStyle="#0a0a1a",e.textAlign="center",e.fillText(Y("guide","leftController"),n,s+20),s+=55,[{button:Y("guide","stickUpDown"),desc:Y("guide","forwardBackward")},{button:Y("guide","stickLeftRight"),desc:Y("guide","turnLeftRight")},{button:Y("guide","yButton"),desc:Y("guide","startStop")},{button:Y("guide","xButton"),desc:Y("guide","settingsWindow")},{button:Y("guide","stickPress"),desc:Y("guide","collisionToggle")},{button:Y("guide","trigger"),desc:Y("guide","speedDown")},{button:Y("guide","grip"),desc:Y("guide","grabDrone")}].forEach(m=>{const f=e.createLinearGradient(n-95,s,n+35,s);f.addColorStop(0,"rgba(0, 200, 255, 0.2)"),f.addColorStop(1,"rgba(255, 107, 107, 0.2)"),e.fillStyle=f,e.beginPath(),e.roundRect(n-95,s-2,130,28,6),e.fill(),e.strokeStyle="rgba(0, 200, 255, 0.5)",e.lineWidth=1,e.stroke(),e.font="bold 18px Arial",e.fillStyle="#00c8ff",e.textAlign="center",e.fillText(m.button,n-30,s+18),e.font="18px Arial",e.fillStyle="rgba(255, 255, 255, 0.9)",e.textAlign="left",e.fillText(m.desc,n+45,s+18),s+=38});const a=600;s=140;const l=e.createLinearGradient(a-120,s,a+120,s+30);l.addColorStop(0,"#00c8ff"),l.addColorStop(1,"#ff6b6b"),e.fillStyle=l,e.beginPath(),e.roundRect(a-100,s-5,200,35,8),e.fill(),e.font="bold 24px Arial",e.fillStyle="#0a0a1a",e.textAlign="center",e.fillText(Y("guide","rightController"),a,s+20),s+=55,[{button:Y("guide","stickUpDown"),desc:Y("guide","upDown")},{button:Y("guide","stickLeftRight"),desc:Y("guide","moveLeftRight")},{button:Y("guide","aButton"),desc:Y("guide","thisMenu")},{button:Y("guide","stickPress"),desc:Y("guide","volumeToggle")},{button:Y("guide","bButton"),desc:Y("guide","autoReturn")},{button:Y("guide","trigger"),desc:Y("guide","speedUp")},{button:Y("guide","grip"),desc:Y("guide","grabDrone")}].forEach(m=>{const f=e.createLinearGradient(a-95,s,a+35,s);f.addColorStop(0,"rgba(0, 200, 255, 0.2)"),f.addColorStop(1,"rgba(255, 107, 107, 0.2)"),e.fillStyle=f,e.beginPath(),e.roundRect(a-95,s-2,130,28,6),e.fill(),e.strokeStyle="rgba(0, 200, 255, 0.5)",e.lineWidth=1,e.stroke(),e.font="bold 18px Arial",e.fillStyle="#00c8ff",e.textAlign="center",e.fillText(m.button,a-30,s+18),e.font="18px Arial",e.fillStyle="rgba(255, 255, 255, 0.9)",e.textAlign="left",e.fillText(m.desc,a+45,s+18),s+=38}),e.fillStyle="rgba(0, 255, 150, 0.1)",e.strokeStyle="rgba(0, 255, 150, 0.3)",e.lineWidth=2,e.beginPath(),e.roundRect(50,520,i.width-100,80,12),e.fill(),e.stroke(),e.font="bold 22px Arial",e.fillStyle="#00ff96",e.textAlign="center",e.fillText(Y("guide","handTracking"),i.width/2,555),e.font="18px Arial",e.fillStyle="rgba(255, 255, 255, 0.8)",e.fillText(Y("guide","handTrackingDesc"),i.width/2,585),e.fillStyle="rgba(255, 200, 0, 0.1)",e.strokeStyle="rgba(255, 200, 0, 0.3)",e.beginPath(),e.roundRect(50,620,i.width-100,60,12),e.fill(),e.stroke(),e.font="bold 20px Arial",e.fillStyle="#ffc800",e.fillText(Y("guide","bothGrips"),i.width/2,660),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.lineWidth=2,e.beginPath(),e.moveTo(50,710),e.lineTo(i.width-50,710),e.stroke(),e.font="bold 28px Arial",e.fillStyle="#ffff00",e.shadowColor="rgba(255, 255, 0, 0.5)",e.shadowBlur=10,e.fillText(Y("guide","closeWithA"),i.width/2,760),e.shadowBlur=0,e.font="16px Arial",e.fillStyle="rgba(255, 255, 255, 0.4)",e.fillText(Y("guide","footer"),i.width/2,800),gr=new xn(i),gr.needsUpdate=!0;const u=i.width/i.height,d=.4,h=d*u,p=new bt(h,d),g=new at({map:gr,transparent:!0,side:_t}),_=new we(p,g);_.scale.set(.01,.01,.01),_.material.opacity=0,J.add(_),Qp(_),Jp(!0),za(0),Va(!0),sm(1)}function Ru(i){if(!bs||!gr)return;const e=bs,t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),t.fillStyle="rgba(10, 10, 26, 0.7)",t.fillRect(0,0,e.width,e.height),t.strokeStyle="rgba(0, 200, 255, 0.5)",t.lineWidth=4,t.strokeRect(2,2,e.width-4,e.height-4);const n=t.createLinearGradient(0,0,e.width,e.height);n.addColorStop(0,"rgba(0, 200, 255, 0.1)"),n.addColorStop(.5,"rgba(255, 107, 107, 0.05)"),n.addColorStop(1,"rgba(0, 200, 255, 0.1)"),t.fillStyle=n,t.fillRect(4,4,e.width-8,e.height-8),t.font="bold 48px Arial",t.fillStyle="#00c8ff",t.textAlign="center",t.shadowColor="rgba(0, 200, 255, 0.8)",t.shadowBlur=20,t.fillText(Y("guide","title"),e.width/2,60),t.shadowBlur=0,t.strokeStyle="rgba(0, 200, 255, 0.3)",t.lineWidth=2,t.beginPath(),t.moveTo(50,90),t.lineTo(e.width-50,90),t.stroke();const s=200;let r=140;const o=t.createLinearGradient(s-120,r,s+120,r+30);o.addColorStop(0,"#00c8ff"),o.addColorStop(1,"#ff6b6b"),t.fillStyle=o,t.beginPath(),t.roundRect(s-100,r-5,200,35,8),t.fill(),t.font="bold 24px Arial",t.fillStyle="#0a0a1a",t.textAlign="center",t.fillText(Y("guide","leftController"),s,r+20),r+=55,[{button:Y("guide","stickUpDown"),desc:Y("guide","forwardBackward"),key:"leftStickY"},{button:Y("guide","stickLeftRight"),desc:Y("guide","turnLeftRight"),key:"leftStickX"},{button:Y("guide","yButton"),desc:Y("guide","startStop"),key:"leftX"},{button:Y("guide","xButton"),desc:Y("guide","settingsWindow"),key:"leftY"},{button:Y("guide","stickPress"),desc:Y("guide","collisionToggle"),key:"leftStickPress"},{button:Y("guide","trigger"),desc:Y("guide","speedDown"),key:"leftTrigger"},{button:Y("guide","grip"),desc:Y("guide","grabDrone"),key:"leftGrip"}].forEach(h=>{const p=i[h.key];if(p)t.fillStyle="rgba(255, 255, 0, 0.6)";else{const g=t.createLinearGradient(s-95,r,s+35,r);g.addColorStop(0,"rgba(0, 200, 255, 0.2)"),g.addColorStop(1,"rgba(255, 107, 107, 0.2)"),t.fillStyle=g}t.beginPath(),t.roundRect(s-95,r-2,130,28,6),t.fill(),t.strokeStyle=p?"rgba(255, 255, 0, 0.9)":"rgba(0, 200, 255, 0.5)",t.lineWidth=p?2:1,t.stroke(),t.font="bold 18px Arial",t.fillStyle=p?"#000000":"#00c8ff",t.textAlign="center",t.fillText(h.button,s-30,r+18),t.font="18px Arial",t.fillStyle="rgba(255, 255, 255, 0.9)",t.textAlign="left",t.fillText(h.desc,s+45,r+18),r+=38});const l=600;r=140;const c=t.createLinearGradient(l-120,r,l+120,r+30);c.addColorStop(0,"#00c8ff"),c.addColorStop(1,"#ff6b6b"),t.fillStyle=c,t.beginPath(),t.roundRect(l-100,r-5,200,35,8),t.fill(),t.font="bold 24px Arial",t.fillStyle="#0a0a1a",t.textAlign="center",t.fillText(Y("guide","rightController"),l,r+20),r+=55,[{button:Y("guide","stickUpDown"),desc:Y("guide","upDown"),key:"rightStickY"},{button:Y("guide","stickLeftRight"),desc:Y("guide","moveLeftRight"),key:"rightStickX"},{button:Y("guide","aButton"),desc:Y("guide","thisMenu"),key:"rightA"},{button:Y("guide","stickPress"),desc:Y("guide","volumeToggle"),key:"rightStickPress"},{button:Y("guide","bButton"),desc:Y("guide","autoReturn"),key:"rightB"},{button:Y("guide","trigger"),desc:Y("guide","speedUp"),key:"rightTrigger"},{button:Y("guide","grip"),desc:Y("guide","grabDrone"),key:"rightGrip"}].forEach(h=>{const p=i[h.key];if(p)t.fillStyle="rgba(255, 255, 0, 0.6)";else{const g=t.createLinearGradient(l-95,r,l+35,r);g.addColorStop(0,"rgba(0, 200, 255, 0.2)"),g.addColorStop(1,"rgba(255, 107, 107, 0.2)"),t.fillStyle=g}t.beginPath(),t.roundRect(l-95,r-2,130,28,6),t.fill(),t.strokeStyle=p?"rgba(255, 255, 0, 0.9)":"rgba(0, 200, 255, 0.5)",t.lineWidth=p?2:1,t.stroke(),t.font="bold 18px Arial",t.fillStyle=p?"#000000":"#00c8ff",t.textAlign="center",t.fillText(h.button,l-30,r+18),t.font="18px Arial",t.fillStyle="rgba(255, 255, 255, 0.9)",t.textAlign="left",t.fillText(h.desc,l+45,r+18),r+=38});const d=i.leftGrip&&i.rightGrip;t.fillStyle=d?"rgba(255, 255, 0, 0.4)":"rgba(255, 200, 0, 0.1)",t.strokeStyle=d?"rgba(255, 255, 0, 0.9)":"rgba(255, 200, 0, 0.3)",t.lineWidth=d?3:2,t.beginPath(),t.roundRect(50,520,e.width-100,60,12),t.fill(),t.stroke(),t.font="bold 20px Arial",t.fillStyle=d?"#000000":"#ffc800",t.textAlign="center",t.fillText(Y("guide","bothGrips"),e.width/2,558),t.fillStyle="rgba(0, 255, 150, 0.1)",t.strokeStyle="rgba(0, 255, 150, 0.3)",t.lineWidth=2,t.beginPath(),t.roundRect(50,600,e.width-100,80,12),t.fill(),t.stroke(),t.font="bold 22px Arial",t.fillStyle="#00ff96",t.textAlign="center",t.fillText(Y("guide","handTracking"),e.width/2,635),t.font="18px Arial",t.fillStyle="rgba(255, 255, 255, 0.8)",t.fillText(Y("guide","handTrackingDesc"),e.width/2,665),t.strokeStyle="rgba(0, 200, 255, 0.3)",t.lineWidth=2,t.beginPath(),t.moveTo(50,710),t.lineTo(e.width-50,710),t.stroke(),t.font="bold 28px Arial",t.fillStyle="#ffff00",t.shadowColor="rgba(255, 255, 0, 0.5)",t.shadowBlur=10,t.fillText(Y("guide","closeWithA"),e.width/2,760),t.shadowBlur=0,t.font="16px Arial",t.fillStyle="rgba(255, 255, 255, 0.4)",t.fillText(Y("guide","footer"),e.width/2,800),gr.needsUpdate=!0}function cb(){Bt&&!pl&&(za(1),Va(!0),sm(-1),Jp(!1))}function ub(){Bt&&(J.remove(Bt),Bt.traverse(i=>{i.geometry&&i.geometry.dispose(),i.material&&(i.material.map&&i.material.map.dispose(),i.material.dispose())}),Qp(null),bs=null,gr=null)}function dc(){pl||(Ua||Bt?(cb(),Gr()):(lb(),Hr()))}let On=null,_r=null,Pn=[];function $s(i,e){const t=JSON.parse(localStorage.getItem("droneSettings")||"{}");t[i]=e,localStorage.setItem("droneSettings",JSON.stringify(t))}function db(){const i=JSON.parse(localStorage.getItem("droneSettings")||"{}");vl.forEach(e=>{i[e.key]!==void 0&&e.setValue(i[e.key])})}const vl=[{nameKey:"language",descKey:"languageDesc",key:"language",type:"language",getValue:()=>sd,setValue:i=>kT(i),defaultValue:"ja"},{nameKey:"deadzone",descKey:"deadzoneDesc",key:"deadzone",type:"value",getValue:()=>xl,setValue:i=>BT(i),defaultValue:.15,min:.01,max:.35,step:.01,format:i=>(i*100).toFixed(0)+"%"},{nameKey:"acceleration",descKey:"accelerationDesc",key:"acceleration",type:"value",getValue:()=>fo,setValue:i=>Bm(i),getDefaultValue:()=>{const i=.05+(sn-1)*3.95/29,e=Math.pow(Xn/.3,.5),t=Math.max(.5,Math.min(2,e));return Gp*i*t},min:1e-4,max:.005,step:1e-4,format:i=>(i*1e3).toFixed(1)},{nameKey:"friction",descKey:"frictionDesc",key:"friction",type:"value",getValue:()=>id,setValue:i=>{km(i),zm(i)},defaultValue:.965,min:.9,max:.99,step:.01,format:i=>i.toFixed(2)},{nameKey:"tilt",descKey:"tiltDesc",key:"tilt",type:"value",getValue:()=>Ba,setValue:i=>OT(i),defaultValue:.6,min:0,max:1,step:.1,format:i=>i.toFixed(1)},{nameKey:"angularSpeed",descKey:"angularSpeedDesc",key:"angularSpeed",type:"value",getValue:()=>Oa,setValue:i=>{FT(i),NT(i*.025)},defaultValue:.06,min:.02,max:.12,step:.01,format:i=>(i*100).toFixed(0)+"%"},{nameKey:"propellerSpeed",descKey:"propellerSpeedDesc",key:"propellerSpeed",type:"value",getValue:()=>Na,setValue:i=>wT(i),defaultValue:1,min:.1,max:2,step:.1,format:i=>(i*100).toFixed(0)+"%"},{nameKey:"fpvMode",descKey:"fpvModeDesc",key:"fpvMode",type:"toggle",getValue:()=>pr,setValue:i=>ad(i),defaultValue:!1,isHidden:()=>yl}];function hb(){if(kt)return;const t=70+vl.filter(c=>!c.isHidden||!c.isHidden()).length*100+90+75+75+30;On=document.createElement("canvas"),On.width=700,On.height=t,Km(null),_r=new xn(On),_r.needsUpdate=!0;const n=On.width/On.height,s=.35,r=s*n,o=new bt(r,s),a=new at({map:_r,transparent:!0,side:_t}),l=new we(o,a);l.scale.set(.01,.01,.01),l.material.opacity=0,J.add(l),em(l),tm(!0),Ha(0),Ga(!0),rm(1),(an===0||an>4)&&pb()}function Km(i){if(!On)return;const e=On,t=e.getContext("2d");Pn=[],t.clearRect(0,0,e.width,e.height),t.fillStyle="rgba(10, 10, 26, 0.7)",t.fillRect(0,0,e.width,e.height),t.strokeStyle="rgba(0, 200, 255, 0.5)",t.lineWidth=4,t.strokeRect(2,2,e.width-4,e.height-4);const n=t.createLinearGradient(0,0,e.width,e.height);n.addColorStop(0,"rgba(0, 200, 255, 0.1)"),n.addColorStop(.5,"rgba(255, 107, 107, 0.05)"),n.addColorStop(1,"rgba(0, 200, 255, 0.1)"),t.fillStyle=n,t.fillRect(4,4,e.width-8,e.height-8),t.font="bold 36px Arial",t.fillStyle="#00c8ff",t.textAlign="center",t.shadowColor="rgba(0, 200, 255, 0.8)",t.shadowBlur=15,t.fillText(Y("settings","title"),e.width/2,50),t.shadowBlur=0,t.strokeStyle="rgba(0, 200, 255, 0.3)",t.lineWidth=2,t.beginPath(),t.moveTo(40,70),t.lineTo(e.width-40,70),t.stroke();const s=vl.filter(M=>!M.isHidden||!M.isHidden());let r=110;const o=100;s.forEach((M,E)=>{const x=M.getValue(),D=M.nameKey?Y("settings",M.nameKey):M.name,R=M.descKey?Y("settings",M.descKey):M.description;if(t.fillStyle="rgba(30, 30, 50, 0.5)",t.beginPath(),t.roundRect(25,r-10,e.width-50,o-10,8),t.fill(),t.font="bold 22px Arial",t.fillStyle="#ffffff",t.textAlign="left",t.fillText(D,40,r+20),t.font="14px Arial",t.fillStyle="rgba(255, 255, 255, 0.5)",t.fillText(R,40,r+42),M.type==="language"){const w=x==="ja",C=100,v=50,y=10,P=380,I=P,L=r+5,B=i&&i.index===E&&i.type==="langJa";B?t.fillStyle="rgba(255, 255, 0, 0.8)":w?t.fillStyle="rgba(0, 255, 150, 0.5)":t.fillStyle="rgba(100, 100, 100, 0.5)",t.beginPath(),t.roundRect(I,L,C,v,6),t.fill(),B?t.strokeStyle="#ffff00":w?t.strokeStyle="rgba(0, 255, 150, 0.8)":t.strokeStyle="rgba(100, 100, 100, 0.8)",t.lineWidth=2,t.stroke(),t.font="bold 18px Arial",t.fillStyle=B?"#000000":w?"#00ff96":"rgba(255, 255, 255, 0.6)",t.textAlign="center",t.fillText(Y("settings","japanese"),I+C/2,L+v/2+6),Pn.push({x:I,y:L,w:C,h:v,index:E,type:"langJa"});const q=P+C+y,W=r+5,j=i&&i.index===E&&i.type==="langEn";j?t.fillStyle="rgba(255, 255, 0, 0.8)":w?t.fillStyle="rgba(100, 100, 100, 0.5)":t.fillStyle="rgba(0, 255, 150, 0.5)",t.beginPath(),t.roundRect(q,W,C,v,6),t.fill(),j?t.strokeStyle="#ffff00":w?t.strokeStyle="rgba(100, 100, 100, 0.8)":t.strokeStyle="rgba(0, 255, 150, 0.8)",t.lineWidth=2,t.stroke(),t.font="bold 18px Arial",t.fillStyle=j?"#000000":w?"rgba(255, 255, 255, 0.6)":"#00ff96",t.textAlign="center",t.fillText(Y("settings","english"),q+C/2,W+v/2+6),Pn.push({x:q,y:W,w:C,h:v,index:E,type:"langEn"})}else if(M.type==="toggle"){const C=r+5,v=120,y=50,P=i&&i.index===E&&i.type==="toggle",I=x===!0;P?t.fillStyle="rgba(255, 255, 0, 0.8)":I?t.fillStyle="rgba(0, 255, 150, 0.5)":t.fillStyle="rgba(100, 100, 100, 0.5)",t.beginPath(),t.roundRect(480,C,v,y,6),t.fill(),P?t.strokeStyle="#ffff00":I?t.strokeStyle="rgba(0, 255, 150, 0.8)":t.strokeStyle="rgba(100, 100, 100, 0.8)",t.lineWidth=2,t.stroke(),t.font="bold 22px Arial",t.fillStyle=P?"#000000":I?"#00ff96":"rgba(255, 255, 255, 0.6)",t.textAlign="center",t.fillText(I?Y("settings","on"):Y("settings","off"),480+v/2,C+y/2+8),Pn.push({x:480,y:C,w:v,h:y,index:E,type:"toggle"})}else{const w=M.format?M.format(x):x.toString(),C=320,v=r+5,y=50,P=i&&i.index===E&&i.type==="left";t.fillStyle=P?"rgba(255, 255, 0, 0.8)":"rgba(0, 200, 255, 0.3)",t.beginPath(),t.roundRect(C,v,y,y,6),t.fill(),t.strokeStyle=P?"#ffff00":"rgba(0, 200, 255, 0.6)",t.lineWidth=2,t.stroke(),t.font="bold 28px Arial",t.fillStyle=P?"#000000":"#00c8ff",t.textAlign="center",t.fillText("◀",C+y/2,v+y/2+8),Pn.push({x:C,y:v,w:y,h:y,index:E,type:"left"}),t.font="bold 22px Arial",t.fillStyle="#00c8ff",t.textAlign="center",t.fillText(w,440,r+40);const I=510,L=r+5,B=i&&i.index===E&&i.type==="right";t.fillStyle=B?"rgba(255, 255, 0, 0.8)":"rgba(0, 200, 255, 0.3)",t.beginPath(),t.roundRect(I,L,y,y,6),t.fill(),t.strokeStyle=B?"#ffff00":"rgba(0, 200, 255, 0.6)",t.lineWidth=2,t.stroke(),t.font="bold 28px Arial",t.fillStyle=B?"#000000":"#00c8ff",t.textAlign="center",t.fillText("▶",I+y/2,L+y/2+8),Pn.push({x:I,y:L,w:y,h:y,index:E,type:"right"});const q=580,W=r+5,j=80,z=i&&i.index===E&&i.type==="default",se=M.getDefaultValue?M.getDefaultValue():M.defaultValue,he=Math.abs(x-se)<1e-4;t.fillStyle=z?"rgba(255, 107, 107, 0.8)":he?"rgba(100, 100, 100, 0.3)":"rgba(255, 107, 107, 0.3)",t.beginPath(),t.roundRect(q,W,j,y,6),t.fill(),t.strokeStyle=z?"#ff6b6b":he?"rgba(100, 100, 100, 0.5)":"rgba(255, 107, 107, 0.6)",t.lineWidth=2,t.stroke(),t.font="bold 14px Arial",t.fillStyle=z?"#000000":he?"rgba(255, 255, 255, 0.3)":"#ff6b6b",t.textAlign="center",t.fillText(Y("settings","default"),q+j/2,W+y/2+5),Pn.push({x:q,y:W,w:j,h:y,index:E,type:"default"})}r+=o});const a=r+10;t.strokeStyle="rgba(0, 200, 255, 0.3)",t.lineWidth=2,t.beginPath(),t.moveTo(40,a),t.lineTo(e.width-40,a),t.stroke(),t.font="16px Arial",t.fillStyle="rgba(255, 255, 255, 0.6)",t.textAlign="center",t.fillText(Y("settings","laserInstruction"),e.width/2,a+30),t.font="bold 28px Arial",t.fillStyle="#ffff00",t.shadowColor="rgba(255, 255, 0, 0.5)",t.shadowBlur=10,t.fillText(Y("settings","closeInstruction"),e.width/2,a+60),t.shadowBlur=0;const l=25,c=a+80,u=e.width-50,d=60,h=i&&i.type==="tutorial";t.fillStyle=h?"rgba(100, 200, 255, 0.9)":"rgba(100, 200, 255, 0.4)",t.beginPath(),t.roundRect(l,c,u,d,8),t.fill(),t.strokeStyle=h?"#64c8ff":"rgba(100, 200, 255, 0.8)",t.lineWidth=2,t.stroke(),t.font="bold 26px Arial",t.fillStyle=h?"#000000":"#ffffff",t.textAlign="center",t.fillText(Y("settings","tutorial"),e.width/2,c+d/2+9),Pn.push({x:l,y:c,w:u,h:d,type:"tutorial"});const p=25,g=c+d+15,_=e.width-50,m=60,f=i&&i.type==="returnToTitle";t.fillStyle=f?"rgba(255, 100, 100, 0.9)":"rgba(255, 100, 100, 0.4)",t.beginPath(),t.roundRect(p,g,_,m,8),t.fill(),t.strokeStyle=f?"#ff6666":"rgba(255, 100, 100, 0.8)",t.lineWidth=2,t.stroke(),t.font="bold 26px Arial",t.fillStyle=f?"#000000":"#ffffff",t.textAlign="center",t.fillText(Y("settings","returnToTitle"),e.width/2,g+m/2+9),Pn.push({x:p,y:g,w:_,h:m,type:"returnToTitle"}),_r&&(_r.needsUpdate=!0)}function Cu(){kt&&!ml&&(Ha(1),Ga(!0),rm(-1),tm(!1))}function fb(){kt&&(J.remove(kt),kt.traverse(i=>{i.geometry&&i.geometry.dispose(),i.material&&(i.material.map&&i.material.map.dispose(),i.material.dispose())}),em(null),On=null,_r=null,Pn=[]),mb(),an===4&&(setTimeout(()=>{Ob()},300),console.log("設定ウィンドウを閉じ、チュートリアル4を表示"))}function hc(){ml||(Lr||kt?(Cu(),Gr()):(hb(),Hr()))}function pb(){const i=new ji({color:65535,linewidth:2,transparent:!0,opacity:.8}),e=new Et,t=new Float32Array(6);e.setAttribute("position",new Ct(t,3));const n=new Ki(e,i);J.add(n),nm(n);const s=new $i(.005,8,8),r=new at({color:16776960,transparent:!0,opacity:.9}),o=new we(s,r);o.visible=!1,J.add(o),im(o)}function mb(){ki&&(J.remove(ki),ki.geometry.dispose(),ki.material.dispose(),nm(null)),Jn&&(J.remove(Jn),Jn.geometry.dispose(),Jn.material.dispose(),im(null))}let df=0;function gb(){if(!ml)return;const i=.08;if(vp===1){let e=ou+i;if(e>=1&&(e=1,Ga(!1)),Ha(e),kt){const n=Wr(e);kt.scale.set(n,n,n),kt.material.opacity=Math.min(1,e*1.5)}}else{let e=ou-i;if(e<=0&&(e=0,Ga(!1),fb()),Ha(e),kt){const t=$m(e),n=Math.max(.01,t);kt.scale.set(n,n,n),kt.material.opacity=e}}}function _b(){if(gb(),!kt||!Ue)return;const i=Ue.inputSources,e=Ae.xr.getFrame(),t=Ae.xr.getReferenceSpace();if(!e||!t)return;let n=null,s=null,r=!1;for(const a of i){if(a.handedness==="left"&&a.gripSpace){const l=e.getPose(a.gripSpace,t);if(l){const c=new _e().fromArray(l.transform.matrix),d=new b().setFromMatrixPosition(c).clone();if(d.y+=.25,kt.position.copy(d),Me){const h=new b;Me.getWorldPosition(h);const p=new b;p.subVectors(h,d),p.y=0,p.normalize();const g=Math.atan2(p.x,p.z);kt.rotation.set(0,g,0)}}}if(a.handedness==="right"&&a.targetRaySpace){const l=e.getPose(a.targetRaySpace,t);if(l){const c=new _e().fromArray(l.transform.matrix);n=new b().setFromMatrixPosition(c),s=new b(0,0,-1);const u=new He().setFromRotationMatrix(c);s.applyQuaternion(u)}a.gamepad&&a.gamepad.buttons[0]&&(r=a.gamepad.buttons[0].pressed)}}let o=null;if(n&&s&&kt){if(ki){const c=ki.geometry.attributes.position.array;c[0]=n.x,c[1]=n.y,c[2]=n.z;const u=n.clone().add(s.clone().multiplyScalar(2));c[3]=u.x,c[4]=u.y,c[5]=u.z,ki.geometry.attributes.position.needsUpdate=!0}const l=new sM(n,s).intersectObject(kt);if(l.length>0){const c=l[0];if(Jn&&(Jn.visible=!0,Jn.position.copy(c.point)),c.uv){const u=c.uv.x*On.width,d=(1-c.uv.y)*On.height;for(const p of Pn)if(u>=p.x&&u<=p.x+p.w&&d>=p.y&&d<=p.y+p.h){o=p;break}const h=Date.now();r&&o&&df<h&&(xb(o),df=h+200)}}else Jn&&(Jn.visible=!1)}Km(o)}function xb(i){if(i.type==="tutorial"){Vt(),localStorage.setItem("restartTutorial","true"),Cu(),Ue?Ue.end().then(()=>{window.location.reload()}):window.location.reload();return}if(i.type==="returnToTitle"){Vt(),Cu(),Ue?Ue.end().then(()=>{window.location.reload()}):window.location.reload();return}const t=vl.filter(n=>!n.isHidden||!n.isHidden())[i.index];if(i.type==="langJa")t.setValue("ja"),$s(t.key,"ja"),Vt(),Bt&&Ru({});else if(i.type==="langEn")t.setValue("en"),$s(t.key,"en"),Vt(),Bt&&Ru({});else if(i.type==="toggle"){const s=!t.getValue();t.setValue(s),$s(t.key,s),Vt()}else if(i.type==="left"){const n=t.getValue(),s=Math.max(t.min,n-t.step);t.setValue(s),$s(t.key,s),af()}else if(i.type==="right"){const n=t.getValue(),s=Math.min(t.max,n+t.step);t.setValue(s),$s(t.key,s),af()}else if(i.type==="default"){const n=t.getDefaultValue?t.getDefaultValue():t.defaultValue;t.setValue(n),$s(t.key,n),Vt()}}function Wr(i){return 1+2.70158*Math.pow(i-1,3)+1.70158*Math.pow(i-1,2)}function $m(i){return 2.70158*i*i*i-1.70158*i*i}function yb(){if(!pl)return;const i=.08;if(yp===1){let e=ru+i;if(e>=1&&(e=1,Va(!1)),za(e),Bt){const n=Wr(e);Bt.scale.set(n,n,n),Bt.material.opacity=Math.min(1,e*1.5)}}else{let e=ru-i;if(e<=0&&(e=0,Va(!1),ub()),za(e),Bt){const t=$m(e),n=Math.max(.01,t);Bt.scale.set(n,n,n),Bt.material.opacity=e}}}function vb(){if(yb(),!Bt||!Ue)return;const i=Ue.inputSources,e=Ae.xr.getFrame(),t=Ae.xr.getReferenceSpace();if(!e||!t)return;const n={leftStickX:!1,leftStickY:!1,leftY:!1,leftX:!1,leftStickPress:!1,leftTrigger:!1,leftGrip:!1,rightStickX:!1,rightStickY:!1,rightA:!1,rightStickPress:!1,rightB:!1,rightTrigger:!1,rightGrip:!1};for(const s of i){if(s.gamepad){const r=s.gamepad,o=r.buttons,a=r.axes,l=xl;s.handedness==="left"?(a.length>=4&&(n.leftStickX=Math.abs(a[2])>l,n.leftStickY=Math.abs(a[3])>l),o[5]&&(n.leftX=o[5].pressed),o[4]&&(n.leftY=o[4].pressed),o[3]&&(n.leftStickPress=o[3].pressed),o[0]&&(n.leftTrigger=o[0].pressed||o[0].value>.5),o[1]&&(n.leftGrip=o[1].pressed||o[1].value>.5)):s.handedness==="right"&&(a.length>=4&&(n.rightStickX=Math.abs(a[2])>l,n.rightStickY=Math.abs(a[3])>l),o[4]&&(n.rightA=o[4].pressed),o[3]&&(n.rightStickPress=o[3].pressed),o[5]&&(n.rightB=o[5].pressed),o[0]&&(n.rightTrigger=o[0].pressed||o[0].value>.5),o[1]&&(n.rightGrip=o[1].pressed||o[1].value>.5))}if(s.handedness==="right"&&s.gripSpace){const r=e.getPose(s.gripSpace,t);if(r){const o=new _e().fromArray(r.transform.matrix),l=new b().setFromMatrixPosition(o).clone();if(l.y+=.25,Bt.position.copy(l),Me){const c=new b;Me.getWorldPosition(c);const u=new b;u.subVectors(c,l),u.y=0,u.normalize();const d=Math.atan2(u.x,u.z);Bt.rotation.set(0,d,0)}}}}Ru(n)}function Sb(){Kt&&(J.remove(Kt),Kt.geometry&&Kt.geometry.dispose(),Kt.material&&Kt.material.dispose(),Qh(null));const i=new qu(.02,.06,8),e=new at({color:16776960,transparent:!0,opacity:.9}),t=new we(i,e);J.add(t),Qh(t)}function Mb(){if(!U||!Me)return;const i=new b;Me.getWorldPosition(i);const e=U.position.clone(),n=e.clone().sub(i).clone().applyQuaternion(Me.quaternion.clone().invert()),s=Me.fov*Math.PI/180,r=Me.aspect||window.innerWidth/window.innerHeight,o=s/2*.7,a=Math.atan(Math.tan(o)*r),l=Math.atan2(n.y,-n.z),c=Math.atan2(n.x,-n.z);if(Math.abs(l)<o&&Math.abs(c)<a&&n.z<0)Kt&&(Kt.visible=!1);else{Kt||Sb(),Kt.visible=!0;const d=new b(0,0,-1).applyQuaternion(Me.quaternion),h=new b(1,0,0).applyQuaternion(Me.quaternion),p=new b(0,1,0).applyQuaternion(Me.quaternion),g=.35;let _=i.clone().add(d.clone().multiplyScalar(g));const m=Math.atan2(l,c),M=l<0?.95:.55,x=Math.cos(m)*a*.55,D=Math.sin(m)*o*M;_.add(h.clone().multiplyScalar(Math.tan(x)*g)),_.add(p.clone().multiplyScalar(Math.tan(D)*g)),Kt.position.copy(_),Kt.lookAt(e),Kt.rotateX(Math.PI/2),Kt.rotateY(Date.now()*.002)}}let el=null,tl=null;function nl(){if(Ut)return;Hr(),XT();const i=document.createElement("canvas");i.width=600,i.height=400,el=i;const e=new xn(i);e.minFilter=Tt,e.magFilter=Tt,tl=e,Tb();const t=new bt(.6,.4),n=new at({map:e,transparent:!0,side:_t,depthWrite:!1}),s=new we(t,n);J.add(s),om(s),am(!0),lm(0),Wa(!0),cm(1)}function Tb(){if(!el)return;const i=el,e=i.getContext("2d");e.clearRect(0,0,i.width,i.height),e.fillStyle="rgba(10, 10, 26, 0.85)",e.fillRect(0,0,i.width,i.height),e.strokeStyle="rgba(0, 200, 255, 0.5)",e.lineWidth=4,e.strokeRect(2,2,i.width-4,i.height-4);const t=e.createLinearGradient(0,0,i.width,i.height);t.addColorStop(0,"rgba(0, 200, 255, 0.1)"),t.addColorStop(.5,"rgba(255, 107, 107, 0.05)"),t.addColorStop(1,"rgba(0, 200, 255, 0.1)"),e.fillStyle=t,e.fillRect(4,4,i.width-8,i.height-8),e.font="bold 20px Arial",e.fillStyle="#ffcc00",e.textAlign="center",e.fillText(Y("welcome","step"),i.width/2,35),e.font="bold 36px Arial",e.fillStyle="#00c8ff",e.shadowColor="rgba(0, 200, 255, 0.8)",e.shadowBlur=15,e.fillText(Y("welcome","title"),i.width/2,75),e.shadowBlur=0,e.font="18px Arial",e.fillStyle="rgba(0, 200, 255, 0.7)",e.fillText(Y("welcome","titleEn"),i.width/2,100),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.lineWidth=2,e.beginPath(),e.moveTo(40,120),e.lineTo(i.width-40,120),e.stroke(),e.font="22px Arial",e.fillStyle="rgba(255, 255, 255, 0.9)",e.fillText(Y("welcome","instruction1"),i.width/2,165),e.font="18px Arial",e.fillStyle="rgba(255, 255, 255, 0.6)",e.fillText(Y("welcome","instruction1En"),i.width/2,195),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.beginPath(),e.moveTo(40,260),e.lineTo(i.width-40,260),e.stroke(),e.font="bold 28px Arial",e.fillStyle="#ffff00",e.shadowColor="rgba(255, 255, 0, 0.5)",e.shadowBlur=10,e.textAlign="right",e.fillText(Y("welcome","nextWithA"),i.width-40,310),e.shadowBlur=0,e.font="18px Arial",e.fillStyle="rgba(255, 255, 0, 0.7)",e.fillText(Y("welcome","nextWithAEn"),i.width-40,340),e.textAlign="center",tl&&(tl.needsUpdate=!0)}function bb(){!Ut||!So||(Gr(),cm(-1),Wa(!0))}function Eb(){if(!Mp)return;const i=.08;let e=Sp;if(Tp===1?(e+=i,e>=1&&(e=1,Wa(!1))):(e-=i,e<=0&&(e=0,Wa(!1),Ut&&(J.remove(Ut),Ut.geometry&&Ut.geometry.dispose(),Ut.material&&(Ut.material.map&&Ut.material.map.dispose(),Ut.material.dispose()),om(null),am(!1),el=null,tl=null),jn&&(J.remove(jn),jn.geometry&&jn.geometry.dispose(),jn.material&&jn.material.dispose(),um(null)),In&&(J.remove(In),In.geometry&&In.geometry.dispose(),In.material&&In.material.dispose(),dm(null)))),lm(e),Ut){const t=Wr(e);Ut.scale.set(t,t,1),Ut.material&&(Ut.material.opacity=e)}}function wb(){if(Eb(),!Ut||!Ue)return;const i=new b,e=new He;Me.getWorldPosition(i),Me.getWorldQuaternion(e);const t=new b(0,0,-1);t.applyQuaternion(e);const n=i.clone().add(t.clone().multiplyScalar(1));n.y-=.15,Ut.position.copy(n);const s=new b;s.subVectors(i,n),s.y=0,s.normalize();const r=Math.atan2(s.x,s.z);if(Ut.rotation.set(0,r,0),U&&wt){const o=new b;U.getWorldPosition(o);const a=new b(0,-.15,0);a.applyAxisAngle(new b(0,1,0),r);const l=n.clone().add(a),c=o.clone();if(!jn){const p=new Et,g=new ji({color:16776960,transparent:!0,opacity:.8}),_=new Ki(p,g);J.add(_),um(_)}const u=new Float32Array([l.x,l.y,l.z,c.x,c.y,c.z]);if(jn.geometry.setAttribute("position",new Ct(u,3)),jn.geometry.attributes.position.needsUpdate=!0,!In){const p=new $i(.02,16,16),g=new at({color:16776960,transparent:!0}),_=new we(p,g);J.add(_),dm(_)}In.position.copy(o);const h=(Math.sin(Date.now()*.001*3)+1)/2;In.material.opacity=.3+h*.7,In.scale.setScalar(.8+h*.4)}}let il=null,sl=null;function Ab(){if(Nt)return;Hr();const i=document.createElement("canvas");i.width=600,i.height=400,il=i;const e=new xn(i);e.minFilter=Tt,e.magFilter=Tt,sl=e,Rb();const t=new bt(.6,.4),n=new at({map:e,transparent:!0,side:_t,depthWrite:!1}),s=new we(t,n);J.add(s),hm(s),fm(!0),pm(0),Xa(!0),mm(1)}function Rb(){if(!il)return;const i=il,e=i.getContext("2d");e.clearRect(0,0,i.width,i.height),e.fillStyle="rgba(10, 10, 26, 0.85)",e.fillRect(0,0,i.width,i.height),e.strokeStyle="rgba(0, 200, 255, 0.5)",e.lineWidth=4,e.strokeRect(2,2,i.width-4,i.height-4);const t=e.createLinearGradient(0,0,i.width,i.height);t.addColorStop(0,"rgba(0, 200, 255, 0.1)"),t.addColorStop(.5,"rgba(255, 107, 107, 0.05)"),t.addColorStop(1,"rgba(0, 200, 255, 0.1)"),e.fillStyle=t,e.fillRect(4,4,i.width-8,i.height-8),e.font="bold 20px Arial",e.fillStyle="#ffcc00",e.textAlign="center",e.fillText(Y("tutorial2","step"),i.width/2,35),e.font="bold 36px Arial",e.fillStyle="#00c8ff",e.shadowColor="rgba(0, 200, 255, 0.8)",e.shadowBlur=15,e.fillText(Y("tutorial2","title"),i.width/2,75),e.shadowBlur=0,e.font="18px Arial",e.fillStyle="rgba(0, 200, 255, 0.7)",e.fillText(Y("tutorial2","titleEn"),i.width/2,100),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.lineWidth=2,e.beginPath(),e.moveTo(40,120),e.lineTo(i.width-40,120),e.stroke(),e.font="22px Arial",e.fillStyle="rgba(255, 255, 255, 0.9)",e.fillText(Y("tutorial2","instruction1"),i.width/2,155),e.fillText(Y("tutorial2","instruction2"),i.width/2,185),e.font="18px Arial",e.fillStyle="rgba(255, 255, 255, 0.6)",e.fillText(Y("tutorial2","instruction1En"),i.width/2,215),e.fillText(Y("tutorial2","instruction2En"),i.width/2,240),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.beginPath(),e.moveTo(40,260),e.lineTo(i.width-40,260),e.stroke(),e.font="bold 28px Arial",e.fillStyle="#ffff00",e.shadowColor="rgba(255, 255, 0, 0.5)",e.shadowBlur=10,e.textAlign="right",e.fillText(Y("tutorial2","nextWithA"),i.width-40,310),e.shadowBlur=0,e.font="18px Arial",e.fillStyle="rgba(255, 255, 0, 0.7)",e.fillText(Y("tutorial2","nextWithAEn"),i.width-40,340),e.textAlign="center",sl&&(sl.needsUpdate=!0)}function Cb(){!Nt||!Mo||(Gr(),mm(-1),Xa(!0))}function Pb(){if(!wp)return;const i=.08;let e=Ep;if(Ap===1?(e+=i,e>=1&&(e=1,Xa(!1))):(e-=i,e<=0&&(e=0,Xa(!1),Nt&&(J.remove(Nt),Nt.geometry&&Nt.geometry.dispose(),Nt.material&&(Nt.material.map&&Nt.material.map.dispose(),Nt.material.dispose()),hm(null),fm(!1),il=null,sl=null),Kn&&(J.remove(Kn),Kn.geometry&&Kn.geometry.dispose(),Kn.material&&Kn.material.dispose(),gm(null)),Un&&(J.remove(Un),Un.geometry&&Un.geometry.dispose(),Un.material&&Un.material.dispose(),_m(null)))),pm(e),Nt){const t=Wr(e);Nt.scale.set(t,t,1),Nt.material&&(Nt.material.opacity=e)}}function Db(){if(Pb(),!Nt||!Ue)return;const i=Ae.xr.getFrame(),e=Ae.xr.getReferenceSpace();if(!i||!e)return;const t=new b,n=new He;Me.getWorldPosition(t),Me.getWorldQuaternion(n);const s=new b(0,0,-1);s.applyQuaternion(n);const r=t.clone().add(s.clone().multiplyScalar(1));r.y-=.15,Nt.position.copy(r);const o=new b;o.subVectors(t,r),o.y=0,o.normalize();const a=Math.atan2(o.x,o.z);Nt.rotation.set(0,a,0);let l=null;const c=Ue.inputSources;for(const u of c)if(u.handedness==="right"&&u.gripSpace){const d=i.getPose(u.gripSpace,e);if(d){l=new b().setFromMatrixPosition(new _e().fromArray(d.transform.matrix));break}}if(l){const u=new b(.2,-.15,0);u.applyAxisAngle(new b(0,1,0),a);const d=r.clone().add(u),h=l.clone();if(!Kn){const m=new Et,f=new ji({color:16776960,transparent:!0,opacity:.8}),M=new Ki(m,f);J.add(M),gm(M)}const p=new Float32Array([d.x,d.y,d.z,h.x,h.y,h.z]);if(Kn.geometry.setAttribute("position",new Ct(p,3)),Kn.geometry.attributes.position.needsUpdate=!0,!Un){const m=new $i(.015,16,16),f=new at({color:16776960,transparent:!0}),M=new we(m,f);J.add(M),_m(M)}Un.position.copy(l);const _=(Math.sin(Date.now()*.001*3)+1)/2;Un.material.opacity=.3+_*.7,Un.scale.setScalar(.8+_*.4)}}let rl=null,ol=null;function Lb(){if(Ft)return;Hr();const i=document.createElement("canvas");i.width=600,i.height=400,rl=i;const e=new xn(i);e.minFilter=Tt,e.magFilter=Tt,ol=e,Ib();const t=new bt(.6,.4),n=new at({map:e,transparent:!0,side:_t,depthWrite:!1}),s=new we(t,n);J.add(s),xm(s),ym(!0),vm(0),qa(!0),Sm(1)}function Ib(){if(!rl)return;const i=rl,e=i.getContext("2d");e.clearRect(0,0,i.width,i.height),e.fillStyle="rgba(10, 10, 26, 0.85)",e.fillRect(0,0,i.width,i.height),e.strokeStyle="rgba(0, 200, 255, 0.5)",e.lineWidth=4,e.strokeRect(2,2,i.width-4,i.height-4);const t=e.createLinearGradient(0,0,i.width,i.height);t.addColorStop(0,"rgba(0, 200, 255, 0.1)"),t.addColorStop(.5,"rgba(255, 107, 107, 0.05)"),t.addColorStop(1,"rgba(0, 200, 255, 0.1)"),e.fillStyle=t,e.fillRect(4,4,i.width-8,i.height-8),e.font="bold 20px Arial",e.fillStyle="#ffcc00",e.textAlign="center",e.fillText(Y("tutorial3","step"),i.width/2,35),e.font="bold 36px Arial",e.fillStyle="#00c8ff",e.shadowColor="rgba(0, 200, 255, 0.8)",e.shadowBlur=15,e.fillText(Y("tutorial3","title"),i.width/2,75),e.shadowBlur=0,e.font="18px Arial",e.fillStyle="rgba(0, 200, 255, 0.7)",e.fillText(Y("tutorial3","titleEn"),i.width/2,100),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.lineWidth=2,e.beginPath(),e.moveTo(40,120),e.lineTo(i.width-40,120),e.stroke(),e.font="22px Arial",e.fillStyle="rgba(255, 255, 255, 0.9)",e.fillText(Y("tutorial3","instruction1"),i.width/2,175),e.font="18px Arial",e.fillStyle="rgba(255, 255, 255, 0.6)",e.fillText(Y("tutorial3","instruction1En"),i.width/2,205),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.beginPath(),e.moveTo(40,260),e.lineTo(i.width-40,260),e.stroke(),e.font="bold 28px Arial",e.fillStyle="#ffff00",e.shadowColor="rgba(255, 255, 0, 0.5)",e.shadowBlur=10,e.textAlign="right",e.fillText(Y("tutorial3","nextWithA"),i.width-40,310),e.shadowBlur=0,e.font="18px Arial",e.fillStyle="rgba(255, 255, 0, 0.7)",e.fillText(Y("tutorial3","nextWithAEn"),i.width-40,340),e.textAlign="center",ol&&(ol.needsUpdate=!0)}function Ub(){!Ft||!Ir||(Gr(),Sm(-1),qa(!0))}function Nb(){if(!Cp)return;const i=.08;let e=Rp;if(Pp===1?(e+=i,e>=1&&(e=1,qa(!1))):(e-=i,e<=0&&(e=0,qa(!1),Ft&&(J.remove(Ft),Ft.geometry&&Ft.geometry.dispose(),Ft.material&&(Ft.material.map&&Ft.material.map.dispose(),Ft.material.dispose()),xm(null),ym(!1),rl=null,ol=null),$n&&(J.remove($n),$n.geometry&&$n.geometry.dispose(),$n.material&&$n.material.dispose(),Mm(null)),Nn&&(J.remove(Nn),Nn.geometry&&Nn.geometry.dispose(),Nn.material&&Nn.material.dispose(),Tm(null)))),vm(e),Ft){const t=Wr(e);Ft.scale.set(t,t,1),Ft.material&&(Ft.material.opacity=e)}}function Fb(){if(Nb(),!Ft||!Ue)return;const i=Ae.xr.getFrame(),e=Ae.xr.getReferenceSpace();if(!i||!e)return;const t=new b,n=new He;Me.getWorldPosition(t),Me.getWorldQuaternion(n);const s=new b(0,0,-1);s.applyQuaternion(n);const r=t.clone().add(s.clone().multiplyScalar(1));r.y-=.15,Ft.position.copy(r);const o=new b;o.subVectors(t,r),o.y=0,o.normalize();const a=Math.atan2(o.x,o.z);Ft.rotation.set(0,a,0);let l=null;const c=Ue.inputSources;for(const u of c)if(u.handedness==="left"&&u.gripSpace){const d=i.getPose(u.gripSpace,e);if(d){l=new b().setFromMatrixPosition(new _e().fromArray(d.transform.matrix));break}}if(l){const u=new b(-.2,-.15,0);u.applyAxisAngle(new b(0,1,0),a);const d=r.clone().add(u),h=l.clone();if(!$n){const m=new Et,f=new ji({color:16776960,transparent:!0,opacity:.8}),M=new Ki(m,f);J.add(M),Mm(M)}const p=new Float32Array([d.x,d.y,d.z,h.x,h.y,h.z]);if($n.geometry.setAttribute("position",new Ct(p,3)),$n.geometry.attributes.position.needsUpdate=!0,!Nn){const m=new $i(.015,16,16),f=new at({color:16776960,transparent:!0}),M=new we(m,f);J.add(M),Tm(M)}Nn.position.copy(l);const _=(Math.sin(Date.now()*.001*3)+1)/2;Nn.material.opacity=.3+_*.7,Nn.scale.setScalar(.8+_*.4)}}let al=null,ll=null;function Ob(){if(Ot)return;Hr();const i=document.createElement("canvas");i.width=600,i.height=400,al=i;const e=new xn(i);e.minFilter=Tt,e.magFilter=Tt,ll=e,Bb();const t=new bt(.6,.4),n=new at({map:e,transparent:!0,side:_t,depthWrite:!1}),s=new we(t,n);J.add(s),bm(s),Em(!0),wm(0),Ya(!0),Am(1)}function Bb(){if(!al)return;const i=al,e=i.getContext("2d");e.clearRect(0,0,i.width,i.height),e.fillStyle="rgba(10, 10, 26, 0.85)",e.fillRect(0,0,i.width,i.height),e.strokeStyle="rgba(0, 200, 255, 0.5)",e.lineWidth=4,e.strokeRect(2,2,i.width-4,i.height-4);const t=e.createLinearGradient(0,0,i.width,i.height);t.addColorStop(0,"rgba(0, 200, 255, 0.1)"),t.addColorStop(.5,"rgba(255, 107, 107, 0.05)"),t.addColorStop(1,"rgba(0, 200, 255, 0.1)"),e.fillStyle=t,e.fillRect(4,4,i.width-8,i.height-8),e.font="bold 20px Arial",e.fillStyle="#ffcc00",e.textAlign="center",e.fillText(Y("tutorial4","step"),i.width/2,35),e.font="bold 36px Arial",e.fillStyle="#00c8ff",e.shadowColor="rgba(0, 200, 255, 0.8)",e.shadowBlur=15,e.fillText(Y("tutorial4","title"),i.width/2,75),e.shadowBlur=0,e.font="18px Arial",e.fillStyle="rgba(0, 200, 255, 0.7)",e.fillText(Y("tutorial4","titleEn"),i.width/2,100),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.lineWidth=2,e.beginPath(),e.moveTo(40,120),e.lineTo(i.width-40,120),e.stroke(),e.font="22px Arial",e.fillStyle="rgba(255, 255, 255, 0.9)",e.fillText(Y("tutorial4","instruction1"),i.width/2,155),e.font="bold 26px Arial",e.fillStyle="#ffff00",e.shadowColor="rgba(255, 255, 0, 0.5)",e.shadowBlur=10,e.fillText(Y("tutorial4","instruction2"),i.width/2,195),e.shadowBlur=0,e.font="16px Arial",e.fillStyle="rgba(255, 255, 255, 0.6)",e.fillText(Y("tutorial4","instruction1En"),i.width/2,235),e.fillText(Y("tutorial4","instruction2En"),i.width/2,255),e.strokeStyle="rgba(0, 200, 255, 0.3)",e.beginPath(),e.moveTo(40,280),e.lineTo(i.width-40,280),e.stroke(),e.font="bold 24px Arial",e.fillStyle="#00ff00",e.shadowColor="rgba(0, 255, 0, 0.5)",e.shadowBlur=10,e.textAlign="right",e.fillText(Y("tutorial4","nextWithA"),i.width-40,325),e.shadowBlur=0,e.font="16px Arial",e.fillStyle="rgba(0, 255, 0, 0.7)",e.fillText(Y("tutorial4","nextWithAEn"),i.width-40,350),e.textAlign="center",ll&&(ll.needsUpdate=!0)}function kb(){!Ot||!ed||(Gr(),qT(2e3),Am(-1),Ya(!0))}function zb(){if(!Lp)return;const i=.08;let e=Dp;if(Ip===1?(e+=i,e>=1&&(e=1,Ya(!1))):(e-=i,e<=0&&(e=0,Ya(!1),Ot&&(J.remove(Ot),Ot.geometry&&Ot.geometry.dispose(),Ot.material&&(Ot.material.map&&Ot.material.map.dispose(),Ot.material.dispose()),bm(null),Em(!1),al=null,ll=null),Zn&&(J.remove(Zn),Zn.geometry&&Zn.geometry.dispose(),Zn.material&&Zn.material.dispose(),Rm(null)),Fn&&(J.remove(Fn),Fn.geometry&&Fn.geometry.dispose(),Fn.material&&Fn.material.dispose(),Cm(null)))),wm(e),Ot){const t=Wr(e);Ot.scale.set(t,t,1),Ot.material&&(Ot.material.opacity=e)}}function Vb(){if(zb(),!Ot||!Ue)return;const i=Ae.xr.getFrame(),e=Ae.xr.getReferenceSpace();if(!i||!e)return;const t=new b,n=new He;Me.getWorldPosition(t),Me.getWorldQuaternion(n);const s=new b(0,0,-1);s.applyQuaternion(n);const r=t.clone().add(s.clone().multiplyScalar(1));r.y-=.15,Ot.position.copy(r);const o=new b;o.subVectors(t,r),o.y=0,o.normalize();const a=Math.atan2(o.x,o.z);Ot.rotation.set(0,a,0);let l=null;const c=Ue.inputSources;for(const u of c)if(u.handedness==="left"&&u.gripSpace){const d=i.getPose(u.gripSpace,e);if(d){l=new b().setFromMatrixPosition(new _e().fromArray(d.transform.matrix));break}}if(l){const u=new b(-.2,-.15,0);u.applyAxisAngle(new b(0,1,0),a);const d=r.clone().add(u),h=l.clone();if(!Zn){const m=new Et,f=new ji({color:16776960,transparent:!0,opacity:.8}),M=new Ki(m,f);J.add(M),Rm(M)}const p=new Float32Array([d.x,d.y,d.z,h.x,h.y,h.z]);if(Zn.geometry.setAttribute("position",new Ct(p,3)),Zn.geometry.attributes.position.needsUpdate=!0,!Fn){const m=new $i(.015,16,16),f=new at({color:16776960,transparent:!0}),M=new we(m,f);J.add(M),Cm(M)}Fn.position.copy(l);const _=(Math.sin(Date.now()*.001*3)+1)/2;Fn.material.opacity=.3+_*.7,Fn.scale.setScalar(.8+_*.4)}}function Hb(){if(!U||!wt)return!1;const i=new b;U.getWorldPosition(i);let e=!1;_n.forEach((s,r)=>{const{position:o,quaternion:a,polygon:l,orientation:c}=s,u=new b(0,1,0).applyQuaternion(a),h=new b().subVectors(i,o).dot(u),p=Math.abs(u.y)>.7?Dn.vertical:Dn.horizontal;if(Math.abs(h)<p){const g=a.clone().invert(),_=i.clone().sub(o).applyQuaternion(g);let m=!1;for(let f=0,M=l.length-1;f<l.length;M=f++){const E=l[f].x,x=l[f].z,D=l[M].x,R=l[M].z;x>_.z!=R>_.z&&_.x<(D-E)*(_.z-x)/(R-x)+E&&(m=!m)}if(m){e=!0;const f=p-Math.abs(h),M=h>0?1:-1,E=u.clone().multiplyScalar(f*M),x=f;U.position.add(E),U.userData.basePosition&&U.userData.basePosition.add(E);const D=gt.dot(u);if((h>0&&D<0||h<0&&D>0)&&gt.sub(u.clone().multiplyScalar(D*1.5)),x>.001&&!gs&&(_i(!0),er(),Ue)){const R=Ue.inputSources;for(const w of R)if(w.gamepad&&w.gamepad.hapticActuators&&w.gamepad.hapticActuators.length>0){const C=Math.min(Math.max(x*20,.3),1);w.gamepad.hapticActuators[0].pulse(C,33)}}}}});const n=i.y-0;if(n<Dn.vertical){e=!0;const s=Dn.vertical-n;if(new b(0,1,0),U.position.y+=s,U.userData.basePosition&&(U.userData.basePosition.y+=s),gt.y<0&&(gt.y=-gt.y*.5),s>.001&&!gs&&(_i(!0),er(),Ue)){const r=Ue.inputSources;for(const o of r)if(o.gamepad&&o.gamepad.hapticActuators&&o.gamepad.hapticActuators.length>0){const a=Math.min(Math.max(s*20,.3),1);o.gamepad.hapticActuators[0].pulse(a,33)}}}return uo&&uo.length>0&&uo.forEach(s=>{if(!s.userData.isObstacle)return;const r=s.position.clone(),o=new b().subVectors(i,r);if(s.userData.type==="cube"){const a=s.userData.size/2,l=Dn.horizontal,c=s.quaternion.clone().invert(),u=o.clone().applyQuaternion(c),d=Math.max(0,Math.abs(u.x)-a),h=Math.max(0,Math.abs(u.y)-a),p=Math.max(0,Math.abs(u.z)-a);if(d<l&&h<l&&p<l){e=!0;const g=a+l-Math.abs(u.x),_=a+l-Math.abs(u.y),m=a+l-Math.abs(u.z);let f=new b,M=0;g<=_&&g<=m?(f.set(Math.sign(u.x),0,0),M=g):_<=g&&_<=m?(f.set(0,Math.sign(u.y),0),M=_):(f.set(0,0,Math.sign(u.z)),M=m);const E=f.applyQuaternion(s.quaternion);U.position.add(E.clone().multiplyScalar(M)),U.userData.basePosition&&U.userData.basePosition.add(E.clone().multiplyScalar(M));const x=gt.dot(E);x<0&&gt.sub(E.clone().multiplyScalar(x*1.5)),gs||(_i(!0),er())}}else if(s.userData.type==="pole"){const a=s.userData.radius,l=s.userData.height,c=a+Dn.horizontal,u=s.quaternion.clone().invert(),d=o.clone().applyQuaternion(u),h=l/2,p=Math.max(-h,Math.min(h,d.y)),g=Math.sqrt(d.x*d.x+d.z*d.z),_=Math.abs(d.y)-h,m=d.y>=-h&&d.y<=h,f=_<Dn.vertical;if(g<c&&(m||f)){e=!0;let M=new b,E=0;if(m)M.set(d.x,0,d.z).normalize(),E=c-g;else{const x=new b(d.x,d.y-p,d.z),D=x.length();D>.001&&(M.copy(x).normalize(),E=c-D)}if(E>0&&M.length()>.001){const x=M.applyQuaternion(s.quaternion);U.position.add(x.clone().multiplyScalar(E)),U.userData.basePosition&&U.userData.basePosition.add(x.clone().multiplyScalar(E));const D=gt.dot(x);D<0&&gt.sub(x.clone().multiplyScalar(D*1.5)),gs||(_i(!0),er())}}}else if(s.userData.type==="torus"){const a=s.userData.outerRadius,l=s.userData.tubeRadius,c=o.clone(),u=s.quaternion.clone().invert();c.applyQuaternion(u);const h=Math.sqrt(c.x*c.x+c.y*c.y)-a,p=Math.sqrt(h*h+c.z*c.z),g=l+Dn.horizontal;if(p<g){e=!0;const _=Math.atan2(c.y,c.x),m=new b(Math.cos(_)*a,Math.sin(_)*a,0),f=c.clone().sub(m).normalize();f.applyQuaternion(s.quaternion);const M=g-p;U.position.add(f.multiplyScalar(M)),U.userData.basePosition&&U.userData.basePosition.add(f.clone().multiplyScalar(M));const E=gt.dot(f);E<0&&gt.sub(f.clone().multiplyScalar(E*1.5)),gs||(_i(!0),er())}}}),e||_i(!1),e}function Gb(){if(!U||!wt||un||Zi||xs!==null||sr!==null||Es!==null||Lo>0||ei||ti||Uo||Ps||Op)return;const i=0,e=.016;let t=i+Dn.vertical;_n.forEach(o=>{const{position:a,quaternion:l,polygon:c}=o,u=new b(0,1,0).applyQuaternion(l);if(Math.abs(u.y)<.7)return;const d=U.position.clone(),h=l.clone().invert(),p=d.clone().sub(a).applyQuaternion(h);let g=!1;for(let _=0,m=c.length-1;_<c.length;m=_++){const f=c[_].x,M=c[_].z,E=c[m].x,x=c[m].z;M>p.z!=x>p.z&&p.x<(E-f)*(p.z-M)/(x-M)+f&&(g=!g)}if(g){const _=a.y+Dn.vertical;_<=d.y+.01&&_>t&&(t=_)}});const n=Math.abs(U.position.y-t)<.01,s=tn.length()<.05;if(n&&s){U.position.y=t,tn.set(0,0,0),mn.set(0,0,0);const o=new He().setFromAxisAngle(new b(0,1,0),U.rotation.y);U.quaternion.slerp(o,.3);const a=new Wn().setFromQuaternion(U.quaternion);if(Math.abs(a.x)<.02&&Math.abs(a.z)<.02){const l=new He().setFromAxisAngle(new b(0,1,0),U.rotation.y);U.quaternion.copy(l)}return}const r=-9.8;if(tn.y+=r*e,U.position.add(tn.clone().multiplyScalar(e)),U.position.y<=t){const o=Math.abs(tn.y);if(U.position.y=t,tn.y<0){if(tn.y=-tn.y*.5,mn.x+=(Math.random()-.5)*1,mn.z+=(Math.random()-.5)*1,o>.5&&!gs&&(_i(!0),er(),Ue)){const a=Ue.inputSources;for(const l of a)if(l.gamepad&&l.gamepad.hapticActuators&&l.gamepad.hapticActuators.length>0){const c=Math.min(Math.max(o*.5,.3),1);l.gamepad.hapticActuators[0].pulse(c,33)}}}else _i(!1);tn.x*=.7,tn.z*=.7,mn.multiplyScalar(.7)}else _i(!1);if(mn.length()>.01){const o=mn.clone().normalize(),a=mn.length()*e,l=new He().setFromAxisAngle(o,a);U.quaternion.multiply(l),mn.multiplyScalar(.85)}else mn.set(0,0,0);if(U.position.y<=t+.02){const o=new He().setFromAxisAngle(new b(0,1,0),U.rotation.y);U.quaternion.slerp(o,.2)}}function Wb(){if(!U||!wt||!un||ei||ti||Uo||Ps)return;xu(hs+.016),U.userData.basePosition||(U.userData.basePosition=U.position.clone());const i=Math.pow(Xn/.3,.5),e=Math.max(.3,Math.min(2,i)),t=Math.sin(hs*1.2)*.006*e,n=Math.cos(hs*.9)*.004*e,s=Math.sin(hs*.8)*.008*e,r=Math.sin(hs*.7)*.008*e,o=Math.cos(hs*.85)*.008*e,a=U.userData.basePosition;U.position.x=a.x+s,U.position.y=a.y+t,U.position.z=a.z+n,U.userData.physicsTilt||(U.userData.physicsTilt={x:0,z:0}),U.rotation.order="YXZ",U.rotation.x=U.userData.physicsTilt.x+r,U.rotation.z=U.userData.physicsTilt.z+o}function Xb(){if(!Uo||!U||!wt)return;ja(Ca+rT*.016),Ca>=1&&(ja(1),od(!1));const i=1-Math.pow(1-Ca,3);U.userData.basePosition||(U.userData.basePosition=U.position.clone()),U.userData.basePosition.copy(U.position),U.quaternion.slerpQuaternions(td,nd,i),gt.set(0,0,0),No(0)}function qb(){const i=new zr(16777215,.5);i.position.set(0,10,0),i.castShadow=!0,i.shadow.mapSize.width=2048,i.shadow.mapSize.height=2048,i.shadow.camera.near=.5,i.shadow.camera.far=50,i.shadow.camera.left=-5,i.shadow.camera.right=5,i.shadow.camera.top=5,i.shadow.camera.bottom=-5,J.add(i),J.add(i.target),_l(i);const e=new bt(50,50),t=new Yu({opacity:.3}),n=new we(e,t);n.rotation.x=-Math.PI/2,n.position.y=.001,n.receiveShadow=!0,J.add(n),gl(n),Ae.shadowMap.enabled=!0,Ae.shadowMap.type=Du,U&&U.traverse(s=>{s.isMesh&&(s.castShadow=!0)}),console.log("MR影設定を作成しました")}function Yb(){Mi&&(J.remove(Mi),Mi.geometry.dispose(),Mi.material.dispose(),gl(null)),gn&&(J.remove(gn.target),J.remove(gn),_l(null)),zi.forEach(i=>{J.remove(i),i.geometry.dispose(),i.material.dispose()}),zi.clear(),console.log("MR影設定を削除しました")}function jb(){J.background=new ge(13421772);const i=100,e=200,t=new rM(i,e,8947848,10066329);t.position.y=0,J.add(t),Im(t);const n=new bt(i,i),s=new Yu({opacity:.4}),r=new we(n,s);r.rotation.x=-Math.PI/2,r.position.y=.001,r.receiveShadow=!0,J.add(r),gl(r);const o=new zr(16777215,.8);o.position.set(10,20,10),o.castShadow=!0,o.shadow.mapSize.width=4096,o.shadow.mapSize.height=4096,o.shadow.camera.near=.5,o.shadow.camera.far=100,o.shadow.camera.left=-50,o.shadow.camera.right=50,o.shadow.camera.top=50,o.shadow.camera.bottom=-50,o.shadow.bias=-1e-4,J.add(o),J.add(o.target),_l(o),Ae.shadowMap.enabled=!0,Ae.shadowMap.type=Du,U&&U.traverse(a=>{a.isMesh&&(a.castShadow=!0)}),Kb(),console.log("VR環境を作成しました")}function Kb(){const i=[];let t=Date.now();function n(){return t=t*1103515245+12345&2147483647,t/2147483647}function s(x,D){return x+n()*(D-x)}function r(x,D,R=1){return Math.sqrt(x*x+D*D)>=R}function o(x){x.castShadow=!0,x.receiveShadow=!0}const a=25;for(let x=0;x<a;x++){let D,R,w=0;do{const z=n()*Math.PI*2,se=s(1,40);D=Math.cos(z)*se+s(-3,3),R=Math.sin(z)*se+s(-3,3),w++}while(!r(D,R)&&w<10);const C=s(1,3.5),v=s(.6,1.3),y=n()<.3?s(0,Math.PI/4):0,P=n()*Math.PI*2,I=n()<.2?s(-Math.PI/6,Math.PI/6):0,L=s(.06,.1),B=new ms(v,L,16,32),q=n()*.4+.45,W=new It({color:new ge().setHSL(q,.9,.5),roughness:.2,metalness:.6,emissive:new ge().setHSL(q,.9,.15),emissiveIntensity:.3}),j=new we(B,W);j.position.set(D,C,R),j.rotation.set(y,P,I),o(j),j.userData.isObstacle=!0,j.userData.type="torus",j.userData.outerRadius=v,j.userData.tubeRadius=L,J.add(j),i.push(j)}const l=35;for(let x=0;x<l;x++){let D,R,w=0;do{const B=n()*Math.PI*2,q=s(1,38);D=Math.cos(B)*q+s(-4,4),R=Math.sin(B)*q+s(-4,4),w++}while(!r(D,R)&&w<10);const C=s(.3,.9),v=s(.8,3.5),y=new Tn(C,C,C),P=n()*.2+.02,I=new It({color:new ge().setHSL(P,.8,.5),roughness:.4,metalness:.4}),L=new we(y,I);L.position.set(D,v,R),L.rotation.set(n()*.4,n()*Math.PI,n()*.4),o(L),L.userData.isObstacle=!0,L.userData.type="cube",L.userData.size=C,J.add(L),i.push(L)}const c=20;for(let x=0;x<c;x++){let D,R,w=0;do{const L=n()*Math.PI*2,B=s(1,35);D=Math.cos(L)*B+s(-2,2),R=Math.sin(L)*B+s(-2,2),w++}while(!r(D,R)&&w<10);const C=s(2.5,5.5),v=.12,y=new lr(v,v,C,16),P=new It({color:16724787,roughness:.4,metalness:.3,emissive:3342336,emissiveIntensity:.2}),I=new we(y,P);I.position.set(D,C/2,R),o(I),I.userData.isObstacle=!0,I.userData.type="pole",I.userData.radius=v,I.userData.height=C,J.add(I),i.push(I)}[{dist:40,angle:0},{dist:40,angle:Math.PI/2},{dist:40,angle:Math.PI},{dist:40,angle:Math.PI*1.5},{dist:35,angle:Math.PI/4},{dist:35,angle:Math.PI*3/4},{dist:35,angle:Math.PI*5/4},{dist:35,angle:Math.PI*7/4}].forEach(x=>{const D=Math.cos(x.angle)*x.dist,R=Math.sin(x.angle)*x.dist,w=s(1.5,2.5),C=s(1.2,1.8),v=.1,y=new ms(C,v,16,32),P=new It({color:16766720,roughness:.1,metalness:.9,emissive:16766720,emissiveIntensity:.5}),I=new we(y,P);I.position.set(D,w,R),I.rotation.y=x.angle+Math.PI/2,o(I),I.userData.isObstacle=!0,I.userData.type="torus",I.userData.outerRadius=C,I.userData.tubeRadius=v,J.add(I),i.push(I)});const d=24;for(let x=0;x<d;x++){const D=x/d*Math.PI*2+s(-.1,.1),R=s(38,45),w=Math.cos(D)*R,C=Math.sin(D)*R,v=s(3,5),y=.08,P=new lr(y,y,v,8),I=new It({color:4521796,roughness:.5,metalness:.2,emissive:1131537,emissiveIntensity:.3}),L=new we(P,I);L.position.set(w,v/2,C),o(L),L.userData.isObstacle=!0,L.userData.type="pole",L.userData.radius=y,L.userData.height=v,J.add(L),i.push(L)}const h=12;for(let x=0;x<h;x++){const D=n()*Math.PI*2,R=s(25,38),w=Math.cos(D)*R,C=Math.sin(D)*R,v=s(.8,1.2),y=s(1.2,2.5),P=new Tn(v,v,v),I=.7+n()*.2,L=new It({color:new ge().setHSL(I,.7,.5),roughness:.3,metalness:.5,emissive:new ge().setHSL(I,.7,.1),emissiveIntensity:.2}),B=new we(P,L);B.position.set(w,y,C),B.rotation.set(n()*Math.PI,n()*Math.PI,n()*Math.PI),o(B),B.userData.isObstacle=!0,B.userData.type="cube",B.userData.size=v,J.add(B),i.push(B)}const p=15;for(let x=0;x<p;x++){const D=n()*Math.PI*2,R=s(1,40),w=Math.cos(D)*R+s(-5,5),C=Math.sin(D)*R+s(-5,5);if(!r(w,C))continue;const v=s(1.5,4),y=s(1,8),P=new Tn(v,v,v),I=n(),L=new It({color:new ge().setHSL(I,.6,.4),roughness:.5,metalness:.3,emissive:new ge().setHSL(I,.6,.1),emissiveIntensity:.15}),B=new we(P,L);B.position.set(w,y,C),B.rotation.set(n()*.5,n()*Math.PI,n()*.5),o(B),B.userData.isObstacle=!0,B.userData.type="cube",B.userData.size=v,J.add(B),i.push(B)}const g=10;for(let x=0;x<g;x++){const D=n()*Math.PI*2,R=s(1,35),w=Math.cos(D)*R+s(-3,3),C=Math.sin(D)*R+s(-3,3);if(!r(w,C))continue;const v=s(1.5,3.5),y=s(2,10),P=n()<.4?s(0,Math.PI/3):0,I=n()*Math.PI*2,L=n()<.3?s(-Math.PI/4,Math.PI/4):0,B=s(.1,.2),q=new ms(v,B,16,32),W=n()*.3+.55,j=new It({color:new ge().setHSL(W,.85,.55),roughness:.15,metalness:.7,emissive:new ge().setHSL(W,.85,.2),emissiveIntensity:.4}),z=new we(q,j);z.position.set(w,y,C),z.rotation.set(P,I,L),o(z),z.userData.isObstacle=!0,z.userData.type="torus",z.userData.outerRadius=v,z.userData.tubeRadius=B,J.add(z),i.push(z)}const _=20;for(let x=0;x<_;x++){const D=n()*Math.PI*2,R=s(1,40),w=Math.cos(D)*R+s(-4,4),C=Math.sin(D)*R+s(-4,4);if(!r(w,C))continue;const v=s(.4,2),y=s(5,15),P=new Tn(v,v,v),I=n()*.15+.95,L=new It({color:new ge().setHSL(I%1,.75,.55),roughness:.35,metalness:.45,emissive:new ge().setHSL(I%1,.75,.15),emissiveIntensity:.25}),B=new we(P,L);B.position.set(w,y,C),B.rotation.set(n()*Math.PI,n()*Math.PI,n()*Math.PI),o(B),B.userData.isObstacle=!0,B.userData.type="cube",B.userData.size=v,J.add(B),i.push(B)}const m=15;for(let x=0;x<m;x++){const D=n()*Math.PI*2,R=s(1,38),w=Math.cos(D)*R+s(-3,3),C=Math.sin(D)*R+s(-3,3);if(!r(w,C))continue;const v=s(.7,2),y=s(6,14),P=n()*Math.PI/2,I=n()*Math.PI*2,L=n()*Math.PI/3,B=s(.06,.12),q=new ms(v,B,16,32),W=n()*.2+.35,j=new It({color:new ge().setHSL(W,.9,.5),roughness:.2,metalness:.6,emissive:new ge().setHSL(W,.9,.15),emissiveIntensity:.35}),z=new we(q,j);z.position.set(w,y,C),z.rotation.set(P,I,L),o(z),z.userData.isObstacle=!0,z.userData.type="torus",z.userData.outerRadius=v,z.userData.tubeRadius=B,J.add(z),i.push(z)}const f=8;for(let x=0;x<f;x++){const D=n()*Math.PI*2,R=s(1,35),w=Math.cos(D)*R,C=Math.sin(D)*R,v=s(2,4),y=s(15,25),P=n()*Math.PI/3,I=n()*Math.PI*2,L=s(.12,.2),B=new ms(v,L,16,32),q=new It({color:65535,roughness:.1,metalness:.8,emissive:65535,emissiveIntensity:.5}),W=new we(B,q);W.position.set(w,y,C),W.rotation.set(P,I,0),o(W),W.userData.isObstacle=!0,W.userData.type="torus",W.userData.outerRadius=v,W.userData.tubeRadius=L,J.add(W),i.push(W)}const M=10;for(let x=0;x<M;x++){const D=n()*Math.PI*2,R=s(1,40),w=Math.cos(D)*R+s(-3,3),C=Math.sin(D)*R+s(-3,3);if(!r(w,C))continue;const v=s(1,3),y=s(15,22),P=new Tn(v,v,v),I=new It({color:16711935,roughness:.25,metalness:.6,emissive:16711935,emissiveIntensity:.3}),L=new we(P,I);L.position.set(w,y,C),L.rotation.set(n()*Math.PI,n()*Math.PI,n()*Math.PI),o(L),L.userData.isObstacle=!0,L.userData.type="cube",L.userData.size=v,J.add(L),i.push(L)}const E=8;for(let x=0;x<E;x++){const D=n()*Math.PI*2,R=s(1,38),w=Math.cos(D)*R,C=Math.sin(D)*R,v=s(10,25),y=s(.2,.5),P=new lr(y,y,v,16),I=n()*.1+0,L=new It({color:new ge().setHSL(I,.9,.5),roughness:.3,metalness:.4,emissive:new ge().setHSL(I,.9,.15),emissiveIntensity:.25}),B=new we(P,L);B.position.set(w,v/2,C),o(B),B.userData.isObstacle=!0,B.userData.type="pole",B.userData.radius=y,B.userData.height=v,J.add(B),i.push(B)}Bp(i),console.log("競技用コースを配置:",i.length,"個")}function $b(){J.background=null,cu&&(J.remove(cu),Im(null)),Mi&&(J.remove(Mi),Mi.geometry.dispose(),Mi.material.dispose(),gl(null)),gn&&(J.remove(gn.target),J.remove(gn),_l(null)),uo.forEach(i=>{J.remove(i),i.geometry&&i.geometry.dispose(),i.material&&i.material.dispose()}),Bp([]),console.log("VR環境を削除しました")}function Zb(i,e){const t=i.getViewerPose(e);if(!t)return;const n=i.session.renderState.baseLayer;for(const s of t.views)if(n&&n.getDepthInformation){const r=n.getDepthInformation(s);if(r){const o=r.texture;if(!hr){const a=new Rt,l=Ae.properties.get(a);l.__webglTexture=o,l.__webglInit=!0,a.needsUpdate=!0,Dm(a)}hr.userData.logged||(console.log("深度データ取得 (GPU):",{width:r.width,height:r.height,normDepthBufferFromNormView:r.normDepthBufferFromNormView}),hr.userData.logged=!0)}}}function Qb(){if(ws)return;const i=new bt(2,2),e=new at({map:hr,side:_t,transparent:!0,opacity:.5}),t=new we(i,e);t.position.set(0,1.5,-2),t.visible=fr,J.add(t),Lm(t)}function Jb(i,e){i.detectedPlanes&&(_n.forEach((t,n)=>{if(!i.detectedPlanes.has(n)&&(_n.delete(n),zi.has(n))){const s=zi.get(n);J.remove(s),s.geometry.dispose(),s.material.dispose(),zi.delete(n)}}),i.detectedPlanes.forEach(t=>{const n=i.getPose(t.planeSpace,e);if(!n)return;const s=new b().setFromMatrixPosition(new _e().fromArray(n.transform.matrix)),r=new He().setFromRotationMatrix(new _e().fromArray(n.transform.matrix)),o=t.polygon;if(!_n.has(t))_n.set(t,{position:s,quaternion:r,polygon:o,orientation:t.orientation}),console.log("新しい平面を検出:",t.orientation),yl&&t.orientation==="horizontal"&&eE(t,s,r,o);else{const a=_n.get(t);a.position=s,a.quaternion=r,a.polygon=o,zi.has(t)&&tE(t,s,r,o)}}))}function eE(i,e,t,n){if(!n||n.length<3)return;const s=[],r=[];for(let c=0;c<n.length;c++){const u=new b(n[c].x,0,n[c].z);u.applyQuaternion(t),u.add(e),u.y+=.002,s.push(u.x,u.y,u.z)}for(let c=1;c<n.length-1;c++)r.push(0,c,c+1);const o=new Et;o.setAttribute("position",new St(s,3)),o.setIndex(r),o.computeVertexNormals();const a=new Yu({opacity:.4}),l=new we(o,a);l.receiveShadow=!0,J.add(l),zi.set(i,l),console.log("平面影メッシュを作成: y =",e.y.toFixed(3))}function tE(i,e,t,n){const s=zi.get(i);if(!s||!n||n.length<3)return;const r=[],o=[];for(let l=0;l<n.length;l++){const c=new b(n[l].x,0,n[l].z);c.applyQuaternion(t),c.add(e),c.y+=.002,r.push(c.x,c.y,c.z)}for(let l=1;l<n.length-1;l++)o.push(0,l,l+1);s.geometry.dispose();const a=new Et;a.setAttribute("position",new St(r,3)),a.setIndex(o),a.computeVertexNormals(),s.geometry=a}function nE(){if(!Ue||!U||wt)return;const i=Ae.xr.getFrame(),e=Ae.xr.getReferenceSpace();if(!i||!e)return;const t=new b;Me.getWorldPosition(t);const n=new b(0,0,-1);n.applyQuaternion(Me.quaternion),n.y=0,n.normalize();let s=null;if(_n&&_n.size>0){let l=1/0;for(const[c,u]of _n)if(c.orientation==="horizontal"){const h=u.position.y;h<l&&(l=h)}l!==1/0&&(s=l,console.log("検出された床の高さ:",s))}s===null&&(s=0,console.log("床をy=0に設定 (カメラ位置:",t.y,")"));let r=null;const o=Ue.inputSources;for(const l of o)if(l.handedness==="right"&&l.gripSpace){const c=i.getPose(l.gripSpace,e);if(c){r=new b().setFromMatrixPosition(new _e().fromArray(c.transform.matrix)),console.log("右コントローラーの位置にドローンを配置:",r);break}}if(!r){console.log("右コントローラー待機中... inputSources:",o.length);return}U.position.copy(r);const a=Math.atan2(n.x,n.z);U.rotation.y=a,U.visible=!0,rd(!0),console.log("ドローン配置位置:",U.position),console.log("カメラ位置:",t),console.log("床の高さ:",s)}function iE(){if(!(!Ps||!U||!wt)){if(wa==="horizontal"){const i=new b(nr.x,U.position.y,nr.z),e=new b().subVectors(i,U.position),t=e.length();if(t<.05)po("vertical"),Le("水平位置到達 - 高度調整中"),console.log("水平移動完了、高度調整開始");else{e.normalize();const n=Math.min(vo,t);U.position.x+=e.x*n,U.position.z+=e.z*n,U.userData.basePosition.copy(U.position);const s=Math.atan2(e.x,e.z),r=U.rotation.y;let o=s-r;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;U.rotation.y+=o*.1}}else if(wa==="vertical"){const i=Math.abs(nr.y-U.position.y);if(i<.05)po("rotation"),Le("高度到達 - 向き調整中"),console.log("高度調整完了、向き調整開始");else{const e=Math.sign(nr.y-U.position.y),t=Math.min(vo,i);U.position.y+=e*t,U.userData.basePosition.copy(U.position)}}else if(wa==="rotation"){const i=new b;Me.getWorldPosition(i);const e=new b(0,0,-1);e.applyQuaternion(Me.quaternion),e.y=0,e.normalize();const t=Math.atan2(e.x,e.z),n=U.rotation.y;let s=t-n;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;Math.abs(s)<.05?(U.rotation.y=t,yu(!1),po("horizontal"),jm(),U.userData.basePosition.copy(U.position),gt.set(0,0,0),No(0),Le("自動帰還完了"),console.log("自動帰還完了")):U.rotation.y+=s*.1}}}function sE(){if(!Ue||!U||!wt||!un||qi||Lr)return;const i=Ue.inputSources;for(const e of i)if(e.gamepad){const n=e.gamepad.buttons[0],s=n&&n.pressed;e.handedness==="left"&&s&&!Wp?(sn>1?(tf(sn-1),Ja(),xa(),Le(`速度レベル: ${sn}`),Vt()):(xa(),Le(`速度レベル: ${sn} (最小)`),Vt()),sf(!0)):e.handedness==="left"&&!s&&sf(!1),e.handedness==="right"&&s&&!Xp?(sn<30?(tf(sn+1),Ja(),xa(),Le(`速度レベル: ${sn}`),Vt()):(xa(),Le(`速度レベル: ${sn} (最大)`),Vt()),rf(!0)):e.handedness==="right"&&!s&&rf(!1)}}function rE(){if(!Ue||!U||!wt)return;const i=Ue.inputSources;for(const e of i)if(e.handedness==="right"&&e.gamepad){const n=e.gamepad.buttons[4],s=n&&n.pressed;s&&!xp&&!bp&&(So&&an===1?(bb(),Yi(2),setTimeout(()=>{Ab()},300),console.log("チュートリアル1を閉じ、チュートリアル2を表示"),ha(!0)):Mo&&an===2?(Cb(),Yi(3),setTimeout(()=>{dc()},300),console.log("チュートリアル2を閉じ、コントローラーガイドを表示"),ha(!0)):Ua&&an===3?(dc(),setTimeout(()=>{Lb()},300),console.log("コントローラーガイドを閉じ、チュートリアル3を表示"),ha(!0)):!So&&!Mo&&!Ir&&(dc(),console.log("コントローラーガイドメニュー:",Ua?"表示":"非表示"))),s||ha(!1),TT(s)}if(!(!un||ei||ti||qi)){for(const e of i)if(e.handedness==="right"&&e.gamepad){const t=e.gamepad.buttons,n=t[5],s=n&&n.pressed;if(s&&!gp)if(pr)Le("FPVモード中は自動帰還を使用できません"),Vt();else if(Ps)yu(!1),po("horizontal"),jm(),Le("自動帰還モードをキャンセル"),console.log("自動帰還キャンセル"),Vt();else{const a=Ae.xr.getFrame(),l=Ae.xr.getReferenceSpace();if(a&&l&&e.gripSpace){const c=a.getPose(e.gripSpace,l);if(c){const u=new b().setFromMatrixPosition(new _e().fromArray(c.transform.matrix));yu(!0),po("horizontal"),nr.copy(u),Kp(Fa*1.5),ZT(),QT(),Le("自動帰還モード開始 - 水平移動中"),console.log("自動帰還開始:",nr,"speed:",vo),Vt()}}}vT(s);const r=t[3],o=r&&r.pressed;o&&!_p&&(_T(!Dr),Dr?(Xe&&Xe.setVolume(0),console.log("ドローン音声: ミュート"),Le("ドローン音声: ミュート"),cf(!1)):(cd(),console.log("ドローン音声: オン"),Le("ドローン音声: オン"),cf(!0)),Vt()),MT(o)}}}function oE(){if(!Ue||!U||!wt)return;const i=Ue.inputSources;for(const e of i)if(e.handedness==="left"&&e.gamepad){const n=e.gamepad.buttons[4],s=n&&n.pressed;s&&!Up&&(Ir&&an===3?(Ub(),Yi(4),setTimeout(()=>{hc()},300),console.log("チュートリアル3を閉じ、設定ウィンドウを表示"),fa(!0)):Lr&&an===4?(hc(),console.log("設定ウィンドウを閉じる（チュートリアル4へ）"),fa(!0)):!Ir&&an!==4&&(hc(),console.log("設定メニュー:",Lr?"表示":"非表示"),fa(!0))),s||fa(!1)}}function aE(){if(!Ue||!Xe||So||Mo||Ir||an>=1&&an<=3||an===4&&Lr)return;if(ed&&an===4){const e=Ue.inputSources;for(const t of e)if(t.handedness==="left"&&t.gamepad){const s=t.gamepad.buttons[5];s&&s.pressed&&!Aa&&(kb(),Yi(0),localStorage.setItem("tutorialCompleted","true"),console.log("チュートリアル4を閉じ、チュートリアル完了"))}return}const i=Ue.inputSources;for(const e of i)if(e.handedness==="left"&&e.gamepad){const t=e.gamepad.buttons,n=t[5],s=n&&n.pressed;if(s&&!Aa&&!un&&!Zi&&!Gi&&wt){if(Eo(!0),Ao(!1),console.log("起動シーケンス開始"),Le("Drone Starting..."),uf(Y("status","startingUp")),Vt(),Xe&&Xe.buffer&&!Xe.isPlaying){let u=Math.pow(.3/Xn,.5);u=Math.max(.2,Math.min(2.7,u));const d=Math.max(u/2,.2);Xe.setVolume(0),Xe.setPlaybackRate(d),Xe.play(),console.log("ドローン音開始 - 開始ピッチ:",d.toFixed(2),"目標ピッチ:",u.toFixed(2))}const r=Date.now(),o=2e3;let a=Math.pow(.3/Xn,.5);a=Math.max(.2,Math.min(2.7,a));const l=Math.max(a/2,.2),c=setInterval(()=>{const u=Date.now()-r,d=Math.min(u/o,1);if(Wi(d),Xe&&Xe.isPlaying){Dr||Xe.setVolume(.7*d);const h=l+(a-l)*d;Xe.setPlaybackRate(h)}d>=1&&(clearInterval(c),console.log("プロペラ加速完了、音量・ピッチ通常到達"),setTimeout(()=>{console.log("=== 上昇準備完了 - 次のフレームで上昇開始 ==="),Ur(Date.now())},500))},16)}if(s&&!Aa&&un&&!Gi&&(Pm(!0),Mu(Date.now()),bo(!1),console.log("=== 終了シーケンス開始 - 降下を開始 ==="),Le("Shutting Down..."),uf(Y("status","shuttingDown")),Vt()),AT(s),un&&!Gi){const r=t[3],o=r&&r.pressed;o&&!mp&&(ST(!Bi),nb(Bi),Le(Bi?"当たり判定オン":"当たり判定オフ"),console.log(Bi?"当たり判定オン":"当たり判定オフ"),Vt()),xT(o)}}}function lE(){if(!Ue||!U||!wt||ei||ti||Zi||Gi)return;const i=Ue.inputSources;let e=!1,t=!1,n=null,s=null;const r=Ae.xr.getFrame(),o=Ae.xr.getReferenceSpace();if(r&&o){for(const a of i)if(a.gamepad&&a.gripSpace){const c=a.gamepad.buttons[1],u=c&&c.pressed,d=r.getPose(a.gripSpace,o);if(d){const h=new b().setFromMatrixPosition(new _e().fromArray(d.transform.matrix));a.handedness==="right"?(e=u,n=h):a.handedness==="left"&&(t=u,s=h)}}}if(e&&t&&n&&s)if(!qi)ef(!0),PT(n.distanceTo(s)),DT(Xn),Le("サイズ変更モード開始 (初期距離: "+(Ra*100).toFixed(1)+"cm)"),console.log("サイズ変更モード開始:",Ra,"スケール:",fu);else{const l=n.distanceTo(s)/Ra,c=fu*l;KT(c)}else qi&&(ef(!1),Le("サイズ変更モード終了 (最終スケール: "+Xn.toFixed(2)+")"),console.log("サイズ変更モード終了"))}function cE(){if(!Ue||!U||!wt||ti||qi||Zi||Gi)return;const i=Ue.inputSources;for(const e of i)if(e.gamepad&&e.gripSpace){const s=e.gamepad.buttons[1],r=s&&s.pressed;if(e.handedness==="right"){if(r&&!du&&e.gripSpace){const o=new b;U.getWorldPosition(o);const a=Ae.xr.getFrame(),l=Ae.xr.getReferenceSpace();if(a&&l){const c=a.getPose(e.gripSpace,l);if(c){const u=new b().setFromMatrixPosition(new _e().fromArray(c.transform.matrix)),d=o.distanceTo(u);if(d<.08){Eu(!0),wu(e),Ao(!1),js.copy(u);const h=new He().setFromRotationMatrix(new _e().fromArray(c.transform.matrix));Ks.copy(h),ho.copy(o).sub(js);const p=new He;U.getWorldQuaternion(p),ys.copy(Ks).invert().multiply(p),Le("右コントローラーでドローンを掴んだ (距離: "+(d*100).toFixed(1)+"cm)"),console.log("右コントローラーでドローンを掴んだ")}}}}else!r&&du&&ei&&Qs===e&&hf();RT(r)}if(e.handedness==="left"){if(r&&!hu&&e.gripSpace){const o=new b;U.getWorldPosition(o);const a=Ae.xr.getFrame(),l=Ae.xr.getReferenceSpace();if(a&&l){const c=a.getPose(e.gripSpace,l);if(c){const u=new b().setFromMatrixPosition(new _e().fromArray(c.transform.matrix)),d=o.distanceTo(u);if(d<.08){Eu(!0),wu(e),Ao(!1),js.copy(u);const h=new He().setFromRotationMatrix(new _e().fromArray(c.transform.matrix));Ks.copy(h),ho.copy(o).sub(js);const p=new He;U.getWorldQuaternion(p),ys.copy(Ks).invert().multiply(p),Le("左コントローラーでドローンを掴んだ (距離: "+(d*100).toFixed(1)+"cm)"),console.log("左コントローラーでドローンを掴んだ")}}}}else!r&&hu&&ei&&Qs===e&&hf();CT(r)}}if(ei&&Qs&&Qs.gripSpace){const e=Ae.xr.getFrame(),t=Ae.xr.getReferenceSpace();if(e&&t){const n=e.getPose(Qs.gripSpace,t);if(n){const s=new b().setFromMatrixPosition(new _e().fromArray(n.transform.matrix));js.lerp(s,$h);const r=js.clone().add(ho);U.position.copy(r),U.userData.basePosition&&U.userData.basePosition.copy(r);const o=new He().setFromRotationMatrix(new _e().fromArray(n.transform.matrix));Ks.slerp(o,$h);const a=Ks.clone().multiply(ys);U.quaternion.copy(a),gt.set(0,0,0),No(0)}}}}function hf(){const e=U.position.clone().sub(Io).divideScalar(.016);Eu(!1),wu(null),un?(od(!0),ja(0),Hp.copy(U.position),td.copy(U.quaternion),nd.setFromAxisAngle(new b(0,1,0),U.rotation.y),Le("ドローンを離した - ホバー位置に戻ります"),console.log("ドローンを離した")):(tn.copy(e),mn.set((Math.random()-.5)*3,(Math.random()-.5)*3,(Math.random()-.5)*3),Le("ドローンを離した"),console.log("ドローンを離した - 速度:",e.length().toFixed(2),"m/s"))}function uE(){if(!Ue||!U||!wt||ei||qi||Zi||Gi||!Ae.xr.getFrame())return;const e=[kp,zp];for(let t=0;t<e.length;t++){const n=e[t];if(!n)continue;const s=n.joints["index-finger-tip"],r=n.joints["thumb-tip"];if(s&&r){const o=new b,a=new b;s.getWorldPosition(o),r.getWorldPosition(a);const c=o.distanceTo(a)<.025,u=new b;U.getWorldPosition(u);const d=new b().addVectors(o,a).multiplyScalar(.5),h=d.distanceTo(u);if(c&&!ti&&h<.08){Fm(!0),Om(n),Ao(!1),ho.copy(u).sub(d),sc.copy(d);const p=n.joints.wrist;if(p){const g=new He;p.getWorldQuaternion(g);const _=new He;U.getWorldQuaternion(_),ys.copy(g).invert().multiply(_),Ys.copy(g)}else{const g=new He;n.getWorldQuaternion(g);const _=new He;U.getWorldQuaternion(_),ys.copy(g).invert().multiply(_),Ys.copy(g)}Le("手でドローンを掴んだ (距離: "+(h*100).toFixed(1)+"cm)"),console.log("手でドローンを掴んだ 距離:",h)}else!c&&ti&&uu===n&&dE();if(ti&&uu===n){s.getWorldPosition(o),r.getWorldPosition(a),d.addVectors(o,a).multiplyScalar(.5),sc.lerp(d,rc);const p=sc.clone().add(ho);U.position.copy(p),U.userData.basePosition&&U.userData.basePosition.copy(p);const g=n.joints.wrist;if(g){const _=new He;g.getWorldQuaternion(_),Ys.slerp(_,rc);const m=Ys.clone().multiply(ys);U.quaternion.copy(m)}else{const _=new He;n.getWorldQuaternion(_),Ys.slerp(_,rc);const m=Ys.clone().multiply(ys);U.quaternion.copy(m)}gt.set(0,0,0),No(0)}}}}function dE(){const e=U.position.clone().sub(Io).divideScalar(.016);Fm(!1),Om(null),un?(od(!0),ja(0),Hp.copy(U.position),td.copy(U.quaternion),nd.setFromAxisAngle(new b(0,1,0),U.rotation.y),Le("ドローンを離した - ホバー位置に戻ります"),console.log("手を離した")):(tn.copy(e),mn.set((Math.random()-.5)*3,(Math.random()-.5)*3,(Math.random()-.5)*3),Le("ドローンを離した"),console.log("手を離した - 速度:",e.length().toFixed(2),"m/s"))}function hE(){const i=new Yf;uT(i);const e=new qt(75,window.innerWidth/window.innerHeight,.1,1e3);dT(e);const t=new YS;e.add(t),mT(t);const n=new qf({antialias:!0,alpha:!0});n.setSize(window.innerWidth,window.innerHeight),n.xr.enabled=!0,hT(n),document.getElementById("app").appendChild(n.domElement);const r=new ep(16777215,.8);i.add(r);const o=new zr(16777215,.5);o.position.set(1,1,1),i.add(o),$T(),window.addEventListener("resize",yE),db(),n.setAnimationLoop(fE)}function fE(){if(JT(),eb(),tb(),ib(),ob(),ab(),vb(),_b(),wb(),Db(),Fb(),Vb(),Mb(),Ue){const i=Ae.xr.getFrame(),e=Ae.xr.getReferenceSpace();i&&e&&(Zb(i,e),Jb(i,e)),hr&&!ws&&Qb(),ws&&(ws.visible=fr);const t=Ue.inputSources;let n=!1,s=!1;if(i&&e)for(const a of t)a.handedness==="left"&&a.gripSpace?i.getPose(a.gripSpace,e)&&(n=!0):a.handedness==="right"&&a.gripSpace&&i.getPose(a.gripSpace,e)&&(s=!0);const r=ur,o=dr;bT(n),ET(s),(r!==ur||o!==dr)&&(!ur||!dr?sb():rb())}if(nE(),pp.forEach(i=>{un&&!Gi?i.rotation.y+=Na:i.rotation.y+=Na*Lo}),Xb(),gE(),Gb(),Wb(),lE(),cE(),iE(),sE(),rE(),oE(),aE(),_E(),xE(),uE(),U&&wt){const i=U.position.clone();if(oc.length()>0){const e=i.distanceTo(oc);IT(e/.016),cd()}oc.copy(i)}U&&Io.copy(U.position),mE(),pE(),Ae.render(J,Me)}function pE(){if(!gn||!U||!wt)return;const i=U.position;if(gn.position.set(i.x,i.y+10,i.z),gn.target.position.copy(i),gn.target.updateMatrixWorld(),yl&&_n.size>0){let e=50;_n.forEach(t=>{const{position:n,quaternion:s,polygon:r}=t,o=new b(0,1,0).applyQuaternion(s);if(Math.abs(o.y)<.7||n.y>=i.y)return;const a=s.clone().invert(),l=i.clone().sub(n).applyQuaternion(a);let c=!1;for(let u=0,d=r.length-1;u<r.length;d=u++){const h=r[u].x,p=r[u].z,g=r[d].x,_=r[d].z;p>l.z!=_>l.z&&l.x<(g-h)*(l.z-p)/(_-p)+h&&(c=!c)}if(c){const u=i.y-n.y;u<e&&(e=u)}}),gn.shadow.camera.far=10+e+.1,gn.shadow.camera.updateProjectionMatrix()}}function mE(){if(!(!Ue||!U||!wt)){if(!Js){const i=Ae.xr.getReferenceSpace();i&&ld(i)}if(Js){if(pr&&!_u){Ae.xr.setReferenceSpace(Js);const i=new b;Me.getWorldPosition(i),Ka(i.clone());const e=U.userData.basePosition?U.userData.basePosition.clone():U.position.clone();$a(e),U.rotation.y,Za(!0),console.log("FPVモード開始"),console.log("  カメラ高さ:",i.y.toFixed(3)),console.log("  ドローンbasePosition:",e.x.toFixed(3),e.y.toFixed(3),e.z.toFixed(3))}else if(!pr&&_u){Za(!1),Ka(null),$a(null),Ae.xr.setReferenceSpace(Js),console.log("FPVモード終了 - 元の位置に戻る");return}if(pr&&jp&&gu){const i=U.userData.basePosition?U.userData.basePosition.clone():U.position.clone(),t=U.rotation.y+Math.PI,n=new b(i.x,i.y-gu.y,i.z),s=new He;s.setFromAxisAngle(new b(0,1,0),t);const r=n.clone().applyQuaternion(s.clone().invert()),o=new XRRigidTransform({x:-r.x,y:-r.y,z:-r.z},{x:0,y:Math.sin(-t/2),z:0,w:Math.cos(-t/2)}),a=Js.getOffsetReferenceSpace(o);Ae.xr.setReferenceSpace(a)}}}}function gE(){if(!(xs===null||!U||!wt)&&ir===null&&Ue){const i=Ae.xr.getFrame(),e=Ae.xr.getReferenceSpace();if(i&&e){for(const t of Ue.inputSources)if(t.handedness==="right"&&t.gripSpace){const n=i.getPose(t.gripSpace,e);if(n){const s=new b().setFromMatrixPosition(new _e().fromArray(n.transform.matrix));wo(U.position.clone()),U.position.y>=s.y?(Nr(U.position.y+.1),console.log("上昇開始 - 現在位置:",ir.y.toFixed(3),"目標高さ:",To.toFixed(3),"(コントローラーより高いため10cm上昇)")):(Nr(s.y),console.log("上昇開始 - 現在位置:",ir.y.toFixed(3),"目標高さ:",To.toFixed(3),"(コントローラーの高さまで)"));break}}ir===null&&(console.log("右コントローラーが見つからないため上昇を中止"),Ur(null))}}}function _E(){if(Es===null||!U||!wt)return;const i=Date.now()-Es,t=Math.min(i/2e3,1);if(Wi(1-t),console.log("減速中 - progress:",t.toFixed(2),"propellerSpeed:",Lo.toFixed(2)),Xe&&Xe.isPlaying){const n=Math.pow(.3/Xn,.5),s=Math.max(.2,Math.min(2.7,n)),r=Math.max(s/2,.2),o=s-(s-r)*t;Xe.setPlaybackRate(o),Dr||Xe.setVolume(.7*(1-t))}t>=1&&(Tu(null),bu(null),Pm(!1),Wi(0),Ao(!0),Xe&&Xe.isPlaying&&Xe.stop(),console.log("終了シーケンス完了"),Le("ドローン停止 - Xボタンで再起動"),Au())}function xE(){if(!Ue||!U||!wt||!un&&xs===null&&sr===null||ei||ti||Uo||Ps||qi)return;const i=Ue.inputSources;let e=0,t=0,n=0,s=0,r=0,o=0;if(xs!==null&&ir!==null&&To!==null){const g=U.userData.basePosition?U.userData.basePosition.y:U.position.y;let _=!1;if(Bi&&(au===null?(pa(g),ma(Date.now())):Math.abs(g-au)<.005?Date.now()-Np>500&&(_=!0,console.log("上昇中にスタック検出 - 0.5秒間動いていない")):(pa(g),ma(Date.now()))),_)Ur(null),wo(null),Nr(null),pa(null),ma(null),bo(!0),Eo(!1),Wi(1),U.userData.basePosition&&(U.userData.basePosition=U.position.clone()),xu(0),console.log("上昇中に衝突検出 - その場で起動完了"),Le("Collision Detected - Ready"),Au();else{const m=To-g;Math.abs(m)>.02?t=Math.min(Math.max(m*2,.3),1):(Ur(null),wo(null),Nr(null),pa(null),ma(null),bo(!0),Eo(!1),Wi(1),U.userData.basePosition&&(U.userData.basePosition=U.position.clone()),xu(0),console.log("起動シーケンス完了 - 最終高さ:",U.position.y),Le("Drone Ready"),Au())}}if(sr!==null&&Es===null){const _=U.userData.basePosition?U.userData.basePosition.y:U.position.y;let m=!1;if(Bi&&(lu===null?(ga(_),_a(Date.now())):Math.abs(_-lu)<.005?Date.now()-Fp>500&&(m=!0,console.log("降下中にスタック検出 - 0.5秒間動いていない")):(ga(_),_a(Date.now()))),m)Mu(null),ga(null),_a(null),Tu(Date.now()),bu(_),U.userData.basePosition&&U.userData.basePosition.copy(U.position),gt.set(0,0,0),console.log("降下中に衝突検出 - その高さで減速シーケンス開始, 着地高さ:",ro.toFixed(3)),Le("Collision Detected - Landing...");else{const f=_-0;Wi(1),f>.02?t=-Math.min(Math.max(f*2,.3),1):(Mu(null),ga(null),_a(null),Tu(Date.now()),bu(0),console.log("着地完了 - プロペラ減速開始"),Le("Landing..."))}}const a=xl;for(const g of i)if(g.gamepad){const m=g.gamepad.axes;xs===null&&sr===null&&Es===null&&(g.handedness==="right"&&m.length>=4&&(Math.abs(m[2])>a&&(e=m[2],r=m[2]),Math.abs(m[3])>a&&(t=-m[3])),g.handedness==="left"&&m.length>=4&&(Math.abs(m[2])>a&&(s=-m[2]),Math.abs(m[3])>a&&(n=m[3],o=m[3])))}gt.y+=t*fo;const l=new He;l.setFromAxisAngle(new b(0,1,0),U.rotation.y);const c=new b(0,0,-1);c.applyQuaternion(l),c.y=0,c.normalize(),c.multiplyScalar(n*fo),gt.add(c);const u=new b(-1,0,0);u.applyQuaternion(l),u.y=0,u.normalize(),u.multiplyScalar(e*fo),gt.add(u),gt.length()>Fa&&gt.normalize().multiplyScalar(Fa),gt.multiplyScalar(id),U.userData.basePosition||(U.userData.basePosition=U.position.clone()),Es!==null?(gt.set(0,0,0),ro!==null?(U.position.y=ro,U.userData.basePosition&&(U.userData.basePosition.y=ro)):(U.position.y=0,U.userData.basePosition&&(U.userData.basePosition.y=0))):xs!==null||sr!==null?(U.position.add(gt),U.userData.basePosition.copy(U.position)):U.userData.basePosition.add(gt);let d=pu;d+=s*qp,d=Math.max(-Oa,Math.min(Oa,d)),d*=Yp,No(d),U.rotation.y+=pu;const h=-o*Ba,p=r*Ba;U.userData.physicsTilt||(U.userData.physicsTilt={x:0,z:0}),U.userData.physicsTilt.x+=(h-U.userData.physicsTilt.x)*Zh,U.userData.physicsTilt.z+=(p-U.userData.physicsTilt.z)*Zh,Bi&&Hb()}function yE(){Me.aspect=window.innerWidth/window.innerHeight,Me.updateProjectionMatrix(),Ae.setSize(window.innerWidth,window.innerHeight)}async function vE(){if(!navigator.xr){Le("WebXRがサポートされていません"),alert("このデバイスはWebXRをサポートしていません");return}try{if(Le("MRセッションを開始中..."),!await navigator.xr.isSessionSupported("immersive-ar")){Le("immersive-ARがサポートされていません"),alert("このデバイスはAR機能をサポートしていません");return}const e=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:[],optionalFeatures:["local-floor","bounded-floor","depth-sensing","plane-detection","hand-tracking"],depthSensing:{usagePreference:["cpu-optimized","gpu-optimized"],dataFormatPreference:["luminance-alpha","float32"]}});ka(e),of(!0),await Ae.xr.setSession(e),qb();const t=Ae.xr.getController(0),n=Ae.xr.getController(1);J.add(t),J.add(n);const s=Ae.xr.getHand(0),r=Ae.xr.getHand(1);J.add(s),J.add(r),Um(s),Nm(r),rd(!1),bo(!1),Eo(!1),Wi(0),Ur(null),wo(null),Nr(null),tn.set(0,0,0),mn.set(0,0,0),Io.set(0,0,0),Xe&&Xe.isPlaying&&(Xe.stop(),console.log("ドローン音声停止"));const o=document.getElementById("start-button");o&&(o.style.display="none");const a=document.getElementById("vr-button");a&&(a.style.display="none"),window.dispatchEvent(new Event("xr-session-start")),Le("MRセッション開始");const l=localStorage.getItem("tutorialCompleted");localStorage.getItem("restartTutorial")==="true"?(localStorage.removeItem("restartTutorial"),localStorage.removeItem("tutorialCompleted"),Yi(1),nl()):l==="true"?Yi(0):nl(),e.depthUsage?(console.log("深度センサー有効:",e.depthUsage),Le("MRセッション開始 (深度センサー有効)")):(console.log("深度センサー無効"),Le("MRセッション開始 (深度センサー無効)")),e.addEventListener("end",()=>{ka(null),of(!1),ld(null),ad(!1),Za(!1),Ka(null),$a(null),Yb(),Xe&&Xe.isPlaying&&(Xe.stop(),console.log("ドローン音声停止")),ws&&(J.remove(ws),Lm(null)),Dm(null),_n.clear(),window.dispatchEvent(new Event("xr-session-end")),Le("MRセッション終了"),o&&(o.style.display="block"),a&&(a.style.display="block")})}catch(i){console.error("XRセッション開始エラー:",i),Le("エラー: "+(i.message||i.name||"Unknown error")),alert("MRセッションを開始できませんでした: "+(i.message||i.name||"Unknown error"))}}async function SE(){if(!navigator.xr){Le("WebXRがサポートされていません"),alert("このデバイスはWebXRをサポートしていません");return}try{if(Le("VRセッションを開始中..."),!await navigator.xr.isSessionSupported("immersive-vr")){Le("immersive-VRがサポートされていません"),alert("このデバイスはVR機能をサポートしていません");return}const e=await navigator.xr.requestSession("immersive-vr",{requiredFeatures:[],optionalFeatures:["local-floor","bounded-floor","hand-tracking"]});ka(e),await Ae.xr.setSession(e),jb();const t=Ae.xr.getController(0),n=Ae.xr.getController(1);J.add(t),J.add(n);const s=new iT,r=Ae.xr.getControllerGrip(0),o=Ae.xr.getControllerGrip(1);r.add(s.createControllerModel(r)),o.add(s.createControllerModel(o)),J.add(r),J.add(o);const a=Ae.xr.getHand(0),l=Ae.xr.getHand(1);J.add(a),J.add(l),Um(a),Nm(l),rd(!1),bo(!1),Eo(!1),Wi(0),Ur(null),wo(null),Nr(null),tn.set(0,0,0),mn.set(0,0,0),Io.set(0,0,0),Xe&&Xe.isPlaying&&(Xe.stop(),console.log("ドローン音声停止"));const c=document.getElementById("start-button");c&&(c.style.display="none");const u=document.getElementById("vr-button");u&&(u.style.display="none"),window.dispatchEvent(new Event("xr-session-start")),Le("VRセッション開始");const d=localStorage.getItem("tutorialCompleted");localStorage.getItem("restartTutorial")==="true"?(localStorage.removeItem("restartTutorial"),localStorage.removeItem("tutorialCompleted"),Yi(1),nl()):d==="true"?Yi(0):nl(),e.addEventListener("end",()=>{ka(null),ld(null),ad(!1),Za(!1),Ka(null),$a(null),$b(),Xe&&Xe.isPlaying&&(Xe.stop(),console.log("ドローン音声停止")),window.dispatchEvent(new Event("xr-session-end")),Le("VRセッション終了"),c&&(c.style.display="block"),u&&(u.style.display="block")})}catch(i){console.error("VRセッション開始エラー:",i),Le("エラー: "+(i.message||i.name||"Unknown error")),alert("VRセッションを開始できませんでした: "+(i.message||i.name||"Unknown error"))}}hE();const ff=document.getElementById("start-button");ff&&ff.addEventListener("click",vE);const pf=document.getElementById("vr-button");pf&&pf.addEventListener("click",SE);const Zs=document.getElementById("depth-toggle");Zs&&(Zs.addEventListener("click",()=>{Jh(!fr),Zs.textContent=fr?"深度表示 ON":"深度表示 OFF",console.log("深度表示:",fr)}),window.addEventListener("xr-session-start",()=>{Zs.style.display="block"}),window.addEventListener("xr-session-end",()=>{Zs.style.display="none",Jh(!1),Zs.textContent="深度表示 OFF"}));
