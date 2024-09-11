document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resume = document.getElementById('resume') as HTMLDivElement;
    const resumeContent = document.getElementById('resume-content') as HTMLDivElement;
    const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
    const shareLinkButton = document.getElementById('share-link') as HTMLButtonElement;
    const addEducationButton = document.getElementById('add-education') as HTMLButtonElement;
    const addWorkExperienceButton = document.getElementById('add-work-experience') as HTMLButtonElement;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const profilePicture = (document.getElementById('profile-picture') as HTMLInputElement).files![0];
        const username = (document.getElementById('username') as HTMLInputElement).value;

        const educationSection = document.getElementById('education-section')!;
        const educationEntries = Array.prototype.slice.call(educationSection.getElementsByClassName('education-entry'));
        const educationContent = educationEntries.map(entry => {
            const course = (entry.getElementsByClassName('education-course')[0] as HTMLInputElement).value;
            const year = (entry.getElementsByClassName('education-year')[0] as HTMLInputElement).value;
            const institution = (entry.getElementsByClassName('education-institution')[0] as HTMLInputElement).value;
            return `<p>${course}, ${year}, ${institution}</p>`;
        }).join('');

        const workExperienceSection = document.getElementById('work-experience-section')!;
        const workExperienceEntries = Array.prototype.slice.call(workExperienceSection.getElementsByClassName('work-experience-entry'));
        const workExperienceContent = workExperienceEntries.map(entry => {
            const place = (entry.getElementsByClassName('work-experience-place')[0] as HTMLInputElement).value;
            const organization = (entry.getElementsByClassName('work-experience-organization')[0] as HTMLInputElement).value;
            const years = (entry.getElementsByClassName('work-experience-years')[0] as HTMLInputElement).value;
            return `<p>${place}, ${organization}, ${years}</p>`;
        }).join('');

        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');

        resumeContent.innerHTML = `
            <h1>${name}</h1>
            <div id="resume-profile-pic"></div>
            <p>${email}</p>
            <p>${phone}</p>
            <section id="education-section">
                <h2>Education</h2>
                ${educationContent}
            </section>
            <section id="work-experience-section">
                <h2>Work Experience</h2>
                ${workExperienceContent}
            </section>
            <section id="skills-section">
                <h2>Skills</h2>
                <ul>${skills}</ul>
            </section>
        `;

        if (profilePicture) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target?.result as string;
                document.getElementById('resume-profile-pic')?.appendChild(img);
            };
            reader.readAsDataURL(profilePicture);
        }

        // Display resume and buttons
        resume.style.display = 'block';
        downloadPdfButton.style.display = 'block';
        shareLinkButton.style.display = 'block';
        shareLinkButton.onclick = () => {
            const link = `${window.location.origin}/resume/${username}`;
            navigator.clipboard.writeText(link).then(() => {
                alert('Resume link copied to clipboard!');
            });
        };
    });

    // Add Education Entry
    addEducationButton.addEventListener('click', () => {
        const educationSection = document.getElementById('education-section')!;
        const entry = document.createElement('div');
        entry.className = 'education-entry';
        entry.innerHTML = `
            <input type="text" class="education-course" placeholder="Course" required>
            <input type="text" class="education-year" placeholder="Passing Year" required>
            <input type="text" class="education-institution" placeholder="Institution Name" required>
        `;
        educationSection.appendChild(entry);
    });

    // Add Work Experience Entry
    addWorkExperienceButton.addEventListener('click', () => {
        const workExperienceSection = document.getElementById('work-experience-section')!;
        const entry = document.createElement('div');
        entry.className = 'work-experience-entry';
        entry.innerHTML = `
            <input type="text" class="work-experience-position" placeholder="Position" required>
            <input type="text" class="work-experience-organization" placeholder="Organization Name" required>
            <input type="text" class="work-experience-years" placeholder="Active Years" required>
        `;
        workExperienceSection.appendChild(entry);
    });

    // Download as PDF
    downloadPdfButton.addEventListener('click', () => {
        window.print();
    });
});
