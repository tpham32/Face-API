require("dotenv").config();
const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");
//const uuid = require("uuid/v4");
const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { version } = require("os");
const port = 3000;
const subscriptionKey = process.env.API_KEY;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const options ={
    swaggerDefinition: {
        info:{
            title:'Face detection and verification using Azure API',
            version:'1.0.0',
            description:'Dectect faces from images and display details infor about the image. Verify the if the person in 2 images belong to one person.'
        },
        host:'localhost:3000',
        basePath:'/',
    },
    apis: ['./app.js']
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());


const key = subscriptionKey;
const endpoint ='https://faceapi6177.cognitiveservices.azure.com';


/**
 * @swagger
 * /detect:
 *    post:
 *      description: Detect if there are any faces in the provided image URL
 *      produces:
 *          - application/jason
 *      parameters:
 *          - in: body
 *            name: imageUrl
 *            required: true
 *      responses:
 *          200:
 *              description: Provided image has been scanned successfully
 *          400:
 *              description: Error! Bad request
 */
app.post('/detect', (req, res, next)=>{
    const imageUrl = req.body.imageUrl;

    axios({
        method: 'post',
        url: endpoint+'/face/v1.0/detect',
        params:{
            detectionModel: 'detection_03',
            returnFaceId: true
        }, 
        data: {
            url: imageUrl
        },
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': key
        }
    }).then (function (response){
        console.log(response.data[0].faceId);
        res.json(response.data);
        
    }).catch(function (error){
        res.json({error})
    });
});



/**
 * @swagger
 * /verify:
 *    post:
 *      description: Verify if the person in the two provided images is the same person
 *      produces:
 *          - application/jason
 *      parameters:
 *          - in: body
 *            name: imageUrl
 *            required: true
 *      responses:
 *          200:
 *              description: Provided image has been scanned successfully
 *          400:
 *              description: Error! Bad request
 */
//
app.post('/verify', (req, res, next)=>{
    const pic1 = req.body.pic1;
    const pic2 = req.body.pic2;
    axios({
        method: 'post',
        url: endpoint+'/face/v1.0/detect',
        params : {
            detectionModel: 'detection_03',
            returnFaceId: true
        },
        data: {
            url: pic1,
        },
        headers: { 'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': key }
    })
    .then(function (response) {
        const face1 = response.data[0].faceId;
        axios({
            method: 'post',
            url: endpoint+'/face/v1.0/detect',
            params : {
                detectionModel: 'detection_03',
                returnFaceId: true
            },
            data: {
                url: pic2,
            },
            headers: { 'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': key }
        })
        .then(function (response) {
            const face2 = response.data[0].faceId;
            axios({
                method: 'post',
                url: endpoint+'/face/v1.0/verify',
                data: {
                    faceId1: face1,
                    faceId2: face2
                },
                headers: { 'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': key }
            })
            .then(function (response) {
                res.json(response.data);
                
            }).catch(function (error) {
                console.log(error);
            });
            
                }).catch(function (error) {
                        console.log(error);
                });
                        }).catch(function (error) {
                                console.log(error);
                        });
});






app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});