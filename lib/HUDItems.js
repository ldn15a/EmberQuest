var HUDItem = function (itemName, quantity) {
    var HUDitem = {};
    HUDitem.private =  {};

    HUDitem.private.graphic;
    HUDitem.private.quantity;

    HUDitem.name;
    
    HUDitem.getQuantity = function () {
        if (HUDitem.private.quantity < 0) {
            console.error ("Quantity of HUDitem is negative, which should never happen. Error Code 4");
        }

        return HUDitem.private.quantity;
    }

    HUDitem.setQuantity = function (newQuantity) {
        HUDitem.private.quantity = newQuantity;
    }

    HUDitem.canDrop = function () {
        return HUDitem.private.quantity >= 1;
    }

    HUDitem.updateGraphic = function () {
        //  Program this after graphic is working
        //  It should just be draw image, then draw text of quantity on top of image
    }

    HUDitem.private.initialize = function () {
        HUDitem.private.quantity = quantity;
        
        HUDitem.name = itemName;

        //  Get Troy's help with this
        //HUDitem.private.graphic = 
    }();

    return HUDitem;
}