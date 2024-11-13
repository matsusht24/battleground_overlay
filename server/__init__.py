from bs4 import BeautifulSoup
import requests
import csv
import pandas as pd
import os
from dotenv import load_dotenv




   
def get_minions():

    load_dotenv()
    # Your Blizzard API credentials
    client_id = os.getenv('HS_CLIENT_ID')
    client_secret = os.getenv('HS_CLIENT_SECRET')
    print(client_id, client_secret)

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
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    params = {
        'locale': 'en_US',     # Language
        'gameMode': 'battlegrounds',    # Battleground minions
        'type': 'minion',      # Card type: minion
        'access_token': access_token,  # Auth token
        'pageSize': 300
    }

    response = requests.get(url, headers=headers, params=params)

    # Check the response and print the data
    if response.status_code == 200:
        minions = response.json()
        
    else:
        print(f"Failed to retrieve minions: {response.status_code}")
        return 


    # After processing the three 
    with open('data/card_list.csv', 'w') as main_file , open('data/no_picture_list.csv', 'w') as other_file:
        main_writer = csv.writer(main_file)
        other_writer = csv.writer(other_file)
        main_writer.writerow(('Name', 'Image'))
        other_writer.writerow(('Name',))
        for minion in minions['cards']:
            name = minion['name']
            img = minion['image']
            main_writer.writerow((name, img)) if img else other_writer.writerow((name,))
        main_file.close()
        other_file.close()


        
    
    
    

 
    

def main():
    get_minions()
    print('')

    
    # trinket_selection.update_trinket_list()
    # update_comp_list()
    #get_minions()

main()