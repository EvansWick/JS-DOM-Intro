"use strict";

// Model
class User {
  constructor(
    fName,
    lName,
    address,
    contacts,
    userCardBanner,
    photo,
    userName,
    isOnline,
    dateOfBirth,
    job,
    shortInformation,
    links,
  ) {
    this._userCardBanner = userCardBanner;
    this._firstName = fName;
    this._lastName = lName;
    this._address = address;
    this._contacts = contacts;
    this._photo = photo;
    this._userName = userName;
    this._isOnline = isOnline;
    this._dateOfBirth = dateOfBirth;
    this._job = job;
    this._shortInformation = shortInformation;
    this._links = links;
  }
}

// ViewModel
class UserCard {
  static operatorsList = new Map([
    // Kyivstar
    ["+38067", "Kyivstar"],
    ["+38068", "Kyivstar"],
    ["+38096", "Kyivstar"],

    // Vodafone
    ["+38050", "Vodafone"],
    ["+38066", "Vodafone"],
    ["+38095", "Vodafone"],
    ["+38099", "Vodafone"],
    [
      // lifecell
      ("+38063", "lifecell"),
    ],
    ["+38073", "lifecell"],
    ["+38093", "lifecell"],
  ]);

  constructor(
    userCardsElements,
    user,
    likes,
    watchings,
    isTracked,
    isLiked,
    isContactsHidden,
    currentSection,
  ) {
    this.userCardsElements = userCardsElements; // links to elements on page
    this.newUser = user; // user for generations card information
    this._likes = likes;
    this._watchings = watchings;
    this._isTracked = isTracked;
    this._isLiked = isLiked;
    this._isContactsHidden = isContactsHidden;
    this._currentSection = currentSection;
    this.logs = [];
    this.phoneOperator = this.operator;

    this.initEvents();
  }

  get user() {
    return this._user;
  }
  set newUser(user) {
    if (!(user instanceof User)) {
      throw new TypeError("Expected instance of User!");
    }
    this._user = user;
  }

  // Гетер для одноразової ініціалізації
  get operator() {
    const phone = this._user._contacts.phoneNumber;
    const op = UserCard.operatorsList.get(phone.slice(0, 6));
    if (op) {
      return op;
    }
    return "Undefined operator";
  }

  // Logs function
  addToLogs(message) {
    const newLog = `> ${message}\n`;
    this.logs.push(newLog);
    this.render();
  }

  subscribeUnsubscribe = (event) => {
    if (this._isTracked) {
      this._isTracked = false;
      this.addToLogs(`Remove subscriber`);
    } else {
      this._isTracked = true;
      this.addToLogs(`Add subscriber`);
    }

    this.render();
  };

  showContacts = (event) => {
    this.userCardsElements.elements["alertModal"].showModal();
    this.addToLogs(`Show contacts`);
  };

  hideContactsThroughBtn = (event) => {
    this.userCardsElements.elements["alertModal"].close();
    this.addToLogs(`Hide contacts`);
  };

  hideContactsThroughModal = (event) => {
    if (event.target === this.userCardsElements.elements["alertModal"]) {
      this.userCardsElements.elements["alertModal"].close();
      this.addToLogs("Close contacts");
    }
  };

  likeAction = (event) => {
    const likesCountInBtn = this.userCardsElements.elements["likesCount"];
    const imgInBtn = this.userCardsElements.elements["likeImg"];

    if (!this._isLiked) {
      // imgInBtn.src = "./assets/img/heart (1).png";
      this._isLiked = true;
      // console.log(likesCountInBtn);
      ++this._likes;
    } else {
      // imgInBtn.src = "./assets/img/heart.png";
      this._isLiked = false;
      --this._likes;
    }
    // Logs
    this.addToLogs(`${this._isLiked ? "Add like" : "Remove like"}`);
    this.render();
  };

