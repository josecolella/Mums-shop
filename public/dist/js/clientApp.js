"use strict";function updateTotal(){menu=[];var e=0,t=function(e){var t=0,o=parseFloat(e.quantity),n=parseFloat(e.price);return t=(o-o/3)*n};for(var o in orders){var n=orders[o],r=parseFloat(n.price),a=n.productType,s=n.quantity;if(0==productTypes.has(a)&&(productTypes.add(a),menu.push(parseFloat(r)),3==productTypes.size)){var i=menu.reduce(function(e,t){return e+t});e=i-.2*i,menu=[],productTypes.clear()}s%3==0?e+=t(n):menu.length<3&&(e+=r*s)}$("#total").text(e)}var token=void 0,orders={},menu=void 0,productTypes=new Set,footerArray=[{item:'<div style="flex:1 1 auto;padding:6px 0 0 0;cursor:pointer;" class="text-xs-left lead">Total: <b id="total">0</b>&euro;</div>',event:"click",callback:function(e){e.data.content.append("<p>The click happened at ("+e.pageX+", "+e.pageY+")</>")}},{item:"<button></button>",event:"click",btnclass:"btn btn-primary",btntext:"Order",id:"processOrder",callback:function(e){$.ajax({url:"/processOrder",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({order:Object.values(orders),total:parseFloat($("#total").text())}),success:function(e){1==e.success&&($.notify({message:"Your order has been placed. Order Number: "+e.token,target:"_blank"},{element:"body",position:null,type:"info",allow_dismiss:!0,newest_on_top:!1,showProgressbar:!1,placement:{from:"bottom",align:"right"},offset:20,spacing:10,z_index:1031,delay:3e3,timer:2e3,mouse_over:null,animate:{enter:"animated fadeInDown",exit:"animated fadeOutUp"}}),orders={},menu=[]),console.log(e)}}).done(function(){console.log("success")}).fail(function(){console.log("error")})}}],myPanel=$.jsPanel({position:{my:"right-bottom",at:"right-bottom",offsetY:0},headerTitle:"Your order",theme:"bootstrap-primary",footerToolbar:footerArray,contentSize:{width:300,height:200},content:"<ul class='list-unstyled'></ul>",callback:function(){this.content.css("padding","15px")}});$(".col-lg-4 > button").click(function(e){var t=$(this).attr("data-property");$.ajax({url:"/add",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({productName:t}),success:function(e){if(e){orders.hasOwnProperty(e._id)&&orders[e._id].hasOwnProperty("quantity")?orders[e._id].quantity+=1:(orders[e._id]=e,orders[e._id].quantity=1),updateTotal();var t='<li class="lead" id="'+e._id+'">'+orders[e._id].quantity+" "+orders[e._id].name+"</li>";$("#"+e._id).length>0?$("#"+e._id,myPanel.content).replaceWith(t):$("ul",myPanel.content).append(t)}}}).done(function(){console.log("success")}).fail(function(){console.log("error")})});