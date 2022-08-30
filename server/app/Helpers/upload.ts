import * as fs from 'fs'
import AWS from 'aws-sdk'

export async function toS3(imagePath, type?: any) {
  return new Promise(async (resolve) => {
    AWS.config.update({
      accessKeyId: process.env.AWS_S3_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET,
    })
    let ext = type ? type : getFileExtesion(imagePath)
    const s3 = new AWS.S3()
    const params: any = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fs.createReadStream(imagePath),
      Key: Date.now() + '_.' + ext,
      ACL: 'public-read',
    }
    if (ext == 'svg') {
      params['ContentType'] = 'image/svg+xml'
    }

    s3.upload(params, function (err, data) {
      //handle error
      if (err) {
        resolve('')
      }
      //success
      if (data) {
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
        resolve(data.Location)
      }
    })
  })
}

function getFileExtesion(file) {
  const lastDot = file.lastIndexOf('.')
  const ext = file.substring(lastDot + 1)
  return ext
}
