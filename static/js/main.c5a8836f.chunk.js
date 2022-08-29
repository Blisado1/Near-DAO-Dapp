(this["webpackJsonpdao-dapp"]=this["webpackJsonpdao-dapp"]||[]).push([[0],{150:function(e,t){},160:function(e,t){},178:function(e,t){},208:function(e,t,n){},211:function(e,t,n){},212:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(30),o=n.n(c),s=n(260),i=n(8),l=n.n(i),u=n(16),j=Object({NODE_ENV:"production",PUBLIC_URL:"/Near-DAO-Dapp",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).CONTRACT_NAME||"dao-dapp.testnet";var d=function(e){switch(e){case"mainnet":return{networkId:"mainnet",nodeUrl:"https://rpc.mainnet.near.org",contractName:j,walletUrl:"https://wallet.near.org",helperUrl:"https://helper.mainnet.near.org",explorerUrl:"https://explorer.mainnet.near.org"};case"testnet":return{networkId:"testnet",nodeUrl:"https://rpc.testnet.near.org",contractName:j,walletUrl:"https://wallet.testnet.near.org",helperUrl:"https://helper.testnet.near.org",explorerUrl:"https://explorer.testnet.near.org"};default:throw Error("Unknown environment '".concat(e,"'."))}},b=n(32),p=n(36),h=d("testnet");function x(){return(x=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.connect)(Object.assign({deps:{keyStore:new b.keyStores.BrowserLocalStorageKeyStore}},h));case 2:t=e.sent,window.walletConnection=new b.WalletConnection(t),window.accountId=window.walletConnection.getAccountId(),window.contract=new b.Contract(window.walletConnection.account(),h.contractName,{viewMethods:["getProposals","getInvestorData","hasVoted","contractParam"],changeMethods:["contributeToDAO","redeemShares","transferShares","createProposal","vote","executeProposal"]});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){return O.apply(this,arguments)}function O(){return(O=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=p.formatNearAmount,e.next=3,window.walletConnection.account().getAccountBalance();case 3:return e.t1=e.sent.total,e.abrupt("return",(0,e.t0)(e.t1,2));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){window.walletConnection.requestSignIn(h.contractName)}var v=n(118),w=(n(206),n(1)),g=function(){return Object(w.jsx)(v.a,{position:"bottom-center",autoClose:5e3,hideProgressBar:!0,newestOnTop:!0,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!1,pauseOnHover:!0})},N=n(7),k=n(262),C=(n(208),function(e){var t=e.name,n=e.type,r=e.value,a=e.onChange;return Object(w.jsxs)("div",{className:"form__group field",children:[Object(w.jsx)("input",{type:n,className:"form__field",placeholder:t,name:t,id:t,value:r,onChange:a,required:!0}),Object(w.jsx)("label",{htmlFor:t,className:"form__label",children:t})]})}),S=n(257),y=n(253),I=n(261);function A(e){var t=e.amountToTransfer,n=e.to;return t=Object(p.parseNearAmount)(t+""),window.contract.transferShares({amountToTransfer:t,to:n})}function D(e){return window.contract.getInvestorData({accountId:e})}var T=function(){var e=a.a.useState(""),t=Object(N.a)(e,2),n=t[0],r=t[1],c=a.a.useState(!1),o=Object(N.a)(c,2),s=o[0],i=o[1],j=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==n){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,i(!0),e.next=6,(t=n,t=Object(p.parseNearAmount)(t+""),window.contract.contributeToDAO({},1e14,t)).then((function(e){console.log("done"),window.location.reload()}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log({error:e.t0});case 11:return e.prev=11,i(!1),e.finish(11);case 14:case"end":return e.stop()}var t}),e,null,[[2,8,11,14]])})));return function(){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{id:"contribute",className:"option",children:[Object(w.jsxs)("p",{className:"title",children:["Contribute. _01",Object(w.jsx)(S.a,{title:"Deposit token to join Dao and receive shares",arrow:!0,children:Object(w.jsx)(y.a,{color:"primary",sx:{cursor:"pointer"}})})]}),Object(w.jsx)(C,{name:"Amount In NEAR",type:"number",value:n,onChange:function(e){return r(e.target.value)}}),Object(w.jsx)(k.a,{onClick:function(){return j()},loading:s,variant:"contained",children:"Contribute"})]})},_=function(){var e=a.a.useState(""),t=Object(N.a)(e,2),n=t[0],r=t[1],c=a.a.useState(!1),o=Object(N.a)(c,2),s=o[0],i=o[1],j=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==n){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,i(!0),e.next=6,(t=n,t=Object(p.parseNearAmount)(t+""),window.contract.redeemShares({amountToRedeem:t})).then((function(e){console.log(e),window.location.reload()}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log({error:e.t0});case 11:return e.prev=11,i(!1),e.finish(11);case 14:case"end":return e.stop()}var t}),e,null,[[2,8,11,14]])})));return function(){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{id:"redeem",className:"option",children:[Object(w.jsxs)("p",{className:"title",children:["Redeem Shares. _02",Object(w.jsx)(S.a,{title:"Convert shares back to token",arrow:!0,children:Object(w.jsx)(y.a,{color:"primary",sx:{cursor:"pointer"}})})]}),Object(w.jsx)(C,{name:"Amount of Shares",type:"number",value:n,onChange:function(e){return r(e.target.value)}}),Object(w.jsx)(k.a,{onClick:function(){return j()},loading:s,variant:"contained",children:"Redeem"})]})},P=n(268),E=n(269),R=n(265),z=n(259),F=n(258),U=n(255),B=function(){var e=Object(r.useState)(!1),t=Object(N.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)({}),o=Object(N.a)(c,2),s=o[0],i=o[1],j=window.walletConnection.account(),d=Object(r.useState)("0"),p=Object(N.a)(d,2),h=p[0],x=p[1],O=Object(r.useCallback)(Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!j.accountId){e.next=6;break}return e.t0=x,e.next=4,f();case 4:e.t1=e.sent,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}}),e)}))),[j.accountId]),m=Object(r.useCallback)(Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!j.accountId){e.next=5;break}return e.next=3,D(j.accountId);case 3:null!==(t=e.sent)&&i(t);case 5:case"end":return e.stop()}}),e)}))),[j.accountId]);return Object(r.useEffect)((function(){O(),m()}),[O,m]),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(P.a,{className:"hero",children:Object(w.jsxs)(P.a,{className:"hero_dao",children:[Object(w.jsx)(P.a,{className:"logo",children:Object(w.jsxs)(E.a,{variant:"string",children:["Dao ",Object(w.jsx)("span",{style:{opacity:"0.5"},children:"DApp."})]})}),Object(w.jsx)(E.a,{align:"center",variant:"string",className:"dao_showcase",children:"DAO DApp"}),Object(w.jsx)(P.a,{className:"options",children:Object(w.jsxs)(P.a,{children:[Object(w.jsxs)(E.a,{color:"#aec1c5",fontSize:"1.2rem",children:[" ",Object(w.jsx)("span",{style:{color:"#fcbd7a"},children:"#"})," Account:"," ",Object(w.jsx)("a",{href:"https://explorer.testnet.near.org/accounts/".concat(j.accountId),target:"_blank",rel:"noreferrer",children:j.accountId})]}),Object(w.jsxs)(R.a,{container:!0,spacing:0,width:"25rem",marginY:"0.5rem",children:[Object(w.jsxs)(R.a,{item:!0,children:[Object(w.jsx)(z.a,{href:"#contribute",xs:6,className:"options-nav",children:"Contribute"}),Object(w.jsx)(z.a,{href:"#redeem",xs:6,className:"options-nav",children:"redeem shares"})]}),Object(w.jsxs)(R.a,{item:!0,children:[Object(w.jsx)(z.a,{href:"#transfer",xs:6,className:"options-nav",children:"transfer shares"}),Object(w.jsx)(z.a,{href:"#create-proposal",xs:6,className:"options-nav",children:"Create proposal"})]})]}),Object(w.jsxs)(E.a,{color:"#aec1c5",fontSize:"1rem",children:[Object(w.jsx)("span",{style:{color:"#fcbd7a"},children:"#"})," Wallet Balance:"," ",h," NEAR"]}),Object(w.jsxs)(E.a,{color:"#aec1c5",fontSize:"1rem",children:[Object(w.jsx)("span",{style:{color:"#fcbd7a"},children:"#"})," Shares:"," ",s.shares?b.utils.format.formatNearAmount(s.shares):0]})]})})]})}),Object(w.jsxs)("div",{className:"menu ".concat(n&&"active"),onClick:function(){a(!1===n)},children:[Object(w.jsx)(E.a,{variant:"button",color:"#fcbd7a",mr:"0.5rem",children:"menu"}),Object(w.jsxs)("div",{children:[Object(w.jsxs)("div",{className:"one",children:[Object(w.jsx)("div",{className:"menu-dots"}),Object(w.jsx)("div",{className:"menu-dots"})]}),Object(w.jsxs)("div",{className:"two",children:[Object(w.jsx)("div",{className:"menu-dots"}),Object(w.jsx)("div",{className:"menu-dots"})]})]})]}),Object(w.jsx)(F.a,{variant:"persistent",anchor:"left",open:n,onClose:function(){return a(!1)},children:Object(w.jsxs)(P.a,{sx:{display:"flex",flexDirection:"column",padding:"3rem"},children:[Object(w.jsx)(z.a,{href:"#contribute",children:"Contribute"}),Object(w.jsx)(z.a,{href:"#redeem",children:"redeem shares"}),Object(w.jsx)(z.a,{href:"#transfer",children:"transfer shares"}),Object(w.jsx)(z.a,{href:"#create-proposal",children:"create proposal"}),Object(w.jsx)(z.a,{href:"#proposals",children:"Proposals"}),Object(w.jsx)(z.a,{onClick:function(){window.walletConnection.signOut(),window.location.reload()},startIcon:Object(w.jsx)(U.a,{}),variant:"contained",children:"disconnect"})]})})]})},L=n(267),V=n(266),W=n(128),H=function(){var e=a.a.useState(""),t=Object(N.a)(e,2),n=t[0],r=t[1],c=a.a.useState(""),o=Object(N.a)(c,2),s=o[0],i=o[1],j=a.a.useState(!1),d=Object(N.a)(j,2),b=d[0],p=d[1],h=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==n||""!==s){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,p(!0),e.next=6,A({amountToTransfer:n,to:s}).then((function(e){console.log(e),window.location.reload()}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log({error:e.t0});case 11:return e.prev=11,p(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[2,8,11,14]])})));return function(){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{id:"transfer",className:"option",children:[Object(w.jsxs)("p",{className:"title",children:["Transfer Shares. _03",Object(w.jsx)(S.a,{title:"Transfer shares to other accounts making them members of Dao",arrow:!0,children:Object(w.jsx)(y.a,{color:"primary",sx:{cursor:"pointer"}})})]}),Object(w.jsx)(C,{name:"Amount In NEAR",type:"number",value:n,onChange:function(e){return r(e.target.value)}}),Object(w.jsx)(C,{name:"To",type:"text",value:s,onChange:function(e){return i(e.target.value)}}),Object(w.jsx)(k.a,{onClick:function(){return h()},loading:b,variant:"contained",children:"Transfer"})]})},K=function(){var e=a.a.useState(""),t=Object(N.a)(e,2),n=t[0],r=t[1],c=a.a.useState(""),o=Object(N.a)(c,2),s=o[0],i=o[1],j=a.a.useState(""),d=Object(N.a)(j,2),b=d[0],h=d[1],x=a.a.useState(!1),f=Object(N.a)(x,2),O=f[0],m=f[1],v=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==n||""!==s||""!==b){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,m(!0),e.next=6,(t={amount:n,name:s,recipient:b},t.id=Object(I.a)(),t.amount=Object(p.parseNearAmount)(t.amount+""),window.contract.createProposal({proposal:t})).then((function(e){console.log(e),window.location.reload()}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log({error:e.t0});case 11:return e.prev=11,m(!1),e.finish(11);case 14:case"end":return e.stop()}var t}),e,null,[[2,8,11,14]])})));return function(){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{id:"create-proposal",className:"option",children:[Object(w.jsxs)("p",{className:"title",children:["Create Proposal. _04",Object(w.jsx)(S.a,{title:"Kickstart your new proposal",arrow:!0,children:Object(w.jsx)(y.a,{color:"primary",sx:{cursor:"pointer"}})})]}),Object(w.jsx)(C,{name:"Name",type:"text",value:s,onChange:function(e){return i(e.target.value)}}),Object(w.jsx)(C,{name:"Amount In NEAR",type:"number",value:n,onChange:function(e){return r(e.target.value)}}),Object(w.jsx)(C,{name:"Recipient",type:"text",value:b,onChange:function(e){return h(e.target.value)}}),Object(w.jsx)(k.a,{onClick:function(){return v()},loading:O,variant:"contained",children:"Create Proposal"})]})},M=n(271),Y=n(270),q=n(272),J=n(273),G=n(274),Q=n(275),X=n(276);function Z(){var e=Object(r.useState)([]),t=Object(N.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(""),s=Object(N.a)(o,2),i=s[0],j=s[1],d=Object(r.useState)({}),p=Object(N.a)(d,2),h=p[0],x=p[1],f=a.a.useState(!1),O=Object(N.a)(f,2),m=O[0],v=O[1],g=window.walletConnection.account(),C=Object(r.useCallback)(Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=c,e.next=3,window.contract.getProposals();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)}))),[]),S=Object(r.useCallback)(Object(u.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.contract.contractParam();case 2:if(t=e.sent,j(t.admin),!g.accountId){e.next=9;break}return e.next=7,D(g.accountId);case 7:null!==(n=e.sent)&&(console.log(n),x(n));case 9:case"end":return e.stop()}}),e)}))),[g.accountId]);function y(e){var t=(new Date).getTime();return!(new Date(parseInt(e.ends)/1e6)>t>0)}function I(e,t){return t.voters.includes(e)}function A(e){return e.id.slice(0,5)+"..."+e.id.slice(e.id.length-4,e.id.length)}function T(e){var t=new Date(parseInt(e.ends)/1e6);return t.toLocaleDateString("en-us",{weekday:"short",year:"numeric",month:"short",day:"numeric"})+", "+t.toLocaleString("en-us",{hour:"numeric",minute:"numeric",hour12:!0})}var _=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v(!0),e.next=4,(n=t.id,window.contract.vote({proposalId:n})).then((function(e){console.log(e),window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log({error:e.t0});case 9:return e.prev=9,v(!1),e.finish(9);case 12:case"end":return e.stop()}var n}),e,null,[[0,6,9,12]])})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v(!0),e.next=4,(n=t.id,window.contract.executeProposal({proposalId:n})).then((function(e){console.log(e),window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log({error:e.t0});case 9:return e.prev=9,v(!1),e.finish(9);case 12:case"end":return e.stop()}var n}),e,null,[[0,6,9,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){C(),S()}),[C,S]),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("div",{id:"proposals",className:"option",children:Object(w.jsx)("p",{className:"title",children:"Proposals. _05"})}),Object(w.jsx)(M.a,{component:Y.a,sx:{background:"#02315a",marginBottom:"5rem"},children:Object(w.jsxs)(q.a,{sx:{minWidth:650},size:"small","aria-label":"proposals",children:[Object(w.jsx)(J.a,{children:Object(w.jsxs)(G.a,{children:[Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5",fontSize:"1rem"},children:"ID"}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5",fontSize:"1rem"},children:"Name"}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5",fontSize:"1rem"},children:"Amount"}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5",fontSize:"1rem"},children:"Recipient"}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5",fontSize:"1rem"},children:"Votes"}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5",fontSize:"1rem"},children:"Vote"}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5",fontSize:"1rem"},children:"Ends on"}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5",fontSize:"1rem"},children:"Executed"})]})}),Object(w.jsx)(X.a,{children:n.reverse().map((function(e){return Object(w.jsxs)(G.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(w.jsx)(Q.a,{align:"center",component:"th",scope:"row",sx:{color:"#aec1c5"},children:A(e)}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5"},children:e.name}),Object(w.jsxs)(Q.a,{align:"center",sx:{color:"#aec1c5"},children:[b.utils.format.formatNearAmount(e.amount)," NEAR"]}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5"},children:Object(w.jsx)("a",{href:"https://explorer.testnet.near.org/accounts/".concat(e.recipient),target:"_blank",rel:"noreferrer",children:e.recipient})}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5"},children:b.utils.format.formatNearAmount(e.votes)}),Object(w.jsxs)(Q.a,{align:"center",sx:{color:"#aec1c5"},children:[" ",y(e)?"Vote finished":h&&h.isInvestor?I(g.accountId,e)?"You already voted":Object(w.jsx)(k.a,{onClick:function(t){return _(e)},loading:m,variant:"contained",children:"Vote"}):"Voting In Progress"]}),Object(w.jsx)(Q.a,{align:"center",sx:{color:"#aec1c5"},children:T(e)}),Object(w.jsx)(Q.a,{sx:{color:"#aec1c5"},align:"center",children:e.ended?e.executed?"Yes":"No":i===g.accountId?Object(w.jsx)(k.a,{onClick:function(t){return P(e)},loading:m,variant:"contained",children:"Execute"}):"No"})]},e.id)}))})]})})]})}var $=function(){var e=Object(W.a)({palette:{primary:{light:"#fcbd7a",main:"#f1a14b",dark:"#fdb261d8",contrastText:"#fff"}}});return Object(w.jsx)(V.a,{theme:e,children:Object(w.jsxs)("div",{className:"app",children:[Object(w.jsx)(B,{}),Object(w.jsxs)(L.a,{children:[Object(w.jsx)(T,{}),Object(w.jsx)(P.a,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"flex-end"},children:Object(w.jsx)(_,{})}),Object(w.jsx)(H,{}),Object(w.jsx)(P.a,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"flex-end"},children:Object(w.jsx)(K,{})}),Object(w.jsx)(Z,{})]})]})})},ee=n(256),te=function(e){var t=e.name,n=e.login,r=e.coverImg;return r?Object(w.jsxs)("div",{className:"cover-page",style:{background:"#000",minHeight:"100vh"},children:[Object(w.jsx)("div",{children:Object(w.jsx)("img",{src:r,alt:"dao"})}),Object(w.jsxs)("div",{className:"loginBox",children:[Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{style:{margin:"1rem"},children:t}),Object(w.jsx)("p",{style:{margin:"0.5rem"},children:"Please connect your wallet to continue."}),Object(w.jsx)(z.a,{onClick:n,variant:"outlined",color:"primary",startIcon:Object(w.jsx)(ee.a,{}),children:"Connect Wallet"})]}),Object(w.jsx)("p",{children:"Powered by NEAR"})]})]}):null};te.defaultProps={name:""};var ne=te,re=n.p+"static/media/DAO.d4104a3f.jpg",ae=(n(211),function(){var e=window.walletConnection.account();return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(g,{}),e.accountId?Object(w.jsx)(s.a,{fluid:"md",children:Object(w.jsx)("main",{children:Object(w.jsx)($,{})})}):Object(w.jsx)(ne,{name:"DAO DApp",login:m,coverImg:re})]})}),ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,277)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};window.nearInitPromise=function(){return x.apply(this,arguments)}().then((function(){o.a.render(Object(w.jsx)(a.a.StrictMode,{children:Object(w.jsx)(ae,{})}),document.getElementById("root"))})).catch(console.error),ce()}},[[212,1,2]]]);
//# sourceMappingURL=main.c5a8836f.chunk.js.map