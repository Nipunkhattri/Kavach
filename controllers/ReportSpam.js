import CallSchema from "../models/Callspan.js"

export const ReportSpam = async (req,res) =>{
    const numbers = req.body.Phone_no
    console.log(numbers);
    const NoG = 0;
    const NoR = 0 ;
    let score = 0;
    const phones = await CallSchema.find({ Phone_no: { $in: numbers } })
    console.log(phones);
    const status = numbers.map(number => {
      const phone = phones.find(p => p.Phone_no === parseInt(number))
      console.log(phone)
      const phones1 = CallSchema.find({ phone })
      if (phone){
        score = (phones1.NumberofReports/(phones1.NumberofGenuie+phones1.NumberofReports))*100;
        if (phones1.NumberofReports > 3) {
          return { number, status: 'Report',score }
        } else {
          return { number, status: 'Not Report',score }
        }
      }
      else{
        const newPhone = new CallSchema({ Phone_no:number, NumberofReports:NoR,NumberofGenuie:NoG})
        newPhone.save()
        return { number, status: 'Not Report',score}
      }
    //   i++;
    })
    res.json( status )  
  }