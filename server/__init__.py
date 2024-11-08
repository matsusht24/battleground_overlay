from bs4 import BeautifulSoup
import requests

import pandas as pd
import os
from dotenv import load_dotenv




   
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

    
    # trinket_selection.update_trinket_list()
    # update_comp_list()
    #get_minions()

main()