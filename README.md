# Contacts Management Angular Application

This project is the frontend part of a **Contacts Management** system built using **Angular**. The application communicates with a backend API for performing CRUD (Create, Read, Update, Delete) operations on contacts.
## Table of Contents
- [Setup Instructions](#setup-instructions)
- [How to Run the Application](#how-to-run-the-application)

## Setup Instructions

### Prerequisites

Before setting up the application, make sure you have the following tools installed on your machine:
- [Node.js](https://nodejs.org/) (version 14.x or above)
- [Angular CLI](https://angular.io/cli) (version 15.x or above)
- [Git](https://git-scm.com/)

### Installation Steps

1. **Clone the Repository**:

   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/chaitanya551/contacts-management-app.git
   cd your-angular-app

2. **Install Dependencies**:

   npm install

3. **Configure the Backend API URL:**:

   Open src/environments/environment.ts

   export const environment = {
            production: false,
            apiUrl: 'http://localhost:5278/api'
    };

4. **Run the application**
    ng serve


