import CallSchema from "../models/Callspan.js"

export const CallCheck = async (req,res) =>{
    const {Phone_no,NumberofReports} = req.body;
    try {
        const CheckCall = await CallSchema.findOne({Phone_no});
        if(CheckCall){
            const updatedCall = await CallSchema.updateOne(
                { Phone_no },
                { $set: { NumberofReports } }
              );
              const CheckCallnew = await CallSchema.findOne({Phone_no});
            if(CheckCallnew.NumberofReports>10){
                return res.status(200).json({message:"Report Spam"});
            }
            else{
                return res.status(200).json({message:"Less Reports"});
            }
        }
        else{
            const result = await CallSchema.create({
                Phone_no:Phone_no,
                NumberofReports:NumberofReports
            });

            res.status(200).json({result});
        }
    } catch (error) {
        console.log(error)
    }
          
}