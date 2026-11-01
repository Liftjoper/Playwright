import { test, expect } from '@playwright/test';

test.describe('E2E тесты для Playwright.dev', () => {
  
  // Шаг 1: Проверка наличия определенных текстов на странице
  test('Шаг 1: Проверка заголовка и текста на главной странице', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Проверяем, что title содержит Playwright
    await expect(page).toHaveTitle(/Playwright/);
    
    // Проверяем наличие главного заголовка (h1) на странице
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    // Проверяем, что на странице есть ссылка на документацию
    await expect(page.getByRole('link', { name: 'Docs' }).first()).toBeVisible();
  });

  // Шаг 2: Работа с интерактивными элементами и формами (поиск)
  test('Шаг 2: Работа с поиском и интерактивными элементами', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // 1. Находим кнопку поиска по её специфичному классу DocSearch и кликаем
    const searchButton = page.locator('.DocSearch-Button').first();
    await searchButton.waitFor({ state: 'visible', timeout: 10000 });
    await searchButton.click();
    
    // 2. Ждем появления модального окна с полем ввода
    const searchInput = page.locator('.DocSearch-Input').first();
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // 3. Вводим текст в форму поиска
    await searchInput.fill('locators');
    
    // 4. Ждем, пока результаты подгрузятся
    await page.waitForTimeout(1500);
    
    // 5. Проверяем, что появились результаты поиска (список совпадений)
    await expect(page.locator('.DocSearch-Hits').first()).toBeVisible();
  });

  // Шаг 3: Переход на другую страницу сайта
  test('Шаг 3: Переход на страницу документации', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Кликаем по ссылке Docs в навигации
    await page.getByRole('link', { name: 'Docs' }).first().click();
    
    // Проверяем, что URL изменился
    await expect(page).toHaveURL(/.*\/docs\/intro/);
    
    // Проверяем заголовок на новой странице
    await expect(page.getByRole('heading', { name: /Installation/i })).toBeVisible();
  });

});