// import module express
const express = require("express");

// import module body parser
const bodyParser = require("body-parser");
//import mongoose module
const mongoose = require("mongoose");
//connect express with DB
mongoose.connect('mongodb://127.0.0.1:27017/factureDB');

//import bcrypt module
const bcrypt = require('bcrypt');

// import jwt module
const jwt = require('jsonwebtoken');
//import session module
const session = require('express-session');

//import multer module
const multer = require("multer");

//import path module
const path = require("path");

const fs = require("fs");
const PDFDocument = require("./pdfkit");

// création app BE app
const app = express();



// bodyParser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );

    next();
});

//session configuration
const secretKey = 'your-secret-key';
app.use(session({
    secret: secretKey,
}));

//image configuration
//shortCutPath==backend/images
app.use('/shortCutPath', express.static(path.join('backend/images')))
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/images')
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});


//Models importation***** 
const Formation = require("./models/formation");
const Devis = require("./models/devis");
const User = require("./models/user");
const Facture = require("./models/facture");






//here BL:add formation
app.post("/api/formations", multer({ storage: storage }).single('picture'), (req, res) => {
    req.body.picture = `http://localhost:3000/shortCutPath/${req.file.filename}`;

    let formationObj = new Formation(req.body);

    formationObj.save();
    res.json({ msg: "add with success" });
});

//here BL :get all formation
app.get("/api/formations", (req, res) => {
    Formation.find().then((docs) => {
        res.json({ formations: docs });
    })


});

//here BL :get formation by id
app.get("/api/formations/:id", (req, res) => {
    Formation.findById(req.params.id).then((doc) => {

        res.json({ formation: doc });
    })

})

//here BL : delete formation by id
app.delete("/api/formations/:id", (req, res) => {
    Formation.deleteOne({ _id: req.params.id }).then((deleteResponse) => {
        if (deleteResponse.deletedCount == 1) {
            res.json({ message: 'success' })
        } else {
            res.json({ message: 'error' })
        }
    })
})

//here BL : update formation
app.put("/api/formations", (req, res) => {
    console.log(req.body)
    Formation.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
        if (updateResponse.nModified == 1) {
            res.json({ message: 'edited with success' });

        } else {
            res.json({ message: 'Errors' });

        }

    })
})



//here BL:add devis
app.post("/api/devis", (req, res) => {
    Formation.findById(req.body.formationId).then((formation) => {
        if (!formation) {
            res.json({ msg: "formation not found" });

        } else {
            //formation found
            let devis = new Devis(req.body);
            devis.save((err, doc) => {
                if (err) {
                    res.json({ msg: "devis not saved" });

                } else {
                    formation.devisId.push(doc);
                    formation.save();

                    User.findById(req.body.userId).then((user) => {
                        if (!user) {
                            res.json({ msg: "user not found" });
                        } else {
                            user.devisId.push(doc);
                            user.save();
                            res.json({ msg: "devis  saved with success" });
                        }
                    })

                }
            })
        }
    })





});


//here BL :get all devis
app.get("/api/devis", (req, res) => {
    Devis.find().then((docs) => {

        res.json({ devis: docs });
    })


});

//Here BL get devis by id
app.get("/api/devis/:id", (req, res) => {
    Devis.findById(req.params.id).then((doc) => {
        res.json({ devis: doc })
    })
});

//Here BL delete devis
app.delete("/api/devis/:id", (req, res) => {
    Devis.deleteOne({ _id: req.params.id }).then((deleteResponse) => {
        if (deleteResponse.deletedCount == 1) {
            res.json({ message: 'success' })
        } else {
            res.json({ message: 'error' })
        }
    })
})

//Here BL edit devis
app.put("/api/devis", (req, res) => {
    Devis.updateOne({ _id: req.params._id }, req.body).then((updateResponse) => {
        if (updateResponse.nModified == 1) {
            res.json({ message: 'edited with success' });

        } else {
            res.json({ message: 'Errors' });

        }
    })
})


