const { Router } = require('express');

const router = Router();


router.get('/', );

router.post('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Post del API'
    })
});

router.put('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Put del API'
    })
});

router.delete('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Delete del API'
    })
});



module.exports = router;