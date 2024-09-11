document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resume = document.getElementById('resume') as HTMLDivElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const profilePicture = (document.getElementById('profile-picture') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        (document.getElementById('resume-name') as HTMLHeadingElement).innerText = name;
        (document.getElementById('resume-email') as HTMLParagraphElement).innerText = email;
        (document.getElementById('resume-profile-pic') as HTMLImageElement).src = profilePicture;
        (document.getElementById('resume-education') as HTMLParagraphElement).innerText = education;
        (document.getElementById('resume-work-experience') as HTMLParagraphElement).innerText = workExperience;

        const skillsList = (document.getElementById('resume-skills') as HTMLUListElement);
        skillsList.innerHTML = '';
        skills.split(',').forEach(skill => {
            const li = document.createElement('li');
            li.innerText = skill.trim();
            skillsList.appendChild(li);
        });

        resume.style.display = 'block';
    });
});