// Here BL:add facture
app.post("/api/factures", (req, res) => {
    Formation.findById(req.body.formationId).then((formation) => {
        if (!formation) {
            res.json({ msg: "formation not found" });

        } else {
            //formation found
            let facture = new Facture(req.body);
            facture.save((err, doc) => {
                if (err) {
                    res.json({ msg: "facture not saved" });

                } else {
                    formation.factureId.push(doc);
                    formation.save();
                    User.findById(req.body.userId).then((user) => {
                        if (!user) {
                            res.json({ msg: "formation not found" });

                        } else {


                            user.factureId.push(doc);
                            user.save();
                            res.json({ msg: "facture  saved with success" });


                        }
                    })

                }
            })
        }
    })



});


//Here BL : get all facture
app.get("/api/factures", (req, res) => {
    Facture.find().then((docs) => {
        res.json({ factures: docs })
    })
})

//Here BL get facture by id
app.get("/api/factures/:id", (req, res) => {
    Facture.findByIdAndUpdate(req.params.id, { status: 'payé' }).then((doc) => {
        if (!doc) {
            res.json({ msg: 'error' });


        } else {
            res.json({ msg: 'success' });

        }
    })
})

//Here BL delete facture
app.delete("/api/factures/:id", (req, res) => {
    Facture.deleteOne({ _id: req.params.id }).then((deleteResponse) => {
        if (deleteResponse.deletedCount == 1) {
            res.json({ message: 'success' });
        } else {
            res.json({ message: 'error' });
        }
    })
});

//Here edit facture
app.put("/api/factures", (req, res) => {
    Facture.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
        if (updateResponse.nModified == 1) {
            res.json({ message: 'edited with success' });

        } else {
            res.json({ message: 'Errors' });

        }

    })
})




//Here BL:search factureby phone number
app.post("/api/factures/search", (req, res) => {
    console.log("here user phone", req.body);
    User.findOne({ phone: req.body.phone }).then((user) => {
        if (!user) {
            res.json({ msg: "Aucune Facture : Numéro Introuvable" })
        } else {
            Facture.find({ userId: user._id }).populate("formationId").populate("userId").then((factures) => {
                console.log("here factures", factures);
                res.json({ factures: factures })
            })
        }
    })
})









//here BL :add user 
//picture de front :service
app.post("/api/users/signup", multer({ storage: storage }).single('picture'), (req, res) => {
    bcrypt.hash(req.body.password, 10).then((newPwd) => {
        req.body.password = newPwd;
        //picture de model
        req.body.picture = `http://localhost:3000/shortCutPath/${req.file.filename}`;

        const userobj = new User(req.body);
        userobj.save();
        res.json({ msg: "signup with success" });
    })
});




//here BL :get all users/{ role: 'client' }
app.get("/api/users", (req, res) => {
    User.find().then((docs) => {
        res.json({ users: docs });
    })
})

//here BL :get user by id
app.get("/api/users/:id", (req, res) => {
    User.findOne({ _id: req.body._id }).then((doc) => {
        res.json({ user: doc });
    });
});


//here BL :delete user by id
app.delete("/api/users/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id }).then((response) => {
        if (response.deletedCount == 1) {
            res.json({ msg: 'delete with success' });
        } else {
            res.json({ msg: 'error' });

        }
    })
})





//Here BL : login
app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }).then((doc) => {

        if (!doc) {
            res.json({ msg: 'check email' })

        } else {
            bcrypt.compare(req.body.password, doc.password).then((pwdResult) => {
                if (!pwdResult) {
                    res.json({ msg: 'check your password' });

                } else {
                    let userToSend = {
                        _id: doc._id,
                        role: doc.role,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        picture: doc.picture,
                        phone: doc.phone,
                    }
                    //encoder userToSend
                    const token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' });
                    res.json({ msg: 'welcome', user: token });
                }

            })
        }
    })
})




//Here BL :get all devis with formation info
app.get("/api/devisFormation", (req, res) => {
    Devis.find().populate("formationId").populate("userId").then((docs) => {
        res.json({ devis: docs });

    })
});


//Here BL :get all factures with formation info
app.get("/api/factureFormation", (req, res) => {
    Facture.find().populate("formationId").populate("userId").then((factures) => {
        res.json({ factures: factures });
    })
});

