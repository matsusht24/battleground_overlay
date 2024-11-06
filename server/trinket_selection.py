# trinket_selection.py
from bs4 import BeautifulSoup
import pandas as pd
import requests
import os 
import csv 
from selenium import webdriver
import time
import re

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


# updates trinket_tierlist.csv with new info from hsreplay.net/battlgrounds/trinkets
def update_trinket_list(greater):
    isGreater = 'greater' if greater else 'lesser'
    trinket_url = f"https://hsreplay.net/battlegrounds/trinkets/{isGreater}/"
    #Since the trinket webpage is dynamically loaded, we will use selenium to laod 
    driver = webdriver.Chrome()
    driver.get(trinket_url)

    # Wait for content to load
    time.sleep(3)

    headers = ['Tier', 'Name', 'Img']
    
    file_name = f'data/{isGreater}_trinket_tierlist.csv'


    # Check if the CSV file exists
    file_exists = os.path.isfile(file_name)


    # open/creates the csv file that will store the data on the comps for now
    try:
        file = open(file_name, mode='w', newline='\n')
        writer = csv.writer(file)
        writer.writerow(headers)
    except FileNotFoundError:
        print(f"Error: The file '{file_name}' could not be found.")
    except PermissionError:
        print(f"Error: Permission denied while trying to access '{file_name}'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    html_content = driver.page_source
    soup = BeautifulSoup(html_content, 'html.parser')
    driver.quit()
 

    tier_list = soup.find_all('div', {'class':'sc-fweGeb cjWUAt' })
    for tier in tier_list:
        tier_div = tier.find('div')
        curTier = tier_div.text.upper()

        for trinket in tier.find_all('div', {'tabindex': "0"}):
            img_src = trinket.find('img')["src"]

            trinket_div = trinket.find('div', {'class': 'sc-eYAzsh kDxVzo'})
            # Extract the main text in the outer div
            main_text = trinket_div.find(text=True, recursive=False) if trinket_div else ""


            # Extract each sub-div's text individually
            # Access the 'Quilboar' text
            sub_div1 = trinket_div.find("div", class_="sc-jMScns") if trinket_div else None
            class_text = sub_div1.get_text(strip=True) if sub_div1 else ""

            trinket_name = f'{main_text}: {class_text}'
            
            writer.writerow([curTier, trinket_name, img_src])
            
            

    
        # current_element = trinket.find_next()
        # elements = [current_element.text]
            # # Handle relative URLs if necessary
            # if img_url.startswith("/"):
            #     img_url = comps_url + img_url  # Adjust based on the structure of your URLs
            
            # # Get the image content and save it
            # img_data = requests.get(img_url).content
            # img_name = os.path.join("images", os.path.basename(img_url))
            
            # with open(img_name, "wb") as img_file:
            #     img_file.write(img_data)
            #     print(f"Saved {img_name}")
            #     writer.writerow(elements)
            # img_file.close()
            # file.close()

def download_trinket_imgs():

    data = pd.concat([pd.read_csv('data/lesser_trinket_tierlist.csv', header=0), pd.read_csv('data/greater_trinket_tierlist.csv', header=0)])
    folder_path = '../client/hsbg_helper/public/trinket_portraits'
    os.makedirs(folder_path, exist_ok=True)
    for index, trinket in data.iterrows():
        img_url = trinket['Img']   
        trinket_name = re.sub("[\s':.]+", '_',trinket['Name'])
        response = requests.get(img_url, stream=True)
        if response.status_code == 200:
            # Extract the image name from the URL
            img_name =  f'{trinket_name}_Portrait.jpg'
            # Define the path where the image will be saved
            img_path = os.path.join(folder_path, img_name)
 
            # Open the file in binary write mode and save the image
            try:
                with open(img_path, "wb") as file:
                    for chunk in response.iter_content(1024):
                        file.write(chunk)
                print(f"Image saved to {img_path}")
            except Exception as e:
                print(f"Error saving image: {e}")
        else:
            print(f"Failed to download the image: {img_name}")
        
#update_trinket_list(True)

download_trinket_imgs()