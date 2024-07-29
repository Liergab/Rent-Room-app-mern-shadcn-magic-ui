import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/"

test('Should allow  the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", {name:'Sign in'}).click();
  await expect(page.getByRole('heading', {name:"Login"})).toBeVisible();
  await page.locator("[name = email]").fill('bryangabrielberja25@gmail.com')
  await page.locator("[name = password]").fill("11111111")
  await page.getByRole("button", {name:"Submit"}).click();

  await expect(page.getByText("successfully register")).toBeVisible()
  await expect(page.getByRole("link",{name:"Booking"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
});

test("Should not allow the user to sign in", async ({page}) => {
  await page.goto(UI_URL)
  await page.getByRole("link", {name:"Sign in"}).click()
  await expect(page.getByRole('heading', {name:"Login"})).toBeVisible()
  await page.locator("[name = email]").fill('sample@gmail.com')
  await page.locator("[name = password]").fill('111223344')
  await page.getByRole('button',{name:"Submit"}).click()

  await expect(page.getByText('Invalid email or password')).toBeVisible()

  await page.locator("[name = email]").fill('')
  await page.locator("[name = password]").fill('111223344')
  await page.getByRole('button',{name:"Submit"}).click()
  await expect(page.getByText('Invalid email',{exact:true})).toBeVisible()

  await page.locator("[name = email]").fill('sample@gmail.com')
  await page.locator("[name = password]").fill('')
  await page.getByRole('button',{name:"Submit"}).click()
  await expect(page.getByText('Invalid Password',{exact:true})).toBeVisible()

  await page.locator('[name="email"]').clear();
  await page.locator('[name="password"]').clear();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid email',{exact:true})).toBeVisible();
  await expect(page.getByText('Invalid Password',{exact:true})).toBeVisible();

})

test('Should allow user to register', async({page}) => {
  const testEmail = `test_registration_${Math.floor(Math.random() * 9000) + 1000}@test.com`
  await page.goto(UI_URL)
  await page.getByRole("link",{name:'Sign in'}).click()
  await expect(page.getByRole('heading', {name:"Login"})).toBeVisible()
  await page.getByRole("link",{name:"Create an account here"}).click()
  await expect(page.getByRole('heading', {name:"Create an Account"})).toBeVisible()

  await page.locator('[name="firstName"]').fill('Christine')
  await page.locator('[name="lastName"]').fill('Evangelista')
  await page.locator('[name="email"]').fill(testEmail)
  await page.locator('[name="password"]').fill('11111111')
  await page.locator('[name="password_confirmation"]').fill('11111111')

  await page.getByRole("button",{name:"Create Account"}).click()

await expect(page.getByText('Successfully Register')).toBeVisible()
await expect(page.getByRole("link",{name:"Booking"})).toBeVisible()
await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
})

test('Should not allow user to register', async({page}) => {
  await page.goto(UI_URL)
  await page.getByRole("link",{name:'Sign in'}).click()
  await expect(page.getByRole('heading', {name:"Login"})).toBeVisible()
  await page.getByRole("link",{name:"Create an account here"}).click()
  await expect(page.getByRole('heading', {name:"Create an Account"})).toBeVisible()

  await page.locator('[name="firstName"]').fill('Christine')
  await page.locator('[name="lastName"]').fill('Evangelista')
  await page.locator('[name="email"]').fill('christine@gmail.com')
  await page.locator('[name="password"]').fill('11111111')
  await page.locator('[name="password_confirmation"]').fill('11111111')
  await page.getByRole("button",{name:"Create Account"}).click()
  await expect(page.getByText('Email Already Exist!')).toBeVisible()

  await page.locator("[name=firstName]").fill('')
  await page.locator("[name=lastName]").fill('')
  await page.locator("[name=email]").fill('')
  await page.locator("[name=password]").fill('')
  await page.locator("[name=password_confirmation]").fill('')
  await page.getByRole('button', { name:"Create Account" }).click();
  await expect(page.getByText('FirstName is required!',{exact:true})).toBeVisible();
  await expect(page.getByText('LastName is required!',{exact:true})).toBeVisible();
  await expect(page.getByText('Invalid email',{exact:true})).toBeVisible();
  await expect(page.getByText('Invalid Password',{exact:true})).toBeVisible();

  // Scenario 2: FirstName empty, other fields filled
  await page.locator("[name=firstName]").fill('');
  await page.locator("[name=lastName]").fill('Doe');
  await page.locator("[name=email]").fill('john.doe@example.com');
  await page.locator("[name=password]").fill('Password123');
  await page.locator("[name=password_confirmation]").fill('Password123');
  await page.getByRole('button', { name:"Create Account" }).click();
  await expect(page.getByText('FirstName is required!', { exact: true })).toBeVisible();

  // Scenario 3: LastName empty, other fields filled
  await page.locator("[name=firstName]").fill('John');
  await page.locator("[name=lastName]").fill('');
  await page.locator("[name=email]").fill('john.doe@example.com');
  await page.locator("[name=password]").fill('Password123');
  await page.locator("[name=password_confirmation]").fill('Password123');
  await page.getByRole('button', { name:"Create Account" }).click();
  await expect(page.getByText('LastName is required!', { exact: true })).toBeVisible();

  // Scenario 4: Email empty, other fields filled
  await page.locator("[name=firstName]").fill('John');
  await page.locator("[name=lastName]").fill('Doe');
  await page.locator("[name=email]").fill('');
  await page.locator("[name=password]").fill('Password123');
  await page.locator("[name=password_confirmation]").fill('Password123');
  await page.getByRole('button', { name:"Create Account" }).click();
  await expect(page.getByText('Invalid email', { exact: true })).toBeVisible();

  // Scenario 5: Password empty, other fields filled
  await page.locator("[name=firstName]").fill('John');
  await page.locator("[name=lastName]").fill('Doe');
  await page.locator("[name=email]").fill('john.doe@example.com');
  await page.locator("[name=password]").fill('');
  await page.locator("[name=password_confirmation]").fill('');
  await page.getByRole('button', { name:"Create Account" }).click();
  await expect(page.getByText('Invalid Password', { exact: true })).toBeVisible();

  // Scenario 6: Password confirmation mismatch
  await page.locator("[name=firstName]").fill('John');
  await page.locator("[name=lastName]").fill('Doe');
  await page.locator("[name=email]").fill('john.doe@example.com');
  await page.locator("[name=password]").fill('Password123');
  await page.locator("[name=password_confirmation]").fill('DifferentPassword123');
  await page.getByRole('button', {name:"Create Account" }).click();
  await expect(page.getByText(`Passwords don't match`, { exact: true })).toBeVisible();

})

