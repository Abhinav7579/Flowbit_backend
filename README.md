# Flowbit Backend

Flowbit Backend is the server-side component of the Flowbit platform, designed to handle API requests, manage data, and provide core business logic for workflow automation. This backend powers the Flowbit frontend and manages authentication, storage, and integrations for robust workflow management.

## Features

- RESTful API for workflow management
- User authentication and authorization with JWT
- Data storage using MongoDB
- Input validation using Zod
- Secure password hashing with bcrypt
- Workflow automation powered by n8n
- Modular codebase for easy extension and maintenance
- Logging and error handling

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Password Hashing:** bcrypt
- **Automation:** n8n

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://npmjs.com/)
- [MongoDB](https://mongodb.com/) service running locally or remotely
- [n8n](https://n8n.io/) (optional, for automation)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Abhinav7579/Flowbit_backend.git
    cd Flowbit_backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
    - Copy `.env.example` to `.env` and fill in your credentials (MongoDB URI, JWT secret, etc.).

4. Start the server:
    ```bash
    npm start
    ```

## Usage

- API endpoints are available at `/api/*`
- Refer to the API documentation or inspect route handlers for usage details.
- n8n can be used for building and managing automations. Integrate it as needed.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

For questions or support, reach out via [GitHub Issues](https://github.com/Abhinav7579/Flowbit_backend/issues).

---

**Note:** Update the placeholders above (e.g., endpoints, environment variables) with specifics from your implementation for best results.
