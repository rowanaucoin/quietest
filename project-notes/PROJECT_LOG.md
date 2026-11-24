# QuietQuest — AI Development Log
**Name:** Rowan AuCoin

**Startup:** QuietQuest

**Live website:** https://rowanaucoin.github.io/quietquest/

**GitHub repository:** https://github.com/rowanaucoin/quietquest

## Session 1 — November 22, 2026

### Project Idea
I chose QuietQuest, a website that helps StFX students find quiet places to study. Students can report noise and crowd levels to help other students choose a study space.

### AI Tools Used
- ChatGPT: Helped me plan the startup idea and organize the development steps.
- GitHub Copilot: Helped me write and update the HTML, CSS, and JavaScript.
### AI Prompts Used

The following are summaries of the prompts I gave GitHub Copilot:

- Create a website called QuietQuest that helps StFX students find quiet study spaces.
- Add QuietScores based on noise and crowd levels, with different colours depending on the score.
- Add a reporting system that allows students to update noise and crowd levels.
- Save reports after refreshing the website and add a button to reset the sample data.
- Create an interactive Network Effects Dashboard that shows how more student reports could improve study-space coverage.

I built the website in smaller steps instead of asking AI to create everything at once. After adding each major feature, I tested it before moving on to the next one.

### What I Built
- A homepage with three sample study spaces.
- QuietScores based on simulated noise and crowd levels.
- Student reporting forms that update QuietScores.
- Browser storage that saves sample reports after refreshing.
- A Reset Demo Data button.
- An interactive Network Effects Dashboard showing how more reports could improve study-space coverage.

### Publishing the Website

I used GitHub Pages to publish QuietQuest online. I committed and synced my website files to GitHub and turned on GitHub Pages. I opened the website in a private browser window to make sure it was available to the public. I also tested the Network Effects Dashboard on the published website.

Website: https://rowanaucoin.github.io/quietquest/

Repository: https://github.com/rowanaucoin/quietquest

### Problems and Fixes
- I had trouble finding GitHub Codespaces and using the Terminal. I worked through these problems with step-by-step guidance.
- I initially tried the wrong GitHub repository address. I used the Terminal command git remote -v to find the correct repository, named quietest.
- I tested the reporting forms, saved reports, reset button, and network effects slider to make sure they worked.

### What I Learned
I learned how GitHub Codespaces, Copilot, commits, and GitHub Pages work together. I also learned that the network effects dashboard is a simulation, while the student reporting feature currently stores data only in the user's browser.

### Next Steps
Continue testing the public website, improve the prototype if needed, and prepare the business case.

## Session 2 — November 24, 2026

### What I Completed
- Created and completed the business case.
- Explained how QuietQuest provides value to students and universities.
- Discussed network effects and how QuietQuest could attract its first users.
- Used the VRIN framework to explain how QuietQuest could become harder to copy.
- Explained cloud technology, daily operations, and business risks.
- Added an AI disclosure.
- Committed and uploaded the business case to GitHub.

### AI Tools Used
I used ChatGPT to help organize my business case, suggest ideas, draft sections, and guide me through GitHub.

### Problems and Fixes
- I had trouble getting back into GitHub Codespaces after leaving the project. I followed step-by-step instructions to reopen my existing Codespace.

### What I Learned
I learned that creating a website is only one part of starting a business. QuietQuest would also need regular users, reliable information, and strong relationships with universities to become successful. I also learned that having a good website does not automatically give a business a strong competitive advantage.

### Next Steps
Finish the project log, test the public website, and submit both GitHub links to Moodle.

### Final Website Testing

I tested the published QuietQuest website to make sure everything worked properly.

- Student reports successfully updated QuietScores and report counts.
- Reports stayed saved after refreshing the website.
- The Reset Demo Data button worked properly.
- The Network Effects Dashboard worked from 0 to 200 reports.
- The Student Prototype label was visible at the bottom of the website.
- I tested the website on my phone to make sure everything fit properly.

### Final Reflection

### Final Reflection

**What I learned from using AI**

Before starting this project, I did not know much about building websites or using GitHub. I learned that I could turn a simple business idea into a working website without having much coding experience. One thing that helped was asking Copilot to build one feature at a time instead of asking it to build the entire website at once. For example, I started with the basic website before adding QuietScores, student reports, and the network effects dashboard. This made it easier to test each feature and understand how the website worked. I learned that AI can do a lot of the technical work, but it still needs clear instructions and someone to check its work.

**Challenges I faced**

One of my biggest challenges was learning how to use GitHub and Codespaces. At first, I found it confusing to understand how to save my work and publish it online. I also had a problem when I changed the repository name to QuietQuest and the website stopped loading. I eventually fixed this by checking the GitHub Pages settings and using the updated link. Another important part was testing the website on both my computer and phone. I wanted to make sure that students could easily use QuietQuest from their phones while walking around campus.

**Business lessons I learned**

The biggest business lesson I learned was that having a working website does not mean having a successful business. Since I was able to build QuietQuest using AI, another person could probably build something very similar. The real challenge would be getting students to use the website regularly and trust the information on it. A competitor could copy my QuietScore feature, but they would still need students to provide useful reports. If I continued developing QuietQuest, I would focus on getting students at StFX to use it before expanding to other universities. I would also add an online database so students could share information with each other. This project showed me that technology can make starting a business easier, but building a successful business still takes time, trust, and good decisions.

## Things that broke
| Date | What went wrong | What we tried | What finally fixed it |
|---|---|---|---|
| Nov 22 | I had trouble finding Codespaces. | Looked through GitHub. | Followed instructions to open Codespaces. |
| Nov 22 | I used the wrong repository address. | Checked the repository in Terminal. | Used git remote -v to find the correct address. |
| Nov 24 | I had trouble reopening my project. | Looked through GitHub. | Reopened my existing Codespace. |
| Nov 24 | The website showed a 404 error after renaming the repository. | Checked the GitHub Pages settings. | Used the updated website link after deployment. |

## What a real version would need
| Feature we faked or skipped | Why a real company would need it | How hard / expensive? |
|---|---|---|
| Online database | Allows all students to share reports. | Medium |
| Automatic report expiry | Keeps information updated. | Low |
| Report moderation | Helps prevent fake reports. | Medium |
| University dashboard | Helps universities understand study-space usage. | Medium |
| Data security | Protects student information. | High |
| Subscription payments | Allows universities to pay for the service. | Medium |
| Website monitoring | Helps identify and fix website problems. | Medium |