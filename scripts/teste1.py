from brownie import SimpleStorage, accounts

def main():
    # Carregar a conta do deployer
    deployer_account = accounts[0]

    # Obter a instância do contrato implantado
    simple_storage = SimpleStorage.at("0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab")
    
    # Chamar a função 'set' do contrato
    for i in range(10):
        tx_set = simple_storage.set(i, {"from": deployer_account})
        tx_set.wait(1)  # Esperar a confirmação da transação
        print(f"Valor definido para {i}.")
    
        # Chamar a função 'get' do contrato
        stored_value = simple_storage.get()
        print(f"Valor armazenado: {stored_value}")

