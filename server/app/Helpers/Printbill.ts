import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import path from 'path'
import moment from 'moment'
const pdf = require('html-pdf')

export const generateBill = async (order, store) => {
  let html = await getBillTemplate(order, store)
  var pdfPath = Math.round(new Date().getTime() / 1000) + '.pdf'
  let filePath = Application.tmpPath('uploads') + '/' + pdfPath

  var options = {
    width: '75mm',
    height: 110 + order[0].meta_order.length * 10 + 'mm',
  }
  return new Promise((resolve) => {
    pdf.create(html, options).toFile(filePath, function (err) {
      if (err) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        resolve('')
      }
      return resolve(convertpdfToBase64(filePath))
    })
  })
}

const getBillTemplate = async (order, store) => {
  if (store) {
    var html = `<!DOCTYPE html>
     <html>
     <head>
         <meta charset="utf-8" />
         <title>Alankar Bill Template</title>
         <style>
          body{
              font-size:10px !important;
          }
        
             .invoice-box {
                 width: 99%; 
                 height:100%; 
                 padding: 4px;
                 font-size: 11px;
                 line-height: 10px;
                 font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                 color: #555;
             }
     
             .invoice-box table {
                 width: 100%;
                 line-height: inherit;
                 text-align: left;
             }
     
             .invoice-box table td {
                 padding: 4px;
                 vertical-align: top;
             }
     
             h1 {
                 font-size: 14px !important;
                 text-align: center;
                 margin: 0px;
                 padding:4px;
             }
     
             .invoice-box table tr.top table td {
                 padding-bottom: 8px;
             }
     
             .invoice-box table tr.top table td.title {
                 font-size: 8px;
                 color: #555;
             }
     
             p {
                 margin: 0;
                 font-size: 8px;
                 text-align: center;
             }
     
             .invoice-box table tr.information table td {
                 padding-bottom: 20px;
             }
     
             .invoice-box table tr.heading td {
                 font-weight: bold;
                 font-size: 8px;
             }
    
             .invoice-box table tr.item.last td {
                 border-bottom: none;
             }
             .invoice-box table tr.item td {
                font-size: 8px;
            }
     
             .invoice-box table tr.total td {
                 text-align: left;
                font-size: 8px;
             }
     
             .value {
                 font-weight: bold;
                 text-align: right !important;
             }
     
             .final {
                 font-weight: bold;
             }
     
             @media only screen and (max-width: 600px) {
                 .invoice-box table tr.top table td {
                     width: 100%;
                     display: block;
                     text-align: center;
                 }
     
                 .invoice-box table tr.information table td {
                     width: 100%;
                     display: block;
                     text-align: center;
                 }
             }
     
             /** RTL **/
             .invoice-box.rtl {
                 direction: rtl;
                 font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
             }
     
             .invoice-box.rtl table {
                 text-align: right;
             }
     
             .invoice-box.rtl table tr td:nth-child(2) {
                 text-align: left;
             }
     
             .text-left {
                 text-align: left !important;
     
             }
     
             .text-right {
                 text-align: right !important;
     
             }
     
             .bold{
                  font-weight: bold;
             }
             tr.separated td {
                border-bottom: 1px dashed black;
             } 
             .ftr-txt{
                text-align: center;
                font-size: 6px;
                padding-top: 10px;
            }
         </style>
     </head>
     <body>`

    html += `<div class="invoice-box">
     <table cellpadding="0" cellspacing="0">
     <tr class="top">
     <td colspan="9">
     <table>
     <tr>
     <td class="title">
     <h1 style="padding-bottom:4px">${store[0]?.name}</h1>`

    if (store[0]?.address) {
      html += `<p style="padding: 4px 10px;">${store[0]?.address}</p>`
    }

    html += `<p style="width:100%;">`

    if (store[0].phone) {
      html += `Phone No.:  ${store[0]?.phone}`
    }
    if (store[0].gst_no) {
      html += `<p style="text-align:center;" >GST.: ${store[0]?.gst_no}</p>`
    }

    html += ` </td>
                </tr>
                </table>
                </td>
                </tr>
                <tr class="details">
                <td colspan="9">
                <p style="width:100%;display: table;" >
                <span  class="bold" style="display: table-cell;text-align: left;">Bill No.: ${
                  order[0].bill_no
                }</span>
                <span class="bold" style="display: table-cell;text-align: right;"> Date:  ${moment().format(
                  'DD-MM-YYYY'
                )}</span></p>
                </td>
                </tr>
                <tr class="details">
                <td colspan="9">
                <p style="width:100%;display: table;">
                <span class="bold" style="display: table-cell;text-align: left;">Customer Name:  ${
                  order[0].name ? `${order[0].name.substring(0, 8)}..` : '---'
                }</span>
                <span class="bold" style="display: table-cell;text-align: right;">${moment().format(
                  'hh:mm a'
                )}</span></p>
                </td>
                </tr>
                <tr class="separated">
                <td  colspan="9"></td>
                </tr>
                <tr class="heading">
                <td colspan="6">Item</td>
                <td class="text-right">Qty.</td>
                <td class="text-right">Rate</td>
                <td class="text-right">Amount</td>
                </tr>
            `

    if (order[0].order_type == 1) {
      for (let item of order[0]?.meta_order) {
        html += `<tr class="item">
                <td colspan="6">${item?.menus?.name}</td>
                <td class="text-right">${item?.quantity}</td>
                <td class="text-right">${item?.price}</td>
                <td class="text-right">₹${item?.quantity * item?.price}.00</td>
                </tr>`
      }
    }

    if (order[0].order_type == 2) {
      for (let item of order[0]?.meta_order) {
        html += `<tr class="item">
                <td colspan="6">${item?.menus?.name}</td>
                <td class="text-right">${item?.quantity}</td>
                <td class="text-right">${item?.menus?.takeaway_price}</td>
                <td class="text-right">₹${item?.quantity * item?.menus?.takeaway_price}.00</td>
                </tr>`
      }
    }

    if (order[0].order_type == 3) {
      for (let item of order[0]?.meta_order) {
        html += `<tr class="item">
                <td colspan="6">${item?.menus?.name}</td>
                <td class="text-right">${item?.quantity}</td>
                <td class="text-right">${item?.menus?.dinein_price}</td>
                <td class="text-right">₹${item?.quantity * item?.menus?.dinein_price}.00</td>
                </tr>`
      }
    }

    html += `
        <tr class="separated">
                <td  colspan="9"></td>
        </tr>
        <tr class="total">
             <td colspan="8">Sub Total: </td>
             <td class="value">₹${order[0].sub_toal.toFixed(2)}</td>
         </tr>
         <tr class="total">
             <td colspan="8">GST</td>
             <td class="value">₹${order[0].tax.toFixed(2)}</td>
         </tr>`

    if (order[0]?.discount) {
      html += `<tr class="total">
          <td colspan="8">Discount</td>
          <td class="value">- ₹${order[0].discount.toFixed(2)}</td>
          </tr>`
    }

    if (order[0].order_type == 3) {
      html += `
      <tr class="total">
      <td colspan="8">Party amount</td>
      <td class="value"> ₹${Math.round(
        order[0]?.total - (order[0]?.tax + order[0]?.sub_toal)
      ).toFixed(2)}</td>
     </tr>
      
      <tr class="total">
          <td colspan="8">Advance Paid</td>
          <td class="value"> ₹${order[0]?.advance_received}.00</td>
         </tr>
        

         <tr class="total">
         <td colspan="8">Pending</td>
         <td class="value"> ₹${Math.round(order[0]?.total - order[0]?.advance_received).toFixed(
           2
         )}</td>
        </tr>
         
         `
    }

    html += ` 
        <tr class="separated">
        <td  colspan="9"></td>
        </tr>
        <tr class="total final">
        <td colspan="8">Total</td>
        <td class="value">₹${order[0].total.toFixed(2)}</td>
        </tr>
        </table>
        <div>
        <h3 class="ftr-txt">Thank You! Please visit again.</h3>
         </div>
        </div>
        </body>
       </html>`

    return html
  }

  return false
}

const convertpdfToBase64 = async (filePath) => {
  let base64String = ''

  if (fs.statSync(filePath).isFile()) {
    base64String = await base64ToNode(fs.readFileSync(path.resolve(filePath)).toString('base64'))
  }
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  return base64String
}

function base64ToNode(buffer) {
  return buffer.toString('base64')
}
