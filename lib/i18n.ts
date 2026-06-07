export type Lang = "he" | "en";

export const LANGS: Lang[] = ["he", "en"];
export const isRtl = (lang: Lang) => lang === "he";
export const otherLang = (lang: Lang): Lang => (lang === "he" ? "en" : "he");

const SITE = "https://weafex.com";
export function metaAlternates(lang: Lang, path: string) {
  return {
    canonical: `${SITE}/${lang}${path}`,
    languages: {
      he: `${SITE}/he${path}`,
      en: `${SITE}/en${path}`,
      "x-default": `${SITE}/he${path}`,
    },
  };
}

export const ROUTES = ["", "about", "product", "contact", "waitlist"] as const;
export type Route = (typeof ROUTES)[number];

type Meta = { title: string; description: string };
type Feature = { title: string; body: string };
type Item = { title: string; body: string };

export type FormContent = {
  nameLabel: string;
  purposeLabel: string;
  purposeOptions: string[];
  fieldLabel: string;
  phoneLabel: string;
  emailField: string;
  subjectLabel?: string;
  requiredHint: string;
  submit: string;
  confirmed: string;
};

export type Content = {
  dir: "rtl" | "ltr";
  nav: { home: string; about: string; product: string; contact: string; waitlist: string };
  waitlistBtn: { button: string; confirmed: string; note: string };
  toggle: { label: string; to: string };
  footer: { tagline: string; rights: string; prelaunch: string; nav: string; cookieSettings: string };

  home: {
    meta: Meta;
    hero: { eyebrow: string; headLead: string; headRest: string; sub: string; ctaPrimary: string; ctaSecondary: string };
    problem: { kicker: string; title: string; lead: string };
    solution: { kicker: string; title: string; lead: string };
    explore: { kicker: string; aboutTitle: string; aboutBody: string; aboutLink: string; productTitle: string; productBody: string; productLink: string };
    scrollLine: string;
    cta: { title: string; sub: string };
  };

  product: {
    meta: Meta;
    hero: { kicker: string; title: string; sub: string };
    featuresKicker: string;
    features: Feature[];
    verification: { kicker: string; title: string; body: string; points: string[] };
    can: { kicker: string; title: string; items: Item[] };
    cta: { title: string; sub: string };
  };

  about: {
    meta: Meta;
    hero: { kicker: string; title: string; sub: string };
    founder: { kicker: string; name: string; role: string; bio: string; photoNote: string };
    mission: { kicker: string; title: string; body: string };
    audience: {
      kicker: string;
      longTitle: string;
      longBody: string;
      shortTitle: string;
      shortBody: string;
      flow: { importersTitle: string; importersBody: string; exportersTitle: string; exportersBody: string; caption: string };
    };
    why: { kicker: string; title: string; body: string };
    cta: { title: string; sub: string };
  };

  contact: {
    meta: Meta;
    kicker: string;
    title: string;
    sub: string;
    emailLabel: string;
    email: string;
    waitlistLine: string;
    note: string;
    form: FormContent;
  };

  waitlist: {
    meta: Meta;
    kicker: string;
    title: string;
    sub: string;
    points: string[];
    note: string;
    form: FormContent;
  };

  cookie: { body: string; acceptAll: string; onlyEssential: string; policy: string; ariaLabel: string };

  privacy: {
    meta: Meta;
    kicker: string;
    title: string;
    intro: string;
    sections: { heading: string; body: string }[];
    updated: string;
  };
};

const EMAIL = "support@weafex.com";

