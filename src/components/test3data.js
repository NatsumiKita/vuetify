import * as wjcCore from '@grapecity/wijmo';
import { 
    RequiredValidator, MinNumberValidator, MinDateValidator,
    MaxDateValidator
} from './test3validation';
//
//
export class DataService {

    _validationConfig = {
        'date': [ 
            new RequiredValidator(),
            new MinDateValidator(new Date('2000-01-01T00:00:00')),
            new MaxDateValidator(new Date('2100-01-01T00:00:00'))
        ],
        'price': [
            new RequiredValidator(),
            new MinNumberValidator(0, `金額を負の値にすることはできません`)
        ]
    };

    getData(count) {
        const data = [];
        const dt = new Date();
        const year = dt.getFullYear();

        const itemsCount = Math.max(count, 5);

        // add items
        for (let i = 0; i < itemsCount; i++) {
            const item = this._getItem(i, year);
            data.push(item);
        }

        // set invalid data to demonstrate errors visualization
        data[1].price = -2000;
        data[2].date = new Date('1970-01-01T00:00:00');
        data[4].price = -1000;

        return data;
    }

    validate(item, prop, displayName) {
        const validators = this._validationConfig[prop];
        if (wjcCore.isUndefined(validators)) {
            return '';
        }

        const value = item[prop];
        for (let i = 0; i < validators.length; i++) {
            const validationError = validators[i].validate(displayName, value);
            if (!wjcCore.isNullOrWhiteSpace(validationError)) {
                return validationError;
            }
        }
    }

    _getItem(i, year) {
        const date = new Date(year, i % 12, 25, i % 24, i % 60, i % 60);

        const item = {
            id: i,
            date: date,
            productId: '',
            price:  wjcCore.toFixed(Math.random() * 10000 + 5000, 2, true),
            discount: wjcCore.toFixed(Math.random() / 4, 2, true),
            active: i % 4 == 0,
        };

        return item;
    }


}
