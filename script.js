document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resume = document.getElementById('resume');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var profilePicture = document.getElementById('profile-picture').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('work-experience').value;
        var skills = document.getElementById('skills').value;
        document.getElementById('resume-name').innerText = name;
        document.getElementById('resume-email').innerText = email;
        document.getElementById('resume-profile-pic').src = profilePicture;
        document.getElementById('resume-education').innerText = education;
        document.getElementById('resume-work-experience').innerText = workExperience;
        var skillsList = document.getElementById('resume-skills');
        skillsList.innerHTML = '';
        skills.split(',').forEach(function (skill) {
            var li = document.createElement('li');
            li.innerText = skill.trim();
            skillsList.appendChild(li);
        });
        resume.style.display = 'block';
    });
});
