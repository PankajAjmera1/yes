const express = require('express');
const router = express.Router();
const Gun = require('../model/gunModel.js');
const { isLoggedIn, isSeller } = require('../middleware/middleware.js');

router.get("/gun/new", (req, res) => {
    res.render("guns/add");
});

router.post("/gun", async (req, res) => {
    await Gun.create(req.body);
    req.flash('success', 'Gun created');
    res.redirect("/gun");
});

router.get("/gun", async (req, res) => {
    const allGuns = await Gun.find({});
    res.render("guns/home", { allGuns });
});

// router.get("/gun/:id", isLoggedIn, async (req, res) => {
//     const id = req.params.id;
//     const singleGun = await Gun.findById(id);
//     res.render("guns/singleGun", { item: singleGun });
// });
router.get("/gun/:id", isLoggedIn, async (req, res) => {
    try {
        const id = req.params.id;
        const singleGun = await Gun.findById(id);
        res.render("guns/singleGun", { gun: singleGun });
    } catch (error) {
        console.error(error);
        req.flash("error", "Failed to retrieve gun details.");
        res.redirect("/gun");
    }
});


router.get('/gun/:id/edit', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const singleGun = await Gun.findById(id);
    res.render('guns/edit', { gun: singleGun }); // Pass 'gun' instead of 'i'
});


router.patch('/gun/:id', isLoggedIn,  async (req, res) => {
    const { id } = req.params;
    const { isLegal, gunName, price, automatic } = req.body;
    await Gun.findByIdAndUpdate(id, { isLegal, gunName, price, automatic });
    res.redirect(`/gun/${id}`);
});

router.delete('/gun/:id', isLoggedIn,  async (req, res) => {
    const { id } = req.params;
    await Gun.findByIdAndDelete(id);
    req.flash("error", "Gun deleted successfully");
    res.redirect('/gun');
});

router.get('/cart', async (req, res) => {
    // Implement cart functionality for guns if needed
});

router.post('/gun/:id/cart', async (req, res) => {
    // Implement adding guns to cart if needed
});

router.post("/gun/:id/like", (req, res) => {
    // Implement like functionality if needed
});

module.exports = router;