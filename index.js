import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
// import { users } from './src/users';
const app = express();
const PORT = process.env.PORT || 3000;

const users = [
    { email: 'isaac.hayfron@amalitech.com', name: 'Isaac Hayfron', password: 'Fe|3V3=$T_.K' },
    { email: 'donald.akite@amalitech.com', name: 'Donald Akite', password: 'O(RDaZ*J=?.Q' },
    { email: 'ebenezer.antwi@amalitech.com', name: 'Ebenezer Antwi', password: ";H_d'%y-f?Iq" },
    { email: 'kendrick.oppong@amalitech.com', name: 'Kendrick Oppong', password: 'T[<?\\+DyKk~+' },
    { email: 'paul.blankson@amalitech.com', name: 'Paul Blankson', password: ']K3`7S}H\\c.d' },
    { email: 'abdul-rashid.issah@amalitech.com', name: 'Abdul-rashid Issah', password: 'xKbj?@e]LKV6' },
    { email: 'david.quaye@amalitech.com', name: 'David Quaye', password: '`5vfRUTFN>?*' },
    { email: 'ferdinald.dogbey@amalitech.com', name: 'Ferdinald Dogbey', password: 'kX8@!yQ5zW#L' },
    { email: 'kwadjo.boadi-mantey@amalitech.com', name: 'Kwadjo Boadi-mantey', password: 'P$1x&7z!Q9^T' },
    { email: 'halic.mahamudu@amalitech.com', name: 'Halic Mahamudu', password: 'G@5z!Q8x&7P$' },
    { email: 'evans.elabo@amalitech.com', name: 'Evans Elabo', password: 'R#2y&6z!Q8x%' },
    { email: 'michael.darko@amalitech.com', name: 'Michael Darko', password: 'T$3x&9z!Q5y%' },
    { email: 'bismark.yamoah@amalitech.com', name: 'Bismark Yamoah', password: 'U@4z!Q7x&6y%' },
    { email: 'samuel.kasu@amalitech.com', name: 'Samuel Kasu', password: 'V$5x&8z!Q4y%' },
    { email: 'magnus.kutuson@amalitech.com', name: 'Magnus Kutuson', password: 'W@6z!Q3x&9y%' },
    { email: 'nicholas.kyereboah@amalitech.com', name: 'Nicholas Kyereboah', password: 'X$7x&2z!Q6y%' },
    { email: 'bismark.boateng@amalitech.com', name: 'Bismark Boateng', password: 'Y@8z!Q1x&5y%' },
    { email: 'solomon.aboagye@amalitech.com', name: 'Solomon Aboagye', password: "Ra$'|2Z_u~{Q" },
    { email: 'essel.abraham@amalitech.com', name: 'Essel Abraham', password: 'ZY?:wS_gHBB}' },
    { email: 'justice.owusu@amalitech.com', name: 'Justice Owusu', password: '[S9nl7np^Pw9' },
    { email: 'aliu.manaf@amalitech.com', name: 'Aliu Manaf', password: '/Q~DJ]CS,s\\J' },
    { email: 'sylvester.kyei@amalitech.com', name: 'Sylvester Kyei', password: 'J>|<"A:}$;n\'' },
    { email: 'zerebel.tanu@amalitech.com', name: 'Zerebel Tanu', password: '=9ZT>XQ5[k+N' },
    { email: 'esther.odzao@amalitech.com', name: 'Esther Odzao', password: 'PJQMkNf?r\\u8' },
    { email: 'stephen.adu@amalitech.com', name: 'Stephen Adu', password: 'i:^LphOukR@v' }
  ]

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

// const corsOptions = { 
//     origin: '*',
// }
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

// Load initial data from JSON file
let invoices = JSON.parse(fs.readFileSync('./src/data.json'));

// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY || 'HelloWorld'

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
    // console.log(isValidEmail(username) && isValidPassword(password))
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