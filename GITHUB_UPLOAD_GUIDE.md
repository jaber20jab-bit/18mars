# 📤 دليل رفع المشروع على GitHub من المتصفح

## الخطوة 1: إنشاء مستودع جديد

1. اذهب إلى [GitHub.com](https://github.com) وسجّل دخولك
2. اضغط على زر **+** في الزاوية العلوية اليمين
3. اختر **New repository**

![New Repository](https://help.github.com/assets/images/help/repository/repo-create.png)

4. في صفحة إنشاء المستودع:
   - **Repository name**: اكتب `my-blog` (أو أي اسم تفضله)
   - **Description**: اكتب `مدونة شخصية لمقالات ومذكرات`
   - اختر **Public**
   - لا تختر أي خيارات إضافية
5. اضغط **Create repository**

---

## الخطوة 2: رفع الملفات

بعد إنشاء المستودع، ستظهر لك صفحة فارغة. اتبع التالي:

### الطريقة الأولى: رفع ملف واحد

1. في صفحة المستودع، اضغط على رابط **upload an existing file**

![Upload](https://help.github.com/assets/images/help/repository/upload-files-button.png)

2. اسحب وأفلت جميع ملفات المشروع (الملفات في المجلد `18mars`):
   - `index.html`
   - `article.html`
   - `about.html`
   - `archive.html`
   - مجلد `css/` (اسحب المجلد كاملاً)
   - مجلد `js/` (اسحب المجلد كاملاً)

3. في خانة **Commit changes**:
   - اكتب رسالة: `Initial commit - مدونة شخصية`
4. اضغط **Commit changes**

---

## الخطوة 3: تفعيل GitHub Pages

1. في صفحة المستودع، اضغط على تبويب **Settings**

![Settings](https://help.github.com/assets/images/help/repository/settings-tab.png)

2. في القائمة الجانبية اليسرى، اضغط على **Pages**

![Pages](https://help.github.com/assets/images/help/pages/pages-tab.png)

3. في قسم **Build and deployment**:
   - **Source**: اختر **Deploy from a branch**
   - **Branch**: اختر **main** (أو **master**)
   - **Folder**: اختر **/(root)**
4. اضغط **Save**

---

## الخطوة 4: الحصول على رابط الموقع

1. انتظر 1-2 دقيقة حتى يتم النشر
2. ارجع للتبويب **Pages**
3. ستجد رابط موقعك في أعلى الصفحة:
   ```
   Your site is live at https://username.github.io/my-blog/
   ```

---

## 💡 ملاحظات مهمة

- استبدل `username` باسم المستخدم الخاص بك في GitHub
- الرابط يستغرق بعض الوقت حتى يظهر لأول مرة
- إذا غيّرت أي ملف لاحقاً، يجب إعادة رفعه وتفعيل GitHub Pages مجدداً

---

## ✅ قائمة الملفات المطلوب رفعها

تأكد من رفع هذه الملفات بالترتيب:

```
📁 مجلد المشروع/
├── 📄 index.html
├── 📄 article.html
├── 📄 about.html
├── 📄 archive.html
├── 📁 css/
│   ├── 📄 variables.css
│   ├── 📄 base.css
│   ├── 📄 layout.css
│   ├── 📄 components.css
│   ├── 📄 article.css
│   └── 📄 dark-mode.css
└── 📁 js/
    ├── 📄 theme.js
    ├── 📄 reading.js
    └── 📄 app.js
```

---

## 🔧 إذا أردت تحديث الموقع لاحقاً

1. اذهب إلى صفحة المستودع على GitHub
2. اضغط على زر **Add file**
3. اختر **Upload files**
4. ارفع الملفات المحدثة
5. اكتب رسالة commit
6. اضغط **Commit changes**
7. انتظر دقيقتين حتى يتم التحديث

---

**موقعك سيكون متاحاً على شكل:** `https://اسم-المستخدم.github.io/اسم-المستودع/`

مثال: `https://ahmed.github.io/my-blog/`
