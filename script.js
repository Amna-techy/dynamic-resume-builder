document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resume = document.getElementById('resume');
    var resumeContent = document.getElementById('resume-content');
    var downloadPdfButton = document.getElementById('download-pdf');
    var shareLinkButton = document.getElementById('share-link');
    var addEducationButton = document.getElementById('add-education');
    var addWorkExperienceButton = document.getElementById('add-work-experience');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('name').value;
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;
        var profilePicture = document.getElementById('profile-picture').files[0];
        var username = document.getElementById('username').value;
        var educationSection = document.getElementById('education-section');
        var educationEntries = Array.prototype.slice.call(educationSection.getElementsByClassName('education-entry'));
        var educationContent = educationEntries.map(function (entry) {
            var course = entry.getElementsByClassName('education-course')[0].value;
            var year = entry.getElementsByClassName('education-year')[0].value;
            var institution = entry.getElementsByClassName('education-institution')[0].value;
            return "<p>".concat(course, ", ").concat(year, ", ").concat(institution, "</p>");
        }).join('');
        var workExperienceSection = document.getElementById('work-experience-section');
        var workExperienceEntries = Array.prototype.slice.call(workExperienceSection.getElementsByClassName('work-experience-entry'));
        var workExperienceContent = workExperienceEntries.map(function (entry) {
            var place = entry.getElementsByClassName('work-experience-place')[0].value;
            var organization = entry.getElementsByClassName('work-experience-organization')[0].value;
            var years = entry.getElementsByClassName('work-experience-years')[0].value;
            return "<p>".concat(place, ", ").concat(organization, ", ").concat(years, "</p>");
        }).join('');
        var skills = document.getElementById('skills').value.split(',').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join('');
        resumeContent.innerHTML = "\n            <h1>".concat(name, "</h1>\n            <div id=\"resume-profile-pic\"></div>\n            <p>").concat(email, "</p>\n            <p>").concat(phone, "</p>\n            <section id=\"education-section\">\n                <h2>Education</h2>\n                ").concat(educationContent, "\n            </section>\n            <section id=\"work-experience-section\">\n                <h2>Work Experience</h2>\n                ").concat(workExperienceContent, "\n            </section>\n            <section id=\"skills-section\">\n                <h2>Skills</h2>\n                <ul>").concat(skills, "</ul>\n            </section>\n        ");
        if (profilePicture) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a, _b;
                var img = document.createElement('img');
                img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                (_b = document.getElementById('resume-profile-pic')) === null || _b === void 0 ? void 0 : _b.appendChild(img);
            };
            reader.readAsDataURL(profilePicture);
        }
        // Display resume and buttons
        resume.style.display = 'block';
        downloadPdfButton.style.display = 'block';
        shareLinkButton.style.display = 'block';
        shareLinkButton.onclick = function () {
            var link = "".concat(window.location.origin, "/resume/").concat(username);
            navigator.clipboard.writeText(link).then(function () {
                alert('Resume link copied to clipboard!');
            });
        };
    });
    // Add Education Entry
    addEducationButton.addEventListener('click', function () {
        var educationSection = document.getElementById('education-section');
        var entry = document.createElement('div');
        entry.className = 'education-entry';
        entry.innerHTML = "\n            <input type=\"text\" class=\"education-course\" placeholder=\"Course\" required>\n            <input type=\"text\" class=\"education-year\" placeholder=\"Passing Year\" required>\n            <input type=\"text\" class=\"education-institution\" placeholder=\"Institution Name\" required>\n        ";
        educationSection.appendChild(entry);
    });
    // Add Work Experience Entry
    addWorkExperienceButton.addEventListener('click', function () {
        var workExperienceSection = document.getElementById('work-experience-section');
        var entry = document.createElement('div');
        entry.className = 'work-experience-entry';
        entry.innerHTML = "\n            <input type=\"text\" class=\"work-experience-position\" placeholder=\"Position\" required>\n            <input type=\"text\" class=\"work-experience-organization\" placeholder=\"Organization Name\" required>\n            <input type=\"text\" class=\"work-experience-years\" placeholder=\"Active Years\" required>\n        ";
        workExperienceSection.appendChild(entry);
    });
    // Download as PDF
    downloadPdfButton.addEventListener('click', function () {
        window.print();
    });
});
