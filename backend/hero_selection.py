import os
import pandas as pd

def get_best_hero(hero_list, hero_options, types_in_game):
    # Placeholder logic for selecting the best hero
    
    best_hero = max(hero_list, key=lambda hero: hero["tier"])
    return best_hero

def hero_parser():
    data = pd.read_csv('data/hero_tierlist.csv', dtype=str)
    hero_dict = data.set_index('hero_name')['tier'].to_dict() 
    return hero_dict   


#test case
hero_1, hero_2, hero_3, hero_4 = input()
hero_list = hero_parser()
print(get_best_hero(hero_list, [hero_1, hero_2, hero_3, hero_4], ["type1", "type2"]))
