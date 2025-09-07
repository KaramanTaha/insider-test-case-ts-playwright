# Insider Career Automation Test Suite 🚀

Bu proje, Insider web sitesinin kariyer sayfalarını test etmek için **Playwright** ve **TypeScript** kullanarak geliştirilmiş kapsamlı bir otomasyon test paketidir. **Page Object Model (POM)** tasarım deseni uygulanmıştır.

## ✨ Özellikler

- 🎯 **5 Farklı Test Senaryosu** - Insider kariyer sayfalarının tam kapsamlı testi
- 🖥️ **Çoklu Tarayıcı Desteği** - Chromium, Firefox, WebKit
- 📱 **Responsive Tasarım** - Fullscreen mod desteği
- 🍪 **Otomatik Cookie Yönetimi** - Cookie banner'larının otomatik kabulü
- 📊 **Detaylı Raporlama** - HTML test raporları
- 🏗️ **POM Tasarım Deseni** - Bakımı kolay ve yeniden kullanılabilir kod
- ⚡ **Paralel Test Çalıştırma** - Hızlı test yürütme

## 📋 Test Senaryoları

### 1. 🏠 Ana Sayfa Kontrolü
- Insider ana sayfasının başarılı yüklenmesi
- Sayfa elementlerinin doğrulanması

### 2. 🏢 Kariyer Sayfası Navigasyonu
- Company menüsünden Careers seçim işlemi
- Kariyer sayfasındaki tüm blokların kontrolü:
  - Locations (Konumlar)
  - Teams (Takımlar)
  - Life at Insider (Insider'da Hayat)

### 3. 🔍 QA İş İlanları Filtreleme
- QA kariyer sayfasına navigasyon
- İş ilanlarının filtrelenmesi
- İstanbul, Türkiye lokasyonu için QA departmanı

### 4. ✅ İş İlanı Detay Doğrulama
- Tüm pozisyonların "Quality Assurance" içermesi
- Departman bilgilerinin doğruluğu
- Lokasyon bilgilerinin doğruluğu

### 5. 📝 Başvuru Formu Yönlendirmesi
- "View Role" butonuna tıklama
- Başvuru formuna başarılı yönlendirme

## 🛠️ Teknoloji Stack

- **Playwright** - Modern web otomasyon framework'ü
- **TypeScript** - Tip güvenliği
- **Page Object Model** - Bakımı kolay test tasarımı
- **Node.js** - Runtime environment
- **npm** - Paket yönetimi

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- npm
- Git

## 🚀 Kurulum ve Çalıştırma

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/KaramanTaha/insider-test-case-ts-playwright.git
cd insider-test-case-ts-playwright
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Playwright Tarayıcılarını Yükleyin
```bash
npx playwright install
```

### 4. Testleri Çalıştırın

#### Tüm Testleri Çalıştır (Headless)
```bash
npm test
```

#### Testleri Tarayıcı Açık Göstererek Çalıştır
```bash
npm run test:headed
```

#### Debug Modunda Çalıştır
```bash
npm run test:debug
```

#### Test Raporunu Görüntüle
```bash
npx playwright show-report
```

## 🏗️ Proje Yapısı

```
insider-test-case-ts-playwright/
├── 📁 pages/                 # Page Object Model sınıfları
│   ├── BasePage.ts          # Temel sayfa sınıfı (ortak fonksiyonlar)
│   ├── HomePage.ts          # Ana sayfa işlemleri
│   ├── CareersPage.ts       # Kariyer sayfası işlemleri
│   └── QAJobsPage.ts        # QA iş ilanları sayfası işlemleri
├── 📁 tests/                 # Test dosyaları
│   └── insider-careers.spec.ts
├── 📁 utils/                 # Yardımcı araçlar
├── 📁 test-results/          # Test sonuçları ve raporlar
├── playwright.config.ts      # Playwright yapılandırması
├── package.json             # Proje bağımlılıkları
└── README.md               # Bu dokümantasyon dosyası
```

## 🎨 Page Object Model (POM) Tasarımı

### BasePage Sınıfı
- Ortak fonksiyonlar ve yardımcı metodlar
- Cookie kabul etme
- Tarayıcı pencere yönetimi
- Element bekleme işlemleri

### Sayfa Sınıfları
- Her sayfa için özel metodlar
- Element seçicileri
- Sayfa spesifik işlemler

## 📊 Test Sonuçları

Son test çalıştırması sonuçları:

- ✅ **15/15 test başarılı**
- 🕒 **Çalışma süresi:** ~25-30 saniye
- 🌐 **Tarayıcılar:** Chromium, Firefox, WebKit
- 📱 **Mod:** Headless & Headed

## 🔧 Yapılandırma

### Playwright Konfigürasyonu
```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'https://useinsider.com',
    viewport: null, // Fullscreen
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

## 📈 Özellikler

- **Otomatik Cookie Yönetimi** - Cookie banner'larını otomatik kabul eder
- **Fullscreen Mod** - Testler fullscreen tarayıcıda çalışır
- **Çoklu Tarayıcı Desteği** - 3 farklı tarayıcıda paralel test
- **Detaylı Raporlama** - HTML formatında kapsamlı raporlar
- **Screenshot & Video** - Başarısız testlerde otomatik kayıt
- **Type Safety** - TypeScript ile tip güvenliği
- **CI/CD Ready** - Otomatikleştirilebilir pipeline desteği

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

**Taha Karaman**
- GitHub: [@KaramanTaha](https://github.com/KaramanTaha)
- LinkedIn: [Taha Karaman](https://linkedin.com/in/karamantaha)

---

⭐ **Bu proje size yardımcı olduysa yıldız vermeyi unutmayın!**