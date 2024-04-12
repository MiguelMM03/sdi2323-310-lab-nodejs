const {check, param}=require('express-validator');
const songRepository=require('../../repositories/songsRepository');
const {ObjectId}=require('mongodb');
exports.songValidatorUpdate=[
    check('title')
        .if(check('title').exists())
        .trim().isLength({min:5})
        .withMessage("Title must be 5 or more characters"),
    check('kind')
        .if(check('kind').exists())
        .trim().isLength({min:3})
        .withMessage("Kind must be 3 or more characters"),
    check('price')
        .if(check('price').exists())
        .trim().isNumeric()
        .withMessage("Price must be a number")
        .custom(value=>
        {
            if(value<0)
            {
                throw new Error("Price must be positive");
            }
            return true;
        }),
    param('id')
        .if(check('id').exists())
        .custom(async (value,{req})=>{
            let songId=new ObjectId(value);
            const userSession=req.res.user;
            const filterSongAuthor={$and:[{_id:songId},{author:userSession}]};
            const song=await songRepository.findSong(filterSongAuthor,{});
            if(song===null){
                throw new Error("User is not authorized to update this song");
            }
            return true
        })
];