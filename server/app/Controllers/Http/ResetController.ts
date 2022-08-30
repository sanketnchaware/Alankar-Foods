const axios = require('axios')
const { SMSGATEWAY_SENDER_NAME, SMSGATEWAY_SENDER_SECRET, SMSGATEWAY_URL, BASE_URL } = process.env
export default class ResetController {
  public async sendOrderSMS() {
    const message = ` Greetings,
    Download your bill here. ${BASE_URL}/dl/111
    Your feedback is important. ${BASE_URL}/fd/222`
    this.send({ message, mobilenumber: 8762331996 })
    return true
  }

  public send = async ({ message, mobilenumber }) => {
    console.log(message, mobilenumber)
    await axios({
      url: SMSGATEWAY_URL,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: this.formUrlEncoded({
        User: SMSGATEWAY_SENDER_NAME,
        passwd: SMSGATEWAY_SENDER_SECRET,
        mobilenumber,
        message,
        sid: SMSGATEWAY_SENDER_NAME,
        mtype: 'N',
        DR: 'Y',
      }),
    }).then(
      (response) => {
        console.log(response, 'success')
      },
      (error) => {
        console.log(error)
      }
    )
  }

  public formUrlEncoded = (x) =>
    Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
}
