import json

path_inventory = "src/inventory.json"


def load_inventory(fileName):
    try:
        with open(path_inventory) as f:
            inventory = json.loads(f.read())
            return inventory
    except json.decoder.JSONDecodeError:
        print("Error: Inventory decode error")
        return {}
    except FileNotFoundError:
        print("Error: Couldnt find file")
        return {}
