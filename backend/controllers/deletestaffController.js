const staffService = require('../services/deletestaffService');

const deleteStaff = async (req, res) => {
  const staffId = req.params.id;

  try {
    console.log('Deleting staff member with ID:', staffId);
    await staffService.deleteStaffById(staffId);
    console.log('Staff member deleted successfully');
    res.status(200).send('Staff member deleted successfully');
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).send('Error deleting staff member');
  }
};

module.exports = {
  deleteStaff,
};
