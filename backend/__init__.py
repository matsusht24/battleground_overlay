from bs4 import BeautifulSoup
import requests
import csv
import pandas as pd
import os

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
    temp = soup.find('strong')
    test = soup.find_next_sibling("strong")
    
    #Note: For next time try to figure out how to get the enablers, add ons, cores, and when to commit from page. 
    print(temp)

def comp_parser():
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
        file = open(file_name, mode='a+', newline='')
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(['comp_name','enablers','when_to_commit','core','add-ons'])
    except FileNotFoundError:
        print(f"Error: The file '{file_name}' could not be found.")
    except PermissionError:
        print(f"Error: Permission denied while trying to access '{file_name}'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    
    for comp in comp_list:
        comp_creator(comp, writer)
        return
        
    


def hero_parser():
    data = pd.read_csv('data/hero_tierlist.csv', dtype=str)
    hero_dict = data.set_index('hero_name')['tier'].to_dict() 
    return hero_dict    
    

def main():
    #hero_dict = hero_parser()
    comp_parser()


main()