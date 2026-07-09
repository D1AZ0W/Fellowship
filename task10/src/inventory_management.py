import functools
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


def add_to_inventory(inventory, new_items):
    try:
        if not (isinstance(new_items, list) or isinstance(new_items, list)):
            raise ValueError
        for item in new_items:
            if item == "" or isinstance(item, int or float) or item is None:
                continue
            current = item.lower().strip()
            current_quantity = inventory.get(current)
            if current_quantity is not None:
                quantity = current_quantity + 1
            else:
                quantity = 1
            inventory[current] = quantity

        return inventory
    except ValueError:
        print("Error: loot items should be in list or dictionary")
        return inventory


def border(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("\n--------------------------")
        result = func(*args, **kwargs)
        print("\n--------------------------")
        return result

    return wrapper


@border
def generate_report(inventory):
    c = 0
    for item in inventory:
        print(f"| {item} x{inventory[item]} |", end="")
        c += 1
        if c == 3:
            print()


def save_inventory(inventory, fileName):
    try:
        with open(path_inventory, "w") as f:
            f.write(json.dumps(inventory))
    except FileNotFoundError:
        print("error")
