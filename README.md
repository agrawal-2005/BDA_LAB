# 📊 Project Title - BDA_LAB

## 📚 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [MySQL Commands](#mysql-commands)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/agrawal-2005/BDA_LAB.git

2. **Navigate to the project directory**

   ```bash
   cd BDA_LAB

3. **Install dependencies**

   ```bash
   npm install

4. **Set up environment variables**

   ```bash
   cp .env.example .env

   Update the `.env` file with your configurations.

---

## 🧪 Usage

To start the application, run:

```bash
npm start
```

> You can add more usage examples or CLI commands here as needed.

---

## ⚙️ Environment Variables

Define the environment variables required in the `.env` file. Example:

* `DATABASE_URL` – Database connection string
* `API_KEY` – API key for external integrations

> 🔒 Keep your `.env` file secure and **do not** commit it to version control.

---

## 🛢️ MySQL Commands

### Common MySQL operations:

1. **Start MySQL**

   ```bash
   mysql -u root -p
   ```

2. **Show databases**

   ```sql
   SHOW DATABASES;
   ```

3. **Create a database**

   ```sql
   CREATE DATABASE bda_lab;
   ```

4. **Use a database**

   ```sql
   USE bda_lab;
   ```

5. **Show tables**

   ```sql
   SHOW TABLES;
   ```

6. **Import a SQL file**

   ```sql
   SOURCE /path/to/your/file.sql;
   ```

7. **Select all records from a table**

   ```sql
   SELECT * FROM table_name;
   ```

8. **Delete a record**

   ```sql
   DELETE FROM table_name WHERE condition;
   ```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit:

   ```bash
   git commit -m "Add feature"
   ```
4. Push to your branch:

   ```bash
   git push origin feature-branch
   ```
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
