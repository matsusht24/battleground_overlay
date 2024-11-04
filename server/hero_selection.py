import os
import pandas as pd
from bs4 import BeautifulSoup
import requests

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

#def hero_image_parser():
    url = "https://hearthstone.blizzard.com/en-us/battlegrounds?bgCardType=hero"
    response = requests.get(url)
    img_folder_path = '../client/hsbg_helper/public/'

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        html_content = response.text
    else:
        print(f"Failed to retrieve the webpage: {response.status_code}")

    soup = BeautifulSoup(html_content, 'html.parser')   

        
    if not os.path.exists('images'):
        os.makedirs('images')
    
    img_tags = soup.find('img')
    # Cant find it because the hs page is a dynamic page
    for img in img_tags:
        img_url = img.get('src')  # Extract the image URL
        if not img_url.startswith('http'):  # Handle relative URLs
            img_url = url + img_url


        # Get the image file name
        img_name = os.path.join('images', os.path.basename(img_url))

        # Download the image and save it locally
        img_data = requests.get(img_url).content
        with open(img_name, 'wb') as handler:
            handler.write(img_data)

        print(f"{img_name} downloaded.")

#hero_image_parser()