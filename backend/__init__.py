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
    comps_elems = soup.find_all(class_="pt-cv-title")

    comps = [(a['href'], a.get_text()) for element in comps_elems for a in element.find_all('a')]
    


def hero_parser():
    data = pd.read_csv('data/hero_tierlist.csv', dtype=str)
    hero_dict = data.set_index('hero_name')['tier'].to_dict() 
    return hero_dict    
    

def main():
    #hero_dict = hero_parser()
    comp_parser()


main()