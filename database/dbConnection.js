const mongoose = require('mongoose');

const database = ()=>{
    mongoose.connect(process.env.MONGO,{
        dbName: "LeetcodeClone",
    })
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log(`Some error occured while connecting to databsse: ${err}`);
    });
};

module.exports = database;

// app.get('/status',async(req,res)=>{
//     const jobId = req.query.id;

//   if (jobId === undefined) {
//     return res
//       .status(400)
//       .json({ success: false, error: "missing id query param" });
//   }

//   const job = await Job.findById(jobId);

//   if (job === undefined) {
//     return res.status(400).json({ success: false, error: "couldn't find job" });
//   }

//   return res.status(200).json({ success: true, job });
// })


// app.post('/run', async(req,res)=>{

//     const{language = cpp, code}= req.body;

//     if(code===undefined){
//         res.status(400).json({success:false,error:"Write Code"});
//     }
//     let job;
//     try{
//         const filepath = await generateFile(language,code);
//         const jobId = job["_id"];
//         job = await new Job({language, filepath}).save();
//         res.status(201).json({success:true,jobId});

//         let output;
//         job["startedAt"] = new Date();
//         if(language === "cpp"){
//             output = await executeCpp(filepath);
//         }
//         else{
//             output = await executePy(filepath);
//         }

//         job["completedAt"] = new Date();
//         job["status"] = "success";
//         job["output"] = output;
//         await job.save();

//         console.log({filepath,output})
//         // return res.json({filepath, output});
//     }
    
//     catch(error){
//         job["completedAt"] = new Date();
//         job["status"] = "error";
//         job["output"] = JSON.stringify(err);
//         await job.save();
//         console.log(error);
//         // res.status(500).json({success:false,error:error.message});
//     }
// });
