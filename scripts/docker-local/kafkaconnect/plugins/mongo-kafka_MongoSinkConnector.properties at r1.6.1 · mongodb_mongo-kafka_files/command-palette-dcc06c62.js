System.register(["./chunk-command-palette-item-element.js","./chunk-vendor.js","./chunk-color-modes.js","./chunk-copy.js","./chunk-frameworks.js"],function(){"use strict";var T,oe,K,q,ie,ne,B,Q,V,ae,ce,le,ue,he,E,c,v,de,F,d,J,P,pe,me,R,X,z,w,fe,ye;return{setters:[function(a){T=a.C,oe=a.a,K=a.P,q=a.J,ie=a.A,ne=a.Q,B=a.S,Q=a.l,V=a.L,ae=a.b,ce=a.R,le=a.c,ue=a.H,he=a.i,E=a.d},function(a){c=a.j,v=a.c,de=a.b,F=a.k,d=a.l,J=a.t,P=a.ad,pe=a.o,me=a.h},function(a){R=a.s,X=a.a,z=a.g},function(a){w=a.c},function(a){fe=a.c,ye=a.M}],execute:function(){var a=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,ut=(e,t)=>a(e,"name",{value:t,configurable:!0}),G=(e,t,s,r)=>{for(var o=r>1?void 0:r?lt(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&a(t,s,o),o};const ve="*";let x=class extends HTMLElement{constructor(){super(...arguments);this.scopeTypes=""}active(e,t){return this.scopeTypeMatch(e.type)&&this.modeMatch(t)}scopeTypeMatch(e){return this.scopeTypes?this.scopeTypes&&JSON.parse(this.scopeTypes).includes(e):!0}modeMatch(e){return this.char===ve||this.char===e}character(){return this.char===ve?"":this.char}};ut(x,"CommandPaletteModeElement"),G([c],x.prototype,"char",2),G([c],x.prototype,"placeholder",2),G([c],x.prototype,"scopeTypes",2),x=G([v],x);var ge=Object.defineProperty,ht=Object.getOwnPropertyDescriptor,dt=(e,t)=>ge(e,"name",{value:t,configurable:!0}),C=(e,t,s,r)=>{for(var o=r>1?void 0:r?ht(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&ge(t,s,o),o};const D="*",be="";let p=class extends HTMLElement{constructor(){super(...arguments);this.scopeTypes=D,this.mode=D,this.matchMode=be,this.value=D,this.onEmpty=!1,this.onError=!1}connectedCallback(){this.hidden=!0}available(e,t=!1,s=!1){return this.valueMatch(e.text)&&this.scopeTypeMatch(e.scope.type)&&this.modeMatch(e.mode)&&this.showOnEmpty(t)&&this.showOnError(s)}toggle(e,t=!1,s=!1){this.hidden=!this.available(e,t,s)}valueMatch(e){return this.value===D||this.value===e}scopeTypeMatch(e){return this.scopeTypes===D||JSON.parse(this.scopeTypes).includes(e)}modeMatch(e){if(this.matchMode===be)return this.mode===D||this.mode===e;{const t=new RegExp(this.matchMode);return e.match(t)!==null}}showOnEmpty(e){return this.onEmpty?e:!0}showOnError(e){return this.onError?e:!0}};dt(p,"CommandPaletteTipElement"),C([c],p.prototype,"scopeTypes",2),C([c],p.prototype,"mode",2),C([c],p.prototype,"matchMode",2),C([c],p.prototype,"value",2),C([c],p.prototype,"onEmpty",2),C([c],p.prototype,"onError",2),p=C([v],p);var Ce=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,mt=(e,t)=>Ce(e,"name",{value:t,configurable:!0}),k=(e,t,s,r)=>{for(var o=r>1?void 0:r?pt(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&Ce(t,s,o),o};let _=class extends HTMLElement{constructor(){super(...arguments);this.type="",this.id="",this.text="",this.value=""}};mt(_,"CommandPaletteTokenElement"),k([c],_.prototype,"type",2),k([c],_.prototype,"id",2),k([c],_.prototype,"text",2),k([c],_.prototype,"value",2),_=k([v],_);var _e=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,yt=(e,t)=>_e(e,"name",{value:t,configurable:!0}),$=(e,t,s,r)=>{for(var o=r>1?void 0:r?ft(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&_e(t,s,o),o};let S=class extends HTMLElement{constructor(){super(...arguments);this.topGroupThreshold=6.5,this.maxHeightVh=65,this.showDebugInfo=!1,this.octicons={},this.tryDefaultSelection=!1,this.eventListenersBound=!1,this.currentHeight=0,this.items={},this.history={}}get commandPalette(){return this.closest("command-palette")}connectedCallback(){if(this.classList.add("rounded-bottom-2"),this.commandPalette&&!this.commandPalette.multiPageEnabled){const e=this.commandPalette.querySelector(".js-command-local-provider-octicons");if(e){const t=Array.from(e.children).map(s=>({id:s.getAttribute("data-local-provider-octicon-id"),svg:s.innerHTML}));this.commandPalette.cacheIcons(t)}}}get selectedItem(){return this.findSelectedElement()}set selectedItem(e){const t=this.findSelectedElement();t&&(t.selected=!1),e&&(e.selected=!0,this.selectedItemChanged(e.item))}get selectedItemIsTopResult(){var e;const t=this.findGroup(T.topGroupId);return t&&t.itemNodes.length>0?t.firstItem.itemId===((e=this.selectedItem)==null?void 0:e.itemId):!1}findSelectedElement(){return this.querySelector("command-palette-item[data-selected]")}navigate(e){var t,s;this.tryDefaultSelection=!1;const r=e>0,o={behavior:"smooth",block:"nearest"};if(this.selectedItem){let i;if(r?i=(t=this.selectedItem)==null?void 0:t.nextElementSibling:i=(s=this.selectedItem)==null?void 0:s.previousElementSibling,i)this.selectedItem=i,this.selectedItem.scrollIntoView(o);else if(this.selectedItem){const n=this.visibleGroups[this.calculateIndex(e)];n.scrollIntoView(o),r?this.selectedItem=n.firstItem:this.selectedItem=n.lastItem}}else this.selectedItem=this.firstItem}calculateIndex(e){var t;let s=this.visibleGroups.findIndex(i=>{var n;return i.groupId===((n=this.selectedItem)==null?void 0:n.item.group)});((t=this.findGroup(T.topGroupId))==null?void 0:t.firstItem)===this.selectedItem&&(s=0);const r=s+e,o=this.visibleGroups.length;return(r%o+o)%o}historyItems(e){return this.history[e]||(this.history[e]={}),this.history[e]}addItemToHistory(e,t,s){const r=this.historyItems(t),o=s.calculateScore(e);r[s.id]=o}addItems(e,t,s=!1){for(const r of t)this.addItemToHistory(e.text,e.path,r),this.items[r.id]=r,s&&this.prefillHistory(r,e);F(this.renderCurrentItems.bind(this),this.debounceWait)()}removeItem(e){return delete this.items[e.id]}removeItems(e){const t=e.map(s=>({item:s,removed:this.removeItem(s)}));return F(this.renderCurrentItems.bind(this),this.debounceWait)(),t}prefillHistory(e,t){for(const s of e.matchingFields){const r=15,o=Math.min(s.length,r);for(let i=0;i<=o;i++){const n=s.slice(0,i);this.addItemToHistory(n,t.buildPath(t,n),e)}}}get debounceWait(){return 16}renderCurrentItems(){const e=this.getQuery().immutableCopy();this.currentPath!==e.path&&this.reset();const t=[...this.currentItems];if(e.isPresent()&&t.length>0){const s=this.findGroup(T.topGroupId);for(let r=0;s&&r<s.limit;r++){const o=t[r],i=o.calculateScore(e.queryText),n=o.priority+i;o&&n>this.topGroupThreshold&&this.renderItem(t.shift(),T.topGroupId)}}this.renderItems(t),this.updateSelectedItem(),this.itemsUpdated()}itemsUpdated(){const e=new CustomEvent("itemsUpdated",{cancelable:!0,detail:{items:this.currentItems,queryPath:this.getQuery().immutableCopy().path}});return this.dispatchEvent(e)}selectedItemChanged(e){const t=new CustomEvent("selectedItemChanged",{bubbles:!0,cancelable:!0,detail:{item:e,isDefaultSelection:this.tryDefaultSelection}});return this.dispatchEvent(t)}renderItems(e){for(const t of e)this.renderItem(t,t.group);this.setGroupBorders(),this.setMaxHeight()}get maximumHeight(){const e=475,t=50,s=window.innerHeight*(t/100);return Math.min(s,e)}get innerContentHeight(){let e=0;for(const t of this.children){const s=t,r=getComputedStyle(s),o=parseInt(r.marginTop.replace("px",""),10),i=parseInt(r.marginBottom.replace("px",""),10),n=s.offsetHeight+o+i;s.offsetHeight>0&&(e+=n)}return e}setMaxHeight(){const e=.6,t=this.maximumHeight*e,s=Math.round(Math.min(this.maximumHeight,this.innerContentHeight));Math.abs(this.currentHeight-s)>t?this.classList.add("no-transition"):this.classList.remove("no-transition"),this.setAttribute("style",`max-height:${s}px; min-height:${s}px;`),this.currentHeight=s}setGroupBorders(){if(this.visibleGroups.length>0){this.visibleGroups[0].classList.remove("border-top");for(const e of this.visibleGroups)this.visibleGroups.indexOf(e)===0?(e.classList.remove("border-top"),e.header&&(e.classList.remove("py-2"),e.classList.add("mb-2","mt-3"))):(e.classList.add("border-top"),e.header&&(e.classList.remove("mb-2","mt-3"),e.classList.add("py-2")))}}createItemElementAndRender(e,t,s){const r=new oe;return r.setItemAttributes(e),r.render(t,s),r}renderItem(e,t){var s;const r=this.findGroup(t);if(!r||(r.hasItem(e)||r.atLimit||((s=this.topGroup)==null?void 0:s.hasItem(e)))&&!(r==null?void 0:r.topGroup))return;const o=this.createItemElementAndRender(e,!1,this.getQuery().immutableCopy().queryText);if(this.showDebugInfo&&(o.score=e.score),r.push(o),o.containerElement){const n=r.list.children.length.toString();e.position=n}if(e.icon)if(e.icon.type==="octicon"){const n=this.octicons[e.icon.id],y=this.octicons["dash-color-fg-muted"];o.renderOcticon(n||y)}else e.icon.type==="avatar"&&o.renderAvatar(e.icon.url,e.icon.alt);else o.iconElement.hidden=!0;o.addEventListener("mousemove",n=>{(n.movementX!==0||n.movementY!==0)&&this.selectedItem!==o&&(this.tryDefaultSelection=!1,this.selectedItem=o)})}findGroup(e){return this.groups.find(t=>t.groupId===e)}get topGroup(){return this.findGroup(T.topGroupId)}get groupIds(){return this.groups.map(e=>e.groupId)}updateSelectedItem(){this.isSelectedItemInvalid()&&this.clearSelection(),this.setDefaultSelection()&&(this.selectedItem=this.firstItem)}setDefaultSelection(){const e=this.getQuery().hasScope()||this.getQuery().isPresent();return this.tryDefaultSelection&&e}noItemSelected(){return!this.selectedItem||this.isSelectedItemInvalid()}isSelectedItemInvalid(){return!this.currentItems.some(e=>{var t;return e.id===((t=this.selectedItem)==null?void 0:t.itemId)})}isEmpty(){return!this.currentItems||this.currentItems.length===0}clearSelection(){this.selectedItem=void 0}clear(){this.history={},this.items={},this.reset()}reset(){this.tryDefaultSelection=!0,this.currentPath=this.getQuery().immutableCopy().path;for(const e of this.groups)e.prepareForNewItems()}clearItemsFor(e){const t=this.groups.filter(r=>e.includes(r.groupId));for(const r of t)r.prepareForNewItems();const s=Object.values(this.items).filter(r=>e.includes(r.group));this.removeItems(s)}get visibleGroups(){return this.groups.filter(e=>!e.hidden)}get firstItem(){const e=this.visibleGroups;if(e.length>0)return e[0].querySelector("command-palette-item")}get currentItems(){const e=this.getQuery().immutableCopy(),t=this.historyItems(e.path),s=Object.entries(t).map(([r,o])=>{const i=this.items[r];return i?(i.score=o,i):(delete t[r],null)}).filter(r=>r!==null);return s?e.isBlank()?s.sort((r,o)=>o.priority-r.priority):s.sort((r,o)=>o.score-r.score||o.priority-r.priority):[]}disconnectedCallback(){this.unbindListeners()}bindListeners(){this.eventListenersBound||(window.addEventListener("resize",this.setMaxHeight.bind(this)),this.eventListenersBound=!0)}unbindListeners(){window.removeEventListener("resize",this.setMaxHeight.bind(this)),this.eventListenersBound=!1}};yt(S,"CommandPaletteItemStackElement"),$([c],S.prototype,"topGroupThreshold",2),$([c],S.prototype,"maxHeightVh",2),$([c],S.prototype,"showDebugInfo",2),$([de],S.prototype,"groups",2),S=$([v],S);var vt=Object.defineProperty,gt=(e,t)=>vt(e,"name",{value:t,configurable:!0});class Se extends K{async fetchSrc(t){if(!this.src)throw new Error("No src provided");const s=new URL(this.src,window.location.origin);s.search=t.params().toString();const o=await(await fetch(s.toString(),{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json(),i=o.results[0];if(i.base_file_path){const n=i.base_file_path,y=i.paths;o.results=y.map(u=>q.from({title:u,path:`${n}/${u}`,icon:"file-color-fg-muted",group:"files"}))}else i.action&&i.action.type==="access_policy"?o.results=[new ie(i)]:o.results=[];return o}async fetch(t,s=!1){const r=t.text.match(/(.+):(\d*)\s*$/);return r?this.fetchWithLineNumbers(t,r):super.fetch(t,s)}async fetchWithLineNumbers(t,s){const r=s[1],o=s[2],i=new ne(r,t.mode,{scope:t.scope}),n=[],y=(await super.fetch(i,!1)).results;for(const u of y)u instanceof q&&n.push(this.convert(u,o));return{results:n}}convert(t,s){return s===""||!(t instanceof q)||(t.title=`${t.title}:${s}`,t.action.path=`${t.action.path}#L${s}`),t}}gt(Se,"FilesProvider");var bt=Object.defineProperty,Ct=(e,t)=>bt(e,"name",{value:t,configurable:!0});class Ie extends B{enabledFor(t){return!0}clearCache(){}get hasCommands(){return!1}get debounce(){return 0}async fetch(t,s=!1){return t.mode==="?"||s?{results:Array.from(this.element.querySelectorAll("command-palette-help")).filter(i=>i.show(t)).map((i,n)=>i.toItem(n))}:{results:[]}}}Ct(Ie,"HelpProvider");var Te=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,St=(e,t)=>Te(e,"name",{value:t,configurable:!0}),It=(e,t,s,r)=>{for(var o=r>1?void 0:r?_t(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&Te(t,s,o),o};let A=class extends V{constructor(e){super(e)}static from(e){return new A({title:e.title,subtitle:e.subtitle,typeahead:e.title,priority:e.priority,score:1,group:e.group,action:{type:"main_window_command",command:e,path:""},icon:{type:"octicon",id:e.icon},hint:"Run command"})}activate(e){super.activate(e),this.action.command.run(e),e.clearProviderCaches(),e.dismiss(),e.itemStackElement.clear(),e.commandPaletteInput.value=""}get activateTrackingEventType(){return"command_executed"}isApplicable(e){return this.action.command.isApplicable(e)}select(){this.action.command.select()}deselect(){this.action.command.deselect()}get action(){return this._action}};St(A,"MainWindowCommandItem"),A=It([Q],A);var Tt=Object.defineProperty,Et=(e,t)=>Tt(e,"name",{value:t,configurable:!0});class l{constructor(){this.group="commands",this.priority=0}static get item(){return A.from(new this)}run(t){}isApplicable(t){return!0}select(){}deselect(){}}Et(l,"MainWindowCommand");var Pt=Object.defineProperty,U=(e,t)=>Pt(e,"name",{value:t,configurable:!0});class Ee extends l{constructor(){super(...arguments);this.title="Delete discussion\u2026",this.icon="trash-color-fg-muted"}fetchDetails(){return document.querySelector("details.js-delete-discussion-details")}isApplicable(){return this.fetchDetails()instanceof HTMLDetailsElement}run(){const t=this.fetchDetails();t&&(t.open=!0,setTimeout(()=>{var s;(s=t==null?void 0:t.querySelector('button[type="submit"]'))==null||s.focus()},0))}}U(Ee,"DeleteDiscussion");class Pe extends l{constructor(){super(...arguments);this.title="Edit discussion body",this.icon="pencil-color-fg-muted"}get editButton(){return document.querySelector(".js-discussions-comment-edit-button")}isApplicable(){return this.editButton!=null}run(){var t;(t=this.editButton)==null||t.click()}}U(Pe,"EditDiscussion");class we extends l{constructor(){super(...arguments);this.title="Transfer discussion\u2026",this.icon="arrow-right-color-fg-muted"}fetchDetails(){return document.querySelector("details.js-transfer-discussion-details")}isApplicable(){return this.fetchDetails()instanceof HTMLDetailsElement}run(){var t;const s=this.fetchDetails();if(s){const r=U(()=>{setTimeout(()=>{var o;(o=s==null?void 0:s.querySelector("[data-menu-button]"))==null||o.focus()},0)},"focusMenu");(t=s.querySelector("include-fragment"))==null||t.addEventListener("load",r),s.open=!0,r()}}}U(we,"TransferDiscussion");var wt=[Ee,we,Pe],xt=Object.defineProperty,g=(e,t)=>xt(e,"name",{value:t,configurable:!0});class xe extends l{constructor(){super(...arguments);this.group="global_commands"}}g(xe,"MainWindowGlobalCommand");class De extends l{constructor(){super(...arguments);this.title="Open in github.dev editor",this.icon="codespaces-color-fg-muted",this.priority=10}isApplicable(){return this.fetchLink()instanceof HTMLAnchorElement}fetchLink(){return document.querySelector(".js-github-dev-shortcut")}run(){var t;(t=this.fetchLink())==null||t.click()}}g(De,"OpenInDotDev");class M extends xe{constructor(){super(...arguments);this.title="Switch theme to default dark",this.icon="moon-color-fg-muted",this.mode="dark",this.theme="dark"}select(){this.loadStyles(this.theme)}applyTheme(){this.loadStyles(this.theme),this.mode!=="auto"&&R(this.theme,this.mode),X(this.mode)}async run(){this.applyTheme(),this.saveSettings(this.mode,this.lightTheme,this.darkTheme)}async saveSettings(t=this.mode,s,r){const o=document.querySelector(".js-color-mode-csrf").value,i=document.querySelector(".js-color-mode-path").value,n=new FormData;n.set("color_mode",t),s&&n.set("light_theme",s),r&&n.set("dark_theme",r);const u=await(await fetch(i,{method:"PUT",body:n,mode:"same-origin",headers:{"Scoped-CSRF-Token":o,"X-Requested-With":"XMLHttpRequest"}})).json();this.loadStyles(u.light_theme),this.loadStyles(u.dark_theme),R(u.light_theme,"light"),R(u.dark_theme,"dark"),X(u.color_mode)}loadStyles(t){const s=document.querySelector(`link[data-color-theme='${t}']`);s&&!s.hasAttribute("href")&&s.hasAttribute("data-href")&&s.setAttribute("href",s.getAttribute("data-href"))}get darkTheme(){return this.mode==="dark"?this.theme:z("dark")}get lightTheme(){return this.mode==="light"?this.theme:z("light")}}g(M,"SwitchToDark");class Me extends M{constructor(){super(...arguments);this.title="Switch theme to dark high contrast",this.theme="dark_high_contrast"}}g(Me,"SwitchToDarkHighConstrast");class Le extends M{constructor(){super(...arguments);this.title="Switch theme to dark dimmed",this.theme="dark_dimmed"}}g(Le,"SwitchToDarkDimmed");class je extends M{constructor(){super(...arguments);this.title="Switch theme to default light",this.icon="sun-color-fg-muted",this.mode="light",this.theme="light"}}g(je,"SwitchToLight");class ke extends M{constructor(){super(...arguments);this.title="Switch theme settings to sync with system",this.icon="sun-color-fg-muted",this.mode="auto"}get darkTheme(){}get lightTheme(){}}g(ke,"SwitchToAuto");class $e extends l{constructor(){super();const t=this.isSubscribe();this.title=`${t?"Subscribe":"Unsubscribe"}`,this.icon=`${t?"bell":"bell-slash"}-color-fg-muted`}isApplicable(){var t;return this.fetchButton()instanceof HTMLButtonElement&&((t=this.fetchButton())==null?void 0:t.disabled)===!1}isSubscribe(){var t,s;return((s=(t=this.fetchButton())==null?void 0:t.textContent)==null?void 0:s.trim())==="Subscribe"}fetchButton(){return document.querySelector(".thread-subscribe-button")}run(){var t;(t=this.fetchButton())==null||t.click()}}g($e,"UpdateSubscription");var Dt=[De,je,M,Le,Me,ke,$e],Mt=Object.defineProperty,m=(e,t)=>Mt(e,"name",{value:t,configurable:!0});function Y(e){e.focus(),e.selectionStart=e.selectionEnd=e.value.length}m(Y,"moveCursorToEnd");class Z extends l{constructor(){super(...arguments);this.title="Edit issue body",this.icon="pencil-color-fg-muted"}run(){const t=document.createElement("button");t.hidden=!0,t.classList.add("js-comment-edit-button");const s=document.querySelector("div.js-comment");s==null||s.appendChild(t),t.click(),t.remove(),setTimeout(()=>{var r;const o=(r=s==null?void 0:s.parentElement)==null?void 0:r.querySelector("textarea.js-comment-field");o&&Y(o)},0)}}m(Z,"EditIssueBody");class ee extends l{constructor(){super(...arguments);this.title="Edit issue title",this.icon="pencil-color-fg-muted"}isApplicable(){return this.fetchButton()instanceof HTMLButtonElement}fetchButton(){return document.querySelector(".js-title-edit-button")}run(){var t;(t=this.fetchButton())==null||t.click(),setTimeout(()=>{const s=document.querySelector("input#issue_title[autofocus]");s&&Y(s)},0)}}m(ee,"EditIssueTitle");class Ae extends l{constructor(){super(...arguments);this.title="Transfer issue\u2026",this.icon="arrow-right-color-fg-muted"}isApplicable(){return this.fetchDetails()instanceof HTMLDetailsElement}fetchDetails(){return document.querySelector("details.js-transfer-issue")}run(){var t;const s=this.fetchDetails();if(s){const r=m(()=>{setTimeout(()=>{var o;(o=s.querySelector("[data-menu-button]"))==null||o.focus()},0)},"focusMenu");(t=s.querySelector("include-fragment"))==null||t.addEventListener("load",r),s.open=!0,r()}}}m(Ae,"TransferIssue");class Oe extends l{constructor(){super();const t=this.isLock();this.title=`${t?"Lock":"Unlock"} issue`,this.icon=`${t?"lock":"key"}-color-fg-muted`}isApplicable(){return this.fetchDetails()instanceof HTMLDetailsElement}isLock(){var t,s;return((s=(t=document.querySelector("summary.lock-toggle-link"))==null?void 0:t.textContent)==null?void 0:s.trim())==="Lock conversation"}fetchDetails(){return document.querySelector("details.js-lock-issue")}run(){const t=this.fetchDetails();t&&(t.open=!0,setTimeout(()=>{var s;(s=document.querySelector("#unlock-reason"))==null||s.focus()},0))}}m(Oe,"LockIssue");class He extends l{constructor(){super(...arguments);this.title="Delete issue\u2026",this.icon="trash-color-fg-muted"}isApplicable(){return this.fetchDetails()instanceof HTMLDetailsElement}fetchDetails(){return document.querySelector("details.js-delete-issue")}run(){const t=this.fetchDetails();t&&(t.open=!0,setTimeout(()=>{var s;(s=t.querySelector('button[type="submit"]'))==null||s.focus()},0))}}m(He,"DeleteIssue");class qe extends l{constructor(){super(...arguments);this.title="Convert issue to discussion\u2026",this.icon="comment-discussion-color-fg-muted"}isApplicable(){return this.fetchDetails()instanceof HTMLDetailsElement}fetchDetails(){return document.querySelector("details.js-convert-to-discussion")}run(){var t;const s=this.fetchDetails();if(s){const r=m(()=>{setTimeout(()=>{var o;(o=s.querySelector("[data-menu-button]"))==null||o.focus()},0)},"focusMenu");(t=s.querySelector("include-fragment"))==null||t.addEventListener("load",r),s.open=!0,r()}}}m(qe,"ConvertToDiscussion");var Lt=[ee,Z,Oe,Ae,He,qe],jt=Object.defineProperty,kt=(e,t)=>jt(e,"name",{value:t,configurable:!0});class te extends l{constructor(){super(...arguments);this.title="Open in new codespace",this.icon="codespaces-color-fg-muted",this.priority=11}isApplicable(){const t=this.fetchElements();return!!(t.codeModal&&t.codespacesForm&&t.newCodespacesButton&&t.codespacesTab)}run(){const{codeModal:t,codespacesTab:s,newCodespacesButton:r}=this.fetchElements();!(t&&s&&r)||(t.open=!0,s.click(),r instanceof HTMLButtonElement?r.click():(r.parentElement.open=!0,setTimeout(()=>{var o;(o=document.querySelector(".js-create-codespace-with-sku-button"))==null||o.focus()},0)))}fetchElements(){const t=document.querySelector(".js-create-codespaces-form-command"),s=(t==null?void 0:t.closest("details"))||null,r=(s==null?void 0:s.querySelector('[data-tab="cloud"]'))||null,o=(t==null?void 0:t.querySelector('summary[role="button"], button[type="submit"]'))||null;return{codespacesForm:t,codeModal:s,codespacesTab:r,newCodespacesButton:o}}}kt(te,"OpenCodespace");var $t=Object.defineProperty,O=(e,t)=>$t(e,"name",{value:t,configurable:!0});class Be extends Z{constructor(){super(...arguments);this.title="Edit pull request body"}}O(Be,"EditPullRequestBody");class Fe extends ee{constructor(){super(...arguments);this.title="Edit pull request title"}}O(Fe,"EditPullRequestTitle");class Re extends l{constructor(){super(...arguments);this.title="Update current branch",this.icon="sync-color-fg-muted"}isApplicable(){return this.fetchButton()instanceof HTMLButtonElement}fetchButton(){return document.querySelector(".js-update-branch-form button")}run(){const t=this.fetchButton();t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.click())}}O(Re,"UpdateBranch");class Ge extends l{constructor(){super(...arguments);this.title="Convert to draft",this.icon="git-pull-request-draft-color-fg-muted"}isApplicable(){return this.fetchButton()instanceof HTMLButtonElement}fetchButton(){return document.querySelector(".js-convert-to-draft")}run(){var t;const s=(t=this.fetchButton())==null?void 0:t.closest("details");s&&(s.open=!0,setTimeout(()=>{var r;(r=s.querySelector(".js-convert-to-draft"))==null||r.focus()},0))}}O(Ge,"ConvertToDraft");class Ue extends l{constructor(){super(...arguments);this.title="Copy current branch name",this.icon="copy-color-fg-muted"}isApplicable(){return this.fetchClipboardCopy()instanceof d}fetchClipboardCopy(){return document.querySelector(".js-copy-branch")}async run(t){const s=this.fetchClipboardCopy();if(s instanceof d){const r=s.value;try{await w(r),t.displayFlash("success","Branch name copied to clipboard!")}catch{t.displayFlash("error","Unable to copy branch name to clipboard!")}}}}O(Ue,"CopyBranchName");var At=[Ue,Fe,Be,Re,Ge,te],Ot=Object.defineProperty,N=(e,t)=>Ot(e,"name",{value:t,configurable:!0});class Ne extends l{constructor(){super(...arguments);this.title="Copy file permalink",this.icon="copy-color-fg-muted"}isApplicable(){return this.fetchPermalinkContainer()instanceof HTMLAnchorElement}fetchPermalinkContainer(){return document.querySelector(".js-permalink-shortcut")}async run(t){const s=this.fetchPermalinkContainer();if(s){const r=`${s.href}${window.location.hash}`;try{await w(r),t.displayFlash("success","Copied permalink!")}catch{t.displayFlash("error","Failed to copy permalink!")}}}}N(Ne,"CopyPermalink");class We extends l{constructor(){super(...arguments);this.title="Clone repository: Copy HTTPS",this.icon="copy-color-fg-muted",this.priority=4}isApplicable(){return this.fetchClipboardCopy()instanceof d}fetchClipboardCopy(){return document.querySelector(".js-clone-url-http")}async run(t){const s=this.fetchClipboardCopy();if(s instanceof d){const r=s.value;try{await w(r),t.displayFlash("success","Clone URL copied!")}catch{t.displayFlash("error","Clone URL couldn't be copied")}}}}N(We,"CloneCopyHttps");class Ke extends l{constructor(){super(...arguments);this.title="Clone repository: Copy SSH",this.icon="copy-color-fg-muted",this.priority=3}isApplicable(){return this.fetchClipboardCopy()instanceof d}fetchClipboardCopy(){return document.querySelector(".js-clone-url-ssh")}async run(t){const s=this.fetchClipboardCopy();if(s instanceof d){const r=s.value;try{await w(r),t.displayFlash("success","Clone URL copied!")}catch{t.displayFlash("error","Clone URL couldn't be copied")}}}}N(Ke,"CloneCopySsh");class Qe extends l{constructor(){super(...arguments);this.title="Clone repository: Copy GitHub CLI",this.icon="copy-color-fg-muted",this.priority=2}isApplicable(){return this.fetchClipboardCopy()instanceof d}fetchClipboardCopy(){return document.querySelector(".js-clone-url-gh-cli")}async run(t){const s=this.fetchClipboardCopy();if(s instanceof d){const r=s.value;try{await w(r),t.displayFlash("success","Clone URL copied!")}catch{t.displayFlash("error","Clone URL couldn't be copied")}}}}N(Qe,"CloneCopyCli");var Ht=[We,Ke,Qe,Ne,te],qt=Object.defineProperty,Bt=(e,t)=>qt(e,"name",{value:t,configurable:!0});class Ve extends B{constructor(){super(...arguments);this.itemsByType={},this.everywhereItems=[],this.needsFetch=!0}enabledFor(t){return t.mode===">"}get hasCommands(){return!0}async fetch(t,s=!1){var r;this.loadCommandItems();const o=this.itemsForSubjectType((r=t.subjectType)!=null?r:"");return{results:(t.isBlank()?o:this.fuzzyFilter(o,t)).filter(y=>y.isApplicable(t))}}itemsForSubjectType(t){var s;return[...(s=this.itemsByType[t])!=null?s:[],...this.everywhereItems]}get debounce(){return 0}loadCommandItems(){this.needsFetch&&(this.itemsByType={Issue:Lt.map(t=>t.item),PullRequest:At.map(t=>t.item),Repository:Ht.map(t=>t.item),Discussion:wt.map(t=>t.item)},this.everywhereItems=Dt.map(t=>t.item),this.needsFetch=!1)}clearCache(){this.needsFetch=!0}}Bt(Ve,"MainWindowCommandsProvider");var Ft=Object.defineProperty,Rt=(e,t)=>Ft(e,"name",{value:t,configurable:!0});class Je extends B{enabledFor(t){return!(t.isBlank()||t.mode==="?"||t.mode===">")}clearCache(){}get hasCommands(){return!1}async fetch(t,s=!1){return{results:[ae.create(t)]}}}Rt(Je,"SearchLinksProvider");var Gt=Object.defineProperty,Ut=(e,t)=>Gt(e,"name",{value:t,configurable:!0});class se{static create(t){const s=this.providers[t.type];if(!s)throw new Error(`Unknown provider type: ${t.type}`);return new s(t)}}Ut(se,"ServerDefinedProviderFactory"),se.providers={remote:ce,prefetched:K,files:Se,help:Ie,"search-links":Je,"main-window-commands":Ve};var Xe=Object.defineProperty,Nt=Object.getOwnPropertyDescriptor,Wt=(e,t)=>Xe(e,"name",{value:t,configurable:!0}),I=(e,t,s,r)=>{for(var o=r>1?void 0:r?Nt(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&Xe(t,s,o),o};let f=class extends le{constructor(){super(...arguments);this._wildcard="*"}get debounce(){return parseInt(this.fetchDebounce,10)}get hasCommands(){return this.supportsCommands}get hasWildCard(){return this.modes.includes(this._wildcard)}get modes(){return this.supportedModes===""&&(this._modes=[""]),this._modes||(this._modes=JSON.parse(this.supportedModes)),this._modes}get scopeTypes(){return this.supportedScopeTypes===""?[]:(this._scopeTypes||(this._scopeTypes=JSON.parse(this.supportedScopeTypes)),this._scopeTypes)}connectedCallback(){this.provider=se.create(this)}};Wt(f,"ServerDefinedProviderElement"),I([c],f.prototype,"type",2),I([c],f.prototype,"supportedModes",2),I([c],f.prototype,"fetchDebounce",2),I([c],f.prototype,"supportedScopeTypes",2),I([c],f.prototype,"src",2),I([c],f.prototype,"supportsCommands",2),f=I([v],f);var ze=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,Qt=(e,t)=>ze(e,"name",{value:t,configurable:!0}),L=(e,t,s,r)=>{for(var o=r>1?void 0:r?Kt(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&ze(t,s,o),o};let b=class extends HTMLElement{connectedCallback(){this.hidden=!0}show(e){return this.isEnabledScopeType(e)}isEnabledScopeType(e){return this.scopeTypes?this.scopeTypes&&JSON.parse(this.scopeTypes).includes(e.scope.type):!0}toItem(e){const t={group:this.group,title:this.titleElement.innerHTML,index:e};return this.prefix&&(t.prefix=this.prefix),this.hintElement.textContent&&(t.persistentHint=this.hintElement.innerHTML),ue.from(t)}};Qt(b,"CommandPaletteHelpElement"),L([c],b.prototype,"group",2),L([c],b.prototype,"prefix",2),L([c],b.prototype,"scopeTypes",2),L([J],b.prototype,"titleElement",2),L([J],b.prototype,"hintElement",2),b=L([v],b);var Ye=Object.defineProperty,Vt=Object.getOwnPropertyDescriptor,Jt=(e,t)=>Ye(e,"name",{value:t,configurable:!0}),Xt=(e,t,s,r)=>{for(var o=r>1?void 0:r?Vt(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&Ye(t,s,o),o};let re=class extends V{constructor(e){super(e);this.priority=11,this.score=1,this.typeahead=e.title,this.group="commands"}get action(){return this._action}async activate(e){super.activate(e);const t=e.getAttribute("data-commands-path"),s=e.querySelector(".js-commands-csrf").value;if(!t||!s)return;const r=e.query.params();r.set("command",this.action.id),e.commandPaletteInput.loading=!0;const o=await fetch(t,{method:"POST",mode:"same-origin",headers:{Accept:"application/json","Scoped-CSRF-Token":s,"X-Requested-With":"XMLHttpRequest"},body:r});if(e.commandPaletteInput.loading=!1,o.ok){const i=await o.json();this.handleResponse(e,i.action,i.arguments)}else e.displayFlash("error","Failed to run command")}handleResponse(e,t,s){switch(t){case"displayFlash":e.displayFlash(s.type,s.message),e.clearProviderCaches(),e.dismiss(),e.itemStackElement.clear(),e.commandPaletteInput.value="";break}}get activateTrackingEventType(){return"command_executed"}};Jt(re,"CommandItem"),re=Xt([Q],re);var Ze=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,Yt=(e,t)=>Ze(e,"name",{value:t,configurable:!0}),et=(e,t,s,r)=>{for(var o=r>1?void 0:r?zt(t,s):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(o=(r?n(t,s,o):n(o))||o);return r&&o&&Ze(t,s,o),o};let j=class extends HTMLElement{constructor(){super(...arguments);this.setupComplete=!1,this.connected=!1,this.multiPageEnabled=!1}static get observedAttributes(){return["value","typeahead","scope"]}setup(){this.classList.add("d-flex","flex-items-center","flex-nowrap","py-1","pl-3","pr-2","border-bottom"),this.onInputBound=this.onInput.bind(this),this.onKeydownBound=this.onKeydown.bind(this),this.onClearBound=this.onClear.bind(this),this.input=this.querySelector("input.js-input"),this.overlayInput=this.querySelector("input.js-overlay-input"),this.clearButton=this.querySelector(".js-clear"),this.scopeElement=this.querySelector("command-palette-scope"),this.searchIcon=this.querySelector(".js-search-icon"),this.spinner=this.querySelector(".js-spinner"),this.defaultScope=this.scope,this.hasAttribute("autofocus")&&this.input.focus(),this.input.addEventListener("input",this.onInputBound),this.input.addEventListener("keydown",this.onKeydownBound),this.clearButton.addEventListener("click",this.onClearBound),this.clearButton.addEventListener("keydown",e=>{e.key==="Enter"&&this.onClearBound(e)}),this.clearButton.hidden=!0,this.value.length!==0&&this._dispatchEvent("command-palette-input"),this.setupComplete=!0}connectedCallback(){this.setupComplete||this.setup(),this.value=this.getAttribute("value")||"",this.typeahead=this.getAttribute("typeahead")||"",this.placeholder=this.getAttribute("placeholder")||"",this.connected=!0}attributeChangedCallback(e,t,s){!this.input||(e==="typeahead"?this.typeahead=s:e==="value"&&(this.value=s,this._dispatchEvent("command-palette-input")))}focus(){this.input.focus()}setRemovedTokenAndSelect(e){e&&(this.value=e),this.focus(),this.input.select()}get scope(){return this.scopeElement.scope}set scope(e){this.scopeElement.scope=e}hasScope(){return this.scopeElement.hasScope()}clearScope(){return this.scopeElement.clearScope()}removeToken(){return this.scopeElement.removeToken()}get placeholder(){return this.input.getAttribute("placeholder")||""}set placeholder(e){this.input.setAttribute("placeholder",e)}get typeaheadPlaceholder(){var e;return((e=P(this,"typeaheadPlaceholder"))==null?void 0:e.textContent)||""}set typeaheadPlaceholder(e){const t=P(this,"typeaheadPlaceholder");t.textContent=e}get value(){var e;return((e=this.input)==null?void 0:e.value)||""}set value(e){this.input.value=e,this.typeahead=e,this.resetPlaceholder(),this.onInput()}get overlay(){return this.overlayInput.value}set overlay(e){this.overlayInput.value=e}set mirror(e){const t=P(this,"mirror");t.textContent=e}get typeaheadText(){return P(this,"typeaheadText").textContent||""}set typeaheadText(e){const t=P(this,"typeaheadText");t.textContent=e}get typeahead(){return this.typeaheadValue}set typeahead(e){if(this.typeaheadValue=this.overlay+e,this.mirror=this.value,e==="")this.typeaheadText="";else if(this.placeholder="",this.typeaheadPlaceholder="",this.valueStartsWithTypeahead){const t=this.value.length-(this.overlay?1:0);this.typeaheadText=e.substring(t)}else this.typeaheadText=` \u2013 ${e}`}showModePlaceholder(e=""){this.typeaheadPlaceholder=e}get valueStartsWithTypeahead(){return this.typeaheadValue.toLowerCase().startsWith(this.value.toLowerCase())}get isCursorAtEnd(){return this.value.length===this.input.selectionStart}set loading(e){this.spinner.hidden=!e,this.searchIcon.hidden=e}resetScopeIfNeeded(){!this.multiPageEnabled&&this.value===""&&this.scope.id!==this.defaultScope.id&&(this.scope=this.defaultScope)}resetPlaceholder(){this.value.replace(this.overlay,"")&&this.overlay&&(this.typeaheadPlaceholder=""),this.placeholder=this.getAttribute("placeholder")||""}onInput(){this.resetPlaceholder(),this.clearButton.hidden=!this.hasSomethingToClear(),!!this.connected&&this._dispatchEvent("command-palette-input")}onClear(){this.value="",this.input.focus(),this._dispatchEvent("command-palette-cleared")}onKeydown(e){if(this.isSelectKeystroke(e.key)&&(this._dispatchEvent("command-palette-select"),e.stopImmediatePropagation(),e.preventDefault()),this.hasSomethingToClear()&&he(e)&&e.key==="Backspace"){this.onClear();return}if(this.input.selectionStart===0&&this.input.selectionEnd===0&&(this.hasScope()||this.multiPageEnabled)&&e.key==="Backspace"){this._dispatchEvent("command-palette-descope"),e.stopImmediatePropagation(),e.preventDefault();return}}hasSomethingToClear(){return this.scopeElement.hasScope()||this.value.length>0}isSelectKeystroke(e){return e==="Tab"||e==="ArrowRight"&&this.isCursorAtEnd}textSelected(){return this.input.selectionStart!==this.input.selectionEnd}_dispatchEvent(e){const t=new CustomEvent(e,{cancelable:!0,detail:{typeahead:this.typeahead,value:this.value}});return this.dispatchEvent(t)}};Yt(j,"CommandPaletteInputElement"),j.tagName="command-palette-input",et([c],j.prototype,"multiPageEnabled",2),j=et([v],j);var Zt=Object.defineProperty,h=(e,t)=>Zt(e,"name",{value:t,configurable:!0});window.customElements.get(E.tagName)||window.customElements.define(E.tagName,E);const es=F(()=>{const e=W();!e||e.clearCommands(!1)},1500);function tt(){const e=W();if(!e)return;const t=e.closest(".js-command-palette-dialog");!t||(t.addEventListener("toggle",()=>{t.open?e.activate():e.deactivate()}),document.addEventListener("keydown",st),pe(".js-socket-channel.js-updatable-content",{subscribe:s=>fe(s,"socket:message",es)}))}h(tt,"observeCommandPalette");function W(){return document.querySelector(E.tagName)}h(W,"findCommandPalette");function st(e){if(!e.code)return;const t=W();if(!t)return;const s=nt(),r=H(t.platformCommandModeHotkey,e),o=!rt(e)&&!s&&(H(t.platformActivationHotkey,e)||r),i=!s&&(H(t.platformSecondardActivationHotkey,e)||r),n=t.hasAttribute("data-memex-hotkey-enabled")&&s&&H(t.platformMemexActivationHotkey,e);(o||i||n)&&(at(r),e.preventDefault(),e.stopPropagation())}h(st,"handleKeyDown");function H(e,t){let s=me(t);return s=s.replace("\u02DA","k"),e.split(",").some(r=>s===r)}h(H,"hotkeyMatchesEvent");function rt(e){return ot(e)||it(e)}h(rt,"shouldIgnoreActivation");function ot(e){const t=e.target;return t?t.closest(".js-previewable-comment-form")!==null:!1}h(ot,"triggeredInsideAPreviewableCommentForm");function it(e){const t=e.target;if(!t)return!1;const s=t.closest(".js-code-editor");if(!s)return!1;const r=ye(s);if(!r)return!1;const o=r.editor;if(!o)return!1;const i=o.getMode().name;return i==="gfm"||i==="markdown"}h(it,"triggeredInsideAMarkdownCodeEditor");function nt(){return!!document.querySelector("#memex-root")}h(nt,"triggeredInsideMemex");function at(e){for(const t of document.querySelectorAll(".js-command-palette-dialog")){const s=t.querySelector(j.tagName);if(!s)return;if(t.open)t.open=!1;else{ct(s,e);const r=t.querySelector(E.tagName);r&&(r.previouslyActiveElement=document.activeElement),t.open=!0}}}h(at,"toggleCommandPalette");function ct(e,t){const s=e.value.startsWith(">");return t&&!s?(e.value=`>${e.value}`,!0):!t&&s?(e.value=e.value.substring(1),!0):!1}h(ct,"toggleCommandMode"),tt()}}});
//# sourceMappingURL=command-palette-80fb3fb0.js.map
