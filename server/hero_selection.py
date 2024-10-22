import os
import pandas as pd

def get_best_hero(hero_list, hero_options):
    
   
    # Define the tier ranking
    tier_ranking = {
        'S': 5,
        'A': 4,
        'B': 3,
        'C': 2,
        'D': 1,
        'F': 0
    }
    best_hero = '' 
    highTier = 0
    best_heroes = []
    for hero in hero_options:
        tmpTier =  tier_ranking[hero_list[hero]] 
        if tmpTier == highTier:
            best_heroes.append(hero)
        if tmpTier > highTier:
            highTier = tmpTier
            best_heroes = [hero]
        
    best_hero = '/'.join(best_heroes)
    return best_hero

def hero_parser():
    data = pd.read_csv('data/hero_tierlist.csv', dtype=str)
    hero_dict = data.set_index('hero_name')['tier'].to_dict() 
    return hero_dict   


