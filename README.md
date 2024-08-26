SimpleStorage Benchmark Project
Este projeto utiliza Brownie para desenvolver e testar um contrato inteligente SimpleStorage na blockchain Ethereum. Também é utilizado o Hyperledger Caliper para realizar benchmarks de desempenho.

Requisitos
Node.js: Versão 18.20.2
Ganache CLI: Para rodar uma rede local determinística
Instalação
Clone o repositório:


dependencias
npm install
Python3
brownie: pip install eth-brownie
ganache-cli: npm install -g ganache-cli

excutando Ambiente
comando bind System under the test
caliper bind --caliper-bind-sut ethereum:1.2.1 --caliper-bind-cwd

Inicie o Ganache com uma rede determinística:
ganache-cli -d

Compile o contrato SimpleStorage:
brownie compile

faça o deploy na blockchain
brownie run scripts/deploy.py 

rodando benckmark
npx caliper launch manager --caliper-workspace . --caliper-benchconfig ./benchmarks/simpleStorageBenchmark.yaml --caliper-networkconfig networkConfig.json --caliper-flow-only-test

