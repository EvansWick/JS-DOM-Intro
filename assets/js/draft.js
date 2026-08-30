/**
 * ============================================================================
 * 📌 ШПАРГАЛКА: АТРИБУТИ ТА ВЛАСТИВОСТІ В DOM (VANILLA JS)
 * ============================================================================
 */

// Припустимо, у нас є такий HTML:
// <input id="user-input" type="text" value="Привіт" data-user-id="42" data-is-admin="true" class="form-control" />

const input = document.querySelector("#user-input");

/* ============================================================================
 * 1. ГОЛОВНЕ ПРАВИЛО: АТРИБУТИ (HTML) VS ВЛАСТИВОСТІ (DOM-ОБ'ЄКТ)
 * ============================================================================
 * - Атрибути (Attributes): те, що написано в HTML-розмітці. Завжди рядки (String)!
 * - Властивості (Properties): поля JS-об'єкта DOM-вузла. Можуть бути будь-якого типу (Boolean, Object тощо).
 */

// ⚠️ ЧАСТА ПАСТКА НА СПІВБЕСІДАХ (Синхронізація):
// Користувач вводить у поле текст "Світ":
console.log(input.value);                  // "Світ" (поточне значення властивості)
console.log(input.getAttribute("value"));  // "Привіт" (початкове значення з HTML!)


/* ============================================================================
 * 2. ЧОТИРИ БАЗОВИХ МЕТОДИ ДЛЯ РОБОТИ З АТРИБУТАМИ
 * Працюють напряму з HTML-розміткою. Регістронезалежні.
 * ============================================================================ */

// 1. Отримати значення атрибута (завжди повертає String або null, якщо немає)
const typeValue = input.getAttribute("type"); // "text"

// 2. Встановити або змінити атрибут (перетворює значення на рядок)
input.setAttribute("placeholder", "Введіть ім'я...");
input.setAttribute("disabled", ""); // Для булевих атрибутів достатньо порожнього рядка

// 3. Перевірити наявність атрибута (повертає true / false)
if (input.hasAttribute("disabled")) {
  console.log("Поле заблоковане");
}

// 4. Видалити атрибут повністю з HTML
input.removeAttribute("disabled");


/* ============================================================================
 * 3. DATA-АТРИБУТИ (dataset) — ПРОДАКШЕН-СТАНДАРТ
 * Використовуються для збереження кастомних даних у розмітці (id, конфігурації).
 * ============================================================================ */

// HTML: data-user-id="42"  ->  JS: dataset.userId (кебаб-кейс стає camelCase!)
// HTML: data-is-admin="true" -> JS: dataset.isAdmin

// Читання:
const userId = input.dataset.userId; // "42" (УВАГА: це рядок! Для чисел роби Number())
const isAdmin = input.dataset.isAdmin === "true"; // Парсимо рядок у boolean

// Запис (автоматично додасть/змінить HTML-атрибут data-status="active"):
input.dataset.status = "active";

// Видалення data-атрибута:
delete input.dataset.status;


/* ============================================================================
 * 4. КЛАСИ (classList) — ПРАВИЛЬНА РОБОТА З АТРИБУТОМ class
 * Ніколи не змінюй input.className рядками вручну, використовуй classList.
 * ============================================================================ */

input.classList.add("active", "highlighted"); // Додати один або декілька класів
input.classList.remove("highlighted");        // Видалити клас
input.classList.toggle("hidden");             // Додає, якщо немає; видаляє, якщо є
const hasClass = input.classList.contains("active"); // Перевірка: true / false

// Заміна одного класу на інший:
input.classList.replace("form-control", "form-input");


/* ============================================================================
 * 5. ВЛАСТИВІСТЬ style (Inline-стилі)
 * Дозволяє динамічно змінювати CSS-властивості конкретного елемента.
 * ============================================================================ */

// Властивості пишуться в camelCase:
input.style.backgroundColor = "#f3f4f6";
input.style.border = "1px solid #059669";
input.style.marginTop = "10px";

// Очистити конкретний інлайн-стиль:
input.style.backgroundColor = "";


/* ============================================================================
 * 6. CHECKLIST ДЛЯ ДЖУНА:
 * 
 * 1. Для стандартних полів (id, value, href, checked) -> використовуй прямі властивості (el.id, el.value).
 * 2. Для кастомних даних поста/кнопки -> використовуй `data-*` та `el.dataset`.
 * 3. Для стилізації -> завжди керуй через `el.classList.add/remove/toggle`, а не через style.
 * 4. Пам'ятай, що `getAttribute` повертає `String`, тому `input.getAttribute('checked')`
 *    поверне `""`, а `input.checked` поверне `true`/`false`.
 * ============================================================================ */

const text = document.getElementById("text");
console.log(text);

// Атрибути елемента стають властивостями обєкта
// text.title = "new title";
console.log(text.id);

// Булеві атрибути
text.hidden = false;

//styles
text.style.color = "green";
text.style.backgroundColor = "black";

// Задання атрибутів через методи

let textStyle = `max-width: 50%;
    text-align: justify;
    line-height: 1.2rem;
    color: aquamarine;
    background-color: rgb(58, 44, 44);`;
text.setAttribute("style", textStyle);

// Зміна контенту елементу

// text.textContent = "new content";

console.log(document.querySelector("p"));