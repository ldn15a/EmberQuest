var Inventory = function () {
    var inventory = {};
    inventory.private = {};
    inventory.private.map;

    inventory.pickup = function (itemName) {
        var item = inventory.private.map.get (itemName);
        
        if (inventory.private.map.has (itemName)){
            item.setQuantity (item.getQuantity () + 1);
        }
        else {
            inventory.private.set (itemName, Item (itemName, 1));
        }

        item.updateGraphic ();
    }

    inventory.drop = function (itemName) {
        if (inventory.private.map.has (itemName)) {

            var item = inventory.private.map.get (itemName);

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

    inventory.private.initialize = function () {
        inventory.private.map = new Map();
    }

    return inventory;
}