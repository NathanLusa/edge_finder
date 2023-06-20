import os

import dukpy

typescript_path = os.path.join(os.path.curdir)
typescript_path = os.path.join(os.path.curdir, '_typescript/')
print(typescript_path)

files = [
    os.path.join(typescript_path, f)
    for f in os.listdir(typescript_path)
    if os.path.isfile(os.path.join(typescript_path, f))
]
print(files)

files = [f for f in files if '.ts' in f]
print(files)

for f in files:
    with open(f, '+r') as ts_file:
        js = dukpy.typescript_compile(ts_file.read())
        print(js)

        js_file_name = f.replace('.ts', '.js')
        # if not os.path.exists(js_file_name):
        #     os.mkdir(js_file_name)

        with open(js_file_name, 'w') as js_file:
            js_file.write(js)
