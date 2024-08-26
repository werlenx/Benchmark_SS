'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class SimpleStorageWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.contractId = 'simpleStorage';
        this.args = {
            'set': this.setData.bind(this),
            'get': this.getData.bind(this)
        };
        this.workerIndex = -1;
        this.totalWorkers = -1;
        this.roundIndex = -1;
        this.roundArguments = undefined;
        this.sutAdapter = undefined;
        this.sutContext = undefined;
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;
        this.roundArguments = roundArguments;
        this.sutAdapter = sutAdapter;
        this.sutContext = sutContext;
    }

    async submitTransaction() {
        try {
            const method = this.roundArguments.method;
            if (this.args[method]) {
                return await this.args[method]();
            } else {
                throw new Error(`Method ${method} is not defined.`);
            }
        } catch (error) {
            console.error(`Error submitting transaction: ${error.message}`);
            throw error;
        }
    }

    async setData() {
        try {
            const data = this.roundArguments.value || Math.floor(Math.random() * 1000);
            
            // Log do valor que será definido
            console.log(`[setData] Definindo valor: ${data}`);

            const args = {
                contractId: this.contractId,
                contractFunction: 'set',
                contractArguments: [data],
                gas: 6721975,
                readOnly: false
            };

            // Log dos argumentos da transação
            console.log(`[setData] Argumentos da transação: ${JSON.stringify(args)}`);

            const result = await this.sutAdapter.sendRequests(args);

            // Log do resultado da transação
            console.log(`[setData] Resultado da transação: ${JSON.stringify(result)}`);

            return result;
        } catch (error) {
            // Log detalhado do erro
            console.error(`[setData] Erro ao definir valor: ${error.message}`);
            throw error;
        }
    }

    async getData() {
        try {
            const args = {
                contractId: this.contractId,
                contractFunction: 'get',
                contractArguments: [],
                gas: 6721975,
                readOnly: true
            };

            // Log dos argumentos da transação
            console.log(`[getData] Argumentos da transação: ${JSON.stringify(args)}`);

            const result = await this.sutAdapter.sendRequests(args);

            // Log do resultado da transação
            console.log(`[getData] Resultado da transação: ${JSON.stringify(result)}`);

            return result;
        } catch (error) {
            // Log detalhado do erro
            console.error(`[getData] Erro ao obter valor: ${error.message}`);
            throw error;
        }
    }
}

function createWorkloadModule() {
    return new SimpleStorageWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
