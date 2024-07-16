// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// const {generateFile} = require('./generateFile.js')
// const {executeCpp} = require('./executeCpp.js')
// const {executePy} = require('./executePy.js')
// const Job = require('./models/job.js')
// const database = require('./database/dbConnection.js')


// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// dotenv.config();
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
    
// }));


// app.post("/run", async (req, res) => {
//     const { language = "cpp", code } = req.body;
  
//     console.log(language, "Length:", code.length);
  
//     if (code === undefined) {
//       return res.status(400).json({ success: false, error: "Empty code body!" });
//     }
//     // need to generate a c++ file with content from the request
//     const filepath = await generateFile(language, code);
//     // write into DB
//     const job = await new Job({ language, filepath }).save();
//     const jobId = job["_id"];
//     // addJobToQueue(jobId);
//     res.status(201).json({ jobId });
//   });
  
//   app.get("/status", async (req, res) => {
//     const jobId = req.query.id;
  
//     if (jobId === undefined) {
//       return res
//         .status(400)
//         .json({ success: false, error: "missing id query param" });
//     }
  
//     const job = await Job.findById(jobId);
  
//     if (job === undefined) {
//       return res.status(400).json({ success: false, error: "couldn't find job" });
//     }
  
//     return res.status(200).json({ success: true, job });
//   });
  

// database();

// const PORT = process.env.PORT || 8000;

// app.listen(PORT,()=>{
//     console.log(`listening on port 3000`)
// })


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateFile } = require('./generateFile.js');
const { executeCpp } = require('./executeCpp.js');
const { executePy } = require('./executePy.js');
const Job = require('./models/job.js');
const database = require('./database/dbConnection.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body;

    console.log(language, "Length:", code.length);

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }

    try {
        const filepath = await generateFile(language, code);
        const job = new Job({ language, filepath });
        await job.save();
        const jobId = job._id;
        res.status(201).json({ success: true, jobId });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

app.get("/status", async (req, res) => {
    const jobId = req.query.id;

    if (!jobId) {
        return res.status(400).json({ success: false, error: "Missing id query param" });
    }

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, error: "Couldn't find job" });
        }
        res.status(200).json({ success: true, job });
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

database();
    const PORT = process.env.PORT || 8000;
    
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });