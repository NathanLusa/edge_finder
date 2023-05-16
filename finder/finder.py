from facebook.find_lista import find_lista_facebook
from olx.finder_form import find_form
from olx.finder_lista import find_lista
from socarrao.finder import find_socarrao


if __name__ == '__main__':
    _force = False
    # _force = True
    
    # OLX
    # find_lista(_force)
    # find_form(_force)

    # Facebook
    # find_lista_facebook(_force)

    # SóCarrao
    find_socarrao(_force)
