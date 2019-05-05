//  This class is to wrap a single item quantity to a graphic and update both at the same time. 

var Item = function (itemName, quantity) {
    var item = {};
    item.private =  {};

    item.private.graphic;
    item.private.quantity;

    item.name;
    
    item.getQuantity = function () {
        if (item.private.quantity < 0) {
            console.error ("Quantity of item is negative, which should never happen. Error Code 4");
        }

        return item.private.quantity;
    }

    item.setQuantity = function (newQuantity) {
        item.private.quantity = newQuantity;
    }

    item.canDrop = function () {
        return item.private.quantity >= 1;
    }

    item.updateGraphic = function () {
        //  Program this after graphic is working
        //  It should just be draw image, then draw text of quantity on top of image
    }

    item.private.initialize = function () {
        item.private.quantity = quantity;
        
        item.name = itemName;

        //  Get Troy's help with this
        //item.private.graphic = 
    }();

    return item;
}