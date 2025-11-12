import { LightningElement } from 'lwc';

export default class RenderList extends LightningElement {
    superstars=['spiderman','superman','batman','ironman','hulk'];

    contactList=[
        {
            id:1,
            firstname:'Ram',
            lastname:'shinde'
        },
        {
            id:2,
            firstname:'james',
            lastname:'wayne'
        },
        {
            id:3,
            firstname:'charles',
            lastname:'v'
        },
        {
            id:4,
            firstname:'john',
            lastname:'wick'
        }

    ];
}