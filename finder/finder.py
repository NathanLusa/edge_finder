from facebook.find_lista import find_lista_facebook
from olx.finder_form import find_form
from olx.finder_lista import find_lista

if __name__ == '__main__':
    _force = False
    find_lista(_force)
    find_form(_force)
    find_lista_facebook(_force)
