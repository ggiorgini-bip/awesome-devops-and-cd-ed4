document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("chatTextInput"),t=document.getElementById("chatTextSend"),n=document.getElementById("chatTextForm"),s=document.querySelector(".grid-user"),r=document.querySelector(".grid-computer"),o=document.querySelector(".grid-display"),i=document.querySelectorAll(".ship"),a=document.querySelector(".destroyer-container"),c=document.querySelector(".submarine-container"),l=document.querySelector(".cruiser-container"),d=document.querySelector(".battleship-container"),u=document.querySelector(".carrier-container"),m=document.querySelector("#start"),y=document.querySelector("#rotate"),L=document.querySelector("#whose-go"),g=document.querySelector("#info"),h=document.getElementById("setup-buttons"),p=[],f=[];let v=!0,b=!1,E="user";const T=10;let M=0,S=!1,k=!1,H=!1,q=-1;function I(e,t){for(let n=0;n<100;n++){const s=document.createElement("div");s.dataset.id=n,e.appendChild(s),t.push(s)}}let $,Y,x;function P(){Y=this,x=this.childNodes.length}function C(e){e.preventDefault()}function w(e){e.preventDefault()}function G(){}function O(){let e=Y.lastChild.id,t=e.slice(0,-2),n=parseInt(e.substr(-1)),s=n+parseInt(this.dataset.id);let r=[0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93].splice(0,10*n),i=[99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60].splice(0,10*n);if(selectedShipIndex=parseInt($.substr(-1)),s-=selectedShipIndex,v&&!r.includes(s))for(let e=0;e<x;e++){let n;0===e&&(n="start"),e===x-1&&(n="end"),p[parseInt(this.dataset.id)-selectedShipIndex+e].classList.add("taken","horizontal",n,t)}else{if(v||i.includes(s))return;for(let e=0;e<x;e++){let n;0===e&&(n="start"),e===x-1&&(n="end"),p[parseInt(this.dataset.id)-selectedShipIndex+T*e].classList.add("taken","vertical",n,t)}}o.removeChild(Y),o.querySelector(".ship")||(H=!0)}function B(){}function D(e){h.style.display="none",b||(S||(e.emit("player-ready"),S=!0,N(M)),k&&("user"===E&&(L.innerHTML="Your Go",document.body.classList.add("your-go"),document.body.classList.remove("enemys-go")),"enemy"===E&&(L.innerHTML="Enemy's Go",document.body.classList.add("enemys-go"),document.body.classList.remove("your-go"))))}function N(e){let t=`.p${parseInt(e)+1}`;document.querySelector(`${t} .ready`).classList.toggle("active")}function W(){b||("user"===E&&(L.innerHTML="Your Go",document.body.classList.add("your-go"),document.body.classList.remove("enemys-go"),f.forEach((e=>e.addEventListener("click",(function(t){q=e.dataset.id,J(e.classList)}))))),"enemy"===E&&(L.innerHTML="Computers Go",setTimeout(Z,1e3)))}I(s,p),I(r,f),"singlePlayer"===gameMode?startSinglePlayer():function(){const s=io("ws://"+window.location.hostname+":1235");function r(e){let t=`.p${parseInt(e)+1}`;document.querySelector(`${t} .connected`).classList.toggle("active"),parseInt(e)===M&&(document.querySelector(t).style.fontWeight="bold")}console.info("startMultiPlayer() has been called"),n.addEventListener("submit",(e=>{e.preventDefault()})),t.addEventListener("click",(t=>{s.emit("game-message",e.value),e.value=""})),s.on("player-number",(e=>{-1===e?g.innerHTML="Sorry, the server is full":(M=parseInt(e),1===M&&(E="enemy"),console.log(M),s.emit("check-players"))})),s.on("player-connection",(e=>{console.log(`Player number ${e} has connected or disconnected`),r(e)})),s.on("enemy-ready",(e=>{k=!0,N(e),S&&(D(s),h.style.display="none")})),s.on("check-players",(e=>{e.forEach(((e,t)=>{e.connected&&r(t),e.ready&&(N(t),t!==N&&(k=!0))}))})),s.on("timeout",(()=>{g.innerHTML='You have reached the 10 minute limit! To play again <a href="/">click here</a>!'})),s.on("game-message-broadcast",(e=>{const t=document.querySelector(".player.chat");t.innerText=`Enemy: ${e}`,setTimeout((()=>t.innerText=""),2500)})),m.addEventListener("click",(()=>{H?(g.innerHTML="",D(s)):g.innerHTML="Please place all ships in the upper left frame 👇"})),f.forEach((e=>{e.addEventListener("click",(()=>{"user"===E&&S&&k&&(q=e.dataset.id,s.emit("fire",q))}))})),s.on("fire",(e=>{Z(e);const t=p[e];s.emit("fire-reply",t.classList),D(s)})),s.on("fire-reply",(e=>{J(e),D(s)}))}(),y.addEventListener("click",(function(){return v?(a.classList.toggle("destroyer-container-vertical"),c.classList.toggle("submarine-container-vertical"),l.classList.toggle("cruiser-container-vertical"),d.classList.toggle("battleship-container-vertical"),u.classList.toggle("carrier-container-vertical"),void(v=!1)):v?void 0:(a.classList.toggle("destroyer-container-vertical"),c.classList.toggle("submarine-container-vertical"),l.classList.toggle("cruiser-container-vertical"),d.classList.toggle("battleship-container-vertical"),u.classList.toggle("carrier-container-vertical"),void(v=!0))})),i.forEach((e=>e.addEventListener("dragstart",P))),p.forEach((e=>e.addEventListener("dragstart",P))),p.forEach((e=>e.addEventListener("dragover",C))),p.forEach((e=>e.addEventListener("dragenter",w))),p.forEach((e=>e.addEventListener("dragleave",G))),p.forEach((e=>e.addEventListener("drop",O))),p.forEach((e=>e.addEventListener("dragend",B))),i.forEach((e=>e.addEventListener("mousedown",(e=>{$=e.target.id}))));let U=0,j=0,z=0,A=0,F=0;function J(e){const t=r.querySelector(`div[data-id='${q}']`),n=Object.values(e);t.classList.contains("boom")||"user"!==E||b||(n.includes("destroyer")&&U++,n.includes("submarine")&&j++,n.includes("cruiser")&&z++,n.includes("battleship")&&A++,n.includes("carrier")&&F++),n.includes("taken")?t.classList.add("boom"):t.classList.add("miss"),_(),E="enemy","singlePlayer"===gameMode&&W()}let K=0,Q=0,R=0,V=0,X=0;function Z(e){if("singlePlayer"===gameMode&&(e=Math.floor(Math.random()*p.length)),p[e].classList.contains("boom"))"singlePlayer"===gameMode&&Z();else{const t=p[e].classList.contains("taken");p[e].classList.add(t?"boom":"miss"),p[e].classList.contains("destroyer")&&K++,p[e].classList.contains("submarine")&&Q++,p[e].classList.contains("cruiser")&&R++,p[e].classList.contains("battleship")&&V++,p[e].classList.contains("carrier")&&X++,_()}E="user",L.innerHTML="Your Go",document.body.classList.add("your-go"),document.body.classList.remove("enemys-go")}function _(){let e="computer";"multiPlayer"===gameMode&&(e="enemy"),2===U&&(g.innerHTML=`You sunk the ${e}'s destroyer`,U=10),3===j&&(g.innerHTML=`You sunk the ${e}'s submarine`,j=10),3===z&&(g.innerHTML=`You sunk the ${e}'s cruiser`,z=10),4===A&&(g.innerHTML=`You sunk the ${e}'s battleship`,A=10),5===F&&(g.innerHTML=`You sunk the ${e}'s carrier`,F=10),2===K&&(g.innerHTML=`${e} sunk your destroyer`,K=10),3===Q&&(g.innerHTML=`${e} sunk your submarine`,Q=10),3===R&&(g.innerHTML=`${e} sunk your cruiser`,R=10),4===V&&(g.innerHTML=`${e} sunk your battleship`,V=10),5===X&&(g.innerHTML=`${e} sunk your carrier`,X=10),U+j+z+A+F===50&&(g.innerHTML='YOU WON! To play again <a href="/">click here</a>!',ee()),K+Q+R+V+X===50&&(g.innerHTML=`${e.toUpperCase()} WON! To play again <a href="/">click here</a>!`,ee())}function ee(){b=!0,m.removeEventListener("click",W)}}));
//# sourceMappingURL=index.f5aefab9.js.map