document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resume = document.getElementById('resume');
    var printButton = document.getElementById('print-resume');
    var shareButton = document.getElementById('share-link');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // Get form data
        var username = document.getElementById('username').value;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var profilePicture = document.getElementById('profile-picture').files[0];
        var institution = document.getElementById('institution').value;
        var course = document.getElementById('course').value;
        var passingYear = document.getElementById('passing-year').value;
        var organization = document.getElementById('organization').value;
        var position = document.getElementById('position').value;
        var years = document.getElementById('years').value;
        var skills = document.getElementById('skills').value;
        // Populate resume
        document.getElementById('resume-name').innerText = name;
        document.getElementById('resume-email').innerText = email;
        document.getElementById('resume-phone').innerText = phone;
        if (profilePicture) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var img = document.getElementById('resume-profile-pic');
                img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(profilePicture);
        }
        document.getElementById('resume-institution').innerText = institution;
        document.getElementById('resume-course').innerText = course;
        document.getElementById('resume-passing-year').innerText = passingYear;
        document.getElementById('resume-organization').innerText = organization;
        document.getElementById('resume-position').innerText = position;
        document.getElementById('resume-years').innerText = years;
        var skillsList = document.getElementById('resume-skills');
        skillsList.innerHTML = '';
        skills.split(',').forEach(function (skill) {
            var li = document.createElement('li');
            li.innerText = skill.trim();
            skillsList.appendChild(li);
        });
        // Display resume
        resume.style.display = 'block';
    });
    printButton.addEventListener('click', function () {
        window.print();
    });
    shareButton.addEventListener('click', function () {
        var username = document.getElementById('username').value;
        var url = "".concat(window.location.origin, "/").concat(username);
        prompt('Copy and share this link:', url);
    });
});