//here BL:get devis of client
app.get("/api/devisFormation/:id", (req, res) => {
    Devis.find({ userId: req.params.id }).populate("formationId").populate("userId").then((docs) => {
        res.json({ devis: docs });

    })
});
//here BL:get factures of client
app.get("/api/factureFormation/:id", (req, res) => {
    Facture.find({ userId: req.params.id }).populate("formationId").populate("userId").then((factures) => {
        res.json({ factures: factures });
    })
});



//here into BL :edit profile
app.put("/api/users", (req, res) => {
    User.findOne({ _id: req.body.userId }).then((doc) => {
        if (!doc) {
            res.json({ msg: "user not found" });
        } else {
            bcrypt.compare(req.body.oldPassword, doc.password).then((pwdResult) => {
                if (!pwdResult) {
                    res.json({ msg: "please check your old password" });

                } else {
                    bcrypt.hash(req.body.newPassword, 10).then((cryptePwd) => {
                        let newObj = { phone: req.body.phone, password: cryptePwd };
                        User.updateOne({ _id: req.body.userId }, newObj).then((editResult) => {
                            if (editResult.nModified == 1) {
                                res.json({ msg: "edited with success" });
                            } else {
                                res.json({ msg: "error" });

                            }
                        })
                    })
                }
            });

        }
    })
})


//Here BL :generate pdf facture 
app.get("/api/factures/pdf/:id", (req, res) => {
    Facture.findOne({ _id: req.params.id }).populate("formationId").populate("userId").then((facture) => {
        console.log("here doc", facture);
        if (!facture) {
            console.log("ERROR");
        } else {
            function generateInvoice(invoice) {
                const doc = new PDFDocument();
// Function to format timestamp
function formatTimestamp(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    
    return `${year}/${month}/${day} `;
}
                // Pipe the PDF into a writable stream
                doc.pipe(fs.createWriteStream(`backend/pdfs/facture-${facture.userId.firstName} ${facture.userId.lastName}.pdf`));

                // Add the header
                doc
                    .image("backend/images/croco.jpg", 50, 45, { width: 60 })
                    .fillColor("#444444")
                    .fontSize(20)
                    .text("Facture", 130, 57)
                    .fontSize(10)
                    .text("Imm Yasmine Tower", 200, 65, { align: "right" })
                    .text("Centre Urbain Nord", 200, 80, { align: "right" })
                    .text(" 23129129", 200, 95, { align: "right" })
                    .moveDown()
                    .text(`Date: ${formatTimestamp(new Date())}`, 50, 130, { align: "right" });

                // Add client details
                doc.fontSize(12).text(`Prénom: ${invoice.clientId}`, 50, 100);
                doc.text(`Nom: ${invoice.clientName}`, 50, 120);

                // Add table header
                doc.fontSize(10).font('Helvetica-Bold');
                const tableTop = 160;
                const itemX = 50;
                const descriptionX = 150;
                const durationX = 270;
                const priceHTX = 320;
                const tvaX = 390;
                const priceTTCX = 440;
                const quantityX = 497;

                doc.text('Nom formation', itemX, tableTop);
                doc.text('Description', descriptionX, tableTop);
                doc.text('Durée', durationX, tableTop);
                doc.text('Prix HT', priceHTX, tableTop);
                doc.text('TVA %', tvaX, tableTop);
                doc.text('Prix TTC', priceTTCX, tableTop);
                doc.text('Quantité', quantityX, tableTop);
// Set font back to regular for items
doc.font('Helvetica');

                // Add the items
                let y = 180;
                invoice.items.forEach(item => {
                    doc.text(item.name, 50, y);
                    doc.text(item.description, 150, y);
                    doc.text(item.duration, 270, y);
                    doc.text(item.priceHT, 320, y);
                    doc.text(item.TVA, 390, y);
                    doc.text(item.priceTTC, 450, y);
                    doc.text(item.qty,380 , y,{ align: 'right' });
                    // doc.text(item.priceHT.toFixed(2), 300, y, { align: 'right' });
                    y += 20;
                });

 // Add total
 doc.fontSize(14).text('Total', 50, y + 100);
 doc.text(invoice.total.toFixed(2), 300, y + 100, { align: 'right' });


 doc.image("backend/images/cc.jpg", 460, 400, { width: 100 })

                // Finalize the PDF and end the stream
                doc.end();
            }

            // Example usage
            const invoice = {
                clientId: facture.userId.firstName,
                clientName: facture.userId.lastName,
                items: [
                    {
                        name: facture.formationId.name,
                        description: facture.formationId.description,
                        duration: facture.formationId.duration,
                        priceHT: facture.formationId.priceHt,
                        TVA: facture.formationId.tva,
                        priceTTC: facture.formationId.priceTtc,
                        qty: facture.quantity,
                        date: facture.date
                    },

                ],
                total:facture.formationId.priceTtc,
            };

            generateInvoice(invoice);
        }
    });
})

