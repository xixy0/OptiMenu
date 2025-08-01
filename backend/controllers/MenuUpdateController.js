const menuUpdate = require('../services/menuUpdateService.js');

const UpdateMenu = async (req, res) => {
  const MenuId = req.params.id;
  try {
    console.log("at controller",req.body)
    const {name,description , price, category, isVeg} = req.body;
    const imageFile = req.file;

    //const restaurantData = JSON.parse(JSON.stringify(req.body));
    ///console.log(restaurantData)
    console.log('Editing the menu item with ID:', MenuId);
    console.log(name)
    await menuUpdate.UpdateMenuById(MenuId, name, description, price, category, isVeg, imageFile);
    console.log('Menu item edited successfully');
    res.status(200).send('Staff member edited successfully');
  } catch (error) {
    console.error('Error editing menu item:', error);
    res.status(500).send('Error editing menu item');
  }
};

module.exports = {
 UpdateMenu,
};