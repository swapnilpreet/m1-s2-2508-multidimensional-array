const ActivityModel = require("../models/Activity.model");
const BoardModel = require("../models/Board.model");
const TaskModel = require("../models/Task.model");

exports.createBoard = async (req, res) => {
  try {
    const { name, description, columns } = req.body;
    const board = new BoardModel({
      name,
      description,
      creator: req.user._id,
      members: [{ user: req.user._id, role: "admin" }],
      columns: columns.map((c, i) => ({ title: c, title, order: i })),
    });
    await board.save();
    await ActivityModel.create({
      board: board._id,
      user: req.user._id,
      action: "created the board",
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.inviteMenmber = async (req, res) => {
  try {
    const { boardId, userId, role } = req.body;
    const board = await BoardModel.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    const inviter = board.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!inviter || inviter.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    const user = await UserModel.findOne(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const already = board.members.find(
      (m) => m.user.toString() === user._id.toString()
    );
    if (already) {
      return res.status(400).json({ message: "User already a member" });
    }
    board.members.push({ user: user._id, role: role || "Member" });
    await board.save();
    await ActivityModel.create({
      board: board._id,
      user: req.user._id,
      action: `invited ${user.email} as ${role}`,
      meta: { invitedUser: user._id},
    });
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBoard=async(req,res)=>{
  try {
    const boardId=req.params.boardId;
    const board=await BoardModel.findById(boardId).populate(
      "members.user",
      "name email"
    );
    if(!board){
      return res.status(404).json({message:"Board not found" });
    }
    const ismember=board.members.find(
      (m)=>m.user._id.toString()===req.user._id.toString()
    );
    if (!ismember) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBoard = async (req, res) => {
    try {
        const boardId=req.params.boardId;
        const board=await BoardModel.findById(boardId);
        if(!board){
            return res.status(404).json({ message: "Board not found" });
        }
        if(board.creator.toString()!==req.user._id.toString()){
            return res.status(403).json({message: "Only creator can delete the board" });
        }
        await TaskModel.deleteMany({ board: board._id });
        await ActivityModel.deleteMany({ board: board._id });
        await board.remove();
        res.status(200).json({ message: "Board deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
}

