document.addEventListener("DOMContentLoaded", function () {
    let currentLang = localStorage.getItem("lang") || "en"; 
    changeLanguage(currentLang);

    async function changeLanguage(lang) {
        try {
            const response = await fetch("js/lang.json");
            if (!response.ok) {
                throw new Error("Error loading language file");
            }
            const translations = await response.json();

             document.querySelectorAll("[data-lang]").forEach(element => {
                let key = element.getAttribute("data-lang");
                if (translations[lang] && translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });

             const languageBtn = document.getElementById("language-btn");
            if (languageBtn) {
                if (lang === "en") {
                    languageBtn.textContent = "English";
                } else if (lang === "ar") {
                    languageBtn.textContent = "العربية";
                } else if (lang === "tr") {
                    languageBtn.textContent = "Türkçe";
                }
            }

             localStorage.setItem("lang", lang);

             document.body.dir = lang === "ar" ? "rtl" : "ltr";

        } catch (error) {
            console.error("Error fetching language file:", error);
        }
    }

     window.changeLanguage = changeLanguage;
});
