document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resume = document.getElementById('resume') as HTMLDivElement;
    const printButton = document.getElementById('print-resume') as HTMLButtonElement;
    const shareButton = document.getElementById('share-link') as HTMLButtonElement;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const profilePicture = (document.getElementById('profile-picture') as HTMLInputElement).files![0];
        const institution = (document.getElementById('institution') as HTMLInputElement).value;
        const course = (document.getElementById('course') as HTMLInputElement).value;
        const passingYear = (document.getElementById('passing-year') as HTMLInputElement).value;
        const organization = (document.getElementById('organization') as HTMLInputElement).value;
        const position = (document.getElementById('position') as HTMLInputElement).value;
        const years = (document.getElementById('years') as HTMLInputElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        // Populate resume
        (document.getElementById('resume-name') as HTMLHeadingElement).innerText = name;
        (document.getElementById('resume-email') as HTMLParagraphElement).innerText = email;
        (document.getElementById('resume-phone') as HTMLParagraphElement).innerText = phone;

        if (profilePicture) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.getElementById('resume-profile-pic') as HTMLImageElement;
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(profilePicture);
        }

        (document.getElementById('resume-institution') as HTMLParagraphElement).innerText = institution;
        (document.getElementById('resume-course') as HTMLParagraphElement).innerText = course;
        (document.getElementById('resume-passing-year') as HTMLParagraphElement).innerText = passingYear;
        (document.getElementById('resume-organization') as HTMLParagraphElement).innerText = organization;
        (document.getElementById('resume-position') as HTMLParagraphElement).innerText = position;
        (document.getElementById('resume-years') as HTMLParagraphElement).innerText = years;

        const skillsList = document.getElementById('resume-skills') as HTMLUListElement;
        skillsList.innerHTML = '';
        skills.split(',').forEach(skill => {
            const li = document.createElement('li');
            li.innerText = skill.trim();
            skillsList.appendChild(li);
        });

        // Display resume
        resume.style.display = 'block';
    });

    printButton.addEventListener('click', () => {
        window.print();
    });

    shareButton.addEventListener('click', () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const url = `${window.location.origin}/${username}`;
        prompt('Copy and share this link:', url);
    });
});