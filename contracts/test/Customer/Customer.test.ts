import { expect } from '../chai-setup';
import { setupCustomer } from './fixtures';
import {customerDefault} from "./defaults";

describe("Customer.sol", async () => {

    it("Should be able to create and retrieve new customer with given wallet address", async () => {
        const { createCustomer, users, getCustomer } = await setupCustomer();
        await createCustomer(users[0].address, customerDefault);
        const customer = await getCustomer(users[0].address);

        expect(customer.fullname).to.be.equal(customerDefault.fullname);
        expect(customer.email).to.be.equal(customerDefault.email);
        expect(customer.dob).to.be.equal(customerDefault.dob);
        expect(customer.picture).to.be.equal(customerDefault.picture);
        expect(customer.govtID).to.be.equal(customerDefault.govtID);
        expect(customer.wallet).to.be.equal(customerDefault.wallet);
    });




})