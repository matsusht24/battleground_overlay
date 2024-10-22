from bs4 import BeautifulSoup
import requests
import csv
import pandas as pd
import os
from dotenv import load_dotenv
import hero_selection
import trinket_selection


def comp_creator(comp, writer):
    current_url = comp[0]
    comp_name = comp[1]

     # Check if the request was successful (status code 200)
    response = requests.get(current_url)
    if response.status_code == 200:
        html_content = response.text
    else:
        print(f"Failed to retrieve the webpage: {response.status_code}")

    soup = BeautifulSoup(html_content, 'html.parser')
    #when_to_commit = soup.find('strong').find_parent().find_next_sibling().text
    test = soup.find_all('strong')
    when_to_commit = test[0].find_parent().find_next_sibling()
    enabelers = test[1].find_parent().find_next_sibling()
    when_to_commit = '' if when_to_commit == None else when_to_commit.text
    enabelers = '' if enabelers == None else enabelers.text
    
    writer.writerow([comp_name,enabelers, when_to_commit])
    #core and add ons will be harder to do as the images don't have a good label on them
    
def update_comp_list():
    comps_url = "https://hsbgguide.com/comps/"
    response = requests.get(comps_url)
    file_name = 'data/comp_tierlist.csv'

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        html_content = response.text
    else:
        print(f"Failed to retrieve the webpage: {response.status_code}")

    soup = BeautifulSoup(html_content, 'html.parser')
    comps_elems = soup.find_all(class_="pt-cv-title")

    comp_list = [(a['href'], a.get_text()) for element in comps_elems for a in element.find_all('a')]
    
    # Check if the CSV file exists
    file_exists = os.path.isfile(file_name)

    # open/creates the csv file that will store the data on the comps for now
    try:
        file = open(file_name, mode='w', newline='\n')
        writer = csv.writer(file)
        writer.writerow(['comp_name','enablers','when_to_commit','core','add-ons'])
    except FileNotFoundError:
        print(f"Error: The file '{file_name}' could not be found.")
    except PermissionError:
        print(f"Error: Permission denied while trying to access '{file_name}'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    
    for comp in comp_list:
        comp_creator(comp, writer)

    file.close()

   
def get_minions():

    load_dotenv()
    # Your Blizzard API credentials
    client_id = os.getenv('HS_CLIENT_ID')
    client_secret = os.getenv('HS_CLIENT_SECRET')
    print(client_id)

    # Request OAuth token
    url = 'https://oauth.battle.net/token'
    data = {'grant_type': 'client_credentials'}

    response = requests.post(url, data=data, auth=(client_id, client_secret))

    # Extract the access token from the response
    if response.status_code == 200:
        access_token = response.json()['access_token']
        print(f"Access Token: {access_token}")
    else:
        print("Failed to retrieve access token")
        return
    url = 'https://us.api.blizzard.com/hearthstone/cards'
    params = {
        'locale': 'en_US',     # Language
        'gameMode': 'battlegrounds',
        'class': 'neutral',    # Neutral minions
        'type': 'minion',      # Card type: minion
        'access_token': access_token,  # Auth token
    }
    response = requests.get(url, params=params)

    # Check the response and print the data
    if response.status_code == 200:
        minions = response.json()
        for minion in minions['cards']:
            print(f"Name: {minion}")
    else:
        print(f"Failed to retrieve minions: {response.status_code}")


 
    

def main():

    print('')

   #####################################################################################
    #test cases for hero_parser
    # hero_dict = hero_selection.hero_parser()
    # returns Chenvaala
    # test_case_0 = ['Varden Dawngrasp','Chenvaala', 'Tickatus', 'Onyxia']

    # print(hero_selection.get_best_hero(hero_list=hero_dict, hero_options=test_case_0))

    # #returns Varden Dawngrasp/Queen Wagtoggle
    # test_case_1 = ['Varden Dawngrasp','Queen Wagtoggle', 'Tickatus', 'Onyxia']
    
    # print(hero_selection.get_best_hero(hero_list=hero_dict, hero_options=test_case_1))

    ######################################################################################

    
    # trinket_selection.update_trinket_list()
    # update_comp_list()
    #get_minions()

main()