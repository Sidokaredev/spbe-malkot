import{j as a,G as t,B as e,T as o,l as g,D as P}from"./index-Dv4UGTdR.js";import{C as x,A as D,B as c,T as f,b as A,c as v,d as R,e as u,f as S,g as T,h as B}from"./ApacheECharts-DrUh0YCQ.js";import{C as j,a as L,S as k}from"./sankey-title-Dseko0PA.js";function C(){const n={title:{text:"Presentase Digitalisasi Data",textStyle:{color:"white",fontWeight:"normal",fontFamily:"Poppins",fontSize:12},right:"0%",left:"3%",top:"3%",bottom:"0%"},color:["#0288d1","#03a9f4"],tooltip:{show:!0,formatter:"{a} <br/>{b} : {c}%"},series:[{type:"gauge",id:"Digitalisasi Gauge",name:"Digitaliasi Layanan",colorBy:"data",center:["50%","90%"],radius:"120%",legendHoverLink:!0,startAngle:180,endAngle:0,data:[{value:40,itemStyle:{}}],min:0,max:100,splitNumber:5,axisLine:{show:!0,roundCap:!1,lineStyle:{width:35}},progress:{show:!0,overlap:!1,width:35,roundCap:!1,clip:!1},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!1},pointer:{show:!1},anchor:{show:!1,showAbove:!0,icon:"triangle"},itemStyle:{},emphasis:{disabled:!1,itemStyle:{}},title:{show:!1,offsetCenter:["0","0"],fontWeight:"lighter",fontSize:"16",overflow:"truncate"},detail:{show:!0,color:"white",fontFamily:"Poppins",fontWeight:"normal",fontSize:"24",offsetCenter:["0","0"],formatter:i=>`${i}%`}}]};return a.jsx(a.Fragment,{children:a.jsxs(t,{container:!0,spacing:2,children:[a.jsx(t,{item:!0,xs:3,children:a.jsx(x,{icon:j,title:"Jumlah Data",data:300,date:"12 Agustus 2024"})}),a.jsx(t,{item:!0,xs:3,children:a.jsx(x,{icon:j,title:"Digitalisasi Area",data:183,date:"12 Agustus 2024"})}),a.jsx(t,{item:!0,xs:6,children:a.jsx(L,{chartOptions:n})})]})})}function I(){const n={tooltip:{},color:["#0288d1","#03a9f4","#4fc3f7"],series:[{type:"pie",name:"Sifat Data Chart",radius:["60%","90%"],center:["50%","50%"],itemStyle:{borderColor:"#ffffff",borderWidth:3},label:{show:!1,position:"center"},labelLine:{show:!1},data:[{name:"Terbatas",value:264},{name:"Terbuka",value:100},{name:"Tertutup",value:14}],emphasis:{label:{show:!1,fontSize:12}}}]},i=[{pic:"Dinas Kesehatan",jumlah:127},{pic:"Dinas Ketahanan Pangan dan Pertanian",jumlah:68},{pic:"Dinas Kesehatan",jumlah:51},{pic:"Dinas Perpustakaan dan Kearsipan",jumlah:42},{pic:"Dinas Lingkungan Hidup",jumlah:14}],m=[{label:"Terbatas",value:264,percent:"69.7%"},{label:"Terbuka",value:100,percent:"24.6%"},{label:"Tertutup",value:14,percent:"4%"}];return a.jsx(a.Fragment,{children:a.jsxs(t,{container:!0,spacing:2,children:[a.jsxs(t,{item:!0,xs:6,children:[a.jsxs(e,{display:"flex",alignItems:"center",marginBottom:1,children:[a.jsx(e,{component:"img",src:k,sx:{width:24,height:24}}),a.jsx(o,{variant:"subtitle1",sx:{marginLeft:"0.5em",fontWeight:"medium"},children:"Sifat Data"})]}),a.jsxs(t,{container:!0,sx:{height:"100%"},children:[a.jsx(t,{item:!0,xs:6,children:a.jsx(D,{chartOptions:n})}),a.jsx(t,{item:!0,xs:6,sx:{display:"flex",alignItems:"center"},children:a.jsx(c,{row_head_cells:["","Label","Value","%"],row_head_color:"transparent",row_head_font_color:"#444444",row_body_data:m,use_row_bullet_on:"blank_cell",disable_cell_line:!0,font_size:"small",cell_size:"small"})})]})]}),a.jsxs(t,{item:!0,xs:6,children:[a.jsxs(e,{display:"flex",alignItems:"center",marginBottom:1,children:[a.jsx(e,{component:"img",src:f,sx:{width:24,height:24}}),a.jsx(o,{variant:"subtitle1",sx:{marginLeft:"0.5em",fontWeight:"medium"},children:"OPD Produsen Data"})]}),a.jsx(c,{row_head_cells:["OPD Penanggung Jawab","Jumlah"],row_body_data:i,use_cell_pallete_on:1,use_row_number:!0,use_pagination:!0,font_size:"small"})]})]})})}function z({height:n="25em",head_cells:i,body_data:m,use_cell_pallete_on:b,font_size:s="medium",cell_size:d="medium",row_head_color:y=g[400],row_head_font_color:w="white"}){return a.jsx(a.Fragment,{children:a.jsx(A,{sx:{height:n},children:a.jsxs(v,{stickyHeader:!0,children:[a.jsx(R,{children:i.map((l,r)=>a.jsx(u,{sx:{backgroundColor:y,color:w,fontSize:s,borderBottom:"none"},children:l},r))}),a.jsx(S,{children:m.map(l=>l.rows.map((r,h)=>a.jsxs(T,{hover:!0,children:[h===0&&a.jsx(u,{rowSpan:l.rows.length,size:d,sx:{verticalAlign:"top",fontSize:s},children:a.jsx(o,{sx:{position:"sticky",top:"15%",fontSize:s},children:l.name})}),Object.keys(r).map((p,_)=>_===b?a.jsx(B,{value:r[p],cell_size:d,font_size:s}):a.jsx(u,{size:d,sx:{fontSize:s},children:r[p]},_))]},h)))})]})})})}function W(){const n={grid:{top:50,left:100},tooltip:{},xAxis:{type:"value"},yAxis:{type:"category",inverse:!0,boundaryGap:!0,position:"left",axisLine:{show:!0,lineStyle:{color:"#9e9e9e"}},axisTick:{show:!0,alignWithLabel:!0,length:3,lineStyle:{color:"#9e9e9e"}},axisLabel:{show:!0,fontFamily:"Poppins",fontSize:12},splitLine:{show:!0,lineStyle:{type:"dashed"}},data:["Realtime","Bulanan","Tahunan","Enam Bulanan","Lima Bulanan","Tiga Bulanan","Mingguan","Tiga Tahunan","Lainnya"]},series:[{type:"bar",itemStyle:{color:g[700]},data:[45,66,126,37,376,87,90,223,322]}]},i=[{name:"RAD.02 Informasi Ekonomi dan Industri",rows:[{data_tematik:"RAD.02.05 Data Peternakan",jumlah:109},{data_tematik:"RAD.02.05 Data Perdagangan",jumlah:99},{data_tematik:"RAD.02.05 Data Perikanan",jumlah:34},{data_tematik:"RAD.02.05 Data Investasi",jumlah:89},{data_tematik:"RAD.02.05 Data Pertanian",jumlah:18},{data_tematik:"RAD.02.05 Data Pariwisata",jumlah:36},{data_tematik:"RAD.02.05 Data Perkebunan",jumlah:10}]},{name:"RAD.02 Informasi Ekonomi dan Industri",rows:[{data_tematik:"RAD.02.05 Data Peternakan",jumlah:109},{data_tematik:"RAD.02.05 Data Perdagangan",jumlah:99},{data_tematik:"RAD.02.05 Data Perikanan",jumlah:34},{data_tematik:"RAD.02.05 Data Investasi",jumlah:89},{data_tematik:"RAD.02.05 Data Pertanian",jumlah:18},{data_tematik:"RAD.02.05 Data Pariwisata",jumlah:36},{data_tematik:"RAD.02.05 Data Perkebunan",jumlah:10}]},{name:"RAD.02 Informasi Ekonomi dan Industri",rows:[{data_tematik:"RAD.02.05 Data Peternakan",jumlah:109},{data_tematik:"RAD.02.05 Data Perdagangan",jumlah:99},{data_tematik:"RAD.02.05 Data Perikanan",jumlah:34},{data_tematik:"RAD.02.05 Data Investasi",jumlah:89},{data_tematik:"RAD.02.05 Data Pertanian",jumlah:18},{data_tematik:"RAD.02.05 Data Pariwisata",jumlah:36},{data_tematik:"RAD.02.05 Data Perkebunan",jumlah:10}]}];return a.jsx(a.Fragment,{children:a.jsxs(t,{container:!0,spacing:2,children:[a.jsxs(t,{item:!0,xs:6,children:[a.jsxs(e,{display:"flex",alignItems:"center",marginBottom:1,children:[a.jsx(e,{component:"img",src:k,sx:{width:24,height:24}}),a.jsx(o,{variant:"subtitle1",sx:{marginLeft:"0.5em",fontWeight:"medium"},children:"Validitas Data"})]}),a.jsx(e,{component:"div",className:"chart-container",height:"100%",children:a.jsx(D,{chartOptions:n})})]}),a.jsxs(t,{item:!0,xs:6,children:[a.jsxs(e,{display:"flex",alignItems:"center",marginBottom:1,children:[a.jsx(e,{component:"img",src:f,sx:{width:24,height:24}}),a.jsx(o,{variant:"subtitle1",sx:{marginLeft:"0.5em",fontWeight:"medium"},children:"Data Pokok dan Data Tematik"})]}),a.jsx(e,{component:"div",children:a.jsx(z,{head_cells:["Data Pokok","Data Tematik","Jumlah"],body_data:i,use_cell_pallete_on:1,font_size:"small",cell_size:"small"})})]})]})})}function F(){const n=[{nama_data:"Layanan Pembinaan",sifat_data:"cell1",validitas_data:"cell2",aplikasi_pendukung:"RAB.03.03.04",penunjang_layanan:"Dinas Perhubungan",jenis_data_pokok:"cell5",jenis_data_tematik:"cell6",produsen_data:"cell7"},{nama_data:"Layanan Pembinaan",sifat_data:"cell1",validitas_data:"cell2",aplikasi_pendukung:"RAB.03.03.04",penunjang_layanan:"Dinas Perhubungan",jenis_data_pokok:"cell5",jenis_data_tematik:"cell6",produsen_data:"cell7"},{nama_data:"Layanan Pembinaan",sifat_data:"cell1",validitas_data:"cell2",aplikasi_pendukung:"RAB.03.03.04",penunjang_layanan:"Dinas Perhubungan",jenis_data_pokok:"cell5",jenis_data_tematik:"cell6",produsen_data:"cell7"},{nama_data:"Layanan Pembinaan",sifat_data:"cell1",validitas_data:"cell2",aplikasi_pendukung:"RAB.03.03.04",penunjang_layanan:"Dinas Perhubungan",jenis_data_pokok:"cell5",jenis_data_tematik:"cell6",produsen_data:"cell7"},{nama_data:"Layanan Pembinaan",sifat_data:"cell1",validitas_data:"cell2",aplikasi_pendukung:"RAB.03.03.04",penunjang_layanan:"Dinas Perhubungan",jenis_data_pokok:"cell5",jenis_data_tematik:"cell6",produsen_data:"cell7"}];return a.jsx(a.Fragment,{children:a.jsx(c,{row_head_cells:["Nama Data","Sifat Data","Validitas Data","Aplikasi Pendukung","Penunjang Layanan","Jenis Data Pokok","Jenis Data Tematik","Produsen Data"],row_body_data:n,use_row_number:!0,use_pagination:!0,font_size:"small"})})}function O(){return a.jsx(P,{children:a.jsxs(e,{component:"div",className:"section-container",children:[a.jsx(e,{component:"section",className:"domain-data-section1",sx:{marginBottom:"1em"},children:a.jsx(C,{})}),a.jsx(e,{component:"section",className:"domain-data-section2",sx:{marginBottom:"1em"},children:a.jsx(I,{})}),a.jsx(e,{component:"section",className:"domain-data-section3",sx:{marginBottom:"1em"},children:a.jsx(W,{})}),a.jsx(e,{component:"section",className:"domain-data-section4",sx:{marginBottom:"1em"},children:a.jsx(F,{})})]})})}export{O as default};