  switchSection = (event) => {
    const sectionsFather = this.userCardsElements.elements["sections"];
    const allSectionsLinks = sectionsFather.querySelectorAll(
      ".user-card-sections-item-link",
    );

    if (event.target === sectionsFather) return;
    event.preventDefault();
    if (this._currentSection === event.target.dataset.section) return;

    allSectionsLinks.forEach((item) => {
      if (item !== event.target) {
        item.classList.remove("section-active");
      } else {
        item.classList.add("section-active");
        this._currentSection = item.dataset.section;
        this.addToLogs(`Switched to "${item.dataset.section}" section`);
      }
    });

    // console.log(event.target);
  };

  checkPhoneOperator = (event) => {
    this.userCardsElements.elements["userInformation-Phone"].querySelector(
      "span",
    ).textContent =
      `[${this.phoneOperator}] 📞 ` + this._user._contacts.phoneNumber;
  };

  hidePhoneOperator = (event) => {
    this.userCardsElements.elements["userInformation-Phone"].querySelector(
      "span",
    ).textContent = "📞 " + this._user._contacts.phoneNumber;
  };

  // Ініціалізація івентів елементів
  initEvents() {
    const els = this.userCardsElements.elements;
    this.userCardsElements.addEvent(
      els["subscribeBtn"],
      "click",
      this.subscribeUnsubscribe,
    );

    this.userCardsElements.addEvent(
      els["showContactsBtn"],
      "click",
      this.showContacts,
    );

    this.userCardsElements.addEvent(
      els["userInformation-CloseBtn"],
      "click",
      this.hideContactsThroughBtn,
    );

    this.userCardsElements.addEvent(
      els["alertModal"],
      "click",
      this.hideContactsThroughModal,
    );

    this.userCardsElements.addEvent(els["likeBtn"], "click", this.likeAction);

    this.userCardsElements.addEvent(
      els["sections"],
      "click",
      this.switchSection,
    );
    this.userCardsElements.addEvent(
      els["userInformation-Phone"],
      "mouseenter",
      this.checkPhoneOperator,
    );
    this.userCardsElements.addEvent(
      els["userInformation-Phone"],
      "mouseleave",
      this.hidePhoneOperator,
    );
  }

  render() {
    const els = this.userCardsElements.elements;
    const user = this._user;

    if (!user) return;

    // 1. Медіа та зображення
    if (els["userBanner"]) els["userBanner"].src = user._userCardBanner;
    if (els["userPhoto"]) els["userPhoto"].src = user._photo;

    // 2. Статус онлайн
    if (els["isUserOnline"]) {
      els["isUserOnline"].style.display = user._isOnline ? "block" : "none";
    }

    // 3. Текстові дані користувача
    if (els["userName"]) {
      els["userName"].textContent = `${user._firstName} ${user._lastName}`;
    }
    if (els["userNick"]) {
      els["userNick"].textContent = user._userName.startsWith("@")
        ? user._userName
        : `@${user._userName}`;
    }
    if (els["userShortInformation"]) {
      els["userShortInformation"].textContent = user._shortInformation;
    }
    if (els["userLocation"]) {
      els["userLocation"].textContent =
        `${user._address.country}, ${user._address.city}`;
    }

    // 4. Лайки та стан кнопки підписки
    if (els["likesCount"]) {
      els["likesCount"].textContent = this._likes;
    }
    if (els["likeImg"]) {
      els["likeImg"].src = this._isLiked
        ? "./assets/img/heart (1).png"
        : "./assets/img/heart.png";
    }

    if (els["subscribeBtn"]) {
      els["subscribeBtn"].textContent = this._isTracked
        ? "✔ Відслідковується"
        : "+ Слідкувати";
      els["subscribeBtn"].classList.toggle(
        "user-card-SubscribEDButton",
        this._isTracked,
      );
    }

    // 5. Контактні дані у модальному вікні
    if (user._contacts) {
      if (els["userInformation-Phone"] && user._contacts.phoneNumber) {
        els["userInformation-Phone"].href = `tel:${user._contacts.phoneNumber}`;
        els["userInformation-Phone"].querySelector("span").textContent =
          `📞 ${user._contacts.phoneNumber}`;
      }
      if (els["userInformation-Email"] && user._contacts.email) {
        els["userInformation-Email"].href = `mailto:${user._contacts.email}`;
        els["userInformation-Email"].querySelector("span").textContent =
          `✉️ ${user._contacts.email}`;
      }
    }

    // 6 Дата народження в модальному вікні
    if (user._dateOfBirth) {
      els["userBirth-Day"].textContent =
        `${user._dateOfBirth.getDate() < 10 ? "0" + user._dateOfBirth.getDate() : user._dateOfBirth.getDate()}`;
      els["userBirth-Month"].textContent =
        `${user._dateOfBirth.getMonth() < 10 ? "0" + (+user._dateOfBirth.getMonth() + 1) : +user._dateOfBirth.getMonth() + 1}`;
      els["userBirth-Year"].textContent = user._dateOfBirth.getFullYear();
    }

    // 7. Активна секція навігації
    if (els["sections"]) {
      const allLinks = els["sections"].querySelectorAll(
        ".user-card-sections-item-link",
      );
      allLinks.forEach((link) => {
        link.classList.toggle(
          "section-active",
          link.dataset.section === this._currentSection,
        );
      });
    }

    // 8 Динамічна генерація title
    const titleAtr = `Виповнюється в цьому році: ${new Date().getFullYear() - user._dateOfBirth.getFullYear()}`;
    // може бути більш точна логіка підрахунку років включаючи місяці
    els["userBirth-Title"].setAttribute("title", titleAtr);

    // Додання логів
    if (this.logs) {
      const cons = this.userCardsElements.elements["userLogs"];
      cons.textContent = "";
      for (const el of this.logs) {
        const li = document.createElement("li");
        li.textContent = el;
        cons.prepend(li);
      }
    }
  }
}

