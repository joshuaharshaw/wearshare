// var cloudinary = require('cloudinary');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });


// module.exports = (req, res, next) => {
//   if (req.file) {
//     cloudinary.uploader.upload(req.file.path, ({ url, public_id }) => {
//       console.log(url);
//       console.log(public_id);
//       console.log(req.file.path);
//       if (url) {
//         req.imageLink = url;
//         next()
//       } else {
//         res.status(404).send('Oh uh, something went wrong')
//       }
//     })
//   } else {
//     next()
//   }
// }




// OPTIONS TO TRY OUT

// uploader.bind('beforeupload', function (event, item) {
//     item.formData.push({some: 'data'});
// });

// cloudinary.v2.uploader.upload("sample.jpg", 
//     { public_id: "my_folder/my_sub_folder/my_name" },
//     function(error, result) {console.log(result); });