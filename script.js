// RIFAD Home Care

(function () {
  const html = document.documentElement;
  const langButton = document.getElementById("lang");
  const form = document.getElementById("bf");

  // رقم واتساب الخاص برفاد
  const WHATSAPP = "970592875877";

  function setLanguage(lang) {
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-ar]").forEach((element) => {
      const value = element.getAttribute("data-" + lang);
      if (value !== null) {
        element.textContent = value;
      }
    });

    if (langButton) {
      langButton.textContent = lang === "ar" ? "EN" : "ع";
    }

    try {
      localStorage.setItem("rifad-lang", lang);
    } catch (error) {
      // يعمل الموقع حتى إذا كان التخزين غير متاح.
    }

    const message = lang === "ar"
      ? "مرحباً، أريد الاستفسار عن خدمات رفاد."
      : "Hello, I would like to ask about Rifad services.";

    ["wa1", "wa2"].forEach((id) => {
      const button = document.getElementById(id);

      if (button) {
        button.href =
          "https://wa.me/" + WHATSAPP +
          "?text=" + encodeURIComponent(message);
      }
    });

    const reviewButton = document.getElementById("wr");

    if (reviewButton) {
      const reviewMessage = lang === "ar"
        ? "أود مشاركة رأيي في خدمة رفاد."
        : "I would like to share my feedback about Rifad.";

      reviewButton.href =
        "https://wa.me/" + WHATSAPP +
        "?text=" + encodeURIComponent(reviewMessage);
    }
  }

  let savedLanguage = "ar";

  try {
    savedLanguage = localStorage.getItem("rifad-lang") || "ar";
  } catch (error) {
    // استخدام العربية افتراضياً.
  }

  setLanguage(savedLanguage);

  if (langButton) {
    langButton.addEventListener("click", () => {
      setLanguage(html.lang === "ar" ? "en" : "ar");
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const arabic = html.lang === "ar";
      const getValue = (name) =>
        (form.elements[name]?.value || "").trim();

      const service = form.elements.s;
      const selectedService = service
        ? service.options[service.selectedIndex].textContent
        : "";

      const labels = arabic
        ? {
            title: "طلب زيارة تمريضية",
            name: "الاسم",
            phone: "الهاتف",
            service: "الخدمة",
            area: "المنطقة",
            date: "الموعد المفضل",
            notes: "ملاحظات"
          }
        : {
            title: "Nursing visit request",
            name: "Name",
            phone: "Phone",
            service: "Service",
            area: "Area",
            date: "Preferred time",
            notes: "Notes"
          };

      const lines = [
        labels.title,
        labels.name + ": " + getValue("n"),
        labels.phone + ": " + getValue("p"),
        labels.service + ": " + selectedService
      ];

      if (getValue("a")) {
        lines.push(labels.area + ": " + getValue("a"));
      }

      if (getValue("d")) {
        lines.push(labels.date + ": " + getValue("d"));
      }

      if (getValue("m")) {
        lines.push(labels.notes + ": " + getValue("m"));
      }

      const url =
        "https://wa.me/" + WHATSAPP +
        "?text=" + encodeURIComponent(lines.join("\n"));

      window.open(url, "_blank", "noopener");
    });
  }
})();