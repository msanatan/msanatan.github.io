"use strict";(self.webpackChunkmsanatan_com=self.webpackChunkmsanatan_com||[]).push([[754],{3715:function(e,t,a){a.d(t,{A:function(){return r}});var n=a(6540),l=a(4194);var r=e=>{let{text:t,link:a}=e;return n.createElement(l.Link,{to:a,type:"button",className:"btn blogButton-module--btn-nav--ddd5d",role:"button"},t)}},1489:function(e,t,a){a.d(t,{A:function(){return m}});var n=a(6540),l=a(4194),r="layout-module--menu-item--65d49",c="layout-module--menu-item-active--6302b";var m=e=>{let{title:t,description:a,meta:m,children:o}=e;return n.createElement("div",{className:"container d-flex flex-column min-vh-100"},n.createElement("header",null,n.createElement("nav",{className:"navbar navbar-expand-lg navbar-light"},n.createElement("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navBarTogglerMenu","aria-controls":"navBarTogglerMenu","aria-expanded":"false","aria-label":"Toggle navigation"},n.createElement("span",{className:"navbar-toggler-icon"})),n.createElement("div",{className:"collapse navbar-collapse justify-content-lg-center",id:"navBarTogglerMenu"},n.createElement("ul",{className:"navbar-nav mr-auto mb-2 mb-lg-0"},n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/",className:"nav-link "+r,activeClassName:c},"Home")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/about",className:"nav-link "+r,activeClassName:c},"About")),n.createElement("li",{className:"nav-item"},n.createElement("a",{href:"https://gameboymarcus.itch.io",target:"_blank",rel:"nofollow noopener noreferrer",className:"nav-link "+r,activeClassName:c},"Games")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/blog",className:"nav-link "+r,activeClassName:c},"Blog")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/contact",className:"nav-link "+r,activeClassName:c},"Contact")))))),n.createElement("main",{className:"flex-grow-1 d-flex"},o),n.createElement("footer",{className:"footer mt-auto py-2"},n.createElement("div",{className:"container"},n.createElement("span",null,"© ",(new Date).getFullYear()," Marcus Sanatan"))))}},168:function(e,t,a){var n=a(6540),l=a(4194);t.A=e=>{var t,a;let{location:r,meta:c,children:m}=e;const{site:o}=(0,l.useStaticQuery)("1391858338"),s=(null==c?void 0:c.description)||o.siteMetadata.description,i=o.siteMetadata.title,u=null!=c&&c.title?c.title+" — "+i:i;return n.createElement(n.Fragment,null,n.createElement("title",null,u),n.createElement("html",{lang:(null==c?void 0:c.lang)||o.siteMetadata.siteLang}),n.createElement("body",{className:"h-100"}),n.createElement("meta",{name:"description",content:s}),n.createElement("meta",{property:"og:title",content:u}),n.createElement("meta",{property:"og:description",content:s}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:creator",content:(null===(t=o.siteMetadata)||void 0===t||null===(a=t.social)||void 0===a?void 0:a.twitter)||""}),n.createElement("meta",{name:"twitter:title",content:u}),n.createElement("meta",{name:"twitter:description",content:s}))}},795:function(e,t,a){a.r(t),a.d(t,{Head:function(){return u}});var n=a(6540),l=a(4194),r=a(1489),c=a(3715),m=a(6213),o=a(3659),s=a(203),i=a(168);function u(e){let{location:t,params:a,data:l,pageContext:r}=e;return n.createElement(i.A,{meta:{title:r.tag,description:"A collection of my blog posts tagged with "+r.tag}})}t.default=e=>{let{data:t,pageContext:a}=e;const{currentPage:i,numPages:u,tag:d}=a,g=t.allMarkdownRemark.nodes,p=i>1?d+" pg. "+i:""+d;if(0===g.length)return n.createElement(r.A,{title:p},n.createElement("p",null,"Yikes! Can't find no blogs with that tag. Check back later!"));let E;return 1!==u&&(E=n.createElement("div",{className:"row my-1"},n.createElement("div",{className:"col-6 d-flex justify-content-end"},i>1?n.createElement(c.A,{text:"Previous",link:i>2?"/tags/"+(0,m.Y)(d)+"/"+(i-1):"/tags/"+(0,m.Y)(d)}):null),n.createElement("div",{className:"col-6 d-flex justify-content-start"},i<u?n.createElement(c.A,{text:"Next",link:"/tags/"+(0,m.Y)(d)+"/"+(i+1)}):null))),n.createElement(r.A,{title:p},n.createElement("div",{className:"container-fluid d-flex flex-column"},n.createElement("div",{className:"row "+o.W},n.createElement("h1",null,"Tags: "+d)),n.createElement("div",{className:"row py-3"},n.createElement("div",{className:"col-sm-8 offset-sm-2"},n.createElement("ol",{style:{listStyle:"none"}},g.map((e=>{const t=e.frontmatter.title||e.fields.slug,a=n.createElement("p",null,e.frontmatter.tags.map(((t,a)=>a<e.frontmatter.tags.length-1?n.createElement("span",null,n.createElement(l.Link,{to:"/tags/"+(0,m.Y)(t),itemProp:"url",className:s.N},t),", "):n.createElement(l.Link,{to:"/tags/"+(0,m.Y)(t),itemProp:"url",className:s.N},t)))),r=e.frontmatter.updated?e.frontmatter.date+" (updated: "+e.frontmatter.updated+")":""+e.frontmatter.date;return n.createElement("li",{key:e.fields.slug,className:"py-1"},n.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("h2",null,n.createElement(l.Link,{to:e.fields.slug,itemProp:"url",className:s.X},n.createElement("span",{itemProp:"headline"},t))),n.createElement("small",null,r),a),n.createElement("section",null,n.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))),E))}},6213:function(e,t,a){a.d(t,{Y:function(){return n}});const n=e=>{e=(e=e.replace(/^\s+|\s+$/g,"")).toLowerCase();const t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;";for(let a=0,n=28;a<n;a++)e=e.replace(new RegExp(t.charAt(a),"g"),"aaaaeeeeiiiioooouuuunc------".charAt(a));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}},3659:function(e,t,a){a.d(t,{W:function(){return n}});var n="page-module--page-title--0e41d"},203:function(e,t,a){a.d(t,{N:function(){return l},X:function(){return n}});var n="blogList-module--post-link--f96a8",l="blogList-module--tag-link--78e62"}}]);
//# sourceMappingURL=component---src-templates-tag-page-js-01777d3c4bd085e8e185.js.map