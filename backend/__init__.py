from bs4 import BeautifulSoup
import requests
import csv
import pandas as pd


def comp_parser():
    comps_url = "https://hsbgguide.com/comps/"
    response = requests.get(comps_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        html_content = response.text
    else:
        print(f"Failed to retrieve the webpage: {response.status_code}")

    soup = BeautifulSoup(html_content, 'html.parser')

def hero_parser():
    data = pd.read_csv('data/hero_tierlist.csv', dtype=str)
    hero_dict = data.set_index('hero_name')['tier'].to_dict() 
    return hero_dict    
    

def main():
    hero_dict = hero_parser()
    print(hero_dict)

main()