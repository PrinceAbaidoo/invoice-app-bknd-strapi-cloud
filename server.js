const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { generateRandomString } = require('./generateID');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Load initial data from JSON file
let invoices = JSON.parse(fs.readFileSync('data.json'));

// CRUD Endpoints

// 1. Get all invoices
app.get('/invoices', (req, res) => {
    res.json(invoices);
});

// 2. Get a specific invoice by ID
app.get('/invoices/:id', (req, res) => {
    const invoice = invoices.find(inv => inv.id === req.params.id);
    if (!invoice) {
        return res.status(404).send('Invoice not found');
    }
    res.json(invoice);
});

// 3. Create a new invoice
app.post('/invoices', (req, res) => {
    const invoiceID = generateRandomString();
    const newInvoice = { id: invoiceID, ...req.body };
    invoices.push(newInvoice);
    fs.writeFileSync('data.json', JSON.stringify(invoices, null, 2)); // Save updated data to JSON file
    res.status(201).json(newInvoice);
});

// 4. Update an existing invoice
app.put('/invoices/:id', (req, res) => {
    let invoiceIndex = invoices.findIndex(inv => inv.id === req.params.id);
    if (invoiceIndex === -1) {
        return res.status(404).send('Invoice not found');
    }
    invoices[invoiceIndex] = { ...invoices[invoiceIndex], ...req.body };
    fs.writeFileSync('data.json', JSON.stringify(invoices, null, 2)); // Save updated data to JSON file
    res.json(invoices[invoiceIndex]);
});

// 5. Delete an invoice
app.delete('/invoices/:id', (req, res) => {
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