// View
class UserCardView {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.elements = {};
    this.rootElement.querySelectorAll("[data-bind]").forEach((it) => {
      const key = it.dataset.bind;
      this.elements[key] = it;
    });
  }

  addEvent(element, eventType, callback) {
    element.addEventListener(eventType, callback);
  }
}

// tests
const userEvans = new User(
  "Evans",
  "Wick",
  { city: "Київ", country: "Україна" },
  { email: "test@mail.com", phoneNumber: "+380963456720" },
  "https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg",
  "https://i.pinimg.com/736x/b3/a6/fc/b3a6fc241de39a360c0d92d4724b8535.jpg",
  "EvansWick",
  true,
  new Date(2004, 4, 31),
  "Fullstack js developer",
  "true man.",
  {
    telegram: "@EvansWick",
    Instagram: "@EwansWick",
    Watsap: "+380933456720",
  },
);

const pageElements = new UserCardView(document.querySelector("article"));

const cardEvans = new UserCard(
  pageElements,
  userEvans,
  0,
  0,
  true,
  false,
  false,
  "profileSectionLink",
);

cardEvans.render();

const response = {
  data: {
    user: {
      id: 101,
      firstName: "Іван",
      lastName: "Маслюков",
      userName: "Evans",
      description: "some description",
      job: "someJob",
      age: 28,
      isOnline: true,
      address: {
        city: "Київ",
        country: "Україна",
      },
      contacts: {
        email: "test@mail.com",
        phoneNumber: "+3801234567",
      },
      social: {
        telegram: "@EvansWick",
        Instagram: "@EwansWick",
        Watsap: "3801234567",
      },
      skills: [
        { id: 1, title: "HTML", level: "advanced" },
        { id: 2, title: "CSS", level: "advanced" },
        { id: 3, title: "JavaScript", level: "intermediate" },
        { id: 4, title: "React", level: "beginner" },
      ],
      projects: [
        {
          id: 1,
          name: "Landing Page",
          technologies: ["HTML", "CSS"],
        },
        {
          id: 2,
          name: "Todo App",
          technologies: ["JavaScript", "HTML"],
        },
      ],
    },
    userCard: {
      likes: 0,
      Watchings: 0,
      isSubscribed: false,
      isLiked: false,
      doHideUserContacts: true,
      currentSection: "profile",
    },
  },
};
