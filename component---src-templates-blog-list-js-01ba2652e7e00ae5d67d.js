"use strict";(self.webpackChunkmsanatan_com=self.webpackChunkmsanatan_com||[]).push([[121],{3715:function(e,t,a){a.d(t,{A:function(){return r}});var n=a(6540),l=a(4194);var r=e=>{let{text:t,link:a}=e;return n.createElement(l.Link,{to:a,type:"button",className:"btn blogButton-module--btn-nav--ddd5d",role:"button"},t)}},1489:function(e,t,a){a.d(t,{A:function(){return o}});var n=a(6540),l=a(4194),r="layout-module--menu-item--65d49",c="layout-module--menu-item-active--6302b";var o=e=>{let{title:t,description:a,meta:o,children:m}=e;return n.createElement("div",{className:"container d-flex flex-column min-vh-100"},n.createElement("header",null,n.createElement("nav",{className:"navbar navbar-expand-lg navbar-light"},n.createElement("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navBarTogglerMenu","aria-controls":"navBarTogglerMenu","aria-expanded":"false","aria-label":"Toggle navigation"},n.createElement("span",{className:"navbar-toggler-icon"})),n.createElement("div",{className:"collapse navbar-collapse justify-content-lg-center",id:"navBarTogglerMenu"},n.createElement("ul",{className:"navbar-nav mr-auto mb-2 mb-lg-0"},n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/",className:"nav-link "+r,activeClassName:c},"Home")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/about",className:"nav-link "+r,activeClassName:c},"About")),n.createElement("li",{className:"nav-item"},n.createElement("a",{href:"https://gameboymarcus.itch.io",target:"_blank",rel:"nofollow noopener noreferrer",className:"nav-link "+r,activeClassName:c},"Games")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/blog",className:"nav-link "+r,activeClassName:c},"Blog")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/contact",className:"nav-link "+r,activeClassName:c},"Contact")))))),n.createElement("main",{className:"flex-grow-1 d-flex"},m),n.createElement("footer",{className:"footer mt-auto py-2"},n.createElement("div",{className:"container"},n.createElement("span",null,"© ",(new Date).getFullYear()," Marcus Sanatan"))))}},168:function(e,t,a){var n=a(6540),l=a(4194);t.A=e=>{var t,a;let{location:r,meta:c,children:o}=e;const{site:m}=(0,l.useStaticQuery)("1391858338"),i=(null==c?void 0:c.description)||m.siteMetadata.description,s=m.siteMetadata.title,u=null!=c&&c.title?c.title+" — "+s:s;return n.createElement(n.Fragment,null,n.createElement("title",null,u),n.createElement("html",{lang:(null==c?void 0:c.lang)||m.siteMetadata.siteLang}),n.createElement("body",{className:"h-100"}),n.createElement("meta",{name:"description",content:i}),n.createElement("meta",{property:"og:title",content:u}),n.createElement("meta",{property:"og:description",content:i}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:creator",content:(null===(t=m.siteMetadata)||void 0===t||null===(a=t.social)||void 0===a?void 0:a.twitter)||""}),n.createElement("meta",{name:"twitter:title",content:u}),n.createElement("meta",{name:"twitter:description",content:i}))}},8386:function(e,t,a){a.r(t),a.d(t,{Head:function(){return u}});var n=a(6540),l=a(4194),r=a(1489),c=a(3715),o=a(6213),m=a(3659),i=a(203),s=a(168);function u(e){let{location:t,params:a,data:l,pageContext:r}=e;return n.createElement(s.A,{meta:{title:"Blog",description:"A collection of my blog posts."}})}t.default=e=>{let{data:t,pageContext:a}=e;const{currentPage:s,numPages:u}=a,d=t.allMarkdownRemark.nodes,g=s>1?"Blog pg. "+s:"Blog";if(0===d.length)return n.createElement(r.A,{title:g},n.createElement("p",null,"No blog posts found. Get to writing asap!"));let p;return 1!==u&&(p=n.createElement("div",{className:"row my-1"},n.createElement("div",{className:"col-6 d-flex justify-content-end"},s>1?n.createElement(c.A,{text:"Previous",link:s>2?"/blog/"+(s-1):"/blog"}):null),n.createElement("div",{className:"col-6 d-flex justify-content-start"},s<u?n.createElement(c.A,{text:"Next",link:"/blog/"+(s+1)}):null))),n.createElement(r.A,{title:g},n.createElement("div",{className:"container-fluid d-flex flex-column"},n.createElement("div",{className:"row "+m.W},n.createElement("h1",null,"Blog")),n.createElement("div",{className:"row py-3"},n.createElement("div",{className:"col-sm-8 offset-sm-2"},n.createElement("ol",{style:{listStyle:"none"}},d.map((e=>{const t=e.frontmatter.title||e.fields.slug,a=n.createElement("p",null,e.frontmatter.tags.map(((t,a)=>a<e.frontmatter.tags.length-1?n.createElement("span",null,n.createElement(l.Link,{to:"/tags/"+(0,o.Y)(t),itemProp:"url",className:i.N},t),", "):n.createElement(l.Link,{to:"/tags/"+(0,o.Y)(t),itemProp:"url",className:i.N},t)))),r=e.frontmatter.updated?e.frontmatter.date+" (updated: "+e.frontmatter.updated+")":""+e.frontmatter.date;return n.createElement("li",{key:e.fields.slug,className:"py-1"},n.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("h2",null,n.createElement(l.Link,{to:e.fields.slug,itemProp:"url",className:i.X},n.createElement("span",{itemProp:"headline"},t))),n.createElement("small",null,r),a),n.createElement("section",null,n.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))),p))}},6213:function(e,t,a){a.d(t,{Y:function(){return n}});const n=e=>{e=(e=e.replace(/^\s+|\s+$/g,"")).toLowerCase();const t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;";for(let a=0,n=28;a<n;a++)e=e.replace(new RegExp(t.charAt(a),"g"),"aaaaeeeeiiiioooouuuunc------".charAt(a));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}},3659:function(e,t,a){a.d(t,{W:function(){return n}});var n="page-module--page-title--0e41d"},203:function(e,t,a){a.d(t,{N:function(){return l},X:function(){return n}});var n="blogList-module--post-link--f96a8",l="blogList-module--tag-link--78e62"}}]);
//# sourceMappingURL=component---src-templates-blog-list-js-01ba2652e7e00ae5d67d.js.map