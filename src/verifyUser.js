// import { users } from "../users"

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
module.exports = {
    isValidEmail,
    isValidPassword
}