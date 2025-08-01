const staffService = require('../services/editstaffService');

const EditStaff = async (req, res) => {
  const staffId = req.params.id;
  try {
    console.log('Editing the staff member with ID:', staffId);
    await staffService.editStaffById(staffId,req);
    console.log('Staff member edited successfully');
    res.status(200).send('Staff member edited successfully');
  } catch (error) {
    console.error('Error editing staff member:', error);
    res.status(500).send('Error editing staff member');
  }
};

module.exports = {
  EditStaff,
};
