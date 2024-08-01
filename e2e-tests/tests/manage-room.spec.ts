import {test,expect} from '@playwright/test'
import path from 'path';
const UI_URL="http://localhost:5173/"

test.beforeEach(async({page}) =>{
    await page.goto(UI_URL);
    await page.getByRole("link", {name:'Sign in'}).click();
    await expect(page.getByRole('heading', {name:"Login"})).toBeVisible();
    await page.locator("[name = email]").fill('test_registration_4848@test.com')
    await page.locator("[name = password]").fill("11111111")
    await page.getByRole("button", {name:"Submit"}).click();
  
    await expect(page.getByText("successfully register")).toBeVisible()
})

test('Should Allow user to add a room', async({page}) => {
    await page.goto(`${UI_URL}add-hotel`)
    await page.locator('[name="name"]').fill('Test Room');
    await page.locator('[name="city"]').fill('Test City');
    await page.locator('[name="country"]').fill('Test Country');
    await page.locator('[name="description"]').fill('Description Test');
    await page.locator('[name="pricePerNight"]').fill('100');
    await page.selectOption('select[name="starRating"]',"3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free WIFI").check()
    await page.getByLabel("Parking").check()
    await page.locator('[name="adultCount"]').fill("10");
    await page.locator('[name="childCount"]').fill("10");
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg")
    ])

    await page.getByRole("button", {name:"submit"}).click()
    await expect(page.getByText("Room Added!")).toBeVisible()

})