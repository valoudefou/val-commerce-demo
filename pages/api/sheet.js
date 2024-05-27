import { google } from "googleapis";
import keys from "../../key";

export default function handler(req, res) {
    try {
        const client = new google.auth.JWT(
            keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize(async function(err, tokens) {
            if (err) {
                return res.status(400).send(JSON.stringify({error: true}));
            }
        
            const gsapi = google.sheets({version:'v4', auth: client});

            //CUSTOMIZATION FROM HERE
            const opt = {
                spreadsheetId: (process.env.NEXT_PUBLIC_INDEXSHEET),
                range: 'quickstartdemo-valerian1!A:Z'
            };

            let data = await gsapi.spreadsheets.values.get(opt);
            return res.status(400).send(JSON.stringify({data: data.data.values.slice(1).map(([smallImage,largeImage,price,salePrice,margin,productId,title,brand,productUrl,category,availability,quantity,attribute,attribute1,attribute2,attribute3,attribute4,attribute5,attribute6,attribute7,attribute8,attribute9,attribute10,attribute11,description,availabilityDate,expirationDate,saleEffectiveDate,condition]) => ({ smallImage,largeImage,price,salePrice,margin,productId,title,brand,productUrl,category,availability,quantity,attribute,attribute1,attribute2,attribute3,attribute4,attribute5,attribute6,attribute7,attribute8,attribute9,attribute10,attribute11,description,availabilityDate,expirationDate,saleEffectiveDate,condition }))}));
        });
    } catch (e) {
        return res.status(400).send(JSON.stringify({error: true, message: e.message}));
    }
}