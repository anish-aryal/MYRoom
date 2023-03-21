import SES from 'aws-sdk/clients/ses.js';

export const DATABASE ='mongodb://127.0.0.1:27017/My-Room';

export const JWT_SECRET = "kjsdkfgsdfhjgkwr3875ob7wry743tyo7bc8wi";
export const CLIENT_URL = "http://localhost:3000";

//AKIAX5T3TRG7RKRWFDTZ
export const AWS_ACCESS_KEY_ID = "AKIAX5T3TRG7RKRWFDTZ";
export const AWS_SECRET_ACCESS_KEY = "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";

export const EMAIL_FROM = '"MyRoom" <my.room417@gmail.com>';
export const REPLY_TO = "my.room417@gmail.com";


const awsConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
    apiVersion: '2010-12-01'

}

export const AWSSES = new SES(awsConfig);