import getpass
import json
from datetime import datetime
from time import sleep

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from services.models import Veiculo, VeiculoList
from services.schemas import VeiculoHistoricoSchema, VeiculoImagemSchema, VeiculoSchema
from services.services import *
from utils import get_content, save_content
from webdriver_manager.chrome import ChromeDriverManager
import time

USER = getpass.getuser()
SITE = 'https://www.facebook.com'


class Selenium:
    def __init__(self):
        # Close the Chrome instance if it is already running.
        # os.system("taskkill /f /im chrome.exe")

        # Set the options for the Chrome browser.
        chrome_options = Options()

        # Add a user data directory as an argument for options.
        # chrome_options.add_argument(f"--user-data-dir=C:\\Users\\{USER}\\AppData\\Local\\Google\\Chrome\\User Data")
        chrome_options.add_argument(
            '--user-data-dir=/usr/local/share/chromedriver'
        )
        chrome_options.add_argument('profile-directory=Default')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-notifications')

        # Initialize the Chrome browser using the ChromeDriverManager.
        self.browser = webdriver.Chrome(
            ChromeDriverManager().install(), options=chrome_options
        )

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
                    'window.scrollTo(0, document.body.scrollHeight);'
                )

                # Wait for the page to finish loading.
                sleep(5)

            # Get the page source.
            page_source = self.browser.page_source

            return page_source or ''

        # Catch any exceptions.
        except TimeoutException:
            print('Timed out waiting for page to load.')
            return None

        except NoSuchElementException:
            print('Element not found.')
            return None

    def close_browser(self):
        self.browser.quit()

    def login(self):
        self.browser.get('https://facebook.com')
        login_input = self.browser.find_element(by=By.ID, value='email')
        pass_input = self.browser.find_element(by=By.ID, value='pass')
        btn_login = self.browser.find_element(
            by=By.XPATH, value='//*[@data-testid="royal_login_button"]'
        )
        login_input.send_keys(
            'ceviu1234@gmail.com'
        ) if login_input else None
        pass_input.send_keys(
            'YZL7dTV62WRkkM8Y6#t$'
        ) if pass_input else None
        btn_login.click() if btn_login else None
        sleep(5)
        print('Login realizado com sucesso!')

    def get_soup(self, url, force):
        page_source, file_name = get_content(url, get_content_method=self.get_page_source, force=force)
        print('Download...', file_name, len(page_source))

        soup = BeautifulSoup(page_source, 'html.parser')
        [x.extract() for x in soup.findAll('script')]
        save_content(url, str(soup), 'w')

        return soup

    def scrape_facebook_marketplace(self, url, need_login, force):
        lista = []

        if need_login:
            self.login()

        soup = self.get_soup(url, force)

        div = soup.find('div', class_='xkrivgy x1gryazu x1n2onr6')
        div = div.find_all(
            'div',
            class_='x9f619 x78zum5 x1r8uery xdt5ytf x1iyjqo2 xs83m0k x1e558r4 x150jy0e x1iorvi4 xjkvuk6 xnpuxes x291uyu x1uepa24',
        )

        for d in div:
            image = (
                d.find(
                    'img', class_='xt7dq6l xl1xv1r x6ikm8r x10wlt62 xh8yej3'
                )['src']
                if d.find(
                    'img', class_='xt7dq6l xl1xv1r x6ikm8r x10wlt62 xh8yej3'
                )
                else ''
            )
            title = (
                d.find('span', 'x1lliihq x6ikm8r x10wlt62 x1n2onr6').text
                if d.find('span', 'x1lliihq x6ikm8r x10wlt62 x1n2onr6')
                else ''
            )
            price = (
                d.find(
                    'span',
                    'x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x3x7a5m x1lkfr7t x1lbecb7 x1s688f xzsf02u',
                ).text
                if d.find(
                    'span',
                    'x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x3x7a5m x1lkfr7t x1lbecb7 x1s688f xzsf02u',
                )
                else ''
            )
            url = (
                d.find(
                    'a',
                    class_='x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g x1lku1pv',
                )['href']
                if d.find(
                    'a',
                    class_='x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g x1lku1pv',
                )
                else ''
            )
            url = f'{SITE}{url}'
            location = (
                d.find(
                    'span',
                    'x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x676frb x1nxh6w3 x1sibtaa xo1l8bm xi81zsa',
                ).text
                if d.find(
                    'span',
                    'x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x676frb x1nxh6w3 x1sibtaa xo1l8bm xi81zsa',
                )
                else ''
            )

            lista.append(
                {
                    'titulo': title,
                    'preco': price,
                    'imagem': image,
                    'url': url,
                }
            )

            print(f'Image: {image}')
            print(f'Price: {price}')
            print(f'Title: {title}')
            print(f'Location: {location}')
            print(f'URL: {url}')
            print('------------------------')

        self.close_browser()

        return lista

    def scrape_facebook_marketplace_item(self, url, need_login, force):
        if need_login:
            self.login()

        soup = self.get_soup(url, force)


