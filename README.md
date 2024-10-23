# Personal Expense Tracker API

## Project Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with your MongoDB URI:
    ```
    MONGO_URI=mongodb://localhost:27017/expense-tracker
    ```
4. Run the application:
    ```
    npm run dev
    ```

## API Endpoints
### Transactions
- `POST /api/transactions` - Add a new transaction
- `GET /api/transactions` - Retrieve all transactions
- `GET /api/transactions/:id` - Retrieve a transaction by ID
- `PUT /api/transactions/:id` - Update a transaction by ID
- `DELETE /api/transactions/:id` - Delete a transaction by ID

### Summary
- `GET /api/summary` - Retrieve a summary of income, expenses, and balance


