import{j as e,l}from"./index-DyErgHkj.js";import{a as u,T as n}from"./TableRow-CNuvr_lu.js";import{a as j}from"./ApacheECharts-BHxp2ZeA.js";import{T as B,a as S,b as H,c as P,d as R}from"./TablePagination-CzqDPl5F.js";function z(o){const s={color:o.font_color,border:"none",fontSize:o.font_size};return e.jsxs(u,{sx:{backgroundColor:o.row_color},children:[o.use_row_number&&e.jsx(n,{sx:s,children:"No."}),o.cells.map((i,r)=>e.jsx(n,{sx:s,children:i},r))]})}function E({value:o,font_size:s="medium",cell_size:i="medium"}){const r=[{rule:o>=100,color:l[700]},{rule:o>=50&&o<100,color:l[500]},{rule:o<=50&&o>30,color:l[300]},{rule:o<=30&&o>10,color:l[100]},{rule:o<=10&&o>=0,color:l[50]}],g=()=>{let x;return r.forEach(a=>{a.rule&&(x=a.color)}),x};return e.jsx(n,{size:i,sx:{backgroundColor:g(),border:"none",cursor:"pointer",fontSize:s},onClick:()=>console.info("probis cell clicked"),children:o})}function L({row_head_cells:o,row_head_color:s=l[400],row_head_font_color:i="white",row_body_data:r,use_pagination:g=!1,use_cell_pallete_on:x,use_row_bullet_on:a,use_row_number:f=!1,use_box_shadow:T=!1,make_sticky_head:C=!1,font_size:d="medium",cell_size:c="medium",disable_cell_line:h=!1}){const k=(t,b)=>{console.info("new page 	: ",b),console.info("event page change 	: ",t)};return console.info("data length 	: ",r.length),e.jsx(e.Fragment,{children:e.jsxs(B,{sx:{boxShadow:T?"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px":"none"},children:[e.jsxs(S,{stickyHeader:C,children:[e.jsx(H,{sx:{borderBottom:a?"1px solid #cacaca":"none"},children:e.jsx(z,{cells:o,row_color:s,font_color:i,use_row_number:f,font_size:d,cell_size:c})}),e.jsx(P,{children:r.map((t,b)=>e.jsxs(u,{children:[f&&e.jsx(n,{size:c,sx:{fontSize:d,border:h?"none":void 0,borderRadius:"1em"},children:b+1}),a==="blank_cell"&&e.jsx(n,{size:c,sx:{border:h?"none":void 0},children:e.jsx(j,{width:10,height:10})}),Object.keys(t).map((p,m)=>m===x?e.jsx(E,{cell_size:c,font_size:d,value:t[p]},m):m===a?e.jsx(n,{size:c,sx:{border:h?"none":void 0},children:e.jsx(j,{width:10,height:10})}):e.jsx(n,{size:c,sx:{fontSize:d,border:h?"none":void 0},children:t[p]},m))]},b))})]}),g&&e.jsx(R,{component:"div",count:r.length,onPageChange:k,page:0,rowsPerPage:5,rowsPerPageOptions:[5,10,15]})]})})}const N="/spbe-malkot/logos/probis-card/table-label.svg";export{L as B,N as T,E as a};