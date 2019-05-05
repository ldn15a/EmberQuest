var Items = function () {
    var items = {};
    items.private = {};
    items.private.map;

    items.pickup = function (itemName) {
        var item = items.private.map.get (itemName);
        
        if (items.private.map.has (itemName)){
            item.setQuantity (item.getQuantity () + 1);
        }
        else {
            items.private.set (itemName, Item (itemName, 1));
        }

        item.updateGraphic ();
    }

    items.drop = function (itemName) {
        if (items.private.map.has (itemName)) {

            var item = items.private.map.get (itemName);

            if (item.canDrop ()) {
                item.setQuantity (item.getQuantity () - 1);
            }
            else {
                if (item.getQuantity () == 0) {
                    console.error ("You tried dropping an item that the player had none of. Error Code 1");
                }
                else {
                    console.error ("You tried dropping an item that the player had a negative quantity of. Error Code 3");
                }
            }

            item.updateGraphic ();
        }
        else {
            console.error ("You tried to drop an item that the player never had. Error Code 2");
        }
    }

    items.private.initialize = function () {
        items.private.map = new Map();
    }

    return items;
}