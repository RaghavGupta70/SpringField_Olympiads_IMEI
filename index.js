import express from "express";
import bodyParser from "body-parser";
import imei from "imei";

const app = express();

let errorType="";
var imei_N="";


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",(req,res) =>{
  
    res.render("home",{errorMessage: errorType,imei: imei_N});
})


app.get("/IMEI",(req,res) => {
     imei_N = req.query.imei_search;

    var result = imei.isValid(imei_N);
    if(imei_N.length!==15)
    {
        errorType="This is not a complete 15 digit Number";
    }

    else
    {
        if(result===true)
        {
            errorType="This is a valid IMEI Number";
        }

      else
       {   
           const slice_IMEI = imei_N.slice(0,14);
           const last_digit = imei_N.slice(14);
           var true_digit;
           console.log(last_digit);

           var i;
           for(i=0;i<10;i++)
           {
               var newValidIMEI = slice_IMEI+i.toString();
               if(imei.isValid(newValidIMEI))
               {
                   result = true;
                   true_digit=i;
                   errorType = `Change the last digit ${last_digit} to ${true_digit} to get a valid IMEI Number`;
                   break;
               }
           }

       }

    }

    res.redirect("/");

})

app.listen(process.env.PORT||5000,()=>{
    console.log(`Server is connected successfully `);
})