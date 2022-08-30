const axios = require('axios')
const { SMSGATEWAY_SENDER_NAME, SMSGATEWAY_SENDER_SECRET, SMSGATEWAY_URL, BASE_URL } = process.env;

export const sendOrderSMS = (order) => {
    
    const message = ` Greetings,
    Download your bill here. ${BASE_URL}/dl/${order.id}
    Your feedback is important. ${BASE_URL}/fd/${order.id}`;
     send({ message, mobilenumber:order.phone });
    return true;
}


const send = async({ message, mobilenumber }) => {
    console.log(message,mobilenumber)
    await axios({
        url: SMSGATEWAY_URL,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: formUrlEncoded({
            User: SMSGATEWAY_SENDER_NAME,
            passwd: SMSGATEWAY_SENDER_SECRET,
            mobilenumber,
            message,
            sid: SMSGATEWAY_SENDER_NAME,
            mtype: "N",
            DR: "Y",
        })
    }).then((response) => {
        console.log(response,'success');
      }, (error) => {
        console.log(error);
      });
}

const formUrlEncoded = x =>
    Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
