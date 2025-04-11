document.addEventListener("DOMContentLoaded", function () {
    const datesContainer = document.getElementById("dates");
    const monthYear = document.getElementById("monthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem("events")) || {};

    function renderCalendar() {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        monthYear.textContent = firstDay.toLocaleString("default", { month: "long", year: "numeric" });
        datesContainer.innerHTML = "";

        for (let i = 0; i < firstDay.getDay(); i++) {
            let emptyDiv = document.createElement("div");
            datesContainer.appendChild(emptyDiv);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            let dateDiv = document.createElement("div");
            dateDiv.classList.add("date");
            dateDiv.textContent = day;
            let dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
            if (events[dateKey]) {
                dateDiv.classList.add("event");
            }
            dateDiv.addEventListener("click", () => showEventPopup(dateKey));
            datesContainer.appendChild(dateDiv);
        }
    }

    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    function showEventPopup(dateKey) {
        document.getElementById("selectedDate").textContent = `Add Event for ${dateKey}`;
        document.getElementById("eventPopup").style.display = "block";
        document.getElementById("saveEvent").onclick = () => saveEvent(dateKey);
        document.getElementById("closePopup").onclick = () => closePopup("eventPopup");
    }
    
    function saveEvent(dateKey) {
        let eventTitle = document.getElementById("eventTitle").value.trim();
        if (eventTitle) {
            events[dateKey] = events[dateKey] || [];
            events[dateKey].push(eventTitle);
            localStorage.setItem("events", JSON.stringify(events));
            closePopup("eventPopup");
            renderCalendar();
        }
    }
    
    function closePopup(id) {
        document.getElementById(id).style.display = "none";
    }
    
    renderCalendar();
});
