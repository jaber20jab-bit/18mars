# 📋 خطة البناء الاحترافية - مدونة شخصية

## نظرة عامة على المشروع

**اسم المشروع**: مدونة قراءة ونشر شخصية  
**الهدف**: بناء موقع نشر مذكرات ومقالات شخصي يستنسخ تصميم elrond.framer.website بدقة مع ميزات قراءة متقدمة  
**الاستضافة**: GitHub Pages (مجاني - بدون build)  
**التصميم**: داكن OLED مع لمسات من الموقع المرجعي

---

## القيود التقنية

| القيود | التفاصيل |
|--------|----------|
| ✅ مسموح | Vanilla HTML5 + CSS3 + Vanilla JavaScript |
| ✅ مسموح | جميع الملفات تعمل مباشرة على GitHub Pages |
| ⛔ ممنوع | JavaScript Framework (React, Vue, Svelte) |
| ⛔ ممنوع | CSS Framework (Tailwind, Bootstrap) |
| ⛔ ممنوع | npm أو package manager أو build tool |
| ⛔ ممنوع | أي مكتبة JS خارجية (jQuery ممنوع) |

---

## هيكل الملفات

```
/
├── index.html              ← الصفحة الرئيسية
├── article.html            ← template صفحة قراءة المقال
├── about.html              ← صفحة التعريف بالكاتب
├── archive.html            ← أرشيف المقالات
├── css/
│   ├── variables.css       ← CSS Custom Properties
│   ├── base.css            ← Reset + Global styles + RTL
│   ├── layout.css          ← Grid + Containers + Responsive
│   ├── components.css      ← Navbar, Cards, Buttons, Footer
│   ├── article.css        ← أنماط صفحة القراءة
│   └── dark-mode.css       ← OLED Dark Mode
└── js/
    ├── theme.js            ← Dark/Light toggle + localStorage
    ├── reading.js          ← Progress bar + TOC + Scroll spy
    └── app.js              ← التفاعلات العامة
```

---

## وصف الصفحات

### 1. index.html - الصفحة الرئيسية