def find_facebook(force):
    _need_login = False
    urls = [
        'https://www.facebook.com/marketplace/curitiba/search/?query=ford%20edge&exact=true',  # Curitiba
        'https://www.facebook.com/marketplace/105615689472731/search/?query=ford%20edge&exact=true',  # Pato Branco
        'https://www.facebook.com/marketplace/florianopolis/search/?query=ford%20edge&exact=true',  # Florianápolis
        'https://www.facebook.com/marketplace/109342319085733/search/?query=ford%20edge&exact=true',  # São Sosé
        'https://www.facebook.com/marketplace/113399188670230/search/?query=ford%20edge&exact=true',  # Chapecó
    ]

    veiculo_list = get_veiculos()
    veiculo_list = [x for x in veiculo_list if x['site'] == SITE]
    historicos = get_historicos()
    imagens = get_imagens()

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, historicos, imagens)

    sel = Selenium()
    sel.scrape_facebook_marketplace(veiculos[0].url, _need_login, force)

    return
    for url in urls:
        sel = Selenium()
        lista = sel.scrape_facebook_marketplace(url, _need_login, force)
        for i in lista:
            # year_span = li.find('span', {'aria-label': re.compile(r'Ano')})
            # year = year_span.text if year_span else ''

            year = 0
            url = i['url']
            title = i['titulo']
            price = i['preco']
            image = i['imagem']

            if (not url) or (url == '') or (url == SITE):
                continue

            if 'FORD EDGE' not in title.upper():
                continue

            veiculo = veiculos.get_veiculo(url)
            if not veiculo:
                veiculo_schema = VeiculoSchema(
                    marca='Ford',
                    modelo='Edge',
                    ano=year,
                    url=url,
                    titulo=title,
                    site=SITE,
                    status='ativo',
                )
                veiculo_json = post_veiculo(veiculo_schema.to_json())
                veiculo = Veiculo()
                veiculo.load_from_json(veiculo_json, [], [])
                veiculos.append(veiculo)

            imagem = veiculo.get_imagem(image)
            if not imagem:
                imagem_schema = VeiculoImagemSchema(
                    veiculo_id=veiculo.id, url=image, status='ativo'
                )
                imagem_json = post_veiculo_imagem(imagem_schema.to_json())
                veiculo.add_imagem(imagem_json)

            description = title
            try:
                price = round(float(price.split('\xa0')[1]) * 1000, 2)
            except:
                print('O preço do negócio é: ', price)
                price = 0.0

            km = 0
            # for prop in json_data['ad']['properties']:
            #     if prop['name'] == 'mileage':
            #         km = prop['value']
            #         km = int(km) * 1000 if int(km) <= 1000 else int(km)
            #         break

            hist = VeiculoHistoricoSchema(
                veiculo_id=veiculo.id,
                datahora=datetime.now().isoformat(),
                valor=price,
                quilometragem=km,
                descricao=description,
            )
            historico = veiculo.get_historico(hist.to_json())
            if not historico:
                historico_json = post_veiculo_historico(hist.to_json())
                veiculo.add_historico(historico_json)
