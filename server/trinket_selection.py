# trinket_selection.py
from bs4 import BeautifulSoup
import pandas as pd
import requests
import os 
import csv 

def get_best_trinket(trinket_list, trinket_options,  types_in_game):

    # Define the tier ranking
    tier_ranking = {
        'S': 5,
        'A': 4,
        'B': 3,
        'C': 2,
        'D': 1,
        'F': 0
    }
    best_trinket = '' 
    highTier = 0
    best_trinkets = []
    for trinket in trinket_options:
        tmpTier =  tier_ranking[trinket_list[trinket]] 
        if tmpTier == highTier:
            best_heroes.append(trinket)
        if tmpTier > highTier:
            highTier = tmpTier
            best_heroes = [trinket]
        
    best_trinket = '/'.join(best_heroes)
    return best_trinket

def trinket_parser():
    data = pd.read_csv('data/trinket_tierlist.csv', dtype=str)
    trinket_dict = data.set_index('Name')['Tier'].to_dict() 
    return trinket_dict


# updates trinket_tierlist.csv with new info from hsbgguide/tierlist
def update_trinket_list():
    comps_url = "https://hsbgguide.com/trinket-tier-list/"
    response = requests.get(comps_url)
    file_name = 'data/trinket_tierlist.csv'

    # Check if the CSV file exists
    file_exists = os.path.isfile(file_name)

    # open/creates the csv file that will store the data on the comps for now
    try:
        file = open(file_name, mode='w', newline='\n')
        writer = csv.writer(file)
    except FileNotFoundError:
        print(f"Error: The file '{file_name}' could not be found.")
    except PermissionError:
        print(f"Error: Permission denied while trying to access '{file_name}'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        html_content = response.text
    else:
        print(f"Failed to retrieve the webpage: {response.status_code}")

    soup = BeautifulSoup(html_content, 'html.parser')
    
    trinket_list = soup.find_all('tr')
    for trinket in trinket_list:
        
        current_element = trinket.find_next()
        elements = [current_element.text]
        # Loop to find the next 4 siblings
        for _ in range(4):
            current_element = current_element.find_next_sibling()
            elements.append(current_element.text)
        writer.writerow(elements)
    file.close()
        
    
trinket_parser()