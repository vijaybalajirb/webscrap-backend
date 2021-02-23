const request = require("request-promise")
const cheerio = require("cheerio")


const mobiles = 
["https://www.amazon.in/OnePlus-Nord-Gray-256GB-Storage/dp/B08697WT6D?ref_=Oct_s9_apbd_orecs_hd_bw_b1W1uk3&pf_rd_r=9M05EPRGBNF0G39QGJCP&pf_rd_p=ff99c2d8-5928-541a-9526-8dd3871ad289&pf_rd_s=merchandised-search-10&pf_rd_t=BROWSE&pf_rd_i=1389432031#",
"https://www.amazon.in/Test-Exclusive-557/dp/B077PWJ8RS?ref_=Oct_s9_apbd_omg_hd_bw_b1W1uk3&pf_rd_r=9M05EPRGBNF0G39QGJCP&pf_rd_p=aa7aca94-f142-5f9e-bcd8-870f1b0d5712&pf_rd_s=merchandised-search-10&pf_rd_t=BROWSE&pf_rd_i=1389432031",
"https://www.amazon.in/Samsung-Galaxy-Space-Black-Storage/dp/B07HGN617M/ref=sr_1_1?dchild=1&qid=1613990782&refinements=p_89%3ASamsung&rnid=3837712031&s=electronics&sr=1-1",
"https://www.amazon.in/Samsung-Galaxy-Storage-Additional-Exchange/dp/B07X8V5YKR/ref=sr_1_14?dchild=1&qid=1614012265&refinements=p_89%3ASamsung%2Cp_n_feature_eleven_browse-bin%3A21329569031&rnid=21329560031&s=electronics&sr=1-14",
"https://www.amazon.in/Samsung-Phantom-Storage-Additional-Exchange/dp/B08LRDTN6H/ref=sr_1_15?dchild=1&qid=1614012265&refinements=p_89%3ASamsung%2Cp_n_feature_eleven_browse-bin%3A21329569031&rnid=21329560031&s=electronics&sr=1-15",
];

let amaze=async () => {
    let mobileData = []
    for(let mobile of mobiles){
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
        let title = $('span[id="productTitle"]').text().replace(/\n/g, '')
        let src = $('div[id="imgTagWrapperId"] > img').attr('src');
        let rating =  $('span[class="a-icon-alt"]').text().substring(0,18)
        let price = $('span[id="priceblock_ourprice"]').text() || $('span[class="priceBlockStrikePriceString a-text-strike"]').text()
        let offerprice = $('span[id="priceblock_dealprice"]').text()
        let stockInfo = $('span[class="a-size-medium a-color-success"]').text().replace(/\n/g, '')

    
        mobileData.push({
            title,src,rating,price,offerprice,stockInfo
        });
    }
   
    return mobileData;
};

let mobileData = amaze()

module.exports = mobileData