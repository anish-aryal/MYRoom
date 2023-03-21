export const DATABASE ='mongodb://127.0.0.1:27017/My-Room';
// export const DATABASE ='mongodb+srv://my-room:rL3WSmv00945QLgL@my-room.r8f8xid.mongodb.net/?retryWrites=true&w=majority';
// // rL3WSmv00945QLgL

export const AWS_ACCESS_KEY_ID = "Something";
export const  AWS_SECRET_ACCESS_KEY= "Something";

export const EMAIL_FROM = '"Realist Nepal" <realist.nepal@gmail.com>';
export const REPLY_TO = "realist.nepal@gmail.com";

const awsConfig = {
accessKeyId: AWS_ACCESS_KEY_ID,
secretAccessKey: AWS_SECRET_ACCESS_KEY,
region: "us-east-1",
apiVersion: "2010-12-01"
}
export const AWSSES = new SES(awsConfig);
export const JWT_SECRET = "kjsdkfgsdfhjgkwr3875ob7wry743tyo7bc8wi"
export const CLIENT_URL = "http://localhost:3000"
