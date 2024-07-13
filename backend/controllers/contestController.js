const UserModel=require('../models/UserModel');
const Problems=require('../models/ProblemsModel')
const Contest=require('../models/ContestModel')
const createContest=async(req,res)=>{
    try {
        const { contest_name, problems, start_time, end_time } = req.body;
        const newContest = new Contest({ contest_name, problems, start_time, end_time });
        await newContest.save();
        res.status(201).json({ success: true, contest: newContest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getallContests=async(req,res)=>{
    try {
        const contests = await Contest.find({}).populate('problems');
        res.status(200).json({ success: true, contests });
    } catch (error) {
        console.log("Failed to get all contests", error);
        res.status(500).json({ success: false, error: 'Failed to get all contests' });
    }

}

const getContest=async(req,res)=>{
    try {
        const contest = await Contest.findById(req.params.id).populate('problems');
        if (!contest) {
            return res.status(404).json({ success: false, error: 'Contest not found' });
        }
        res.status(200).json({ success: true, contest });
    } catch (error) {
        console.log("Error getting particular contest", error);
        res.status(500).json({ success: false, error: 'Failed to get particular contest' });
    }

}
const updateContest=async(req,res)=>{
    try {
        const updatedContest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContest) {
            return res.status(404).json({ success: false, message: 'Contest not found' });
        }
        res.status(200).json({ success: true, contest: updatedContest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const deleteContest=async(req,res)=>{
    try {
        const deletedContest = await Contest.findByIdAndDelete(req.params.id);
        if (!deletedContest) {
            return res.status(404).json({ success: false, message: 'Contest not found' });
        }
        res.status(200).json({ success: true, message: 'Contest deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
module.exports={createContest,getallContests,getContest,updateContest,deleteContest};