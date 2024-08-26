
from brownie import SimpleStorage, accounts, network

def main():

    if network.show_active() != "development":
        print("Você não está conectado à rede de desenvolvimento!")
        return
    
    accont_addres = accounts[0]
    
    
    ss = SimpleStorage.deploy({"from": accont_addres})
    print(ss)


