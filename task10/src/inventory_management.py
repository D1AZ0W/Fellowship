import functools
import json

path_inventory = "src/inventory.json"


# --- CONFIGURATION ---
WEIGHTS = {
    "gold coin": 0.01,
    "rope": 2.0,
    "dagger": 3.0,
    "ruby": 0.5,
    "iron ore": 10.0,
}
MAX_WEIGHT = 50.0


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
        items_dropped = []
        for item in new_items:
            if item == "" or isinstance(item, int or float) or item is None:
                continue
            if calc_current_weight(inventory) >= 50.0:
                items_dropped.append(item)

            current = item.lower().strip()
            current_quantity = inventory.get(current)
            if current_quantity is not None:
                quantity = current_quantity + 1
            else:
                quantity = 1
            print(f"added {current} to inventory. Total in bag {quantity}")
            inventory[current] = quantity
        return inventory, items_dropped
    except ValueError:
        print("Error: loot items should be in list or dictionary")
        return inventory


def border(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("\n----------------------------------------------------------")
        result = func(*args, **kwargs)
        print("\n----------------------------------------------------------")
        return result

    return wrapper


@border
def display_inventory(inventory):
    c = 0
    for item in inventory:
        print(f"| {item:<10} x{inventory[item]:>3} |", end="")
        c += 1
        if c == 3:
            print()


def save_inventory(inventory, fileName):
    try:
        with open(path_inventory, "w") as f:
            f.write(json.dumps(inventory))
        print("Saved to inventory")
    except FileNotFoundError:
        print("Failed to save to inventory")


def weight_calc(item):
    try:
        if not isinstance(item, str):
            raise ValueError
        return float(WEIGHTS.get(item, 1))

    except ValueError:
        print("Item should be string")
        return 1


def calc_current_weight(inventory):
    total_weight = 0.0
    for item in inventory:
        total_weight += weight_calc(item)
    return total_weight
