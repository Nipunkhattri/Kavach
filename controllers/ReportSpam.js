import CallSchema from "../models/Callspan.js"

export const ReportSpam = async (req,res) =>{
    const numbers = req.body.Phone_no
    console.log(numbers);
    
    const NoR = 0 ;
    // Fetch the phone numbers from the database
    const phones = await CallSchema.find({ Phone_no: { $in: numbers } })
    console.log(phones);
    // const i = 0;
    const status = numbers.map(number => {
      const phone = phones.find(p => p.Phone_no === parseInt(number))
      console.log(phone)
      if (phone) {
        if (phone.NumberofReports > 10) {
          return { number, status: 'Not Report' }
        } else {
          return { number, status: 'Report' }
        }
      }
      else{
        const newPhone = new CallSchema({ Phone_no:number, NumberofReports:NoR})
        newPhone.save()
        return { number, status: 'Not Report' }
      }
    //   i++;
    })
    res.json( status )
  
  }