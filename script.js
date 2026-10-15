// RIFAD starter website. Change the WhatsApp number below if it changes.
const RIFAD_WHATSAPP = "972567028862";
const langButton = document.getElementById("languageToggle");
let currentLang = "ar";

function setLanguage(lang) {
  currentLang = lang;
  const isArabic = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.dir = isArabic ? "rtl" : "ltr";
  langButton.textContent = isArabic ? "EN" : "ع";
  document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
    el.innerHTML = isArabic ? el.dataset.ar : el.dataset.en;
  });
  document.querySelectorAll(".form-grid input, .form-grid textarea").forEach((el) => {
    if (el.name === "name") el.placeholder = isArabic ? "الاسم / Full name" : "Full name";
    if (el.name === "phone") el.placeholder = isArabic ? "05XXXXXXXX" : "05XXXXXXXX";
    if (el.name === "area") el.placeholder = isArabic ? "الحي / المدينة" : "Neighborhood / city";
    if (el.name === "details") el.placeholder = isArabic ? "اكتب تفاصيل مختصرة دون مشاركة معلومات طبية حساسة..." : "Brief details only; do not share sensitive medical information...";
  });
}
langButton.addEventListener("click", () => setLanguage(currentLang === "ar" ? "en" : "ar"));
document.getElementById("year").textContent = new Date().getFullYear();

const whatsappLink = document.getElementById("whatsappLink");
whatsappLink.href = `https://wa.me/${RIFAD_WHATSAPP}`;

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const value = (key) => (form.get(key) || "").toString().trim();
  const isArabic = currentLang === "ar";
  const labels = isArabic
    ? { title: "طلب زيارة تمريضية جديد — رِفاد", name: "الاسم", phone: "رقم الهاتف", service: "الخدمة", area: "المنطقة", date: "التاريخ المفضل", time: "الفترة المناسبة", details: "تفاصيل إضافية" }
    : { title: "New Nursing Visit Request — RIFAD", name: "Name", phone: "Phone", service: "Service", area: "Area", date: "Preferred date", time: "Preferred time", details: "Additional details" };
  const lines = [
    labels.title,
    `${labels.name}: ${value("name")}`,
    `${labels.phone}: ${value("phone")}`,
    `${labels.service}: ${value("service")}`,
    `${labels.area}: ${value("area")}`,
    value("date") ? `${labels.date}: ${value("date")}` : "",
    value("time") ? `${labels.time}: ${value("time")}` : "",
    value("details") ? `${labels.details}: ${value("details")}` : ""
  ].filter(Boolean);
  document.getElementById("formMessage").textContent = isArabic
    ? "سيُفتح واتساب برسالة جاهزة. اضغط إرسال داخل واتساب لإيصال الطلب."
    : "WhatsApp will open with your message prepared. Press Send in WhatsApp to submit your request.";
  window.open(`https://wa.me/${RIFAD_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
});