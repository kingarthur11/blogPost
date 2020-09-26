const { response } = require('express');
const admin = require('firebase-admin');

var serviceAccount = require("./fireBasePermit.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-api-9a206..firebaseio.com"
});
const dbs = admin.firestore();


exports.postBlog  = (req, res) =>{
    (async () =>{
        try {  
            const {title, body} = req.body;
            const data = {
                title, body
            }          
            const docRef =  await dbs.collection('myBlog').add(data);     
            response.json({
                data: docRef.data()
            }); 
            return res.status(200).send();
        }catch(error){
            console.log("there was an error running this file");
            return res.status(500).send(error);            
        }
    })();
};

exports.getBlog  = (req, res) => {
    (async () => {
        try {
            const page = dbs.collection('myBlog').doc(req.params.blog_id);
            let item = await page.get();
            let response = item.data();
            return res.status(200).send(response);
        }catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
};

exports.getAllBlog = (req, res) => {
    (async () => {
        try { 
            let findAll = dbs.collection('myBlog');
            let response = [];
            await findAll.get().then(queryAll => {
                let docs = queryAll.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        item: doc.data().myBlog
                    };
                    response.push(selectedItem);
                }
                return res.status(200).send(response);
            });            
           
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
};