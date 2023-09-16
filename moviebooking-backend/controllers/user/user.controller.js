const User = require('../../models/user.model');
const getCouponCode = async (req, res) => {
    try {
      const userId = req.userId; // User ID from the authentication middleware
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const couponCodes = user.coupens.map(coupon => coupon.id);
      res.status(200).json(couponCodes);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };
  