**المكونات:**
- [Fixed Navbar](#navabr) منسوخ من elrond.framer.website
- [Hero Section](#hero) مع تكييفه للمدونة
- قسم "أحدث المقالات" ببطاقات
- Footer بسيط

**مثال Hero:**
```
┌─────────────────────────────────────────┐
│  ✦ مدونتي              المقالات  من أنا  │  ← Fixed Navbar
├─────────────────────────────────────────┤
│                                         │
│   مرحباً في مدونتي                        │
│   هنا أكتب أفكاري ومذكراتي               │
│   ─────────────────────                 │
│   [ابدأ القراءة]                         │
│                                         │
├─────────────────────────────────────────┤
│   أحدث المقالات                          │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│   │ مقال 1  │ │ مقال 2  │ │ مقال 3  │   │
│   └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

### 2. article.html - صفحة قراءة المقال

**المكونات:**
- شريط تقدم القراءة (Reading Progress Bar)
- Header المقال: العنوان + التاريخ + وقت القراءة + الوسوم
- جدول المحتويات (TOC) يتولّد تلقائياً
- نص المقال بتايبوغرافي مُحسّن
- أدوات القراءة (تكبير الخط، مشاركة)
- زر العودة لأعلى

**ميزاتب القراءة المتقدمة:**
- ✅ OLED Dark Mode (خلفية #000000)
- ✅ تبديل سلس بين الوضعين (300ms transition)
- ✅ خط عربي IBM Plex Arabic
- ✅ line-height: 2.0 للنصوص العربية
- ✅ دعم كامل RTL
- ✅ Reading Progress Bar (RTL direction)
- ✅ Estimated Reading Time (200 كلمة/دقيقة)
- ✅ Auto-generated TOC من H2/H3
- ✅ Scroll Spy للعنصر النشط
- ✅ Font Size Control (3 مستويات + localStorage)
- ✅ Back to Top Button

### 3. about.html - صفحة التعريف بالكاتب

**المكونات:**
- صورة شخصية/الوصف
- نبذة تعريفية
- روابط التواصل الاجتماعي
- إحصائيات (عدد المقالات، المساهمة، إلخ)

### 4. archive.html - أرشيف المقالات

**المكونات:**
- قائمة بجميع المقالات
- فلتر حسب التصنيف
- ترتيب حسب التاريخ

---

## نظام الألوان

### Light Mode (مستوحى من elrond.framer.website)
```css
:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #141414;
  --bg-card: #1A1A1A;
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-muted: #6B6B6B;
  --accent: #FF6B35;
  --accent-hover: #FF8C42;
  --border-color: #2A2A2A;
  --success: #4ADE80;
  --error: #F87171;
}
```

### OLED Dark Mode
```css
[data-theme="dark"] {
  --bg-primary: #000000;
  --bg-secondary: #0D0D0D;
  --bg-card: #111111;
  --text-primary: #F0F0F0;
  --text-secondary: #8A8A8A;
  --border-color: #1E1E1E;
}
```

---

## CSS Architecture

### 1. variables.css
```css
:root {
  /* الألوان */
  --bg-primary: #0A0A0A;
  --accent: #FF6B35;
  
  /* Typography */
  --font-heading: 'IBM Plex Arabic', sans-serif;
  --font-body: 'IBM Plex Arabic', sans-serif;
  --font-size-base: 16px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Layout */
  --max-width: 1200px;
  --content-width: 800px;
  --header-height: 70px;
  
  /* Effects */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --border-radius: 12px;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
```

### 2. base.css
- CSS Reset (margin: 0, padding: 0, box-sizing: border-box)
- Global styles
- RTL support (direction: rtl, text-align: right)
- Base typography
- Link styles
- Image styles

### 3. layout.css
- Container classes
- Grid system
- Flexbox utilities
- Responsive breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### 4. components.css
- Navbar (fixed, transparent, with scroll effect)
- Cards (article cards, stats cards)
- Buttons (primary, secondary, icon buttons)
- Badges/Tags
- Footer

### 5. article.css
- Article header styles
- Typography for article content
- TOC styles (sticky sidebar)
- Reading tools styles
- Code block styles (if needed)

### 6. dark-mode.css
- Theme-specific overrides
- Smooth transitions
- High contrast adjustments

---

## JavaScript Architecture

### 1. theme.js (يُحمَّل في \<head\>)
```javascript
// يفحص localStorage ويحفظ التفضيل
// يطبق الـ theme قبل تحميل الصفحة (لتجنب flash)
// يوفر دالة toggleTheme()
```

### 2. reading.js
```javascript
// ReadingProgressBar: يحسب نسبة التمرير
// ReadingTime: يحسب وقت القراءة (200 كلمة/دقيقة)
// TableOfContents: ينشئ TOC من H2/H3
// ScrollSpy: يضيء العنصر النشط في TOC
// FontSizeController: يدير 3 مستويات مع localStorage
// BackToTop: يظهر/يخفي زر العودة
```

### 3. app.js
```javascript
// Navbar scroll effect
// Mobile menu toggle
// Animation on scroll
// Smooth scroll to anchors
```

---

## التصميم المتجاوب

### Mobile-first
```css
/* Mobile (default) */
.article-grid {
  grid-template-columns: 1fr;
}

/* Tablet */
@media (min-width: 768px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .article-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Navigation على الجوال
- يصبح الهامبرغر menu
- القائمة تنزل من الأعلى
- Overlay داكن للخلفية

---

## المحتوى التجريبي

### index.html
4 بطاقات مقالات:
1. "تأملات في صباح الربيع" - 5 دقائق
2. "كيف بدأت رحلتي في البرمجة" - 8 دقائق
3. "أفضل الكتب التي قرأتها هذا العام" - 6 دقائق
4. "مهارات التواصل الفعّال" - 7 دقائق

### article.html
مقال عربي كامل (>700 كلمة) مع:
- 3+ عناوين H2
- 6+ عناوين H3
- فقرات نصية كافية

### about.html
نبذة شخصية تجريبية (~150 كلمة)

---

## خطوات التنفيذ

### الخطوة 1: إنشاء المجلدات
```
mkdir -p css js
```

### الخطوة 2: إنشاء ملفات CSS
1. `variables.css` - المتغيرات
2. `base.css` - الأساسيات
3. `layout.css` - التخطيط
4. `components.css` - المكونات
5. `article.css` - المقالات
6. `dark-mode.css` - الوضع الداكن

### الخطوة 3: إنشاء ملفات JS
1. `theme.js` - الثيمات
2. `reading.js` - ميزات القراءة
3. `app.js` - التفاعلات

### الخطوة 4: إنشاء ملفات HTML
1. `index.html` - الصفحة الرئيسية
2. `article.html` - صفحة المقال
3. `about.html` - من أنا
4. `archive.html` - الأرشيف

---

## التحقق النهائي

- [ ] جميع الروابط النسبية صحيحة
- [ ] Dark/Light toggle يعمل
- [ ] RTL مطبق على جميع العناصر
- [ ] الموقع يفتح مباشرة في المتصفح
- [ ] جميع CSS variables معرّفة
- [ ] Mobile menu يعمل
- [ ] TOC يتولد تلقائياً
- [ ] شريط التقدم يعمل
- [ ] وقت القراءة دقيق

---

## تحسينات مستقبلية

1. **تحسين الأداء**: ضغط CSS/JS
2. **SEO**: meta tags، sitemap
3. **إمكانية الوصول**: ARIA labels، تباين الألوان
4. **تحليلات**: Google Analytics
5. **بحث**: إضافة صفحة بحث

---

**ملاحظة**: هذه الخطة قابلة للتعديل حسب الحاجة أثناء التنفيذ.
