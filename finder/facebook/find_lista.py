from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from time import sleep
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import getpass
import os
import time
import sqlite3

from utils import get_content, save_content

# Set username.
USER = getpass.getuser()

# Declare global variables.
ELECTRONICS = 'https://www.facebook.com/marketplace/category/electronics?deliveryMethod=local_pick_up&exact=false'
APPLIANCES = 'https://www.facebook.com/marketplace/category/appliances?deliveryMethod=local_pick_up&exact=false'
FURNITURE = 'https://www.facebook.com/marketplace/category/furniture?deliveryMethod=local_pick_up&exact=false'
LOCATIONS = ['pullman', 'colfax', 'moscow']


class Selenium():
    # Define a method to initialize the browser.
    def __init__(self):
        # Close the Chrome instance if it is already running.
        # os.system("taskkill /f /im chrome.exe")

        # Set the options for the Chrome browser.
        chrome_options = Options()
        # chrome_options.add_argument("--headless")
        # Add a user data directory as an argument for options.
        # chrome_options.add_argument(f"--user-data-dir=C:\\Users\\{USER}\\AppData\\Local\\Google\\Chrome\\User Data")
        chrome_options.add_argument('--user-data-dir=/usr/local/share/chromedriver')
        chrome_options.add_argument("profile-directory=Default")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument('--disable-notifications')

        # Initialize the Chrome browser using the ChromeDriverManager.
        self.browser = webdriver.Chrome(
            ChromeDriverManager().install(), options=chrome_options)

    # Define a method to get the page source using Selenium.
    def get_page_source(self, url):
        # Try to get the page source.
        try:
            # Load the URL.
            self.browser.get(url)
            
            sleep(3)
            page_source = self.browser.page_source
            # Wait for the page to load.
            # WebDriverWait(self.browser, 10).until(EC.presence_of_element_located(
            #     (By.CSS_SELECTOR, "div[class=' x1gslohp x1e56ztr']")))

            for i in range(1, 7):
                # Scroll down to the bottom of the page to load all items.
                self.browser.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight);")

                # Wait for the page to finish loading.
                sleep(5)
            
            # Get the page source.
            page_source = self.browser.page_source
            
            return page_source or ''

        # Catch any exceptions.
        except TimeoutException:
            print("Timed out waiting for page to load.")
            return None

        except NoSuchElementException:
            print("Element not found.")
            return None

    # Define a method to close the browser.
    def close_browser(self):
        self.browser.quit()

    # Define a method tp scrape the Facebook Marketplace page using Selenium, BeautifulSoup, and SQLite.
    def scrape_facebook_marketplace(self, url, need_login):
        # Get the page source using Selenium.
        # page_source = self.get_page_source(url)
        # page_source = get_content(url, self.get_page_source)

        if need_login:
            self.browser.get('https://facebook.com')        
            login_input = self.browser.find_element(by=By.ID, value='email')
            pass_input = self.browser.find_element(by=By.ID, value='pass')
            btn_login = self.browser.find_element(by=By.XPATH, value='//*[@data-testid="royal_login_button"]')        
            login_input.send_keys('ceviu1234@gmail.com') if login_input else None
            pass_input.send_keys('YZL7dTV62WRkkM8Y6#t$') if pass_input else None
            btn_login.click() if btn_login else None
            sleep(5)
    
        page_source, file_name = get_content(url, self.get_page_source)
        print('Download...', file_name, len(page_source)) # 1253302, 1584453

        # Parse the page source using BeautifulSoup.
        soup = BeautifulSoup(page_source, 'html.parser')
        [x.extract() for x in soup.findAll('script')]
        save_content(url, str(soup), 'w')
        
        # Get the items.
        div = soup.find_all('div', class_='x9f619 x78zum5 x1r8uery xdt5ytf x1iyjqo2 xs83m0k x1e558r4 x150jy0e x1iorvi4 xjkvuk6 xnpuxes x291uyu x1uepa24')
        print(div)
        
        # Iterate through the items.
        for d in div[0]:
            # try:
            # Get the item image.
            image = d.find('img', class_='xt7dq6l xl1xv1r x6ikm8r x10wlt62 xh8yej3')['src']
            # Get the item title from span.
            title = d.find('span', 'x1lliihq x6ikm8r x10wlt62 x1n2onr6').text
            # Get the item price.
            # price = d.find('span', 'x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 x1s688f xzsf02u').text
            price = d.find('span', 'x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x3x7a5m x1lkfr7t x1lbecb7 x1s688f xzsf02u').text
            # Get the item URL.
            url = d.find('a', class_='x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g x1lku1pv')['href']
            # Get the item location.
            # location = d.find('span', 'x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84').text
            location = d.find('span', 'x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x676frb x1nxh6w3 x1sibtaa xo1l8bm xi81zsa').text
            
            # Print the item information.
            print(f"Image: {image}")
            print(f"Price: {price}")
            print(f"Title: {title}")
            print(f"Location: {location}")
            # print(f"Category: {category}")
            url = (f"www.facebook.com{url}")
            print(f"URL: {url}")
            print("------------------------")
            # Add the item to the database including the image.
            # c.execute("INSERT INTO facebook_marketplace_posts (title, image, price, location, category, url) VALUES (?, ?, ?, ?, ?, ?)", (title, image, price, location, category, url))
            # conn.commit()
            # except:
            #     pass

            
        # Close the database connection.
        # conn.close()
        
        # Close the browser.
        self.close_browser()
        

def find_lista_facebook():
    # url = 'https://www.facebook.com/marketplace/search/?deliveryMethod=local_pick_up&query=ford%20edge'
    # url = 'https://www.facebook.com/marketplace/search?query=ford%20edge'
    url = 'https://www.facebook.com/marketplace/curitiba/search/?query=ford%20edge&exact=false'

    # Initialize the Selenium class.
    sel = Selenium()
    # Call the scrape_facebook_marketplace method.
    sel.scrape_facebook_marketplace(url, False)
