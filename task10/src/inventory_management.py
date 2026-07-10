import functools
import json
from typing import TypeAlias

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


Inventory: TypeAlias = dict[str, int]


def load_inventory(fileName: str) -> Inventory | None:
    try:
        with open(f"src/{fileName}") as f:
            inventory: Inventory = json.loads(f.read())
            return inventory
    except json.decoder.JSONDecodeError:
        print("Error: Inventory decode error")
        return None
    except FileNotFoundError:
        print("Error: Couldnt find file")
        return None


def add_to_inventory(
    inventory: Inventory, new_items: list[str] | dict[str, int]
) -> tuple[Inventory, list[str]]:
    try:
        if not (isinstance(new_items, list) or isinstance(new_items, dict)):
            raise ValueError
        items_dropped: list[str] = []
        for item in new_items:
            if item == "" or isinstance(item, (int, float)) or item is None:
                continue

            current = item.lower().strip()
            new_weight = calc_current_weight(inventory) + weight_calc(current)
            if new_weight >= MAX_WEIGHT:
                items_dropped.append(current)
                continue

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
        return inventory, []


def border(func):
    @functools.wraps(func)
    def wrapper(*args):
        print("\n-------------------------------------------------------")
        result = func(*args)
        return result

    return wrapper


@border
def display_inventory(inventory: Inventory) -> None:
    c = 0
    for item in inventory:
        print(f"| {item:<10} x{inventory[item]:>3} ", end="")
        c += 1
        if c == 3:
            print("|")
    print("\n-------------------------------------------------------")
    print(
        f"Total Inventory Weight = {calc_current_weight(inventory)} / {MAX_WEIGHT} \n"
    )


def save_inventory(inventory: Inventory, fileName: str) -> None:
    try:
        with open(f"src/{fileName}", "w") as f:
            f.write(json.dumps(inventory))
        print("Saved to inventory")
    except FileNotFoundError:
        print("Failed to save to inventory")


def weight_calc(item: str) -> float:
    try:
        if not isinstance(item, str):
            raise ValueError
        return float(WEIGHTS.get(item, 1))

    except ValueError:
        print("Item should be string")
        return 1


def calc_current_weight(inventory: Inventory) -> float:
    total_weight = 0.0
    for item, quantity in inventory.items():
        total_weight += weight_calc(item) * quantity
    return total_weight
