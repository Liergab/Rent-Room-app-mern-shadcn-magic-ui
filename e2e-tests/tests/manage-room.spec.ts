import {test,expect} from '@playwright/test'
import path from 'path';
const UI_URL="http://localhost:5173/"
const imagePath1 = path.join(__dirname, "files", "1.jpg").replace(/\\/g, '/');
const imagePath2 = path.join(__dirname, "files", "2.jpg").replace(/\\/g, '/');
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

test('Should Display the room and hotels', async({page}) => {
    await page.goto(`${UI_URL}my-hotel`)
    await expect(page.locator('h1', {hasText: 'MyRooms'})).toBeVisible()
    await expect(page.locator('h1', { hasText: 'Test Room' }).first()).toBeVisible();
    await expect(page.getByText('Description Test').first()).toBeVisible();
    // await expect(page.locator('img[alt="Test Room"]')).toBeVisible(); // Replace with the actual alt text
    // await expect(page.locator('img[alt="Test Room"]')).toBeVisible(); 
    await expect(page.getByText('Test City,Test Country').first()).toBeVisible();
    await expect(page.getByText('Budget').first()).toBeVisible();
    await expect(page.getByText('100 Per Night').first()).toBeVisible();
    await expect(page.getByText('10 Adult, 10 Child').first()).toBeVisible();
    await expect(page.getByText('3 StarRating').first()).toBeVisible();

    await expect(page.getByRole('link',{name:'View Details'}).first()).toBeVisible();
    await expect(page.getByRole('link',{name:'Add Room'})).toBeVisible();

})


test('Should Edit hotel or room ', async({page}) => {
    await page.goto(`${UI_URL}my-hotel`)
    await expect(page.locator('h1', {hasText: 'MyRooms'})).toBeVisible()

    await page.getByRole('link',{name:'View Details'}).first().click()

    await expect(page.locator('h1',{hasText:'Edit Hotel'})).toBeVisible();

    await page.waitForSelector('[name="name"]', { state: "attached" });

    await expect(page.locator('[name="name"]')).toHaveValue("Test Room");
    await expect(page.locator('[name="city"]')).toHaveValue("Test City");
    await page.locator('[name="name"]').fill("Test Room UPDATED");
    await page.locator('[name="city"]').fill("Test City UPDATED");
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg")
    ])
    await page.getByRole("button", { name: "submit" }).click();
    await expect(page.getByText("Room Edited!")).toBeVisible({ timeout: 10000 });

    await page.goto(`${UI_URL}my-hotel`)
    await expect(page.locator('h1', {hasText: 'MyRooms'})).toBeVisible()

    await page.getByRole('link',{name:'View Details'}).first().click()

    await expect(page.locator('h1',{hasText:'Edit Hotel'})).toBeVisible();

    await page.waitForSelector('[name="name"]', { state: "attached" });

    await expect(page.locator('[name="name"]')).toHaveValue("Test Room UPDATED");
    await expect(page.locator('[name="city"]')).toHaveValue("Test City UPDATED");
    await page.locator('[name="name"]').fill("Test Room");
    await page.locator('[name="city"]').fill("Test City");
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg")
    ])
    await page.getByRole("button", { name: "submit" }).click();
    await expect(page.getByText("Room Edited!")).toBeVisible({ timeout: 10000 });

})