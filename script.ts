document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resume-form") as HTMLFormElement;
  const resumeContainer = document.getElementById("resume") as HTMLDivElement;
  const downloadButton = document.getElementById("download-pdf") as HTMLButtonElement;

  // Function to handle form submission and resume generation
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const profilePictureInput = document.getElementById("profile-picture") as HTMLInputElement;
    const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");
    const username = (document.getElementById("username") as HTMLInputElement).value;

    // Collect education entries
    const educationEntries = Array.from(document.querySelectorAll(".education-entry")).map(entry => ({
      course: (entry.querySelector(".education-course") as HTMLInputElement).value,
      year: (entry.querySelector(".education-year") as HTMLInputElement).value,
      institution: (entry.querySelector(".education-institution") as HTMLInputElement).value,
    }));

    // Collect work experience entries
    const workExperienceEntries = Array.from(document.querySelectorAll(".work-experience-entry")).map(entry => ({
      position: (entry.querySelector(".work-experience-position") as HTMLInputElement).value,
      organization: (entry.querySelector(".work-experience-organization") as HTMLInputElement).value,
      years: (entry.querySelector(".work-experience-years") as HTMLInputElement).value,
    }));

    // Handle profile picture
    let profilePictureURL = "";

    if (profilePictureInput.files && profilePictureInput.files.length > 0) {
      const file = profilePictureInput.files[0];
      profilePictureURL = URL.createObjectURL(file);
    }

    // Generate the resume content
    resumeContainer.innerHTML = `
      <section class="personal-info printable">
        <img src="${profilePictureURL}" alt="Profile Picture" style="width:100px;height:100px;">
        <h1 contenteditable="true" class="editable">${name}</h1>
        <p contenteditable="true" class="editable">Contact Details: ${phone}, ${email}</p>
      </section>
      <section class="education printable">
        <h2>Education</h2>
        ${educationEntries.map(entry => `
          <div>
            <strong>${entry.course}</strong> (${entry.year}) at ${entry.institution}
          </div>
        `).join('')}
      </section>
      <section class="skills printable">
        <h2>Skills</h2>
        <ul contenteditable="true" class="editable">
          ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
        </ul>
      </section>
      <section class="work-experience printable">
        <h2>Work Experience</h2>
        ${workExperienceEntries.map(entry => `
          <div>
            <strong>${entry.position}</strong>, ${entry.organization} (${entry.years})
          </div>
        `).join('')}
      </section>
    `;

    // Make the download button visible
    downloadButton.style.display = "block";
  });

  // Download PDF functionality
  downloadButton.addEventListener("click", () => {
    // Trigger print dialog
    window.print();
  });

  // Add event listeners for dynamically adding new entries
  document.getElementById("add-education")?.addEventListener("click", () => {
    const educationSection = document.getElementById("education-section") as HTMLDivElement;
    const newEntry = document.createElement("div");
    newEntry.classList.add("education-entry");
    newEntry.innerHTML = `
      <input type="text" class="education-course" placeholder="Course" required>
      <input type="text" class="education-year" placeholder="Passing Year" required>
      <input type="text" class="education-institution" placeholder="Institution Name" required>
    `;
    educationSection.appendChild(newEntry);
  });

  document.getElementById("add-work-experience")?.addEventListener("click", () => {
    const workExperienceSection = document.getElementById("work-experience-section") as HTMLDivElement;
    const newEntry = document.createElement("div");
    newEntry.classList.add("work-experience-entry");
    newEntry.innerHTML = `
      <input type="text" class="work-experience-position" placeholder="Position" required>
      <input type="text" class="work-experience-organization" placeholder="Organization Name" required>
      <input type="text" class="work-experience-years" placeholder="Active Years (in numbers)" required>
    `;
    workExperienceSection.appendChild(newEntry);
  });
});