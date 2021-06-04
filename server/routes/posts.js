
const router = require("express").Router();
const verify = require("./verifyToken");

const User = require("../model/User");
const MarkDowns = require("../model/MarkDowns");
const { markdownCreateValidation,markdownUpdateValidation,markdownDeleteValidation  } = require("../validation");


router.get("/", verify,  async (req, res) => {
  const user = await User.findById(req.user._id);
  const markdowns=await MarkDowns.find({ email: user.email,});
  res.send({ "markdowns":markdowns});
});


router.post("/create", verify,  async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(user.email)

  const { error } = markdownCreateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const markdownpost = new MarkDowns({
    email: user.email,
    title:req.body.title,
    markdown: req.body.markdown
  });

  try {
    const savedmarkdownpost = await markdownpost.save();
    // console.log(savedmarkdownpost);
    res.send({ status: "success" });
  } catch (err) {
    res.status(400).send(err);
  }


});


router.post("/update", verify,  async (req, res) => {
  // const user = await User.findById(req.user._id);
  // console.log(user.email)

  const { error } = markdownUpdateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const markdownpost = await MarkDowns.findByIdAndUpdate(
      {_id:req.body._id},
      {
        markdown: req.body.markdown
      }

      )
  try {
    const savedmarkdownpost = await markdownpost.save();
    // console.log(savedmarkdownpost);
    res.send({ status: "success" });
  } catch (err) {
    res.status(400).send(err);
  }


});

router.post("/delete", verify,  async (req, res) => {
  // const user = await User.findById(req.user._id);
  // console.log(user.email)

  const { error } = markdownDeleteValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body._id);
  const markdownpost = await MarkDowns.findOneAndRemove({_id:req.body._id},(err)=>{
    if(err){
    return res.status(400).send(err);

    }
    return res.send({ status: "success" });
  })

  // try {
  //   // const savedmarkdownpost = await markdownpost.delete();
  //   // console.log(savedmarkdownpost);
  //   res.send({ status: "success" });
  // } catch (err) {
  //   res.status(400).send(err);
  // }


});







module.exports = router;
