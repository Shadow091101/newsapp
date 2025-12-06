const express = require("express")
const router = express.Router()
const Bookmark = require("../models/Bookmarks")
const fetchuser = require("../middleware/fetchuser")
console.log("Bookmark file loaded!!!")

router.post('/postbookmarks', fetchuser, async (req, res) => {
    try {
        console.log(req.user.id);
        console.log("Req body received : ",req.body);
        const { title, description, author, date, source, imageUrl, newsUrl } = req.body
        const newBookmark = new Bookmark({
            title, description, author, date, source, imageUrl, newsUrl, user: req.user.id
        })
        const savedBookmark = await newBookmark.save()
        console.log(req.body);
        console.log("Bookmarks Saved Successfully!!!")
        res.json(savedBookmark)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal error occured")
    }
})

router.get('/getbookmarks', fetchuser, async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id });
        res.json(bookmarks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error!!!");
    }
})

router.delete('/deletebookmark/:id', fetchuser, async (req, res) => {
    try {
        let bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) return res.status(404).send("Not found");

        if (bookmark.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed!!");
        }
        await Bookmark.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal error occured!!!");
    }
})

module.exports = router;