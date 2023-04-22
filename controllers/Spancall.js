import CallSchema from "../models/Callspan.js"

export const CallCheck = async (req,res) =>{
    const {Phone_no} = req.body;
    let score = 0;
    let NumberofReports = 0;
    let NumberofGenuie = 0;
    try {
        const CheckCall = await CallSchema.findOne({Phone_no});
        if(CheckCall){
            NumberofReports = CheckCall.NumberofReports+1;
            const updatedCall = await CallSchema.updateOne(
                { Phone_no },
                { $set: { NumberofReports } }
              );
            const CheckCallnew = await CallSchema.findOne({Phone_no});
            console.log(CheckCallnew)
            score = (CheckCallnew.NumberofReports/(CheckCallnew.NumberofReports+CheckCallnew.NumberofGenuie))*100;
            if(CheckCallnew.NumberofReports>3){
                return res.status(200).json({message:"Report Spam",score});
            }
            else{
                return res.status(200).json({message:"Less Reports",score});
            }
        }
        else{
            const result = await CallSchema.create({
                Phone_no:Phone_no,
                NumberofReports:NumberofReports,
                NumberofGenuie:NumberofGenuie
            });

            res.status(200).json({result,score});
        }
    } catch (error) {
        console.log(error)
    }
          
}

export const GenuieCheck = async (req,res) =>{
    const {Phone_no} = req.body;
    let NumberofReports = 0;
    let score = 0;
    let NumberofGenuie = 0;
    console.log(Phone_no);
    try {
        const CheckCall = await CallSchema.findOne({Phone_no});
        if(CheckCall){
            NumberofGenuie = CheckCall.NumberofGenuie+1;
            const updatedCall = await CallSchema.updateOne(
                { Phone_no },
                { $set: { NumberofGenuie } }
              );
            const CheckCallnew = await CallSchema.findOne({Phone_no});
            // console.log(CheckCallnew)
            score = (CheckCallnew.NumberofReports/(CheckCallnew.NumberofReports+CheckCallnew.NumberofGenuie))*100;
            if(CheckCallnew.NumberofReports>3){
                return res.status(200).json({message:"Report Spam",score});
            }
            else{
                return res.status(200).json({message:"Less Reports",score});
            }
        }
        else{
            const result = await CallSchema.create({
                Phone_no:Phone_no,
                NumberofReports:NumberofReports,
                NumberofGenuie:NumberofGenuie
            });

            res.status(200).json({result});
        }
    } catch (error) {
        console.log(error)
    }
}