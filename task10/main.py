import logging

from src import inventory_management as i

logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)


def main():
    # Load Inventory
    print("\n--- Step 1: Loading Inventory ---")
    my_inventory = i.load_inventory("inventory.json")

    if my_inventory is None:
        logger.error("Failed to load inventory.")
        return

    print(f"Loaded Inventory: {my_inventory}")

    # Process Loot
    print("\n--- Processing Incoming Loot ---")
    incoming_loot = [
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
        "enchanting rock",
    ]

    my_inventory, items_dropped = i.add_to_inventory(
        my_inventory, incoming_loot
    )

    if items_dropped:
        logger.warning(f"Max weight reached! Left behind: {items_dropped}")

    # Display Inventory
    print("\n--- Visual Report ---")
    i.display_inventory(my_inventory)

    # Save Inventory
    print("--- Exporting Data ---")
    i.save_inventory(my_inventory, "inventory.json")


if __name__ == "__main__":
    main()
