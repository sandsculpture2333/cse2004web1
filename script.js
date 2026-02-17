const toggleBtn = document.getElementById("factsToggle");
const factsBody = document.getElementById("factsBody");
const mainGrid = document.getElementById("mainGrid");

toggleBtn.addEventListener("click", () => {
const isHidden = factsBody.classList.toggle("is-hidden");

toggleBtn.textContent = isHidden ? "Show" : "Hide";
toggleBtn.setAttribute("aria-expanded", String(!isHidden));

mainGrid.classList.toggle("is-collapsed", isHidden);
});

const form = document.getElementById("caffeineForm");
const result = document.getElementById("result");

const COFFEE_MG = 95;   // average cup
const ENERGY_MG = 160;  // average 16oz can

function minutesNow() {
const d = new Date();
return d.getHours() * 60 + d.getMinutes();
}

function timeToMinutes(t) {
const [h, m] = t.split(":").map(Number);
return h * 60 + m;
}

form.addEventListener("submit", (e) => {
e.preventDefault();

const age = Number(document.getElementById("age").value) || 0;
const coffee = Number(document.getElementById("coffee").value) || 0;
const energy = Number(document.getElementById("energy").value) || 0;
const bedtimeVal = document.getElementById("bedtime").value;

const total = coffee * COFFEE_MG + energy * ENERGY_MG;

let limit;

if (age > 0 && age < 18) {
    limit = 100;   // common public health guidance for teens
} else if (age >= 60) {
    limit = 300;   // more conservative estimate for older adults
} else {
    limit = 400;   // general adult guideline
}

let msg = `Estimated total: ${Math.round(total)} mg. `;

if (total >= limit) {
    msg += `This exceeds the recommended limit of about ${limit} mg for your age group. `;
} else if (total >= limit * 0.7) {
    msg += `You are approaching the recommended limit of ${limit} mg. `;
} else {
    msg += `This is within a moderate range for your age group. `;
}

if (bedtimeVal) {
    const now = minutesNow();
    let bed = timeToMinutes(bedtimeVal);
    let diff = bed - now;
    if (diff < 0) diff += 24 * 60;

    const hours = diff / 60;

    if (hours < 6) {
    msg += `Bedtime is in ${hours.toFixed(1)} hours. Caffeine may affect sleep.`;
    }
}

result.textContent = msg;
});