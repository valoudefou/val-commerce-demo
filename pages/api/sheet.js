import { google } from "googleapis";
// import keys from "../../key";

export default function handler(req, res) {
    try {
        const client = new google.auth.JWT(
            'product-feed-googlesheet@product-feed-424615.iam.gserviceaccount.com', null, '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2iz5A9RsPsULB\nyMpKX+nHs67CpzHN2quDHPJKbn48/aeihk7lgHjXm3eqnoN5lZjzbbwuTPsBjkeS\nMrnnuSj39Iq4Vzn1ypNimDF+XEmjaeRZ1+pOF5hMy8Far34yeHS6CJvEq38SqHza\nHvrfgbXKiu6ri5XhoRtkLlcnLoFQ+3D6oNMCemgB5UapgXA/a9vwDc98ym/wqFUG\nmjfDI+HH3NF6Atqabtu3XNhwAodSmAC5NvOhtCHUnTyeQa/Hm97u1lZNX9m1timK\nelD4qrd+RtNlkgz4gMu8IkY8/F92ZgPt9Gf2Ke5+IuXMBV+/YyZZGNxr9B2aD6ra\ng0odnh9zAgMBAAECggEAPk9QbDbeSmB9A43I81NDBw5f+IS+vOBIDES8tch6odIJ\nvzHuS2urlBk241AhW8bDQ1CxW/Kd+X16E77p812iTOU11s+7cpl37r85ocLZxgSW\n1E4d5hMqwwgIE670ukCgw4G9vge2JAXMPF43z0RE7AK5jmfivPZT1cH1sOOwc5YU\ngin5C8exqD9lcsuES5vjkNdknSd9UcZKD7o4ELLm3f7V2YJSt6QIkJjarcFbsEoe\nqJzWpkxMBY4pxPUn5RMEW+sIN7FQL1cHeT1UpyEbHVfKJtu/Ok2oQhEmv5PpOfX4\nZjw/VgeGKIEMAQZJieE+3IMGK4PHhaar3MTP5dAm+QKBgQDqC8LCW35Ltsfh5yKs\n3ekl57/ahb+v6gBMc4tJvd6E3egZiVwY4NCge97sUFwWIEsrfv5POOEgrjhEHoZF\nZDC9f7whci8AvLJNjXkoq6Z1eRlL3h19ywEb61c0XJIA88HUEZE7WatnpLs/91qT\nCTNZ9dTsExoMYHIAw4gB77WFuQKBgQDHqr5gDRUNevRQfBKAchK6MIeGT2ckAY6X\nJo1eAk6zQGqCe5wMcl36i7OIXMgcKa32IA+l6anAkckAZ7Z2UNLVaiSOQdEptioi\nfVAYzn4lpXPvvSxE0P1cMzcfcMCZaYap+UCXO/l1Oz7kIoPT3iUIawxiNITSu2yz\n3/D+AYSkiwKBgHRnQwdNYAQiNUmqnnlhqTq8B5SUnuDMPjfH48faUhi9EVnaEl8h\nOUIIObhIw3QRvbE1aSBXxshtPfjLQbazfPZS2Gu+EZiJQRkHOvI6ZQDaKPWt0/cj\nhzqukuGtBMTKd2WVEyl0kKZsrODEkly837hnZu2/Fl5/fVPZ7AQih6KpAoGBAJOy\nkzb8FmmtXVK4JPuM5puCUI4i6HnzCOZ4pzQ2Yr8oVGGHTIzMgQZYFws1DvX+QugB\nGXIyodaIQPaiwY9OBFfIN5hfyXigfxSaPAjNnvT8KgHanweczP5KCGmif2Y8cFgF\nwCjfPY3hsIkTmw67kgtjHHr8vJAiAqwgaOWMe/E3AoGBAL/55f8of/Nbbl5dcu5l\nEfDtoK48p9Hnc6v74XPaZwADBz4rA9yeRcX4w7/OqGOGBS7FCz5OQH6m9r0PFELD\nMKPpY2GOXp0PnCn6MqCqjX+lhNSTuoKoixKqyfcxrywdTYsDlKpfBduHeVm9uUFz\nZlfVjBue63JY+WunPTZ3FpWa\n-----END PRIVATE KEY-----\n', ['https://www.googleapis.com/auth/spreadsheets']
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
            return res.status(400).send(JSON.stringify({error: false, data: data.data.values}));
        });
    } catch (e) {
        return res.status(400).send(JSON.stringify({error: true, message: e.message}));
    }
}