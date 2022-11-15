import { Products } from './products.model';

describe('Product', () => {
    it('should create an instance', () => {
        expect(new Products()).toBeTruthy();
    });
});