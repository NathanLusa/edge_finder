import hashlib
import os

import requests

DEVELOP = True
# DEVELOP = False
FILE_PATH = 'files/'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
}


def get_file_name(url):
    md5 = hashlib.md5()
    md5.update(url.encode('utf-8'))
    return md5.hexdigest()


def get_content(url):
    file_name = f'{get_file_name(url)}.html'
    if not os.path.exists(FILE_PATH):
        os.makedirs(FILE_PATH)

    if os.path.exists(FILE_PATH + file_name) and DEVELOP:
        with open(FILE_PATH + file_name, 'rb') as f:
            content = f.read()
    else:
        print('Download')
        response = requests.get(url, headers=HEADERS)
        content = response.content
        with open(FILE_PATH + file_name, 'wb') as f:
            f.write(response.content)

    return content
