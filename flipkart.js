const request = require("request-promise")
const cheerio = require("cheerio")


const mobiles = 
["https://www.flipkart.com/samsung-galaxy-s21-ultra-phantom-black-256-gb/p/itmbec2f700e2ff3?pid=MOBFZ3TMSMXZATX3&lid=LSTMOBFZ3TMSMXZATX354XEIV&otracker=clp_bannerads_1_7.bannerAdCard.BANNERADS_Tecno-dtclpw_mobile-phones-store_B5DEJN3IR67C",
"https://www.flipkart.com/samsung-galaxy-f41-fusion-blue-64-gb/p/itmcdc5e93b44d55?pid=MOBFV5PWHRYTYYJF&lid=LSTMOBFV5PWHRYTYYJFLE0GZO&marketplace=FLIPKART&srno=b_1_1&otracker=clp_banner_2_11.bannerX3.BANNER_mobile-phones-store_Z4SSAY79E8JF&fm=neo%2Fmerchandising&iid=e64e1dd5-4757-4d8a-960b-00507d13c669.MOBFV5PWHRYTYYJF.SEARCH&ppt=clp&ppn=mobile-phones-store&ssid=jtwon05igg0000001614020735103",
"https://www.flipkart.com/moto-g-5g-volcanic-grey-128-gb/p/itm5bafe435ec358?pid=MOBFTZE7GER2URWX&lid=LSTMOBFTZE7GER2URWXCMILGC&otracker=clp_banner_1_14.bannerX3.BANNER_mobile-phones-store_EBG27AJF0ZUU&fm=neo%2Fmerchandising&iid=M_fa1fbca6-87b8-4232-b429-db8e697910bd_14.EBG27AJF0ZUU&ppt=clp&ppn=mobile-phones-store",
"https://www.flipkart.com/lg-wing-illusion-sky-128-gb/p/itmdff880cc632cf?pid=MOBFWRJSKFGV4MSY&param=18&otracker=clp_banner_3_15.bannerX3.BANNER_mobile-phones-store_OB6ZZCSSEDY5&fm=neo%2Fmerchandising&iid=M_a62ce458-e249-44da-95e9-09ba985e1965_15.OB6ZZCSSEDY5&ppt=clp&ppn=mobile-phones-store",
"https://www.flipkart.com/apple-iphone-12-black-128-gb/p/itmf1f0a58f1ecd7?pid=MOBFWBYZK3HACR72&lid=LSTMOBFWBYZK3HACR72SELGT5&marketplace=FLIPKART&srno=b_1_1&otracker=clp_banner_1_22.bannerX3.BANNER_mobile-phones-store_2DSKJ20X31Y7&fm=neo%2Fmerchandising&iid=9666b2a5-a114-4010-9b7c-17fd70626ae0.MOBFWBYZK3HACR72.SEARCH&ppt=clp&ppn=mobile-phones-store&ssid=xe5asd8ei80000001614020830677"


];

let flip=async () => {
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
        let title = $('span[class="B_NuCI"]').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        let src = $('div[class="q6DClP"]').attr('style').match(/\bhttps?:\/\/\S+/gi).replace((),"").toString()
        let rating =  $('div[class="_3LWZlK"]').text().substring(0,3)
        let price = $('div[class="_3I9_wc _2p6lqe"]').text()
        let offerprice = $('div[class="_30jeq3 _16Jk6d"]').text()
        let stockInfo = "Available"

    
        mobileData.push({
            title,src,rating,price,offerprice,stockInfo
        });
    }
   
    return mobileData
};

mobileData = flip()
module.exports=mobileData;
