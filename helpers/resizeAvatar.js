import Jimp from "jimp";



const resizeAvatar = async (file) => {
    await Jimp.read(file)
        .then((image) => {
            return image.resize(250, 250).write(file);
        })
        .catch((error) => {
            throw error.message;
        });
}

export default resizeAvatar;