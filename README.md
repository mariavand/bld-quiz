# BldQuiz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

# 🚀 Angular Quiz Application

This is a modern Angular application built using **Signals** and **Standalone Components** for improved performance and simpler state management. It serves as a comprehensive example of building a reactive quiz interface.

---

## 🛠️ Local Development Setup

Follow these steps to clone the repository and run the application locally.

### 1. Clone the Repository from GitHub

To get a copy of the project, open your terminal or command prompt and run the following command. This will create a local folder named `[Your-Repository-Name]` containing the project files.

```bash
git clone bld-quiz
cd bld-quiz
```
### 2. Install Dependencies and Run the Application

Once inside the project directory, use npm to install all necessary packages and then serve the application using the Angular CLI command.

Install Node Modules: ```npm install```

Serve the Application: ```npm serve```

The application will typically be available in your browser at http://localhost:4200/.

💻 ### Technical Implementation Notes

#### Modern Angular Features
The application is built using the latest Angular best practices:

**Signals**: Used for reactive state management, providing better performance and simpler change detection.

**Standalone Components**: Used throughout the application to eliminate the need for NgModules, resulting in a more modular and lightweight structure.

### Data Persistence Rationale (Personal Comment)

**Local Storage Usage**: Quiz and result data are not saved in Local Storage. This follows the general principle of avoiding storage for large or non-essential data, as Local Storage capacity is limited and not designed for application state.

**Exceptions**: The only data currently persisted is the user object, which should be converted to a JWT token for production. Temporary form states may also be saved for user experience purposes.

💡 ### Improvements & Future Work
While the core functionality is complete, the following improvements are needed:

#### Testing & Quality Assurance
**Unit Testing**: I would prioritize writing unit tests to thoroughly validate all application logic and services. (Currently working on this skill).

**Integration Testing**: In a production setting without a dedicated QA tester, I would implement robust integration tests using tools like Cypress or Playwright to ensure full end-to-end functionality. (Currently working on this skill).

#### Architecture & Maintainability

**Component Granularity**: The application could be further broken down into smaller, more focused components to enhance maintainability and code readability.

**State Management**: For a larger, more complex application, I would integrate a dedicated solution like NGRX Signal Store to manage application state more effectively.

#### UI/UX & Media
**Image Copyrights & Licensing**: I would recommend discussing with the UI/UX team to verify the licensing and copyrights for all pictures currently used, or to purchase licensed images to avoid legal issues.

**Image Responsiveness**: Implement logic (e.g., using srcset or a dedicated image service) to serve smaller image files to mobile users and larger ones to desktop users, optimizing load times and bandwidth usage.

**Theming**: Further investigation into changing the application's theming could be done based on project requirements or personal preference.

#### Feature Enhancements
**State Persistence (Optional)**: If required by business needs (e.g., surviving page refreshes), functionality could be added to temporarily save user answers submitted in the Local Storage.

**Correct Answer Highlighting**: I would resolve the implementation issue regarding how to clearly and correctly highlight the right answer in the quiz results view.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
