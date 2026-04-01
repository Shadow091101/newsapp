const fs = require("fs")
const path = require("path")
const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const User = require("../models/User");
const upload = require("../middleware/uploadpic")
const bcryptjs = require("bcryptjs")

router.post(
    "/profilepic",
    fetchuser,
    upload.single("profilepic"),
    async (req, res) => {
        console.log(req.file);
        try {
            const user = await User.findById(req.user.id);

            if (!user) return res.status(404).json({ error: "User not found" });

            //delete the old image if exists
            if (user.profileImage) {
                const fullOldPath = path.join(__dirname, "..", user.profileImage);
                fs.unlink(fullOldPath, (err) => {
                    if (err) console.log("Failed tp delete old image : ", err);
                });
            }
            user.profileImage = `/uploads/${req.file.filename}`;
            await user.save();
            res.json({
                success: true,
                message: "Profile picture updated",
                profileImage: user.profileImage,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error.");
        }
    }
);

router.delete('/profilepic', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.profileImage) {
            const fullPath = path.join(__dirname, "..", user.profileImage);
            fs.unlink(fullPath, err => {
                if (err) console.log("Failed to delete image : ", err)
            });
        }
        user.profileImage = null;
        await user.save();

        res.json({ success: true, message: "Profile picture removed" });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.put(
    "/newuname",
    fetchuser,
    async (req, res) => {
        try {
            const { username } = req.body;
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { username },
                { new: true }
            );
            res.json({ success: true, user });
        } catch (err) {
            res.status(500).send("Internal server error");
        }
    });

router.put(
    "/newbio",
    fetchuser,
    async (req, res) => {
        try {
            const { bio } = req.body;

            if (!bio || bio.trim() === "") {
                return res.status(400).json({ success: false, msg: "Bio cannot be empty" });
            }

            const user = await User.findByIdAndUpdate(
                req.user.id,
                { bio },
                { new: true }
            );
            res.json({ success: true, user });
        } catch (err) {
            res.status(500).send("Internal server error");
        }
    });

router.put(
    "/addArticleReadCount",
    fetchuser,
    async (req, res) => {
        try {
            console.log("TOKEN USER:", req.user);

            console.log("🔥 API HIT by user:", req.user.id);
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { $inc: { articlesRead: 1 } },
                { new: true }
            );
            console.log("✅ Updated count:", user.articlesRead);
            res.json({ success: true, articlesRead: user.articlesRead });
        } catch (err) {
            console.error(err)
            res.status(500).send("Internal server error");
        }
    }
);

router.post("/read-article", fetchuser, async (req, res) => {
    console.log("BODY : ", req.body)
    console.log(req.header("auth-token"))
    const { category } = req.body;

    await updateCategoryStats(req.user.id, category);

    res.json({ success: true });
});

const updateCategoryStats = async (userId, category) => {
    console.log("catgory sent to Backend")
    if (!category) return;

    const user = await User.findById(userId);

    console.log("CATEGORY RECEIVED:", category);

    if (!user.categoryStats) {
        user.categoryStats = new Map();
    }

    // increment category count
    const currentCount = user.categoryStats.get(category) || 0;
    user.categoryStats.set(category, currentCount + 1);

    // update favourite category
    let fav = "";
    let max = 0;

    user.categoryStats.forEach((count, cat) => {
        if (count > max) {
            max = count;
            fav = cat;
        }
    });
    user.favouriteCategory = fav;
    await user.save();
};

router.put("/update-streak", fetchuser, async (req, res) => {
    try {
        //checks if the user exists or not
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ success: false })

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const last = user.lastReadDate ? new Date(user.lastReadDate) : null;

        if (!last) {
            // First ever read
            user.readingStreak = 1;
        } else {
            last.setHours(0, 0, 0, 0);

            const diffDays = Math.floor(
                (today - last) / (1000 * 60 * 60 * 24)
            );

            if (diffDays === 1) {
                user.readingStreak += 1;
            } else if (diffDays > 1) {
                user.readingStreak = 1;
            }
            // diffDays === 0 → same day → do nothing
        }

        user.lastReadDate = today;
        
        if(user.readingStreak>user.longestStreak){
            user.longestStreak=user.readingStreak
        }
        await user.save();
        res.json({
            success: true,
            user
        })

    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
});
router.put(
    "/newpass", fetchuser, async (req, res) => {
        try {
            const { oldpass, newpass } = req.body;

            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ error: "User not found" });

            const bcrypt = require("bcryptjs")

            //check old pass
            const isMatch = await bcrypt.compare(oldpass, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Incorrect old password!!!" });
            }

            //hash new pass
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(newpass, salt)

            //save new pass
            user.password = secpass;
            await user.save();

            res.json({ success: true, message: "Password updated successfully!!!" })
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    })




module.exports = router
