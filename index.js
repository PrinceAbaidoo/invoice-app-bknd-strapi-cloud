import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import jwt from 'jsonwebtoken';
const app = express();
const PORT = process.env.PORT || 3002;

const isValidEmail = (email) => { 
    return users.some(user => user.email === email)
}

const isValidPassword = (password) => { 
    return users.some(user => user.password === password)
}

const generateRandomString = () => {
    // Generate two random uppercase characters
    const letters = String.fromCharCode(
      Math.floor(Math.random() * 26) + 65,
      Math.floor(Math.random() * 26) + 65
    ).toUpperCase();
  
    // Generate a random 4-digit number
    const digits = Math.floor(1000 + Math.random() * 9000).toString();
  
    // Combine them together
    const randomString = letters + digits;
  
    return randomString;
  }


// Middleware
app.use(bodyParser.json());

// Load initial data from JSON file
let invoices = JSON.parse(fs.readFileSync('./src/data.json'));

// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer token

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};



// Route to login and get a token
app.post('/login', (req, res) => {
    // In a real application, you would validate credentials from a database
    const { username, password } = req.body; // Replace with actual user validation

    // Dummy user validation
    if (isValidEmail(username) && isValidPassword(password)) {
        const user = { name: username };
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(403).send('Invalid credentials');
});


// CRUD Endpoints

// 1. Get all invoices
app.get('/invoices', authenticateToken , (req, res) => {
    res.json(invoices);
});

// 2. Get a specific invoice by ID
app.get('/invoices/:id', authenticateToken, (req, res) => {
    const invoice = invoices.find(inv => inv.id === req.params.id);
    if (!invoice) {
        return res.status(404).send('Invoice not found');
    }
    res.json(invoice);
});

// 3. Create a new invoice
app.post('/invoices', authenticateToken,  (req, res) => {
    const invoiceID = generateRandomString();
    const newInvoice = { id: invoiceID, ...req.body };
    invoices.push(newInvoice);
    fs.writeFileSync('data.json', JSON.stringify(invoices, null, 2)); // Save updated data to JSON file
    res.status(201).json(newInvoice);
});

// 4. Update an existing invoice
app.put('/invoices/:id', authenticateToken, (req, res) => {
    let invoiceIndex = invoices.findIndex(inv => inv.id === req.params.id);
    if (invoiceIndex === -1) {
        return res.status(404).send('Invoice not found');
    }
    invoices[invoiceIndex] = { ...invoices[invoiceIndex], ...req.body };
    fs.writeFileSync('data.json', JSON.stringify(invoices, null, 2)); // Save updated data to JSON file
    res.json(invoices[invoiceIndex]);
});

// 5. Delete an invoice
app.delete('/invoices/:id', authenticateToken, (req, res) => {
    const invoiceIndex = invoices.findIndex(inv => inv.id === req.params.id);
    if (invoiceIndex === -1) {
        return res.status(404).send('Invoice not found');
    }
    invoices.splice(invoiceIndex, 1);
    fs.writeFileSync('data.json', JSON.stringify(invoices, null, 2)); // Save updated data to JSON file
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});