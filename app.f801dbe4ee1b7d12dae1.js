(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{33:function(e,t,n){"use strict";n.r(t),n(14);var i=n(0),o=n.n(i),a=n(10),r=n.n(a),s=n(6),l=n(2),p=l["b"].div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${1e8};
`;const c=l["c"]`
  from {
    opacity: 0;
  }
  to {}
`,u=Object(l["b"])(p)`
  background-color: white;
  opacity: 0.75;
  ${e=>e.animate&&`\n    animation: ${c} 0.25s ease-out;\n  `}
`,m=Object(l["b"])(p)`
  display: flex;
  justify-content: center;
  align-items: center;
`;const d=l["b"].div`
  font-size: 5vw;
  color: #808080;
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`;const h=n.e("main").then(n.bind(null,561)),g=l["b"].div`
  font-family: Tahoma, Arial, sans-serif;

  & * {
    box-sizing: border-box;
  }
`;r.a.render(o.a.createElement(class extends i.PureComponent{constructor(){super(...arguments),this.state={initial:!0,waiting:!0,error:null},this.onError=(e=>{const{message:t}=e;this.setState({initial:!1,waiting:!1,error:t.startsWith("Cannot find module")?"Could not load site":t})}),this.setPopup=(e=>{!1===e.waiting&&(e.initial=!1),this.setState(e)}),this.getWrappedPopup=(e=>o.a.createElement(class extends i.PureComponent{render(){const{noAnimation:e,children:t}=this.props;return o.a.createElement(class extends i.PureComponent{render(){const{noAnimation:e,children:t}=this.props;return o.a.createElement("div",null,o.a.createElement(u,{animate:!e}),o.a.createElement(m,null,t))}},{noAnimation:e},o.a.createElement(d,null,t))}},Object.assign({},e,{noAnimation:this.state.initial})))}getPopup(){const{error:e,waiting:t}=this.state,n=this.getWrappedPopup;return navigator.onLine?e?o.a.createElement(n,null,e):t?o.a.createElement(n,null,"wait..."):null:o.a.createElement(n,null,"you're offline")}render(){return o.a.createElement(g,null,o.a.createElement(s.a,{component:h,onError:this.onError,initial:this.state.initial,setPopup:this.setPopup,getPopup:this.getPopup,onLoadError:this.onError}),this.getPopup())}},null),document.getElementById("app"))}},[[33,"runtime~app","react","vendor"]]]);