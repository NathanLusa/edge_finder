from facebook.find_lista import find_facebook
from olx.finder_form import find_form as find_olx_form
from olx.finder_lista import find_lista as find_olx
from socarrao.finder import find_socarrao


if __name__ == '__main__':
    _force = False
    # _force = True
    
    # find_socarrao(_force)
    # find_olx(_force)
    # find_olx_form(_force)
    find_facebook(_force)

