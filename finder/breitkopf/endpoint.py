url = 'https://seminovos.breitkopf.com.br/seminovos/c4cactus'

# Os cabeçalhos (headers) da requisição, copiados do comando cURL
headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*',
    'Sec-Fetch-Site': 'same-origin',
    'Accept-Language': 'pt-BR,pt;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Sec-Fetch-Mode': 'cors',
    'Origin': 'https://seminovos.breitkopf.com.br',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15',
    'Referer': 'https://seminovos.breitkopf.com.br/',
    # 'Cookie': 'october_session=eyJpdiI6InNYdVpITFlIT280K0JMZFp0TVpndWc9PSIsInZhbHVlIjoiM0dQd2E4NDJuanpwaHRHenczSkpJNFBabnhveFhoRllyZWI3SGZWbllHWnMwZHVseU02TkNnMndRZFZNYVN6XC8zdDJQaXFiSEtsc0pkaDN3eFdhRCtSRDVMZDRVRTFEb0NVMEpvU3hPbkZTN3h2QkpuTzBQdVFYM1laV3krRVByIiwibWFjIjoiZmRjNGIzOWU4ZGEwMWQxMjFlYTNkNjNmNjQwOTg2YjMxZTM5Zjg0ZTAyMmZiOWZjOTNkOWI2YjQ2ODY2NDVjOCJ9; alpes-debug=1; alpes-origin=direto; alpes-token=MTI1NzMxMTM1MDMxMTI4',
    'Sec-Fetch-Dest': 'empty',
    'X-OCTOBER-REQUEST-HANDLER': 'onGetFilteredCars',
    'X-Requested-With': 'XMLHttpRequest',
    'Priority': 'u=3, i',
    'X-OCTOBER-REQUEST-PARTIALS': '',
}

# Os dados (payload) do formulário a serem enviados.
# É uma boa prática passá-los como um dicionário, pois a biblioteca `requests`
# se encarrega de codificá-los corretamente.
data = {
    # '_session_key': 'S79cG5V2QjwGJf5l1yFrYfO97zWXhlqjVhGY7vEk',
    # '_token': 'F4kHz8P5o1h6a25RLzn0S7y5lII14LZAuJo5YoPI',
    'filtering': 'true',
    'activeFilters': '{"armored":null,"brandsId":null,"doors":null,"category":null,"brand":null,"model":null,"color":null,"transmission":null,"fuel":null,"year":null,"year_max":null,"year_min":null,"price":null,"end_board":null,"price_min":null,"price_max":null,"price_min_string":null,"price_max_string":null,"limit":12,"created":null,"updated":null,"order":null,"search":null,"km_min":null,"km_max":null}',
    'models': 'C4 Cactus',
    'years_min': '',
    'years_max': '',
    'price_min': '',
    'price_max': '',
    'price_min_masked': '',
    'price_max_masked': '',
    'km_min': '',
    'km_max': '',
    'km_min_masked': '',
    'km_max_masked': '',
}
