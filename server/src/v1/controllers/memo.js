const Memo = require("../models/memo")

exports.create = async (req,res) => {
    try{
        const memoCount = await Memo.find().count();
        // メモ新規作成
        const memo = await Memo.create({
            user: req.user._id,
            postiion: memoCount > 0 ? memoCount : 0,
        });
        res.status(201).json(memo);
    }catch{
        res.status(500).json(err);
    }
};

exports.getAll = async (req,res) => {
    try{
        const memos = await Memo.find({user: req.user._id}).sort("-position");

        res.status(200).json(memos);
    }catch{
        res.status(500).json(err);
    }
};

exports.getOne = async (req,res) => {
    const {memoId} = req.params;

    try{
       const memo = await Memo.findOne({ user:req.user._id, _id: memoId });
       if(!memo) return res.status(404).jon("メモが存在しません");
       res.status(200).json(memo);
    }catch(err){
        res.status(500).json(err);
    }
};

exports.update = async (req,res) => {
    const {memoId} = req.params;
    const {title,description} = req.body

    try{

        if(title === "") req.body.title ="無題";
        if(description === " ")
        req.body.description = "ここに記入してください";

       const memo = await Memo.findOne({ user:req.user._id, _id: memoId });
       if(!memo) return res.status(404).jon("メモが存在しません");

       const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
        $set: req.body,
       });
       res.status(200).json(updatedMemo);
    }catch(err){
        res.status(500).json(err);
    }
};

exports.delete = async (req, res) => {
    const { memoId } = req.params;
    //メモの削除
    try {
      const deletedMemo = await Memo.deleteOne({ _id: memoId });
      console.log(deletedMemo);
      res.status(200).json("メモを削除しました");
    } catch (err) {
      res.status(500).json(err);
    }
  };

