# hero_selection.py
def get_best_hero(hero_list, types_in_game):
    # Placeholder logic for selecting the best hero
    best_hero = max(hero_list, key=lambda hero: hero["tier"])
    return best_hero

# Example usage:
hero_list = [
    {"name": "Hero1", "tier": 1},
    {"name": "Hero2", "tier": 2},
    {"name": "Hero3", "tier": 3}
]
print(get_best_hero(hero_list, ["type1", "type2"]))
