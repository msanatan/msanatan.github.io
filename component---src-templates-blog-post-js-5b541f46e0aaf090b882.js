"use strict";(self.webpackChunkmsanatan_com=self.webpackChunkmsanatan_com||[]).push([[751],{1489:function(e,t,a){a.d(t,{A:function(){return m}});var n=a(6540),l=a(4194),r="layout-module--menu-item--65d49",c="layout-module--menu-item-active--6302b";var m=e=>{let{title:t,description:a,meta:m,children:o}=e;return n.createElement("div",{className:"container d-flex flex-column min-vh-100"},n.createElement("header",null,n.createElement("nav",{className:"navbar navbar-expand-lg navbar-light"},n.createElement("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navBarTogglerMenu","aria-controls":"navBarTogglerMenu","aria-expanded":"false","aria-label":"Toggle navigation"},n.createElement("span",{className:"navbar-toggler-icon"})),n.createElement("div",{className:"collapse navbar-collapse justify-content-lg-center",id:"navBarTogglerMenu"},n.createElement("ul",{className:"navbar-nav mr-auto mb-2 mb-lg-0"},n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/",className:"nav-link "+r,activeClassName:c},"Home")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/about",className:"nav-link "+r,activeClassName:c},"About")),n.createElement("li",{className:"nav-item"},n.createElement("a",{href:"https://gameboymarcus.itch.io",target:"_blank",rel:"nofollow noopener noreferrer",className:"nav-link "+r,activeClassName:c},"Games")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/blog",className:"nav-link "+r,activeClassName:c},"Blog")),n.createElement("li",{className:"nav-item"},n.createElement(l.Link,{to:"/contact",className:"nav-link "+r,activeClassName:c},"Contact")))))),n.createElement("main",{className:"flex-grow-1 d-flex"},o),n.createElement("footer",{className:"footer mt-auto py-2"},n.createElement("div",{className:"container"},n.createElement("span",null,"© ",(new Date).getFullYear()," Marcus Sanatan"))))}},168:function(e,t,a){var n=a(6540),l=a(4194);t.A=e=>{var t,a;let{location:r,meta:c,children:m}=e;const{site:o}=(0,l.useStaticQuery)("1391858338"),s=(null==c?void 0:c.description)||o.siteMetadata.description,i=o.siteMetadata.title,u=null!=c&&c.title?c.title+" — "+i:i;return n.createElement(n.Fragment,null,n.createElement("title",null,u),n.createElement("html",{lang:(null==c?void 0:c.lang)||o.siteMetadata.siteLang}),n.createElement("body",{className:"h-100"}),n.createElement("meta",{name:"description",content:s}),n.createElement("meta",{property:"og:title",content:u}),n.createElement("meta",{property:"og:description",content:s}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:creator",content:(null===(t=o.siteMetadata)||void 0===t||null===(a=t.social)||void 0===a?void 0:a.twitter)||""}),n.createElement("meta",{name:"twitter:title",content:u}),n.createElement("meta",{name:"twitter:description",content:s}))}},3689:function(e,t,a){a.r(t),a.d(t,{Head:function(){return i},default:function(){return u}});var n=a(6540),l=a(4194),r=a(1489),c=a(6213),m="blogPost-module--nav-link--d1bed",o=a(203),s=a(168);function i(e){let{location:t,params:a,data:l,pageContext:r}=e;return n.createElement(s.A,{meta:{title:l.markdownRemark.frontmatter.title,description:"A collection of my blog posts tagged with "+r.tag}})}var u=e=>{let{data:t}=e;const a=t.markdownRemark,s=a.frontmatter.title,i=a.frontmatter.description||a.excerpt,{previous:u,next:d}=t,g=a.frontmatter.updated?a.frontmatter.date+" (updated: "+a.frontmatter.updated+")":""+a.frontmatter.date,p=n.createElement("p",null,a.frontmatter.tags.map(((e,t)=>t<a.frontmatter.tags.length-1?n.createElement("span",{key:t},n.createElement(l.Link,{to:"/tags/"+(0,c.Y)(e),itemProp:"url",className:o.N},e),", "):n.createElement(l.Link,{to:"/tags/"+(0,c.Y)(e),itemProp:"url",className:o.N,key:t},e))));return n.createElement(r.A,{title:s,description:i,meta:[{keywords:a.frontmatter.tags}]},n.createElement("div",{className:"container d-flex flex-column blogPost-module--post-container--723dd"},n.createElement("div",{className:"row"},n.createElement("div",{className:"offset-lg-1 col-lg-10"},n.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",{className:"blogPost-module--header--0fe78 my-3"},n.createElement("h1",{itemProp:"headline"},a.frontmatter.title),n.createElement("small",null,g),p),n.createElement("section",{dangerouslySetInnerHTML:{__html:a.html},itemProp:"articleBody"})))),n.createElement("div",{className:"row my-3"},n.createElement("div",{className:"offset-lg-1 col-lg-10"},n.createElement("nav",{className:"blog-post-nav"},n.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},n.createElement("li",null,u&&n.createElement(l.Link,{to:u.fields.slug,rel:"prev",className:m},"← ",u.frontmatter.title)),n.createElement("li",null,d&&n.createElement(l.Link,{to:d.fields.slug,rel:"next",className:m},d.frontmatter.title," →"))))))))}},6213:function(e,t,a){a.d(t,{Y:function(){return n}});const n=e=>{e=(e=e.replace(/^\s+|\s+$/g,"")).toLowerCase();const t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;";for(let a=0,n=28;a<n;a++)e=e.replace(new RegExp(t.charAt(a),"g"),"aaaaeeeeiiiioooouuuunc------".charAt(a));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}},203:function(e,t,a){a.d(t,{N:function(){return l},X:function(){return n}});var n="blogList-module--post-link--f96a8",l="blogList-module--tag-link--78e62"}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-5b541f46e0aaf090b882.js.map