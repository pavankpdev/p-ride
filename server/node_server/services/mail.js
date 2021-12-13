import dotenv from 'dotenv'
import AWS from "aws-sdk";

// VALIDATION
import {emailValidationSchema} from "../validation/auth.js";

dotenv.config();
// Set the region
AWS.config.update({region: process.env.AWS_SES_REGION});


const getParams = ({to, text, subject}) => ( {
    Destination: {
        ToAddresses: [
            to
        ]
    },
    Message: {
        Body: {
            Text: {
                Charset: "UTF-8",
                Data: text
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: subject
        }
    },
    Source: process.env.AWS_SES_SOURCE,
})

export const sendMail = async (mail) => {

    // return if the destination contains array of emails.
    const {error} = emailValidationSchema.validate({email: mail.to});
    if(error)  throw new Error("invalid email address!");

    const params = getParams(mail);

    // Create the promise and SES service object
    const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    sendPromise.then((data) => console.log("[mail]",data));

    return await sendPromise;
}