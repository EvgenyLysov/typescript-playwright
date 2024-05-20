import { Page } from '@playwright/test';

enum People { Adults = 'Adults', Children = 'Children', Rooms = 'Rooms' }

export class MainPage {
    private readonly page: Page;
    private readonly whereToGoTextField;
    private readonly checkInDateField;
    private readonly guestsField;
    private readonly searchButton;

    private readonly datePickerSelector = 'div[data-testid="searchbox-datepicker-calendar"] td span span';  
    private readonly peopleCountSelector = (people: People) => `//div[./label[text()='${people}']]//following-sibling::div/span`;
    private readonly decreasePeopleCountSelector = (people: People) => `//div[./label[text()='${people}']]//following-sibling::div/button[1]`;
    private readonly increasePeopleCountSelector = (people: People) => `//div[./label[text()='${people}']]//following-sibling::div/button[2]`;

    constructor(page: Page) {
        this.page = page;
        this.whereToGoTextField = page.locator("input[name = 'ss']");
        this.checkInDateField = page.locator('button[data-testid="date-display-field-start"]');
        this.guestsField = page.locator('button[data-testid="occupancy-config"]');
        this.searchButton = page.locator('button[type="submit"]');
        
    }

    async findAppartment(whereToGo: string, checkInDate: string, checkOutDate: string, adults: number, children: number, rooms: number) {
        await this.whereToGoTextField.fill(whereToGo);

        await this.checkInDateField.click();
        await this.page.locator(this.datePickerSelector,  { hasText: checkInDate }).first().click();
        await this.page.locator(this.datePickerSelector,  { hasText: checkOutDate }).first().click();

        await this.guestsField.click();

        
        await this.selectPeopleCount(People.Adults, adults);
        await this.selectPeopleCount(People.Children, children);
        await this.selectPeopleCount(People.Rooms, rooms);
        await this.searchButton.click();
    }


    private async selectPeopleCount(people: People, count: number) {
        let peopleCount = Number(await this.page.locator(this.peopleCountSelector(people)).innerText());
        while (peopleCount != count) {
            if (peopleCount < count) {
                await this.page.locator(this.increasePeopleCountSelector(people)).click();
                peopleCount = Number(await this.page.locator(this.peopleCountSelector(people)).innerText());
            } else {    
            await this.page.locator(this.decreasePeopleCountSelector(People.Adults)).click();
        }
    }
    }
}
