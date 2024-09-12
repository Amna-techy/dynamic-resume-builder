document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    var form = document.getElementById("resume-form");
    var resumeContainer = document.getElementById("resume");
    var downloadButton = document.getElementById("download-pdf");
    // Function to handle form submission and resume generation
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var profilePictureInput = document.getElementById("profile-picture");
        var skills = document.getElementById("skills").value.split(",");
        var username = document.getElementById("username").value;
        // Collect education entries
        var educationEntries = Array.from(document.querySelectorAll(".education-entry")).map(function (entry) { return ({
            course: entry.querySelector(".education-course").value,
            year: entry.querySelector(".education-year").value,
            institution: entry.querySelector(".education-institution").value,
        }); });
        // Collect work experience entries
        var workExperienceEntries = Array.from(document.querySelectorAll(".work-experience-entry")).map(function (entry) { return ({
            position: entry.querySelector(".work-experience-position").value,
            organization: entry.querySelector(".work-experience-organization").value,
            years: entry.querySelector(".work-experience-years").value,
        }); });
        // Handle profile picture
        var profilePictureURL = "";
        if (profilePictureInput.files && profilePictureInput.files.length > 0) {
            var file = profilePictureInput.files[0];
            profilePictureURL = URL.createObjectURL(file);
        }
        // Generate the resume content
        resumeContainer.innerHTML = "\n      <section class=\"personal-info printable\">\n        <img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" style=\"width:100px;height:100px;\">\n        <h1 contenteditable=\"true\" class=\"editable\">").concat(name, "</h1>\n        <p contenteditable=\"true\" class=\"editable\">Contact Details: ").concat(phone, ", ").concat(email, "</p>\n      </section>\n      <section class=\"education printable\">\n        <h2>Education</h2>\n        ").concat(educationEntries.map(function (entry) { return "\n          <div>\n            <strong>".concat(entry.course, "</strong> (").concat(entry.year, ") at ").concat(entry.institution, "\n          </div>\n        "); }).join(''), "\n      </section>\n      <section class=\"skills printable\">\n        <h2>Skills</h2>\n        <ul contenteditable=\"true\" class=\"editable\">\n          ").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "\n        </ul>\n      </section>\n      <section class=\"work-experience printable\">\n        <h2>Work Experience</h2>\n        ").concat(workExperienceEntries.map(function (entry) { return "\n          <div>\n            <strong>".concat(entry.position, "</strong>, ").concat(entry.organization, " (").concat(entry.years, ")\n          </div>\n        "); }).join(''), "\n      </section>\n    ");
        // Make the download button visible
        downloadButton.style.display = "block";
    });
    // Download PDF functionality
    downloadButton.addEventListener("click", function () {
        // Trigger print dialog
        window.print();
    });
    // Add event listeners for dynamically adding new entries
    (_a = document.getElementById("add-education")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var educationSection = document.getElementById("education-section");
        var newEntry = document.createElement("div");
        newEntry.classList.add("education-entry");
        newEntry.innerHTML = "\n      <input type=\"text\" class=\"education-course\" placeholder=\"Course\" required>\n      <input type=\"text\" class=\"education-year\" placeholder=\"Passing Year\" required>\n      <input type=\"text\" class=\"education-institution\" placeholder=\"Institution Name\" required>\n    ";
        educationSection.appendChild(newEntry);
    });
    (_b = document.getElementById("add-work-experience")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        var workExperienceSection = document.getElementById("work-experience-section");
        var newEntry = document.createElement("div");
        newEntry.classList.add("work-experience-entry");
        newEntry.innerHTML = "\n      <input type=\"text\" class=\"work-experience-position\" placeholder=\"Position\" required>\n      <input type=\"text\" class=\"work-experience-organization\" placeholder=\"Organization Name\" required>\n      <input type=\"text\" class=\"work-experience-years\" placeholder=\"Active Years (in numbers)\" required>\n    ";
        workExperienceSection.appendChild(newEntry);
    });
});
