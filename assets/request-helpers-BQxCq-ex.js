import{af as re,_ as l,ag as G,ah as N,ai as ae,aj as ne,ak as le,J as A,al as ie,M as B,j as r,O as R,am as X,P as H,z as E,an as ce,ao as pe,v as de,ap as ue,E as ee,h as f,H as P,aq as _,e as S,S as q,Q as K,K as U,X as me,ar as ge,as as fe,at as xe,q as he,au as ve}from"./index-DyErgHkj.js";import{s as Ce,u as ye}from"./useThemeProps-BLsYwCNi.js";const be=["component","direction","spacing","divider","children","className","useFlexGap"],ke=re(),Se=Ce("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,o)=>o.root});function Pe(e){return ye({props:e,name:"MuiStack",defaultTheme:ke})}function Me(e,o){const s=A.Children.toArray(e).filter(Boolean);return s.reduce((t,n,a)=>(t.push(n),a<s.length-1&&t.push(A.cloneElement(o,{key:`separator-${a}`})),t),[])}const je=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],Ae=({ownerState:e,theme:o})=>{let s=l({display:"flex",flexDirection:"column"},G({theme:o},N({values:e.direction,breakpoints:o.breakpoints.values}),t=>({flexDirection:t})));if(e.spacing){const t=ae(o),n=Object.keys(o.breakpoints.values).reduce((i,c)=>((typeof e.spacing=="object"&&e.spacing[c]!=null||typeof e.direction=="object"&&e.direction[c]!=null)&&(i[c]=!0),i),{}),a=N({values:e.direction,base:n}),m=N({values:e.spacing,base:n});typeof a=="object"&&Object.keys(a).forEach((i,c,g)=>{if(!a[i]){const v=c>0?a[g[c-1]]:"column";a[i]=v}}),s=ne(s,G({theme:o},m,(i,c)=>e.useFlexGap?{gap:X(t,i)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${je(c?a[c]:e.direction)}`]:X(t,i)}}))}return s=le(o.breakpoints,s),s};function We(e={}){const{createStyledComponent:o=Se,useThemeProps:s=Pe,componentName:t="MuiStack"}=e,n=()=>H({root:["root"]},i=>E(t,i),{}),a=o(Ae);return A.forwardRef(function(i,c){const g=s(i),h=ie(g),{component:v="div",direction:b="column",spacing:k=0,divider:d,children:C,className:M,useFlexGap:y=!1}=h,j=B(h,be),p={direction:b,spacing:k,useFlexGap:y},u=n();return r.jsx(a,l({as:v,ownerState:p,ref:c,className:R(u.root,M)},j,{children:d?Me(C,d):C}))})}const $e=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],De=["component","slots","slotProps"],Ie=["component"];function Y(e,o){const{className:s,elementType:t,ownerState:n,externalForwardedProps:a,getSlotOwnerState:m,internalForwardedProps:x}=o,i=B(o,$e),{component:c,slots:g={[e]:void 0},slotProps:h={[e]:void 0}}=a,v=B(a,De),b=g[e]||t,k=ce(h[e],n),d=pe(l({className:s},i,{externalForwardedProps:e==="root"?v:void 0,externalSlotProps:k})),{props:{component:C},internalRef:M}=d,y=B(d.props,Ie),j=de(M,k==null?void 0:k.ref,o.ref),p=m?m(y):{},u=l({},n,p),W=e==="root"?C||c:C,$=ue(b,l({},e==="root"&&!c&&!g[e]&&x,e!=="root"&&!g[e]&&x,y,W&&{as:W},{ref:j}),u);return Object.keys(p).forEach(D=>{delete $[D]}),[b,$]}function Be(e){return E("MuiAlert",e)}const Z=ee("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),Re=f(r.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),ze=f(r.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),Fe=f(r.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),we=f(r.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),Te=f(r.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),Le=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],Oe=e=>{const{variant:o,color:s,severity:t,classes:n}=e,a={root:["root",`color${S(s||t)}`,`${o}${S(s||t)}`,`${o}`],icon:["icon"],message:["message"],action:["action"]};return H(a,Be,n)},Ne=P(_,{name:"MuiAlert",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[o.root,o[s.variant],o[`${s.variant}${S(s.color||s.severity)}`]]}})(({theme:e})=>{const o=e.palette.mode==="light"?q:K,s=e.palette.mode==="light"?K:q;return l({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(e.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"standard"},style:{color:e.vars?e.vars.palette.Alert[`${t}Color`]:o(e.palette[t].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${t}StandardBg`]:s(e.palette[t].light,.9),[`& .${Z.icon}`]:e.vars?{color:e.vars.palette.Alert[`${t}IconColor`]}:{color:e.palette[t].main}}})),...Object.entries(e.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"outlined"},style:{color:e.vars?e.vars.palette.Alert[`${t}Color`]:o(e.palette[t].light,.6),border:`1px solid ${(e.vars||e).palette[t].light}`,[`& .${Z.icon}`]:e.vars?{color:e.vars.palette.Alert[`${t}IconColor`]}:{color:e.palette[t].main}}})),...Object.entries(e.palette).filter(([,t])=>t.main&&t.dark).map(([t])=>({props:{colorSeverity:t,variant:"filled"},style:l({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${t}FilledColor`],backgroundColor:e.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:e.palette.mode==="dark"?e.palette[t].dark:e.palette[t].main,color:e.palette.getContrastText(e.palette[t].main)})}))]})}),Ve=P("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,o)=>o.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),He=P("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,o)=>o.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),J=P("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,o)=>o.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),Q={success:r.jsx(Re,{fontSize:"inherit"}),warning:r.jsx(ze,{fontSize:"inherit"}),error:r.jsx(Fe,{fontSize:"inherit"}),info:r.jsx(we,{fontSize:"inherit"})},eo=A.forwardRef(function(o,s){const t=U({props:o,name:"MuiAlert"}),{action:n,children:a,className:m,closeText:x="Close",color:i,components:c={},componentsProps:g={},icon:h,iconMapping:v=Q,onClose:b,role:k="alert",severity:d="success",slotProps:C={},slots:M={},variant:y="standard"}=t,j=B(t,Le),p=l({},t,{color:i,severity:d,variant:y,colorSeverity:i||d}),u=Oe(p),W={slots:l({closeButton:c.CloseButton,closeIcon:c.CloseIcon},M),slotProps:l({},g,C)},[$,D]=Y("closeButton",{elementType:me,externalForwardedProps:W,ownerState:p}),[F,w]=Y("closeIcon",{elementType:Te,externalForwardedProps:W,ownerState:p});return r.jsxs(Ne,l({role:k,elevation:0,ownerState:p,className:R(u.root,m),ref:s},j,{children:[h!==!1?r.jsx(Ve,{ownerState:p,className:u.icon,children:h||v[d]||Q[d]}):null,r.jsx(He,{ownerState:p,className:u.message,children:a}),n!=null?r.jsx(J,{ownerState:p,className:u.action,children:n}):null,n==null&&b?r.jsx(J,{ownerState:p,className:u.action,children:r.jsx($,l({size:"small","aria-label":x,title:x,color:"inherit",onClick:b},D,{children:r.jsx(F,l({fontSize:"small"},w))}))}):null]}))});function Ee(e){return E("MuiDialog",e)}const V=ee("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),_e=A.createContext({}),Ue=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],Ge=P(ge,{name:"MuiDialog",slot:"Backdrop",overrides:(e,o)=>o.backdrop})({zIndex:-1}),Xe=e=>{const{classes:o,scroll:s,maxWidth:t,fullWidth:n,fullScreen:a}=e,m={root:["root"],container:["container",`scroll${S(s)}`],paper:["paper",`paperScroll${S(s)}`,`paperWidth${S(String(t))}`,n&&"paperFullWidth",a&&"paperFullScreen"]};return H(m,Ee,o)},qe=P(fe,{name:"MuiDialog",slot:"Root",overridesResolver:(e,o)=>o.root})({"@media print":{position:"absolute !important"}}),Ke=P("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[o.container,o[`scroll${S(s.scroll)}`]]}})(({ownerState:e})=>l({height:"100%","@media print":{height:"auto"},outline:0},e.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},e.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),Ye=P(_,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[o.paper,o[`scrollPaper${S(s.scroll)}`],o[`paperWidth${S(String(s.maxWidth))}`],s.fullWidth&&o.paperFullWidth,s.fullScreen&&o.paperFullScreen]}})(({theme:e,ownerState:o})=>l({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},o.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},o.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!o.maxWidth&&{maxWidth:"calc(100% - 64px)"},o.maxWidth==="xs"&&{maxWidth:e.breakpoints.unit==="px"?Math.max(e.breakpoints.values.xs,444):`max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,[`&.${V.paperScrollBody}`]:{[e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},o.maxWidth&&o.maxWidth!=="xs"&&{maxWidth:`${e.breakpoints.values[o.maxWidth]}${e.breakpoints.unit}`,[`&.${V.paperScrollBody}`]:{[e.breakpoints.down(e.breakpoints.values[o.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},o.fullWidth&&{width:"calc(100% - 64px)"},o.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${V.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),oo=A.forwardRef(function(o,s){const t=U({props:o,name:"MuiDialog"}),n=xe(),a={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{"aria-describedby":m,"aria-labelledby":x,BackdropComponent:i,BackdropProps:c,children:g,className:h,disableEscapeKeyDown:v=!1,fullScreen:b=!1,fullWidth:k=!1,maxWidth:d="sm",onBackdropClick:C,onClick:M,onClose:y,open:j,PaperComponent:p=_,PaperProps:u={},scroll:W="paper",TransitionComponent:$=ve,transitionDuration:D=a,TransitionProps:F}=t,w=B(t,Ue),z=l({},t,{disableEscapeKeyDown:v,fullScreen:b,fullWidth:k,maxWidth:d,scroll:W}),T=Xe(z),L=A.useRef(),oe=I=>{L.current=I.target===I.currentTarget},te=I=>{M&&M(I),L.current&&(L.current=null,C&&C(I),y&&y(I,"backdropClick"))},O=he(x),se=A.useMemo(()=>({titleId:O}),[O]);return r.jsx(qe,l({className:R(T.root,h),closeAfterTransition:!0,components:{Backdrop:Ge},componentsProps:{backdrop:l({transitionDuration:D,as:i},c)},disableEscapeKeyDown:v,onClose:y,open:j,ref:s,onClick:te,ownerState:z},w,{children:r.jsx($,l({appear:!0,in:j,timeout:D,role:"presentation"},F,{children:r.jsx(Ke,{className:R(T.container),onMouseDown:oe,ownerState:z,children:r.jsx(Ye,l({as:p,elevation:24,role:"dialog","aria-describedby":m,"aria-labelledby":O},u,{className:R(T.paper,u.className),ownerState:z,children:r.jsx(_e.Provider,{value:se,children:g})}))})}))}))}),to=We({createStyledComponent:P("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,o)=>o.root}),useThemeProps:e=>U({props:e,name:"MuiStack"})}),so=f(r.jsx("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add"),ro=f(r.jsx("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),ao=f(r.jsx("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete"),no=f(r.jsx("path",{d:"M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z"}),"FilterList"),lo=f(r.jsx("path",{d:"M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2m0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19z"}),"Inbox"),io=f(r.jsx("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"Search"),Ze=e=>new Promise(o=>setTimeout(o,e));async function co(e,o){let s=await fetch(e,o);return s=await s.json(),await Ze(1e3),s}export{so as A,ro as C,oo as D,co as F,lo as I,to as S,io as a,no as b,ao as c,eo as d};