const he: Content = {
  dir: "rtl",
  nav: { home: "בית", about: "אודות", product: "המוצר", contact: "צור קשר", waitlist: "Waiting List" },
  waitlistBtn: {
    button: "הצטרפו ל-Waiting List",
    confirmed: "תודה! נהיה בקשר ברגע שניפתח.",
    note: "בלי ספאם. עדכון אחד כשנהיה מוכנים.",
  },
  toggle: { label: "החלפת שפה", to: "EN" },
  footer: { tagline: "הרשת החברתית של הסחר הבינלאומי.", rights: "כל הזכויות שמורות.", prelaunch: "לפני השקה", nav: "ניווט", cookieSettings: "הגדרות עוגיות" },

  home: {
    meta: {
      title: "Weafex — הרשת החברתית של הסחר הבינלאומי",
      description:
        "Weafex היא הרשת החברתית של הסחר הבינלאומי, שמחברת ישירות יבואנים, יצואנים ושחקני מפתח מאומתים. שוק אטום הופך לרשת שקופה.",
    },
    hero: {
      eyebrow: "TradeTech",
      headLead: "הרשת החברתית",
      headRest: "של הסחר הבינלאומי",
      sub: "מקום אחד שבו כל היבואנים, היצואנים ושחקני המפתח של התחום נמצאים יחד, מאומתים, ומתחברים ישירות — בלי מתווכים, בלי לבזבז שבועות על חיפוש.",
      ctaPrimary: "הצטרפו ל-Waiting List",
      ctaSecondary: "איך זה עובד",
    },
    problem: {
      kicker: "הבעיה",
      title: "אף אחד לא רואה את כל השוק.",
      lead: "יבואנים ויצואנים תלויים בקשרים אישיים, בסוכנויות ובעמילי מכס — שחושפים רק פלח קטן מהשוק. כך עסקאות בשווי מיליונים פשוט לא קורות.",
    },
    solution: {
      kicker: "הפתרון",
      title: "כל השוק במקום אחד.",
      lead: "Weafex מחברת ישירות את כל היבואנים, היצואנים ושחקני המפתח — ברשת אחת מאומתת. שוק אטום הופך לרשת שקופה, שבה כל חיבור שווה את הזמן.",
    },
    explore: {
      kicker: "להכיר את Weafex",
      aboutTitle: "המשימה שלנו",
      aboutBody: "למה הקמנו את Weafex, למי היא נועדה, ולמה דווקא עכשיו.",
      aboutLink: "אודות",
      productTitle: "איך זה עובד",
      productBody: "איך Weafex נראית, מה עושים בה, ואיך האימות עובד.",
      productLink: "המוצר",
    },
    scrollLine:
      "במקום שכל אחד רואה רק את המעגל הסגור שלו, Weafex מחברת את כל השוק — ברשת אחת, שקופה ומאומתת.",
    cta: { title: "מתחברים לרשת לפני כולם.", sub: "Weafex תיפתח בקרוב. השאירו פרטים ותהיו מהראשונים שמתחברים." },
  },

  product: {
    meta: {
      title: "המוצר — Weafex",
      description:
        "איך Weafex עובדת: גילוי לפי מפה, פיד חברתי, שיחות ישירות, ופרופילים מאומתים של חברות. אמון שנבנה מאליו.",
    },
    hero: {
      kicker: "המוצר",
      title: "איך Weafex עובדת",
      sub: "Weafex מרגישה ועובדת כמו רשת חברתית מוכרת — רק שכאן כל מי שגולל הוא יבואן או יצואן מאומת. נכנסים עם מסמך שמוכיח שאתם בתחום, פותחים גלובוס שמראה איפה כל יבואן ויצואן בעולם שלכם, גוללים פיד של רילסים ממוצרים אמיתיים, פותחים פרופילי חברות ושולחים הודעה ישירה — בלי מתווכים, בלי שבועות של חיפוש.",
    },
    featuresKicker: "איך זה נראה",
    features: [
      { title: "גילוי לפי מפה", body: "האפליקציה נפתחת בתצוגת גלובוס שמראה איפה בעולם נמצאים היבואנים והיצואנים מהתחום שלכם. פותחים פרופיל של כל נקודה ישירות מהמפה, מסננים לפי תחום, ולצד המסך רואים Market Pulse — שערי מטבע וחדשות קצרות מהתחום בזמן אמת." },
      { title: "פיד חברתי", body: "גלילה מוכרת של סטורים, רילסים ופוסטים מחברות אמיתיות. עוקבים, מגיבים ועושים לייק — וכך מגלים מוצרים, ספקים ולקוחות תוך כדי שימוש יומיומי, לא רק כשמחפשים עסקה." },
      { title: "שיחות ישירות", body: "צ'אט בסגנון DM. כל יבואן פונה ישירות ליצואן וההפך — בלי תיווך של סוכנות או עמיל מכס." },
      { title: "פרופילים מאומתים של חברות", body: "הפרופיל הוא חלון לתוך החברה: נתוני שילוח פעילים, נכסים (לדוגמה, 40 משאיות בצי), תגי Verified Documentation שמאשרים את הנתונים, וההיסטוריה התוכנית של החברה. כך האמון נבנה מאליו, בלי שיחות בירור ארוכות." },
    ],
    verification: {
      kicker: "שכבת האימות",
      title: "אמון הוא הבסיס של Weafex",
      body: "כדי להיכנס לרשת, כל יבואן ויצואן מעלה מסמך רשמי שמוכיח את עיסוקו. עד שהמסמך מאושר, הגישה מוגבלת לצפייה בלבד — בלי שליחת הודעות, בלי שמות לקוחות, בלי פתיחת חיבורים. בדיוק כמו בלינקדאין: בלי אישור זהות, אין סטטוס מאומת. התוצאה היא רשת נקייה משחקנים לא רלוונטיים, ושיחה ראשונה שמתחילה מאמון ולא מספק.",
      points: [
        "כשאתם גוללים בפיד — כל מי שמופיע אמיתי, מאומת, ובתחום שלכם.",
        "כשאתם פותחים פרופיל חברה — הנתונים שבו עברו אימות.",
        "כשמישהו פונה אליכם — זה לא ספאם ולא איש לא רציני.",
      ],
    },
    can: {
      kicker: "מה אפשר לעשות",
      title: "ארבעה דברים, מהיום הראשון",
      items: [
        { title: "ליצור חיבורים חדשים", body: "מתחברים ליבואנים ויצואנים חדשים בעולם — להוזיל מחירים אם אתם יבואנים, או לפתוח שוק לקוחות חדש אם אתם יצואנים." },
        { title: "להתרחב לתחומים נוספים", body: "כשכל השוק נגיש, קל לזהות הזדמנויות מעבר לתחום שלכם. יבואן של מלפפונים יכול להיכנס בקלות גם לתחום העגבניות." },
        { title: "להגדיל את מעגל הקשרים", body: "בונים רשת מקצועית אורגנית בתחום שלכם — לא רק חיבור עסקי נקודתי." },
        { title: "לגלול רילסים מהתחום", body: "שימוש חברתי שהופך את Weafex לחלק מהיום-יום — לא רק כלי שפותחים כשצריך עסקה." },
      ],
    },
    cta: { title: "רוצים לראות את זה ראשונים?", sub: "Weafex תיפתח בקרוב. הצטרפו ל-Waiting List." },
  },

  about: {
    meta: { title: "אודות — Weafex", description: "המשימה של Weafex: לפתוח את שוק הסחר הבינלאומי ולתת לכל יבואן ויצואן גישה ישירה ושקופה לכלל השוק, ברשת אחת מאומתת." },
    hero: { kicker: "אודות", title: "About Weafex", sub: "חברת TradeTech צעירה, שבונה את הרשת החברתית של הסחר הבינלאומי — מקום אחד שבו כל היבואנים, היצואנים ושחקני המפתח מתחברים ישירות, מאומתים." },
    founder: {
      kicker: "המייסד",
      name: "אורי שמש",
      role: "מייסד ומנכ\"ל",
      bio: "אורי הוא המייסד של Weafex. הוא הוביל את החברה מהרעיון ועד המוצר — האפיון, העיצוב וחוויית המשתמש — מתוך אמונה שהשוק הגדול בעולם ראוי לכלי שנבנה במיוחד עבורו, ושסחר בינלאומי יכול וצריך להרגיש פשוט וטבעי כמו רשת חברתית.",
      photoNote: "תמונה",
    },
    mission: { kicker: "המשימה", title: "לפתוח את שוק הסחר הבינלאומי", body: "המטרה של Weafex היא לפתוח את שוק הסחר הבינלאומי, שעד היום עבד בערוצים סגורים, ולתת לכל יבואן וכל יצואן גישה ישירה ושקופה לכלל השוק — ברשת אחת מאומתת שמאפשרת לקנות בזול יותר, למכור ליותר לקוחות, ולהגדיל את הרווחיות." },
    audience: {
      kicker: "למי זה מיועד",
      longTitle: "כל שחקני הסחר",
      longBody: "כל היבואנים והיצואנים, יחד עם שחקני המפתח של הסחר הבינלאומי — סוכנויות, עמילי מכס ועוד. המטרה היא שוק יעיל ושקוף יותר עבור כולם.",
      shortTitle: "יבואן, יצואן, או שניהם",
      shortBody: "Weafex עובדת עבור שני צידי העסקה. כיבואן תמצאו ספקים חדשים וזולים יותר; כיצואן תפתחו שוק לקוחות חדש.",
      flow: {
        importersTitle: "יבואנים",
        importersBody: "מוצאים ספקים חדשים בעולם, וקונים בזול יותר.",
        exportersTitle: "יצואנים",
        exportersBody: "נפתחים לשוק לקוחות חדש מעבר למעגל הקיים.",
        caption: "הכול מתחבר ישירות — דרך Weafex.",
      },
    },
    why: { kicker: "למה עכשיו", title: "התחום עובר מעבר בין-דורי.", body: "הכוח הכלכלי זז מדור שעבד בטלפון, בפגישות פנים-אל-פנים ובקשרים אישיים — לדור חדש שגדל על רשתות חברתיות ומודד הכול בזמן שנחסך. זה הדור שיאמץ את Weafex בטבעיות. ובמקביל, Weafex לא דורשת מהדור הוותיק ללמוד טכנולוגיה חדשה — היא מרגישה כמו רשת חברתית מוכרת. זה הרגע שבו שני הדורות מאמצים אותה יחד." },
    cta: { title: "רוצים להיות חלק מזה?", sub: "Weafex תיפתח בקרוב. הצטרפו ל-Waiting List." },
  },

  contact: {
    meta: { title: "צור קשר — Weafex", description: "דברו איתנו. Weafex שמחה לשמוע מיבואנים, יצואנים ושותפים." },
    kicker: "צור קשר",
    title: "Contact us",
    sub: "שותפים, יבואנים, יצואנים או סתם סקרנים — נשמח לשמוע. כל פנייה מגיעה אלינו ישירות.",
    emailLabel: "אימייל",
    email: EMAIL,
    waitlistLine: "מעדיפים פשוט להתעדכן?",
    note: "כתובת האימייל תיכנס לפעולה עם ההשקה הרשמית.",
    form: {
      nameLabel: "שם מלא",
      purposeLabel: "מהי מטרת החיבור שלך איתנו?",
      purposeOptions: ["יבואן", "יצואן", "משקיע", "מחפש עבודה", "אחר"],
      fieldLabel: "מהו תחום העיסוק שלך?",
      phoneLabel: "מספר טלפון",
      emailField: "מייל",
      subjectLabel: "נושא",
      requiredHint: "נא לבחור אפשרות",
      submit: "שליחה",
      confirmed: "תודה! קיבלנו את הפנייה ונחזור אליך בהקדם.",
    },
  },

  waitlist: {
    meta: { title: "Waiting List — Weafex", description: "הצטרפו ל-Waiting List של Weafex ותהיו מהראשונים שמתחברים לרשת." },
    kicker: "טרם השקנו",
    title: "היו מהראשונים ברשת",
    sub: "אנחנו פותחים את Weafex בהדרגה. השאירו פרטים ונעדכן אתכם ברגע שהגישה נפתחת — בלי רעש ובלי ספאם.",
    points: ["מהראשונים שמקבלים גישה ל-Weafex", "מקום בקהילה הראשונה של הרשת", "השפעה על המוצר עוד לפני שהוא יוצא"],
    note: "בלי ספאם. עדכון אחד כשנהיה מוכנים.",
    form: {
      nameLabel: "שם מלא",
      purposeLabel: "מהי מטרת החיבור שלך איתנו?",
      purposeOptions: ["יבואן", "יצואן", "משקיע", "מחפש עבודה", "אחר"],
      fieldLabel: "מהו תחום העיסוק שלך?",
      phoneLabel: "מספר טלפון",
      emailField: "מייל",
      requiredHint: "נא לבחור אפשרות",
      submit: "הצטרפו ל-Waiting List",
      confirmed: "תודה! אתם ברשימה — נעדכן אתכם ברגע שניפתח.",
    },
  },

  cookie: {
    body: "אנחנו משתמשים בעוגיות כדי לשפר את החוויה באתר ולהבין כיצד משתמשים בו. אפשר לקבל את כל העוגיות או להסתפק בהכרחיות בלבד.",
    acceptAll: "אישור הכול",
    onlyEssential: "רק הכרחיות",
    policy: "מדיניות עוגיות",
    ariaLabel: "הודעת עוגיות",
  },

  privacy: {
    meta: { title: "מדיניות פרטיות ועוגיות — Weafex", description: "מדיניות הפרטיות והעוגיות של Weafex — איזה מידע נאסף, אילו עוגיות בשימוש, וכיצד לנהל את ההסכמה." },
    kicker: "פרטיות",
    title: "מדיניות פרטיות ועוגיות",
    intro: "Weafex מכבדת את פרטיותך. עמוד זה מסביר בקצרה איזה מידע אנו אוספים, אילו עוגיות בשימוש, וכיצד באפשרותך לנהל את ההסכמה שלך.",
    sections: [
      { heading: "אילו עוגיות בשימוש", body: "עוגיות הכרחיות נדרשות לתפעול האתר ולשמירת העדפות (כמו שפה והגדרות נגישות), והן פועלות תמיד. עוגיות אנליטיקה (Google Analytics) עוזרות לנו להבין כיצד משתמשים באתר, ונטענות רק לאחר קבלת הסכמתך." },
      { heading: "ניהול ההסכמה", body: "בכניסה הראשונה לאתר תוצג הודעת עוגיות. אפשר לבחור ב\u05f4אישור הכול\u05f4 או ב\u05f4רק הכרחיות\u05f4. ניתן לשנות או לבטל את הבחירה בכל עת דרך הקישור \u05f4הגדרות עוגיות\u05f4 בתחתית כל עמוד." },
      { heading: "המידע שאנחנו אוספים", body: "כשמשאירים פרטים בטופס יצירת הקשר או ב-Waiting List, אנו שומרים את הפרטים שמסרת כדי לחזור אליך. איננו מוכרים מידע אישי לצדדים שלישיים." },
      { heading: "יצירת קשר", body: "לשאלות בנושא פרטיות ועוגיות אפשר לפנות לכתובת support@weafex.com." },
    ],
    updated: "מדיניות זו עודכנה לאחרונה ביוני 2026.",
  },
};

