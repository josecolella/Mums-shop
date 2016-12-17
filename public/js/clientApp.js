//(function($) {
'use strict';
var token = undefined;
var orders = {};
var menu = undefined;
var productTypes = new Set();

function updateTotal() {
    menu = [];

    var total = 0;
    /**
     * Returns a discounted price when product quantity is divisible by three
     * @param  {Object} The product to be processed
     * @return {Float} The discounted price
     */
    var threeForTwoSpecial = function(product) {
        var discountPrice = 0,
            quantity = parseFloat(product.quantity),
            price = parseFloat(product.price);
        discountPrice = (quantity - (quantity / 3)) * price;
        return discountPrice;
    }
    for (var orderId in orders) {
        var product = orders[orderId],
            price = parseFloat(product.price),
            productType = product.productType,
            quantity = product.quantity;

        if (productTypes.has(productType) == false) {
            productTypes.add(productType);
            menu.push(parseFloat(price));
            if (productTypes.size == 3) {
                var totalPrice = menu.reduce(function(x, y) {
                    return x + y;
                });
                total = totalPrice - ((totalPrice) * 0.20);
                //Clear out menu array
                menu = [];
                productTypes.clear();
            }
        }
        //Three for two discount
        if (quantity % 3 == 0) {
            total += threeForTwoSpecial(product);
        } else if (menu.length < 3) {
            total += price * quantity;
        }
    }


    $("#total").text(total);

}

var footerArray = [{
    item: '<div style="flex:1 1 auto;padding:6px 0 0 0;cursor:pointer;" class="text-xs-left lead">Total: <b id="total">0</b>&euro;</div>',
    event: "click",
    callback: function(event) {
        event.data.content.append("<p>The click happened at (" + event.pageX + ", " + event.pageY + ")</>");
    }
}, {
    item: '<button></button>',
    event: "click",
    btnclass: "btn btn-primary",
    btntext: "Order",
    id: 'processOrder',
    callback: function(event) {
        $.ajax({
                url: '/processOrder',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    order: Object.values(orders),
                    total: parseFloat($("#total").text())
                }),
                success: function(data) {
                    if (data.success == 1) {
                        $.notify({
                            // options
                            message: 'Your order has been placed. Order Number: ' + data.token,
                            target: '_blank'
                        }, {
                            // settings
                            element: 'body',
                            position: null,
                            type: "info",
                            allow_dismiss: true,
                            newest_on_top: false,
                            showProgressbar: false,
                            placement: {
                                from: "bottom",
                                align: "right"
                            },
                            offset: 20,
                            spacing: 10,
                            z_index: 1031,
                            delay: 3000,
                            timer: 2000,
                            mouse_over: null,
                            animate: {
                                enter: 'animated fadeInDown',
                                exit: 'animated fadeOutUp'
                            }
                        });
                        orders = {};
                        menu = [];
                    }
                    console.log(data);
                }
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
    }
}];

var myPanel = $.jsPanel({
    position: {
        my: "right-bottom",
        at: "right-bottom",
        offsetY: 0
    },
    headerTitle: "Your order",
    theme: "bootstrap-primary",
    /* or "bootstrap-default filled" or "bootstrap-default filledlight" */
    footerToolbar: footerArray,
    contentSize: {
        width: 300,
        height: 200
    },
    content: "<ul class='list-unstyled'></ul>",
    callback: function() {
        this.content.css("padding", "15px");
    }
});


$(".col-lg-4 > button").click(function(event) {
    var productId = $(this).attr('data-property');
    $.ajax({
            url: '/add',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                productName: productId
            }),
            success: function(data) {
                if (data) {
                    if (orders.hasOwnProperty(data._id) && orders[data._id].hasOwnProperty("quantity")) {
                        orders[data._id].quantity += 1;
                    } else {
                        orders[data._id] = data;
                        orders[data._id].quantity = 1;
                    }
                    updateTotal();
                    var listItem = '<li class="lead" id="' + data._id + '">' + orders[data._id].quantity + ' ' + orders[data._id].name + '</li>';
                    if ($("#" + data._id + "").length > 0) { //Element exists
                        $("#" + data._id + "", myPanel.content).replaceWith(listItem);
                    } else {
                        $('ul', myPanel.content).append(listItem);

                    }
                }
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
});


// Backbone code in here
//})(jQuery);
