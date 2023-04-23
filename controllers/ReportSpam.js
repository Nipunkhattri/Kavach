import CallSchema from "../models/Callspan.js"

export const ReportSpam = async (req,res) =>{
    const numbers = req.body.Phone_no
    // console.log(numbers);
    const NoG = 4;
    const NoR = 0 ;
    let score = 0;
    const phones = await CallSchema.find({ Phone_no: { $in: numbers } })
    // console.log(phones);
    const status = numbers.map(number => {
      const phone = phones.find(p => p.Phone_no === parseInt(number))
      console.log(phone)
      const phones1 =  CallSchema.find({ phone })
      // console.log(phones1.NumberofReports)
      if (phone){
        console.log(phone.NumberofReports);
        score = Math.floor((phone.NumberofReports/(phone.NumberofGenuie+phone.NumberofReports))*100);
        if (phone.NumberofReports > 3) {
          return { number, status: 'Report',score:score }
        } else {
          return { number, status: 'Not Report',score:score }
        }
      }
      else{
        const newPhone = new CallSchema({ Phone_no:number, NumberofReports:NoR,NumberofGenuie:NoG})
        score = Math.floor((newPhone.NumberofReports/(newPhone.NumberofGenuie+newPhone.NumberofReports))*100);
        newPhone.save()
        return { number, status: 'Not Report',score}
      }
    //   i++;
    })
    res.json( status )  
  }