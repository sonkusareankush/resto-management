"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[535],{535:(T,h,m)=>{m.r(h),m.d(h,{Tab2PageModule:()=>S});var i=m(4742),d=m(177),l=m(4341),g=m(70),c=m(467),b=m(5312),v=m(156),e=m(3953),p=m(8472),I=m(6661);function _(o,a){if(1&o){const r=e.RV6();e.j41(0,"ion-item",8)(1,"ion-label",9),e.EFF(2,"Item Name"),e.k0s(),e.nrm(3,"ion-input",10),e.j41(4,"ion-label",9),e.EFF(5,"Item Price"),e.k0s(),e.nrm(6,"ion-input",11),e.j41(7,"ion-label",9),e.EFF(8,"Item Section"),e.k0s(),e.nrm(9,"ion-input",12),e.j41(10,"ion-button",13),e.bIt("click",function(){const n=e.eBV(r).index,s=e.XpG();return e.Njj(s.removeItem(n))}),e.EFF(11,"Remove"),e.k0s()()}2&o&&e.Y8G("formGroupName",a.index)}let C=(()=>{var o;class a{constructor(t,n,s,u,f){this.modalCtrl=t,this.alertCtrl=n,this.fb=s,this.authService=u,this.loaderService=f}ngOnInit(){var t=this;return(0,c.A)(function*(){t.itemsForm=t.fb.group({items:t.fb.array([t.createItem()])}),t.user=yield t.authService.user,console.log(t.user)})()}get items(){return this.itemsForm.get("items")}createItem(){return this.fb.group({item_name:["",l.k0.required],item_price:[0,[l.k0.required,l.k0.min(1)]],item_section:["",l.k0.required]})}addItem(){this.items.push(this.createItem())}removeItem(t){this.items.removeAt(t)}submitForm(){var t=this;return(0,c.A)(function*(){if(t.itemsForm.invalid)return void(yield t.showAlert("Error","Please fill out all required fields correctly."));t.loaderService.showLoader(),console.log(t.itemsForm.value.items);const n=yield t.user.functions.addItemsData(t.itemsForm.value.items);n.success?(t.loaderService.stopLoader(!0),yield t.showAlert("Success","Items added successfully."),t.modalCtrl.dismiss(n,"confirm"),t.itemsForm.reset(),t.items.clear(),t.addItem()):(t.loaderService.stopLoader(!0),yield t.showAlert("Error",n.error))})()}showAlert(t,n){var s=this;return(0,c.A)(function*(){yield(yield s.alertCtrl.create({header:t,message:n,buttons:["OK"]})).present()})()}cancel(){return this.modalCtrl.dismiss(null,"cancel")}}return(o=a).\u0275fac=function(t){return new(t||o)(e.rXU(i.W3),e.rXU(i.hG),e.rXU(l.ok),e.rXU(p.u),e.rXU(I.f))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-add-items"]],decls:15,vars:2,consts:[["slot","end"],["color","medium",3,"click"],[2,"text-align","center"],[3,"ngSubmit","formGroup"],["formArrayName","items"],[3,"formGroupName",4,"ngFor","ngForOf"],["expand","full",3,"click"],["expand","full","type","submit"],[3,"formGroupName"],["position","floating"],["formControlName","item_name"],["type","number","formControlName","item_price"],["formControlName","item_section"],["color","danger",3,"click"]],template:function(t,n){1&t&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-button",1),e.bIt("click",function(){return n.cancel()}),e.EFF(4,"Cancel"),e.k0s()(),e.j41(5,"ion-title",2),e.EFF(6,"Add Items"),e.k0s()()(),e.j41(7,"ion-content")(8,"form",3),e.bIt("ngSubmit",function(){return n.submitForm()}),e.j41(9,"ion-list",4),e.DNE(10,_,12,1,"ion-item",5),e.k0s(),e.j41(11,"ion-button",6),e.bIt("click",function(){return n.addItem()}),e.EFF(12,"Add Another Item"),e.k0s(),e.j41(13,"ion-button",7),e.EFF(14,"Submit"),e.k0s()()()),2&t&&(e.R7$(8),e.Y8G("formGroup",n.itemsForm),e.R7$(2),e.Y8G("ngForOf",n.items.controls))},dependencies:[i.Jm,i.QW,i.W9,i.eU,i.$w,i.uz,i.he,i.nf,i.BC,i.ai,i.su,i.Gw,d.Sq,l.qT,l.BC,l.cb,l.j4,l.JD,l.$R,l.v8]}),a})();function y(o,a){if(1&o){const r=e.RV6();e.j41(0,"ion-item")(1,"ion-label")(2,"h2"),e.EFF(3),e.k0s(),e.j41(4,"p"),e.EFF(5),e.k0s(),e.j41(6,"p"),e.EFF(7),e.k0s()(),e.j41(8,"ion-button",8),e.bIt("click",function(){const n=e.eBV(r).$implicit,s=e.XpG();return e.Njj(s.confirmDelete(n._id))}),e.EFF(9," Delete "),e.k0s()()}if(2&o){const r=a.$implicit;e.R7$(3),e.JRh(r.item_name),e.R7$(2),e.SpI("Price: ",r.item_price,""),e.R7$(2),e.SpI("Section: ",r.item_section,"")}}let F=(()=>{var o;class a{constructor(t,n,s,u){this.authService=t,this.alertCtrl=n,this.modalCtrl=s,this.loaderService=u,this.itemList=[],this.app=new v.qw({id:b.c.APP_ID})}ngOnInit(){var t=this;return(0,c.A)(function*(){console.log("oninnit manageItems"),t.getItems()})()}getItems(){var t=this;return(0,c.A)(function*(){if(t.loaderService.showLoader(),t.user=yield t.authService.user,t.user){console.assert(t.user.id===t.app.currentUser.id);const n=yield t.user.functions.getItemsData();t.itemList=n.result}t.loaderService.stopLoader()})()}confirmDelete(t){var n=this;return(0,c.A)(function*(){yield(yield n.alertCtrl.create({header:"Confirm Delete",message:"Are you sure you want to delete this item?",buttons:[{text:"Cancel",role:"cancel"},{text:"Delete",handler:()=>{n.deleteItem(t)}}]})).present()})()}deleteItem(t){var n=this;return(0,c.A)(function*(){n.loaderService.showLoader(),console.log(t.toString());const s={_id:t.toString()},u=yield n.user.functions.deleteItemsData(s);console.log(u),u.success?(n.loaderService.stopLoader(!0),n.itemList=n.itemList.filter(f=>f._id!==t),n.showAlert("Success","Item deleted successfully.")):(n.loaderService.stopLoader(!0),n.showAlert("Error",u.message))})()}showAlert(t,n){var s=this;return(0,c.A)(function*(){yield(yield s.alertCtrl.create({header:t,message:n,buttons:["OK"]})).present()})()}openModal(){var t=this;return(0,c.A)(function*(){const n=yield t.modalCtrl.create({component:C,initialBreakpoint:.5,breakpoints:[.25,.5,.75,1]});n.present(),"confirm"==(yield n.onWillDismiss()).role&&t.getItems()})()}}return(o=a).\u0275fac=function(t){return new(t||o)(e.rXU(p.u),e.rXU(i.hG),e.rXU(i.W3),e.rXU(I.f))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-manage-items"]],decls:9,vars:1,consts:[[1,"layout"],[4,"ngFor","ngForOf"],["vertical","bottom","horizontal","end","slot","fixed"],["color","primary",3,"click"],["name","add"],["vertical","bottom","horizontal","start","slot","fixed"],["color","secondary",3,"click"],["name","sync-outline"],["color","danger",3,"click"]],template:function(t,n){1&t&&(e.j41(0,"ion-content")(1,"ion-list",0),e.DNE(2,y,10,3,"ion-item",1),e.k0s()(),e.j41(3,"ion-fab",2)(4,"ion-fab-button",3),e.bIt("click",function(){return n.openModal()}),e.nrm(5,"ion-icon",4),e.k0s()(),e.j41(6,"ion-fab",5)(7,"ion-fab-button",6),e.bIt("click",function(){return n.getItems()}),e.nrm(8,"ion-icon",7),e.k0s()()),2&t&&(e.R7$(2),e.Y8G("ngForOf",n.itemList))},dependencies:[i.Jm,i.W9,i.Q8,i.YW,i.iq,i.uz,i.he,i.nf,d.Sq],styles:[".layout[_ngcontent-%COMP%]{position:relative;top:6%}"]}),a})();const k=[{path:"",component:(()=>{var o;class a{constructor(t,n,s){this.authService=t,this.alertCtrl=n,this.modalCtrl=s,this.itemList=[],this.app=new v.qw({id:b.c.APP_ID})}getItems(){return(0,c.A)(function*(){})()}}return(o=a).\u0275fac=function(t){return new(t||o)(e.rXU(p.u),e.rXU(i.hG),e.rXU(i.W3))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-tab2"]],decls:2,vars:0,template:function(t,n){1&t&&(e.j41(0,"ion-content"),e.nrm(1,"app-manage-items"),e.k0s())},dependencies:[i.W9,F],styles:[".layout[_ngcontent-%COMP%]{position:relative;top:6%}"]}),a})()}];let A=(()=>{var o;class a{}return(o=a).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[g.iI.forChild(k),g.iI]}),a})(),S=(()=>{var o;class a{}return(o=a).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[i.bv,d.MD,l.YN,A,l.X1]}),a})()}}]);