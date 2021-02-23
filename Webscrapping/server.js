const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const request = require("request-promise")
const cheerio = require("cheerio")
const flipkart = require("./flipkart")
const amazon = require('./amazon');
const port = process.env.PORT || 3000

const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient
const dbUrl = "mongodb+srv://dbUser:dbUserPassword@cluster0.r4zp1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const dbUrl = "mongodb://127.0.0.1:27017"



const snapmobiles = 
["https://www.snapdeal.com/product/mi-red-note-7-pro/8070451197046739547#bcrumbLabelId:175",
"https://www.snapdeal.com/product/samsung-galaxy-m01-32gb-3/6917529664401558407#bcrumbLabelId:175",
"https://www.snapdeal.com/product/blackberry-black-passport-32gb/6917529687794600048#bcrumbLabelId:175",
"https://www.snapdeal.com/product/realme-c15-64gb-4-gb/624701414923#bcrumbLabelId:175",
"https://www.snapdeal.com/product/oppo-cph2083-64gb-4-gb/5764608142801229342"
];



let data=async () => {
    let snapmobileData = []
    for(let mobile of snapmobiles){
        const response = await request({
            uri:mobile,
            headers:{
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7"
            },
            gzip:true
        });
        let $ = cheerio.load(response)
        let title = $('div[class="col-xs-22"]>h1').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        let src = $('img[class="cloudzoom"]').attr('src')
        let rating =  $('span[itemprop="ratingValue"]').text()
        let price = $('div[class="pdpCutPrice"]').text()
        let offerprice = $('span[class="payBlkBig"]').text()
        let stockInfo = $('div[class="clearfix inventory txt-center fnt-12"]').text().replace(/\n/g, '')

    
        snapmobileData.push({
            title,src,rating,price,offerprice,stockInfo
        });
    }

   
   // console.log(mobileData)
    return snapmobileData;
    
};


app.post("/snapdeal", async (req,res)=>{
    
    try{
        let snapmobileData = await data()
        //console.log(snapmobileData)
        let client = await mongoClient.connect(dbUrl,{useUnifiedTopology:true})
        
        let db = client.db("mobile")
        await db.collection("snapdeal").insertOne({snapmobileData})
        client.close()
        res.status(200).json({
            message: "Added 1 entry"
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

app.post("/flipkart", async (req,res)=>{
    
    try{
        let snapmobileData = await flipkart;
        //console.log(snapmobileData)
        let client = await mongoClient.connect(dbUrl,{useUnifiedTopology:true})
        
        let db = client.db("mobile")
        await db.collection("flipkart").insertOne({snapmobileData})
        client.close()
        res.status(200).json({
            message: "Added 1 entry"
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

app.post("/amazon", async (req,res)=>{
    
    try{
        let snapmobileData = await amazon;
        //console.log(snapmobileData)
        let client = await mongoClient.connect(dbUrl,{useUnifiedTopology:true})
        
        let db = client.db("mobile")
        await db.collection("amazon").insertOne({snapmobileData})
        client.close()
        res.status(200).json({
            message: "Added 1 entry"
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

app.get("/flipkart",async (req,res)=>{
    try{
        let client = await mongoClient.connect(dbUrl,{useUnifiedTopology:true})
        let db = client.db("mobile")
        let data = await db.collection("flipkart").find()
        client.close()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


app.get("/amazon",async (req,res)=>{
    try{
        let client = await mongoClient.connect(dbUrl,{useUnifiedTopology:true})
        let db = client.db("mobile")
        let data = await db.collection("amazon").find().toArray()
        client.close()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


app.get("/snapdeal",async (req,res)=>{
    try{
        let client = await mongoClient.connect(dbUrl,{useUnifiedTopology:true})
        let db = client.db("mobile")
        let data = await db.collection("snapdeal").find().toArray()
        client.close()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


app.get("/",(req,res)=>{
    res.send("hai")
})

app.listen(port,()=>{
    console.log("Server running on: http://localhost:"+port)
})
