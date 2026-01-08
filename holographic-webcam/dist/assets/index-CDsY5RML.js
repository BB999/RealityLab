(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qo="160",Uu=0,La=1,Nu=2,Sl=1,Ou=2,Gn=3,Vn=0,en=1,vn=2,ti=0,Ji=1,Pa=2,Ia=3,Da=4,Fu=5,_i=100,Bu=101,Hu=102,Ua=103,Na=104,Gu=200,zu=201,ku=202,Vu=203,Do=204,Uo=205,Wu=206,Xu=207,ju=208,qu=209,Yu=210,Ku=211,Zu=212,$u=213,Ju=214,Qu=0,eh=1,th=2,ws=3,nh=4,ih=5,rh=6,sh=7,Yo=0,oh=1,ah=2,ni=0,ch=1,lh=2,uh=3,hh=4,fh=5,dh=6,Oa="attached",ph="detached",El=300,ir=301,rr=302,No=303,Oo=304,Ns=306,sr=1e3,un=1001,Rs=1002,Ft=1003,Fo=1004,Es=1005,Qt=1006,Tl=1007,bi=1008,ii=1009,mh=1010,gh=1011,Ko=1012,Al=1013,Qn=1014,zn=1015,Or=1016,bl=1017,wl=1018,Ei=1020,_h=1021,hn=1023,vh=1024,xh=1025,Ti=1026,or=1027,yh=1028,Rl=1029,Mh=1030,Cl=1031,Ll=1033,qs=33776,Ys=33777,Ks=33778,Zs=33779,Fa=35840,Ba=35841,Ha=35842,Ga=35843,Pl=36196,za=37492,ka=37496,Va=37808,Wa=37809,Xa=37810,ja=37811,qa=37812,Ya=37813,Ka=37814,Za=37815,$a=37816,Ja=37817,Qa=37818,ec=37819,tc=37820,nc=37821,$s=36492,ic=36494,rc=36495,Sh=36283,sc=36284,oc=36285,ac=36286,Fr=2300,ar=2301,Js=2302,cc=2400,lc=2401,uc=2402,Eh=2500,Th=0,Il=1,Bo=2,Dl=3e3,Ai=3001,Ah=3200,bh=3201,Zo=0,wh=1,fn="",wt="srgb",Ht="srgb-linear",$o="display-p3",Os="display-p3-linear",Cs="linear",Et="srgb",Ls="rec709",Ps="p3",Di=7680,hc=519,Rh=512,Ch=513,Lh=514,Ul=515,Ph=516,Ih=517,Dh=518,Uh=519,Ho=35044,fc="300 es",Go=1035,kn=2e3,Is=2001;class fr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let dc=1234567;const Qi=Math.PI/180,cr=180/Math.PI;function xn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[r&255]+Vt[r>>8&255]+Vt[r>>16&255]+Vt[r>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function Xt(r,e,t){return Math.max(e,Math.min(t,r))}function Jo(r,e){return(r%e+e)%e}function Nh(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Oh(r,e,t){return r!==e?(t-r)/(e-r):0}function Ir(r,e,t){return(1-t)*r+t*e}function Fh(r,e,t,n){return Ir(r,e,1-Math.exp(-t*n))}function Bh(r,e=1){return e-Math.abs(Jo(r,e*2)-e)}function Hh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Gh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function zh(r,e){return r+Math.floor(Math.random()*(e-r+1))}function kh(r,e){return r+Math.random()*(e-r)}function Vh(r){return r*(.5-Math.random())}function Wh(r){r!==void 0&&(dc=r);let e=dc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Xh(r){return r*Qi}function jh(r){return r*cr}function zo(r){return(r&r-1)===0&&r!==0}function qh(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Ds(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Yh(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),u=s((e+n)/2),h=o((e+n)/2),f=s((e-n)/2),d=o((e-n)/2),_=s((n-e)/2),x=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*f,l*d,a*u);break;case"YZY":r.set(l*d,a*h,l*f,a*u);break;case"ZXZ":r.set(l*f,l*d,a*h,a*u);break;case"XZX":r.set(a*h,l*x,l*_,a*u);break;case"YXY":r.set(l*_,a*h,l*x,a*u);break;case"ZYZ":r.set(l*x,l*_,a*h,a*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function An(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function mt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Kh={DEG2RAD:Qi,RAD2DEG:cr,generateUUID:xn,clamp:Xt,euclideanModulo:Jo,mapLinear:Nh,inverseLerp:Oh,lerp:Ir,damp:Fh,pingpong:Bh,smoothstep:Hh,smootherstep:Gh,randInt:zh,randFloat:kh,randFloatSpread:Vh,seededRandom:Wh,degToRad:Xh,radToDeg:jh,isPowerOfTwo:zo,ceilPowerOfTwo:qh,floorPowerOfTwo:Ds,setQuaternionFromProperEuler:Yh,normalize:mt,denormalize:An};class it{constructor(e=0,t=0){it.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e,t,n,i,s,o,a,l,u){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,u)}set(e,t,n,i,s,o,a,l,u){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],u=n[1],h=n[4],f=n[7],d=n[2],_=n[5],x=n[8],M=i[0],g=i[3],p=i[6],R=i[1],T=i[4],C=i[7],B=i[2],D=i[5],P=i[8];return s[0]=o*M+a*R+l*B,s[3]=o*g+a*T+l*D,s[6]=o*p+a*C+l*P,s[1]=u*M+h*R+f*B,s[4]=u*g+h*T+f*D,s[7]=u*p+h*C+f*P,s[2]=d*M+_*R+x*B,s[5]=d*g+_*T+x*D,s[8]=d*p+_*C+x*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],h=e[8];return t*o*h-t*a*u-n*s*h+n*a*l+i*s*u-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],h=e[8],f=h*o-a*u,d=a*l-h*s,_=u*s-o*l,x=t*f+n*d+i*_;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/x;return e[0]=f*M,e[1]=(i*u-h*n)*M,e[2]=(a*n-i*o)*M,e[3]=d*M,e[4]=(h*t-i*l)*M,e[5]=(i*s-a*t)*M,e[6]=_*M,e[7]=(n*l-u*t)*M,e[8]=(o*t-n*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(n*l,n*u,-n*(l*o+u*a)+o+e,-i*u,i*l,-i*(-u*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qs.makeScale(e,t)),this}rotate(e){return this.premultiply(Qs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qs=new et;function Nl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Br(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Zh(){const r=Br("canvas");return r.style.display="block",r}const pc={};function Dr(r){r in pc||(pc[r]=!0,console.warn(r))}const mc=new et().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),gc=new et().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),jr={[Ht]:{transfer:Cs,primaries:Ls,toReference:r=>r,fromReference:r=>r},[wt]:{transfer:Et,primaries:Ls,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Os]:{transfer:Cs,primaries:Ps,toReference:r=>r.applyMatrix3(gc),fromReference:r=>r.applyMatrix3(mc)},[$o]:{transfer:Et,primaries:Ps,toReference:r=>r.convertSRGBToLinear().applyMatrix3(gc),fromReference:r=>r.applyMatrix3(mc).convertLinearToSRGB()}},$h=new Set([Ht,Os]),ut={enabled:!0,_workingColorSpace:Ht,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!$h.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=jr[e].toReference,i=jr[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return jr[r].primaries},getTransfer:function(r){return r===fn?Cs:jr[r].transfer}};function er(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function eo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ui;class Ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ui===void 0&&(Ui=Br("canvas")),Ui.width=e.width,Ui.height=e.height;const n=Ui.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ui}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=er(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(er(t[n]/255)*255):t[n]=er(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jh=0;class Fl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=xn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(to(i[o].image)):s.push(to(i[o]))}else s=to(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function to(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ol.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qh=0;class zt extends fr{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=un,i=un,s=Qt,o=bi,a=hn,l=ii,u=zt.DEFAULT_ANISOTROPY,h=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=xn(),this.name="",this.source=new Fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ai?wt:fn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==El)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sr:e.x=e.x-Math.floor(e.x);break;case un:e.x=e.x<0?0:1;break;case Rs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sr:e.y=e.y-Math.floor(e.y);break;case un:e.y=e.y<0?0:1;break;case Rs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===wt?Ai:Dl}set encoding(e){Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ai?wt:fn}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=El;zt.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,n=0,i=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,u=l[0],h=l[4],f=l[8],d=l[1],_=l[5],x=l[9],M=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-M)<.01&&Math.abs(x-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+M)<.1&&Math.abs(x+g)<.1&&Math.abs(u+_+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(u+1)/2,C=(_+1)/2,B=(p+1)/2,D=(h+d)/4,P=(f+M)/4,ne=(x+g)/4;return T>C&&T>B?T<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(T),i=D/n,s=P/n):C>B?C<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(C),n=D/i,s=ne/i):B<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(B),n=P/s,i=ne/s),this.set(n,i,s,t),this}let R=Math.sqrt((g-x)*(g-x)+(f-M)*(f-M)+(d-h)*(d-h));return Math.abs(R)<.001&&(R=1),this.x=(g-x)/R,this.y=(f-M)/R,this.z=(d-h)/R,this.w=Math.acos((u+_+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ef extends fr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(Dr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ai?wt:fn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new zt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wi extends ef{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Bl extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tf extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class si{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],u=n[i+1],h=n[i+2],f=n[i+3];const d=s[o+0],_=s[o+1],x=s[o+2],M=s[o+3];if(a===0){e[t+0]=l,e[t+1]=u,e[t+2]=h,e[t+3]=f;return}if(a===1){e[t+0]=d,e[t+1]=_,e[t+2]=x,e[t+3]=M;return}if(f!==M||l!==d||u!==_||h!==x){let g=1-a;const p=l*d+u*_+h*x+f*M,R=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){const B=Math.sqrt(T),D=Math.atan2(B,p*R);g=Math.sin(g*D)/B,a=Math.sin(a*D)/B}const C=a*R;if(l=l*g+d*C,u=u*g+_*C,h=h*g+x*C,f=f*g+M*C,g===1-a){const B=1/Math.sqrt(l*l+u*u+h*h+f*f);l*=B,u*=B,h*=B,f*=B}}e[t]=l,e[t+1]=u,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],u=n[i+2],h=n[i+3],f=s[o],d=s[o+1],_=s[o+2],x=s[o+3];return e[t]=a*x+h*f+l*_-u*d,e[t+1]=l*x+h*d+u*f-a*_,e[t+2]=u*x+h*_+a*d-l*f,e[t+3]=h*x-a*f-l*d-u*_,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(n/2),h=a(i/2),f=a(s/2),d=l(n/2),_=l(i/2),x=l(s/2);switch(o){case"XYZ":this._x=d*h*f+u*_*x,this._y=u*_*f-d*h*x,this._z=u*h*x+d*_*f,this._w=u*h*f-d*_*x;break;case"YXZ":this._x=d*h*f+u*_*x,this._y=u*_*f-d*h*x,this._z=u*h*x-d*_*f,this._w=u*h*f+d*_*x;break;case"ZXY":this._x=d*h*f-u*_*x,this._y=u*_*f+d*h*x,this._z=u*h*x+d*_*f,this._w=u*h*f-d*_*x;break;case"ZYX":this._x=d*h*f-u*_*x,this._y=u*_*f+d*h*x,this._z=u*h*x-d*_*f,this._w=u*h*f+d*_*x;break;case"YZX":this._x=d*h*f+u*_*x,this._y=u*_*f+d*h*x,this._z=u*h*x-d*_*f,this._w=u*h*f-d*_*x;break;case"XZY":this._x=d*h*f-u*_*x,this._y=u*_*f-d*h*x,this._z=u*h*x+d*_*f,this._w=u*h*f+d*_*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],u=t[2],h=t[6],f=t[10],d=n+a+f;if(d>0){const _=.5/Math.sqrt(d+1);this._w=.25/_,this._x=(h-l)*_,this._y=(s-u)*_,this._z=(o-i)*_}else if(n>a&&n>f){const _=2*Math.sqrt(1+n-a-f);this._w=(h-l)/_,this._x=.25*_,this._y=(i+o)/_,this._z=(s+u)/_}else if(a>f){const _=2*Math.sqrt(1+a-n-f);this._w=(s-u)/_,this._x=(i+o)/_,this._y=.25*_,this._z=(l+h)/_}else{const _=2*Math.sqrt(1+f-n-a);this._w=(o-i)/_,this._x=(s+u)/_,this._y=(l+h)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,u=t._z,h=t._w;return this._x=n*h+o*a+i*u-s*l,this._y=i*h+o*l+s*a-n*u,this._z=s*h+o*u+n*l-i*a,this._w=o*h-n*a-i*l-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const _=1-t;return this._w=_*o+t*this._w,this._x=_*n+t*this._x,this._y=_*i+t*this._y,this._z=_*s+t*this._z,this.normalize(),this}const u=Math.sqrt(l),h=Math.atan2(u,a),f=Math.sin((1-t)*h)/u,d=Math.sin(t*h)/u;return this._w=o*f+this._w*d,this._x=n*f+this._x*d,this._y=i*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_c.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*i-a*n),h=2*(a*t-s*i),f=2*(s*n-o*t);return this.x=t+l*u+o*f-a*h,this.y=n+l*h+a*u-s*f,this.z=i+l*f+s*h-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const no=new G,_c=new si;class wn{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,mn):mn.fromBufferAttribute(s,o),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qr.copy(n.boundingBox)),qr.applyMatrix4(e.matrixWorld),this.union(qr)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),Yr.subVectors(this.max,Tr),Ni.subVectors(e.a,Tr),Oi.subVectors(e.b,Tr),Fi.subVectors(e.c,Tr),jn.subVectors(Oi,Ni),qn.subVectors(Fi,Oi),ui.subVectors(Ni,Fi);let t=[0,-jn.z,jn.y,0,-qn.z,qn.y,0,-ui.z,ui.y,jn.z,0,-jn.x,qn.z,0,-qn.x,ui.z,0,-ui.x,-jn.y,jn.x,0,-qn.y,qn.x,0,-ui.y,ui.x,0];return!io(t,Ni,Oi,Fi,Yr)||(t=[1,0,0,0,1,0,0,0,1],!io(t,Ni,Oi,Fi,Yr))?!1:(Kr.crossVectors(jn,qn),t=[Kr.x,Kr.y,Kr.z],io(t,Ni,Oi,Fi,Yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Dn=[new G,new G,new G,new G,new G,new G,new G,new G],mn=new G,qr=new wn,Ni=new G,Oi=new G,Fi=new G,jn=new G,qn=new G,ui=new G,Tr=new G,Yr=new G,Kr=new G,hi=new G;function io(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){hi.fromArray(r,s);const a=i.x*Math.abs(hi.x)+i.y*Math.abs(hi.y)+i.z*Math.abs(hi.z),l=e.dot(hi),u=t.dot(hi),h=n.dot(hi);if(Math.max(-Math.max(l,u,h),Math.min(l,u,h))>a)return!1}return!0}const nf=new wn,Ar=new G,ro=new G;class Rn{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);const t=Ar.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ar,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ro.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(ro)),this.expandByPoint(Ar.copy(e.center).sub(ro))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Un=new G,so=new G,Zr=new G,Yn=new G,oo=new G,$r=new G,ao=new G;class Fs{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){so.copy(e).add(t).multiplyScalar(.5),Zr.copy(t).sub(e).normalize(),Yn.copy(this.origin).sub(so);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Zr),a=Yn.dot(this.direction),l=-Yn.dot(Zr),u=Yn.lengthSq(),h=Math.abs(1-o*o);let f,d,_,x;if(h>0)if(f=o*l-a,d=o*a-l,x=s*h,f>=0)if(d>=-x)if(d<=x){const M=1/h;f*=M,d*=M,_=f*(f+o*d+2*a)+d*(o*f+d+2*l)+u}else d=s,f=Math.max(0,-(o*d+a)),_=-f*f+d*(d+2*l)+u;else d=-s,f=Math.max(0,-(o*d+a)),_=-f*f+d*(d+2*l)+u;else d<=-x?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),_=-f*f+d*(d+2*l)+u):d<=x?(f=0,d=Math.min(Math.max(-s,-l),s),_=d*(d+2*l)+u):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),_=-f*f+d*(d+2*l)+u);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),_=-f*f+d*(d+2*l)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(so).addScaledVector(Zr,d),_}intersectSphere(e,t){Un.subVectors(e.center,this.origin);const n=Un.dot(this.direction),i=Un.dot(Un)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const u=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return u>=0?(n=(e.min.x-d.x)*u,i=(e.max.x-d.x)*u):(n=(e.max.x-d.x)*u,i=(e.min.x-d.x)*u),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,n,i,s){oo.subVectors(t,e),$r.subVectors(n,e),ao.crossVectors(oo,$r);let o=this.direction.dot(ao),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yn.subVectors(this.origin,e);const l=a*this.direction.dot($r.crossVectors(Yn,$r));if(l<0)return null;const u=a*this.direction.dot(oo.cross(Yn));if(u<0||l+u>o)return null;const h=-a*Yn.dot(ao);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,i,s,o,a,l,u,h,f,d,_,x,M,g){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,u,h,f,d,_,x,M,g)}set(e,t,n,i,s,o,a,l,u,h,f,d,_,x,M,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=u,p[6]=h,p[10]=f,p[14]=d,p[3]=_,p[7]=x,p[11]=M,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Bi.setFromMatrixColumn(e,0).length(),s=1/Bi.setFromMatrixColumn(e,1).length(),o=1/Bi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),u=Math.sin(i),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*h,_=o*f,x=a*h,M=a*f;t[0]=l*h,t[4]=-l*f,t[8]=u,t[1]=_+x*u,t[5]=d-M*u,t[9]=-a*l,t[2]=M-d*u,t[6]=x+_*u,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,_=l*f,x=u*h,M=u*f;t[0]=d+M*a,t[4]=x*a-_,t[8]=o*u,t[1]=o*f,t[5]=o*h,t[9]=-a,t[2]=_*a-x,t[6]=M+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,_=l*f,x=u*h,M=u*f;t[0]=d-M*a,t[4]=-o*f,t[8]=x+_*a,t[1]=_+x*a,t[5]=o*h,t[9]=M-d*a,t[2]=-o*u,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,_=o*f,x=a*h,M=a*f;t[0]=l*h,t[4]=x*u-_,t[8]=d*u+M,t[1]=l*f,t[5]=M*u+d,t[9]=_*u-x,t[2]=-u,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,_=o*u,x=a*l,M=a*u;t[0]=l*h,t[4]=M-d*f,t[8]=x*f+_,t[1]=f,t[5]=o*h,t[9]=-a*h,t[2]=-u*h,t[6]=_*f+x,t[10]=d-M*f}else if(e.order==="XZY"){const d=o*l,_=o*u,x=a*l,M=a*u;t[0]=l*h,t[4]=-f,t[8]=u*h,t[1]=d*f+M,t[5]=o*h,t[9]=_*f-x,t[2]=x*f-_,t[6]=a*h,t[10]=M*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rf,e,sf)}lookAt(e,t,n){const i=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),Kn.crossVectors(n,nn),Kn.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),Kn.crossVectors(n,nn)),Kn.normalize(),Jr.crossVectors(nn,Kn),i[0]=Kn.x,i[4]=Jr.x,i[8]=nn.x,i[1]=Kn.y,i[5]=Jr.y,i[9]=nn.y,i[2]=Kn.z,i[6]=Jr.z,i[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],u=n[12],h=n[1],f=n[5],d=n[9],_=n[13],x=n[2],M=n[6],g=n[10],p=n[14],R=n[3],T=n[7],C=n[11],B=n[15],D=i[0],P=i[4],ne=i[8],A=i[12],y=i[1],I=i[5],W=i[9],te=i[13],N=i[2],k=i[6],F=i[10],X=i[14],Z=i[3],ee=i[7],ie=i[11],he=i[15];return s[0]=o*D+a*y+l*N+u*Z,s[4]=o*P+a*I+l*k+u*ee,s[8]=o*ne+a*W+l*F+u*ie,s[12]=o*A+a*te+l*X+u*he,s[1]=h*D+f*y+d*N+_*Z,s[5]=h*P+f*I+d*k+_*ee,s[9]=h*ne+f*W+d*F+_*ie,s[13]=h*A+f*te+d*X+_*he,s[2]=x*D+M*y+g*N+p*Z,s[6]=x*P+M*I+g*k+p*ee,s[10]=x*ne+M*W+g*F+p*ie,s[14]=x*A+M*te+g*X+p*he,s[3]=R*D+T*y+C*N+B*Z,s[7]=R*P+T*I+C*k+B*ee,s[11]=R*ne+T*W+C*F+B*ie,s[15]=R*A+T*te+C*X+B*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],h=e[2],f=e[6],d=e[10],_=e[14],x=e[3],M=e[7],g=e[11],p=e[15];return x*(+s*l*f-i*u*f-s*a*d+n*u*d+i*a*_-n*l*_)+M*(+t*l*_-t*u*d+s*o*d-i*o*_+i*u*h-s*l*h)+g*(+t*u*f-t*a*_-s*o*f+n*o*_+s*a*h-n*u*h)+p*(-i*a*h-t*l*f+t*a*d+i*o*f-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],h=e[8],f=e[9],d=e[10],_=e[11],x=e[12],M=e[13],g=e[14],p=e[15],R=f*g*u-M*d*u+M*l*_-a*g*_-f*l*p+a*d*p,T=x*d*u-h*g*u-x*l*_+o*g*_+h*l*p-o*d*p,C=h*M*u-x*f*u+x*a*_-o*M*_-h*a*p+o*f*p,B=x*f*l-h*M*l-x*a*d+o*M*d+h*a*g-o*f*g,D=t*R+n*T+i*C+s*B;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/D;return e[0]=R*P,e[1]=(M*d*s-f*g*s-M*i*_+n*g*_+f*i*p-n*d*p)*P,e[2]=(a*g*s-M*l*s+M*i*u-n*g*u-a*i*p+n*l*p)*P,e[3]=(f*l*s-a*d*s-f*i*u+n*d*u+a*i*_-n*l*_)*P,e[4]=T*P,e[5]=(h*g*s-x*d*s+x*i*_-t*g*_-h*i*p+t*d*p)*P,e[6]=(x*l*s-o*g*s-x*i*u+t*g*u+o*i*p-t*l*p)*P,e[7]=(o*d*s-h*l*s+h*i*u-t*d*u-o*i*_+t*l*_)*P,e[8]=C*P,e[9]=(x*f*s-h*M*s-x*n*_+t*M*_+h*n*p-t*f*p)*P,e[10]=(o*M*s-x*a*s+x*n*u-t*M*u-o*n*p+t*a*p)*P,e[11]=(h*a*s-o*f*s-h*n*u+t*f*u+o*n*_-t*a*_)*P,e[12]=B*P,e[13]=(h*M*i-x*f*i+x*n*d-t*M*d-h*n*g+t*f*g)*P,e[14]=(x*a*i-o*M*i-x*n*l+t*M*l+o*n*g-t*a*g)*P,e[15]=(o*f*i-h*a*i+h*n*l-t*f*l-o*n*d+t*a*d)*P,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,u=s*o,h=s*a;return this.set(u*o+n,u*a-i*l,u*l+i*a,0,u*a+i*l,h*a+n,h*l-i*o,0,u*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,u=s+s,h=o+o,f=a+a,d=s*u,_=s*h,x=s*f,M=o*h,g=o*f,p=a*f,R=l*u,T=l*h,C=l*f,B=n.x,D=n.y,P=n.z;return i[0]=(1-(M+p))*B,i[1]=(_+C)*B,i[2]=(x-T)*B,i[3]=0,i[4]=(_-C)*D,i[5]=(1-(d+p))*D,i[6]=(g+R)*D,i[7]=0,i[8]=(x+T)*P,i[9]=(g-R)*P,i[10]=(1-(d+M))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Bi.set(i[0],i[1],i[2]).length();const o=Bi.set(i[4],i[5],i[6]).length(),a=Bi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],gn.copy(this);const u=1/s,h=1/o,f=1/a;return gn.elements[0]*=u,gn.elements[1]*=u,gn.elements[2]*=u,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=f,gn.elements[9]*=f,gn.elements[10]*=f,t.setFromRotationMatrix(gn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=kn){const l=this.elements,u=2*s/(t-e),h=2*s/(n-i),f=(t+e)/(t-e),d=(n+i)/(n-i);let _,x;if(a===kn)_=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Is)_=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=kn){const l=this.elements,u=1/(t-e),h=1/(n-i),f=1/(o-s),d=(t+e)*u,_=(n+i)*h;let x,M;if(a===kn)x=(o+s)*f,M=-2*f;else if(a===Is)x=s*f,M=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-_,l[2]=0,l[6]=0,l[10]=M,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Bi=new G,gn=new tt,rf=new G(0,0,0),sf=new G(1,1,1),Kn=new G,Jr=new G,nn=new G,vc=new tt,xc=new si;class Bs{constructor(e=0,t=0,n=0,i=Bs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],u=i[5],h=i[9],f=i[2],d=i[6],_=i[10];switch(t){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,_),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,_),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,_),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,_),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,_));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return vc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xc.setFromEuler(this),this.setFromQuaternion(xc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bs.DEFAULT_ORDER="XYZ";class Hl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let of=0;const yc=new G,Hi=new si,Nn=new tt,Qr=new G,br=new G,af=new G,cf=new si,Mc=new G(1,0,0),Sc=new G(0,1,0),Ec=new G(0,0,1),lf={type:"added"},uf={type:"removed"};class bt extends fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new G,t=new Bs,n=new si,i=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tt},normalMatrix:{value:new et}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.premultiply(Hi),this}rotateX(e){return this.rotateOnAxis(Mc,e)}rotateY(e){return this.rotateOnAxis(Sc,e)}rotateZ(e){return this.rotateOnAxis(Ec,e)}translateOnAxis(e,t){return yc.copy(e).applyQuaternion(this.quaternion),this.position.add(yc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mc,e)}translateY(e){return this.translateOnAxis(Sc,e)}translateZ(e){return this.translateOnAxis(Ec,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qr.copy(e):Qr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(br,Qr,this.up):Nn.lookAt(Qr,br,this.up),this.quaternion.setFromRotationMatrix(Nn),i&&(Nn.extractRotation(i.matrixWorld),Hi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(lf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(uf)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,e,af),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,cf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,h=l.length;u<h;u++){const f=l[u];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),h=o(e.images),f=o(e.shapes),d=o(e.skeletons),_=o(e.animations),x=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),u.length>0&&(n.textures=u),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),_.length>0&&(n.animations=_),x.length>0&&(n.nodes=x)}return n.object=i,n;function o(a){const l=[];for(const u in a){const h=a[u];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}bt.DEFAULT_UP=new G(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new G,On=new G,co=new G,Fn=new G,Gi=new G,zi=new G,Tc=new G,lo=new G,uo=new G,ho=new G;let es=!1;class ln{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),_n.subVectors(e,t),i.cross(_n);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){_n.subVectors(i,t),On.subVectors(n,t),co.subVectors(e,t);const o=_n.dot(_n),a=_n.dot(On),l=_n.dot(co),u=On.dot(On),h=On.dot(co),f=o*u-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,_=(u*l-a*h)*d,x=(o*h-a*l)*d;return s.set(1-_-x,x,_)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getUV(e,t,n,i,s,o,a,l){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),this.getInterpolation(e,t,n,i,s,o,a,l)}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Fn.x),l.addScaledVector(o,Fn.y),l.addScaledVector(a,Fn.z),l)}static isFrontFacing(e,t,n,i){return _n.subVectors(n,t),On.subVectors(e,t),_n.cross(On).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),On.subVectors(this.a,this.b),_n.cross(On).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ln.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Gi.subVectors(i,n),zi.subVectors(s,n),lo.subVectors(e,n);const l=Gi.dot(lo),u=zi.dot(lo);if(l<=0&&u<=0)return t.copy(n);uo.subVectors(e,i);const h=Gi.dot(uo),f=zi.dot(uo);if(h>=0&&f<=h)return t.copy(i);const d=l*f-h*u;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Gi,o);ho.subVectors(e,s);const _=Gi.dot(ho),x=zi.dot(ho);if(x>=0&&_<=x)return t.copy(s);const M=_*u-l*x;if(M<=0&&u>=0&&x<=0)return a=u/(u-x),t.copy(n).addScaledVector(zi,a);const g=h*x-_*f;if(g<=0&&f-h>=0&&_-x>=0)return Tc.subVectors(s,i),a=(f-h)/(f-h+(_-x)),t.copy(i).addScaledVector(Tc,a);const p=1/(g+M+d);return o=M*p,a=d*p,t.copy(n).addScaledVector(Gi,o).addScaledVector(zi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Gl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},ts={h:0,s:0,l:0};function fo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ut.workingColorSpace){if(e=Jo(e,1),t=Xt(t,0,1),n=Xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=fo(o,s,e+1/3),this.g=fo(o,s,e),this.b=fo(o,s,e-1/3)}return ut.toWorkingColorSpace(this,i),this}setStyle(e,t=wt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){const n=Gl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=er(e.r),this.g=er(e.g),this.b=er(e.b),this}copyLinearToSRGB(e){return this.r=eo(e.r),this.g=eo(e.g),this.b=eo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return ut.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Xt(Wt.r*255,0,255))*65536+Math.round(Xt(Wt.g*255,0,255))*256+Math.round(Xt(Wt.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(Wt.copy(this),t);const n=Wt.r,i=Wt.g,s=Wt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,u;const h=(a+o)/2;if(a===o)l=0,u=0;else{const f=o-a;switch(u=h<=.5?f/(o+a):f/(2-o-a),o){case n:l=(i-s)/f+(i<s?6:0);break;case i:l=(s-n)/f+2;break;case s:l=(n-i)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=h,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=wt){ut.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,i=Wt.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(ts);const n=Ir(Zn.h,ts.h,t),i=Ir(Zn.s,ts.s,t),s=Ir(Zn.l,ts.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Ne;Ne.NAMES=Gl;let hf=0;class yn extends fr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=xn(),this.name="",this.type="Material",this.blending=Ji,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Do,this.blendDst=Uo,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Do&&(n.blendSrc=this.blendSrc),this.blendDst!==Uo&&(n.blendDst=this.blendDst),this.blendEquation!==_i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xi extends yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Lt=new G,ns=new it;class Zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ho,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ns.fromBufferAttribute(this,t),ns.applyMatrix3(e),this.setXY(t,ns.x,ns.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=An(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=An(t,this.array)),t}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=An(t,this.array)),t}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=An(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=An(t,this.array)),t}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array),s=mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ho&&(e.usage=this.usage),e}}class zl extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class kl extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bn extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ff=0;const an=new tt,po=new bt,ki=new G,rn=new wn,wr=new wn,Ot=new G;class Sn extends fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nl(e)?kl:zl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new et().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,n){return an.makeTranslation(e,t,n),this.applyMatrix4(an),this}scale(e,t,n){return an.makeScale(e,t,n),this.applyMatrix4(an),this}lookAt(e){return po.lookAt(e),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new bn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];wr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(rn.min,wr.min),rn.expandByPoint(Ot),Ot.addVectors(rn.max,wr.max),rn.expandByPoint(Ot)):(rn.expandByPoint(wr.min),rn.expandByPoint(wr.max))}rn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Ot.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ot));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let u=0,h=a.count;u<h;u++)Ot.fromBufferAttribute(a,u),l&&(ki.fromBufferAttribute(e,u),Ot.add(ki)),i=Math.max(i,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,u=[],h=[];for(let y=0;y<a;y++)u[y]=new G,h[y]=new G;const f=new G,d=new G,_=new G,x=new it,M=new it,g=new it,p=new G,R=new G;function T(y,I,W){f.fromArray(i,y*3),d.fromArray(i,I*3),_.fromArray(i,W*3),x.fromArray(o,y*2),M.fromArray(o,I*2),g.fromArray(o,W*2),d.sub(f),_.sub(f),M.sub(x),g.sub(x);const te=1/(M.x*g.y-g.x*M.y);isFinite(te)&&(p.copy(d).multiplyScalar(g.y).addScaledVector(_,-M.y).multiplyScalar(te),R.copy(_).multiplyScalar(M.x).addScaledVector(d,-g.x).multiplyScalar(te),u[y].add(p),u[I].add(p),u[W].add(p),h[y].add(R),h[I].add(R),h[W].add(R))}let C=this.groups;C.length===0&&(C=[{start:0,count:n.length}]);for(let y=0,I=C.length;y<I;++y){const W=C[y],te=W.start,N=W.count;for(let k=te,F=te+N;k<F;k+=3)T(n[k+0],n[k+1],n[k+2])}const B=new G,D=new G,P=new G,ne=new G;function A(y){P.fromArray(s,y*3),ne.copy(P);const I=u[y];B.copy(I),B.sub(P.multiplyScalar(P.dot(I))).normalize(),D.crossVectors(ne,I);const te=D.dot(h[y])<0?-1:1;l[y*4]=B.x,l[y*4+1]=B.y,l[y*4+2]=B.z,l[y*4+3]=te}for(let y=0,I=C.length;y<I;++y){const W=C[y],te=W.start,N=W.count;for(let k=te,F=te+N;k<F;k+=3)A(n[k+0]),A(n[k+1]),A(n[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,_=n.count;d<_;d++)n.setXYZ(d,0,0,0);const i=new G,s=new G,o=new G,a=new G,l=new G,u=new G,h=new G,f=new G;if(e)for(let d=0,_=e.count;d<_;d+=3){const x=e.getX(d+0),M=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,x),s.fromBufferAttribute(t,M),o.fromBufferAttribute(t,g),h.subVectors(o,s),f.subVectors(i,s),h.cross(f),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,M),u.fromBufferAttribute(n,g),a.add(h),l.add(h),u.add(h),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(g,u.x,u.y,u.z)}else for(let d=0,_=t.count;d<_;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),f.subVectors(i,s),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,l){const u=a.array,h=a.itemSize,f=a.normalized,d=new u.constructor(l.length*h);let _=0,x=0;for(let M=0,g=l.length;M<g;M++){a.isInterleavedBufferAttribute?_=l[M]*a.data.stride+a.offset:_=l[M]*h;for(let p=0;p<h;p++)d[x++]=u[_++]}return new Zt(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Sn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],u=e(l,n);t.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let h=0,f=u.length;h<f;h++){const d=u[h],_=e(d,n);l.push(_)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const u=n[l];e.data.attributes[l]=u.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],h=[];for(let f=0,d=u.length;f<d;f++){const _=u[f];h.push(_.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const u in i){const h=i[u];this.setAttribute(u,h.clone(t))}const s=e.morphAttributes;for(const u in s){const h=[],f=s[u];for(let d=0,_=f.length;d<_;d++)h.push(f[d].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,h=o.length;u<h;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ac=new tt,fi=new Fs,is=new Rn,bc=new G,Vi=new G,Wi=new G,Xi=new G,mo=new G,rs=new G,ss=new it,os=new it,as=new it,wc=new G,Rc=new G,Cc=new G,cs=new G,ls=new G;class Bt extends bt{constructor(e=new Sn,t=new xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){rs.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const h=a[l],f=s[l];h!==0&&(mo.fromBufferAttribute(f,e),o?rs.addScaledVector(mo,h):rs.addScaledVector(mo.sub(t),h))}t.add(rs)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),is.copy(n.boundingSphere),is.applyMatrix4(s),fi.copy(e.ray).recast(e.near),!(is.containsPoint(fi.origin)===!1&&(fi.intersectSphere(is,bc)===null||fi.origin.distanceToSquared(bc)>(e.far-e.near)**2))&&(Ac.copy(s).invert(),fi.copy(e.ray).applyMatrix4(Ac),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,d=s.groups,_=s.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,M=d.length;x<M;x++){const g=d[x],p=o[g.materialIndex],R=Math.max(g.start,_.start),T=Math.min(a.count,Math.min(g.start+g.count,_.start+_.count));for(let C=R,B=T;C<B;C+=3){const D=a.getX(C),P=a.getX(C+1),ne=a.getX(C+2);i=us(this,p,e,n,u,h,f,D,P,ne),i&&(i.faceIndex=Math.floor(C/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const x=Math.max(0,_.start),M=Math.min(a.count,_.start+_.count);for(let g=x,p=M;g<p;g+=3){const R=a.getX(g),T=a.getX(g+1),C=a.getX(g+2);i=us(this,o,e,n,u,h,f,R,T,C),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,M=d.length;x<M;x++){const g=d[x],p=o[g.materialIndex],R=Math.max(g.start,_.start),T=Math.min(l.count,Math.min(g.start+g.count,_.start+_.count));for(let C=R,B=T;C<B;C+=3){const D=C,P=C+1,ne=C+2;i=us(this,p,e,n,u,h,f,D,P,ne),i&&(i.faceIndex=Math.floor(C/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const x=Math.max(0,_.start),M=Math.min(l.count,_.start+_.count);for(let g=x,p=M;g<p;g+=3){const R=g,T=g+1,C=g+2;i=us(this,o,e,n,u,h,f,R,T,C),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function df(r,e,t,n,i,s,o,a){let l;if(e.side===en?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Vn,a),l===null)return null;ls.copy(a),ls.applyMatrix4(r.matrixWorld);const u=t.ray.origin.distanceTo(ls);return u<t.near||u>t.far?null:{distance:u,point:ls.clone(),object:r}}function us(r,e,t,n,i,s,o,a,l,u){r.getVertexPosition(a,Vi),r.getVertexPosition(l,Wi),r.getVertexPosition(u,Xi);const h=df(r,e,t,n,Vi,Wi,Xi,cs);if(h){i&&(ss.fromBufferAttribute(i,a),os.fromBufferAttribute(i,l),as.fromBufferAttribute(i,u),h.uv=ln.getInterpolation(cs,Vi,Wi,Xi,ss,os,as,new it)),s&&(ss.fromBufferAttribute(s,a),os.fromBufferAttribute(s,l),as.fromBufferAttribute(s,u),h.uv1=ln.getInterpolation(cs,Vi,Wi,Xi,ss,os,as,new it),h.uv2=h.uv1),o&&(wc.fromBufferAttribute(o,a),Rc.fromBufferAttribute(o,l),Cc.fromBufferAttribute(o,u),h.normal=ln.getInterpolation(cs,Vi,Wi,Xi,wc,Rc,Cc,new G),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c:u,normal:new G,materialIndex:0};ln.getNormal(Vi,Wi,Xi,f.normal),h.face=f}return h}class dr extends Sn{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],h=[],f=[];let d=0,_=0;x("z","y","x",-1,-1,n,t,e,o,s,0),x("z","y","x",1,-1,n,t,-e,o,s,1),x("x","z","y",1,1,e,n,t,i,o,2),x("x","z","y",1,-1,e,n,-t,i,o,3),x("x","y","z",1,-1,e,t,n,i,s,4),x("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new bn(u,3)),this.setAttribute("normal",new bn(h,3)),this.setAttribute("uv",new bn(f,2));function x(M,g,p,R,T,C,B,D,P,ne,A){const y=C/P,I=B/ne,W=C/2,te=B/2,N=D/2,k=P+1,F=ne+1;let X=0,Z=0;const ee=new G;for(let ie=0;ie<F;ie++){const he=ie*I-te;for(let ae=0;ae<k;ae++){const J=ae*y-W;ee[M]=J*R,ee[g]=he*T,ee[p]=N,u.push(ee.x,ee.y,ee.z),ee[M]=0,ee[g]=0,ee[p]=D>0?1:-1,h.push(ee.x,ee.y,ee.z),f.push(ae/P),f.push(1-ie/ne),X+=1}}for(let ie=0;ie<ne;ie++)for(let he=0;he<P;he++){const ae=d+he+k*ie,J=d+he+k*(ie+1),re=d+(he+1)+k*(ie+1),_e=d+(he+1)+k*ie;l.push(ae,J,_e),l.push(J,re,_e),Z+=6}a.addGroup(_,Z,A),_+=Z,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function lr(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Yt(r){const e={};for(let t=0;t<r.length;t++){const n=lr(r[t]);for(const i in n)e[i]=n[i]}return e}function pf(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Vl(r){return r.getRenderTarget()===null?r.outputColorSpace:ut.workingColorSpace}const mf={clone:lr,merge:Yt};var gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_f=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ri extends yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gf,this.fragmentShader=_f,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lr(e.uniforms),this.uniformsGroups=pf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Wl extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=kn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Kt extends Wl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=cr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cr*2*Math.atan(Math.tan(Qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Qi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/u,i*=o.width/l,n*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ji=-90,qi=1;class vf extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Kt(ji,qi,e,t);i.layers=this.layers,this.add(i);const s=new Kt(ji,qi,e,t);s.layers=this.layers,this.add(s);const o=new Kt(ji,qi,e,t);o.layers=this.layers,this.add(o);const a=new Kt(ji,qi,e,t);a.layers=this.layers,this.add(a);const l=new Kt(ji,qi,e,t);l.layers=this.layers,this.add(l);const u=new Kt(ji,qi,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const u of t)this.remove(u);if(e===kn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Is)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,u),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(f,d,_),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Xl extends zt{constructor(e,t,n,i,s,o,a,l,u,h){e=e!==void 0?e:[],t=t!==void 0?t:ir,super(e,t,n,i,s,o,a,l,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xf extends wi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Dr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ai?wt:fn),this.texture=new Xl(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new dr(5,5,5),s=new ri({name:"CubemapFromEquirect",uniforms:lr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:ti});s.uniforms.tEquirect.value=t;const o=new Bt(i,s),a=t.minFilter;return t.minFilter===bi&&(t.minFilter=Qt),new vf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const go=new G,yf=new G,Mf=new et;class mi{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=go.subVectors(n,t).cross(yf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(go),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mf.getNormalMatrix(e),i=this.coplanarPoint(go).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new Rn,hs=new G;class Qo{constructor(e=new mi,t=new mi,n=new mi,i=new mi,s=new mi,o=new mi){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=kn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],u=i[4],h=i[5],f=i[6],d=i[7],_=i[8],x=i[9],M=i[10],g=i[11],p=i[12],R=i[13],T=i[14],C=i[15];if(n[0].setComponents(l-s,d-u,g-_,C-p).normalize(),n[1].setComponents(l+s,d+u,g+_,C+p).normalize(),n[2].setComponents(l+o,d+h,g+x,C+R).normalize(),n[3].setComponents(l-o,d-h,g-x,C-R).normalize(),n[4].setComponents(l-a,d-f,g-M,C-T).normalize(),t===kn)n[5].setComponents(l+a,d+f,g+M,C+T).normalize();else if(t===Is)n[5].setComponents(a,f,M,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(e){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(e.matrixWorld),this.intersectsSphere(di)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(hs.x=i.normal.x>0?e.max.x:e.min.x,hs.y=i.normal.y>0?e.max.y:e.min.y,hs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(hs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jl(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Sf(r,e){const t=e.isWebGL2,n=new WeakMap;function i(u,h){const f=u.array,d=u.usage,_=f.byteLength,x=r.createBuffer();r.bindBuffer(h,x),r.bufferData(h,f,d),u.onUploadCallback();let M;if(f instanceof Float32Array)M=r.FLOAT;else if(f instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)M=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=r.UNSIGNED_SHORT;else if(f instanceof Int16Array)M=r.SHORT;else if(f instanceof Uint32Array)M=r.UNSIGNED_INT;else if(f instanceof Int32Array)M=r.INT;else if(f instanceof Int8Array)M=r.BYTE;else if(f instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:x,type:M,bytesPerElement:f.BYTES_PER_ELEMENT,version:u.version,size:_}}function s(u,h,f){const d=h.array,_=h._updateRange,x=h.updateRanges;if(r.bindBuffer(f,u),_.count===-1&&x.length===0&&r.bufferSubData(f,0,d),x.length!==0){for(let M=0,g=x.length;M<g;M++){const p=x[M];t?r.bufferSubData(f,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):r.bufferSubData(f,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}_.count!==-1&&(t?r.bufferSubData(f,_.offset*d.BYTES_PER_ELEMENT,d,_.offset,_.count):r.bufferSubData(f,_.offset*d.BYTES_PER_ELEMENT,d.subarray(_.offset,_.offset+_.count)),_.count=-1),h.onUploadCallback()}function o(u){return u.isInterleavedBufferAttribute&&(u=u.data),n.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const h=n.get(u);h&&(r.deleteBuffer(h.buffer),n.delete(u))}function l(u,h){if(u.isGLBufferAttribute){const d=n.get(u);(!d||d.version<u.version)&&n.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const f=n.get(u);if(f===void 0)n.set(u,i(u,h));else if(f.version<u.version){if(f.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,u,h),f.version=u.version}}return{get:o,remove:a,update:l}}class oi extends Sn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),u=a+1,h=l+1,f=e/a,d=t/l,_=[],x=[],M=[],g=[];for(let p=0;p<h;p++){const R=p*d-o;for(let T=0;T<u;T++){const C=T*f-s;x.push(C,-R,0),M.push(0,0,1),g.push(T/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let R=0;R<a;R++){const T=R+u*p,C=R+u*(p+1),B=R+1+u*(p+1),D=R+1+u*p;_.push(T,C,D),_.push(C,B,D)}this.setIndex(_),this.setAttribute("position",new bn(x,3)),this.setAttribute("normal",new bn(M,3)),this.setAttribute("uv",new bn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ef=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tf=`#ifdef USE_ALPHAHASH
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
#endif`,Af=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Rf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cf=`#ifdef USE_AOMAP
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
#endif`,Lf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,If=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Of=`#ifdef USE_IRIDESCENCE
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
#endif`,Ff=`#ifdef USE_BUMPMAP
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
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,jf=`#define PI 3.141592653589793
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
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,qf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yf=`vec3 transformedNormal = objectNormal;
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
#endif`,Kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$f=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qf="gl_FragColor = linearToOutputTexel( gl_FragColor );",ed=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,td=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,id=`#ifdef USE_ENVMAP
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
#endif`,rd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
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
#endif`,od=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ad=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ld=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ud=`#ifdef USE_GRADIENTMAP
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
}`,hd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,fd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,md=`uniform bool receiveShadow;
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
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
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
#endif`,gd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
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
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
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
#endif`,_d=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Md=`PhysicalMaterial material;
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
#endif`,Sd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
}`,Ed=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,Td=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ad=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Cd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Id=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dd=`#if defined( USE_POINTS_UV )
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
#endif`,Ud=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Od=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Bd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Hd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Gd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,kd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xd=`#ifdef USE_NORMALMAP
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
#endif`,jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$d=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
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
}`,Jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ep=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return shadow;
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
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
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,op=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ap=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
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
#endif`,up=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hp=`#ifdef USE_SKINNING
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
#endif`,fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mp=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gp=`#ifdef USE_TRANSMISSION
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
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_p=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ep=`uniform sampler2D t2D;
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
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rp=`#include <common>
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
}`,Cp=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
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
	#endif
}`,Lp=`#define DISTANCE
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
}`,Pp=`#define DISTANCE
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Op=`#include <common>
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
}`,Fp=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Bp=`#define LAMBERT
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
}`,Hp=`#define LAMBERT
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Gp=`#define MATCAP
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
}`,zp=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,kp=`#define NORMAL
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
}`,Vp=`#define NORMAL
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
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wp=`#define PHONG
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
}`,Xp=`#define PHONG
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,jp=`#define STANDARD
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
}`,qp=`#define STANDARD
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Yp=`#define TOON
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
}`,Kp=`#define TOON
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Zp=`uniform float size;
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
}`,$p=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,Qp=`uniform vec3 color;
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
}`,em=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,tm=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Qe={alphahash_fragment:Ef,alphahash_pars_fragment:Tf,alphamap_fragment:Af,alphamap_pars_fragment:bf,alphatest_fragment:wf,alphatest_pars_fragment:Rf,aomap_fragment:Cf,aomap_pars_fragment:Lf,batching_pars_vertex:Pf,batching_vertex:If,begin_vertex:Df,beginnormal_vertex:Uf,bsdfs:Nf,iridescence_fragment:Of,bumpmap_pars_fragment:Ff,clipping_planes_fragment:Bf,clipping_planes_pars_fragment:Hf,clipping_planes_pars_vertex:Gf,clipping_planes_vertex:zf,color_fragment:kf,color_pars_fragment:Vf,color_pars_vertex:Wf,color_vertex:Xf,common:jf,cube_uv_reflection_fragment:qf,defaultnormal_vertex:Yf,displacementmap_pars_vertex:Kf,displacementmap_vertex:Zf,emissivemap_fragment:$f,emissivemap_pars_fragment:Jf,colorspace_fragment:Qf,colorspace_pars_fragment:ed,envmap_fragment:td,envmap_common_pars_fragment:nd,envmap_pars_fragment:id,envmap_pars_vertex:rd,envmap_physical_pars_fragment:gd,envmap_vertex:sd,fog_vertex:od,fog_pars_vertex:ad,fog_fragment:cd,fog_pars_fragment:ld,gradientmap_pars_fragment:ud,lightmap_fragment:hd,lightmap_pars_fragment:fd,lights_lambert_fragment:dd,lights_lambert_pars_fragment:pd,lights_pars_begin:md,lights_toon_fragment:_d,lights_toon_pars_fragment:vd,lights_phong_fragment:xd,lights_phong_pars_fragment:yd,lights_physical_fragment:Md,lights_physical_pars_fragment:Sd,lights_fragment_begin:Ed,lights_fragment_maps:Td,lights_fragment_end:Ad,logdepthbuf_fragment:bd,logdepthbuf_pars_fragment:wd,logdepthbuf_pars_vertex:Rd,logdepthbuf_vertex:Cd,map_fragment:Ld,map_pars_fragment:Pd,map_particle_fragment:Id,map_particle_pars_fragment:Dd,metalnessmap_fragment:Ud,metalnessmap_pars_fragment:Nd,morphcolor_vertex:Od,morphnormal_vertex:Fd,morphtarget_pars_vertex:Bd,morphtarget_vertex:Hd,normal_fragment_begin:Gd,normal_fragment_maps:zd,normal_pars_fragment:kd,normal_pars_vertex:Vd,normal_vertex:Wd,normalmap_pars_fragment:Xd,clearcoat_normal_fragment_begin:jd,clearcoat_normal_fragment_maps:qd,clearcoat_pars_fragment:Yd,iridescence_pars_fragment:Kd,opaque_fragment:Zd,packing:$d,premultiplied_alpha_fragment:Jd,project_vertex:Qd,dithering_fragment:ep,dithering_pars_fragment:tp,roughnessmap_fragment:np,roughnessmap_pars_fragment:ip,shadowmap_pars_fragment:rp,shadowmap_pars_vertex:sp,shadowmap_vertex:op,shadowmask_pars_fragment:ap,skinbase_vertex:cp,skinning_pars_vertex:lp,skinning_vertex:up,skinnormal_vertex:hp,specularmap_fragment:fp,specularmap_pars_fragment:dp,tonemapping_fragment:pp,tonemapping_pars_fragment:mp,transmission_fragment:gp,transmission_pars_fragment:_p,uv_pars_fragment:vp,uv_pars_vertex:xp,uv_vertex:yp,worldpos_vertex:Mp,background_vert:Sp,background_frag:Ep,backgroundCube_vert:Tp,backgroundCube_frag:Ap,cube_vert:bp,cube_frag:wp,depth_vert:Rp,depth_frag:Cp,distanceRGBA_vert:Lp,distanceRGBA_frag:Pp,equirect_vert:Ip,equirect_frag:Dp,linedashed_vert:Up,linedashed_frag:Np,meshbasic_vert:Op,meshbasic_frag:Fp,meshlambert_vert:Bp,meshlambert_frag:Hp,meshmatcap_vert:Gp,meshmatcap_frag:zp,meshnormal_vert:kp,meshnormal_frag:Vp,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:jp,meshphysical_frag:qp,meshtoon_vert:Yp,meshtoon_frag:Kp,points_vert:Zp,points_frag:$p,shadow_vert:Jp,shadow_frag:Qp,sprite_vert:em,sprite_frag:tm},me={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Tn={basic:{uniforms:Yt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Yt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Yt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Yt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Yt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Yt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Yt([me.points,me.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Yt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Yt([me.common,me.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Yt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Yt([me.sprite,me.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:Yt([me.common,me.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:Yt([me.lights,me.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Tn.physical={uniforms:Yt([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const fs={r:0,b:0,g:0};function nm(r,e,t,n,i,s,o){const a=new Ne(0);let l=s===!0?0:1,u,h,f=null,d=0,_=null;function x(g,p){let R=!1,T=p.isScene===!0?p.background:null;T&&T.isTexture&&(T=(p.backgroundBlurriness>0?t:e).get(T)),T===null?M(a,l):T&&T.isColor&&(M(T,1),R=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||R)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),T&&(T.isCubeTexture||T.mapping===Ns)?(h===void 0&&(h=new Bt(new dr(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:lr(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(B,D,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=ut.getTransfer(T.colorSpace)!==Et,(f!==T||d!==T.version||_!==r.toneMapping)&&(h.material.needsUpdate=!0,f=T,d=T.version,_=r.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(u===void 0&&(u=new Bt(new oi(2,2),new ri({name:"BackgroundMaterial",uniforms:lr(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=T,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=ut.getTransfer(T.colorSpace)!==Et,T.matrixAutoUpdate===!0&&T.updateMatrix(),u.material.uniforms.uvTransform.value.copy(T.matrix),(f!==T||d!==T.version||_!==r.toneMapping)&&(u.material.needsUpdate=!0,f=T,d=T.version,_=r.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null))}function M(g,p){g.getRGB(fs,Vl(r)),n.buffers.color.setClear(fs.r,fs.g,fs.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(g,p=1){a.set(g),l=p,M(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,M(a,l)},render:x}}function im(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=g(null);let u=l,h=!1;function f(N,k,F,X,Z){let ee=!1;if(o){const ie=M(X,F,k);u!==ie&&(u=ie,_(u.object)),ee=p(N,X,F,Z),ee&&R(N,X,F,Z)}else{const ie=k.wireframe===!0;(u.geometry!==X.id||u.program!==F.id||u.wireframe!==ie)&&(u.geometry=X.id,u.program=F.id,u.wireframe=ie,ee=!0)}Z!==null&&t.update(Z,r.ELEMENT_ARRAY_BUFFER),(ee||h)&&(h=!1,ne(N,k,F,X),Z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function _(N){return n.isWebGL2?r.bindVertexArray(N):s.bindVertexArrayOES(N)}function x(N){return n.isWebGL2?r.deleteVertexArray(N):s.deleteVertexArrayOES(N)}function M(N,k,F){const X=F.wireframe===!0;let Z=a[N.id];Z===void 0&&(Z={},a[N.id]=Z);let ee=Z[k.id];ee===void 0&&(ee={},Z[k.id]=ee);let ie=ee[X];return ie===void 0&&(ie=g(d()),ee[X]=ie),ie}function g(N){const k=[],F=[],X=[];for(let Z=0;Z<i;Z++)k[Z]=0,F[Z]=0,X[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:F,attributeDivisors:X,object:N,attributes:{},index:null}}function p(N,k,F,X){const Z=u.attributes,ee=k.attributes;let ie=0;const he=F.getAttributes();for(const ae in he)if(he[ae].location>=0){const re=Z[ae];let _e=ee[ae];if(_e===void 0&&(ae==="instanceMatrix"&&N.instanceMatrix&&(_e=N.instanceMatrix),ae==="instanceColor"&&N.instanceColor&&(_e=N.instanceColor)),re===void 0||re.attribute!==_e||_e&&re.data!==_e.data)return!0;ie++}return u.attributesNum!==ie||u.index!==X}function R(N,k,F,X){const Z={},ee=k.attributes;let ie=0;const he=F.getAttributes();for(const ae in he)if(he[ae].location>=0){let re=ee[ae];re===void 0&&(ae==="instanceMatrix"&&N.instanceMatrix&&(re=N.instanceMatrix),ae==="instanceColor"&&N.instanceColor&&(re=N.instanceColor));const _e={};_e.attribute=re,re&&re.data&&(_e.data=re.data),Z[ae]=_e,ie++}u.attributes=Z,u.attributesNum=ie,u.index=X}function T(){const N=u.newAttributes;for(let k=0,F=N.length;k<F;k++)N[k]=0}function C(N){B(N,0)}function B(N,k){const F=u.newAttributes,X=u.enabledAttributes,Z=u.attributeDivisors;F[N]=1,X[N]===0&&(r.enableVertexAttribArray(N),X[N]=1),Z[N]!==k&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,k),Z[N]=k)}function D(){const N=u.newAttributes,k=u.enabledAttributes;for(let F=0,X=k.length;F<X;F++)k[F]!==N[F]&&(r.disableVertexAttribArray(F),k[F]=0)}function P(N,k,F,X,Z,ee,ie){ie===!0?r.vertexAttribIPointer(N,k,F,Z,ee):r.vertexAttribPointer(N,k,F,X,Z,ee)}function ne(N,k,F,X){if(n.isWebGL2===!1&&(N.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;T();const Z=X.attributes,ee=F.getAttributes(),ie=k.defaultAttributeValues;for(const he in ee){const ae=ee[he];if(ae.location>=0){let J=Z[he];if(J===void 0&&(he==="instanceMatrix"&&N.instanceMatrix&&(J=N.instanceMatrix),he==="instanceColor"&&N.instanceColor&&(J=N.instanceColor)),J!==void 0){const re=J.normalized,_e=J.itemSize,Ce=t.get(J);if(Ce===void 0)continue;const we=Ce.buffer,ze=Ce.type,ke=Ce.bytesPerElement,Ie=n.isWebGL2===!0&&(ze===r.INT||ze===r.UNSIGNED_INT||J.gpuType===Al);if(J.isInterleavedBufferAttribute){const rt=J.data,V=rt.stride,Tt=J.offset;if(rt.isInstancedInterleavedBuffer){for(let Le=0;Le<ae.locationSize;Le++)B(ae.location+Le,rt.meshPerAttribute);N.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Le=0;Le<ae.locationSize;Le++)C(ae.location+Le);r.bindBuffer(r.ARRAY_BUFFER,we);for(let Le=0;Le<ae.locationSize;Le++)P(ae.location+Le,_e/ae.locationSize,ze,re,V*ke,(Tt+_e/ae.locationSize*Le)*ke,Ie)}else{if(J.isInstancedBufferAttribute){for(let rt=0;rt<ae.locationSize;rt++)B(ae.location+rt,J.meshPerAttribute);N.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let rt=0;rt<ae.locationSize;rt++)C(ae.location+rt);r.bindBuffer(r.ARRAY_BUFFER,we);for(let rt=0;rt<ae.locationSize;rt++)P(ae.location+rt,_e/ae.locationSize,ze,re,_e*ke,_e/ae.locationSize*rt*ke,Ie)}}else if(ie!==void 0){const re=ie[he];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(ae.location,re);break;case 3:r.vertexAttrib3fv(ae.location,re);break;case 4:r.vertexAttrib4fv(ae.location,re);break;default:r.vertexAttrib1fv(ae.location,re)}}}}D()}function A(){W();for(const N in a){const k=a[N];for(const F in k){const X=k[F];for(const Z in X)x(X[Z].object),delete X[Z];delete k[F]}delete a[N]}}function y(N){if(a[N.id]===void 0)return;const k=a[N.id];for(const F in k){const X=k[F];for(const Z in X)x(X[Z].object),delete X[Z];delete k[F]}delete a[N.id]}function I(N){for(const k in a){const F=a[k];if(F[N.id]===void 0)continue;const X=F[N.id];for(const Z in X)x(X[Z].object),delete X[Z];delete F[N.id]}}function W(){te(),h=!0,u!==l&&(u=l,_(u.object))}function te(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:W,resetDefaultState:te,dispose:A,releaseStatesOfGeometry:y,releaseStatesOfProgram:I,initAttributes:T,enableAttribute:C,disableUnusedAttributes:D}}function rm(r,e,t,n){const i=n.isWebGL2;let s;function o(h){s=h}function a(h,f){r.drawArrays(s,h,f),t.update(f,s,1)}function l(h,f,d){if(d===0)return;let _,x;if(i)_=r,x="drawArraysInstanced";else if(_=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",_===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[x](s,h,f,d),t.update(f,s,d)}function u(h,f,d){if(d===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let x=0;x<d;x++)this.render(h[x],f[x]);else{_.multiDrawArraysWEBGL(s,h,0,f,0,d);let x=0;for(let M=0;M<d;M++)x+=f[M];t.update(x,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=u}function sm(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const u=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),x=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),M=r.getParameter(r.MAX_VERTEX_ATTRIBS),g=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),R=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=d>0,C=o||e.has("OES_texture_float"),B=T&&C,D=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:u,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:_,maxCubemapSize:x,maxAttributes:M,maxVertexUniforms:g,maxVaryings:p,maxFragmentUniforms:R,vertexTextures:T,floatFragmentTextures:C,floatVertexTextures:B,maxSamples:D}}function om(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new mi,a=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const _=f.length!==0||d||n!==0||i;return i=d,n=f.length,_},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,_){const x=f.clippingPlanes,M=f.clipIntersection,g=f.clipShadows,p=r.get(f);if(!i||x===null||x.length===0||s&&!g)s?h(null):u();else{const R=s?0:n,T=R*4;let C=p.clippingState||null;l.value=C,C=h(x,d,T,_);for(let B=0;B!==T;++B)C[B]=t[B];p.clippingState=C,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=R}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,d,_,x){const M=f!==null?f.length:0;let g=null;if(M!==0){if(g=l.value,x!==!0||g===null){const p=_+M*4,R=d.matrixWorldInverse;a.getNormalMatrix(R),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,C=_;T!==M;++T,C+=4)o.copy(f[T]).applyMatrix4(R,a),o.normal.toArray(g,C),g[C+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,g}}function am(r){let e=new WeakMap;function t(o,a){return a===No?o.mapping=ir:a===Oo&&(o.mapping=rr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===No||a===Oo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new xf(l.height/2);return u.fromEquirectangularTexture(r,o),e.set(o,u),o.addEventListener("dispose",i),t(u.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ea extends Wl{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Zi=4,Lc=[.125,.215,.35,.446,.526,.582],vi=20,_o=new ea,Pc=new Ne;let vo=null,xo=0,yo=0;const gi=(1+Math.sqrt(5))/2,Yi=1/gi,Ic=[new G(1,1,1),new G(-1,1,1),new G(1,1,-1),new G(-1,1,-1),new G(0,gi,Yi),new G(0,gi,-Yi),new G(Yi,0,gi),new G(-Yi,0,gi),new G(gi,Yi,0),new G(-gi,Yi,0)];class Dc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){vo=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Oc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vo,xo,yo),e.scissorTest=!1,ds(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ir||e.mapping===rr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vo=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Or,format:hn,colorSpace:Ht,depthBuffer:!1},i=Uc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cm(s)),this._blurMaterial=lm(s,e,t)}return i}_compileMaterial(e){const t=new Bt(this._lodPlanes[0],e);this._renderer.compile(t,_o)}_sceneToCubeUV(e,t,n,i){const a=new Kt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Pc),h.toneMapping=ni,h.autoClear=!1;const _=new xi({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),x=new Bt(new dr,_);let M=!1;const g=e.background;g?g.isColor&&(_.color.copy(g),e.background=null,M=!0):(_.color.copy(Pc),M=!0);for(let p=0;p<6;p++){const R=p%3;R===0?(a.up.set(0,l[p],0),a.lookAt(u[p],0,0)):R===1?(a.up.set(0,0,l[p]),a.lookAt(0,u[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,u[p]));const T=this._cubeSize;ds(i,R*T,p>2?T:0,T,T),h.setRenderTarget(i),M&&h.render(x,a),h.render(e,a)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ir||e.mapping===rr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Oc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nc());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Bt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ds(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,_o)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Ic[(i-1)%Ic.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Bt(this._lodPlanes[i],u),d=u.uniforms,_=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*_):2*Math.PI/(2*vi-1),M=s/x,g=isFinite(s)?1+Math.floor(h*M):vi;g>vi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${vi}`);const p=[];let R=0;for(let P=0;P<vi;++P){const ne=P/M,A=Math.exp(-ne*ne/2);p.push(A),P===0?R+=A:P<g&&(R+=2*A)}for(let P=0;P<p.length;P++)p[P]=p[P]/R;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:T}=this;d.dTheta.value=x,d.mipInt.value=T-n;const C=this._sizeLods[i],B=3*C*(i>T-Zi?i-T+Zi:0),D=4*(this._cubeSize-C);ds(t,B,D,3*C,2*C),l.setRenderTarget(t),l.render(f,_o)}}function cm(r){const e=[],t=[],n=[];let i=r;const s=r-Zi+1+Lc.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Zi?l=Lc[o-r+Zi-1]:o===0&&(l=0),n.push(l);const u=1/(a-2),h=-u,f=1+u,d=[h,h,f,h,f,f,h,h,f,f,h,f],_=6,x=6,M=3,g=2,p=1,R=new Float32Array(M*x*_),T=new Float32Array(g*x*_),C=new Float32Array(p*x*_);for(let D=0;D<_;D++){const P=D%3*2/3-1,ne=D>2?0:-1,A=[P,ne,0,P+2/3,ne,0,P+2/3,ne+1,0,P,ne,0,P+2/3,ne+1,0,P,ne+1,0];R.set(A,M*x*D),T.set(d,g*x*D);const y=[D,D,D,D,D,D];C.set(y,p*x*D)}const B=new Sn;B.setAttribute("position",new Zt(R,M)),B.setAttribute("uv",new Zt(T,g)),B.setAttribute("faceIndex",new Zt(C,p)),e.push(B),i>Zi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Uc(r,e,t){const n=new wi(r,e,t);return n.texture.mapping=Ns,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ds(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function lm(r,e,t){const n=new Float32Array(vi),i=new G(0,1,0);return new ri({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ta(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Nc(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ta(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Oc(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function ta(){return`

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
	`}function um(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,u=l===No||l===Oo,h=l===ir||l===rr;if(u||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new Dc(r)),f=u?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(u&&f&&f.height>0||h&&f&&i(f)){t===null&&(t=new Dc(r));const d=u?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let l=0;const u=6;for(let h=0;h<u;h++)a[h]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function hm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function fm(r,e,t,n){const i={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);for(const x in d.morphAttributes){const M=d.morphAttributes[x];for(let g=0,p=M.length;g<p;g++)e.remove(M[g])}d.removeEventListener("dispose",o),delete i[d.id];const _=s.get(d);_&&(e.remove(_),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const x in d)e.update(d[x],r.ARRAY_BUFFER);const _=f.morphAttributes;for(const x in _){const M=_[x];for(let g=0,p=M.length;g<p;g++)e.update(M[g],r.ARRAY_BUFFER)}}function u(f){const d=[],_=f.index,x=f.attributes.position;let M=0;if(_!==null){const R=_.array;M=_.version;for(let T=0,C=R.length;T<C;T+=3){const B=R[T+0],D=R[T+1],P=R[T+2];d.push(B,D,D,P,P,B)}}else if(x!==void 0){const R=x.array;M=x.version;for(let T=0,C=R.length/3-1;T<C;T+=3){const B=T+0,D=T+1,P=T+2;d.push(B,D,D,P,P,B)}}else return;const g=new(Nl(d)?kl:zl)(d,1);g.version=M;const p=s.get(f);p&&e.remove(p),s.set(f,g)}function h(f){const d=s.get(f);if(d){const _=f.index;_!==null&&d.version<_.version&&u(f)}else u(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:h}}function dm(r,e,t,n){const i=n.isWebGL2;let s;function o(_){s=_}let a,l;function u(_){a=_.type,l=_.bytesPerElement}function h(_,x){r.drawElements(s,x,a,_*l),t.update(x,s,1)}function f(_,x,M){if(M===0)return;let g,p;if(i)g=r,p="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[p](s,x,a,_*l,M),t.update(x,s,M)}function d(_,x,M){if(M===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<M;p++)this.render(_[p]/l,x[p]);else{g.multiDrawElementsWEBGL(s,x,0,a,_,0,M);let p=0;for(let R=0;R<M;R++)p+=x[R];t.update(p,s,1)}}this.setMode=o,this.setIndex=u,this.render=h,this.renderInstances=f,this.renderMultiDraw=d}function pm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function mm(r,e){return r[0]-e[0]}function gm(r,e){return Math.abs(e[1])-Math.abs(r[1])}function _m(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new _t,a=[];for(let u=0;u<8;u++)a[u]=[u,0];function l(u,h,f){const d=u.morphTargetInfluences;if(e.isWebGL2===!0){const x=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,M=x!==void 0?x.length:0;let g=s.get(h);if(g===void 0||g.count!==M){let k=function(){te.dispose(),s.delete(h),h.removeEventListener("dispose",k)};var _=k;g!==void 0&&g.texture.dispose();const T=h.morphAttributes.position!==void 0,C=h.morphAttributes.normal!==void 0,B=h.morphAttributes.color!==void 0,D=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],ne=h.morphAttributes.color||[];let A=0;T===!0&&(A=1),C===!0&&(A=2),B===!0&&(A=3);let y=h.attributes.position.count*A,I=1;y>e.maxTextureSize&&(I=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const W=new Float32Array(y*I*4*M),te=new Bl(W,y,I,M);te.type=zn,te.needsUpdate=!0;const N=A*4;for(let F=0;F<M;F++){const X=D[F],Z=P[F],ee=ne[F],ie=y*I*4*F;for(let he=0;he<X.count;he++){const ae=he*N;T===!0&&(o.fromBufferAttribute(X,he),W[ie+ae+0]=o.x,W[ie+ae+1]=o.y,W[ie+ae+2]=o.z,W[ie+ae+3]=0),C===!0&&(o.fromBufferAttribute(Z,he),W[ie+ae+4]=o.x,W[ie+ae+5]=o.y,W[ie+ae+6]=o.z,W[ie+ae+7]=0),B===!0&&(o.fromBufferAttribute(ee,he),W[ie+ae+8]=o.x,W[ie+ae+9]=o.y,W[ie+ae+10]=o.z,W[ie+ae+11]=ee.itemSize===4?o.w:1)}}g={count:M,texture:te,size:new it(y,I)},s.set(h,g),h.addEventListener("dispose",k)}let p=0;for(let T=0;T<d.length;T++)p+=d[T];const R=h.morphTargetsRelative?1:1-p;f.getUniforms().setValue(r,"morphTargetBaseInfluence",R),f.getUniforms().setValue(r,"morphTargetInfluences",d),f.getUniforms().setValue(r,"morphTargetsTexture",g.texture,t),f.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}else{const x=d===void 0?0:d.length;let M=n[h.id];if(M===void 0||M.length!==x){M=[];for(let C=0;C<x;C++)M[C]=[C,0];n[h.id]=M}for(let C=0;C<x;C++){const B=M[C];B[0]=C,B[1]=d[C]}M.sort(gm);for(let C=0;C<8;C++)C<x&&M[C][1]?(a[C][0]=M[C][0],a[C][1]=M[C][1]):(a[C][0]=Number.MAX_SAFE_INTEGER,a[C][1]=0);a.sort(mm);const g=h.morphAttributes.position,p=h.morphAttributes.normal;let R=0;for(let C=0;C<8;C++){const B=a[C],D=B[0],P=B[1];D!==Number.MAX_SAFE_INTEGER&&P?(g&&h.getAttribute("morphTarget"+C)!==g[D]&&h.setAttribute("morphTarget"+C,g[D]),p&&h.getAttribute("morphNormal"+C)!==p[D]&&h.setAttribute("morphNormal"+C,p[D]),i[C]=P,R+=P):(g&&h.hasAttribute("morphTarget"+C)===!0&&h.deleteAttribute("morphTarget"+C),p&&h.hasAttribute("morphNormal"+C)===!0&&h.deleteAttribute("morphNormal"+C),i[C]=0)}const T=h.morphTargetsRelative?1:1-R;f.getUniforms().setValue(r,"morphTargetBaseInfluence",T),f.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function vm(r,e,t,n){let i=new WeakMap;function s(l){const u=n.render.frame,h=l.geometry,f=e.get(l,h);if(i.get(f)!==u&&(e.update(f),i.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==u&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==u&&(d.update(),i.set(d,u))}return f}function o(){i=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}class ql extends zt{constructor(e,t,n,i,s,o,a,l,u,h){if(h=h!==void 0?h:Ti,h!==Ti&&h!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ti&&(n=Qn),n===void 0&&h===or&&(n=Ei),super(null,i,s,o,a,l,h,n,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ft,this.minFilter=l!==void 0?l:Ft,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Yl=new zt,Kl=new ql(1,1);Kl.compareFunction=Ul;const Zl=new Bl,$l=new tf,Jl=new Xl,Fc=[],Bc=[],Hc=new Float32Array(16),Gc=new Float32Array(9),zc=new Float32Array(4);function pr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Fc[i];if(s===void 0&&(s=new Float32Array(i),Fc[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function It(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Dt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Hs(r,e){let t=Bc[e];t===void 0&&(t=new Int32Array(e),Bc[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function xm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ym(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2fv(this.addr,e),Dt(t,e)}}function Mm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;r.uniform3fv(this.addr,e),Dt(t,e)}}function Sm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4fv(this.addr,e),Dt(t,e)}}function Em(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;zc.set(n),r.uniformMatrix2fv(this.addr,!1,zc),Dt(t,n)}}function Tm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;Gc.set(n),r.uniformMatrix3fv(this.addr,!1,Gc),Dt(t,n)}}function Am(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;Hc.set(n),r.uniformMatrix4fv(this.addr,!1,Hc),Dt(t,n)}}function bm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function wm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2iv(this.addr,e),Dt(t,e)}}function Rm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;r.uniform3iv(this.addr,e),Dt(t,e)}}function Cm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4iv(this.addr,e),Dt(t,e)}}function Lm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Pm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2uiv(this.addr,e),Dt(t,e)}}function Im(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;r.uniform3uiv(this.addr,e),Dt(t,e)}}function Dm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4uiv(this.addr,e),Dt(t,e)}}function Um(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?Kl:Yl;t.setTexture2D(e||s,i)}function Nm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||$l,i)}function Om(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Jl,i)}function Fm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Zl,i)}function Bm(r){switch(r){case 5126:return xm;case 35664:return ym;case 35665:return Mm;case 35666:return Sm;case 35674:return Em;case 35675:return Tm;case 35676:return Am;case 5124:case 35670:return bm;case 35667:case 35671:return wm;case 35668:case 35672:return Rm;case 35669:case 35673:return Cm;case 5125:return Lm;case 36294:return Pm;case 36295:return Im;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Fm}}function Hm(r,e){r.uniform1fv(this.addr,e)}function Gm(r,e){const t=pr(e,this.size,2);r.uniform2fv(this.addr,t)}function zm(r,e){const t=pr(e,this.size,3);r.uniform3fv(this.addr,t)}function km(r,e){const t=pr(e,this.size,4);r.uniform4fv(this.addr,t)}function Vm(r,e){const t=pr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Wm(r,e){const t=pr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Xm(r,e){const t=pr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function jm(r,e){r.uniform1iv(this.addr,e)}function qm(r,e){r.uniform2iv(this.addr,e)}function Ym(r,e){r.uniform3iv(this.addr,e)}function Km(r,e){r.uniform4iv(this.addr,e)}function Zm(r,e){r.uniform1uiv(this.addr,e)}function $m(r,e){r.uniform2uiv(this.addr,e)}function Jm(r,e){r.uniform3uiv(this.addr,e)}function Qm(r,e){r.uniform4uiv(this.addr,e)}function eg(r,e,t){const n=this.cache,i=e.length,s=Hs(t,i);It(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Yl,s[o])}function tg(r,e,t){const n=this.cache,i=e.length,s=Hs(t,i);It(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||$l,s[o])}function ng(r,e,t){const n=this.cache,i=e.length,s=Hs(t,i);It(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Jl,s[o])}function ig(r,e,t){const n=this.cache,i=e.length,s=Hs(t,i);It(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Zl,s[o])}function rg(r){switch(r){case 5126:return Hm;case 35664:return Gm;case 35665:return zm;case 35666:return km;case 35674:return Vm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return jm;case 35667:case 35671:return qm;case 35668:case 35672:return Ym;case 35669:case 35673:return Km;case 5125:return Zm;case 36294:return $m;case 36295:return Jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return eg;case 35679:case 36299:case 36307:return tg;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ig}}class sg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bm(t.type)}}class og{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rg(t.type)}}class ag{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Mo=/(\w+)(\])?(\[|\.)?/g;function kc(r,e){r.seq.push(e),r.map[e.id]=e}function cg(r,e,t){const n=r.name,i=n.length;for(Mo.lastIndex=0;;){const s=Mo.exec(n),o=Mo.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===i){kc(t,u===void 0?new sg(a,r,e):new og(a,r,e));break}else{let f=t.map[a];f===void 0&&(f=new ag(a),kc(t,f)),t=f}}}class Ts{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);cg(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Vc(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const lg=37297;let ug=0;function hg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function fg(r){const e=ut.getPrimaries(ut.workingColorSpace),t=ut.getPrimaries(r);let n;switch(e===t?n="":e===Ps&&t===Ls?n="LinearDisplayP3ToLinearSRGB":e===Ls&&t===Ps&&(n="LinearSRGBToLinearDisplayP3"),r){case Ht:case Os:return[n,"LinearTransferOETF"];case wt:case $o:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Wc(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+hg(r.getShaderSource(e),o)}else return i}function dg(r,e){const t=fg(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function pg(r,e){let t;switch(e){case ch:t="Linear";break;case lh:t="Reinhard";break;case uh:t="OptimizedCineon";break;case hh:t="ACESFilmic";break;case dh:t="AgX";break;case fh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function mg(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter($i).join(`
`)}function gg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter($i).join(`
`)}function _g(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vg(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function $i(r){return r!==""}function Xc(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jc(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ko(r){return r.replace(xg,Mg)}const yg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Mg(r,e){let t=Qe[e];if(t===void 0){const n=yg.get(e);if(n!==void 0)t=Qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ko(t)}const Sg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(r){return r.replace(Sg,Eg)}function Eg(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Yc(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Tg(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Sl?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Ou?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function Ag(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ir:case rr:e="ENVMAP_TYPE_CUBE";break;case Ns:e="ENVMAP_TYPE_CUBE_UV";break}return e}function bg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case rr:e="ENVMAP_MODE_REFRACTION";break}return e}function wg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Yo:e="ENVMAP_BLENDING_MULTIPLY";break;case oh:e="ENVMAP_BLENDING_MIX";break;case ah:e="ENVMAP_BLENDING_ADD";break}return e}function Rg(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Cg(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Tg(t),u=Ag(t),h=bg(t),f=wg(t),d=Rg(t),_=t.isWebGL2?"":mg(t),x=gg(t),M=_g(s),g=i.createProgram();let p,R,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter($i).join(`
`),p.length>0&&(p+=`
`),R=[_,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter($i).join(`
`),R.length>0&&(R+=`
`)):(p=[Yc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($i).join(`
`),R=[_,Yc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?Qe.tonemapping_pars_fragment:"",t.toneMapping!==ni?pg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,dg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($i).join(`
`)),o=ko(o),o=Xc(o,t),o=jc(o,t),a=ko(a),a=Xc(a,t),a=jc(a,t),o=qc(o),a=qc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,R=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===fc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+R);const C=T+p+o,B=T+R+a,D=Vc(i,i.VERTEX_SHADER,C),P=Vc(i,i.FRAGMENT_SHADER,B);i.attachShader(g,D),i.attachShader(g,P),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function ne(W){if(r.debug.checkShaderErrors){const te=i.getProgramInfoLog(g).trim(),N=i.getShaderInfoLog(D).trim(),k=i.getShaderInfoLog(P).trim();let F=!0,X=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,D,P);else{const Z=Wc(i,D,"vertex"),ee=Wc(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Program Info Log: `+te+`
`+Z+`
`+ee)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(N===""||k==="")&&(X=!1);X&&(W.diagnostics={runnable:F,programLog:te,vertexShader:{log:N,prefix:p},fragmentShader:{log:k,prefix:R}})}i.deleteShader(D),i.deleteShader(P),A=new Ts(i,g),y=vg(i,g)}let A;this.getUniforms=function(){return A===void 0&&ne(this),A};let y;this.getAttributes=function(){return y===void 0&&ne(this),y};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(g,lg)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ug++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=D,this.fragmentShader=P,this}let Lg=0;class Pg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ig(e),t.set(e,n)),n}}class Ig{constructor(e){this.id=Lg++,this.code=e,this.usedTimes=0}}function Dg(r,e,t,n,i,s,o){const a=new Hl,l=new Pg,u=[],h=i.isWebGL2,f=i.logarithmicDepthBuffer,d=i.vertexTextures;let _=i.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(A){return A===0?"uv":`uv${A}`}function g(A,y,I,W,te){const N=W.fog,k=te.geometry,F=A.isMeshStandardMaterial?W.environment:null,X=(A.isMeshStandardMaterial?t:e).get(A.envMap||F),Z=X&&X.mapping===Ns?X.image.height:null,ee=x[A.type];A.precision!==null&&(_=i.getMaxPrecision(A.precision),_!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",_,"instead."));const ie=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,he=ie!==void 0?ie.length:0;let ae=0;k.morphAttributes.position!==void 0&&(ae=1),k.morphAttributes.normal!==void 0&&(ae=2),k.morphAttributes.color!==void 0&&(ae=3);let J,re,_e,Ce;if(ee){const Ut=Tn[ee];J=Ut.vertexShader,re=Ut.fragmentShader}else J=A.vertexShader,re=A.fragmentShader,l.update(A),_e=l.getVertexShaderID(A),Ce=l.getFragmentShaderID(A);const we=r.getRenderTarget(),ze=te.isInstancedMesh===!0,ke=te.isBatchedMesh===!0,Ie=!!A.map,rt=!!A.matcap,V=!!X,Tt=!!A.aoMap,Le=!!A.lightMap,Ve=!!A.bumpMap,Se=!!A.normalMap,vt=!!A.displacementMap,je=!!A.emissiveMap,w=!!A.metalnessMap,E=!!A.roughnessMap,Y=A.anisotropy>0,ce=A.clearcoat>0,se=A.iridescence>0,ue=A.sheen>0,Ae=A.transmission>0,ge=Y&&!!A.anisotropyMap,ye=ce&&!!A.clearcoatMap,De=ce&&!!A.clearcoatNormalMap,Fe=ce&&!!A.clearcoatRoughnessMap,oe=se&&!!A.iridescenceMap,st=se&&!!A.iridescenceThicknessMap,$e=ue&&!!A.sheenColorMap,Be=ue&&!!A.sheenRoughnessMap,Re=!!A.specularMap,xe=!!A.specularColorMap,We=!!A.specularIntensityMap,at=Ae&&!!A.transmissionMap,gt=Ae&&!!A.thicknessMap,Ye=!!A.gradientMap,pe=!!A.alphaMap,O=A.alphaTest>0,de=!!A.alphaHash,le=!!A.extensions,Ue=!!k.attributes.uv1,Ee=!!k.attributes.uv2,lt=!!k.attributes.uv3;let ht=ni;return A.toneMapped&&(we===null||we.isXRRenderTarget===!0)&&(ht=r.toneMapping),{isWebGL2:h,shaderID:ee,shaderType:A.type,shaderName:A.name,vertexShader:J,fragmentShader:re,defines:A.defines,customVertexShaderID:_e,customFragmentShaderID:Ce,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:_,batching:ke,instancing:ze,instancingColor:ze&&te.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:we===null?r.outputColorSpace:we.isXRRenderTarget===!0?we.texture.colorSpace:Ht,map:Ie,matcap:rt,envMap:V,envMapMode:V&&X.mapping,envMapCubeUVHeight:Z,aoMap:Tt,lightMap:Le,bumpMap:Ve,normalMap:Se,displacementMap:d&&vt,emissiveMap:je,normalMapObjectSpace:Se&&A.normalMapType===wh,normalMapTangentSpace:Se&&A.normalMapType===Zo,metalnessMap:w,roughnessMap:E,anisotropy:Y,anisotropyMap:ge,clearcoat:ce,clearcoatMap:ye,clearcoatNormalMap:De,clearcoatRoughnessMap:Fe,iridescence:se,iridescenceMap:oe,iridescenceThicknessMap:st,sheen:ue,sheenColorMap:$e,sheenRoughnessMap:Be,specularMap:Re,specularColorMap:xe,specularIntensityMap:We,transmission:Ae,transmissionMap:at,thicknessMap:gt,gradientMap:Ye,opaque:A.transparent===!1&&A.blending===Ji,alphaMap:pe,alphaTest:O,alphaHash:de,combine:A.combine,mapUv:Ie&&M(A.map.channel),aoMapUv:Tt&&M(A.aoMap.channel),lightMapUv:Le&&M(A.lightMap.channel),bumpMapUv:Ve&&M(A.bumpMap.channel),normalMapUv:Se&&M(A.normalMap.channel),displacementMapUv:vt&&M(A.displacementMap.channel),emissiveMapUv:je&&M(A.emissiveMap.channel),metalnessMapUv:w&&M(A.metalnessMap.channel),roughnessMapUv:E&&M(A.roughnessMap.channel),anisotropyMapUv:ge&&M(A.anisotropyMap.channel),clearcoatMapUv:ye&&M(A.clearcoatMap.channel),clearcoatNormalMapUv:De&&M(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&M(A.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&M(A.iridescenceMap.channel),iridescenceThicknessMapUv:st&&M(A.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&M(A.sheenColorMap.channel),sheenRoughnessMapUv:Be&&M(A.sheenRoughnessMap.channel),specularMapUv:Re&&M(A.specularMap.channel),specularColorMapUv:xe&&M(A.specularColorMap.channel),specularIntensityMapUv:We&&M(A.specularIntensityMap.channel),transmissionMapUv:at&&M(A.transmissionMap.channel),thicknessMapUv:gt&&M(A.thicknessMap.channel),alphaMapUv:pe&&M(A.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Se||Y),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:Ee,vertexUv3s:lt,pointsUvs:te.isPoints===!0&&!!k.attributes.uv&&(Ie||pe),fog:!!N,useFog:A.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:te.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:ae,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:ht,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Ie&&A.map.isVideoTexture===!0&&ut.getTransfer(A.map.colorSpace)===Et,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===vn,flipSided:A.side===en,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionDerivatives:le&&A.extensions.derivatives===!0,extensionFragDepth:le&&A.extensions.fragDepth===!0,extensionDrawBuffers:le&&A.extensions.drawBuffers===!0,extensionShaderTextureLOD:le&&A.extensions.shaderTextureLOD===!0,extensionClipCullDistance:le&&A.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()}}function p(A){const y=[];if(A.shaderID?y.push(A.shaderID):(y.push(A.customVertexShaderID),y.push(A.customFragmentShaderID)),A.defines!==void 0)for(const I in A.defines)y.push(I),y.push(A.defines[I]);return A.isRawShaderMaterial===!1&&(R(y,A),T(y,A),y.push(r.outputColorSpace)),y.push(A.customProgramCacheKey),y.join()}function R(A,y){A.push(y.precision),A.push(y.outputColorSpace),A.push(y.envMapMode),A.push(y.envMapCubeUVHeight),A.push(y.mapUv),A.push(y.alphaMapUv),A.push(y.lightMapUv),A.push(y.aoMapUv),A.push(y.bumpMapUv),A.push(y.normalMapUv),A.push(y.displacementMapUv),A.push(y.emissiveMapUv),A.push(y.metalnessMapUv),A.push(y.roughnessMapUv),A.push(y.anisotropyMapUv),A.push(y.clearcoatMapUv),A.push(y.clearcoatNormalMapUv),A.push(y.clearcoatRoughnessMapUv),A.push(y.iridescenceMapUv),A.push(y.iridescenceThicknessMapUv),A.push(y.sheenColorMapUv),A.push(y.sheenRoughnessMapUv),A.push(y.specularMapUv),A.push(y.specularColorMapUv),A.push(y.specularIntensityMapUv),A.push(y.transmissionMapUv),A.push(y.thicknessMapUv),A.push(y.combine),A.push(y.fogExp2),A.push(y.sizeAttenuation),A.push(y.morphTargetsCount),A.push(y.morphAttributeCount),A.push(y.numDirLights),A.push(y.numPointLights),A.push(y.numSpotLights),A.push(y.numSpotLightMaps),A.push(y.numHemiLights),A.push(y.numRectAreaLights),A.push(y.numDirLightShadows),A.push(y.numPointLightShadows),A.push(y.numSpotLightShadows),A.push(y.numSpotLightShadowsWithMaps),A.push(y.numLightProbes),A.push(y.shadowMapType),A.push(y.toneMapping),A.push(y.numClippingPlanes),A.push(y.numClipIntersection),A.push(y.depthPacking)}function T(A,y){a.disableAll(),y.isWebGL2&&a.enable(0),y.supportsVertexTextures&&a.enable(1),y.instancing&&a.enable(2),y.instancingColor&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),A.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.useLegacyLights&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),A.push(a.mask)}function C(A){const y=x[A.type];let I;if(y){const W=Tn[y];I=mf.clone(W.uniforms)}else I=A.uniforms;return I}function B(A,y){let I;for(let W=0,te=u.length;W<te;W++){const N=u[W];if(N.cacheKey===y){I=N,++I.usedTimes;break}}return I===void 0&&(I=new Cg(r,y,A,s),u.push(I)),I}function D(A){if(--A.usedTimes===0){const y=u.indexOf(A);u[y]=u[u.length-1],u.pop(),A.destroy()}}function P(A){l.remove(A)}function ne(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:C,acquireProgram:B,releaseProgram:D,releaseShaderCache:P,programs:u,dispose:ne}}function Ug(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Ng(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Kc(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Zc(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(f,d,_,x,M,g){let p=r[e];return p===void 0?(p={id:f.id,object:f,geometry:d,material:_,groupOrder:x,renderOrder:f.renderOrder,z:M,group:g},r[e]=p):(p.id=f.id,p.object=f,p.geometry=d,p.material=_,p.groupOrder=x,p.renderOrder=f.renderOrder,p.z=M,p.group=g),e++,p}function a(f,d,_,x,M,g){const p=o(f,d,_,x,M,g);_.transmission>0?n.push(p):_.transparent===!0?i.push(p):t.push(p)}function l(f,d,_,x,M,g){const p=o(f,d,_,x,M,g);_.transmission>0?n.unshift(p):_.transparent===!0?i.unshift(p):t.unshift(p)}function u(f,d){t.length>1&&t.sort(f||Ng),n.length>1&&n.sort(d||Kc),i.length>1&&i.sort(d||Kc)}function h(){for(let f=e,d=r.length;f<d;f++){const _=r[f];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:u}}function Og(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Zc,r.set(n,[o])):i>=s.length?(o=new Zc,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Fg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new Ne};break;case"SpotLight":t={position:new G,direction:new G,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new G,halfWidth:new G,halfHeight:new G};break}return r[e.id]=t,t}}}function Bg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Hg=0;function Gg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function zg(r,e){const t=new Fg,n=Bg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new G);const s=new G,o=new tt,a=new tt;function l(h,f){let d=0,_=0,x=0;for(let W=0;W<9;W++)i.probe[W].set(0,0,0);let M=0,g=0,p=0,R=0,T=0,C=0,B=0,D=0,P=0,ne=0,A=0;h.sort(Gg);const y=f===!0?Math.PI:1;for(let W=0,te=h.length;W<te;W++){const N=h[W],k=N.color,F=N.intensity,X=N.distance,Z=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)d+=k.r*F*y,_+=k.g*F*y,x+=k.b*F*y;else if(N.isLightProbe){for(let ee=0;ee<9;ee++)i.probe[ee].addScaledVector(N.sh.coefficients[ee],F);A++}else if(N.isDirectionalLight){const ee=t.get(N);if(ee.color.copy(N.color).multiplyScalar(N.intensity*y),N.castShadow){const ie=N.shadow,he=n.get(N);he.shadowBias=ie.bias,he.shadowNormalBias=ie.normalBias,he.shadowRadius=ie.radius,he.shadowMapSize=ie.mapSize,i.directionalShadow[M]=he,i.directionalShadowMap[M]=Z,i.directionalShadowMatrix[M]=N.shadow.matrix,C++}i.directional[M]=ee,M++}else if(N.isSpotLight){const ee=t.get(N);ee.position.setFromMatrixPosition(N.matrixWorld),ee.color.copy(k).multiplyScalar(F*y),ee.distance=X,ee.coneCos=Math.cos(N.angle),ee.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),ee.decay=N.decay,i.spot[p]=ee;const ie=N.shadow;if(N.map&&(i.spotLightMap[P]=N.map,P++,ie.updateMatrices(N),N.castShadow&&ne++),i.spotLightMatrix[p]=ie.matrix,N.castShadow){const he=n.get(N);he.shadowBias=ie.bias,he.shadowNormalBias=ie.normalBias,he.shadowRadius=ie.radius,he.shadowMapSize=ie.mapSize,i.spotShadow[p]=he,i.spotShadowMap[p]=Z,D++}p++}else if(N.isRectAreaLight){const ee=t.get(N);ee.color.copy(k).multiplyScalar(F),ee.halfWidth.set(N.width*.5,0,0),ee.halfHeight.set(0,N.height*.5,0),i.rectArea[R]=ee,R++}else if(N.isPointLight){const ee=t.get(N);if(ee.color.copy(N.color).multiplyScalar(N.intensity*y),ee.distance=N.distance,ee.decay=N.decay,N.castShadow){const ie=N.shadow,he=n.get(N);he.shadowBias=ie.bias,he.shadowNormalBias=ie.normalBias,he.shadowRadius=ie.radius,he.shadowMapSize=ie.mapSize,he.shadowCameraNear=ie.camera.near,he.shadowCameraFar=ie.camera.far,i.pointShadow[g]=he,i.pointShadowMap[g]=Z,i.pointShadowMatrix[g]=N.shadow.matrix,B++}i.point[g]=ee,g++}else if(N.isHemisphereLight){const ee=t.get(N);ee.skyColor.copy(N.color).multiplyScalar(F*y),ee.groundColor.copy(N.groundColor).multiplyScalar(F*y),i.hemi[T]=ee,T++}}R>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=_,i.ambient[2]=x;const I=i.hash;(I.directionalLength!==M||I.pointLength!==g||I.spotLength!==p||I.rectAreaLength!==R||I.hemiLength!==T||I.numDirectionalShadows!==C||I.numPointShadows!==B||I.numSpotShadows!==D||I.numSpotMaps!==P||I.numLightProbes!==A)&&(i.directional.length=M,i.spot.length=p,i.rectArea.length=R,i.point.length=g,i.hemi.length=T,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=B,i.pointShadowMap.length=B,i.spotShadow.length=D,i.spotShadowMap.length=D,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=B,i.spotLightMatrix.length=D+P-ne,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=ne,i.numLightProbes=A,I.directionalLength=M,I.pointLength=g,I.spotLength=p,I.rectAreaLength=R,I.hemiLength=T,I.numDirectionalShadows=C,I.numPointShadows=B,I.numSpotShadows=D,I.numSpotMaps=P,I.numLightProbes=A,i.version=Hg++)}function u(h,f){let d=0,_=0,x=0,M=0,g=0;const p=f.matrixWorldInverse;for(let R=0,T=h.length;R<T;R++){const C=h[R];if(C.isDirectionalLight){const B=i.directional[d];B.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),B.direction.sub(s),B.direction.transformDirection(p),d++}else if(C.isSpotLight){const B=i.spot[x];B.position.setFromMatrixPosition(C.matrixWorld),B.position.applyMatrix4(p),B.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),B.direction.sub(s),B.direction.transformDirection(p),x++}else if(C.isRectAreaLight){const B=i.rectArea[M];B.position.setFromMatrixPosition(C.matrixWorld),B.position.applyMatrix4(p),a.identity(),o.copy(C.matrixWorld),o.premultiply(p),a.extractRotation(o),B.halfWidth.set(C.width*.5,0,0),B.halfHeight.set(0,C.height*.5,0),B.halfWidth.applyMatrix4(a),B.halfHeight.applyMatrix4(a),M++}else if(C.isPointLight){const B=i.point[_];B.position.setFromMatrixPosition(C.matrixWorld),B.position.applyMatrix4(p),_++}else if(C.isHemisphereLight){const B=i.hemi[g];B.direction.setFromMatrixPosition(C.matrixWorld),B.direction.transformDirection(p),g++}}}return{setup:l,setupView:u,state:i}}function $c(r,e){const t=new zg(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(f){n.push(f)}function a(f){i.push(f)}function l(f){t.setup(n,f)}function u(f){t.setupView(n,f)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a}}function kg(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new $c(r,e),t.set(s,[l])):o>=a.length?(l=new $c(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class Vg extends yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wg extends yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jg=`uniform sampler2D shadow_pass;
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
}`;function qg(r,e,t){let n=new Qo;const i=new it,s=new it,o=new _t,a=new Vg({depthPacking:bh}),l=new Wg,u={},h=t.maxTextureSize,f={[Vn]:en,[en]:Vn,[vn]:vn},d=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Xg,fragmentShader:jg}),_=d.clone();_.defines.HORIZONTAL_PASS=1;const x=new Sn;x.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Bt(x,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sl;let p=this.type;this.render=function(D,P,ne){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||D.length===0)return;const A=r.getRenderTarget(),y=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),W=r.state;W.setBlending(ti),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const te=p!==Gn&&this.type===Gn,N=p===Gn&&this.type!==Gn;for(let k=0,F=D.length;k<F;k++){const X=D[k],Z=X.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);const ee=Z.getFrameExtents();if(i.multiply(ee),s.copy(Z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ee.x),i.x=s.x*ee.x,Z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ee.y),i.y=s.y*ee.y,Z.mapSize.y=s.y)),Z.map===null||te===!0||N===!0){const he=this.type!==Gn?{minFilter:Ft,magFilter:Ft}:{};Z.map!==null&&Z.map.dispose(),Z.map=new wi(i.x,i.y,he),Z.map.texture.name=X.name+".shadowMap",Z.camera.updateProjectionMatrix()}r.setRenderTarget(Z.map),r.clear();const ie=Z.getViewportCount();for(let he=0;he<ie;he++){const ae=Z.getViewport(he);o.set(s.x*ae.x,s.y*ae.y,s.x*ae.z,s.y*ae.w),W.viewport(o),Z.updateMatrices(X,he),n=Z.getFrustum(),C(P,ne,Z.camera,X,this.type)}Z.isPointLightShadow!==!0&&this.type===Gn&&R(Z,ne),Z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(A,y,I)};function R(D,P){const ne=e.update(M);d.defines.VSM_SAMPLES!==D.blurSamples&&(d.defines.VSM_SAMPLES=D.blurSamples,_.defines.VSM_SAMPLES=D.blurSamples,d.needsUpdate=!0,_.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new wi(i.x,i.y)),d.uniforms.shadow_pass.value=D.map.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,r.setRenderTarget(D.mapPass),r.clear(),r.renderBufferDirect(P,null,ne,d,M,null),_.uniforms.shadow_pass.value=D.mapPass.texture,_.uniforms.resolution.value=D.mapSize,_.uniforms.radius.value=D.radius,r.setRenderTarget(D.map),r.clear(),r.renderBufferDirect(P,null,ne,_,M,null)}function T(D,P,ne,A){let y=null;const I=ne.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(I!==void 0)y=I;else if(y=ne.isPointLight===!0?l:a,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const W=y.uuid,te=P.uuid;let N=u[W];N===void 0&&(N={},u[W]=N);let k=N[te];k===void 0&&(k=y.clone(),N[te]=k,P.addEventListener("dispose",B)),y=k}if(y.visible=P.visible,y.wireframe=P.wireframe,A===Gn?y.side=P.shadowSide!==null?P.shadowSide:P.side:y.side=P.shadowSide!==null?P.shadowSide:f[P.side],y.alphaMap=P.alphaMap,y.alphaTest=P.alphaTest,y.map=P.map,y.clipShadows=P.clipShadows,y.clippingPlanes=P.clippingPlanes,y.clipIntersection=P.clipIntersection,y.displacementMap=P.displacementMap,y.displacementScale=P.displacementScale,y.displacementBias=P.displacementBias,y.wireframeLinewidth=P.wireframeLinewidth,y.linewidth=P.linewidth,ne.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const W=r.properties.get(y);W.light=ne}return y}function C(D,P,ne,A,y){if(D.visible===!1)return;if(D.layers.test(P.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&y===Gn)&&(!D.frustumCulled||n.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,D.matrixWorld);const te=e.update(D),N=D.material;if(Array.isArray(N)){const k=te.groups;for(let F=0,X=k.length;F<X;F++){const Z=k[F],ee=N[Z.materialIndex];if(ee&&ee.visible){const ie=T(D,ee,A,y);D.onBeforeShadow(r,D,P,ne,te,ie,Z),r.renderBufferDirect(ne,null,te,ie,D,Z),D.onAfterShadow(r,D,P,ne,te,ie,Z)}}}else if(N.visible){const k=T(D,N,A,y);D.onBeforeShadow(r,D,P,ne,te,k,null),r.renderBufferDirect(ne,null,te,k,D,null),D.onAfterShadow(r,D,P,ne,te,k,null)}}const W=D.children;for(let te=0,N=W.length;te<N;te++)C(W[te],P,ne,A,y)}function B(D){D.target.removeEventListener("dispose",B);for(const ne in u){const A=u[ne],y=D.target.uuid;y in A&&(A[y].dispose(),delete A[y])}}}function Yg(r,e,t){const n=t.isWebGL2;function i(){let O=!1;const de=new _t;let le=null;const Ue=new _t(0,0,0,0);return{setMask:function(Ee){le!==Ee&&!O&&(r.colorMask(Ee,Ee,Ee,Ee),le=Ee)},setLocked:function(Ee){O=Ee},setClear:function(Ee,lt,ht,Rt,Ut){Ut===!0&&(Ee*=Rt,lt*=Rt,ht*=Rt),de.set(Ee,lt,ht,Rt),Ue.equals(de)===!1&&(r.clearColor(Ee,lt,ht,Rt),Ue.copy(de))},reset:function(){O=!1,le=null,Ue.set(-1,0,0,0)}}}function s(){let O=!1,de=null,le=null,Ue=null;return{setTest:function(Ee){Ee?ke(r.DEPTH_TEST):Ie(r.DEPTH_TEST)},setMask:function(Ee){de!==Ee&&!O&&(r.depthMask(Ee),de=Ee)},setFunc:function(Ee){if(le!==Ee){switch(Ee){case Qu:r.depthFunc(r.NEVER);break;case eh:r.depthFunc(r.ALWAYS);break;case th:r.depthFunc(r.LESS);break;case ws:r.depthFunc(r.LEQUAL);break;case nh:r.depthFunc(r.EQUAL);break;case ih:r.depthFunc(r.GEQUAL);break;case rh:r.depthFunc(r.GREATER);break;case sh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}le=Ee}},setLocked:function(Ee){O=Ee},setClear:function(Ee){Ue!==Ee&&(r.clearDepth(Ee),Ue=Ee)},reset:function(){O=!1,de=null,le=null,Ue=null}}}function o(){let O=!1,de=null,le=null,Ue=null,Ee=null,lt=null,ht=null,Rt=null,Ut=null;return{setTest:function(dt){O||(dt?ke(r.STENCIL_TEST):Ie(r.STENCIL_TEST))},setMask:function(dt){de!==dt&&!O&&(r.stencilMask(dt),de=dt)},setFunc:function(dt,Nt,tn){(le!==dt||Ue!==Nt||Ee!==tn)&&(r.stencilFunc(dt,Nt,tn),le=dt,Ue=Nt,Ee=tn)},setOp:function(dt,Nt,tn){(lt!==dt||ht!==Nt||Rt!==tn)&&(r.stencilOp(dt,Nt,tn),lt=dt,ht=Nt,Rt=tn)},setLocked:function(dt){O=dt},setClear:function(dt){Ut!==dt&&(r.clearStencil(dt),Ut=dt)},reset:function(){O=!1,de=null,le=null,Ue=null,Ee=null,lt=null,ht=null,Rt=null,Ut=null}}}const a=new i,l=new s,u=new o,h=new WeakMap,f=new WeakMap;let d={},_={},x=new WeakMap,M=[],g=null,p=!1,R=null,T=null,C=null,B=null,D=null,P=null,ne=null,A=new Ne(0,0,0),y=0,I=!1,W=null,te=null,N=null,k=null,F=null;const X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,ee=0;const ie=r.getParameter(r.VERSION);ie.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ie)[1]),Z=ee>=1):ie.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),Z=ee>=2);let he=null,ae={};const J=r.getParameter(r.SCISSOR_BOX),re=r.getParameter(r.VIEWPORT),_e=new _t().fromArray(J),Ce=new _t().fromArray(re);function we(O,de,le,Ue){const Ee=new Uint8Array(4),lt=r.createTexture();r.bindTexture(O,lt),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ht=0;ht<le;ht++)n&&(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)?r.texImage3D(de,0,r.RGBA,1,1,Ue,0,r.RGBA,r.UNSIGNED_BYTE,Ee):r.texImage2D(de+ht,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ee);return lt}const ze={};ze[r.TEXTURE_2D]=we(r.TEXTURE_2D,r.TEXTURE_2D,1),ze[r.TEXTURE_CUBE_MAP]=we(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ze[r.TEXTURE_2D_ARRAY]=we(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ze[r.TEXTURE_3D]=we(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),u.setClear(0),ke(r.DEPTH_TEST),l.setFunc(ws),je(!1),w(La),ke(r.CULL_FACE),Se(ti);function ke(O){d[O]!==!0&&(r.enable(O),d[O]=!0)}function Ie(O){d[O]!==!1&&(r.disable(O),d[O]=!1)}function rt(O,de){return _[O]!==de?(r.bindFramebuffer(O,de),_[O]=de,n&&(O===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=de),O===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=de)),!0):!1}function V(O,de){let le=M,Ue=!1;if(O)if(le=x.get(de),le===void 0&&(le=[],x.set(de,le)),O.isWebGLMultipleRenderTargets){const Ee=O.texture;if(le.length!==Ee.length||le[0]!==r.COLOR_ATTACHMENT0){for(let lt=0,ht=Ee.length;lt<ht;lt++)le[lt]=r.COLOR_ATTACHMENT0+lt;le.length=Ee.length,Ue=!0}}else le[0]!==r.COLOR_ATTACHMENT0&&(le[0]=r.COLOR_ATTACHMENT0,Ue=!0);else le[0]!==r.BACK&&(le[0]=r.BACK,Ue=!0);Ue&&(t.isWebGL2?r.drawBuffers(le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(le))}function Tt(O){return g!==O?(r.useProgram(O),g=O,!0):!1}const Le={[_i]:r.FUNC_ADD,[Bu]:r.FUNC_SUBTRACT,[Hu]:r.FUNC_REVERSE_SUBTRACT};if(n)Le[Ua]=r.MIN,Le[Na]=r.MAX;else{const O=e.get("EXT_blend_minmax");O!==null&&(Le[Ua]=O.MIN_EXT,Le[Na]=O.MAX_EXT)}const Ve={[Gu]:r.ZERO,[zu]:r.ONE,[ku]:r.SRC_COLOR,[Do]:r.SRC_ALPHA,[Yu]:r.SRC_ALPHA_SATURATE,[ju]:r.DST_COLOR,[Wu]:r.DST_ALPHA,[Vu]:r.ONE_MINUS_SRC_COLOR,[Uo]:r.ONE_MINUS_SRC_ALPHA,[qu]:r.ONE_MINUS_DST_COLOR,[Xu]:r.ONE_MINUS_DST_ALPHA,[Ku]:r.CONSTANT_COLOR,[Zu]:r.ONE_MINUS_CONSTANT_COLOR,[$u]:r.CONSTANT_ALPHA,[Ju]:r.ONE_MINUS_CONSTANT_ALPHA};function Se(O,de,le,Ue,Ee,lt,ht,Rt,Ut,dt){if(O===ti){p===!0&&(Ie(r.BLEND),p=!1);return}if(p===!1&&(ke(r.BLEND),p=!0),O!==Fu){if(O!==R||dt!==I){if((T!==_i||D!==_i)&&(r.blendEquation(r.FUNC_ADD),T=_i,D=_i),dt)switch(O){case Ji:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Pa:r.blendFunc(r.ONE,r.ONE);break;case Ia:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Da:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Ji:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Pa:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Ia:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Da:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}C=null,B=null,P=null,ne=null,A.set(0,0,0),y=0,R=O,I=dt}return}Ee=Ee||de,lt=lt||le,ht=ht||Ue,(de!==T||Ee!==D)&&(r.blendEquationSeparate(Le[de],Le[Ee]),T=de,D=Ee),(le!==C||Ue!==B||lt!==P||ht!==ne)&&(r.blendFuncSeparate(Ve[le],Ve[Ue],Ve[lt],Ve[ht]),C=le,B=Ue,P=lt,ne=ht),(Rt.equals(A)===!1||Ut!==y)&&(r.blendColor(Rt.r,Rt.g,Rt.b,Ut),A.copy(Rt),y=Ut),R=O,I=!1}function vt(O,de){O.side===vn?Ie(r.CULL_FACE):ke(r.CULL_FACE);let le=O.side===en;de&&(le=!le),je(le),O.blending===Ji&&O.transparent===!1?Se(ti):Se(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),l.setFunc(O.depthFunc),l.setTest(O.depthTest),l.setMask(O.depthWrite),a.setMask(O.colorWrite);const Ue=O.stencilWrite;u.setTest(Ue),Ue&&(u.setMask(O.stencilWriteMask),u.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),u.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Y(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ke(r.SAMPLE_ALPHA_TO_COVERAGE):Ie(r.SAMPLE_ALPHA_TO_COVERAGE)}function je(O){W!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),W=O)}function w(O){O!==Uu?(ke(r.CULL_FACE),O!==te&&(O===La?r.cullFace(r.BACK):O===Nu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ie(r.CULL_FACE),te=O}function E(O){O!==N&&(Z&&r.lineWidth(O),N=O)}function Y(O,de,le){O?(ke(r.POLYGON_OFFSET_FILL),(k!==de||F!==le)&&(r.polygonOffset(de,le),k=de,F=le)):Ie(r.POLYGON_OFFSET_FILL)}function ce(O){O?ke(r.SCISSOR_TEST):Ie(r.SCISSOR_TEST)}function se(O){O===void 0&&(O=r.TEXTURE0+X-1),he!==O&&(r.activeTexture(O),he=O)}function ue(O,de,le){le===void 0&&(he===null?le=r.TEXTURE0+X-1:le=he);let Ue=ae[le];Ue===void 0&&(Ue={type:void 0,texture:void 0},ae[le]=Ue),(Ue.type!==O||Ue.texture!==de)&&(he!==le&&(r.activeTexture(le),he=le),r.bindTexture(O,de||ze[O]),Ue.type=O,Ue.texture=de)}function Ae(){const O=ae[he];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ge(){try{r.compressedTexImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ye(){try{r.compressedTexImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function De(){try{r.texSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Fe(){try{r.texSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function oe(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function st(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $e(){try{r.texStorage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Be(){try{r.texStorage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Re(){try{r.texImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xe(){try{r.texImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function We(O){_e.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),_e.copy(O))}function at(O){Ce.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),Ce.copy(O))}function gt(O,de){let le=f.get(de);le===void 0&&(le=new WeakMap,f.set(de,le));let Ue=le.get(O);Ue===void 0&&(Ue=r.getUniformBlockIndex(de,O.name),le.set(O,Ue))}function Ye(O,de){const Ue=f.get(de).get(O);h.get(de)!==Ue&&(r.uniformBlockBinding(de,Ue,O.__bindingPointIndex),h.set(de,Ue))}function pe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},he=null,ae={},_={},x=new WeakMap,M=[],g=null,p=!1,R=null,T=null,C=null,B=null,D=null,P=null,ne=null,A=new Ne(0,0,0),y=0,I=!1,W=null,te=null,N=null,k=null,F=null,_e.set(0,0,r.canvas.width,r.canvas.height),Ce.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),u.reset()}return{buffers:{color:a,depth:l,stencil:u},enable:ke,disable:Ie,bindFramebuffer:rt,drawBuffers:V,useProgram:Tt,setBlending:Se,setMaterial:vt,setFlipSided:je,setCullFace:w,setLineWidth:E,setPolygonOffset:Y,setScissorTest:ce,activeTexture:se,bindTexture:ue,unbindTexture:Ae,compressedTexImage2D:ge,compressedTexImage3D:ye,texImage2D:Re,texImage3D:xe,updateUBOMapping:gt,uniformBlockBinding:Ye,texStorage2D:$e,texStorage3D:Be,texSubImage2D:De,texSubImage3D:Fe,compressedTexSubImage2D:oe,compressedTexSubImage3D:st,scissor:We,viewport:at,reset:pe}}function Kg(r,e,t,n,i,s,o){const a=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let f;const d=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,E){return _?new OffscreenCanvas(w,E):Br("canvas")}function M(w,E,Y,ce){let se=1;if((w.width>ce||w.height>ce)&&(se=ce/Math.max(w.width,w.height)),se<1||E===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const ue=E?Ds:Math.floor,Ae=ue(se*w.width),ge=ue(se*w.height);f===void 0&&(f=x(Ae,ge));const ye=Y?x(Ae,ge):f;return ye.width=Ae,ye.height=ge,ye.getContext("2d").drawImage(w,0,0,Ae,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+Ae+"x"+ge+")."),ye}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function g(w){return zo(w.width)&&zo(w.height)}function p(w){return a?!1:w.wrapS!==un||w.wrapT!==un||w.minFilter!==Ft&&w.minFilter!==Qt}function R(w,E){return w.generateMipmaps&&E&&w.minFilter!==Ft&&w.minFilter!==Qt}function T(w){r.generateMipmap(w)}function C(w,E,Y,ce,se=!1){if(a===!1)return E;if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ue=E;if(E===r.RED&&(Y===r.FLOAT&&(ue=r.R32F),Y===r.HALF_FLOAT&&(ue=r.R16F),Y===r.UNSIGNED_BYTE&&(ue=r.R8)),E===r.RED_INTEGER&&(Y===r.UNSIGNED_BYTE&&(ue=r.R8UI),Y===r.UNSIGNED_SHORT&&(ue=r.R16UI),Y===r.UNSIGNED_INT&&(ue=r.R32UI),Y===r.BYTE&&(ue=r.R8I),Y===r.SHORT&&(ue=r.R16I),Y===r.INT&&(ue=r.R32I)),E===r.RG&&(Y===r.FLOAT&&(ue=r.RG32F),Y===r.HALF_FLOAT&&(ue=r.RG16F),Y===r.UNSIGNED_BYTE&&(ue=r.RG8)),E===r.RGBA){const Ae=se?Cs:ut.getTransfer(ce);Y===r.FLOAT&&(ue=r.RGBA32F),Y===r.HALF_FLOAT&&(ue=r.RGBA16F),Y===r.UNSIGNED_BYTE&&(ue=Ae===Et?r.SRGB8_ALPHA8:r.RGBA8),Y===r.UNSIGNED_SHORT_4_4_4_4&&(ue=r.RGBA4),Y===r.UNSIGNED_SHORT_5_5_5_1&&(ue=r.RGB5_A1)}return(ue===r.R16F||ue===r.R32F||ue===r.RG16F||ue===r.RG32F||ue===r.RGBA16F||ue===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function B(w,E,Y){return R(w,Y)===!0||w.isFramebufferTexture&&w.minFilter!==Ft&&w.minFilter!==Qt?Math.log2(Math.max(E.width,E.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?E.mipmaps.length:1}function D(w){return w===Ft||w===Fo||w===Es?r.NEAREST:r.LINEAR}function P(w){const E=w.target;E.removeEventListener("dispose",P),A(E),E.isVideoTexture&&h.delete(E)}function ne(w){const E=w.target;E.removeEventListener("dispose",ne),I(E)}function A(w){const E=n.get(w);if(E.__webglInit===void 0)return;const Y=w.source,ce=d.get(Y);if(ce){const se=ce[E.__cacheKey];se.usedTimes--,se.usedTimes===0&&y(w),Object.keys(ce).length===0&&d.delete(Y)}n.remove(w)}function y(w){const E=n.get(w);r.deleteTexture(E.__webglTexture);const Y=w.source,ce=d.get(Y);delete ce[E.__cacheKey],o.memory.textures--}function I(w){const E=w.texture,Y=n.get(w),ce=n.get(E);if(ce.__webglTexture!==void 0&&(r.deleteTexture(ce.__webglTexture),o.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(Y.__webglFramebuffer[se]))for(let ue=0;ue<Y.__webglFramebuffer[se].length;ue++)r.deleteFramebuffer(Y.__webglFramebuffer[se][ue]);else r.deleteFramebuffer(Y.__webglFramebuffer[se]);Y.__webglDepthbuffer&&r.deleteRenderbuffer(Y.__webglDepthbuffer[se])}else{if(Array.isArray(Y.__webglFramebuffer))for(let se=0;se<Y.__webglFramebuffer.length;se++)r.deleteFramebuffer(Y.__webglFramebuffer[se]);else r.deleteFramebuffer(Y.__webglFramebuffer);if(Y.__webglDepthbuffer&&r.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let se=0;se<Y.__webglColorRenderbuffer.length;se++)Y.__webglColorRenderbuffer[se]&&r.deleteRenderbuffer(Y.__webglColorRenderbuffer[se]);Y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let se=0,ue=E.length;se<ue;se++){const Ae=n.get(E[se]);Ae.__webglTexture&&(r.deleteTexture(Ae.__webglTexture),o.memory.textures--),n.remove(E[se])}n.remove(E),n.remove(w)}let W=0;function te(){W=0}function N(){const w=W;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),W+=1,w}function k(w){const E=[];return E.push(w.wrapS),E.push(w.wrapT),E.push(w.wrapR||0),E.push(w.magFilter),E.push(w.minFilter),E.push(w.anisotropy),E.push(w.internalFormat),E.push(w.format),E.push(w.type),E.push(w.generateMipmaps),E.push(w.premultiplyAlpha),E.push(w.flipY),E.push(w.unpackAlignment),E.push(w.colorSpace),E.join()}function F(w,E){const Y=n.get(w);if(w.isVideoTexture&&vt(w),w.isRenderTargetTexture===!1&&w.version>0&&Y.__version!==w.version){const ce=w.image;if(ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_e(Y,w,E);return}}t.bindTexture(r.TEXTURE_2D,Y.__webglTexture,r.TEXTURE0+E)}function X(w,E){const Y=n.get(w);if(w.version>0&&Y.__version!==w.version){_e(Y,w,E);return}t.bindTexture(r.TEXTURE_2D_ARRAY,Y.__webglTexture,r.TEXTURE0+E)}function Z(w,E){const Y=n.get(w);if(w.version>0&&Y.__version!==w.version){_e(Y,w,E);return}t.bindTexture(r.TEXTURE_3D,Y.__webglTexture,r.TEXTURE0+E)}function ee(w,E){const Y=n.get(w);if(w.version>0&&Y.__version!==w.version){Ce(Y,w,E);return}t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture,r.TEXTURE0+E)}const ie={[sr]:r.REPEAT,[un]:r.CLAMP_TO_EDGE,[Rs]:r.MIRRORED_REPEAT},he={[Ft]:r.NEAREST,[Fo]:r.NEAREST_MIPMAP_NEAREST,[Es]:r.NEAREST_MIPMAP_LINEAR,[Qt]:r.LINEAR,[Tl]:r.LINEAR_MIPMAP_NEAREST,[bi]:r.LINEAR_MIPMAP_LINEAR},ae={[Rh]:r.NEVER,[Uh]:r.ALWAYS,[Ch]:r.LESS,[Ul]:r.LEQUAL,[Lh]:r.EQUAL,[Dh]:r.GEQUAL,[Ph]:r.GREATER,[Ih]:r.NOTEQUAL};function J(w,E,Y){if(Y?(r.texParameteri(w,r.TEXTURE_WRAP_S,ie[E.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,ie[E.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,ie[E.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,he[E.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,he[E.minFilter])):(r.texParameteri(w,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(w,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(E.wrapS!==un||E.wrapT!==un)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(w,r.TEXTURE_MAG_FILTER,D(E.magFilter)),r.texParameteri(w,r.TEXTURE_MIN_FILTER,D(E.minFilter)),E.minFilter!==Ft&&E.minFilter!==Qt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ce=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===Ft||E.minFilter!==Es&&E.minFilter!==bi||E.type===zn&&e.has("OES_texture_float_linear")===!1||a===!1&&E.type===Or&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(r.texParameterf(w,ce.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function re(w,E){let Y=!1;w.__webglInit===void 0&&(w.__webglInit=!0,E.addEventListener("dispose",P));const ce=E.source;let se=d.get(ce);se===void 0&&(se={},d.set(ce,se));const ue=k(E);if(ue!==w.__cacheKey){se[ue]===void 0&&(se[ue]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),se[ue].usedTimes++;const Ae=se[w.__cacheKey];Ae!==void 0&&(se[w.__cacheKey].usedTimes--,Ae.usedTimes===0&&y(E)),w.__cacheKey=ue,w.__webglTexture=se[ue].texture}return Y}function _e(w,E,Y){let ce=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ce=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ce=r.TEXTURE_3D);const se=re(w,E),ue=E.source;t.bindTexture(ce,w.__webglTexture,r.TEXTURE0+Y);const Ae=n.get(ue);if(ue.version!==Ae.__version||se===!0){t.activeTexture(r.TEXTURE0+Y);const ge=ut.getPrimaries(ut.workingColorSpace),ye=E.colorSpace===fn?null:ut.getPrimaries(E.colorSpace),De=E.colorSpace===fn||ge===ye?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Fe=p(E)&&g(E.image)===!1;let oe=M(E.image,Fe,!1,i.maxTextureSize);oe=je(E,oe);const st=g(oe)||a,$e=s.convert(E.format,E.colorSpace);let Be=s.convert(E.type),Re=C(E.internalFormat,$e,Be,E.colorSpace,E.isVideoTexture);J(ce,E,st);let xe;const We=E.mipmaps,at=a&&E.isVideoTexture!==!0&&Re!==Pl,gt=Ae.__version===void 0||se===!0,Ye=B(E,oe,st);if(E.isDepthTexture)Re=r.DEPTH_COMPONENT,a?E.type===zn?Re=r.DEPTH_COMPONENT32F:E.type===Qn?Re=r.DEPTH_COMPONENT24:E.type===Ei?Re=r.DEPTH24_STENCIL8:Re=r.DEPTH_COMPONENT16:E.type===zn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Ti&&Re===r.DEPTH_COMPONENT&&E.type!==Ko&&E.type!==Qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Qn,Be=s.convert(E.type)),E.format===or&&Re===r.DEPTH_COMPONENT&&(Re=r.DEPTH_STENCIL,E.type!==Ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Ei,Be=s.convert(E.type))),gt&&(at?t.texStorage2D(r.TEXTURE_2D,1,Re,oe.width,oe.height):t.texImage2D(r.TEXTURE_2D,0,Re,oe.width,oe.height,0,$e,Be,null));else if(E.isDataTexture)if(We.length>0&&st){at&&gt&&t.texStorage2D(r.TEXTURE_2D,Ye,Re,We[0].width,We[0].height);for(let pe=0,O=We.length;pe<O;pe++)xe=We[pe],at?t.texSubImage2D(r.TEXTURE_2D,pe,0,0,xe.width,xe.height,$e,Be,xe.data):t.texImage2D(r.TEXTURE_2D,pe,Re,xe.width,xe.height,0,$e,Be,xe.data);E.generateMipmaps=!1}else at?(gt&&t.texStorage2D(r.TEXTURE_2D,Ye,Re,oe.width,oe.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,oe.width,oe.height,$e,Be,oe.data)):t.texImage2D(r.TEXTURE_2D,0,Re,oe.width,oe.height,0,$e,Be,oe.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){at&&gt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ye,Re,We[0].width,We[0].height,oe.depth);for(let pe=0,O=We.length;pe<O;pe++)xe=We[pe],E.format!==hn?$e!==null?at?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,xe.width,xe.height,oe.depth,$e,xe.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,pe,Re,xe.width,xe.height,oe.depth,0,xe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?t.texSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,xe.width,xe.height,oe.depth,$e,Be,xe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,pe,Re,xe.width,xe.height,oe.depth,0,$e,Be,xe.data)}else{at&&gt&&t.texStorage2D(r.TEXTURE_2D,Ye,Re,We[0].width,We[0].height);for(let pe=0,O=We.length;pe<O;pe++)xe=We[pe],E.format!==hn?$e!==null?at?t.compressedTexSubImage2D(r.TEXTURE_2D,pe,0,0,xe.width,xe.height,$e,xe.data):t.compressedTexImage2D(r.TEXTURE_2D,pe,Re,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?t.texSubImage2D(r.TEXTURE_2D,pe,0,0,xe.width,xe.height,$e,Be,xe.data):t.texImage2D(r.TEXTURE_2D,pe,Re,xe.width,xe.height,0,$e,Be,xe.data)}else if(E.isDataArrayTexture)at?(gt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ye,Re,oe.width,oe.height,oe.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,$e,Be,oe.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Re,oe.width,oe.height,oe.depth,0,$e,Be,oe.data);else if(E.isData3DTexture)at?(gt&&t.texStorage3D(r.TEXTURE_3D,Ye,Re,oe.width,oe.height,oe.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,$e,Be,oe.data)):t.texImage3D(r.TEXTURE_3D,0,Re,oe.width,oe.height,oe.depth,0,$e,Be,oe.data);else if(E.isFramebufferTexture){if(gt)if(at)t.texStorage2D(r.TEXTURE_2D,Ye,Re,oe.width,oe.height);else{let pe=oe.width,O=oe.height;for(let de=0;de<Ye;de++)t.texImage2D(r.TEXTURE_2D,de,Re,pe,O,0,$e,Be,null),pe>>=1,O>>=1}}else if(We.length>0&&st){at&&gt&&t.texStorage2D(r.TEXTURE_2D,Ye,Re,We[0].width,We[0].height);for(let pe=0,O=We.length;pe<O;pe++)xe=We[pe],at?t.texSubImage2D(r.TEXTURE_2D,pe,0,0,$e,Be,xe):t.texImage2D(r.TEXTURE_2D,pe,Re,$e,Be,xe);E.generateMipmaps=!1}else at?(gt&&t.texStorage2D(r.TEXTURE_2D,Ye,Re,oe.width,oe.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,$e,Be,oe)):t.texImage2D(r.TEXTURE_2D,0,Re,$e,Be,oe);R(E,st)&&T(ce),Ae.__version=ue.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function Ce(w,E,Y){if(E.image.length!==6)return;const ce=re(w,E),se=E.source;t.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+Y);const ue=n.get(se);if(se.version!==ue.__version||ce===!0){t.activeTexture(r.TEXTURE0+Y);const Ae=ut.getPrimaries(ut.workingColorSpace),ge=E.colorSpace===fn?null:ut.getPrimaries(E.colorSpace),ye=E.colorSpace===fn||Ae===ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const De=E.isCompressedTexture||E.image[0].isCompressedTexture,Fe=E.image[0]&&E.image[0].isDataTexture,oe=[];for(let pe=0;pe<6;pe++)!De&&!Fe?oe[pe]=M(E.image[pe],!1,!0,i.maxCubemapSize):oe[pe]=Fe?E.image[pe].image:E.image[pe],oe[pe]=je(E,oe[pe]);const st=oe[0],$e=g(st)||a,Be=s.convert(E.format,E.colorSpace),Re=s.convert(E.type),xe=C(E.internalFormat,Be,Re,E.colorSpace),We=a&&E.isVideoTexture!==!0,at=ue.__version===void 0||ce===!0;let gt=B(E,st,$e);J(r.TEXTURE_CUBE_MAP,E,$e);let Ye;if(De){We&&at&&t.texStorage2D(r.TEXTURE_CUBE_MAP,gt,xe,st.width,st.height);for(let pe=0;pe<6;pe++){Ye=oe[pe].mipmaps;for(let O=0;O<Ye.length;O++){const de=Ye[O];E.format!==hn?Be!==null?We?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,O,0,0,de.width,de.height,Be,de.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,O,xe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,O,0,0,de.width,de.height,Be,Re,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,O,xe,de.width,de.height,0,Be,Re,de.data)}}}else{Ye=E.mipmaps,We&&at&&(Ye.length>0&&gt++,t.texStorage2D(r.TEXTURE_CUBE_MAP,gt,xe,oe[0].width,oe[0].height));for(let pe=0;pe<6;pe++)if(Fe){We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,oe[pe].width,oe[pe].height,Be,Re,oe[pe].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,xe,oe[pe].width,oe[pe].height,0,Be,Re,oe[pe].data);for(let O=0;O<Ye.length;O++){const le=Ye[O].image[pe].image;We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,O+1,0,0,le.width,le.height,Be,Re,le.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,O+1,xe,le.width,le.height,0,Be,Re,le.data)}}else{We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Be,Re,oe[pe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,xe,Be,Re,oe[pe]);for(let O=0;O<Ye.length;O++){const de=Ye[O];We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,O+1,0,0,Be,Re,de.image[pe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pe,O+1,xe,Be,Re,de.image[pe])}}}R(E,$e)&&T(r.TEXTURE_CUBE_MAP),ue.__version=se.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function we(w,E,Y,ce,se,ue){const Ae=s.convert(Y.format,Y.colorSpace),ge=s.convert(Y.type),ye=C(Y.internalFormat,Ae,ge,Y.colorSpace);if(!n.get(E).__hasExternalTextures){const Fe=Math.max(1,E.width>>ue),oe=Math.max(1,E.height>>ue);se===r.TEXTURE_3D||se===r.TEXTURE_2D_ARRAY?t.texImage3D(se,ue,ye,Fe,oe,E.depth,0,Ae,ge,null):t.texImage2D(se,ue,ye,Fe,oe,0,Ae,ge,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),Se(E)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ce,se,n.get(Y).__webglTexture,0,Ve(E)):(se===r.TEXTURE_2D||se>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ce,se,n.get(Y).__webglTexture,ue),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ze(w,E,Y){if(r.bindRenderbuffer(r.RENDERBUFFER,w),E.depthBuffer&&!E.stencilBuffer){let ce=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(Y||Se(E)){const se=E.depthTexture;se&&se.isDepthTexture&&(se.type===zn?ce=r.DEPTH_COMPONENT32F:se.type===Qn&&(ce=r.DEPTH_COMPONENT24));const ue=Ve(E);Se(E)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ue,ce,E.width,E.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ue,ce,E.width,E.height)}else r.renderbufferStorage(r.RENDERBUFFER,ce,E.width,E.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,w)}else if(E.depthBuffer&&E.stencilBuffer){const ce=Ve(E);Y&&Se(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ce,r.DEPTH24_STENCIL8,E.width,E.height):Se(E)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ce,r.DEPTH24_STENCIL8,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,w)}else{const ce=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let se=0;se<ce.length;se++){const ue=ce[se],Ae=s.convert(ue.format,ue.colorSpace),ge=s.convert(ue.type),ye=C(ue.internalFormat,Ae,ge,ue.colorSpace),De=Ve(E);Y&&Se(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,De,ye,E.width,E.height):Se(E)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,De,ye,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ye,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ke(w,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,w),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),F(E.depthTexture,0);const ce=n.get(E.depthTexture).__webglTexture,se=Ve(E);if(E.depthTexture.format===Ti)Se(E)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ce,0,se):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ce,0);else if(E.depthTexture.format===or)Se(E)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ce,0,se):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function Ie(w){const E=n.get(w),Y=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!E.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");ke(E.__webglFramebuffer,w)}else if(Y){E.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[ce]),E.__webglDepthbuffer[ce]=r.createRenderbuffer(),ze(E.__webglDepthbuffer[ce],w,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=r.createRenderbuffer(),ze(E.__webglDepthbuffer,w,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function rt(w,E,Y){const ce=n.get(w);E!==void 0&&we(ce.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Y!==void 0&&Ie(w)}function V(w){const E=w.texture,Y=n.get(w),ce=n.get(E);w.addEventListener("dispose",ne),w.isWebGLMultipleRenderTargets!==!0&&(ce.__webglTexture===void 0&&(ce.__webglTexture=r.createTexture()),ce.__version=E.version,o.memory.textures++);const se=w.isWebGLCubeRenderTarget===!0,ue=w.isWebGLMultipleRenderTargets===!0,Ae=g(w)||a;if(se){Y.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(a&&E.mipmaps&&E.mipmaps.length>0){Y.__webglFramebuffer[ge]=[];for(let ye=0;ye<E.mipmaps.length;ye++)Y.__webglFramebuffer[ge][ye]=r.createFramebuffer()}else Y.__webglFramebuffer[ge]=r.createFramebuffer()}else{if(a&&E.mipmaps&&E.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ge=0;ge<E.mipmaps.length;ge++)Y.__webglFramebuffer[ge]=r.createFramebuffer()}else Y.__webglFramebuffer=r.createFramebuffer();if(ue)if(i.drawBuffers){const ge=w.texture;for(let ye=0,De=ge.length;ye<De;ye++){const Fe=n.get(ge[ye]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&w.samples>0&&Se(w)===!1){const ge=ue?E:[E];Y.__webglMultisampledFramebuffer=r.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ye=0;ye<ge.length;ye++){const De=ge[ye];Y.__webglColorRenderbuffer[ye]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Y.__webglColorRenderbuffer[ye]);const Fe=s.convert(De.format,De.colorSpace),oe=s.convert(De.type),st=C(De.internalFormat,Fe,oe,De.colorSpace,w.isXRRenderTarget===!0),$e=Ve(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,$e,st,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,Y.__webglColorRenderbuffer[ye])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(Y.__webglDepthRenderbuffer=r.createRenderbuffer(),ze(Y.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(se){t.bindTexture(r.TEXTURE_CUBE_MAP,ce.__webglTexture),J(r.TEXTURE_CUBE_MAP,E,Ae);for(let ge=0;ge<6;ge++)if(a&&E.mipmaps&&E.mipmaps.length>0)for(let ye=0;ye<E.mipmaps.length;ye++)we(Y.__webglFramebuffer[ge][ye],w,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,ye);else we(Y.__webglFramebuffer[ge],w,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);R(E,Ae)&&T(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){const ge=w.texture;for(let ye=0,De=ge.length;ye<De;ye++){const Fe=ge[ye],oe=n.get(Fe);t.bindTexture(r.TEXTURE_2D,oe.__webglTexture),J(r.TEXTURE_2D,Fe,Ae),we(Y.__webglFramebuffer,w,Fe,r.COLOR_ATTACHMENT0+ye,r.TEXTURE_2D,0),R(Fe,Ae)&&T(r.TEXTURE_2D)}t.unbindTexture()}else{let ge=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(a?ge=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ge,ce.__webglTexture),J(ge,E,Ae),a&&E.mipmaps&&E.mipmaps.length>0)for(let ye=0;ye<E.mipmaps.length;ye++)we(Y.__webglFramebuffer[ye],w,E,r.COLOR_ATTACHMENT0,ge,ye);else we(Y.__webglFramebuffer,w,E,r.COLOR_ATTACHMENT0,ge,0);R(E,Ae)&&T(ge),t.unbindTexture()}w.depthBuffer&&Ie(w)}function Tt(w){const E=g(w)||a,Y=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let ce=0,se=Y.length;ce<se;ce++){const ue=Y[ce];if(R(ue,E)){const Ae=w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ge=n.get(ue).__webglTexture;t.bindTexture(Ae,ge),T(Ae),t.unbindTexture()}}}function Le(w){if(a&&w.samples>0&&Se(w)===!1){const E=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],Y=w.width,ce=w.height;let se=r.COLOR_BUFFER_BIT;const ue=[],Ae=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ge=n.get(w),ye=w.isWebGLMultipleRenderTargets===!0;if(ye)for(let De=0;De<E.length;De++)t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let De=0;De<E.length;De++){ue.push(r.COLOR_ATTACHMENT0+De),w.depthBuffer&&ue.push(Ae);const Fe=ge.__ignoreDepthValues!==void 0?ge.__ignoreDepthValues:!1;if(Fe===!1&&(w.depthBuffer&&(se|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&(se|=r.STENCIL_BUFFER_BIT)),ye&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ge.__webglColorRenderbuffer[De]),Fe===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Ae]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Ae])),ye){const oe=n.get(E[De]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,oe,0)}r.blitFramebuffer(0,0,Y,ce,0,0,Y,ce,se,r.NEAREST),u&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ue)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ye)for(let De=0;De<E.length;De++){t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,ge.__webglColorRenderbuffer[De]);const Fe=n.get(E[De]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,Fe,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}}function Ve(w){return Math.min(i.maxSamples,w.samples)}function Se(w){const E=n.get(w);return a&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function vt(w){const E=o.render.frame;h.get(w)!==E&&(h.set(w,E),w.update())}function je(w,E){const Y=w.colorSpace,ce=w.format,se=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===Go||Y!==Ht&&Y!==fn&&(ut.getTransfer(Y)===Et?a===!1?e.has("EXT_sRGB")===!0&&ce===hn?(w.format=Go,w.minFilter=Qt,w.generateMipmaps=!1):E=Ol.sRGBToLinear(E):(ce!==hn||se!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),E}this.allocateTextureUnit=N,this.resetTextureUnits=te,this.setTexture2D=F,this.setTexture2DArray=X,this.setTexture3D=Z,this.setTextureCube=ee,this.rebindTextures=rt,this.setupRenderTarget=V,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Se}function Zg(r,e,t){const n=t.isWebGL2;function i(s,o=fn){let a;const l=ut.getTransfer(o);if(s===ii)return r.UNSIGNED_BYTE;if(s===bl)return r.UNSIGNED_SHORT_4_4_4_4;if(s===wl)return r.UNSIGNED_SHORT_5_5_5_1;if(s===mh)return r.BYTE;if(s===gh)return r.SHORT;if(s===Ko)return r.UNSIGNED_SHORT;if(s===Al)return r.INT;if(s===Qn)return r.UNSIGNED_INT;if(s===zn)return r.FLOAT;if(s===Or)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===_h)return r.ALPHA;if(s===hn)return r.RGBA;if(s===vh)return r.LUMINANCE;if(s===xh)return r.LUMINANCE_ALPHA;if(s===Ti)return r.DEPTH_COMPONENT;if(s===or)return r.DEPTH_STENCIL;if(s===Go)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===yh)return r.RED;if(s===Rl)return r.RED_INTEGER;if(s===Mh)return r.RG;if(s===Cl)return r.RG_INTEGER;if(s===Ll)return r.RGBA_INTEGER;if(s===qs||s===Ys||s===Ks||s===Zs)if(l===Et)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===qs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ys)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ks)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Zs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===qs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ys)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ks)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Zs)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Fa||s===Ba||s===Ha||s===Ga)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Fa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ba)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ha)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ga)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Pl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===za||s===ka)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===za)return l===Et?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===ka)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Va||s===Wa||s===Xa||s===ja||s===qa||s===Ya||s===Ka||s===Za||s===$a||s===Ja||s===Qa||s===ec||s===tc||s===nc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Va)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Wa)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Xa)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ja)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===qa)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ya)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ka)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Za)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===$a)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ja)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Qa)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===ec)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===tc)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===nc)return l===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===$s||s===ic||s===rc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===$s)return l===Et?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ic)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===rc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Sh||s===sc||s===oc||s===ac)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===$s)return a.COMPRESSED_RED_RGTC1_EXT;if(s===sc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===oc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ac)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ei?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class $g extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class yi extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jg={type:"move"};class So{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const M of e.hand.values()){const g=t.getJointPose(M,n),p=this._getHandJoint(u,M);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],d=h.position.distanceTo(f.position),_=.02,x=.005;u.inputState.pinching&&d>_+x?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=_-x&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jg)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new yi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Qg extends fr{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,u=null,h=null,f=null,d=null,_=null,x=null;const M=t.getContextAttributes();let g=null,p=null;const R=[],T=[],C=new it;let B=null;const D=new Kt;D.layers.enable(1),D.viewport=new _t;const P=new Kt;P.layers.enable(2),P.viewport=new _t;const ne=[D,P],A=new $g;A.layers.enable(1),A.layers.enable(2);let y=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let re=R[J];return re===void 0&&(re=new So,R[J]=re),re.getTargetRaySpace()},this.getControllerGrip=function(J){let re=R[J];return re===void 0&&(re=new So,R[J]=re),re.getGripSpace()},this.getHand=function(J){let re=R[J];return re===void 0&&(re=new So,R[J]=re),re.getHandSpace()};function W(J){const re=T.indexOf(J.inputSource);if(re===-1)return;const _e=R[re];_e!==void 0&&(_e.update(J.inputSource,J.frame,u||o),_e.dispatchEvent({type:J.type,data:J.inputSource}))}function te(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",te),i.removeEventListener("inputsourceschange",N);for(let J=0;J<R.length;J++){const re=T[J];re!==null&&(T[J]=null,R[J].disconnect(re))}y=null,I=null,e.setRenderTarget(g),_=null,d=null,f=null,i=null,p=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(B),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(J){u=J},this.getBaseLayer=function(){return d!==null?d:_},this.getBinding=function(){return f},this.getFrame=function(){return x},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(g=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",te),i.addEventListener("inputsourceschange",N),M.xrCompatible!==!0&&await t.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(C),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const re={antialias:i.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};_=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),p=new wi(_.framebufferWidth,_.framebufferHeight,{format:hn,type:ii,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let re=null,_e=null,Ce=null;M.depth&&(Ce=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=M.stencil?or:Ti,_e=M.stencil?Ei:Qn);const we={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};f=new XRWebGLBinding(i,t),d=f.createProjectionLayer(we),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new wi(d.textureWidth,d.textureHeight,{format:hn,type:ii,depthTexture:new ql(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const ze=e.properties.get(p);ze.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await i.requestReferenceSpace(a),ae.setContext(i),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function N(J){for(let re=0;re<J.removed.length;re++){const _e=J.removed[re],Ce=T.indexOf(_e);Ce>=0&&(T[Ce]=null,R[Ce].disconnect(_e))}for(let re=0;re<J.added.length;re++){const _e=J.added[re];let Ce=T.indexOf(_e);if(Ce===-1){for(let ze=0;ze<R.length;ze++)if(ze>=T.length){T.push(_e),Ce=ze;break}else if(T[ze]===null){T[ze]=_e,Ce=ze;break}if(Ce===-1)break}const we=R[Ce];we&&we.connect(_e)}}const k=new G,F=new G;function X(J,re,_e){k.setFromMatrixPosition(re.matrixWorld),F.setFromMatrixPosition(_e.matrixWorld);const Ce=k.distanceTo(F),we=re.projectionMatrix.elements,ze=_e.projectionMatrix.elements,ke=we[14]/(we[10]-1),Ie=we[14]/(we[10]+1),rt=(we[9]+1)/we[5],V=(we[9]-1)/we[5],Tt=(we[8]-1)/we[0],Le=(ze[8]+1)/ze[0],Ve=ke*Tt,Se=ke*Le,vt=Ce/(-Tt+Le),je=vt*-Tt;re.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(je),J.translateZ(vt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const w=ke+vt,E=Ie+vt,Y=Ve-je,ce=Se+(Ce-je),se=rt*Ie/E*w,ue=V*Ie/E*w;J.projectionMatrix.makePerspective(Y,ce,se,ue,w,E),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function Z(J,re){re===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(re.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;A.near=P.near=D.near=J.near,A.far=P.far=D.far=J.far,(y!==A.near||I!==A.far)&&(i.updateRenderState({depthNear:A.near,depthFar:A.far}),y=A.near,I=A.far);const re=J.parent,_e=A.cameras;Z(A,re);for(let Ce=0;Ce<_e.length;Ce++)Z(_e[Ce],re);_e.length===2?X(A,D,P):A.projectionMatrix.copy(D.projectionMatrix),ee(J,A,re)};function ee(J,re,_e){_e===null?J.matrix.copy(re.matrixWorld):(J.matrix.copy(_e.matrixWorld),J.matrix.invert(),J.matrix.multiply(re.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=cr*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(d===null&&_===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=J)};let ie=null;function he(J,re){if(h=re.getViewerPose(u||o),x=re,h!==null){const _e=h.views;_!==null&&(e.setRenderTargetFramebuffer(p,_.framebuffer),e.setRenderTarget(p));let Ce=!1;_e.length!==A.cameras.length&&(A.cameras.length=0,Ce=!0);for(let we=0;we<_e.length;we++){const ze=_e[we];let ke=null;if(_!==null)ke=_.getViewport(ze);else{const rt=f.getViewSubImage(d,ze);ke=rt.viewport,we===0&&(e.setRenderTargetTextures(p,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),e.setRenderTarget(p))}let Ie=ne[we];Ie===void 0&&(Ie=new Kt,Ie.layers.enable(we),Ie.viewport=new _t,ne[we]=Ie),Ie.matrix.fromArray(ze.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(ze.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(ke.x,ke.y,ke.width,ke.height),we===0&&(A.matrix.copy(Ie.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),Ce===!0&&A.cameras.push(Ie)}}for(let _e=0;_e<R.length;_e++){const Ce=T[_e],we=R[_e];Ce!==null&&we!==void 0&&we.update(Ce,re,u||o)}ie&&ie(J,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),x=null}const ae=new jl;ae.setAnimationLoop(he),this.setAnimationLoop=function(J){ie=J},this.dispose=function(){}}}function e_(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Vl(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,R,T,C){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),f(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&_(g,p,C)):p.isMeshMatcapMaterial?(s(g,p),x(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),M(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,R,T):p.isSpriteMaterial?u(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===en&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===en&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const R=e.get(p).envMap;if(R&&(g.envMap.value=R,g.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap){g.lightMap.value=p.lightMap;const T=r._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=p.lightMapIntensity*T,t(p.lightMap,g.lightMapTransform)}p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,R,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*R,g.scale.value=T*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),e.get(p).envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function _(g,p,R){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&g.clearcoatNormalScale.value.negate())),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=R.texture,g.transmissionSamplerSize.value.set(R.width,R.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,p){p.matcap&&(g.matcap.value=p.matcap)}function M(g,p){const R=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(R.matrixWorld),g.nearDistance.value=R.shadow.camera.near,g.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function t_(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(R,T){const C=T.program;n.uniformBlockBinding(R,C)}function u(R,T){let C=i[R.id];C===void 0&&(x(R),C=h(R),i[R.id]=C,R.addEventListener("dispose",g));const B=T.program;n.updateUBOMapping(R,B);const D=e.render.frame;s[R.id]!==D&&(d(R),s[R.id]=D)}function h(R){const T=f();R.__bindingPointIndex=T;const C=r.createBuffer(),B=R.__size,D=R.usage;return r.bindBuffer(r.UNIFORM_BUFFER,C),r.bufferData(r.UNIFORM_BUFFER,B,D),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,T,C),C}function f(){for(let R=0;R<a;R++)if(o.indexOf(R)===-1)return o.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(R){const T=i[R.id],C=R.uniforms,B=R.__cache;r.bindBuffer(r.UNIFORM_BUFFER,T);for(let D=0,P=C.length;D<P;D++){const ne=Array.isArray(C[D])?C[D]:[C[D]];for(let A=0,y=ne.length;A<y;A++){const I=ne[A];if(_(I,D,A,B)===!0){const W=I.__offset,te=Array.isArray(I.value)?I.value:[I.value];let N=0;for(let k=0;k<te.length;k++){const F=te[k],X=M(F);typeof F=="number"||typeof F=="boolean"?(I.__data[0]=F,r.bufferSubData(r.UNIFORM_BUFFER,W+N,I.__data)):F.isMatrix3?(I.__data[0]=F.elements[0],I.__data[1]=F.elements[1],I.__data[2]=F.elements[2],I.__data[3]=0,I.__data[4]=F.elements[3],I.__data[5]=F.elements[4],I.__data[6]=F.elements[5],I.__data[7]=0,I.__data[8]=F.elements[6],I.__data[9]=F.elements[7],I.__data[10]=F.elements[8],I.__data[11]=0):(F.toArray(I.__data,N),N+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,W,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function _(R,T,C,B){const D=R.value,P=T+"_"+C;if(B[P]===void 0)return typeof D=="number"||typeof D=="boolean"?B[P]=D:B[P]=D.clone(),!0;{const ne=B[P];if(typeof D=="number"||typeof D=="boolean"){if(ne!==D)return B[P]=D,!0}else if(ne.equals(D)===!1)return ne.copy(D),!0}return!1}function x(R){const T=R.uniforms;let C=0;const B=16;for(let P=0,ne=T.length;P<ne;P++){const A=Array.isArray(T[P])?T[P]:[T[P]];for(let y=0,I=A.length;y<I;y++){const W=A[y],te=Array.isArray(W.value)?W.value:[W.value];for(let N=0,k=te.length;N<k;N++){const F=te[N],X=M(F),Z=C%B;Z!==0&&B-Z<X.boundary&&(C+=B-Z),W.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=C,C+=X.storage}}}const D=C%B;return D>0&&(C+=B-D),R.__size=C,R.__cache={},this}function M(R){const T={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(T.boundary=4,T.storage=4):R.isVector2?(T.boundary=8,T.storage=8):R.isVector3||R.isColor?(T.boundary=16,T.storage=12):R.isVector4?(T.boundary=16,T.storage=16):R.isMatrix3?(T.boundary=48,T.storage=48):R.isMatrix4?(T.boundary=64,T.storage=64):R.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R),T}function g(R){const T=R.target;T.removeEventListener("dispose",g);const C=o.indexOf(T.__bindingPointIndex);o.splice(C,1),r.deleteBuffer(i[T.id]),delete i[T.id],delete s[T.id]}function p(){for(const R in i)r.deleteBuffer(i[R]);o=[],i={},s={}}return{bind:l,update:u,dispose:p}}class Ql{constructor(e={}){const{canvas:t=Zh(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const _=new Uint32Array(4),x=new Int32Array(4);let M=null,g=null;const p=[],R=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wt,this._useLegacyLights=!1,this.toneMapping=ni,this.toneMappingExposure=1;const T=this;let C=!1,B=0,D=0,P=null,ne=-1,A=null;const y=new _t,I=new _t;let W=null;const te=new Ne(0);let N=0,k=t.width,F=t.height,X=1,Z=null,ee=null;const ie=new _t(0,0,k,F),he=new _t(0,0,k,F);let ae=!1;const J=new Qo;let re=!1,_e=!1,Ce=null;const we=new tt,ze=new it,ke=new G,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function rt(){return P===null?X:1}let V=n;function Tt(b,z){for(let K=0;K<b.length;K++){const $=b[K],q=t.getContext($,z);if(q!==null)return q}return null}try{const b={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qo}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",O,!1),t.addEventListener("webglcontextcreationerror",de,!1),V===null){const z=["webgl2","webgl","experimental-webgl"];if(T.isWebGL1Renderer===!0&&z.shift(),V=Tt(z,b),V===null)throw Tt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&V instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),V.getShaderPrecisionFormat===void 0&&(V.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Le,Ve,Se,vt,je,w,E,Y,ce,se,ue,Ae,ge,ye,De,Fe,oe,st,$e,Be,Re,xe,We,at;function gt(){Le=new hm(V),Ve=new sm(V,Le,e),Le.init(Ve),xe=new Zg(V,Le,Ve),Se=new Yg(V,Le,Ve),vt=new pm(V),je=new Ug,w=new Kg(V,Le,Se,je,Ve,xe,vt),E=new am(T),Y=new um(T),ce=new Sf(V,Ve),We=new im(V,Le,ce,Ve),se=new fm(V,ce,vt,We),ue=new vm(V,se,ce,vt),$e=new _m(V,Ve,w),Fe=new om(je),Ae=new Dg(T,E,Y,Le,Ve,We,Fe),ge=new e_(T,je),ye=new Og,De=new kg(Le,Ve),st=new nm(T,E,Y,Se,ue,d,l),oe=new qg(T,ue,Ve),at=new t_(V,vt,Ve,Se),Be=new rm(V,Le,vt,Ve),Re=new dm(V,Le,vt,Ve),vt.programs=Ae.programs,T.capabilities=Ve,T.extensions=Le,T.properties=je,T.renderLists=ye,T.shadowMap=oe,T.state=Se,T.info=vt}gt();const Ye=new Qg(T,V);this.xr=Ye,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const b=Le.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Le.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(b){b!==void 0&&(X=b,this.setSize(k,F,!1))},this.getSize=function(b){return b.set(k,F)},this.setSize=function(b,z,K=!0){if(Ye.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=b,F=z,t.width=Math.floor(b*X),t.height=Math.floor(z*X),K===!0&&(t.style.width=b+"px",t.style.height=z+"px"),this.setViewport(0,0,b,z)},this.getDrawingBufferSize=function(b){return b.set(k*X,F*X).floor()},this.setDrawingBufferSize=function(b,z,K){k=b,F=z,X=K,t.width=Math.floor(b*K),t.height=Math.floor(z*K),this.setViewport(0,0,b,z)},this.getCurrentViewport=function(b){return b.copy(y)},this.getViewport=function(b){return b.copy(ie)},this.setViewport=function(b,z,K,$){b.isVector4?ie.set(b.x,b.y,b.z,b.w):ie.set(b,z,K,$),Se.viewport(y.copy(ie).multiplyScalar(X).floor())},this.getScissor=function(b){return b.copy(he)},this.setScissor=function(b,z,K,$){b.isVector4?he.set(b.x,b.y,b.z,b.w):he.set(b,z,K,$),Se.scissor(I.copy(he).multiplyScalar(X).floor())},this.getScissorTest=function(){return ae},this.setScissorTest=function(b){Se.setScissorTest(ae=b)},this.setOpaqueSort=function(b){Z=b},this.setTransparentSort=function(b){ee=b},this.getClearColor=function(b){return b.copy(st.getClearColor())},this.setClearColor=function(){st.setClearColor.apply(st,arguments)},this.getClearAlpha=function(){return st.getClearAlpha()},this.setClearAlpha=function(){st.setClearAlpha.apply(st,arguments)},this.clear=function(b=!0,z=!0,K=!0){let $=0;if(b){let q=!1;if(P!==null){const ve=P.texture.format;q=ve===Ll||ve===Cl||ve===Rl}if(q){const ve=P.texture.type,be=ve===ii||ve===Qn||ve===Ko||ve===Ei||ve===bl||ve===wl,Pe=st.getClearColor(),Oe=st.getClearAlpha(),Ke=Pe.r,Xe=Pe.g,qe=Pe.b;be?(_[0]=Ke,_[1]=Xe,_[2]=qe,_[3]=Oe,V.clearBufferuiv(V.COLOR,0,_)):(x[0]=Ke,x[1]=Xe,x[2]=qe,x[3]=Oe,V.clearBufferiv(V.COLOR,0,x))}else $|=V.COLOR_BUFFER_BIT}z&&($|=V.DEPTH_BUFFER_BIT),K&&($|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",de,!1),ye.dispose(),De.dispose(),je.dispose(),E.dispose(),Y.dispose(),ue.dispose(),We.dispose(),at.dispose(),Ae.dispose(),Ye.dispose(),Ye.removeEventListener("sessionstart",Ut),Ye.removeEventListener("sessionend",dt),Ce&&(Ce.dispose(),Ce=null),Nt.stop()};function pe(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const b=vt.autoReset,z=oe.enabled,K=oe.autoUpdate,$=oe.needsUpdate,q=oe.type;gt(),vt.autoReset=b,oe.enabled=z,oe.autoUpdate=K,oe.needsUpdate=$,oe.type=q}function de(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function le(b){const z=b.target;z.removeEventListener("dispose",le),Ue(z)}function Ue(b){Ee(b),je.remove(b)}function Ee(b){const z=je.get(b).programs;z!==void 0&&(z.forEach(function(K){Ae.releaseProgram(K)}),b.isShaderMaterial&&Ae.releaseShaderCache(b))}this.renderBufferDirect=function(b,z,K,$,q,ve){z===null&&(z=Ie);const be=q.isMesh&&q.matrixWorld.determinant()<0,Pe=kr(b,z,K,$,q);Se.setMaterial($,be);let Oe=K.index,Ke=1;if($.wireframe===!0){if(Oe=se.getWireframeAttribute(K),Oe===void 0)return;Ke=2}const Xe=K.drawRange,qe=K.attributes.position;let At=Xe.start*Ke,kt=(Xe.start+Xe.count)*Ke;ve!==null&&(At=Math.max(At,ve.start*Ke),kt=Math.min(kt,(ve.start+ve.count)*Ke)),Oe!==null?(At=Math.max(At,0),kt=Math.min(kt,Oe.count)):qe!=null&&(At=Math.max(At,0),kt=Math.min(kt,qe.count));const Ct=kt-At;if(Ct<0||Ct===1/0)return;We.setup(q,$,Pe,K,Oe);let dn,yt=Be;if(Oe!==null&&(dn=ce.get(Oe),yt=Re,yt.setIndex(dn)),q.isMesh)$.wireframe===!0?(Se.setLineWidth($.wireframeLinewidth*rt()),yt.setMode(V.LINES)):yt.setMode(V.TRIANGLES);else if(q.isLine){let Je=$.linewidth;Je===void 0&&(Je=1),Se.setLineWidth(Je*rt()),q.isLineSegments?yt.setMode(V.LINES):q.isLineLoop?yt.setMode(V.LINE_LOOP):yt.setMode(V.LINE_STRIP)}else q.isPoints?yt.setMode(V.POINTS):q.isSprite&&yt.setMode(V.TRIANGLES);if(q.isBatchedMesh)yt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)yt.renderInstances(At,Ct,q.count);else if(K.isInstancedBufferGeometry){const Je=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Pi=Math.min(K.instanceCount,Je);yt.renderInstances(At,Ct,Pi)}else yt.render(At,Ct)};function lt(b,z,K){b.transparent===!0&&b.side===vn&&b.forceSinglePass===!1?(b.side=en,b.needsUpdate=!0,ci(b,z,K),b.side=Vn,b.needsUpdate=!0,ci(b,z,K),b.side=vn):ci(b,z,K)}this.compile=function(b,z,K=null){K===null&&(K=b),g=De.get(K),g.init(),R.push(g),K.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(g.pushLight(q),q.castShadow&&g.pushShadow(q))}),b!==K&&b.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(g.pushLight(q),q.castShadow&&g.pushShadow(q))}),g.setupLights(T._useLegacyLights);const $=new Set;return b.traverse(function(q){const ve=q.material;if(ve)if(Array.isArray(ve))for(let be=0;be<ve.length;be++){const Pe=ve[be];lt(Pe,K,q),$.add(Pe)}else lt(ve,K,q),$.add(ve)}),R.pop(),g=null,$},this.compileAsync=function(b,z,K=null){const $=this.compile(b,z,K);return new Promise(q=>{function ve(){if($.forEach(function(be){je.get(be).currentProgram.isReady()&&$.delete(be)}),$.size===0){q(b);return}setTimeout(ve,10)}Le.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let ht=null;function Rt(b){ht&&ht(b)}function Ut(){Nt.stop()}function dt(){Nt.start()}const Nt=new jl;Nt.setAnimationLoop(Rt),typeof self<"u"&&Nt.setContext(self),this.setAnimationLoop=function(b){ht=b,Ye.setAnimationLoop(b),b===null?Nt.stop():Nt.start()},Ye.addEventListener("sessionstart",Ut),Ye.addEventListener("sessionend",dt),this.render=function(b,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(z),z=Ye.getCamera()),b.isScene===!0&&b.onBeforeRender(T,b,z,P),g=De.get(b,R.length),g.init(),R.push(g),we.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),J.setFromProjectionMatrix(we),_e=this.localClippingEnabled,re=Fe.init(this.clippingPlanes,_e),M=ye.get(b,p.length),M.init(),p.push(M),tn(b,z,0,T.sortObjects),M.finish(),T.sortObjects===!0&&M.sort(Z,ee),this.info.render.frame++,re===!0&&Fe.beginShadows();const K=g.state.shadowsArray;if(oe.render(K,b,z),re===!0&&Fe.endShadows(),this.info.autoReset===!0&&this.info.reset(),st.render(M,b),g.setupLights(T._useLegacyLights),z.isArrayCamera){const $=z.cameras;for(let q=0,ve=$.length;q<ve;q++){const be=$[q];vr(M,b,be,be.viewport)}}else vr(M,b,z);P!==null&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(T,b,z),We.resetDefaultState(),ne=-1,A=null,R.pop(),R.length>0?g=R[R.length-1]:g=null,p.pop(),p.length>0?M=p[p.length-1]:M=null};function tn(b,z,K,$){if(b.visible===!1)return;if(b.layers.test(z.layers)){if(b.isGroup)K=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(z);else if(b.isLight)g.pushLight(b),b.castShadow&&g.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||J.intersectsSprite(b)){$&&ke.setFromMatrixPosition(b.matrixWorld).applyMatrix4(we);const be=ue.update(b),Pe=b.material;Pe.visible&&M.push(b,be,Pe,K,ke.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||J.intersectsObject(b))){const be=ue.update(b),Pe=b.material;if($&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ke.copy(b.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),ke.copy(be.boundingSphere.center)),ke.applyMatrix4(b.matrixWorld).applyMatrix4(we)),Array.isArray(Pe)){const Oe=be.groups;for(let Ke=0,Xe=Oe.length;Ke<Xe;Ke++){const qe=Oe[Ke],At=Pe[qe.materialIndex];At&&At.visible&&M.push(b,be,At,K,ke.z,qe)}}else Pe.visible&&M.push(b,be,Pe,K,ke.z,null)}}const ve=b.children;for(let be=0,Pe=ve.length;be<Pe;be++)tn(ve[be],z,K,$)}function vr(b,z,K,$){const q=b.opaque,ve=b.transmissive,be=b.transparent;g.setupLightsView(K),re===!0&&Fe.setGlobalState(T.clippingPlanes,K),ve.length>0&&ks(q,ve,z,K),$&&Se.viewport(y.copy($)),q.length>0&&Ci(q,z,K),ve.length>0&&Ci(ve,z,K),be.length>0&&Ci(be,z,K),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function ks(b,z,K,$){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;const ve=Ve.isWebGL2;Ce===null&&(Ce=new wi(1,1,{generateMipmaps:!0,type:Le.has("EXT_color_buffer_half_float")?Or:ii,minFilter:bi,samples:ve?4:0})),T.getDrawingBufferSize(ze),ve?Ce.setSize(ze.x,ze.y):Ce.setSize(Ds(ze.x),Ds(ze.y));const be=T.getRenderTarget();T.setRenderTarget(Ce),T.getClearColor(te),N=T.getClearAlpha(),N<1&&T.setClearColor(16777215,.5),T.clear();const Pe=T.toneMapping;T.toneMapping=ni,Ci(b,K,$),w.updateMultisampleRenderTarget(Ce),w.updateRenderTargetMipmap(Ce);let Oe=!1;for(let Ke=0,Xe=z.length;Ke<Xe;Ke++){const qe=z[Ke],At=qe.object,kt=qe.geometry,Ct=qe.material,dn=qe.group;if(Ct.side===vn&&At.layers.test($.layers)){const yt=Ct.side;Ct.side=en,Ct.needsUpdate=!0,ai(At,K,$,kt,Ct,dn),Ct.side=yt,Ct.needsUpdate=!0,Oe=!0}}Oe===!0&&(w.updateMultisampleRenderTarget(Ce),w.updateRenderTargetMipmap(Ce)),T.setRenderTarget(be),T.setClearColor(te,N),T.toneMapping=Pe}function Ci(b,z,K){const $=z.isScene===!0?z.overrideMaterial:null;for(let q=0,ve=b.length;q<ve;q++){const be=b[q],Pe=be.object,Oe=be.geometry,Ke=$===null?be.material:$,Xe=be.group;Pe.layers.test(K.layers)&&ai(Pe,z,K,Oe,Ke,Xe)}}function ai(b,z,K,$,q,ve){b.onBeforeRender(T,z,K,$,q,ve),b.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(T,z,K,$,b,ve),q.transparent===!0&&q.side===vn&&q.forceSinglePass===!1?(q.side=en,q.needsUpdate=!0,T.renderBufferDirect(K,z,$,q,b,ve),q.side=Vn,q.needsUpdate=!0,T.renderBufferDirect(K,z,$,q,b,ve),q.side=vn):T.renderBufferDirect(K,z,$,q,b,ve),b.onAfterRender(T,z,K,$,q,ve)}function ci(b,z,K){z.isScene!==!0&&(z=Ie);const $=je.get(b),q=g.state.lights,ve=g.state.shadowsArray,be=q.state.version,Pe=Ae.getParameters(b,q.state,ve,z,K),Oe=Ae.getProgramCacheKey(Pe);let Ke=$.programs;$.environment=b.isMeshStandardMaterial?z.environment:null,$.fog=z.fog,$.envMap=(b.isMeshStandardMaterial?Y:E).get(b.envMap||$.environment),Ke===void 0&&(b.addEventListener("dispose",le),Ke=new Map,$.programs=Ke);let Xe=Ke.get(Oe);if(Xe!==void 0){if($.currentProgram===Xe&&$.lightsStateVersion===be)return xr(b,Pe),Xe}else Pe.uniforms=Ae.getUniforms(b),b.onBuild(K,Pe,T),b.onBeforeCompile(Pe,T),Xe=Ae.acquireProgram(Pe,Oe),Ke.set(Oe,Xe),$.uniforms=Pe.uniforms;const qe=$.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(qe.clippingPlanes=Fe.uniform),xr(b,Pe),$.needsLights=Vr(b),$.lightsStateVersion=be,$.needsLights&&(qe.ambientLightColor.value=q.state.ambient,qe.lightProbe.value=q.state.probe,qe.directionalLights.value=q.state.directional,qe.directionalLightShadows.value=q.state.directionalShadow,qe.spotLights.value=q.state.spot,qe.spotLightShadows.value=q.state.spotShadow,qe.rectAreaLights.value=q.state.rectArea,qe.ltc_1.value=q.state.rectAreaLTC1,qe.ltc_2.value=q.state.rectAreaLTC2,qe.pointLights.value=q.state.point,qe.pointLightShadows.value=q.state.pointShadow,qe.hemisphereLights.value=q.state.hemi,qe.directionalShadowMap.value=q.state.directionalShadowMap,qe.directionalShadowMatrix.value=q.state.directionalShadowMatrix,qe.spotShadowMap.value=q.state.spotShadowMap,qe.spotLightMatrix.value=q.state.spotLightMatrix,qe.spotLightMap.value=q.state.spotLightMap,qe.pointShadowMap.value=q.state.pointShadowMap,qe.pointShadowMatrix.value=q.state.pointShadowMatrix),$.currentProgram=Xe,$.uniformsList=null,Xe}function li(b){if(b.uniformsList===null){const z=b.currentProgram.getUniforms();b.uniformsList=Ts.seqWithValue(z.seq,b.uniforms)}return b.uniformsList}function xr(b,z){const K=je.get(b);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function kr(b,z,K,$,q){z.isScene!==!0&&(z=Ie),w.resetTextureUnits();const ve=z.fog,be=$.isMeshStandardMaterial?z.environment:null,Pe=P===null?T.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ht,Oe=($.isMeshStandardMaterial?Y:E).get($.envMap||be),Ke=$.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Xe=!!K.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),qe=!!K.morphAttributes.position,At=!!K.morphAttributes.normal,kt=!!K.morphAttributes.color;let Ct=ni;$.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Ct=T.toneMapping);const dn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,yt=dn!==void 0?dn.length:0,Je=je.get($),Pi=g.state.lights;if(re===!0&&(_e===!0||b!==A)){const jt=b===A&&$.id===ne;Fe.setState($,b,jt)}let Mt=!1;$.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==Pi.state.version||Je.outputColorSpace!==Pe||q.isBatchedMesh&&Je.batching===!1||!q.isBatchedMesh&&Je.batching===!0||q.isInstancedMesh&&Je.instancing===!1||!q.isInstancedMesh&&Je.instancing===!0||q.isSkinnedMesh&&Je.skinning===!1||!q.isSkinnedMesh&&Je.skinning===!0||q.isInstancedMesh&&Je.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Je.instancingColor===!1&&q.instanceColor!==null||Je.envMap!==Oe||$.fog===!0&&Je.fog!==ve||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==Fe.numPlanes||Je.numIntersection!==Fe.numIntersection)||Je.vertexAlphas!==Ke||Je.vertexTangents!==Xe||Je.morphTargets!==qe||Je.morphNormals!==At||Je.morphColors!==kt||Je.toneMapping!==Ct||Ve.isWebGL2===!0&&Je.morphTargetsCount!==yt)&&(Mt=!0):(Mt=!0,Je.__version=$.version);let pn=Je.currentProgram;Mt===!0&&(pn=ci($,z,q));let yr=!1,Ln=!1,Pn=!1;const pt=pn.getUniforms(),In=Je.uniforms;if(Se.useProgram(pn.program)&&(yr=!0,Ln=!0,Pn=!0),$.id!==ne&&(ne=$.id,Ln=!0),yr||A!==b){pt.setValue(V,"projectionMatrix",b.projectionMatrix),pt.setValue(V,"viewMatrix",b.matrixWorldInverse);const jt=pt.map.cameraPosition;jt!==void 0&&jt.setValue(V,ke.setFromMatrixPosition(b.matrixWorld)),Ve.logarithmicDepthBuffer&&pt.setValue(V,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&pt.setValue(V,"isOrthographic",b.isOrthographicCamera===!0),A!==b&&(A=b,Ln=!0,Pn=!0)}if(q.isSkinnedMesh){pt.setOptional(V,q,"bindMatrix"),pt.setOptional(V,q,"bindMatrixInverse");const jt=q.skeleton;jt&&(Ve.floatVertexTextures?(jt.boneTexture===null&&jt.computeBoneTexture(),pt.setValue(V,"boneTexture",jt.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}q.isBatchedMesh&&(pt.setOptional(V,q,"batchingTexture"),pt.setValue(V,"batchingTexture",q._matricesTexture,w));const Mr=K.morphAttributes;if((Mr.position!==void 0||Mr.normal!==void 0||Mr.color!==void 0&&Ve.isWebGL2===!0)&&$e.update(q,K,pn),(Ln||Je.receiveShadow!==q.receiveShadow)&&(Je.receiveShadow=q.receiveShadow,pt.setValue(V,"receiveShadow",q.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(In.envMap.value=Oe,In.flipEnvMap.value=Oe.isCubeTexture&&Oe.isRenderTargetTexture===!1?-1:1),Ln&&(pt.setValue(V,"toneMappingExposure",T.toneMappingExposure),Je.needsLights&&Li(In,Pn),ve&&$.fog===!0&&ge.refreshFogUniforms(In,ve),ge.refreshMaterialUniforms(In,$,X,F,Ce),Ts.upload(V,li(Je),In,w)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Ts.upload(V,li(Je),In,w),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&pt.setValue(V,"center",q.center),pt.setValue(V,"modelViewMatrix",q.modelViewMatrix),pt.setValue(V,"normalMatrix",q.normalMatrix),pt.setValue(V,"modelMatrix",q.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const jt=$.uniformsGroups;for(let Ii=0,$t=jt.length;Ii<$t;Ii++)if(Ve.isWebGL2){const Sr=jt[Ii];at.update(Sr,pn),at.bind(Sr,pn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return pn}function Li(b,z){b.ambientLightColor.needsUpdate=z,b.lightProbe.needsUpdate=z,b.directionalLights.needsUpdate=z,b.directionalLightShadows.needsUpdate=z,b.pointLights.needsUpdate=z,b.pointLightShadows.needsUpdate=z,b.spotLights.needsUpdate=z,b.spotLightShadows.needsUpdate=z,b.rectAreaLights.needsUpdate=z,b.hemisphereLights.needsUpdate=z}function Vr(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,z,K){je.get(b.texture).__webglTexture=z,je.get(b.depthTexture).__webglTexture=K;const $=je.get(b);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=K===void 0,$.__autoAllocateDepthBuffer||Le.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,z){const K=je.get(b);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(b,z=0,K=0){P=b,B=z,D=K;let $=!0,q=null,ve=!1,be=!1;if(b){const Oe=je.get(b);Oe.__useDefaultFramebuffer!==void 0?(Se.bindFramebuffer(V.FRAMEBUFFER,null),$=!1):Oe.__webglFramebuffer===void 0?w.setupRenderTarget(b):Oe.__hasExternalTextures&&w.rebindTextures(b,je.get(b.texture).__webglTexture,je.get(b.depthTexture).__webglTexture);const Ke=b.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(be=!0);const Xe=je.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Xe[z])?q=Xe[z][K]:q=Xe[z],ve=!0):Ve.isWebGL2&&b.samples>0&&w.useMultisampledRTT(b)===!1?q=je.get(b).__webglMultisampledFramebuffer:Array.isArray(Xe)?q=Xe[K]:q=Xe,y.copy(b.viewport),I.copy(b.scissor),W=b.scissorTest}else y.copy(ie).multiplyScalar(X).floor(),I.copy(he).multiplyScalar(X).floor(),W=ae;if(Se.bindFramebuffer(V.FRAMEBUFFER,q)&&Ve.drawBuffers&&$&&Se.drawBuffers(b,q),Se.viewport(y),Se.scissor(I),Se.setScissorTest(W),ve){const Oe=je.get(b.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+z,Oe.__webglTexture,K)}else if(be){const Oe=je.get(b.texture),Ke=z||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Oe.__webglTexture,K||0,Ke)}ne=-1},this.readRenderTargetPixels=function(b,z,K,$,q,ve,be){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=je.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&be!==void 0&&(Pe=Pe[be]),Pe){Se.bindFramebuffer(V.FRAMEBUFFER,Pe);try{const Oe=b.texture,Ke=Oe.format,Xe=Oe.type;if(Ke!==hn&&xe.convert(Ke)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const qe=Xe===Or&&(Le.has("EXT_color_buffer_half_float")||Ve.isWebGL2&&Le.has("EXT_color_buffer_float"));if(Xe!==ii&&xe.convert(Xe)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Xe===zn&&(Ve.isWebGL2||Le.has("OES_texture_float")||Le.has("WEBGL_color_buffer_float")))&&!qe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=b.width-$&&K>=0&&K<=b.height-q&&V.readPixels(z,K,$,q,xe.convert(Ke),xe.convert(Xe),ve)}finally{const Oe=P!==null?je.get(P).__webglFramebuffer:null;Se.bindFramebuffer(V.FRAMEBUFFER,Oe)}}},this.copyFramebufferToTexture=function(b,z,K=0){const $=Math.pow(2,-K),q=Math.floor(z.image.width*$),ve=Math.floor(z.image.height*$);w.setTexture2D(z,0),V.copyTexSubImage2D(V.TEXTURE_2D,K,0,0,b.x,b.y,q,ve),Se.unbindTexture()},this.copyTextureToTexture=function(b,z,K,$=0){const q=z.image.width,ve=z.image.height,be=xe.convert(K.format),Pe=xe.convert(K.type);w.setTexture2D(K,0),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,K.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,K.unpackAlignment),z.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,$,b.x,b.y,q,ve,be,Pe,z.image.data):z.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,$,b.x,b.y,z.mipmaps[0].width,z.mipmaps[0].height,be,z.mipmaps[0].data):V.texSubImage2D(V.TEXTURE_2D,$,b.x,b.y,be,Pe,z.image),$===0&&K.generateMipmaps&&V.generateMipmap(V.TEXTURE_2D),Se.unbindTexture()},this.copyTextureToTexture3D=function(b,z,K,$,q=0){if(T.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ve=b.max.x-b.min.x+1,be=b.max.y-b.min.y+1,Pe=b.max.z-b.min.z+1,Oe=xe.convert($.format),Ke=xe.convert($.type);let Xe;if($.isData3DTexture)w.setTexture3D($,0),Xe=V.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)w.setTexture2DArray($,0),Xe=V.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,$.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,$.unpackAlignment);const qe=V.getParameter(V.UNPACK_ROW_LENGTH),At=V.getParameter(V.UNPACK_IMAGE_HEIGHT),kt=V.getParameter(V.UNPACK_SKIP_PIXELS),Ct=V.getParameter(V.UNPACK_SKIP_ROWS),dn=V.getParameter(V.UNPACK_SKIP_IMAGES),yt=K.isCompressedTexture?K.mipmaps[q]:K.image;V.pixelStorei(V.UNPACK_ROW_LENGTH,yt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,yt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,b.min.x),V.pixelStorei(V.UNPACK_SKIP_ROWS,b.min.y),V.pixelStorei(V.UNPACK_SKIP_IMAGES,b.min.z),K.isDataTexture||K.isData3DTexture?V.texSubImage3D(Xe,q,z.x,z.y,z.z,ve,be,Pe,Oe,Ke,yt.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),V.compressedTexSubImage3D(Xe,q,z.x,z.y,z.z,ve,be,Pe,Oe,yt.data)):V.texSubImage3D(Xe,q,z.x,z.y,z.z,ve,be,Pe,Oe,Ke,yt),V.pixelStorei(V.UNPACK_ROW_LENGTH,qe),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,At),V.pixelStorei(V.UNPACK_SKIP_PIXELS,kt),V.pixelStorei(V.UNPACK_SKIP_ROWS,Ct),V.pixelStorei(V.UNPACK_SKIP_IMAGES,dn),q===0&&$.generateMipmaps&&V.generateMipmap(Xe),Se.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?w.setTextureCube(b,0):b.isData3DTexture?w.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?w.setTexture2DArray(b,0):w.setTexture2D(b,0),Se.unbindTexture()},this.resetState=function(){B=0,D=0,P=null,Se.reset(),We.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===$o?"display-p3":"srgb",t.unpackColorSpace=ut.workingColorSpace===Os?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===wt?Ai:Dl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ai?wt:Ht}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class n_ extends Ql{}n_.prototype.isWebGL1Renderer=!0;class i_ extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class r_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ho,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qt=new G;class na{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=An(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=An(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=An(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=An(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array),s=mt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new na(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Jc=new G,Qc=new _t,el=new _t,s_=new G,tl=new tt,ps=new G,Eo=new Rn,nl=new tt,To=new Fs;class o_ extends Bt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Oa,this.bindMatrix=new tt,this.bindMatrixInverse=new tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new wn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ps),this.boundingBox.expandByPoint(ps)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Rn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ps),this.boundingSphere.expandByPoint(ps)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Eo.copy(this.boundingSphere),Eo.applyMatrix4(i),e.ray.intersectsSphere(Eo)!==!1&&(nl.copy(i).invert(),To.copy(e.ray).applyMatrix4(nl),!(this.boundingBox!==null&&To.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,To)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new _t,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Oa?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ph?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Qc.fromBufferAttribute(i.attributes.skinIndex,e),el.fromBufferAttribute(i.attributes.skinWeight,e),Jc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=el.getComponent(s);if(o!==0){const a=Qc.getComponent(s);tl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(s_.copy(Jc).applyMatrix4(tl),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class eu extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class a_ extends zt{constructor(e=null,t=1,n=1,i,s,o,a,l,u=Ft,h=Ft,f,d){super(null,o,a,l,u,h,i,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const il=new tt,c_=new tt;class ia{constructor(e=[],t=[]){this.uuid=xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new tt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new tt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:c_;il.multiplyMatrices(a,t[s]),il.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ia(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new a_(t,e,e,hn,zn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new eu),this.bones.push(o),this.boneInverses.push(new tt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Vo extends Zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ki=new tt,rl=new tt,ms=[],sl=new wn,l_=new tt,Rr=new Bt,Cr=new Rn;class u_ extends Bt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Vo(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,l_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ki),sl.copy(e.boundingBox).applyMatrix4(Ki),this.boundingBox.union(sl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Rn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ki),Cr.copy(e.boundingSphere).applyMatrix4(Ki),this.boundingSphere.union(Cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Rr.geometry=this.geometry,Rr.material=this.material,Rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(n),e.ray.intersectsSphere(Cr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ki),rl.multiplyMatrices(n,Ki),Rr.matrixWorld=rl,Rr.raycast(e,ms);for(let o=0,a=ms.length;o<a;o++){const l=ms[o];l.instanceId=s,l.object=this,t.push(l)}ms.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Vo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class ra extends yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ol=new G,al=new G,cl=new tt,Ao=new Fs,gs=new Rn;class sa extends bt{constructor(e=new Sn,t=new ra){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ol.fromBufferAttribute(t,i-1),al.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ol.distanceTo(al);e.setAttribute("lineDistance",new bn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gs.copy(n.boundingSphere),gs.applyMatrix4(i),gs.radius+=s,e.ray.intersectsSphere(gs)===!1)return;cl.copy(i).invert(),Ao.copy(e.ray).applyMatrix4(cl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=new G,h=new G,f=new G,d=new G,_=this.isLineSegments?2:1,x=n.index,g=n.attributes.position;if(x!==null){const p=Math.max(0,o.start),R=Math.min(x.count,o.start+o.count);for(let T=p,C=R-1;T<C;T+=_){const B=x.getX(T),D=x.getX(T+1);if(u.fromBufferAttribute(g,B),h.fromBufferAttribute(g,D),Ao.distanceSqToSegment(u,h,d,f)>l)continue;d.applyMatrix4(this.matrixWorld);const ne=e.ray.origin.distanceTo(d);ne<e.near||ne>e.far||t.push({distance:ne,point:f.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),R=Math.min(g.count,o.start+o.count);for(let T=p,C=R-1;T<C;T+=_){if(u.fromBufferAttribute(g,T),h.fromBufferAttribute(g,T+1),Ao.distanceSqToSegment(u,h,d,f)>l)continue;d.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(d);D<e.near||D>e.far||t.push({distance:D,point:f.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const ll=new G,ul=new G;class tu extends sa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)ll.fromBufferAttribute(t,i),ul.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ll.distanceTo(ul);e.setAttribute("lineDistance",new bn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class h_ extends sa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class nu extends yn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hl=new tt,Wo=new Fs,_s=new Rn,vs=new G;class f_ extends bt{constructor(e=new Sn,t=new nu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_s.copy(n.boundingSphere),_s.applyMatrix4(i),_s.radius+=s,e.ray.intersectsSphere(_s)===!1)return;hl.copy(i).invert(),Wo.copy(e.ray).applyMatrix4(hl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let x=d,M=_;x<M;x++){const g=u.getX(x);vs.fromBufferAttribute(f,g),fl(vs,g,l,i,e,t,this)}}else{const d=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let x=d,M=_;x<M;x++)vs.fromBufferAttribute(f,x),fl(vs,x,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function fl(r,e,t,n,i,s,o){const a=Wo.distanceSqToPoint(r);if(a<t){const l=new G;Wo.closestPointToPoint(r,l),l.applyMatrix4(n);const u=i.ray.origin.distanceTo(l);if(u<i.near||u>i.far)return;s.push({distance:u,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}const xs=new G,ys=new G,bo=new G,Ms=new ln;class d_ extends Sn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Qi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,u=[0,0,0],h=["a","b","c"],f=new Array(3),d={},_=[];for(let x=0;x<l;x+=3){o?(u[0]=o.getX(x),u[1]=o.getX(x+1),u[2]=o.getX(x+2)):(u[0]=x,u[1]=x+1,u[2]=x+2);const{a:M,b:g,c:p}=Ms;if(M.fromBufferAttribute(a,u[0]),g.fromBufferAttribute(a,u[1]),p.fromBufferAttribute(a,u[2]),Ms.getNormal(bo),f[0]=`${Math.round(M.x*i)},${Math.round(M.y*i)},${Math.round(M.z*i)}`,f[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,f[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let R=0;R<3;R++){const T=(R+1)%3,C=f[R],B=f[T],D=Ms[h[R]],P=Ms[h[T]],ne=`${C}_${B}`,A=`${B}_${C}`;A in d&&d[A]?(bo.dot(d[A].normal)<=s&&(_.push(D.x,D.y,D.z),_.push(P.x,P.y,P.z)),d[A]=null):ne in d||(d[ne]={index0:u[R],index1:u[T],normal:bo.clone()})}}for(const x in d)if(d[x]){const{index0:M,index1:g}=d[x];xs.fromBufferAttribute(a,M),ys.fromBufferAttribute(a,g),_.push(xs.x,xs.y,xs.z),_.push(ys.x,ys.y,ys.z)}this.setAttribute("position",new bn(_,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class oa extends yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zo,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wn extends oa{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class p_ extends yn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ne(16777215),this.specular=new Ne(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zo,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Ss(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function m_(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function g_(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function dl(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function iu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Hr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class __ extends Hr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cc,endingEnd:cc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case lc:s=e,a=2*t-n;break;case uc:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case lc:o=e,l=2*n-t;break;case uc:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const u=(n-t)*.5,h=this.valueSize;this._weightPrev=u/(t-a),this._weightNext=u/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,u=l-a,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,_=this._weightNext,x=(n-t)/(i-t),M=x*x,g=M*x,p=-d*g+2*d*M-d*x,R=(1+d)*g+(-1.5-2*d)*M+(-.5+d)*x+1,T=(-1-_)*g+(1.5+_)*M+.5*x,C=_*g-_*M;for(let B=0;B!==a;++B)s[B]=p*o[h+B]+R*o[u+B]+T*o[l+B]+C*o[f+B];return s}}class v_ extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,u=l-a,h=(n-t)/(i-t),f=1-h;for(let d=0;d!==a;++d)s[d]=o[u+d]*f+o[l+d]*h;return s}}class x_ extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Cn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ss(t,this.TimeBufferType),this.values=Ss(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ss(e.times,Array),values:Ss(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new x_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new v_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new __(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fr:t=this.InterpolantFactoryMethodDiscrete;break;case ar:t=this.InterpolantFactoryMethodLinear;break;case Js:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fr;case this.InterpolantFactoryMethodLinear:return ar;case this.InterpolantFactoryMethodSmooth:return Js}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&m_(i))for(let a=0,l=i.length;a!==l;++a){const u=i[a];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,u),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Js,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const u=e[a],h=e[a+1];if(u!==h&&(a!==1||u!==e[0]))if(i)l=!0;else{const f=a*n,d=f-n,_=f+n;for(let x=0;x!==n;++x){const M=t[f+x];if(M!==t[d+x]||M!==t[_+x]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const f=a*n,d=o*n;for(let _=0;_!==n;++_)t[d+_]=t[f+_]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,u=0;u!==n;++u)t[l+u]=t[a+u];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=ar;class mr extends Cn{}mr.prototype.ValueTypeName="bool";mr.prototype.ValueBufferType=Array;mr.prototype.DefaultInterpolation=Fr;mr.prototype.InterpolantFactoryMethodLinear=void 0;mr.prototype.InterpolantFactoryMethodSmooth=void 0;class ru extends Cn{}ru.prototype.ValueTypeName="color";class ur extends Cn{}ur.prototype.ValueTypeName="number";class y_ extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let u=e*a;for(let h=u+a;u!==h;u+=4)si.slerpFlat(s,0,o,u-a,o,u,l);return s}}class Ri extends Cn{InterpolantFactoryMethodLinear(e){return new y_(this.times,this.values,this.getValueSize(),e)}}Ri.prototype.ValueTypeName="quaternion";Ri.prototype.DefaultInterpolation=ar;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;class gr extends Cn{}gr.prototype.ValueTypeName="string";gr.prototype.ValueBufferType=Array;gr.prototype.DefaultInterpolation=Fr;gr.prototype.InterpolantFactoryMethodLinear=void 0;gr.prototype.InterpolantFactoryMethodSmooth=void 0;class hr extends Cn{}hr.prototype.ValueTypeName="vector";class M_{constructor(e,t=-1,n,i=Eh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=xn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(E_(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Cn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],u=[];l.push((a+s-1)%s,a,(a+1)%s),u.push(0,1,0);const h=g_(l);l=dl(l,1,h),u=dl(u,1,h),!i&&l[0]===0&&(l.push(s),u.push(u[0])),o.push(new ur(".morphTargetInfluences["+t[a].name+"]",l,u).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const u=e[a],h=u.name.match(s);if(h&&h.length>1){const f=h[1];let d=i[f];d||(i[f]=d=[]),d.push(u)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,d,_,x,M){if(_.length!==0){const g=[],p=[];iu(_,g,p,x),g.length!==0&&M.push(new f(d,g,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const u=e.hierarchy||[];for(let f=0;f<u.length;f++){const d=u[f].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const _={};let x;for(x=0;x<d.length;x++)if(d[x].morphTargets)for(let M=0;M<d[x].morphTargets.length;M++)_[d[x].morphTargets[M]]=-1;for(const M in _){const g=[],p=[];for(let R=0;R!==d[x].morphTargets.length;++R){const T=d[x];g.push(T.time),p.push(T.morphTarget===M?1:0)}i.push(new ur(".morphTargetInfluence["+M+"]",g,p))}l=_.length*o}else{const _=".bones["+t[f].name+"]";n(hr,_+".position",d,"pos",i),n(Ri,_+".quaternion",d,"rot",i),n(hr,_+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function S_(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ur;case"vector":case"vector2":case"vector3":case"vector4":return hr;case"color":return ru;case"quaternion":return Ri;case"bool":case"boolean":return mr;case"string":return gr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function E_(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=S_(r.type);if(r.times===void 0){const t=[],n=[];iu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const ei={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class T_{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return u.push(h,f),this},this.removeHandler=function(h){const f=u.indexOf(h);return f!==-1&&u.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=u.length;f<d;f+=2){const _=u[f],x=u[f+1];if(_.global&&(_.lastIndex=0),_.test(h))return x}return null}}}const A_=new T_;class _r{constructor(e){this.manager=e!==void 0?e:A_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}_r.DEFAULT_MATERIAL_NAME="__DEFAULT";const Bn={};class b_ extends Error{constructor(e,t){super(e),this.response=t}}class su extends _r{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ei.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Bn[e]!==void 0){Bn[e].push({onLoad:t,onProgress:n,onError:i});return}Bn[e]=[],Bn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(u=>{if(u.status===200||u.status===0){if(u.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||u.body===void 0||u.body.getReader===void 0)return u;const h=Bn[e],f=u.body.getReader(),d=u.headers.get("Content-Length")||u.headers.get("X-File-Size"),_=d?parseInt(d):0,x=_!==0;let M=0;const g=new ReadableStream({start(p){R();function R(){f.read().then(({done:T,value:C})=>{if(T)p.close();else{M+=C.byteLength;const B=new ProgressEvent("progress",{lengthComputable:x,loaded:M,total:_});for(let D=0,P=h.length;D<P;D++){const ne=h[D];ne.onProgress&&ne.onProgress(B)}p.enqueue(C),R()}})}}});return new Response(g)}else throw new b_(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`,u)}).then(u=>{switch(l){case"arraybuffer":return u.arrayBuffer();case"blob":return u.blob();case"document":return u.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return u.json();default:if(a===void 0)return u.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),d=f&&f[1]?f[1].toLowerCase():void 0,_=new TextDecoder(d);return u.arrayBuffer().then(x=>_.decode(x))}}}).then(u=>{ei.add(e,u);const h=Bn[e];delete Bn[e];for(let f=0,d=h.length;f<d;f++){const _=h[f];_.onLoad&&_.onLoad(u)}}).catch(u=>{const h=Bn[e];if(h===void 0)throw this.manager.itemError(e),u;delete Bn[e];for(let f=0,d=h.length;f<d;f++){const _=h[f];_.onError&&_.onError(u)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class w_ extends _r{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ei.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Br("img");function l(){h(),ei.add(e,this),t&&t(this),s.manager.itemEnd(e)}function u(f){h(),i&&i(f),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",u,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class R_ extends _r{constructor(e){super(e)}load(e,t,n,i){const s=new zt,o=new w_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Gs extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const wo=new tt,pl=new G,ml=new G;class aa{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qo,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;pl.setFromMatrixPosition(e.matrixWorld),t.position.copy(pl),ml.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ml),t.updateMatrixWorld(),wo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class C_ extends aa{constructor(){super(new Kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=cr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class L_ extends Gs{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new C_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const gl=new tt,Lr=new G,Ro=new G;class P_ extends aa{constructor(){super(new Kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new it(4,2),this._viewportCount=6,this._viewports=[new _t(2,1,1,1),new _t(0,1,1,1),new _t(3,1,1,1),new _t(1,1,1,1),new _t(3,0,1,1),new _t(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Lr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Lr),Ro.copy(n.position),Ro.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ro),n.updateMatrixWorld(),i.makeTranslation(-Lr.x,-Lr.y,-Lr.z),gl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gl)}}class ou extends Gs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new P_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class I_ extends aa{constructor(){super(new ea(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class au extends Gs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new I_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class D_ extends Gs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ur{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class U_ extends _r{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ei.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(u=>{t&&t(u),s.manager.itemEnd(e)}).catch(u=>{i&&i(u)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(u){return u.blob()}).then(function(u){return createImageBitmap(u,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(u){return ei.add(e,u),t&&t(u),s.manager.itemEnd(e),u}).catch(function(u){i&&i(u),ei.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});ei.add(e,l),s.manager.itemStart(e)}}const ca="\\[\\]\\.:\\/",N_=new RegExp("["+ca+"]","g"),la="[^"+ca+"]",O_="[^"+ca.replace("\\.","")+"]",F_=/((?:WC+[\/:])*)/.source.replace("WC",la),B_=/(WCOD+)?/.source.replace("WCOD",O_),H_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",la),G_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",la),z_=new RegExp("^"+F_+B_+H_+G_+"$"),k_=["material","materials","bones","map"];class V_{constructor(e,t,n){const i=n||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ft{constructor(e,t,n){this.path=t,this.parsedPath=n||ft.parseTrackName(t),this.node=ft.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ft.Composite(e,t,n):new ft(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(N_,"")}static parseTrackName(e){const t=z_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);k_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=ft.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===u){u=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(u!==void 0){if(e[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}const o=e[i];if(o===void 0){const u=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ft.Composite=V_;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qo);function _l(r,e){if(e===Th)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Bo||e===Il){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Bo)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class W_ extends _r{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new K_(t)}),this.register(function(t){return new r0(t)}),this.register(function(t){return new s0(t)}),this.register(function(t){return new o0(t)}),this.register(function(t){return new $_(t)}),this.register(function(t){return new J_(t)}),this.register(function(t){return new Q_(t)}),this.register(function(t){return new e0(t)}),this.register(function(t){return new Y_(t)}),this.register(function(t){return new t0(t)}),this.register(function(t){return new Z_(t)}),this.register(function(t){return new i0(t)}),this.register(function(t){return new n0(t)}),this.register(function(t){return new j_(t)}),this.register(function(t){return new a0(t)}),this.register(function(t){return new c0(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const u=Ur.extractUrlBase(e);o=Ur.resolveURL(u,this.path)}else o=Ur.extractUrlBase(e);this.manager.itemStart(e);const a=function(u){i?i(u):console.error(u),s.manager.itemError(e),s.manager.itemEnd(e)},l=new su(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(u){try{s.parse(u,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===cu){try{o[nt.KHR_BINARY_GLTF]=new l0(e)}catch(f){i&&i(f);return}s=JSON.parse(o[nt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const u=new S0(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});u.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const f=this.pluginCallbacks[h](u);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const f=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(f){case nt.KHR_MATERIALS_UNLIT:o[f]=new q_;break;case nt.KHR_DRACO_MESH_COMPRESSION:o[f]=new u0(s,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:o[f]=new h0;break;case nt.KHR_MESH_QUANTIZATION:o[f]=new f0;break;default:d.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}u.setExtensions(o),u.setPlugins(a),u.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function X_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class j_{constructor(e){this.parser=e,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let u;const h=new Ne(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ht);const f=l.range!==void 0?l.range:0;switch(l.type){case"directional":u=new au(h),u.target.position.set(0,0,-1),u.add(u.target);break;case"point":u=new ou(h),u.distance=f;break;case"spot":u=new L_(h),u.distance=f,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,u.angle=l.spot.outerConeAngle,u.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,u.target.position.set(0,0,-1),u.add(u.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return u.position.set(0,0,0),u.decay=2,Jn(u,l),l.intensity!==void 0&&(u.intensity=l.intensity),u.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(u),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class q_{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return xi}extendParams(e,t,n){const i=[];e.color=new Ne(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Ht),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,wt))}return Promise.all(i)}}class Y_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class K_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new it(a,a)}return Promise.all(s)}}class Z_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class $_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ht)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,wt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class J_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Q_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(a[0],a[1],a[2],Ht),Promise.all(s)}}class e0{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class t0{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(a[0],a[1],a[2],Ht),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,wt)),Promise.all(s)}}class n0{constructor(e){this.parser=e,this.name=nt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class i0{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class r0{constructor(e){this.parser=e,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class s0{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const u=n.options.manager.getHandler(a.uri);u!==null&&(l=u)}return this.detectSupport().then(function(u){if(u)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class o0{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const u=n.options.manager.getHandler(a.uri);u!==null&&(l=u)}return this.detectSupport().then(function(u){if(u)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class a0{constructor(e){this.name=nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,u=i.byteLength||0,h=i.count,f=i.byteStride,d=new Uint8Array(a,l,u);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,f,d,i.mode,i.filter).then(function(_){return _.buffer}):o.ready.then(function(){const _=new ArrayBuffer(h*f);return o.decodeGltfBuffer(new Uint8Array(_),h,f,d,i.mode,i.filter),_})})}else return null}}class c0{constructor(e){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const u of i.primitives)if(u.mode!==cn.TRIANGLES&&u.mode!==cn.TRIANGLE_STRIP&&u.mode!==cn.TRIANGLE_FAN&&u.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const u in o)a.push(this.parser.getDependency("accessor",o[u]).then(h=>(l[u]=h,l[u])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(u=>{const h=u.pop(),f=h.isGroup?h.children:[h],d=u[0].count,_=[];for(const x of f){const M=new tt,g=new G,p=new si,R=new G(1,1,1),T=new u_(x.geometry,x.material,d);for(let C=0;C<d;C++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,C),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,C),l.SCALE&&R.fromBufferAttribute(l.SCALE,C),T.setMatrixAt(C,M.compose(g,p,R));for(const C in l)if(C==="_COLOR_0"){const B=l[C];T.instanceColor=new Vo(B.array,B.itemSize,B.normalized)}else C!=="TRANSLATION"&&C!=="ROTATION"&&C!=="SCALE"&&x.geometry.setAttribute(C,l[C]);bt.prototype.copy.call(T,x),this.parser.assignFinalMaterial(T),_.push(T)}return h.isGroup?(h.clear(),h.add(..._),h):_[0]}))}}const cu="glTF",Pr=12,vl={JSON:1313821514,BIN:5130562};class l0{constructor(e){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Pr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==cu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Pr,s=new DataView(e,Pr);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===vl.JSON){const u=new Uint8Array(e,Pr+o,a);this.content=n.decode(u)}else if(l===vl.BIN){const u=Pr+o;this.body=e.slice(u,u+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class u0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},u={};for(const h in o){const f=Xo[h]||h.toLowerCase();a[f]=o[h]}for(const h in e.attributes){const f=Xo[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],_=tr[d.componentType];u[f]=_.name,l[f]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(f,d){i.decodeDracoFile(h,function(_){for(const x in _.attributes){const M=_.attributes[x],g=l[x];g!==void 0&&(M.normalized=g)}f(_)},a,u,Ht,d)})})}}class h0{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class f0{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}}class lu extends Hr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,u=a*3,h=i-t,f=(n-t)/h,d=f*f,_=d*f,x=e*u,M=x-u,g=-2*_+3*d,p=_-d,R=1-g,T=p-d+f;for(let C=0;C!==a;C++){const B=o[M+C+a],D=o[M+C+l]*h,P=o[x+C+a],ne=o[x+C]*h;s[C]=R*B+T*D+g*P+p*ne}return s}}const d0=new si;class p0 extends lu{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return d0.fromArray(s).normalize().toArray(s),s}}const cn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},tr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},xl={9728:Ft,9729:Qt,9984:Fo,9985:Tl,9986:Es,9987:bi},yl={33071:un,33648:Rs,10497:sr},Co={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Xo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$n={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},m0={CUBICSPLINE:void 0,LINEAR:ar,STEP:Fr},Lo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function g0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new oa({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vn})),r.DefaultMaterial}function pi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Jn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function _0(r,e,t){let n=!1,i=!1,s=!1;for(let u=0,h=e.length;u<h;u++){const f=e[u];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(i=!0),f.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let u=0,h=e.length;u<h;u++){const f=e[u];if(n){const d=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):r.attributes.position;o.push(d)}if(i){const d=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(u){const h=u[0],f=u[1],d=u[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=f),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function v0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function x0(r){let e;const t=r.extensions&&r.extensions[nt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Po(t.attributes):e=r.indices+":"+Po(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Po(r.targets[n]);return e}function Po(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function jo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function y0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const M0=new tt;class S0{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new X_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new R_(this.options.manager):this.textureLoader=new U_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new su(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return pi(s,a,i),Jn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[u,h]of o.children.entries())s(h,a.children[u])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ur.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Co[i.type],a=tr[i.componentType],l=i.normalized===!0,u=new a(i.count*o);return Promise.resolve(new Zt(u,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Co[i.type],u=tr[i.componentType],h=u.BYTES_PER_ELEMENT,f=h*l,d=i.byteOffset||0,_=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,x=i.normalized===!0;let M,g;if(_&&_!==f){const p=Math.floor(d/_),R="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let T=t.cache.get(R);T||(M=new u(a,p*_,i.count*_/h),T=new r_(M,_/h),t.cache.add(R,T)),g=new na(T,l,d%_/h,x)}else a===null?M=new u(i.count*l):M=new u(a,d,i.count*l),g=new Zt(M,l,x);if(i.sparse!==void 0){const p=Co.SCALAR,R=tr[i.sparse.indices.componentType],T=i.sparse.indices.byteOffset||0,C=i.sparse.values.byteOffset||0,B=new R(o[1],T,i.sparse.count*p),D=new u(o[2],C,i.sparse.count*l);a!==null&&(g=new Zt(g.array.slice(),g.itemSize,g.normalized));for(let P=0,ne=B.length;P<ne;P++){const A=B[P];if(g.setX(A,D[P*l]),l>=2&&g.setY(A,D[P*l+1]),l>=3&&g.setZ(A,D[P*l+2]),l>=4&&g.setW(A,D[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const u=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=xl[d.magFilter]||Qt,h.minFilter=xl[d.minFilter]||bi,h.wrapS=yl[d.wrapS]||sr,h.wrapT=yl[d.wrapT]||sr,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=u,u}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",u=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(f){u=!0;const d=new Blob([f],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(f){return new Promise(function(d,_){let x=d;t.isImageBitmapLoader===!0&&(x=function(M){const g=new zt(M);g.needsUpdate=!0,d(g)}),t.load(Ur.resolveURL(f,s.path),x,void 0,_)})}).then(function(f){return u===!0&&a.revokeObjectURL(l),f.userData.mimeType=o.mimeType||y0(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),f});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[nt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new nu,yn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new ra,yn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return oa}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},u=[];if(l[nt.KHR_MATERIALS_UNLIT]){const f=i[nt.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),u.push(f.extendParams(a,s,t))}else{const f=s.pbrMetallicRoughness||{};if(a.color=new Ne(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const d=f.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Ht),a.opacity=d[3]}f.baseColorTexture!==void 0&&u.push(t.assignTexture(a,"map",f.baseColorTexture,wt)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),u.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=vn);const h=s.alphaMode||Lo.OPAQUE;if(h===Lo.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Lo.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==xi&&(u.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new it(1,1),s.normalTexture.scale!==void 0)){const f=s.normalTexture.scale;a.normalScale.set(f,f)}if(s.occlusionTexture!==void 0&&o!==xi&&(u.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==xi){const f=s.emissiveFactor;a.emissive=new Ne().setRGB(f[0],f[1],f[2],Ht)}return s.emissiveTexture!==void 0&&o!==xi&&u.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,wt)),Promise.all(u).then(function(){const f=new o(a);return s.name&&(f.name=s.name),Jn(f,s),t.associations.set(f,{materials:e}),s.extensions&&pi(i,f,s),f})}createUniqueName(e){const t=ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Ml(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const u=e[a],h=x0(u),f=i[h];if(f)o.push(f.promise);else{let d;u.extensions&&u.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?d=s(u):d=Ml(new Sn,u,t),i[h]={primitive:u,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,u=o.length;l<u;l++){const h=o[l].material===void 0?g0(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const u=l.slice(0,l.length-1),h=l[l.length-1],f=[];for(let _=0,x=h.length;_<x;_++){const M=h[_],g=o[_];let p;const R=u[_];if(g.mode===cn.TRIANGLES||g.mode===cn.TRIANGLE_STRIP||g.mode===cn.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new o_(M,R):new Bt(M,R),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===cn.TRIANGLE_STRIP?p.geometry=_l(p.geometry,Il):g.mode===cn.TRIANGLE_FAN&&(p.geometry=_l(p.geometry,Bo));else if(g.mode===cn.LINES)p=new tu(M,R);else if(g.mode===cn.LINE_STRIP)p=new sa(M,R);else if(g.mode===cn.LINE_LOOP)p=new h_(M,R);else if(g.mode===cn.POINTS)p=new f_(M,R);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&v0(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Jn(p,s),g.extensions&&pi(i,p,g),t.assignFinalMaterial(p),f.push(p)}for(let _=0,x=f.length;_<x;_++)t.associations.set(f[_],{meshes:e,primitives:_});if(f.length===1)return s.extensions&&pi(i,f[0],s),f[0];const d=new yi;s.extensions&&pi(i,d,s),t.associations.set(d,{meshes:e});for(let _=0,x=f.length;_<x;_++)d.add(f[_]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Kt(Kh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ea(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Jn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let u=0,h=o.length;u<h;u++){const f=o[u];if(f){a.push(f);const d=new tt;s!==null&&d.fromArray(s.array,u*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[u])}return new ia(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],u=[],h=[];for(let f=0,d=i.channels.length;f<d;f++){const _=i.channels[f],x=i.samplers[_.sampler],M=_.target,g=M.node,p=i.parameters!==void 0?i.parameters[x.input]:x.input,R=i.parameters!==void 0?i.parameters[x.output]:x.output;M.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",R)),u.push(x),h.push(M))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(u),Promise.all(h)]).then(function(f){const d=f[0],_=f[1],x=f[2],M=f[3],g=f[4],p=[];for(let R=0,T=d.length;R<T;R++){const C=d[R],B=_[R],D=x[R],P=M[R],ne=g[R];if(C===void 0)continue;C.updateMatrix&&C.updateMatrix();const A=n._createAnimationTracks(C,B,D,P,ne);if(A)for(let y=0;y<A.length;y++)p.push(A[y])}return new M_(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,u=i.weights.length;l<u;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let u=0,h=a.length;u<h;u++)o.push(n.getDependency("node",a[u]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(u){const h=u[0],f=u[1],d=u[2];d!==null&&h.traverse(function(_){_.isSkinnedMesh&&_.bind(d,M0)});for(let _=0,x=f.length;_<x;_++)h.add(f[_]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(u){return u.createNodeMesh&&u.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(u){return i._getNodeRef(i.cameraCache,s.camera,u)})),i._invokeAll(function(u){return u.createNodeAttachment&&u.createNodeAttachment(e)}).forEach(function(u){a.push(u)}),this.nodeCache[e]=Promise.all(a).then(function(u){let h;if(s.isBone===!0?h=new eu:u.length>1?h=new yi:u.length===1?h=u[0]:h=new bt,h!==u[0])for(let f=0,d=u.length;f<d;f++)h.add(u[f]);if(s.name&&(h.userData.name=s.name,h.name=o),Jn(h,s),s.extensions&&pi(n,h,s),s.matrix!==void 0){const f=new tt;f.fromArray(s.matrix),h.applyMatrix4(f)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new yi;n.name&&(s.name=i.createUniqueName(n.name)),Jn(s,n),n.extensions&&pi(t,s,n);const o=n.nodes||[],a=[];for(let l=0,u=o.length;l<u;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,f=l.length;h<f;h++)s.add(l[h]);const u=h=>{const f=new Map;for(const[d,_]of i.associations)(d instanceof yn||d instanceof zt)&&f.set(d,_);return h.traverse(d=>{const _=i.associations.get(d);_!=null&&f.set(d,_)}),f};return i.associations=u(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];$n[s.path]===$n.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let u;switch($n[s.path]){case $n.weights:u=ur;break;case $n.rotation:u=Ri;break;case $n.position:case $n.scale:u=hr;break;default:switch(n.itemSize){case 1:u=ur;break;case 2:case 3:default:u=hr;break}break}const h=i.interpolation!==void 0?m0[i.interpolation]:ar,f=this._getArrayFromAccessor(n);for(let d=0,_=l.length;d<_;d++){const x=new u(l[d]+"."+$n[s.path],t.array,f,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),o.push(x)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=jo(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Ri?p0:lu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function E0(r,e,t){const n=e.attributes,i=new wn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,u=a.max;if(l!==void 0&&u!==void 0){if(i.set(new G(l[0],l[1],l[2]),new G(u[0],u[1],u[2])),a.normalized){const h=jo(tr[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new G,l=new G;for(let u=0,h=s.length;u<h;u++){const f=s[u];if(f.POSITION!==void 0){const d=t.json.accessors[f.POSITION],_=d.min,x=d.max;if(_!==void 0&&x!==void 0){if(l.setX(Math.max(Math.abs(_[0]),Math.abs(x[0]))),l.setY(Math.max(Math.abs(_[1]),Math.abs(x[1]))),l.setZ(Math.max(Math.abs(_[2]),Math.abs(x[2]))),d.normalized){const M=jo(tr[d.componentType]);l.multiplyScalar(M)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Rn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Ml(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Xo[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return ut.workingColorSpace!==Ht&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ut.workingColorSpace}" not supported.`),Jn(r,e),E0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?_0(r,e.targets,t):r})}var nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},T0={};(function(){var r;function e(c){var m=0;return function(){return m<c.length?{done:!1,value:c[m++]}:{done:!0}}}var t=typeof Object.defineProperties=="function"?Object.defineProperty:function(c,m,v){return c==Array.prototype||c==Object.prototype||(c[m]=v.value),c};function n(c){c=[typeof globalThis=="object"&&globalThis,c,typeof window=="object"&&window,typeof self=="object"&&self,typeof nr=="object"&&nr];for(var m=0;m<c.length;++m){var v=c[m];if(v&&v.Math==Math)return v}throw Error("Cannot find global object")}var i=n(this);function s(c,m){if(m)e:{var v=i;c=c.split(".");for(var S=0;S<c.length-1;S++){var L=c[S];if(!(L in v))break e;v=v[L]}c=c[c.length-1],S=v[c],m=m(S),m!=S&&m!=null&&t(v,c,{configurable:!0,writable:!0,value:m})}}s("Symbol",function(c){function m(H){if(this instanceof m)throw new TypeError("Symbol is not a constructor");return new v(S+(H||"")+"_"+L++,H)}function v(H,U){this.g=H,t(this,"description",{configurable:!0,writable:!0,value:U})}if(c)return c;v.prototype.toString=function(){return this.g};var S="jscomp_symbol_"+(1e9*Math.random()>>>0)+"_",L=0;return m}),s("Symbol.iterator",function(c){if(c)return c;c=Symbol("Symbol.iterator");for(var m="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),v=0;v<m.length;v++){var S=i[m[v]];typeof S=="function"&&typeof S.prototype[c]!="function"&&t(S.prototype,c,{configurable:!0,writable:!0,value:function(){return o(e(this))}})}return c});function o(c){return c={next:c},c[Symbol.iterator]=function(){return this},c}function a(c){var m=typeof Symbol<"u"&&Symbol.iterator&&c[Symbol.iterator];return m?m.call(c):{next:e(c)}}function l(c){if(!(c instanceof Array)){c=a(c);for(var m,v=[];!(m=c.next()).done;)v.push(m.value);c=v}return c}var u=typeof Object.create=="function"?Object.create:function(c){function m(){}return m.prototype=c,new m},h;if(typeof Object.setPrototypeOf=="function")h=Object.setPrototypeOf;else{var f;e:{var d={a:!0},_={};try{_.__proto__=d,f=_.a;break e}catch{}f=!1}h=f?function(c,m){if(c.__proto__=m,c.__proto__!==m)throw new TypeError(c+" is not extensible");return c}:null}var x=h;function M(c,m){if(c.prototype=u(m.prototype),c.prototype.constructor=c,x)x(c,m);else for(var v in m)if(v!="prototype")if(Object.defineProperties){var S=Object.getOwnPropertyDescriptor(m,v);S&&Object.defineProperty(c,v,S)}else c[v]=m[v];c.na=m.prototype}function g(){this.l=!1,this.i=null,this.h=void 0,this.g=1,this.u=this.o=0,this.j=null}function p(c){if(c.l)throw new TypeError("Generator is already running");c.l=!0}g.prototype.s=function(c){this.h=c};function R(c,m){c.j={da:m,ea:!0},c.g=c.o||c.u}g.prototype.return=function(c){this.j={return:c},this.g=this.u};function T(c,m,v){return c.g=v,{value:m}}function C(c){this.g=new g,this.h=c}function B(c,m){p(c.g);var v=c.g.i;return v?D(c,"return"in v?v.return:function(S){return{value:S,done:!0}},m,c.g.return):(c.g.return(m),P(c))}function D(c,m,v,S){try{var L=m.call(c.g.i,v);if(!(L instanceof Object))throw new TypeError("Iterator result "+L+" is not an object");if(!L.done)return c.g.l=!1,L;var H=L.value}catch(U){return c.g.i=null,R(c.g,U),P(c)}return c.g.i=null,S.call(c.g,H),P(c)}function P(c){for(;c.g.g;)try{var m=c.h(c.g);if(m)return c.g.l=!1,{value:m.value,done:!1}}catch(v){c.g.h=void 0,R(c.g,v)}if(c.g.l=!1,c.g.j){if(m=c.g.j,c.g.j=null,m.ea)throw m.da;return{value:m.return,done:!0}}return{value:void 0,done:!0}}function ne(c){this.next=function(m){return p(c.g),c.g.i?m=D(c,c.g.i.next,m,c.g.s):(c.g.s(m),m=P(c)),m},this.throw=function(m){return p(c.g),c.g.i?m=D(c,c.g.i.throw,m,c.g.s):(R(c.g,m),m=P(c)),m},this.return=function(m){return B(c,m)},this[Symbol.iterator]=function(){return this}}function A(c){function m(S){return c.next(S)}function v(S){return c.throw(S)}return new Promise(function(S,L){function H(U){U.done?S(U.value):Promise.resolve(U.value).then(m,v).then(H,L)}H(c.next())})}function y(c){return A(new ne(new C(c)))}s("Promise",function(c){function m(U){this.h=0,this.i=void 0,this.g=[],this.s=!1;var j=this.j();try{U(j.resolve,j.reject)}catch(Q){j.reject(Q)}}function v(){this.g=null}function S(U){return U instanceof m?U:new m(function(j){j(U)})}if(c)return c;v.prototype.h=function(U){if(this.g==null){this.g=[];var j=this;this.i(function(){j.l()})}this.g.push(U)};var L=i.setTimeout;v.prototype.i=function(U){L(U,0)},v.prototype.l=function(){for(;this.g&&this.g.length;){var U=this.g;this.g=[];for(var j=0;j<U.length;++j){var Q=U[j];U[j]=null;try{Q()}catch(fe){this.j(fe)}}}this.g=null},v.prototype.j=function(U){this.i(function(){throw U})},m.prototype.j=function(){function U(fe){return function(Me){Q||(Q=!0,fe.call(j,Me))}}var j=this,Q=!1;return{resolve:U(this.D),reject:U(this.l)}},m.prototype.D=function(U){if(U===this)this.l(new TypeError("A Promise cannot resolve to itself"));else if(U instanceof m)this.H(U);else{e:switch(typeof U){case"object":var j=U!=null;break e;case"function":j=!0;break e;default:j=!1}j?this.A(U):this.o(U)}},m.prototype.A=function(U){var j=void 0;try{j=U.then}catch(Q){this.l(Q);return}typeof j=="function"?this.I(j,U):this.o(U)},m.prototype.l=function(U){this.u(2,U)},m.prototype.o=function(U){this.u(1,U)},m.prototype.u=function(U,j){if(this.h!=0)throw Error("Cannot settle("+U+", "+j+"): Promise already settled in state"+this.h);this.h=U,this.i=j,this.h===2&&this.G(),this.B()},m.prototype.G=function(){var U=this;L(function(){if(U.C()){var j=i.console;typeof j<"u"&&j.error(U.i)}},1)},m.prototype.C=function(){if(this.s)return!1;var U=i.CustomEvent,j=i.Event,Q=i.dispatchEvent;return typeof Q>"u"?!0:(typeof U=="function"?U=new U("unhandledrejection",{cancelable:!0}):typeof j=="function"?U=new j("unhandledrejection",{cancelable:!0}):(U=i.document.createEvent("CustomEvent"),U.initCustomEvent("unhandledrejection",!1,!0,U)),U.promise=this,U.reason=this.i,Q(U))},m.prototype.B=function(){if(this.g!=null){for(var U=0;U<this.g.length;++U)H.h(this.g[U]);this.g=null}};var H=new v;return m.prototype.H=function(U){var j=this.j();U.M(j.resolve,j.reject)},m.prototype.I=function(U,j){var Q=this.j();try{U.call(j,Q.resolve,Q.reject)}catch(fe){Q.reject(fe)}},m.prototype.then=function(U,j){function Q(Ge,Te){return typeof Ge=="function"?function(Ze){try{fe(Ge(Ze))}catch(ot){Me(ot)}}:Te}var fe,Me,He=new m(function(Ge,Te){fe=Ge,Me=Te});return this.M(Q(U,fe),Q(j,Me)),He},m.prototype.catch=function(U){return this.then(void 0,U)},m.prototype.M=function(U,j){function Q(){switch(fe.h){case 1:U(fe.i);break;case 2:j(fe.i);break;default:throw Error("Unexpected state: "+fe.h)}}var fe=this;this.g==null?H.h(Q):this.g.push(Q),this.s=!0},m.resolve=S,m.reject=function(U){return new m(function(j,Q){Q(U)})},m.race=function(U){return new m(function(j,Q){for(var fe=a(U),Me=fe.next();!Me.done;Me=fe.next())S(Me.value).M(j,Q)})},m.all=function(U){var j=a(U),Q=j.next();return Q.done?S([]):new m(function(fe,Me){function He(Ze){return function(ot){Ge[Ze]=ot,Te--,Te==0&&fe(Ge)}}var Ge=[],Te=0;do Ge.push(void 0),Te++,S(Q.value).M(He(Ge.length-1),Me),Q=j.next();while(!Q.done)})},m});function I(c,m){c instanceof String&&(c+="");var v=0,S=!1,L={next:function(){if(!S&&v<c.length){var H=v++;return{value:m(H,c[H]),done:!1}}return S=!0,{done:!0,value:void 0}}};return L[Symbol.iterator]=function(){return L},L}var W=typeof Object.assign=="function"?Object.assign:function(c,m){for(var v=1;v<arguments.length;v++){var S=arguments[v];if(S)for(var L in S)Object.prototype.hasOwnProperty.call(S,L)&&(c[L]=S[L])}return c};s("Object.assign",function(c){return c||W}),s("Object.is",function(c){return c||function(m,v){return m===v?m!==0||1/m===1/v:m!==m&&v!==v}}),s("Array.prototype.includes",function(c){return c||function(m,v){var S=this;S instanceof String&&(S=String(S));var L=S.length;for(v=v||0,0>v&&(v=Math.max(v+L,0));v<L;v++){var H=S[v];if(H===m||Object.is(H,m))return!0}return!1}}),s("String.prototype.includes",function(c){return c||function(m,v){if(this==null)throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");if(m instanceof RegExp)throw new TypeError("First argument to String.prototype.includes must not be a regular expression");return this.indexOf(m,v||0)!==-1}}),s("Array.prototype.keys",function(c){return c||function(){return I(this,function(m){return m})}});var te=this||self;function N(c,m){c=c.split(".");var v=te;c[0]in v||typeof v.execScript>"u"||v.execScript("var "+c[0]);for(var S;c.length&&(S=c.shift());)c.length||m===void 0?v[S]&&v[S]!==Object.prototype[S]?v=v[S]:v=v[S]={}:v[S]=m}function k(){throw Error("Invalid UTF8")}function F(c,m){return m=String.fromCharCode.apply(null,m),c==null?m:c+m}var X,Z=typeof TextDecoder<"u",ee,ie=typeof TextEncoder<"u",he={},ae=null;function J(c){var m;m===void 0&&(m=0),Ce(),m=he[m];for(var v=Array(Math.floor(c.length/3)),S=m[64]||"",L=0,H=0;L<c.length-2;L+=3){var U=c[L],j=c[L+1],Q=c[L+2],fe=m[U>>2];U=m[(U&3)<<4|j>>4],j=m[(j&15)<<2|Q>>6],Q=m[Q&63],v[H++]=fe+U+j+Q}switch(fe=0,Q=S,c.length-L){case 2:fe=c[L+1],Q=m[(fe&15)<<2]||S;case 1:c=c[L],v[H]=m[c>>2]+m[(c&3)<<4|fe>>4]+Q+S}return v.join("")}function re(c){var m=c.length,v=3*m/4;v%3?v=Math.floor(v):"=.".indexOf(c[m-1])!=-1&&(v="=.".indexOf(c[m-2])!=-1?v-2:v-1);var S=new Uint8Array(v),L=0;return _e(c,function(H){S[L++]=H}),L!==v?S.subarray(0,L):S}function _e(c,m){function v(Q){for(;S<c.length;){var fe=c.charAt(S++),Me=ae[fe];if(Me!=null)return Me;if(!/^[\s\xa0]*$/.test(fe))throw Error("Unknown base64 encoding at char: "+fe)}return Q}Ce();for(var S=0;;){var L=v(-1),H=v(0),U=v(64),j=v(64);if(j===64&&L===-1)break;m(L<<2|H>>4),U!=64&&(m(H<<4&240|U>>2),j!=64&&m(U<<6&192|j))}}function Ce(){if(!ae){ae={};for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),m=["+/=","+/","-_=","-_.","-_"],v=0;5>v;v++){var S=c.concat(m[v].split(""));he[v]=S;for(var L=0;L<S.length;L++){var H=S[L];ae[H]===void 0&&(ae[H]=L)}}}}var we=typeof Uint8Array=="function";function ze(c){return we&&c!=null&&c instanceof Uint8Array}var ke;function Ie(c){if(this.L=c,c!==null&&c.length===0)throw Error("ByteString should be constructed with non-empty values")}var rt=typeof Uint8Array.prototype.slice=="function",V=0,Tt=0;function Le(c,m){if(c.constructor===Uint8Array)return c;if(c.constructor===ArrayBuffer)return new Uint8Array(c);if(c.constructor===Array)return new Uint8Array(c);if(c.constructor===String)return re(c);if(c.constructor===Ie)return!m&&(m=c.L)&&m.constructor===Uint8Array?m:(m=c.L,m=m==null||ze(m)?m:typeof m=="string"?re(m):null,(c=c.L=m)?new Uint8Array(c):ke||(ke=new Uint8Array(0)));if(c instanceof Uint8Array)return new Uint8Array(c.buffer,c.byteOffset,c.byteLength);throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, or Array of numbers")}function Ve(c,m){return Error("Invalid wire type: "+c+" (at position "+m+")")}function Se(){return Error("Failed to read varint, encoding is invalid.")}function vt(c,m){m=m===void 0?{}:m,m=m.v===void 0?!1:m.v,this.h=null,this.g=this.i=this.j=0,this.v=m,c&&je(this,c)}function je(c,m){c.h=Le(m,c.v),c.j=0,c.i=c.h.length,c.g=c.j}vt.prototype.reset=function(){this.g=this.j};function w(c){if(c.g>c.i)throw Error("Tried to read past the end of the data "+c.g+" > "+c.i)}function E(c){var m=c.h,v=m[c.g],S=v&127;if(128>v)return c.g+=1,w(c),S;if(v=m[c.g+1],S|=(v&127)<<7,128>v)return c.g+=2,w(c),S;if(v=m[c.g+2],S|=(v&127)<<14,128>v)return c.g+=3,w(c),S;if(v=m[c.g+3],S|=(v&127)<<21,128>v)return c.g+=4,w(c),S;if(v=m[c.g+4],c.g+=5,S|=(v&15)<<28,128>v)return w(c),S;if(128<=m[c.g++]&&128<=m[c.g++]&&128<=m[c.g++]&&128<=m[c.g++]&&128<=m[c.g++])throw Se();return w(c),S}var Y=[];function ce(){this.g=[]}ce.prototype.length=function(){return this.g.length},ce.prototype.end=function(){var c=this.g;return this.g=[],c};function se(c,m){for(;127<m;)c.g.push(m&127|128),m>>>=7;c.g.push(m)}function ue(c){var m={},v=m.W===void 0?!1:m.W;this.l={v:m.v===void 0?!1:m.v},this.W=v,m=this.l,Y.length?(v=Y.pop(),m&&(v.v=m.v),c&&je(v,c),c=v):c=new vt(c,m),this.g=c,this.j=this.g.g,this.h=this.i=-1}ue.prototype.reset=function(){this.g.reset(),this.j=this.g.g,this.h=this.i=-1};function Ae(c){var m=c.g;if(m.g==m.i)return!1;c.j=c.g.g;var v=E(c.g)>>>0;if(m=v>>>3,v&=7,!(0<=v&&5>=v))throw Ve(v,c.j);if(1>m)throw Error("Invalid field number: "+m+" (at position "+c.j+")");return c.i=m,c.h=v,!0}function ge(c){switch(c.h){case 0:if(c.h!=0)ge(c);else e:{c=c.g;for(var m=c.g,v=m+10;m<v;)if(!(c.h[m++]&128)){c.g=m,w(c);break e}throw Se()}break;case 1:c=c.g,c.g+=8,w(c);break;case 2:c.h!=2?ge(c):(m=E(c.g)>>>0,c=c.g,c.g+=m,w(c));break;case 5:c=c.g,c.g+=4,w(c);break;case 3:m=c.i;do{if(!Ae(c))throw Error("Unmatched start-group tag: stream EOF");if(c.h==4){if(c.i!=m)throw Error("Unmatched end-group tag");break}ge(c)}while(!0);break;default:throw Ve(c.h,c.j)}}var ye=[];function De(){this.i=[],this.h=0,this.g=new ce}function Fe(c,m){m.length!==0&&(c.i.push(m),c.h+=m.length)}function oe(c,m){if(m=m.ba){Fe(c,c.g.end());for(var v=0;v<m.length;v++)Fe(c,m[v])}}var st=typeof Symbol=="function"&&typeof Symbol()=="symbol"?Symbol(void 0):void 0;function $e(c,m){Object.isFrozen(c)||(st?c[st]|=m:c.N!==void 0?c.N|=m:Object.defineProperties(c,{N:{value:m,configurable:!0,writable:!0,enumerable:!1}}))}function Be(c){var m;return st?m=c[st]:m=c.N,m??0}function Re(c){return $e(c,1),c}function xe(c){return Array.isArray(c)?!!(Be(c)&2):!1}function We(c){if(!Array.isArray(c))throw Error("cannot mark non-array as immutable");$e(c,2)}function at(c){return c!==null&&typeof c=="object"&&!Array.isArray(c)&&c.constructor===Object}var gt=Object.freeze(Re([]));function Ye(c){if(xe(c.m))throw Error("Cannot mutate an immutable Message")}var pe=typeof Symbol<"u"&&typeof Symbol.hasInstance<"u";function O(c){return{value:c,configurable:!1,writable:!1,enumerable:!1}}function de(c,m,v){return m===-1?null:m>=c.i?c.g?c.g[m]:void 0:v!==void 0&&v&&c.g&&(v=c.g[m],v!=null)?v:c.m[m+c.h]}function le(c,m,v,S){S=S===void 0?!1:S,Ye(c),m<c.i&&!S?c.m[m+c.h]=v:(c.g||(c.g=c.m[c.i+c.h]={}))[m]=v}function Ue(c,m,v,S){v=v===void 0?!0:v,S=S===void 0?!1:S;var L=de(c,m,S);return L==null&&(L=gt),xe(c.m)?v&&(We(L),Object.freeze(L)):(L===gt||xe(L))&&(L=Re(L.slice()),le(c,m,L,S)),L}function Ee(c,m,v){return c=de(c,m),c=c==null?c:+c,c??(v===void 0?0:v)}function lt(c,m,v,S){c.j||(c.j={});var L=xe(c.m),H=c.j[v];if(!H){S=Ue(c,v,!0,S===void 0?!1:S),H=[],L=L||xe(S);for(var U=0;U<S.length;U++)H[U]=new m(S[U]),L&&We(H[U].m);L&&(We(H),Object.freeze(H)),c.j[v]=H}return H}function ht(c,m,v,S,L){var H=H===void 0?!1:H;return Ye(c),H=lt(c,v,m,H),v=S||new v,c=Ue(c,m),L!=null?(H.splice(L,0,v),c.splice(L,0,v.m)):(H.push(v),c.push(v.m)),v}function Rt(c,m){return c=de(c,m),c??0}function Ut(c,m){return c=de(c,m),c??""}function dt(c){switch(typeof c){case"number":return isFinite(c)?c:String(c);case"object":if(c&&!Array.isArray(c)){if(ze(c))return J(c);if(c instanceof Ie){var m=c.L;return m=m==null||typeof m=="string"?m:we&&m instanceof Uint8Array?J(m):null,(c.L=m)||""}}}return c}function Nt(c){var m=ks;return m=m===void 0?Ci:m,vr(c,m)}function tn(c,m){if(c!=null){if(Array.isArray(c))c=vr(c,m);else if(at(c)){var v={},S;for(S in c)v[S]=tn(c[S],m);c=v}else c=m(c);return c}}function vr(c,m){for(var v=c.slice(),S=0;S<v.length;S++)v[S]=tn(v[S],m);return Array.isArray(c)&&Be(c)&1&&Re(v),v}function ks(c){return c&&typeof c=="object"&&c.toJSON?c.toJSON():(c=dt(c),Array.isArray(c)?Nt(c):c)}function Ci(c){return ze(c)?new Uint8Array(c):c}function ai(c,m,v){c||(c=ci),ci=null;var S=this.constructor.h;c||(c=S?[S]:[]),this.h=(S?0:-1)-(this.constructor.g||0),this.j=void 0,this.m=c;e:{if(S=this.m.length,c=S-1,S&&(S=this.m[c],at(S))){this.i=c-this.h,this.g=S;break e}m!==void 0&&-1<m?(this.i=Math.max(m,c+1-this.h),this.g=void 0):this.i=Number.MAX_VALUE}if(v)for(m=0;m<v.length;m++)if(c=v[m],c<this.i)c+=this.h,(S=this.m[c])?Array.isArray(S)&&Re(S):this.m[c]=gt;else{S=this.g||(this.g=this.m[this.i+this.h]={});var L=S[c];L?Array.isArray(L)&&Re(L):S[c]=gt}}ai.prototype.toJSON=function(){return Nt(this.m)},ai.prototype.toString=function(){return this.m.toString()};var ci;function li(){ai.apply(this,arguments)}if(M(li,ai),pe){var xr={};Object.defineProperties(li,(xr[Symbol.hasInstance]=O(function(){throw Error("Cannot perform instanceof checks for MutableMessage")}),xr))}function kr(c,m,v){if(v){var S={},L;for(L in v){var H=v[L],U=H.ha;U||(S.F=H.la||H.fa.P,H.aa?(S.U=ve(H.aa),U=function(j){return function(Q,fe,Me){return j.F(Q,fe,Me,j.U)}}(S)):H.ca?(S.T=be(H.X.g,H.ca),U=function(j){return function(Q,fe,Me){return j.F(Q,fe,Me,j.T)}}(S)):U=S.F,H.ha=U),U(m,c,H.X),S={F:S.F,U:S.U,T:S.T}}}oe(m,c)}var Li=Symbol();function Vr(c,m,v){return c[Li]||(c[Li]=function(S,L){return m(S,L,v)})}function b(c){var m=c[Li];if(!m){var v=Pi(c);m=function(S,L){return Mt(S,L,v)},c[Li]=m}return m}function z(c){var m=c.aa;if(m)return b(m);if(m=c.ka)return Vr(c.X.g,m,c.ca)}function K(c){var m=z(c),v=c.X,S=c.fa.O;return m?function(L,H){return S(L,H,v,m)}:function(L,H){return S(L,H,v)}}function $(c,m,v,S,L,H){c=c();var U=0;for(c.length&&typeof c[0]!="number"&&(v(m,c[0]),U++);U<c.length;){v=c[U++];for(var j=U+1;j<c.length&&typeof c[j]!="number";)j++;var Q=c[U++];switch(j-=U,j){case 0:S(m,v,Q);break;case 1:S(m,v,Q,c[U++]);break;case 2:L(m,v,Q,c[U++],c[U++]);break;case 3:j=c[U++];var fe=c[U++],Me=c[U++];Array.isArray(Me)?L(m,v,Q,j,fe,Me):H(m,v,Q,j,fe,Me);break;case 4:H(m,v,Q,c[U++],c[U++],c[U++],c[U++]);break;default:throw Error("unexpected number of binary field arguments: "+j)}}return m}var q=Symbol();function ve(c){var m=c[q];if(!m){var v=At(c);m=function(S,L){return yr(S,L,v)},c[q]=m}return m}function be(c,m){var v=c[q];return v||(v=function(S,L){return kr(S,L,m)},c[q]=v),v}var Pe=Symbol();function Oe(c,m){c.push(m)}function Ke(c,m,v){c.push(m,v.P)}function Xe(c,m,v,S,L){var H=ve(L),U=v.P;c.push(m,function(j,Q,fe){return U(j,Q,fe,S,H)})}function qe(c,m,v,S,L,H){var U=be(S,H),j=v.P;c.push(m,function(Q,fe,Me){return j(Q,fe,Me,S,U)})}function At(c){var m=c[Pe];return m||$(c,c[Pe]=[],Oe,Ke,Xe,qe)}var kt=Symbol();function Ct(c,m){c[0]=m}function dn(c,m,v,S){var L=v.O;c[m]=S?function(H,U,j){return L(H,U,j,S)}:L}function yt(c,m,v,S,L,H){var U=v.O,j=b(L);c[m]=function(Q,fe,Me){return U(Q,fe,Me,S,j,H)}}function Je(c,m,v,S,L,H,U){var j=v.O,Q=Vr(S,L,H);c[m]=function(fe,Me,He){return j(fe,Me,He,S,Q,U)}}function Pi(c){var m=c[kt];return m||$(c,c[kt]={},Ct,dn,yt,Je)}function Mt(c,m,v){for(;Ae(m)&&m.h!=4;){var S=m.i,L=v[S];if(!L){var H=v[0];H&&(H=H[S])&&(L=v[S]=K(H))}if((!L||!L(m,c,S))&&(L=m,S=c,H=L.j,ge(L),!L.W)){var U=L.g.h;L=L.g.g,L=H===L?ke||(ke=new Uint8Array(0)):rt?U.slice(H,L):new Uint8Array(U.subarray(H,L)),(H=S.ba)?H.push(L):S.ba=[L]}}return c}function pn(c,m,v){if(ye.length){var S=ye.pop();c&&(je(S.g,c),S.i=-1,S.h=-1),c=S}else c=new ue(c);try{return Mt(new m,c,Pi(v))}finally{m=c.g,m.h=null,m.j=0,m.i=0,m.g=0,m.v=!1,c.i=-1,c.h=-1,100>ye.length&&ye.push(c)}}function yr(c,m,v){for(var S=v.length,L=S%2==1,H=L?1:0;H<S;H+=2)(0,v[H+1])(m,c,v[H]);kr(c,m,L?v[0]:void 0)}function Ln(c,m){var v=new De;yr(c,v,At(m)),Fe(v,v.g.end()),c=new Uint8Array(v.h),m=v.i;for(var S=m.length,L=0,H=0;H<S;H++){var U=m[H];c.set(U,L),L+=U.length}return v.i=[c],c}function Pn(c,m){return{O:c,P:m}}var pt=Pn(function(c,m,v){if(c.h!==5)return!1;c=c.g;var S=c.h[c.g],L=c.h[c.g+1],H=c.h[c.g+2],U=c.h[c.g+3];return c.g+=4,w(c),L=(S<<0|L<<8|H<<16|U<<24)>>>0,c=2*(L>>31)+1,S=L>>>23&255,L&=8388607,le(m,v,S==255?L?NaN:1/0*c:S==0?c*Math.pow(2,-149)*L:c*Math.pow(2,S-150)*(L+Math.pow(2,23))),!0},function(c,m,v){if(m=de(m,v),m!=null){se(c.g,8*v+5),c=c.g;var S=m;S=(v=0>S?1:0)?-S:S,S===0?0<1/S?V=Tt=0:(Tt=0,V=2147483648):isNaN(S)?(Tt=0,V=2147483647):34028234663852886e22<S?(Tt=0,V=(v<<31|2139095040)>>>0):11754943508222875e-54>S?(S=Math.round(S/Math.pow(2,-149)),Tt=0,V=(v<<31|S)>>>0):(m=Math.floor(Math.log(S)/Math.LN2),S*=Math.pow(2,-m),S=Math.round(8388608*S),16777216<=S&&++m,Tt=0,V=(v<<31|m+127<<23|S&8388607)>>>0),v=V,c.g.push(v>>>0&255),c.g.push(v>>>8&255),c.g.push(v>>>16&255),c.g.push(v>>>24&255)}}),In=Pn(function(c,m,v){if(c.h!==0)return!1;for(var S=c.g,L=128,H=0,U=c=0;4>U&&128<=L;U++)L=S.h[S.g++],w(S),H|=(L&127)<<7*U;if(128<=L&&(L=S.h[S.g++],w(S),H|=(L&127)<<28,c|=(L&127)>>4),128<=L)for(U=0;5>U&&128<=L;U++)L=S.h[S.g++],w(S),c|=(L&127)<<7*U+3;if(128>L)S=H>>>0,L=c>>>0,(c=L&2147483648)&&(S=~S+1>>>0,L=~L>>>0,S==0&&(L=L+1>>>0)),S=4294967296*L+(S>>>0);else throw Se();return le(m,v,c?-S:S),!0},function(c,m,v){if(m=de(m,v),m!=null&&m!=null){se(c.g,8*v),c=c.g;var S=m;for(v=0>S,S=Math.abs(S),m=S>>>0,S=Math.floor((S-m)/4294967296),S>>>=0,v&&(S=~S>>>0,m=(~m>>>0)+1,4294967295<m&&(m=0,S++,4294967295<S&&(S=0))),V=m,Tt=S,v=V,m=Tt;0<m||127<v;)c.g.push(v&127|128),v=(v>>>7|m<<25)>>>0,m>>>=7;c.g.push(v)}}),Mr=Pn(function(c,m,v){return c.h!==0?!1:(le(m,v,E(c.g)),!0)},function(c,m,v){if(m=de(m,v),m!=null&&m!=null)if(se(c.g,8*v),c=c.g,v=m,0<=v)se(c,v);else{for(m=0;9>m;m++)c.g.push(v&127|128),v>>=7;c.g.push(1)}}),jt=Pn(function(c,m,v){if(c.h!==2)return!1;var S=E(c.g)>>>0;c=c.g;var L=c.g;c.g+=S,w(c),c=c.h;var H;if(Z)(H=X)||(H=X=new TextDecoder("utf-8",{fatal:!0})),H=H.decode(c.subarray(L,L+S));else{S=L+S;for(var U=[],j=null,Q,fe,Me;L<S;)Q=c[L++],128>Q?U.push(Q):224>Q?L>=S?k():(fe=c[L++],194>Q||(fe&192)!==128?(L--,k()):U.push((Q&31)<<6|fe&63)):240>Q?L>=S-1?k():(fe=c[L++],(fe&192)!==128||Q===224&&160>fe||Q===237&&160<=fe||((H=c[L++])&192)!==128?(L--,k()):U.push((Q&15)<<12|(fe&63)<<6|H&63)):244>=Q?L>=S-2?k():(fe=c[L++],(fe&192)!==128||(Q<<28)+(fe-144)>>30||((H=c[L++])&192)!==128||((Me=c[L++])&192)!==128?(L--,k()):(Q=(Q&7)<<18|(fe&63)<<12|(H&63)<<6|Me&63,Q-=65536,U.push((Q>>10&1023)+55296,(Q&1023)+56320))):k(),8192<=U.length&&(j=F(j,U),U.length=0);H=F(j,U)}return le(m,v,H),!0},function(c,m,v){if(m=de(m,v),m!=null){var S=!1;if(S=S===void 0?!1:S,ie){if(S&&/(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(m))throw Error("Found an unpaired surrogate");m=(ee||(ee=new TextEncoder)).encode(m)}else{for(var L=0,H=new Uint8Array(3*m.length),U=0;U<m.length;U++){var j=m.charCodeAt(U);if(128>j)H[L++]=j;else{if(2048>j)H[L++]=j>>6|192;else{if(55296<=j&&57343>=j){if(56319>=j&&U<m.length){var Q=m.charCodeAt(++U);if(56320<=Q&&57343>=Q){j=1024*(j-55296)+Q-56320+65536,H[L++]=j>>18|240,H[L++]=j>>12&63|128,H[L++]=j>>6&63|128,H[L++]=j&63|128;continue}else U--}if(S)throw Error("Found an unpaired surrogate");j=65533}H[L++]=j>>12|224,H[L++]=j>>6&63|128}H[L++]=j&63|128}}m=H.subarray(0,L)}se(c.g,8*v+2),se(c.g,m.length),Fe(c,c.g.end()),Fe(c,m)}}),Ii=Pn(function(c,m,v,S,L){if(c.h!==2)return!1;m=ht(m,v,S),v=c.g.i,S=E(c.g)>>>0;var H=c.g.g+S,U=H-v;if(0>=U&&(c.g.i=H,L(m,c),U=H-c.g.g),U)throw Error("Message parsing ended unexpectedly. Expected to read "+(S+" bytes, instead read "+(S-U)+" bytes, either the data ended unexpectedly or the message misreported its own length"));return c.g.g=H,c.g.i=v,!0},function(c,m,v,S,L){if(m=lt(m,S,v),m!=null)for(S=0;S<m.length;S++){var H=c;se(H.g,8*v+2);var U=H.g.end();Fe(H,U),U.push(H.h),H=U,L(m[S],c),U=c;var j=H.pop();for(j=U.h+U.g.length()-j;127<j;)H.push(j&127|128),j>>>=7,U.h++;H.push(j),U.h++}});function $t(){li.apply(this,arguments)}if(M($t,li),pe){var Sr={};Object.defineProperties($t,(Sr[Symbol.hasInstance]=O(Object[Symbol.hasInstance]),Sr))}function Er(c){$t.call(this,c)}M(Er,$t);function ga(){return[1,Mr,2,pt,3,jt,4,jt]}function Vs(c){$t.call(this,c,-1,gu)}M(Vs,$t),Vs.prototype.addClassification=function(c,m){return ht(this,1,Er,c,m),this};function mu(){return[1,Ii,Er,ga]}var gu=[1];function Wr(c){$t.call(this,c)}M(Wr,$t);function _a(){return[1,pt,2,pt,3,pt,4,pt,5,pt]}function va(c){$t.call(this,c,-1,vu)}M(va,$t);function _u(){return[1,Ii,Wr,_a]}var vu=[1];function Ws(c){$t.call(this,c)}M(Ws,$t);function xa(){return[1,pt,2,pt,3,pt,4,pt,5,pt,6,In]}var ya=[[61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]],Ma=[[263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]],Sa=[[276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]],Ea=[[33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]],Ta=[[46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]],Aa=[[10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]],xu=[].concat(l(ya),l(Ma),l(Sa),l(Ea),l(Ta),l(Aa));function ba(c,m,v){if(v=c.createShader(v===0?c.VERTEX_SHADER:c.FRAGMENT_SHADER),c.shaderSource(v,m),c.compileShader(v),!c.getShaderParameter(v,c.COMPILE_STATUS))throw Error(`Could not compile WebGL shader.

`+c.getShaderInfoLog(v));return v}function yu(c){return lt(c,Er,1).map(function(m){return{index:Rt(m,1),ga:Ee(m,2),label:de(m,3)!=null?Ut(m,3):void 0,displayName:de(m,4)!=null?Ut(m,4):void 0}})}function Mu(c){return{x:Ee(c,1),y:Ee(c,2),z:Ee(c,3),visibility:de(c,4)!=null?Ee(c,4):void 0}}function Xs(c,m){this.h=c,this.g=m,this.l=0}function wa(c,m,v){return Su(c,m),typeof c.g.canvas.transferToImageBitmap=="function"?Promise.resolve(c.g.canvas.transferToImageBitmap()):v?Promise.resolve(c.g.canvas):typeof createImageBitmap=="function"?createImageBitmap(c.g.canvas):(c.i===void 0&&(c.i=document.createElement("canvas")),new Promise(function(S){c.i.height=c.g.canvas.height,c.i.width=c.g.canvas.width,c.i.getContext("2d",{}).drawImage(c.g.canvas,0,0,c.g.canvas.width,c.g.canvas.height),S(c.i)}))}function Su(c,m){var v=c.g;if(c.o===void 0){var S=ba(v,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,0),L=ba(v,`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D sampler0;
  void main(){
    gl_FragColor = texture2D(sampler0, vTex);
  }`,1),H=v.createProgram();if(v.attachShader(H,S),v.attachShader(H,L),v.linkProgram(H),!v.getProgramParameter(H,v.LINK_STATUS))throw Error(`Could not compile WebGL program.

`+v.getProgramInfoLog(H));S=c.o=H,v.useProgram(S),L=v.getUniformLocation(S,"sampler0"),c.j={K:v.getAttribLocation(S,"aVertex"),J:v.getAttribLocation(S,"aTex"),ma:L},c.u=v.createBuffer(),v.bindBuffer(v.ARRAY_BUFFER,c.u),v.enableVertexAttribArray(c.j.K),v.vertexAttribPointer(c.j.K,2,v.FLOAT,!1,0,0),v.bufferData(v.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),v.STATIC_DRAW),v.bindBuffer(v.ARRAY_BUFFER,null),c.s=v.createBuffer(),v.bindBuffer(v.ARRAY_BUFFER,c.s),v.enableVertexAttribArray(c.j.J),v.vertexAttribPointer(c.j.J,2,v.FLOAT,!1,0,0),v.bufferData(v.ARRAY_BUFFER,new Float32Array([0,1,0,0,1,0,1,1]),v.STATIC_DRAW),v.bindBuffer(v.ARRAY_BUFFER,null),v.uniform1i(L,0)}S=c.j,v.useProgram(c.o),v.canvas.width=m.width,v.canvas.height=m.height,v.viewport(0,0,m.width,m.height),v.activeTexture(v.TEXTURE0),c.h.bindTexture2d(m.glName),v.enableVertexAttribArray(S.K),v.bindBuffer(v.ARRAY_BUFFER,c.u),v.vertexAttribPointer(S.K,2,v.FLOAT,!1,0,0),v.enableVertexAttribArray(S.J),v.bindBuffer(v.ARRAY_BUFFER,c.s),v.vertexAttribPointer(S.J,2,v.FLOAT,!1,0,0),v.bindFramebuffer(v.DRAW_FRAMEBUFFER?v.DRAW_FRAMEBUFFER:v.FRAMEBUFFER,null),v.clearColor(0,0,0,0),v.clear(v.COLOR_BUFFER_BIT),v.colorMask(!0,!0,!0,!0),v.drawArrays(v.TRIANGLE_FAN,0,4),v.disableVertexAttribArray(S.K),v.disableVertexAttribArray(S.J),v.bindBuffer(v.ARRAY_BUFFER,null),c.h.bindTexture2d(0)}function Eu(c){this.g=c}var Tu=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,9,1,7,0,65,0,253,15,26,11]);function Au(c,m){return m+c}function Ra(c,m){window[c]=m}function bu(c){var m=document.createElement("script");return m.setAttribute("src",c),m.setAttribute("crossorigin","anonymous"),new Promise(function(v){m.addEventListener("load",function(){v()},!1),m.addEventListener("error",function(){v()},!1),document.body.appendChild(m)})}function wu(){return y(function(c){switch(c.g){case 1:return c.o=2,T(c,WebAssembly.instantiate(Tu),4);case 4:c.g=3,c.o=0;break;case 2:return c.o=0,c.j=null,c.return(!1);case 3:return c.return(!0)}})}function js(c){if(this.g=c,this.listeners={},this.j={},this.H={},this.o={},this.u={},this.I=this.s=this.Z=!0,this.D=Promise.resolve(),this.Y="",this.C={},this.locateFile=c&&c.locateFile||Au,typeof window=="object")var m=window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/";else if(typeof location<"u")m=location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/";else throw Error("solutions can only be loaded on a web page or in a web worker");if(this.$=m,c.options){m=a(Object.keys(c.options));for(var v=m.next();!v.done;v=m.next()){v=v.value;var S=c.options[v].default;S!==void 0&&(this.j[v]=typeof S=="function"?S():S)}}}r=js.prototype,r.close=function(){return this.i&&this.i.delete(),Promise.resolve()};function Ru(c){var m,v,S,L,H,U,j,Q,fe,Me,He;return y(function(Ge){switch(Ge.g){case 1:return c.Z?(m=c.g.files===void 0?[]:typeof c.g.files=="function"?c.g.files(c.j):c.g.files,T(Ge,wu(),2)):Ge.return();case 2:if(v=Ge.h,typeof window=="object")return Ra("createMediapipeSolutionsWasm",{locateFile:c.locateFile}),Ra("createMediapipeSolutionsPackedAssets",{locateFile:c.locateFile}),U=m.filter(function(Te){return Te.data!==void 0}),j=m.filter(function(Te){return Te.data===void 0}),Q=Promise.all(U.map(function(Te){var Ze=Xr(c,Te.url);if(Te.path!==void 0){var ot=Te.path;Ze=Ze.then(function(St){return c.overrideFile(ot,St),Promise.resolve(St)})}return Ze})),fe=Promise.all(j.map(function(Te){return Te.simd===void 0||Te.simd&&v||!Te.simd&&!v?bu(c.locateFile(Te.url,c.$)):Promise.resolve()})).then(function(){var Te,Ze,ot;return y(function(St){if(St.g==1)return Te=window.createMediapipeSolutionsWasm,Ze=window.createMediapipeSolutionsPackedAssets,ot=c,T(St,Te(Ze),2);ot.h=St.h,St.g=0})}),Me=function(){return y(function(Te){return c.g.graph&&c.g.graph.url?Te=T(Te,Xr(c,c.g.graph.url),0):(Te.g=0,Te=void 0),Te})}(),T(Ge,Promise.all([fe,Q,Me]),7);if(typeof importScripts!="function")throw Error("solutions can only be loaded on a web page or in a web worker");return S=m.filter(function(Te){return Te.simd===void 0||Te.simd&&v||!Te.simd&&!v}).map(function(Te){return c.locateFile(Te.url,c.$)}),importScripts.apply(null,l(S)),L=c,T(Ge,createMediapipeSolutionsWasm(Module),6);case 6:L.h=Ge.h,c.l=new OffscreenCanvas(1,1),c.h.canvas=c.l,H=c.h.GL.createContext(c.l,{antialias:!1,alpha:!1,ja:typeof WebGL2RenderingContext<"u"?2:1}),c.h.GL.makeContextCurrent(H),Ge.g=4;break;case 7:if(c.l=document.createElement("canvas"),He=c.l.getContext("webgl2",{}),!He&&(He=c.l.getContext("webgl",{}),!He))return alert("Failed to create WebGL canvas context when passing video frame."),Ge.return();c.G=He,c.h.canvas=c.l,c.h.createContext(c.l,!0,!0,{});case 4:c.i=new c.h.SolutionWasm,c.Z=!1,Ge.g=0}})}function Cu(c){var m,v,S,L,H,U,j,Q;return y(function(fe){if(fe.g==1){if(c.g.graph&&c.g.graph.url&&c.Y===c.g.graph.url)return fe.return();if(c.s=!0,!c.g.graph||!c.g.graph.url){fe.g=2;return}return c.Y=c.g.graph.url,T(fe,Xr(c,c.g.graph.url),3)}for(fe.g!=2&&(m=fe.h,c.i.loadGraph(m)),v=a(Object.keys(c.C)),S=v.next();!S.done;S=v.next())L=S.value,c.i.overrideFile(L,c.C[L]);if(c.C={},c.g.listeners)for(H=a(c.g.listeners),U=H.next();!U.done;U=H.next())j=U.value,Du(c,j);Q=c.j,c.j={},c.setOptions(Q),fe.g=0})}r.reset=function(){var c=this;return y(function(m){c.i&&(c.i.reset(),c.o={},c.u={}),m.g=0})},r.setOptions=function(c,m){var v=this;if(m=m||this.g.options){for(var S=[],L=[],H={},U=a(Object.keys(c)),j=U.next();!j.done;H={R:H.R,S:H.S},j=U.next()){var Q=j.value;Q in this.j&&this.j[Q]===c[Q]||(this.j[Q]=c[Q],j=m[Q],j!==void 0&&(j.onChange&&(H.R=j.onChange,H.S=c[Q],S.push(function(fe){return function(){var Me;return y(function(He){if(He.g==1)return T(He,fe.R(fe.S),2);Me=He.h,Me===!0&&(v.s=!0),He.g=0})}}(H))),j.graphOptionXref&&(Q={valueNumber:j.type===1?c[Q]:0,valueBoolean:j.type===0?c[Q]:!1,valueString:j.type===2?c[Q]:""},j=Object.assign(Object.assign(Object.assign({},{calculatorName:"",calculatorIndex:0}),j.graphOptionXref),Q),L.push(j))))}(S.length!==0||L.length!==0)&&(this.s=!0,this.B=(this.B===void 0?[]:this.B).concat(L),this.A=(this.A===void 0?[]:this.A).concat(S))}};function Lu(c){var m,v,S,L,H,U,j;return y(function(Q){switch(Q.g){case 1:if(!c.s)return Q.return();if(!c.A){Q.g=2;break}m=a(c.A),v=m.next();case 3:if(v.done){Q.g=5;break}return S=v.value,T(Q,S(),4);case 4:v=m.next(),Q.g=3;break;case 5:c.A=void 0;case 2:if(c.B){for(L=new c.h.GraphOptionChangeRequestList,H=a(c.B),U=H.next();!U.done;U=H.next())j=U.value,L.push_back(j);c.i.changeOptions(L),L.delete(),c.B=void 0}c.s=!1,Q.g=0}})}r.initialize=function(){var c=this;return y(function(m){return m.g==1?T(m,Ru(c),2):m.g!=3?T(m,Cu(c),3):T(m,Lu(c),0)})};function Xr(c,m){var v,S;return y(function(L){return m in c.H?L.return(c.H[m]):(v=c.locateFile(m,""),S=fetch(v).then(function(H){return H.arrayBuffer()}),c.H[m]=S,L.return(S))})}r.overrideFile=function(c,m){this.i?this.i.overrideFile(c,m):this.C[c]=m},r.clearOverriddenFiles=function(){this.C={},this.i&&this.i.clearOverriddenFiles()},r.send=function(c,m){var v=this,S,L,H,U,j,Q,fe,Me,He;return y(function(Ge){switch(Ge.g){case 1:return v.g.inputs?(S=1e3*(m??performance.now()),T(Ge,v.D,2)):Ge.return();case 2:return T(Ge,v.initialize(),3);case 3:for(L=new v.h.PacketDataList,H=a(Object.keys(c)),U=H.next();!U.done;U=H.next())if(j=U.value,Q=v.g.inputs[j]){e:{var Te=c[j];switch(Q.type){case"video":var Ze=v.o[Q.stream];if(Ze||(Ze=new Xs(v.h,v.G),v.o[Q.stream]=Ze),Ze.l===0&&(Ze.l=Ze.h.createTexture()),typeof HTMLVideoElement<"u"&&Te instanceof HTMLVideoElement)var ot=Te.videoWidth,St=Te.videoHeight;else typeof HTMLImageElement<"u"&&Te instanceof HTMLImageElement?(ot=Te.naturalWidth,St=Te.naturalHeight):(ot=Te.width,St=Te.height);St={glName:Ze.l,width:ot,height:St},ot=Ze.g,ot.canvas.width=St.width,ot.canvas.height=St.height,ot.activeTexture(ot.TEXTURE0),Ze.h.bindTexture2d(Ze.l),ot.texImage2D(ot.TEXTURE_2D,0,ot.RGBA,ot.RGBA,ot.UNSIGNED_BYTE,Te),Ze.h.bindTexture2d(0),Ze=St;break e;case"detections":for(Ze=v.o[Q.stream],Ze||(Ze=new Eu(v.h),v.o[Q.stream]=Ze),Ze.data||(Ze.data=new Ze.g.DetectionListData),Ze.data.reset(Te.length),St=0;St<Te.length;++St){ot=Te[St];var xt=Ze.data,Gt=xt.setBoundingBox,on=St,Jt=ot.boundingBox,ct=new Ws;if(le(ct,1,Jt.xCenter),le(ct,2,Jt.yCenter),le(ct,3,Jt.height),le(ct,4,Jt.width),le(ct,5,Jt.rotation),le(ct,6,Jt.rectId),Jt=Ln(ct,xa),Gt.call(xt,on,Jt),ot.landmarks)for(xt=0;xt<ot.landmarks.length;++xt){ct=ot.landmarks[xt];var Pt=!!ct.visibility;Gt=Ze.data,on=Gt.addNormalizedLandmark,Jt=St,ct=Object.assign(Object.assign({},ct),{visibility:Pt?ct.visibility:0}),Pt=new Wr,le(Pt,1,ct.x),le(Pt,2,ct.y),le(Pt,3,ct.z),ct.visibility&&le(Pt,4,ct.visibility),ct=Ln(Pt,_a),on.call(Gt,Jt,ct)}if(ot.V)for(xt=0;xt<ot.V.length;++xt)Gt=Ze.data,on=Gt.addClassification,Jt=St,ct=ot.V[xt],Pt=new Er,le(Pt,2,ct.ga),ct.index&&le(Pt,1,ct.index),ct.label&&le(Pt,3,ct.label),ct.displayName&&le(Pt,4,ct.displayName),ct=Ln(Pt,ga),on.call(Gt,Jt,ct)}Ze=Ze.data;break e;default:Ze={}}}switch(fe=Ze,Me=Q.stream,Q.type){case"video":L.pushTexture2d(Object.assign(Object.assign({},fe),{stream:Me,timestamp:S}));break;case"detections":He=fe,He.stream=Me,He.timestamp=S,L.pushDetectionList(He);break;default:throw Error("Unknown input config type: '"+Q.type+"'")}}return v.i.send(L),T(Ge,v.D,4);case 4:L.delete(),Ge.g=0}})};function Pu(c,m,v){var S,L,H,U,j,Q,fe,Me,He,Ge,Te,Ze,ot,St;return y(function(xt){switch(xt.g){case 1:if(!v)return xt.return(m);for(S={},L=0,H=a(Object.keys(v)),U=H.next();!U.done;U=H.next())j=U.value,Q=v[j],typeof Q!="string"&&Q.type==="texture"&&m[Q.stream]!==void 0&&++L;1<L&&(c.I=!1),fe=a(Object.keys(v)),U=fe.next();case 2:if(U.done){xt.g=4;break}if(Me=U.value,He=v[Me],typeof He=="string")return ot=S,St=Me,T(xt,Iu(c,Me,m[He]),14);if(Ge=m[He.stream],He.type==="detection_list"){if(Ge){for(var Gt=Ge.getRectList(),on=Ge.getLandmarksList(),Jt=Ge.getClassificationsList(),ct=[],Pt=0;Pt<Gt.size();++Pt){var Xn=pn(Gt.get(Pt),Ws,xa);Xn={boundingBox:{xCenter:Ee(Xn,1),yCenter:Ee(Xn,2),height:Ee(Xn,3),width:Ee(Xn,4),rotation:Ee(Xn,5,0),rectId:Rt(Xn,6)},landmarks:lt(pn(on.get(Pt),va,_u),Wr,1).map(Mu),V:yu(pn(Jt.get(Pt),Vs,mu))},ct.push(Xn)}Gt=ct}else Gt=[];S[Me]=Gt,xt.g=7;break}if(He.type==="proto_list"){if(Ge){for(Gt=Array(Ge.size()),on=0;on<Ge.size();on++)Gt[on]=Ge.get(on);Ge.delete()}else Gt=[];S[Me]=Gt,xt.g=7;break}if(Ge===void 0){xt.g=3;break}if(He.type==="float_list"){S[Me]=Ge,xt.g=7;break}if(He.type==="proto"){S[Me]=Ge,xt.g=7;break}if(He.type!=="texture")throw Error("Unknown output config type: '"+He.type+"'");return Te=c.u[Me],Te||(Te=new Xs(c.h,c.G),c.u[Me]=Te),T(xt,wa(Te,Ge,c.I),13);case 13:Ze=xt.h,S[Me]=Ze;case 7:He.transform&&S[Me]&&(S[Me]=He.transform(S[Me])),xt.g=3;break;case 14:ot[St]=xt.h;case 3:U=fe.next(),xt.g=2;break;case 4:return xt.return(S)}})}function Iu(c,m,v){var S;return y(function(L){return typeof v=="number"||v instanceof Uint8Array||v instanceof c.h.Uint8BlobList?L.return(v):v instanceof c.h.Texture2dDataOut?(S=c.u[m],S||(S=new Xs(c.h,c.G),c.u[m]=S),L.return(wa(S,v,c.I))):L.return(void 0)})}function Du(c,m){for(var v=m.name||"$",S=[].concat(l(m.wants)),L=new c.h.StringList,H=a(m.wants),U=H.next();!U.done;U=H.next())L.push_back(U.value);H=c.h.PacketListener.implement({onResults:function(j){for(var Q={},fe=0;fe<m.wants.length;++fe)Q[S[fe]]=j.get(fe);var Me=c.listeners[v];Me&&(c.D=Pu(c,Q,m.outs).then(function(He){He=Me(He);for(var Ge=0;Ge<m.wants.length;++Ge){var Te=Q[S[Ge]];typeof Te=="object"&&Te.hasOwnProperty&&Te.hasOwnProperty("delete")&&Te.delete()}He&&(c.D=He)}))}}),c.i.attachMultiListener(L,H),L.delete()}r.onResults=function(c,m){this.listeners[m||"$"]=c},N("Solution",js),N("OptionType",{BOOL:0,NUMBER:1,ia:2,0:"BOOL",1:"NUMBER",2:"STRING"});function Ca(c){var m=this;c=c||{};var v={url:"face_detection_short.binarypb"},S={type:1,graphOptionXref:{calculatorType:"TensorsToDetectionsCalculator",calculatorName:"facedetectionshortrangegpu__facedetectionshortrangecommon__TensorsToDetectionsCalculator",fieldName:"min_score_thresh"}};this.g=new js({locateFile:c.locateFile,files:[{data:!0,url:"face_detection_short.binarypb"},{data:!0,url:"face_detection_short_range.tflite"},{simd:!0,url:"face_detection_solution_simd_wasm_bin.js"},{simd:!1,url:"face_detection_solution_wasm_bin.js"}],graph:v,listeners:[{wants:["detections","image_transformed"],outs:{image:"image_transformed",detections:{type:"detection_list",stream:"detections"}}}],inputs:{image:{type:"video",stream:"input_frames_gpu"}},options:{useCpuInference:{type:0,graphOptionXref:{calculatorType:"InferenceCalculator",fieldName:"use_cpu_inference"},default:typeof window!="object"||window.navigator===void 0?!1:"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document},selfieMode:{type:0,graphOptionXref:{calculatorType:"GlScalerCalculator",calculatorIndex:1,fieldName:"flip_horizontal"}},model:{type:0,onChange:function(L){var H,U,j,Q,fe,Me;return y(function(He){switch(He.g){case 1:H=L==="short"?["face_detection_short_range.tflite"]:["face_detection_full_range_sparse.tflite"],U=a(H),j=U.next();case 2:if(j.done){He.g=4;break}return Q=j.value,fe="third_party/mediapipe/modules/face_detection/"+Q,T(He,Xr(m.g,Q),5);case 5:Me=He.h,m.g.overrideFile(fe,Me),j=U.next(),He.g=2;break;case 4:return v.url=L==="short"?"face_detection_short.binarypb":"face_detection_full.binarypb",S.graphOptionXref.calculatorName=L==="short"?"facedetectionshortrangegpu__facedetectionshortrangecommon__TensorsToDetectionsCalculator":"facedetectionfullrangegpu__facedetectionfullrangecommon__TensorsToDetectionsCalculator",He.return(!0)}})}},minDetectionConfidence:S}})}r=Ca.prototype,r.close=function(){return this.g.close(),Promise.resolve()},r.onResults=function(c){this.g.onResults(c)},r.initialize=function(){var c=this;return y(function(m){return T(m,c.g.initialize(),0)})},r.reset=function(){this.g.reset()},r.send=function(c){var m=this;return y(function(v){return T(v,m.g.send(c),0)})},r.setOptions=function(c){this.g.setOptions(c)},N("FaceDetection",Ca),N("FACEDETECTION_LIPS",ya),N("FACEDETECTION_LEFT_EYE",Ma),N("FACEDETECTION_LEFT_EYEBROW",Sa),N("FACEDETECTION_RIGHT_EYE",Ea),N("FACEDETECTION_RIGHT_EYEBROW",Ta),N("FACEDETECTION_FACE_OVAL",Aa),N("FACEDETECTION_CONTOURS",xu),N("FACEDETECTION_TESSELATION",[[127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]]),N("VERSION","0.4.1646425229")}).call(nr);var A0={};(function(){function r(y){var I=0;return function(){return I<y.length?{done:!1,value:y[I++]}:{done:!0}}}var e=typeof Object.defineProperties=="function"?Object.defineProperty:function(y,I,W){return y==Array.prototype||y==Object.prototype||(y[I]=W.value),y};function t(y){y=[typeof globalThis=="object"&&globalThis,y,typeof window=="object"&&window,typeof self=="object"&&self,typeof nr=="object"&&nr];for(var I=0;I<y.length;++I){var W=y[I];if(W&&W.Math==Math)return W}throw Error("Cannot find global object")}var n=t(this);function i(y,I){if(I)e:{var W=n;y=y.split(".");for(var te=0;te<y.length-1;te++){var N=y[te];if(!(N in W))break e;W=W[N]}y=y[y.length-1],te=W[y],I=I(te),I!=te&&I!=null&&e(W,y,{configurable:!0,writable:!0,value:I})}}i("Symbol",function(y){function I(k){if(this instanceof I)throw new TypeError("Symbol is not a constructor");return new W(te+(k||"")+"_"+N++,k)}function W(k,F){this.g=k,e(this,"description",{configurable:!0,writable:!0,value:F})}if(y)return y;W.prototype.toString=function(){return this.g};var te="jscomp_symbol_"+(1e9*Math.random()>>>0)+"_",N=0;return I}),i("Symbol.iterator",function(y){if(y)return y;y=Symbol("Symbol.iterator");for(var I="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),W=0;W<I.length;W++){var te=n[I[W]];typeof te=="function"&&typeof te.prototype[y]!="function"&&e(te.prototype,y,{configurable:!0,writable:!0,value:function(){return s(r(this))}})}return y});function s(y){return y={next:y},y[Symbol.iterator]=function(){return this},y}function o(y){var I=typeof Symbol<"u"&&Symbol.iterator&&y[Symbol.iterator];return I?I.call(y):{next:r(y)}}function a(){this.i=!1,this.g=null,this.o=void 0,this.j=1,this.m=0,this.h=null}function l(y){if(y.i)throw new TypeError("Generator is already running");y.i=!0}a.prototype.l=function(y){this.o=y};function u(y,I){y.h={F:I,G:!0},y.j=y.m}a.prototype.return=function(y){this.h={return:y},this.j=this.m};function h(y){this.g=new a,this.h=y}function f(y,I){l(y.g);var W=y.g.g;return W?d(y,"return"in W?W.return:function(te){return{value:te,done:!0}},I,y.g.return):(y.g.return(I),_(y))}function d(y,I,W,te){try{var N=I.call(y.g.g,W);if(!(N instanceof Object))throw new TypeError("Iterator result "+N+" is not an object");if(!N.done)return y.g.i=!1,N;var k=N.value}catch(F){return y.g.g=null,u(y.g,F),_(y)}return y.g.g=null,te.call(y.g,k),_(y)}function _(y){for(;y.g.j;)try{var I=y.h(y.g);if(I)return y.g.i=!1,{value:I.value,done:!1}}catch(W){y.g.o=void 0,u(y.g,W)}if(y.g.i=!1,y.g.h){if(I=y.g.h,y.g.h=null,I.G)throw I.F;return{value:I.return,done:!0}}return{value:void 0,done:!0}}function x(y){this.next=function(I){return l(y.g),y.g.g?I=d(y,y.g.g.next,I,y.g.l):(y.g.l(I),I=_(y)),I},this.throw=function(I){return l(y.g),y.g.g?I=d(y,y.g.g.throw,I,y.g.l):(u(y.g,I),I=_(y)),I},this.return=function(I){return f(y,I)},this[Symbol.iterator]=function(){return this}}function M(y){function I(te){return y.next(te)}function W(te){return y.throw(te)}return new Promise(function(te,N){function k(F){F.done?te(F.value):Promise.resolve(F.value).then(I,W).then(k,N)}k(y.next())})}i("Promise",function(y){function I(F){this.h=0,this.i=void 0,this.g=[],this.o=!1;var X=this.j();try{F(X.resolve,X.reject)}catch(Z){X.reject(Z)}}function W(){this.g=null}function te(F){return F instanceof I?F:new I(function(X){X(F)})}if(y)return y;W.prototype.h=function(F){if(this.g==null){this.g=[];var X=this;this.i(function(){X.l()})}this.g.push(F)};var N=n.setTimeout;W.prototype.i=function(F){N(F,0)},W.prototype.l=function(){for(;this.g&&this.g.length;){var F=this.g;this.g=[];for(var X=0;X<F.length;++X){var Z=F[X];F[X]=null;try{Z()}catch(ee){this.j(ee)}}}this.g=null},W.prototype.j=function(F){this.i(function(){throw F})},I.prototype.j=function(){function F(ee){return function(ie){Z||(Z=!0,ee.call(X,ie))}}var X=this,Z=!1;return{resolve:F(this.A),reject:F(this.l)}},I.prototype.A=function(F){if(F===this)this.l(new TypeError("A Promise cannot resolve to itself"));else if(F instanceof I)this.C(F);else{e:switch(typeof F){case"object":var X=F!=null;break e;case"function":X=!0;break e;default:X=!1}X?this.v(F):this.m(F)}},I.prototype.v=function(F){var X=void 0;try{X=F.then}catch(Z){this.l(Z);return}typeof X=="function"?this.D(X,F):this.m(F)},I.prototype.l=function(F){this.u(2,F)},I.prototype.m=function(F){this.u(1,F)},I.prototype.u=function(F,X){if(this.h!=0)throw Error("Cannot settle("+F+", "+X+"): Promise already settled in state"+this.h);this.h=F,this.i=X,this.h===2&&this.B(),this.H()},I.prototype.B=function(){var F=this;N(function(){if(F.I()){var X=n.console;typeof X<"u"&&X.error(F.i)}},1)},I.prototype.I=function(){if(this.o)return!1;var F=n.CustomEvent,X=n.Event,Z=n.dispatchEvent;return typeof Z>"u"?!0:(typeof F=="function"?F=new F("unhandledrejection",{cancelable:!0}):typeof X=="function"?F=new X("unhandledrejection",{cancelable:!0}):(F=n.document.createEvent("CustomEvent"),F.initCustomEvent("unhandledrejection",!1,!0,F)),F.promise=this,F.reason=this.i,Z(F))},I.prototype.H=function(){if(this.g!=null){for(var F=0;F<this.g.length;++F)k.h(this.g[F]);this.g=null}};var k=new W;return I.prototype.C=function(F){var X=this.j();F.s(X.resolve,X.reject)},I.prototype.D=function(F,X){var Z=this.j();try{F.call(X,Z.resolve,Z.reject)}catch(ee){Z.reject(ee)}},I.prototype.then=function(F,X){function Z(ae,J){return typeof ae=="function"?function(re){try{ee(ae(re))}catch(_e){ie(_e)}}:J}var ee,ie,he=new I(function(ae,J){ee=ae,ie=J});return this.s(Z(F,ee),Z(X,ie)),he},I.prototype.catch=function(F){return this.then(void 0,F)},I.prototype.s=function(F,X){function Z(){switch(ee.h){case 1:F(ee.i);break;case 2:X(ee.i);break;default:throw Error("Unexpected state: "+ee.h)}}var ee=this;this.g==null?k.h(Z):this.g.push(Z),this.o=!0},I.resolve=te,I.reject=function(F){return new I(function(X,Z){Z(F)})},I.race=function(F){return new I(function(X,Z){for(var ee=o(F),ie=ee.next();!ie.done;ie=ee.next())te(ie.value).s(X,Z)})},I.all=function(F){var X=o(F),Z=X.next();return Z.done?te([]):new I(function(ee,ie){function he(re){return function(_e){ae[re]=_e,J--,J==0&&ee(ae)}}var ae=[],J=0;do ae.push(void 0),J++,te(Z.value).s(he(ae.length-1),ie),Z=X.next();while(!Z.done)})},I});var g=typeof Object.assign=="function"?Object.assign:function(y,I){for(var W=1;W<arguments.length;W++){var te=arguments[W];if(te)for(var N in te)Object.prototype.hasOwnProperty.call(te,N)&&(y[N]=te[N])}return y};i("Object.assign",function(y){return y||g});var p=this||self,R={facingMode:"user",width:640,height:480};function T(y,I){this.video=y,this.i=0,this.h=Object.assign(Object.assign({},R),I)}T.prototype.stop=function(){var y=this,I,W,te,N;return M(new x(new h(function(k){if(y.g){for(I=y.g.getTracks(),W=o(I),te=W.next();!te.done;te=W.next())N=te.value,N.stop();y.g=void 0}k.j=0})))},T.prototype.start=function(){var y=this,I;return M(new x(new h(function(W){return navigator.mediaDevices&&navigator.mediaDevices.getUserMedia||alert("No navigator.mediaDevices.getUserMedia exists."),I=y.h,W.return(navigator.mediaDevices.getUserMedia({video:{facingMode:I.facingMode,width:I.width,height:I.height}}).then(function(te){B(y,te)}).catch(function(te){var N="Failed to acquire camera feed: "+te;throw console.error(N),alert(N),te}))})))};function C(y){window.requestAnimationFrame(function(){D(y)})}function B(y,I){y.g=I,y.video.srcObject=I,y.video.onloadedmetadata=function(){y.video.play(),C(y)}}function D(y){var I=null;y.video.paused||y.video.currentTime===y.i||(y.i=y.video.currentTime,I=y.h.onFrame()),I?I.then(function(){C(y)}):C(y)}var P=["Camera"],ne=p;P[0]in ne||typeof ne.execScript>"u"||ne.execScript("var "+P[0]);for(var A;P.length&&(A=P.shift());)P.length||T===void 0?ne[A]&&ne[A]!==Object.prototype[A]?ne=ne[A]:ne=ne[A]={}:ne[A]=T}).call(nr);const Io=document.getElementById("webcam"),b0=document.getElementById("three-canvas"),Mi=document.getElementById("face-status"),w0=document.getElementById("glb-input"),R0=document.getElementById("sensitivity"),C0=document.getElementById("sensitivity-value"),L0=document.getElementById("scale"),P0=document.getElementById("scale-value");let Us=3,Nr=1,As=1,Hn={x:0,y:0,z:2},bs={x:0,y:0,z:2};const sn=new i_;sn.background=new Ne(0);const Si=new Kt(60,window.innerWidth/window.innerHeight,.1,1e3);Si.position.set(0,0,5);const zs=new Ql({canvas:b0,antialias:!0});zs.setSize(window.innerWidth,window.innerHeight);zs.setPixelRatio(window.devicePixelRatio);const I0=new D_(4210752,.5);sn.add(I0);const uu=new au(16777215,1);uu.position.set(5,5,5);sn.add(uu);const hu=new ou(65535,1,100);hu.position.set(0,0,3);sn.add(hu);function Gr(r){return new ri({uniforms:{color:{value:new Ne(r)},opacity:{value:.5}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 color;
      uniform float opacity;
      varying vec2 vUv;

      void main() {
        vec2 grid = abs(fract(vUv * 10.0 - 0.5) - 0.5) / fwidth(vUv * 10.0);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - min(line, 1.0);
        if (alpha < 0.1) discard;
        gl_FragColor = vec4(color, alpha * opacity);
      }
    `,transparent:!0,side:vn})}const Mn=10,zr=Mn/2,D0=new oi(Mn,Mn),ua=new Bt(D0,Gr(65535));ua.rotation.x=-Math.PI/2;ua.position.y=-zr;sn.add(ua);const U0=new oi(Mn,Mn),ha=new Bt(U0,Gr(65535));ha.rotation.x=Math.PI/2;ha.position.y=zr;sn.add(ha);const N0=new oi(Mn,Mn),fu=new Bt(N0,Gr(35071));fu.position.z=-zr;sn.add(fu);const O0=new oi(Mn,Mn),fa=new Bt(O0,Gr(65416));fa.rotation.y=Math.PI/2;fa.position.x=-zr;sn.add(fa);const F0=new oi(Mn,Mn),da=new Bt(F0,Gr(65416));da.rotation.y=-Math.PI/2;da.position.x=zr;sn.add(da);let En=null;const B0=new W_,du=new dr(1,1,1),H0=new p_({color:65535,emissive:13107,transparent:!0,opacity:.8,wireframe:!1}),pa=new Bt(du,H0);sn.add(pa);En=pa;const G0=new tu(new d_(du),new ra({color:65535}));pa.add(G0);w0.addEventListener("change",r=>{const e=r.target.files[0];if(!e)return;const t=URL.createObjectURL(e);B0.load(t,n=>{En&&sn.remove(En),En=n.scene;const i=new wn().setFromObject(En),s=i.getSize(new G);As=2/Math.max(s.x,s.y,s.z),En.scale.setScalar(As*Nr);const a=i.getCenter(new G);En.position.sub(a.multiplyScalar(As*Nr)),sn.add(En),URL.revokeObjectURL(t)})});R0.addEventListener("input",r=>{Us=parseFloat(r.target.value),C0.textContent=Us.toFixed(1)});L0.addEventListener("input",r=>{Nr=parseFloat(r.target.value),P0.textContent=Nr.toFixed(1),En&&En.scale.setScalar(As*Nr)});const ma=new T0.FaceDetection({locateFile:r=>`https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${r}`});ma.setOptions({model:"short",minDetectionConfidence:.5});ma.onResults(r=>{var e,t;if(r.detections.length>0){const n=r.detections[0],i=n.boundingBox,s=-(i.xCenter-.5)*2,o=-(i.yCenter-.5)*2,l=2+(.1-i.width*i.height)*10;bs={x:s*Us*3,y:o*Us*2,z:Math.max(2,Math.min(8,l))};const u=n.score?n.score[0]:((t=(e=n.detection)==null?void 0:e.score)==null?void 0:t[0])??.9;Mi.textContent=`顔検出: 検出中 (${(u*100).toFixed(0)}%)`,Mi.style.color="#0f0"}else Mi.textContent="顔検出: 未検出",Mi.style.color="#ff0"});async function z0(){try{const r=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:"user"}});Io.srcObject=r,new A0.Camera(Io,{onFrame:async()=>{await ma.send({image:Io})},width:640,height:480}).start(),Mi.textContent="顔検出: 開始"}catch(r){console.error("カメラの起動に失敗:",r),Mi.textContent="カメラエラー",Mi.style.color="#f00"}}function pu(){requestAnimationFrame(pu),Hn.x+=(bs.x-Hn.x)*.1,Hn.y+=(bs.y-Hn.y)*.1,Hn.z+=(bs.z-Hn.z)*.1;const r=Hn.x,e=Hn.y,t=Hn.z+5;Si.position.set(r,e,t);const n=.1,i=100,o=t-0,a=window.innerWidth/window.innerHeight,l=60*Math.PI/180,u=n*Math.tan(l/2),h=-u,f=u*a,d=-f,_=-r*n/o,x=-e*n/o;Si.projectionMatrix.makePerspective(d+_,f+_,u+x,h+x,n,i),Si.lookAt(r,e,0),zs.render(sn,Si)}window.addEventListener("resize",()=>{Si.aspect=window.innerWidth/window.innerHeight,Si.updateProjectionMatrix(),zs.setSize(window.innerWidth,window.innerHeight)});z0();pu();
