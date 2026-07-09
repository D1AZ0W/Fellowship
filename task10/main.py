import logging

from src import inventory_management as i

logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# --- CONFIGURATION ---
WEIGHTS = {
    "gold coin": 0.01,
    "rope": 2.0,
    "dagger": 3.0,
    "ruby": 0.5,
    "iron ore": 10.0,
}
MAX_WEIGHT = 50.0


def main():
    # Load Inventory
    print("\n--- Step 1: Loading Inventory ---")
    my_inventory = i.load_inventory("inventory.json")
    print(f"Loaded Inventory : {my_inventory}")

    # Process Loot
    print("\n--- Processing Incomming Loot ---")
    incomming_loot = [
        "gold coin",
        "   dagger   ",
        "GOLD COIN",
        "",
        None,
        "ruby",
        "iron ore",
        "iron ore",
        "iron ore",
        "iron ore",
    ]

    my_inventory = i.add_to_inventory(my_inventory, incomming_loot)

    print(f"Loaded Inventory : {my_inventory}")
    i.generate_report(my_inventory)

    # if items_dropped:
    #     logger.warning(f"Max weight reached! Left behind: {items_dropped}")

    # # Display Inventory
    # print("\n--- Visual Report ---")
    # display_inventory(my_inventory)

    # # Save Inventory to a file
    # print("---Exporting Data ---")
    # save_inventory(my_inventory, "inventory.json")


if __name__ == "__main__":
    main()
