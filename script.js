const menuButton=document.querySelector(".menu-toggle");const navigation=document.querySelector(".main-nav");if(menuButton&&navigation){menuButton.addEventListener("click",()=>{const isOpen=navigation.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(isOpen));menuButton.textContent=isOpen?"✕":"☰";});}const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();const form=document.querySelector("#demo-enquiry");if(form){form.addEventListener("submit",event=>{event.preventDefault();const feedback=document.querySelector("#form-feedback");feedback.textContent="This is a demonstration only. Your message has not been sent. Please contact the school using its verified contact details.";form.reset();});}

// Hollyland anonymous visitor analytics
(() => {
  const analyticsEndpoint = "https://hollyland-analytics.akampuliraeddyman0.workers.dev/track";
  const visitorStorageKey = "hollyland_analytics_visitor";

  try {
    let visitorId = localStorage.getItem(visitorStorageKey);

    if (!visitorId) {
      visitorId = (crypto.randomUUID
        ? crypto.randomUUID()
        : "visitor_" + Math.random().toString(36).slice(2) + Date.now().toString(36));
      localStorage.setItem(visitorStorageKey, visitorId);
    }

    const referrer = document.referrer
      ? new URL(document.referrer).origin
      : "";

    fetch(analyticsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitor_id: visitorId,
        page_path: window.location.pathname,
        referrer
      }),
      keepalive: true
    }).catch(() => {
      // Analytics must never interrupt the school website.
    });
  } catch (_) {
    // Visitors can still use the website if browser storage is unavailable.
  }
})();
