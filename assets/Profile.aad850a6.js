import{n as i,u as a}from"./index.da889d62.js";import{U as o}from"./UsersServices.58ebc978.js";const r={data(){return{usuario:{}}},methods:{signOut(){a().logout()},async getUserData(){try{const s=await o.getMyUser();this.usuario=s}catch(s){console.error("Error al obtener el usuario:",s)}}},mounted(){this.getUserData()}};var l=function(){var e=this,t=e._self._c;return t("v-container",{staticClass:"py-12"},[t("v-card",{staticClass:"mx-auto",attrs:{elevation:"5","max-width":"800"}},[t("v-card-title",{staticClass:"d-flex justify-space-between align-center"},[t("h2",{staticClass:"mb-0"},[e._v("Mi perfil")])]),t("v-divider"),t("v-card-text",[t("v-row",{attrs:{dense:""}},[t("v-col",{attrs:{cols:"12",md:"6"}},[t("v-list-item",[t("v-list-item-content",[t("v-list-item-title",{staticClass:"font-weight-bold"},[e._v("Nombre completo:")]),t("v-list-item-subtitle",[e._v(e._s(e.usuario.name))])],1)],1)],1),t("v-col",{attrs:{cols:"12",md:"6"}},[t("v-list-item",[t("v-list-item-content",[t("v-list-item-title",{staticClass:"font-weight-bold"},[e._v("Correo electr\xF3nico:")]),t("v-list-item-subtitle",[e._v(e._s(e.usuario.email))])],1)],1)],1),t("v-col",{attrs:{cols:"12",md:"6"}},[t("v-list-item",[t("v-list-item-content",[t("v-list-item-title",{staticClass:"font-weight-bold"},[e._v("Rol:")]),t("v-list-item-subtitle",[e._v(e._s(e.usuario.role))])],1)],1)],1)],1)],1),t("v-divider",{staticClass:"my-4"}),t("v-card-subtitle",{staticClass:"text-center"},[t("small",[e._v(" Tus datos en "),t("strong",[e._v("warehouse")]),e._v(" son completamente privados y seguros. Respetamos tu privacidad en todo momento. ")])])],1)],1)},n=[],c=i(r,l,n,!1,null,"d775f675",null,null);const u=c.exports;export{u as default};
