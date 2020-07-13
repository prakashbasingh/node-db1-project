const express = require("express");

const AccountDb = require("../data/dbConfig.js");

const router = express.Router()


router.get("/", (req, res) => {
    AccountDb.select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            handleError(error, res)

            console.log(error)
            res.status(500).json({message: "there is error getting accounts data"})
        })
})

router.get("/:id", (req, res) => {
    const { id } = req.params

    AccountDb.from("accounts")
        .where({ id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            handleError(error, res)
        })
})

router.post("/", (req, res) => {
    const postAccountData = req.body
    //validate the data
    AccountDb("accounts")
        .insert(postAccountData, "id")
        .then(ids => {
            AccountDb("accounts")
                .where({ id: ids[0] })
                .first()
                .then(accountInfo => {
                    res.status(200).json(accountInfo)
                })
        })
        .catch(error => {
            handleError(error, res)
        })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const change = req.body;

    AccountDb("accounts")
        .where({ id })// do not forget to have where here
        .update(change)
        .then(count => {
            if (count > 0) {
                res.status(200).json({data: count})
            } else {
                res.status(404).json({message: "there is no record to update"})
            }
        })
        .catch(error => {
            handleError(error, res)
        })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    AccountDb("accounts")
    .where ({ id })
    .del() // do not forget to have where here
    .then(count => {
        //count is the number of record deleted
        if(count > 0){
            res.status(200).json({count})
        } else {
            res.status(404).json({message: "there is no record to delete"})
        }
    })
    .catch(error => {
        handleError(error, res)
    })
})






function handleError(error, res) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
}

module.exports = router