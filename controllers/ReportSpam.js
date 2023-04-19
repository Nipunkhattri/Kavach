import CallSchema from "../models/Callspan.js"

export const ReportSpam = async (req,res) =>{
    const numbers = req.body.Phone_no
    console.log(numbers);
    
    // Fetch the phone numbers from the database
    const phones = await CallSchema.find({ Phone_no: { $in: numbers } })
    console.log(phones);
    const i = 0;
    const status = numbers.map(number => {
      const phone = phones.find(p => p.Phone_no === parseInt(number))
      console.log(phone)
      if (phone) {
        if (phone.NumberofReports > 10) {
          return { number, status: 'Report' }
        } else {
          return { number, status: 'Not Report' }
        }
      }
      i++;
    })
    res.json({ status })
  
  }