// HERE BL : generate pdf devis
app.get("/api/devis/pdf/:id", (req, res) => {
    Devis.findOne({ _id: req.params.id }).populate("formationId").populate("userId").then((devis) => {
        console.log("here doc", devis);
        if (!devis) {
            console.log("ERROR");
        } else {
            function generateInvoice(invoice) {
                const doc = new PDFDocument();
// Function to format timestamp
function formatTimestamp(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    
    return `${year}/${month}/${day} `;
}
                // Pipe the PDF into a writable stream
                doc.pipe(fs.createWriteStream(`backend/pdfdevis/devis-${devis.userId.firstName} ${devis.userId.lastName}.pdf`));

                // Add the header
                doc
                    .image("backend/images/croco.jpg", 50, 45, { width: 60 })
                    .fillColor("#444444")
                    .fontSize(20)
                    .text("Devis", 130, 57)
                    .fontSize(10)
                    .text("Imm Yasmine Tower", 200, 65, { align: "right" })
                    .text("Centre Urbain Nord", 200, 80, { align: "right" })
                    .text(" 23129129", 200, 95, { align: "right" })
                    .moveDown()
                    .text(`Date: ${formatTimestamp(new Date())}`, 50, 130, { align: "right" });

                // Add client details
                doc.fontSize(12).text(`Prénom: ${invoice.clientId}`, 50, 100);
                doc.text(`Nom: ${invoice.clientName}`, 50, 120);

                // Add table header
                doc.fontSize(10).font('Helvetica-Bold');
                const tableTop = 160;
                const itemX = 50;
                const descriptionX = 150;
                const durationX = 270;
                const priceHTX = 320;
                const tvaX = 390;
                const priceTTCX = 440;
                const quantityX = 497;

                doc.text('Nom formation', itemX, tableTop);
                doc.text('Description', descriptionX, tableTop);
                doc.text('Durée', durationX, tableTop);
                doc.text('Prix HT', priceHTX, tableTop);
                doc.text('TVA %', tvaX, tableTop);
                doc.text('Prix TTC', priceTTCX, tableTop);
                doc.text('Quantité', quantityX, tableTop);
// Set font back to regular for items
doc.font('Helvetica');

                // Add the items
                let y = 180;
                invoice.items.forEach(item => {
                    doc.text(item.name, 50, y);
                    doc.text(item.description, 150, y);
                    doc.text(item.duration, 270, y);
                    doc.text(item.priceHT, 320, y);
                    doc.text(item.TVA, 390, y);
                    doc.text(item.priceTTC, 450, y);
                    doc.text(item.qty,380 , y,{ align: 'right' });
                    // doc.text(item.priceHT.toFixed(2), 300, y, { align: 'right' });
                    y += 20;
                });


                doc.image("backend/images/cc.jpg", 460, 300, { width: 100 })

                // Finalize the PDF and end the stream
                doc.end();
            }

            // Example usage
            const invoice = {
                clientId: devis.userId.firstName,
                clientName: devis.userId.lastName,
                items: [
                    {
                        name: devis.formationId.name,
                        description: devis.formationId.description,
                        duration: devis.formationId.duration,
                        priceHT: devis.formationId.priceHt,
                        TVA: devis.formationId.tva,
                        priceTTC: devis.formationId.priceTtc,
                        qty: devis.quantity,
                        date: devis.date
                    },

                ],
            };

            generateInvoice(invoice);
        }
    });
})









module.exports = app; // make app exportable