const en: Content = {
  dir: "ltr",
  nav: { home: "Home", about: "About", product: "Product", contact: "Contact", waitlist: "Waiting List" },
  waitlistBtn: {
    button: "Join the Waiting List",
    confirmed: "Thanks! We'll be in touch the moment we open.",
    note: "No spam. One note when we're ready.",
  },
  toggle: { label: "Switch language", to: "עברית" },
  footer: { tagline: "The social network of international trade.", rights: "All rights reserved.", prelaunch: "Pre-launch", nav: "Navigate", cookieSettings: "Cookie settings" },

  home: {
    meta: {
      title: "Weafex — The Social Network of International Trade",
      description:
        "Weafex is the social network of international trade, directly connecting verified importers, exporters, and key players. An opaque market becomes a transparent network.",
    },
    hero: {
      eyebrow: "TradeTech",
      headLead: "The social network",
      headRest: "of international trade",
      sub: "One place where all the importers, exporters, and key players come together — verified, connecting directly. No middlemen, no weeks wasted searching.",
      ctaPrimary: "Join the Waiting List",
      ctaSecondary: "How it works",
    },
    problem: {
      kicker: "The problem",
      title: "No one sees the whole market.",
      lead: "Importers and exporters depend on personal contacts, agencies, and customs brokers — who only ever reveal a small slice of the market. So deals worth millions simply never happen.",
    },
    solution: {
      kicker: "The solution",
      title: "The whole market, in one place.",
      lead: "Weafex directly connects all importers, exporters, and key players — in one verified network. An opaque, inefficient market becomes transparent, where every connection is worth your time.",
    },
    explore: {
      kicker: "Get to know Weafex",
      aboutTitle: "Our mission",
      aboutBody: "Why we built Weafex, who it's for, and why now.",
      aboutLink: "About",
      productTitle: "How it works",
      productBody: "What Weafex looks like, what you do in it, and how verification works.",
      productLink: "Product",
    },
    scrollLine:
      "Instead of each player seeing only their own closed circle, Weafex connects the whole market — in one network, transparent and verified.",
    cta: { title: "Join the network before everyone else.", sub: "Weafex opens soon. Leave your details and be among the first to connect." },
  },

  product: {
    meta: {
      title: "Product — Weafex",
      description: "How Weafex works: discovery by map, a social feed, direct messages, and verified company profiles. Trust that builds itself.",
    },
    hero: {
      kicker: "The product",
      title: "How Weafex works",
      sub: "Weafex feels and works like a familiar social network — except everyone scrolling here is a verified importer or exporter. You join with a document proving you're in the field, open a globe that shows where every importer and exporter in your world is, scroll a feed of reels from real products, open company profiles, and send a direct message — no middlemen, no weeks of searching.",
    },
    featuresKicker: "How it looks",
    features: [
      { title: "Discovery by map", body: "The app opens on a globe view showing where the importers and exporters in your field are around the world. Open any point's profile straight from the map, filter by field, and see Market Pulse on the side — exchange rates and short industry news in real time." },
      { title: "Social feed", body: "A familiar scroll of stories, reels, and posts from real companies. Follow, comment, and like — discovering products, suppliers, and customers as part of your daily routine, not only when you're chasing a deal." },
      { title: "Direct messages", body: "DM-style chat. Every importer reaches an exporter directly, and the other way around — without an agency or customs broker in between." },
      { title: "Verified company profiles", body: "A profile is a window into the company: active shipping data, assets (for example, 40 trucks in the fleet), Verified Documentation badges that confirm the data, and the company's content history. Trust builds itself, without long vetting calls." },
    ],
    verification: {
      kicker: "The verification layer",
      title: "Trust is the foundation of Weafex",
      body: "To join the network, every importer and exporter uploads an official document proving what they do. Until it's approved, access is view-only — no messages, no customer names, no opening connections. Just like LinkedIn: no identity verification, no verified status. The result is a network clean of irrelevant players, and a first conversation that starts from trust, not doubt.",
      points: [
        "When you scroll the feed — everyone you see is real, verified, and in your field.",
        "When you open a company profile — its data has been verified.",
        "When someone reaches out — it's not spam, and not someone unserious.",
      ],
    },
    can: {
      kicker: "What you can do",
      title: "Four things, from day one",
      items: [
        { title: "Make new connections", body: "Connect with new importers and exporters worldwide — lower your costs as an importer, or open a new customer market as an exporter." },
        { title: "Expand into new fields", body: "When the whole market is accessible, it's easy to spot opportunities beyond your field. A cucumber importer can easily step into tomatoes too." },
        { title: "Grow your network", body: "Build an organic professional network in your field — not just a one-off business connection." },
        { title: "Scroll reels from your field", body: "A social habit that makes Weafex part of your day — not just a tool you open when you need a deal." },
      ],
    },
    cta: { title: "Want to see it first?", sub: "Weafex opens soon. Join the Waiting List." },
  },

  about: {
    meta: { title: "About — Weafex", description: "Weafex's mission: to open the international trade market and give every importer and exporter direct, transparent access to the whole market, in one verified network." },
    hero: { kicker: "About", title: "About Weafex", sub: "A young TradeTech company building the social network of international trade — one place where all importers, exporters, and key players connect directly, verified." },
    founder: {
      kicker: "Founder",
      name: "Ori Shemesh",
      role: "Founder & CEO",
      bio: "Ori is the founder of Weafex. He led the company from idea to product — the spec, the design, and the experience — out of a belief that the world's largest market deserves a tool built for it, and that international trade can and should feel as simple and natural as a social network.",
      photoNote: "Photo",
    },
    mission: { kicker: "Mission", title: "Open the international trade market", body: "Weafex's goal is to open the international trade market — which until now has run through closed channels — and give every importer and exporter direct, transparent access to the whole market, in one verified network that lets them buy cheaper, sell to more customers, and grow profitability." },
    audience: {
      kicker: "Who it's for",
      longTitle: "Everyone in trade",
      longBody: "All importers and exporters, together with the key players of international trade — agencies, customs brokers, and more. The goal is a more efficient, transparent market for everyone.",
      shortTitle: "Importer, exporter, or both",
      shortBody: "Weafex works for both sides of the deal. As an importer you find new, cheaper suppliers; as an exporter you open a new customer market.",
      flow: {
        importersTitle: "Importers",
        importersBody: "Find new suppliers worldwide, and buy cheaper.",
        exportersTitle: "Exporters",
        exportersBody: "Open a new customer market beyond your existing circle.",
        caption: "It all connects directly — through Weafex.",
      },
    },
    why: { kicker: "Why now", title: "The industry is going through a generational shift.", body: "Economic power is moving from a generation that did business over the phone, in face-to-face meetings and personal relationships — to a new generation that grew up on social media and measures everything in time saved. That's the generation that will adopt Weafex naturally. And Weafex doesn't ask the older generation to learn new technology — it feels like a social network they already know. This is the moment both generations adopt it together." },
    cta: { title: "Want to be part of it?", sub: "Weafex opens soon. Join the Waiting List." },
  },

  contact: {
    meta: { title: "Contact — Weafex", description: "Get in touch. Weafex is glad to hear from importers, exporters, and partners." },
    kicker: "Contact",
    title: "Contact us",
    sub: "Partners, importers, exporters, or just curious — we'd love to hear from you. Every message reaches us directly.",
    emailLabel: "Email",
    email: EMAIL,
    waitlistLine: "Prefer to just stay in the loop?",
    note: "The email address goes live at official launch.",
    form: {
      nameLabel: "Full name",
      purposeLabel: "What's the purpose of reaching out?",
      purposeOptions: ["Importer", "Exporter", "Investor", "Job seeker", "Other"],
      fieldLabel: "What's your field?",
      phoneLabel: "Phone number",
      emailField: "Email",
      subjectLabel: "Subject",
      requiredHint: "Please choose an option",
      submit: "Send",
      confirmed: "Thanks! We've got your message and will get back to you soon.",
    },
  },

  waitlist: {
    meta: { title: "Waiting List — Weafex", description: "Join the Weafex Waiting List and be among the first to connect to the network." },
    kicker: "Pre-launch",
    title: "Be among the first on the network",
    sub: "We're opening Weafex gradually. Leave your details and we'll let you know the moment access opens — no noise, no spam.",
    points: ["Among the first to get access to Weafex", "A place in the network's first community", "A say in the product before it ships"],
    note: "No spam. One note when we're ready.",
    form: {
      nameLabel: "Full name",
      purposeLabel: "What's the purpose of reaching out?",
      purposeOptions: ["Importer", "Exporter", "Investor", "Job seeker", "Other"],
      fieldLabel: "What's your field?",
      phoneLabel: "Phone number",
      emailField: "Email",
      requiredHint: "Please choose an option",
      submit: "Join the Waiting List",
      confirmed: "Thanks! You're on the list — we'll let you know the moment we open.",
    },
  },

  cookie: {
    body: "We use cookies to improve your experience and understand how the site is used. You can accept all cookies or keep only the essential ones.",
    acceptAll: "Accept all",
    onlyEssential: "Only essential",
    policy: "Cookie policy",
    ariaLabel: "Cookie notice",
  },

  privacy: {
    meta: { title: "Privacy & Cookie Policy — Weafex", description: "Weafex privacy and cookie policy — what we collect, which cookies we use, and how to manage your consent." },
    kicker: "Privacy",
    title: "Privacy & Cookie Policy",
    intro: "Weafex respects your privacy. This page briefly explains what information we collect, which cookies we use, and how you can manage your consent.",
    sections: [
      { heading: "Which cookies we use", body: "Essential cookies are required to run the site and remember your preferences (such as language and accessibility settings), and are always active. Analytics cookies (Google Analytics) help us understand how the site is used and load only after you give consent." },
      { heading: "Managing your consent", body: "On your first visit a cookie notice appears. You can choose \u201cAccept all\u201d or \u201cOnly essential\u201d. You can change or withdraw your choice at any time via the \u201cCookie settings\u201d link in the footer of every page." },
      { heading: "Information we collect", body: "When you submit the contact or Waiting List form, we keep the details you provide so we can get back to you. We do not sell personal information to third parties." },
      { heading: "Contact", body: "For privacy and cookie questions, contact support@weafex.com." },
    ],
    updated: "This policy was last updated in June 2026.",
  },
};

export const content: Record<Lang, Content> = { he, en };
